# Authentication Usage Guide

## Overview

The authentication system is now fully implemented with JWT tokens. All routes are **protected by default** unless marked with `@Public()` decorator.

## API Endpoints

### Public Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "psychologue@example.com",
  "password": "SecurePass123!",
  "firstName": "Marie",
  "lastName": "Dupont"
}
```

**Response:**
```json
{
  "user": {
    "id": "cm5x...",
    "email": "psychologue@example.com",
    "firstName": "Marie",
    "lastName": "Dupont",
    "role": "PRACTITIONER",
    "profile": {
      "id": "cm5x...",
      "favoriteQuestionnaires": []
    }
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "psychologue@example.com",
  "password": "SecurePass123!"
}
```

**Response:** Same as register

#### Health Check
```http
GET /api/health
GET /api/auth/health
```

### Protected Endpoints

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <your-token>
```

**Response:**
```json
{
  "user": {
    "id": "cm5x...",
    "email": "psychologue@example.com",
    "firstName": "Marie",
    "lastName": "Dupont",
    "role": "PRACTITIONER",
    "profile": {
      "id": "cm5x...",
      "favoriteQuestionnaires": []
    }
  }
}
```

## Using in Your Controllers

### Mark route as public
```typescript
import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/decorators';

@Controller('questionnaires')
export class QuestionnairesController {
  
  @Public()
  @Get()
  findAll() {
    // This route is accessible without authentication
    return [];
  }
}
```

### Get current user in protected routes
```typescript
import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from './auth/decorators';

@Controller('profile')
export class ProfileController {
  
  @Get()
  getMyProfile(@CurrentUser() user: any) {
    // user is automatically injected from JWT
    // All routes are protected by default
    return {
      message: `Hello ${user.firstName}`,
      userId: user.id,
    };
  }
  
  @Get('favorites')
  getFavorites(@CurrentUser('id') userId: string) {
    // You can also extract specific properties
    return { userId };
  }
}
```

### Manual guard usage (if needed)
```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  
  @UseGuards(JwtAuthGuard)
  @Get()
  adminOnly() {
    // This route requires authentication
    return { message: 'Admin area' };
  }
}
```

## Frontend Integration

### Login Flow

```typescript
// apps/web/lib/api-client.ts
export async function login(email: string, password: string) {
  const response = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  const data = await response.json();
  
  // Store token (localStorage, cookie, or Auth.js session)
  localStorage.setItem('accessToken', data.accessToken);
  
  return data.user;
}

export async function fetchProtectedData() {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch('http://localhost:3001/api/some-protected-route', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  return response.json();
}
```

### Using with Auth.js (NextAuth)

If you want to integrate with Auth.js later:

```typescript
// apps/web/auth.config.ts
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        // Call your NestJS API
        const response = await fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });
        
        if (!response.ok) return null;
        
        const { user, accessToken } = await response.json();
        
        return {
          ...user,
          accessToken, // Store token in session
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
```

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!"
  }'
```

### Get Current User (with token)
```bash
TOKEN="your-token-here"

curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

## Security Notes

1. **JWT Secret**: Change `JWT_SECRET` in production!
2. **Password Requirements**: Minimum 8 characters (enforced by DTO validation)
3. **Token Expiration**: Configurable via `JWT_EXPIRES_IN` (default: 7 days)
4. **All routes protected by default**: Use `@Public()` decorator for public routes
5. **Password Hashing**: bcrypt with 10 rounds

## Error Handling

### Common Errors

- `401 Unauthorized`: Invalid or missing token
- `400 Bad Request`: Validation failed (e.g., password too short)
- `409 Conflict`: Email already exists (registration)
- `404 Not Found`: User not found

### Example Error Response
```json
{
  "statusCode": 401,
  "message": "Email ou mot de passe incorrect",
  "error": "Unauthorized"
}
```

## Next Steps

1. **Update Next.js frontend** to use these endpoints
2. **Create API client** in `apps/web/lib/api-client.ts`
3. **Replace Supabase auth** calls with NestJS API calls
4. **Implement refresh token** (optional, for better security)
5. **Add email verification** (send verification email after registration)
6. **Add password reset** flow

Happy coding! 🚀

