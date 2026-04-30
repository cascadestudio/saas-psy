import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CurrentUser } from '../auth/decorators';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@CurrentUser('id') userId: string) {
    return this.usersService.findById(userId);
  }

  @Patch('me')
  updateMe(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateUserDto,
    @Req() req: Request,
  ) {
    return this.usersService.updateUser(
      userId,
      dto,
      req.ip,
      req.headers['user-agent'],
    );
  }

  @Delete('me')
  @HttpCode(HttpStatus.OK)
  deleteAccount(
    @CurrentUser('id') userId: string,
    @CurrentUser('email') email: string,
    @Req() req: Request,
  ) {
    return this.usersService.deleteAccount(
      userId,
      email,
      req.ip,
      req.headers['user-agent'],
    );
  }
}
