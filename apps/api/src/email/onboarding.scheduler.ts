import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from './email.service';

/**
 * Time-based onboarding sequence driver.
 *
 * Mail 1 (welcome) is sent inline at registration. This scheduler only owns
 * the delayed steps:
 *   - Mail 2 at J+3
 *   - Mail 3 at J+14
 *
 * Idempotency: each step writes a timestamp on the User row once sent, and the
 * query filters those out. Existing users were backfilled (timestamps set) by
 * the add_onboarding_email_tracking migration, so only users who sign up after
 * that migration ever enter the sequence.
 *
 * A send failure leaves the flag null, so the user is naturally retried on the
 * next daily run rather than being skipped forever.
 */
@Injectable()
export class OnboardingScheduler {
  private readonly logger = new Logger(OnboardingScheduler.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  // Daily at 09:00 Europe/Paris.
  @Cron('0 9 * * *', { timeZone: 'Europe/Paris' })
  async runOnboardingSequence(): Promise<void> {
    await this.processStep(3);
    await this.processStep(14);
  }

  private async processStep(dayOffset: 3 | 14): Promise<void> {
    const threshold = new Date(Date.now() - dayOffset * 24 * 60 * 60 * 1000);
    const flagField =
      dayOffset === 3 ? 'onboardingDay3SentAt' : 'onboardingDay14SentAt';

    const users = await this.prisma.user.findMany({
      where: {
        role: 'PRACTITIONER',
        createdAt: { lte: threshold },
        [flagField]: null,
      },
      select: { id: true, email: true, firstName: true },
    });

    if (users.length === 0) return;

    this.logger.log(
      `Onboarding J+${dayOffset}: ${users.length} user(s) to email`,
    );

    for (const user of users) {
      try {
        const result =
          dayOffset === 3
            ? await this.emailService.sendOnboardingDay3Email(
                user.email,
                user.firstName ?? undefined,
              )
            : await this.emailService.sendOnboardingDay14Email(
                user.email,
                user.firstName ?? undefined,
              );

        if (!result.success) {
          this.logger.error(
            `Onboarding J+${dayOffset} failed for ${user.email}: ${result.error} — will retry next run`,
          );
          continue;
        }

        await this.prisma.user.update({
          where: { id: user.id },
          data: { [flagField]: new Date() },
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        this.logger.error(
          `Onboarding J+${dayOffset} exception for ${user.email}: ${message} — will retry next run`,
        );
      }
    }
  }
}
