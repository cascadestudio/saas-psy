import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export interface AuditLogParams {
  userId: string | null;
  action: string;
  resource: string;
  resourceId?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

@Injectable()
export class AuditLogService {
  constructor(private prisma: PrismaService) {}

  async log(params: AuditLogParams): Promise<void> {
    await this.prisma.auditLog.create({ data: params });
  }

  async logInTransaction(
    tx: Prisma.TransactionClient,
    params: AuditLogParams,
  ): Promise<void> {
    await tx.auditLog.create({ data: params });
  }
}
