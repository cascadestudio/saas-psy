import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
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
  ) {
    return this.sessionsService.create(practitionerId, dto);
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
  ) {
    return this.sessionsService.findById(id, practitionerId);
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
  ) {
    return this.sessionsService.cancel(id, practitionerId);
  }

  // Patient endpoints (public - no auth)

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
