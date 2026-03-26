import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { EmailModule } from '../email/email.module';
import { ScoringModule } from '../scoring/scoring.module';
import { AuditLogModule } from '../audit-log/audit-log.module';

@Module({
  imports: [EmailModule, ScoringModule, AuditLogModule],
  controllers: [SessionsController],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
