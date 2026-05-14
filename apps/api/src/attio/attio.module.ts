import { Module } from '@nestjs/common';
import { AttioService } from './attio.service';

@Module({
  providers: [AttioService],
  exports: [AttioService],
})
export class AttioModule {}
