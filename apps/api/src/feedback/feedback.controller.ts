import {
  Body,
  Controller,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Public } from '../auth/decorators';
import { FeedbackService } from './feedback.service';

type TallyField = {
  key: string;
  label: string;
  type: string;
  value: unknown;
};

type TallyWebhookPayload = {
  eventId?: string;
  eventType?: string;
  data?: {
    responseId?: string;
    submissionId?: string;
    fields?: TallyField[];
  };
};

@Controller('feedback')
export class FeedbackController {
  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Post('tally-webhook')
  async tallyWebhook(
    @Headers('x-webhook-secret') secret: string | undefined,
    @Body() payload: TallyWebhookPayload,
  ) {
    const expected = this.configService.get<string>('TALLY_WEBHOOK_SECRET');
    if (expected && secret !== expected) {
      throw new UnauthorizedException('Invalid webhook secret');
    }

    const fields = payload?.data?.fields ?? [];
    const userIdField = fields.find(
      (f) => f.label === 'userId' || f.key === 'userId',
    );
    const userId =
      typeof userIdField?.value === 'string' ? userIdField.value : null;

    if (!userId) {
      return { ok: true, skipped: 'no userId hidden field' };
    }

    const responseId =
      payload?.data?.responseId ?? payload?.data?.submissionId ?? null;

    await this.feedbackService.markSubmitted(userId, responseId);
    return { ok: true };
  }
}
