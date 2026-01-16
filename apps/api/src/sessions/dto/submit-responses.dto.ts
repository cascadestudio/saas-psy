import { IsObject, IsOptional, IsString } from 'class-validator';

export class SubmitResponsesDto {
  @IsObject()
  responses: Record<string, any>;

  @IsOptional()
  @IsString()
  patientComments?: string;
}
