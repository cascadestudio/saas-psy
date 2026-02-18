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

    return { favorites: profile.favoriteScales };
  }

  async toggleFavorite(userId: string, scaleId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException('Profil non trouvé');
    }

    const currentFavorites = profile.favoriteScales;
    const isFavorite = currentFavorites.includes(scaleId);

    let newFavorites: string[];
    let action: 'add' | 'remove';

    if (isFavorite) {
      newFavorites = currentFavorites.filter((id) => id !== scaleId);
      action = 'remove';
    } else {
      newFavorites = [...currentFavorites, scaleId];
      action = 'add';
    }

    await this.prisma.profile.update({
      where: { userId },
      data: { favoriteScales: newFavorites },
    });

    return {
      action,
      favorites: newFavorites,
    };
  }
}
