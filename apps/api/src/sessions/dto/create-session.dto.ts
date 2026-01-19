import { IsString, IsArray, IsOptional, ArrayMinSize } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  patientId: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'Au moins une échelle doit être sélectionnée' })
  @IsString({ each: true })
  scaleIds: string[];

  @IsOptional()
  @IsString()
  message?: string;
}
