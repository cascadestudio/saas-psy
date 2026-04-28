import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { EncryptionService } from '../encryption/encryption.service';
import { ScoringService } from '../scoring/scoring.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { AuditAction } from '../audit-log/audit-actions';
import { CreateSessionDto, UpdateSessionDto, SubmitResponsesDto } from './dto';
import { createId } from '@paralleldrive/cuid2';
import { getScaleById } from '@melya/core';

@Injectable()
export class SessionsService {
  private readonly logger = new Logger(SessionsService.name);

  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private encryption: EncryptionService,
    private scoringService: ScoringService,
    private auditLog: AuditLogService,
  ) {}

  async create(
    practitionerId: string,
    dto: CreateSessionDto,
    ipAddress?: string,
    userAgent?: string,
  ) {
    // Get patient data
    const patient = await this.prisma.patient.findUnique({
      where: { id: dto.patientId },
    });

    if (!patient) {
      throw new NotFoundException('Patient non trouvé');
    }

    if (patient.practitionerId !== practitionerId) {
      throw new ForbiddenException('Accès non autorisé à ce patient');
    }

    // Get practitioner data
    const practitioner = await this.prisma.user.findUnique({
      where: { id: practitionerId },
    });

    if (!practitioner) {
      throw new NotFoundException('Praticien non trouvé');
    }

    const scalesMap = new Map(dto.scaleIds.map((id) => [id, getScaleById(id)]));

    // Generate a unique batchId for this group of sessions
    const batchId = createId();

    // Create sessions for each scale (one session per scale)
    const sessions = await this.prisma.$transaction(
      dto.scaleIds.map((scaleId) =>
        this.prisma.session.create({
          data: {
            scaleId,
            patientId: dto.patientId,
            practitionerId,
            batchId,
            status: 'SENT',
            sentAt: new Date(),
            // Set expiration to 7 days from now
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        }),
      ),
    );

    // Build scale names list for the email
    const scaleNames = dto.scaleIds.map((scaleId) => {
      const scale = scalesMap.get(scaleId);
      return scale?.title || 'Questionnaire';
    });

    // Decrypt patient/practitioner names for email
    const decryptedPatientFirstName = this.encryption.decryptField(patient.firstName);
    const decryptedPatientLastName = this.encryption.decryptField(patient.lastName);

    // Send ONE email with link to portal
    const practitionerName = [
      this.encryption.decryptField(practitioner.firstName),
      this.encryption.decryptField(practitioner.lastName),
    ]
      .filter(Boolean)
      .join(' ') || 'Votre psychologue';

    const emailResult = await this.emailService.sendBatchSessionEmail({
      patientEmail: patient.email,
      patientFirstName: decryptedPatientFirstName || '',
      patientLastName: decryptedPatientLastName || '',
      batchId,
      scaleNames,
      practitionerName,
      message: dto.message,
    });

    // Log email result
    if (!emailResult.success) {
      this.logger.warn(
        `Email failed to send for patient ${patient.id}: ${emailResult.error}`,
      );
    }

    // Audit log (non-blocking)
    this.auditLog
      .log({
        userId: practitionerId,
        action: AuditAction.SESSION_CREATED,
        resource: 'Session',
        resourceId: batchId,
        metadata: {
          patientId: dto.patientId,
          scaleIds: dto.scaleIds,
          sessionCount: sessions.length,
        },
        ipAddress,
        userAgent,
      })
      .catch(() => {});

    return {
      sessions,
      batchId,
      message: `${sessions.length} échelle(s) envoyée(s) avec succès`,
      emailsSent: emailResult.success ? 1 : 0,
      emailsFailed: emailResult.success ? 0 : 1,
    };
  }

  async findByPatientId(patientId: string, practitionerId: string) {
    // Verify patient belongs to practitioner
    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      throw new NotFoundException('Patient non trouvé');
    }

    if (patient.practitionerId !== practitionerId) {
      throw new ForbiddenException('Accès non autorisé à ce patient');
    }

    const sessions = await this.prisma.session.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
      include: {
        patient: true,
      },
    });

    return { sessions: sessions.map((s) => this.decryptSession(s)) };
  }

  async findById(
    id: string,
    practitionerId: string,
    ipAddress?: string,
    userAgent?: string,
  ) {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: {
        patient: true,
      },
    });

    if (!session) {
      throw new NotFoundException('Session non trouvée');
    }

    if (session.practitionerId !== practitionerId) {
      throw new ForbiddenException('Accès non autorisé à cette session');
    }

    if (session.status === 'COMPLETED' && !session.viewedAt) {
      const updated = await this.prisma.session.update({
        where: { id },
        data: { viewedAt: new Date() },
        include: { patient: true },
      });
      session.viewedAt = updated.viewedAt;
    }

    this.auditLog
      .log({
        userId: practitionerId,
        action: AuditAction.SESSION_VIEWED,
        resource: 'Session',
        resourceId: id,
        metadata: { patientId: session.patientId, status: session.status },
        ipAddress,
        userAgent,
      })
      .catch(() => {});

    return { session: this.decryptSession(session) };
  }

  async findAll(practitionerId: string) {
    const sessions = await this.prisma.session.findMany({
      where: { practitionerId },
      orderBy: { createdAt: 'desc' },
      include: {
        patient: true,
      },
    });

    return { sessions: sessions.map((s) => this.decryptSession(s)) };
  }

  async findRecent(practitionerId: string, limit: number = 10) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const sessions = await this.prisma.session.findMany({
      where: {
        practitionerId,
        OR: [
          { status: { in: ['SENT', 'STARTED'] } },
          {
            status: 'COMPLETED',
            completedAt: { gte: thirtyDaysAgo },
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
      include: { patient: true },
      take: limit,
    });

    return { sessions: sessions.map((s) => this.decryptSession(s)) };
  }

  async update(id: string, practitionerId: string, dto: UpdateSessionDto) {
    const session = await this.prisma.session.findUnique({
      where: { id },
    });

    if (!session) {
      throw new NotFoundException('Session non trouvée');
    }

    if (session.practitionerId !== practitionerId) {
      throw new ForbiddenException('Accès non autorisé à cette session');
    }

    const updatedSession = await this.prisma.session.update({
      where: { id },
      data: dto,
    });

    return { session: this.decryptSession(updatedSession) };
  }

  async cancel(
    id: string,
    practitionerId: string,
    ipAddress?: string,
    userAgent?: string,
  ) {
    const session = await this.prisma.session.findUnique({
      where: { id },
    });

    if (!session) {
      throw new NotFoundException('Session non trouvée');
    }

    if (session.practitionerId !== practitionerId) {
      throw new ForbiddenException('Accès non autorisé à cette session');
    }

    if (session.status === 'COMPLETED') {
      throw new BadRequestException('Impossible d\'annuler une session complétée');
    }

    const cancelledSession = await this.prisma.session.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    this.auditLog
      .log({
        userId: practitionerId,
        action: AuditAction.SESSION_CANCELLED,
        resource: 'Session',
        resourceId: id,
        metadata: { patientId: session.patientId },
        ipAddress,
        userAgent,
      })
      .catch(() => {});

    return { session: this.decryptSession(cancelledSession) };
  }

  // Public endpoint for patient portal (no auth required)
  async getPatientPortalSessions(batchId: string) {
    const sessions = await this.prisma.session.findMany({
      where: { batchId },
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    if (sessions.length === 0) {
      throw new NotFoundException('Portail non trouvé');
    }

    // Get patient info from first session (decrypt encrypted names)
    const patient = sessions[0].patient;
    const patientFirstName = this.encryption.decryptField(patient.firstName) || '';
    const patientLastName = this.encryption.decryptField(patient.lastName) || '';

    // Separate pending and completed sessions
    const pendingSessions = sessions.filter(
      (s) => s.status === 'SENT' || s.status === 'STARTED',
    );
    const completedSessions = sessions.filter((s) => s.status === 'COMPLETED');

    return {
      portal: {
        batchId,
        patientFirstName,
        patientLastName,
        totalCount: sessions.length,
        pendingCount: pendingSessions.length,
        completedCount: completedSessions.length,
        allCompleted: pendingSessions.length === 0,
        sessions: sessions.map((s) => {
          const scale = getScaleById(s.scaleId);
          return {
            id: s.id,
            scaleId: s.scaleId,
            scaleTitle: scale?.title,
            scaleDescription: scale?.description,
            estimatedTime: scale?.estimatedTime,
            status: s.status,
            isCompleted: s.status === 'COMPLETED',
            completedAt: s.completedAt,
          };
        }),
      },
    };
  }

  // Public endpoint for patients (no auth required)
  async getSessionForPatient(id: string) {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!session) {
      throw new NotFoundException('Session non trouvée');
    }

    // Check if session is expired
    if (session.expiresAt && new Date() > session.expiresAt) {
      await this.prisma.session.update({
        where: { id },
        data: { status: 'EXPIRED' },
      });
      throw new BadRequestException('Cette session a expiré');
    }

    if (session.status === 'COMPLETED') {
      throw new BadRequestException('Cette session est déjà complétée');
    }

    if (session.status === 'CANCELLED') {
      throw new BadRequestException('Cette session a été annulée');
    }

    // Mark as started if not already
    if (session.status === 'SENT') {
      await this.prisma.session.update({
        where: { id },
        data: {
          status: 'STARTED',
          startedAt: new Date(),
        },
      });
    }

    const scale = getScaleById(session.scaleId);
    return {
      session: {
        id: session.id,
        scaleId: session.scaleId,
        batchId: session.batchId,
        patientFirstName: this.encryption.decryptField(session.patient.firstName),
        patientLastName: this.encryption.decryptField(session.patient.lastName),
        status: session.status === 'SENT' ? 'STARTED' : session.status,
        scale: scale
          ? {
              id: scale.id,
              title: scale.title,
              description: scale.description,
              instructions: scale.instructions ?? scale.longDescription,
              formType: scale.formType,
              questions: scale.questions,
              answerScales: scale.answerScales,
              scoring: scale.scoring,
              estimatedTime: scale.estimatedTime,
            }
          : null,
      },
    };
  }

  // Public endpoint for patients to submit responses
  async submitResponses(id: string, dto: SubmitResponsesDto) {
    const session = await this.prisma.session.findUnique({
      where: { id },
    });

    if (!session) {
      throw new NotFoundException('Session non trouvée');
    }

    if (session.status === 'COMPLETED') {
      throw new BadRequestException('Cette session est déjà complétée');
    }

    if (session.status === 'CANCELLED') {
      throw new BadRequestException('Cette session a été annulée');
    }

    if (session.status === 'EXPIRED' || (session.expiresAt && new Date() > session.expiresAt)) {
      throw new BadRequestException('Cette session a expiré');
    }

    // Calculate score using the scoring service
    const scoreResult = this.scoringService.calculateScore(
      session.scaleId,
      dto.responses,
    );

    // Store the full ScoreResult (without scoreDetails to save space)
    const interpretation =
      typeof scoreResult.interpretation === 'string'
        ? scoreResult.interpretation
        : JSON.stringify(scoreResult.interpretation);

    const updatedSession = await this.prisma.session.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        responses: this.encryption.encryptJson(dto.responses),
        patientComments: this.encryption.encryptField(dto.patientComments),
        score: this.encryption.encryptJson(scoreResult),
        interpretation: this.encryption.encryptField(interpretation),
      },
    });

    // Notify practitioner that the patient has completed the questionnaire (non-blocking)
    void this.notifyPractitionerOfCompletion(updatedSession.id).catch((err) => {
      this.logger.warn(
        `Failed to notify practitioner for session ${updatedSession.id}: ${
          err instanceof Error ? err.message : err
        }`,
      );
    });

    return {
      session: this.decryptSession(updatedSession),
      message: 'Réponses enregistrées avec succès',
    };
  }

  private async notifyPractitionerOfCompletion(sessionId: string) {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        practitioner: true,
        patient: { select: { firstName: true, lastName: true } },
      },
    });

    if (!session || !session.practitioner?.email) return;

    const scale = getScaleById(session.scaleId);
    const scaleName = scale?.title || 'Questionnaire';

    await this.emailService.sendPractitionerCompletionEmail({
      practitionerEmail: session.practitioner.email,
      practitionerFirstName:
        this.encryption.decryptField(session.practitioner.firstName) || '',
      patientFirstName:
        this.encryption.decryptField(session.patient.firstName) || '',
      patientLastName:
        this.encryption.decryptField(session.patient.lastName) || '',
      sessionId: session.id,
      scaleName,
    });
  }

  private decryptSession(session: any) {
    if (!session) return session;
    const decrypted = {
      ...session,
      responses: this.encryption.decryptJson(session.responses),
      score: this.encryption.decryptJson(session.score),
      interpretation: this.encryption.decryptField(session.interpretation),
      patientComments: this.encryption.decryptField(session.patientComments),
    };
    // Decrypt included patient relation
    if (decrypted.patient) {
      decrypted.patient = {
        ...decrypted.patient,
        firstName: this.encryption.decryptField(decrypted.patient.firstName),
        lastName: this.encryption.decryptField(decrypted.patient.lastName),
        notes: this.encryption.decryptField(decrypted.patient.notes),
      };
    }
    return decrypted;
  }
}
