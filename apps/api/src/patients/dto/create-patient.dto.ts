import { IsEmail, IsString, IsOptional, MaxLength, IsDateString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MaxLength(50)
  lastName: string;

  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @IsOptional()
  @IsDateString({}, { message: 'Date de naissance invalide' })
  birthDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
