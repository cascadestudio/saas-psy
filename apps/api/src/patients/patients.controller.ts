import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto, UpdatePatientDto } from './dto';
import { CurrentUser } from '../auth/decorators';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(
    @CurrentUser('id') practitionerId: string,
    @Body() dto: CreatePatientDto,
  ) {
    return this.patientsService.create(practitionerId, dto);
  }

  @Get()
  findAll(@CurrentUser('id') practitionerId: string) {
    return this.patientsService.findAll(practitionerId);
  }

  @Get('search')
  search(
    @CurrentUser('id') practitionerId: string,
    @Query('q') query: string,
  ) {
    return this.patientsService.search(practitionerId, query || '');
  }

  @Get(':id')
  findById(
    @Param('id') id: string,
    @CurrentUser('id') practitionerId: string,
  ) {
    return this.patientsService.findById(id, practitionerId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @CurrentUser('id') practitionerId: string,
    @Body() dto: UpdatePatientDto,
  ) {
    return this.patientsService.update(id, practitionerId, dto);
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
    @CurrentUser('id') practitionerId: string,
  ) {
    return this.patientsService.delete(id, practitionerId);
  }
}
