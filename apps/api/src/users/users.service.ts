import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { AuditAction } from '../audit-log/audit-actions';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private auditLog: AuditLogService,
  ) {}

  async createUser(data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }): Promise<{
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  }> {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Create user and profile in a transaction
    const user = await this.prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: data.email,
          passwordHash,
          firstName: data.firstName,
          lastName: data.lastName,
          role: 'PRACTITIONER',
          isBetaUser: true,
          isPremium: true,
        },
      });

      // Create associated profile
      await tx.profile.create({
        data: {
          userId: newUser.id,
          favoriteScales: [],
        },
      });

      return newUser;
    });

    return this.sanitizeUser(user);
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return this.sanitizeUser(user);
  }

  async updateUser(
    id: string,
    data: { firstName?: string; lastName?: string; email?: string },
    ipAddress?: string,
    userAgent?: string,
  ) {
    if (data.email) {
      const existing = await this.prisma.user.findUnique({
        where: { email: data.email },
        select: { id: true },
      });
      if (existing && existing.id !== id) {
        throw new ConflictException('Un utilisateur avec cet email existe déjà');
      }
    }

    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    this.auditLog
      .log({
        userId: id,
        action: AuditAction.PROFILE_UPDATED,
        resource: 'User',
        resourceId: id,
        metadata: { fieldsUpdated: Object.keys(data) },
        ipAddress,
        userAgent,
      })
      .catch(() => {});

    return this.sanitizeUser(user);
  }

  async validatePassword(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  async updatePasswordResetToken(
    userId: string,
    token: string,
    expiresAt: Date,
  ): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordResetToken: token,
        passwordResetExpiresAt: expiresAt,
      },
    });
  }

  async findByPasswordResetToken(token: string) {
    return this.prisma.user.findUnique({
      where: { passwordResetToken: token },
    });
  }

  async resetPassword(userId: string, newPassword: string): Promise<void> {
    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset fields
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash,
        passwordResetToken: null,
        passwordResetExpiresAt: null,
      },
    });
  }

  async deleteAccount(
    userId: string,
    userEmail: string,
    ipAddress?: string,
    userAgent?: string,
  ) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const [patientCount, sessionCount] = await Promise.all([
      this.prisma.patient.count({ where: { practitionerId: userId } }),
      this.prisma.session.count({ where: { practitionerId: userId } }),
    ]);

    await this.prisma.$transaction(
      async (tx) => {
        // 1. Nullify EmailLog sessionId references
        const sessions = await tx.session.findMany({
          where: { practitionerId: userId },
          select: { id: true },
        });
        if (sessions.length > 0) {
          await tx.emailLog.updateMany({
            where: { sessionId: { in: sessions.map((s) => s.id) } },
            data: { sessionId: null },
          });
        }

        // 2. Delete all sessions
        await tx.session.deleteMany({ where: { practitionerId: userId } });

        // 3. Delete all patients
        await tx.patient.deleteMany({ where: { practitionerId: userId } });

        // 4. Audit log before deleting user (userId still valid)
        await this.auditLog.logInTransaction(tx, {
          userId,
          action: AuditAction.USER_ACCOUNT_DELETED,
          resource: 'User',
          resourceId: userId,
          metadata: {
            email: userEmail,
            patientsDeleted: patientCount,
            sessionsDeleted: sessionCount,
          },
          ipAddress,
          userAgent,
        });

        // 5. Nullify userId on audit logs (FK constraint)
        await tx.auditLog.updateMany({
          where: { userId },
          data: { userId: null },
        });

        // 6. Delete profile (CASCADE would handle it, but explicit for clarity)
        await tx.profile.deleteMany({ where: { userId } });

        // 7. Delete user
        await tx.user.delete({ where: { id: userId } });
      },
      { timeout: 30000 },
    );

    return {
      message: 'Compte et toutes les données associées supprimés avec succès',
      deletedData: {
        patients: patientCount,
        sessions: sessionCount,
      },
    };
  }

  // Remove sensitive data
  private sanitizeUser(user: any): any {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }
}

