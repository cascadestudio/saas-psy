import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { getScaleById } from '@melya/core';
import { PrismaService } from '../prisma/prisma.service';
import { AttioService, PersonActivity } from './attio.service';

/**
 * Pousse quotidiennement les métriques d'usage des psys vers Attio.
 *
 * Le sync d'inscription (`AuthService`) ne pose que l'identité du contact :
 * tout le reste (passations, dernière activité) bouge dans le temps et est
 * recalculé ici depuis la base, puis poussé si la valeur a changé.
 *
 * Le job est idempotent et repart de zéro à chaque passage : un échec réseau,
 * ou un push d'inscription raté (il est non-bloquant), est rattrapé le
 * lendemain sans état à maintenir.
 *
 * Aucune donnée patient ne sort d'ici — uniquement des compteurs d'usage du
 * praticien.
 */
@Injectable()
export class AttioScheduler {
  private readonly logger = new Logger(AttioScheduler.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly attio: AttioService,
  ) {}

  // Daily at 04:00 Europe/Paris.
  @Cron('0 4 * * *', { timeZone: 'Europe/Paris' })
  async syncActivityToAttio(): Promise<void> {
    const users = await this.prisma.user.findMany({
      where: { role: 'PRACTITIONER' },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
    });

    const targets = users.filter((u) => this.attio.isSyncable(u.email));
    let synced = 0;

    for (const user of targets) {
      try {
        await this.attio.syncActivity({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          activity: await this.computeActivity(user.id, user.createdAt),
        });
        synced++;
      } catch (err) {
        // Un contact en échec ne doit pas bloquer les suivants : il sera
        // retenté demain.
        this.logger.error(
          `Attio activity sync failed for ${user.email}`,
          err instanceof Error ? err.stack : String(err),
        );
      }
    }

    this.logger.log(
      `Attio activity sync: ${synced}/${targets.length} practitioners synced`,
    );
  }

  private async computeActivity(
    userId: string,
    signupDate: Date,
  ): Promise<PersonActivity> {
    const sentFilter = { practitionerId: userId, sentAt: { not: null } };

    const [
      sessionsSent,
      sessionsCompleted,
      firstSent,
      lastSession,
      lastPatient,
    ] = await Promise.all([
      // Annulées et expirées incluses : on mesure l'effort du psy, pas le
      // sort de la passation.
      this.prisma.session.count({ where: sentFilter }),
      this.prisma.session.count({
        where: { practitionerId: userId, status: 'COMPLETED' },
      }),
      this.prisma.session.findFirst({
        where: sentFilter,
        orderBy: { sentAt: 'asc' },
        select: { sentAt: true, scaleId: true },
      }),
      this.prisma.session.findFirst({
        where: { practitionerId: userId },
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true, sentAt: true },
      }),
      this.prisma.patient.findFirst({
        where: { practitionerId: userId },
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true },
      }),
    ]);

    const activityDates = [
      lastSession?.createdAt,
      lastSession?.sentAt,
      lastPatient?.createdAt,
    ].filter((d): d is Date => !!d);

    return {
      signupDate,
      firstScaleDate: firstSent?.sentAt ?? null,
      firstScale: firstSent ? this.scaleName(firstSent.scaleId) : null,
      sessionsSent,
      sessionsCompleted,
      lastActivityDate: activityDates.length
        ? new Date(Math.max(...activityDates.map((d) => d.getTime())))
        : null,
    };
  }

  /** Acronyme lisible dans le CRM ("PHQ-9"), à défaut l'id brut. */
  private scaleName(scaleId: string): string {
    return getScaleById(scaleId)?.acronym ?? scaleId;
  }
}
