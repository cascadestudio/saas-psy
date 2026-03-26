# Password Reset Flow - Implementation Plan

## Overview
Add password reset functionality following existing auth patterns.

---

## Files to Modify/Create

### Backend (apps/api)

| File | Action |
|------|--------|
| `prisma/schema.prisma` | Add reset token fields to User |
| `src/auth/dto/forgot-password.dto.ts` | Create - email validation |
| `src/auth/dto/reset-password.dto.ts` | Create - token + new password |
| `src/auth/auth.service.ts` | Add forgotPassword() and resetPassword() |
| `src/auth/auth.controller.ts` | Add 2 new @Public() endpoints |
| `src/email/email.service.ts` | Add sendPasswordResetEmail() |

### Frontend (apps/web)

| File | Action |
|------|--------|
| `lib/api-client.ts` | Add forgotPassword() and resetPassword() |
| `app/(auth-pages)/forgot-password/page.tsx` | Create - request form |
| `components/auth/forgot-password-form.tsx` | Create - client form |
| `app/(auth-pages)/reset-password/[token]/page.tsx` | Create - reset form |
| `components/auth/reset-password-form.tsx` | Create - client form |
| `components/auth/sign-in-form.tsx` | Add "Mot de passe oublié ?" link |

---

## Implementation Steps

### 1. Database Schema

Add to User model:
```prisma
model User {
  // ... existing fields ...
  passwordResetToken     String?   @unique @map("password_reset_token")
  passwordResetExpiresAt DateTime? @map("password_reset_expires_at")
}
```

Run migration:
```bash
cd apps/api && npx prisma migrate dev --name add_password_reset_fields
```

### 2. Backend DTOs

**forgot-password.dto.ts**
```typescript
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail()
  email: string;
}
```

**reset-password.dto.ts**
```typescript
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  token: string;

  @IsString()
  @MinLength(8)
  newPassword: string;
}
```

### 3. Auth Service Methods

**forgotPassword(email: string)**
1. Find user by email
2. If not found → return success anyway (security: don't reveal if email exists)
3. Generate token: `crypto.randomBytes(32).toString('hex')`
4. Hash token with SHA256 for storage
5. Save hashed token + expiry (1 hour from now)
6. Send email with raw token in link
7. Return generic success message

**resetPassword(token: string, newPassword: string)**
1. Hash provided token with SHA256
2. Find user by hashed token
3. Check token not expired
4. Hash new password with bcrypt
5. Update user: new passwordHash, clear reset fields
6. Return success

### 4. Auth Controller Endpoints

```typescript
@Public()
@Post('forgot-password')
async forgotPassword(@Body() dto: ForgotPasswordDto) {
  await this.authService.forgotPassword(dto.email);
  return { message: 'Si cet email existe, un lien de réinitialisation a été envoyé.' };
}

@Public()
@Post('reset-password')
async resetPassword(@Body() dto: ResetPasswordDto) {
  await this.authService.resetPassword(dto.token, dto.newPassword);
  return { message: 'Mot de passe mis à jour avec succès.' };
}
```

### 5. Email Service

Add `sendPasswordResetEmail()` method:
- Build reset URL: `${APP_URL}/reset-password/${token}`
- HTML template matching existing email style
- Subject: "Réinitialisation de votre mot de passe - Melya"
- Log to EmailLog table

### 6. Frontend - API Client

Add to `authApi` in `lib/api-client.ts`:
```typescript
forgotPassword: async (email: string) => {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  // ...
},

resetPassword: async (token: string, newPassword: string) => {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword }),
  });
  // ...
},
```

### 7. Frontend - Forgot Password Page

**Route:** `/forgot-password`

- Email input
- Submit button
- Success: "Un email a été envoyé si cette adresse existe."
- Link: "Retour à la connexion"

### 8. Frontend - Reset Password Page

**Route:** `/reset-password/[token]`

- Extract token from URL params
- New password input
- Confirm password input
- Submit → redirect to `/sign-in` with success toast

### 9. Update Sign-In Form

Add link below password field:
```tsx
<Link href="/forgot-password" className="text-sm text-muted-foreground hover:underline">
  Mot de passe oublié ?
</Link>
```

---

## Security Considerations

| Concern | Solution |
|---------|----------|
| Email enumeration | Always return same success message |
| Token theft | Hash token before storing (SHA256) |
| Token reuse | Clear token after successful reset |
| Brute force | Short expiry (1 hour) |
| Weak passwords | Enforce 8 char minimum (same as signup) |

---

## Flow Diagram

```
User clicks "Mot de passe oublié ?"
        │
        ▼
┌─────────────────────┐
│  /forgot-password   │
│  Enter email        │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  POST /auth/        │
│  forgot-password    │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Email sent with    │
│  reset link         │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  /reset-password/   │
│  [token]            │
│  Enter new password │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  POST /auth/        │
│  reset-password     │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Redirect to        │
│  /sign-in           │
│  "Password updated" │
└─────────────────────┘
```

---

## Verification Checklist

- [ ] Migration runs successfully
- [ ] Forgot password form submits without error
- [ ] Email received (check Resend dashboard or logs)
- [ ] Reset link opens reset page with token
- [ ] New password saves successfully
- [ ] Can sign in with new password
- [ ] Old password no longer works
- [ ] Expired token shows error
- [ ] Used token cannot be reused
