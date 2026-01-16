import { IsString, IsArray, IsOptional, ArrayMinSize } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  patientId: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'Au moins un questionnaire doit être sélectionné' })
  @IsString({ each: true })
  questionnaireIds: string[];

  @IsOptional()
  @IsString()
  message?: string;
}
