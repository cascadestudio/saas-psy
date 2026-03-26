import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
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
  findAll(
    @CurrentUser('id') practitionerId: string,
    @Query('status') status?: 'active' | 'archived',
  ) {
    return this.patientsService.findAll(practitionerId, status || 'active');
  }

  @Get('count/active')
  countActive(@CurrentUser('id') practitionerId: string) {
    return this.patientsService.countActive(practitionerId);
  }

  @Get('search')
  search(
    @CurrentUser('id') practitionerId: string,
    @Query('q') query: string,
    @Query('status') status?: 'active' | 'archived',
  ) {
    return this.patientsService.search(practitionerId, query || '', status || 'active');
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
    @Req() req: Request,
  ) {
    return this.patientsService.delete(
      id,
      practitionerId,
      req.ip,
      req.headers['user-agent'],
    );
  }

  @Patch(':id/archive')
  archive(
    @Param('id') id: string,
    @CurrentUser('id') practitionerId: string,
  ) {
    return this.patientsService.archive(id, practitionerId);
  }

  @Patch(':id/restore')
  restore(
    @Param('id') id: string,
    @CurrentUser('id') practitionerId: string,
  ) {
    return this.patientsService.restore(id, practitionerId);
  }
}
