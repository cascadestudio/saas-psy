import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScalesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const scales = await this.prisma.scale.findMany({
      where: { isPublished: true },
      orderBy: { title: 'asc' },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        estimatedTime: true,
      },
    });

    return { scales };
  }

  async findById(id: string) {
    const scale = await this.prisma.scale.findUnique({
      where: { id },
    });

    if (!scale) {
      throw new NotFoundException('Échelle non trouvée');
    }

    return { scale };
  }
}
