import { Module } from '@nestjs/common';
import { AttioService } from './attio.service';
import { AttioScheduler } from './attio.scheduler';

@Module({
  providers: [AttioService, AttioScheduler],
  exports: [AttioService],
})
export class AttioModule {}
