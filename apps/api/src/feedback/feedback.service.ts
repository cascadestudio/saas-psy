import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeedbackService {
  private readonly logger = new Logger(FeedbackService.name);

  constructor(private readonly prisma: PrismaService) {}

  async markSubmitted(userId: string, tallyResponseId: string | null) {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          feedbackSubmittedAt: new Date(),
          tallyResponseId,
        },
      });
    } catch (error) {
      this.logger.warn(
        `Failed to mark feedback submitted for user ${userId}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }
}
