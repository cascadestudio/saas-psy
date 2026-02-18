# Password Reset Implementation - Summary

## Overview
Implemented complete password reset flow for MEL-40 following the plan in `PLAN-PASSWORD-RESET.md`.

## What Was Implemented

### 1. Database Schema ✅
- Added `passwordResetToken` (unique, hashed) to User model
- Added `passwordResetExpiresAt` to User model
- Created and applied migration: `20260217114152_add_password_reset_fields`

### 2. Backend (NestJS) ✅

#### DTOs Created
- `apps/api/src/auth/dto/forgot-password.dto.ts` - Email validation
- `apps/api/src/auth/dto/reset-password.dto.ts` - Token + new password validation (min 8 chars)

#### Auth Service Methods
- `forgotPassword(email)` - Generates token, hashes it (SHA256), saves to DB
- `resetPassword(token, newPassword)` - Validates token, updates password, clears reset fields

#### Users Service Methods
- `updatePasswordResetToken(userId, token, expiresAt)` - Saves reset token
- `findByPasswordResetToken(token)` - Finds user by hashed token
- `resetPassword(userId, newPassword)` - Updates password, clears reset fields

#### Controller Endpoints
- `POST /auth/forgot-password` - Public endpoint, always returns success
- `POST /auth/reset-password` - Public endpoint, resets password

### 3. Frontend (Next.js) ✅

#### API Client Updates
- Added `authApi.forgotPassword(email)`
- Added `authApi.resetPassword(token, newPassword)`

#### Pages Created
- `/forgot-password` - Request password reset
- `/reset-password/[token]` - Reset password with token

#### Components Created
- `components/auth/forgot-password-form.tsx` - Email input form with success state
- `components/auth/reset-password-form.tsx` - New password + confirm password form

#### Sign-In Form Updates
- Added "Mot de passe oublié ?" link above password field
- Shows success message when redirected from reset-password (`?reset=success`)

## Security Features

| Feature | Implementation |
|---------|----------------|
| Token generation | 32 random bytes (64 hex chars) |
| Token storage | SHA256 hashed before saving to DB |
| Token expiry | 1 hour from creation |
| Email enumeration protection | Always returns success, even if email doesn't exist |
| Token reuse prevention | Token cleared after successful reset |
| Password strength | Minimum 8 characters enforced |

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
│  - Generate token   │
│  - Hash (SHA256)    │
│  - Save to DB       │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Email sent         │
│  (TODO: integrate   │
│   email service)    │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  /reset-password/   │
│  [token]            │
│  - New password     │
│  - Confirm password │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  POST /auth/        │
│  reset-password     │
│  - Hash token       │
│  - Find user        │
│  - Check expiry     │
│  - Update password  │
│  - Clear token      │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Redirect to        │
│  /sign-in           │
│  ?reset=success     │
└─────────────────────┘
```

## Testing Instructions

### 1. Request Password Reset
1. Navigate to `http://localhost:3000/sign-in`
2. Click "Mot de passe oublié ?"
3. Enter email: `demo@psychologue.fr`
4. Click "Envoyer le lien de réinitialisation"
5. Check console logs for reset token (email integration TODO)

### 2. Reset Password
1. Copy the token from console logs
2. Navigate to `http://localhost:3000/reset-password/[TOKEN]`
3. Enter new password (min 8 chars)
4. Confirm password
5. Click "Réinitialiser le mot de passe"
6. Verify redirect to sign-in with success message

### 3. Verify Password Changed
1. Try signing in with OLD password - should fail
2. Sign in with NEW password - should succeed

### 4. Verify Token Expiration
1. Wait 1 hour (or manually update DB)
2. Try using expired token
3. Should see error: "Token de réinitialisation expiré"

### 5. Verify Token Reuse Prevention
1. Use a valid token to reset password
2. Try using same token again
3. Should fail (token cleared after use)

## TODO (Future Improvements)

- [ ] Integrate email service (Resend) to send reset links
- [ ] Add email template for password reset
- [ ] Add rate limiting to prevent abuse (max 3 requests per hour)
- [ ] Add audit logging for password reset attempts
- [ ] Consider adding email notification when password is changed
- [ ] Add tests for password reset flow

## Files Modified/Created

### Backend
- ✅ `apps/api/prisma/schema.prisma` - Added reset fields to User model
- ✅ `apps/api/prisma/migrations/20260217114152_add_password_reset_fields/migration.sql`
- ✅ `apps/api/src/auth/dto/forgot-password.dto.ts` - NEW
- ✅ `apps/api/src/auth/dto/reset-password.dto.ts` - NEW
- ✅ `apps/api/src/auth/auth.service.ts` - Added forgotPassword() and resetPassword()
- ✅ `apps/api/src/auth/auth.controller.ts` - Added endpoints
- ✅ `apps/api/src/users/users.service.ts` - Added helper methods

### Frontend
- ✅ `apps/web/lib/api-client.ts` - Added forgotPassword() and resetPassword()
- ✅ `apps/web/app/(auth-pages)/forgot-password/page.tsx` - NEW
- ✅ `apps/web/components/auth/forgot-password-form.tsx` - NEW
- ✅ `apps/web/app/(auth-pages)/reset-password/[token]/page.tsx` - NEW
- ✅ `apps/web/components/auth/reset-password-form.tsx` - NEW
- ✅ `apps/web/components/auth/sign-in-form.tsx` - Added forgot password link

## Build Status
✅ Backend build successful
✅ Frontend build successful
✅ No TypeScript errors
✅ All routes generated correctly

---

*Implemented: February 17, 2026*
*Issue: MEL-40*
