import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getFavorites(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException('Profil non trouvé');
    }

    return { favorites: profile.favoriteQuestionnaires };
  }

  async toggleFavorite(userId: string, questionnaireId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException('Profil non trouvé');
    }

    const currentFavorites = profile.favoriteQuestionnaires;
    const isFavorite = currentFavorites.includes(questionnaireId);

    let newFavorites: string[];
    let action: 'add' | 'remove';

    if (isFavorite) {
      newFavorites = currentFavorites.filter((id) => id !== questionnaireId);
      action = 'remove';
    } else {
      newFavorites = [...currentFavorites, questionnaireId];
      action = 'add';
    }

    await this.prisma.profile.update({
      where: { userId },
      data: { favoriteQuestionnaires: newFavorites },
    });

    return {
      action,
      favorites: newFavorites,
    };
  }
}
