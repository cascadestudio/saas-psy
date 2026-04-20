import { Injectable, NotFoundException } from '@nestjs/common';
import { scales, getScaleById } from '@melya/core';

@Injectable()
export class ScalesService {
  findAll() {
    return {
      scales: scales.map(({ id, title, description, category, estimatedTime }) => ({
        id,
        title,
        description,
        category,
        estimatedTime,
      })),
    };
  }

  findById(id: string) {
    const scale = getScaleById(id);
    if (!scale) {
      throw new NotFoundException('Échelle non trouvée');
    }
    return { scale };
  }
}
