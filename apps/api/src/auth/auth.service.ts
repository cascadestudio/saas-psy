import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';
import { RegisterDto, LoginDto } from './dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      // Create user
      const user = await this.usersService.createUser({
        email: registerDto.email,
        password: registerDto.password,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
      });

      // Generate JWT token
      const tokens = await this.generateTokens(
        user.id,
        user.email,
        user.role as string,
      );

      // Send welcome email (non-blocking)
      this.emailService
        .sendWelcomeEmail(user.email, user.firstName ?? undefined)
        .catch((err) => {
          // Don't fail registration if email fails
          console.error('Failed to send welcome email:', err);
        });

      return {
        user,
        ...tokens,
      };
    } catch (error: any) {
      if (error?.code === 'P2002') {
        throw new BadRequestException(
          'Un utilisateur avec cet email existe déjà',
        );
      }
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    // Find user
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // Validate password
    const isPasswordValid = await this.usersService.validatePassword(
      loginDto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // Generate tokens
    const tokens = await this.generateTokens(
      user.id,
      user.email,
      user.role as string,
    );

    // Return user without password hash
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...sanitizedUser } = user;

    return {
      user: sanitizedUser,
      ...tokens,
    };
  }

  async validateUser(userId: string): Promise<any> {
    return this.usersService.findById(userId);
  }

  async forgotPassword(email: string): Promise<void> {
    // Find user by email
    const user = await this.usersService.findByEmail(email);

    // Security: Don't reveal if email exists - always return success
    if (!user) {
      return;
    }

    // Generate reset token (32 bytes = 64 hex characters)
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash token before storing (SHA256)
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Token expires in 1 hour
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // Save hashed token to database
    await this.usersService.updatePasswordResetToken(
      user.id,
      hashedToken,
      expiresAt,
    );

    // Send email with reset link containing raw token
    await this.emailService.sendPasswordResetEmail(user.email, resetToken);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    // Hash the provided token to compare with database
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user by hashed token
    const user = await this.usersService.findByPasswordResetToken(hashedToken);

    if (!user) {
      throw new BadRequestException('Token de réinitialisation invalide ou expiré');
    }

    // Check if token is expired
    if (user.passwordResetExpiresAt && user.passwordResetExpiresAt < new Date()) {
      throw new BadRequestException('Token de réinitialisation expiré');
    }

    // Update password and clear reset fields
    await this.usersService.resetPassword(user.id, newPassword);
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const payload: JwtPayload = {
      sub: userId,
      email,
      role,
    };

    // JWT module is already configured with secret and expiresIn
    // so we don't need to pass them again
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      tokenType: 'Bearer',
    };
  }
}
