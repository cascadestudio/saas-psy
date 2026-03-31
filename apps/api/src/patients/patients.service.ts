import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../encryption/encryption.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { AuditAction } from '../audit-log/audit-actions';
import { CreatePatientDto, UpdatePatientDto } from './dto';

@Injectable()
export class PatientsService {
  constructor(
    private prisma: PrismaService,
    private encryption: EncryptionService,
    private auditLog: AuditLogService,
  ) {}

  async create(
    practitionerId: string,
    dto: CreatePatientDto,
    ipAddress?: string,
    userAgent?: string,
  ) {
    // Check if patient with same email already exists for this practitioner
    const existing = await this.prisma.patient.findUnique({
      where: {
        practitionerId_email: {
          practitionerId,
          email: dto.email,
        },
      },
    });

    if (existing) {
      throw new ConflictException('Un patient avec cet email existe déjà');
    }

    try {
      const patient = await this.prisma.patient.create({
        data: {
          firstName: this.encryption.encryptField(dto.firstName)!,
          lastName: this.encryption.encryptField(dto.lastName)!,
          email: dto.email,
          birthDate: dto.birthDate ? new Date(dto.birthDate) : null,
          notes: this.encryption.encryptField(dto.notes),
          practitionerId,
        },
      });

      this.auditLog
        .log({
          userId: practitionerId,
          action: AuditAction.PATIENT_CREATED,
          resource: 'Patient',
          resourceId: patient.id,
          metadata: { email: dto.email },
          ipAddress,
          userAgent,
        })
        .catch(() => {});

      return { patient: this.decryptPatient(patient) };
    } catch (error: any) {
      if (error?.code === 'P2002') {
        throw new ConflictException('Un patient avec cet email existe déjà');
      }
      throw error;
    }
  }

  async findAll(practitionerId: string, status: 'active' | 'archived' = 'active') {
    const patients = await this.prisma.patient.findMany({
      where: {
        practitionerId,
        archivedAt: status === 'archived' ? { not: null } : null,
      },
      orderBy: { createdAt: 'desc' },
    });

    return { patients: patients.map((p) => this.decryptPatient(p)) };
  }

  async findById(
    id: string,
    practitionerId: string,
    ipAddress?: string,
    userAgent?: string,
  ) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      throw new NotFoundException('Patient non trouvé');
    }

    // Ensure patient belongs to the practitioner
    if (patient.practitionerId !== practitionerId) {
      throw new ForbiddenException('Accès non autorisé à ce patient');
    }

    this.auditLog
      .log({
        userId: practitionerId,
        action: AuditAction.PATIENT_VIEWED,
        resource: 'Patient',
        resourceId: id,
        ipAddress,
        userAgent,
      })
      .catch(() => {});

    return { patient: this.decryptPatient(patient) };
  }

  async update(
    id: string,
    practitionerId: string,
    dto: UpdatePatientDto,
    ipAddress?: string,
    userAgent?: string,
  ) {
    // First check if patient exists and belongs to practitioner
    const existing = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Patient non trouvé');
    }

    if (existing.practitionerId !== practitionerId) {
      throw new ForbiddenException('Accès non autorisé à ce patient');
    }

    // If email is being changed, check for duplicates
    if (dto.email && dto.email !== existing.email) {
      const duplicate = await this.prisma.patient.findUnique({
        where: {
          practitionerId_email: {
            practitionerId,
            email: dto.email,
          },
        },
      });

      if (duplicate) {
        throw new ConflictException('Un patient avec cet email existe déjà');
      }
    }

    const encryptedData: Record<string, any> = {};
    if (dto.firstName !== undefined)
      encryptedData.firstName = this.encryption.encryptField(dto.firstName);
    if (dto.lastName !== undefined)
      encryptedData.lastName = this.encryption.encryptField(dto.lastName);
    if (dto.email !== undefined) encryptedData.email = dto.email;
    if (dto.birthDate !== undefined)
      encryptedData.birthDate = dto.birthDate
        ? new Date(dto.birthDate)
        : null;
    if (dto.notes !== undefined)
      encryptedData.notes = this.encryption.encryptField(dto.notes);

    try {
      const patient = await this.prisma.patient.update({
        where: { id },
        data: encryptedData,
      });

      this.auditLog
        .log({
          userId: practitionerId,
          action: AuditAction.PATIENT_UPDATED,
          resource: 'Patient',
          resourceId: id,
          metadata: { fieldsUpdated: Object.keys(dto) },
          ipAddress,
          userAgent,
        })
        .catch(() => {});

      return { patient: this.decryptPatient(patient) };
    } catch (error: any) {
      if (error?.code === 'P2002') {
        throw new ConflictException('Un patient avec cet email existe déjà');
      }
      throw error;
    }
  }

  async delete(
    id: string,
    practitionerId: string,
    ipAddress?: string,
    userAgent?: string,
  ) {
    const existing = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Patient non trouvé');
    }

    if (existing.practitionerId !== practitionerId) {
      throw new ForbiddenException('Accès non autorisé à ce patient');
    }

    const sessionCount = await this.prisma.session.count({
      where: { patientId: id },
    });

    await this.prisma.$transaction(async (tx) => {
      // Nullify sessionId references in EmailLog (data hygiene)
      const sessions = await tx.session.findMany({
        where: { patientId: id },
        select: { id: true },
      });
      if (sessions.length > 0) {
        await tx.emailLog.updateMany({
          where: { sessionId: { in: sessions.map((s) => s.id) } },
          data: { sessionId: null },
        });
      }

      // Delete all sessions for this patient
      await tx.session.deleteMany({ where: { patientId: id } });

      // Delete the patient
      await tx.patient.delete({ where: { id } });

      // Audit log
      await this.auditLog.logInTransaction(tx, {
        userId: practitionerId,
        action: AuditAction.PATIENT_DELETED,
        resource: 'Patient',
        resourceId: id,
        metadata: {
          patientEmail: existing.email,
          sessionsDeleted: sessionCount,
        },
        ipAddress,
        userAgent,
      });
    });

    return { message: 'Patient et données associées supprimés avec succès' };
  }

  async search(practitionerId: string, query: string, status: 'active' | 'archived' = 'active') {
    // firstName/lastName are encrypted → can't use DB-level LIKE/contains
    // Load all patients, decrypt, then filter in memory
    // Email stays unencrypted and can be filtered at DB level
    const patients = await this.prisma.patient.findMany({
      where: {
        practitionerId,
        archivedAt: status === 'archived' ? { not: null } : null,
      },
    });

    const decrypted = patients.map((p) => this.decryptPatient(p));
    const lowerQuery = query.toLowerCase();

    const filtered = decrypted
      .filter(
        (p) =>
          p.firstName?.toLowerCase().includes(lowerQuery) ||
          p.lastName?.toLowerCase().includes(lowerQuery) ||
          p.email?.toLowerCase().includes(lowerQuery),
      )
      .sort((a, b) => (a.lastName || '').localeCompare(b.lastName || ''));

    return { patients: filtered };
  }

  async countActive(practitionerId: string) {
    const count = await this.prisma.patient.count({
      where: {
        practitionerId,
        archivedAt: null,
      },
    });

    return { count };
  }

  async archive(
    id: string,
    practitionerId: string,
    ipAddress?: string,
    userAgent?: string,
  ) {
    // First check if patient exists and belongs to practitioner
    const existing = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Patient non trouvé');
    }

    if (existing.practitionerId !== practitionerId) {
      throw new ForbiddenException('Accès non autorisé à ce patient');
    }

    if (existing.archivedAt) {
      throw new ConflictException('Ce patient est déjà archivé');
    }

    const patient = await this.prisma.patient.update({
      where: { id },
      data: { archivedAt: new Date() },
    });

    this.auditLog
      .log({
        userId: practitionerId,
        action: AuditAction.PATIENT_ARCHIVED,
        resource: 'Patient',
        resourceId: id,
        metadata: { email: existing.email },
        ipAddress,
        userAgent,
      })
      .catch(() => {});

    return { patient: this.decryptPatient(patient) };
  }

  async restore(
    id: string,
    practitionerId: string,
    ipAddress?: string,
    userAgent?: string,
  ) {
    // First check if patient exists and belongs to practitioner
    const existing = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Patient non trouvé');
    }

    if (existing.practitionerId !== practitionerId) {
      throw new ForbiddenException('Accès non autorisé à ce patient');
    }

    if (!existing.archivedAt) {
      throw new ConflictException('Ce patient n\'est pas archivé');
    }

    const patient = await this.prisma.patient.update({
      where: { id },
      data: { archivedAt: null },
    });

    this.auditLog
      .log({
        userId: practitionerId,
        action: AuditAction.PATIENT_RESTORED,
        resource: 'Patient',
        resourceId: id,
        metadata: { email: existing.email },
        ipAddress,
        userAgent,
      })
      .catch(() => {});

    return { patient: this.decryptPatient(patient) };
  }

  private decryptPatient(patient: any) {
    if (!patient) return patient;
    return {
      ...patient,
      firstName: this.encryption.decryptField(patient.firstName),
      lastName: this.encryption.decryptField(patient.lastName),
      notes: this.encryption.decryptField(patient.notes),
    };
  }
}
