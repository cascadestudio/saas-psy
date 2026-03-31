import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { SessionsService } from './sessions.service';
import { CreateSessionDto, UpdateSessionDto, SubmitResponsesDto } from './dto';
import { CurrentUser, Public } from '../auth/decorators';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  // Practitioner endpoints (authenticated)

  @Post()
  create(
    @CurrentUser('id') practitionerId: string,
    @Body() dto: CreateSessionDto,
    @Req() req: Request,
  ) {
    return this.sessionsService.create(
      practitionerId,
      dto,
      req.ip,
      req.headers['user-agent'],
    );
  }

  @Get()
  findAll(
    @CurrentUser('id') practitionerId: string,
    @Query('patientId') patientId?: string,
  ) {
    if (patientId) {
      return this.sessionsService.findByPatientId(patientId, practitionerId);
    }
    return this.sessionsService.findAll(practitionerId);
  }

  @Get(':id')
  findById(
    @Param('id') id: string,
    @CurrentUser('id') practitionerId: string,
    @Req() req: Request,
  ) {
    return this.sessionsService.findById(
      id,
      practitionerId,
      req.ip,
      req.headers['user-agent'],
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @CurrentUser('id') practitionerId: string,
    @Body() dto: UpdateSessionDto,
  ) {
    return this.sessionsService.update(id, practitionerId, dto);
  }

  @Post(':id/cancel')
  cancel(
    @Param('id') id: string,
    @CurrentUser('id') practitionerId: string,
    @Req() req: Request,
  ) {
    return this.sessionsService.cancel(
      id,
      practitionerId,
      req.ip,
      req.headers['user-agent'],
    );
  }

  // Patient endpoints (public - no auth)

  @Public()
  @Get('portal/:batchId')
  getPatientPortal(@Param('batchId') batchId: string) {
    return this.sessionsService.getPatientPortalSessions(batchId);
  }

  @Public()
  @Get('patient/:id')
  getSessionForPatient(@Param('id') id: string) {
    return this.sessionsService.getSessionForPatient(id);
  }

  @Public()
  @Post('patient/:id/submit')
  submitResponses(
    @Param('id') id: string,
    @Body() dto: SubmitResponsesDto,
  ) {
    return this.sessionsService.submitResponses(id, dto);
  }
}
