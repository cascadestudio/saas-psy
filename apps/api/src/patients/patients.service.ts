import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto, UpdatePatientDto } from './dto';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async create(practitionerId: string, dto: CreatePatientDto) {
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

    const patient = await this.prisma.patient.create({
      data: {
        ...dto,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : null,
        practitionerId,
      },
    });

    return { patient };
  }

  async findAll(practitionerId: string) {
    const patients = await this.prisma.patient.findMany({
      where: { practitionerId },
      orderBy: { createdAt: 'desc' },
    });

    return { patients };
  }

  async findById(id: string, practitionerId: string) {
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

    return { patient };
  }

  async update(id: string, practitionerId: string, dto: UpdatePatientDto) {
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

    const patient = await this.prisma.patient.update({
      where: { id },
      data: {
        ...dto,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
      },
    });

    return { patient };
  }

  async delete(id: string, practitionerId: string) {
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

    await this.prisma.patient.delete({
      where: { id },
    });

    return { message: 'Patient supprimé avec succès' };
  }

  async search(practitionerId: string, query: string) {
    const patients = await this.prisma.patient.findMany({
      where: {
        practitionerId,
        OR: [
          { firstName: { contains: query, mode: 'insensitive' } },
          { lastName: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: { lastName: 'asc' },
    });

    return { patients };
  }
}
