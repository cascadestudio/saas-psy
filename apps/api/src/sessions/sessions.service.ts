import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { EncryptionService } from '../encryption/encryption.service';
import { CreateSessionDto, UpdateSessionDto, SubmitResponsesDto } from './dto';
import { createId } from '@paralleldrive/cuid2';

@Injectable()
export class SessionsService {
  private readonly logger = new Logger(SessionsService.name);

  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private encryption: EncryptionService,
  ) {}

  async create(practitionerId: string, dto: CreateSessionDto) {
    // Get patient data
    const patient = await this.prisma.patient.findUnique({
      where: { id: dto.patientId },
    });

    if (!patient) {
      throw new NotFoundException('Patient non trouvé');
    }

    if (patient.practitionerId !== practitionerId) {
      throw new ForbiddenException('Accès non autorisé à ce patient');
    }

    // Get practitioner data
    const practitioner = await this.prisma.user.findUnique({
      where: { id: practitionerId },
    });

    if (!practitioner) {
      throw new NotFoundException('Praticien non trouvé');
    }

    // Get scales data
    const scales = await this.prisma.scale.findMany({
      where: { id: { in: dto.scaleIds } },
    });

    const scalesMap = new Map(scales.map((s) => [s.id, s]));

    // Generate a unique batchId for this group of sessions
    const batchId = createId();

    // Create sessions for each scale (one session per scale)
    const sessions = await this.prisma.$transaction(
      dto.scaleIds.map((scaleId) =>
        this.prisma.session.create({
          data: {
            scaleId,
            patientId: dto.patientId,
            practitionerId,
            batchId,
            status: 'SENT',
            sentAt: new Date(),
            // Set expiration to 7 days from now
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        }),
      ),
    );

    // Build scale names list for the email
    const scaleNames = dto.scaleIds.map((scaleId) => {
      const scale = scalesMap.get(scaleId);
      return scale?.title || 'Questionnaire';
    });

    // Decrypt patient/practitioner names for email
    const decryptedPatientFirstName = this.encryption.decryptField(patient.firstName);
    const decryptedPatientLastName = this.encryption.decryptField(patient.lastName);

    // Send ONE email with link to portal
    const practitionerName = [
      this.encryption.decryptField(practitioner.firstName),
      this.encryption.decryptField(practitioner.lastName),
    ]
      .filter(Boolean)
      .join(' ') || 'Votre praticien';

    const emailResult = await this.emailService.sendBatchSessionEmail({
      patientEmail: patient.email,
      patientFirstName: decryptedPatientFirstName || '',
      patientLastName: decryptedPatientLastName || '',
      batchId,
      scaleNames,
      practitionerName,
      message: dto.message,
    });

    // Log email result
    if (!emailResult.success) {
      this.logger.warn(
        `Email failed to send for patient ${patient.id}: ${emailResult.error}`,
      );
    }

    return {
      sessions,
      batchId,
      message: `${sessions.length} échelle(s) envoyée(s) avec succès`,
      emailsSent: emailResult.success ? 1 : 0,
      emailsFailed: emailResult.success ? 0 : 1,
    };
  }

  async findByPatientId(patientId: string, practitionerId: string) {
    // Verify patient belongs to practitioner
    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      throw new NotFoundException('Patient non trouvé');
    }

    if (patient.practitionerId !== practitionerId) {
      throw new ForbiddenException('Accès non autorisé à ce patient');
    }

    const sessions = await this.prisma.session.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
      include: {
        patient: true,
      },
    });

    return { sessions: sessions.map((s) => this.decryptSession(s)) };
  }

  async findById(id: string, practitionerId: string) {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: {
        patient: true,
      },
    });

    if (!session) {
      throw new NotFoundException('Session non trouvée');
    }

    if (session.practitionerId !== practitionerId) {
      throw new ForbiddenException('Accès non autorisé à cette session');
    }

    return { session: this.decryptSession(session) };
  }

  async findAll(practitionerId: string) {
    const sessions = await this.prisma.session.findMany({
      where: { practitionerId },
      orderBy: { createdAt: 'desc' },
      include: {
        patient: true,
      },
    });

    return { sessions: sessions.map((s) => this.decryptSession(s)) };
  }

  async update(id: string, practitionerId: string, dto: UpdateSessionDto) {
    const session = await this.prisma.session.findUnique({
      where: { id },
    });

    if (!session) {
      throw new NotFoundException('Session non trouvée');
    }

    if (session.practitionerId !== practitionerId) {
      throw new ForbiddenException('Accès non autorisé à cette session');
    }

    const updatedSession = await this.prisma.session.update({
      where: { id },
      data: dto,
    });

    return { session: this.decryptSession(updatedSession) };
  }

  async cancel(id: string, practitionerId: string) {
    const session = await this.prisma.session.findUnique({
      where: { id },
    });

    if (!session) {
      throw new NotFoundException('Session non trouvée');
    }

    if (session.practitionerId !== practitionerId) {
      throw new ForbiddenException('Accès non autorisé à cette session');
    }

    if (session.status === 'COMPLETED') {
      throw new BadRequestException('Impossible d\'annuler une session complétée');
    }

    const cancelledSession = await this.prisma.session.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    return { session: this.decryptSession(cancelledSession) };
  }

  // Public endpoint for patient portal (no auth required)
  async getPatientPortalSessions(batchId: string) {
    const sessions = await this.prisma.session.findMany({
      where: { batchId },
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        scale: {
          select: {
            id: true,
            title: true,
            description: true,
            estimatedTime: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    if (sessions.length === 0) {
      throw new NotFoundException('Portail non trouvé');
    }

    // Get patient info from first session (decrypt encrypted names)
    const patient = sessions[0].patient;
    const patientFirstName = this.encryption.decryptField(patient.firstName) || '';
    const patientLastName = this.encryption.decryptField(patient.lastName) || '';

    // Separate pending and completed sessions
    const pendingSessions = sessions.filter(
      (s) => s.status === 'SENT' || s.status === 'STARTED',
    );
    const completedSessions = sessions.filter((s) => s.status === 'COMPLETED');

    return {
      portal: {
        batchId,
        patientFirstName,
        patientLastName,
        totalCount: sessions.length,
        pendingCount: pendingSessions.length,
        completedCount: completedSessions.length,
        allCompleted: pendingSessions.length === 0,
        sessions: sessions.map((s) => ({
          id: s.id,
          scaleId: s.scale?.id,
          scaleTitle: s.scale?.title,
          scaleDescription: s.scale?.description,
          estimatedTime: s.scale?.estimatedTime,
          status: s.status,
          isCompleted: s.status === 'COMPLETED',
          completedAt: s.completedAt,
        })),
      },
    };
  }

  // Public endpoint for patients (no auth required)
  async getSessionForPatient(id: string) {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        scale: true,
      },
    });

    if (!session) {
      throw new NotFoundException('Session non trouvée');
    }

    // Check if session is expired
    if (session.expiresAt && new Date() > session.expiresAt) {
      await this.prisma.session.update({
        where: { id },
        data: { status: 'EXPIRED' },
      });
      throw new BadRequestException('Cette session a expiré');
    }

    if (session.status === 'COMPLETED') {
      throw new BadRequestException('Cette session est déjà complétée');
    }

    if (session.status === 'CANCELLED') {
      throw new BadRequestException('Cette session a été annulée');
    }

    // Mark as started if not already
    if (session.status === 'SENT') {
      await this.prisma.session.update({
        where: { id },
        data: {
          status: 'STARTED',
          startedAt: new Date(),
        },
      });
    }

    return {
      session: {
        id: session.id,
        scaleId: session.scaleId,
        batchId: session.batchId,
        patientFirstName: this.encryption.decryptField(session.patient.firstName),
        patientLastName: this.encryption.decryptField(session.patient.lastName),
        status: session.status === 'SENT' ? 'STARTED' : session.status,
        scale: session.scale
          ? {
              id: session.scale.id,
              title: session.scale.title,
              description: session.scale.description,
              instructions: session.scale.longDescription,
              questions: session.scale.questions,
              answerScales: session.scale.answerScales,
              scoring: session.scale.scoring,
              estimatedTime: session.scale.estimatedTime,
            }
          : null,
      },
    };
  }

  // Public endpoint for patients to submit responses
  async submitResponses(id: string, dto: SubmitResponsesDto) {
    const session = await this.prisma.session.findUnique({
      where: { id },
    });

    if (!session) {
      throw new NotFoundException('Session non trouvée');
    }

    if (session.status === 'COMPLETED') {
      throw new BadRequestException('Cette session est déjà complétée');
    }

    if (session.status === 'CANCELLED') {
      throw new BadRequestException('Cette session a été annulée');
    }

    if (session.status === 'EXPIRED' || (session.expiresAt && new Date() > session.expiresAt)) {
      throw new BadRequestException('Cette session a expiré');
    }

    // Calculate score based on responses (simplified - will be enhanced with ScoringModule)
    const { score, interpretation } = this.calculateScore(
      session.scaleId,
      dto.responses,
    );

    const updatedSession = await this.prisma.session.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        responses: this.encryption.encryptJson(dto.responses),
        patientComments: this.encryption.encryptField(dto.patientComments),
        score: this.encryption.encryptJson(score),
        interpretation: this.encryption.encryptField(interpretation),
      },
    });

    return {
      session: this.decryptSession(updatedSession),
      message: 'Réponses enregistrées avec succès',
    };
  }

  // Simplified scoring - will be moved to ScoringModule
  private calculateScore(
    scaleId: string,
    responses: Record<string, any>,
  ): { score: number; interpretation: string } {
    // Simple sum for most scales
    let totalScore = 0;

    if (typeof responses === 'object') {
      for (const key in responses) {
        const value = responses[key];
        if (typeof value === 'number') {
          totalScore += value;
        } else if (typeof value === 'object' && value !== null) {
          // Handle dual-scale scales (like Liebowitz with anxiety + avoidance)
          if ('anxiety' in value) totalScore += value.anxiety || 0;
          if ('avoidance' in value) totalScore += value.avoidance || 0;
        }
      }
    }

    // Basic interpretation based on score ranges (will be enhanced)
    let interpretation = 'Score calculé';

    // BDI-II ranges
    if (scaleId.includes('bdi')) {
      if (totalScore <= 13) interpretation = 'Dépression minimale';
      else if (totalScore <= 19) interpretation = 'Dépression légère';
      else if (totalScore <= 28) interpretation = 'Dépression modérée';
      else interpretation = 'Dépression sévère';
    }

    // Liebowitz ranges
    if (scaleId.includes('liebowitz')) {
      if (totalScore <= 30) interpretation = 'Absence d\'anxiété sociale';
      else if (totalScore <= 60) interpretation = 'Anxiété sociale légère';
      else if (totalScore <= 90) interpretation = 'Anxiété sociale modérée';
      else interpretation = 'Anxiété sociale sévère';
    }

    return { score: totalScore, interpretation };
  }

  private decryptSession(session: any) {
    if (!session) return session;
    const decrypted = {
      ...session,
      responses: this.encryption.decryptJson(session.responses),
      score: this.encryption.decryptJson(session.score),
      interpretation: this.encryption.decryptField(session.interpretation),
      patientComments: this.encryption.decryptField(session.patientComments),
    };
    // Decrypt included patient relation
    if (decrypted.patient) {
      decrypted.patient = {
        ...decrypted.patient,
        firstName: this.encryption.decryptField(decrypted.patient.firstName),
        lastName: this.encryption.decryptField(decrypted.patient.lastName),
        notes: this.encryption.decryptField(decrypted.patient.notes),
      };
    }
    return decrypted;
  }
}
