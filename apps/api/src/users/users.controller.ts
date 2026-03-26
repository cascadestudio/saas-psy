import { Controller, Delete, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CurrentUser } from '../auth/decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
