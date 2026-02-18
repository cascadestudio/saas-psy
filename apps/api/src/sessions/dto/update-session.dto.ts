import { IsString, IsOptional, IsEnum, IsObject } from 'class-validator';

export enum SessionStatus {
  CREATED = 'CREATED',
  SENT = 'SENT',
  STARTED = 'STARTED',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

export class UpdateSessionDto {
  @IsOptional()
  @IsEnum(SessionStatus)
  status?: SessionStatus;

  @IsOptional()
  @IsObject()
  responses?: Record<string, any>;

  @IsOptional()
  @IsString()
  patientComments?: string;
}
