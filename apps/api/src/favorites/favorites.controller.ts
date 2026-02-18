import { Controller, Get, Post, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CurrentUser } from '../auth/decorators';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites(@CurrentUser('id') userId: string) {
    return this.favoritesService.getFavorites(userId);
  }

  @Post(':scaleId/toggle')
  toggleFavorite(
    @CurrentUser('id') userId: string,
    @Param('scaleId') scaleId: string,
  ) {
    return this.favoritesService.toggleFavorite(userId, scaleId);
  }
}
