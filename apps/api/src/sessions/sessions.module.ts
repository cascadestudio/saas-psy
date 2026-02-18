import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { EmailModule } from '../email/email.module';
import { ScoringModule } from '../scoring/scoring.module';

@Module({
  imports: [EmailModule, ScoringModule],
  controllers: [SessionsController],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
