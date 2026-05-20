import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { OnboardingScheduler } from './onboarding.scheduler';

@Module({
  providers: [EmailService, OnboardingScheduler],
  exports: [EmailService],
})
export class EmailModule {}
