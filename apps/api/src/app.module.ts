import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { FavoritesModule } from './favorites/favorites.module';
import { SessionsModule } from './sessions/sessions.module';
import { ScalesModule } from './scales/scales.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { configValidationSchema } from './config/config.schema';
import { EncryptionModule } from './encryption/encryption.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      validationSchema: configValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    PrismaModule,
    EncryptionModule,
    AuthModule,
    UsersModule,
    PatientsModule,
    FavoritesModule,
    SessionsModule,
    ScalesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Make JWT auth guard global (all routes protected by default)
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
