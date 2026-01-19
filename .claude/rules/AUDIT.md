# Audit Melya - January 2026

Comprehensive audit of the Melya platform identifying areas for improvement.

---

## High Priority - Security

### Exposed Credentials in Git
- **Location**: `.env` files committed to repository
- **Risk**: Production secrets exposed if repo becomes public
- **Fix**: Add to `.gitignore`, regenerate all keys immediately

### JWT Storage in localStorage
- **Location**: `apps/web/lib/api-client.ts:25-26`
- **Risk**: Vulnerable to XSS attacks - any XSS allows token theft
- **Fix**: Migrate to HttpOnly cookies with Secure flag

### No Rate Limiting
- **Location**: Auth endpoints, public APIs
- **Risk**: Brute force attacks on login, DoS on public endpoints
- **Fix**: Implement `express-rate-limit` or NestJS throttler

### No CSRF Protection
- **Location**: `apps/api/src/sessions/sessions.controller.ts:67-79`
- **Risk**: Public patient endpoints vulnerable to CSRF
- **Fix**: Add CSRF tokens for state-changing operations

### Weak Password Requirements
- **Location**: `apps/api/src/auth/dto/register.dto.ts:8`
- **Current**: Min 8 characters, no complexity
- **Fix**: Min 12 chars + upper/lower/number/special OR use zxcvbn

### Missing Email Verification
- **Location**: Prisma schema has `emailVerified` field but unused
- **Risk**: Accounts created with fake emails, undelivered questionnaires
- **Fix**: Implement verification email on signup

### No Password Reset Flow
- **Risk**: Users locked out of accounts, support burden
- **Fix**: Implement secure token-based password reset

---

## Medium Priority - Code Quality

### Excessive `any` Types
- **Count**: ~71 occurrences across codebase
- **Locations**:
  - `apps/api/src/auth/auth.controller.ts:26` - `@CurrentUser() user: any`
  - `apps/web/lib/api-client.ts:10,61`
  - `apps/api/src/sessions/sessions.service.ts:327`
- **Fix**: Create proper interfaces for all data types

### TypeScript Strict Mode Disabled in API
- **Location**: `apps/api/tsconfig.json` has `strict: false`
- **Fix**: Enable strict mode, fix resulting type errors

### Inconsistent API Response Format
- **Issue**: Some endpoints return `{ patients: [] }`, others `{ data: {} }`
- **Fix**: Standardize: `{ success: boolean, data: T, error?: string }`

### No Pagination
- **Location**: All list endpoints (patients, sessions, scales)
- **Risk**: Performance degrades with large datasets
- **Fix**: Add limit/offset with default limit=20

### Scoring Logic Duplicated
- **Location**: Backend `sessions.service.ts` + frontend components
- **Fix**: Move all scoring to `@melya/core` package

### AuditLog Model Unused
- **Location**: Prisma schema defines it, never used
- **Risk**: HDS non-compliance
- **Fix**: Implement AuditingService, log all data access

### Missing API Documentation
- **Fix**: Add `@nestjs/swagger` with decorators

---

## Medium Priority - UX

### Generic Loading States
- **Location**: `apps/web/app/(app)/dashboard/page.tsx:225`
- **Current**: "Chargement..." text
- **Fix**: Add skeleton loaders for patient list, scales

### No Inline Form Validation
- **Location**: CreatePatientSheet, patient forms
- **Fix**: Add real-time validation with error messages

### Hardcoded Demo Credentials
- **Location**: `apps/web/components/auth/sign-in-form.tsx:68,78,99-105`
- **Fix**: Use feature flag or environment variable

### Silent Email Failures
- **Location**: `apps/api/src/sessions/sessions.service.ts:91-96`
- **Current**: Logs warning, continues silently
- **Fix**: Return structured response, show user notification

### No Error Boundaries
- **Risk**: Frontend crashes cascade without fallback
- **Fix**: Add React Error Boundary component

---

## Low Priority - Nice to Have

### Testing
- [ ] Add unit tests (currently only 1 spec file)
- [ ] Add E2E tests for critical paths (signup, send questionnaire, submit)
- [ ] Aim for 80%+ coverage on services

### Monitoring
- [ ] Integrate Sentry or similar error tracking
- [ ] Add structured logging (Winston/Pino)

### API Design
- [ ] Add versioning (`/api/v1/`)
- [ ] Implement cursor-based pagination
- [ ] Add bulk operations for questionnaires

### Frontend
- [ ] i18n support for future localization
- [ ] PWA support for offline access
- [ ] Mobile-optimized questionnaire layouts

### DevEx
- [ ] Add `.env.example` files
- [ ] Add pre-commit hooks (husky + prettier)
- [ ] Create CHANGELOG.md

---

## HDS Compliance Gaps

| Requirement | Status | Notes |
|-------------|--------|-------|
| Audit logging | Not implemented | Model exists in Prisma |
| Email verification | Not implemented | Field exists in schema |
| Session management | Not implemented | No logout-all-devices |
| MFA | Not implemented | Consider for practitioners |
| Soft deletes | Not implemented | Hard deletes only |
| Encryption at rest | TBD | Verify Scaleway config |

---

## Quick Wins (1-2 days each)

1. [ ] Add `.env.example` files for documentation
2. [ ] Enable strict TypeScript in API
3. [ ] Add Swagger decorators for API docs
4. [ ] Implement patient count check for premium gate (backend)
5. [ ] Add pre-commit hooks (husky + prettier)
6. [ ] Create password reset flow
7. [ ] Add skeleton loaders to dashboard
8. [ ] Standardize API response format

---

## Priority Order for Implementation

### Phase 1: Critical Security
1. Remove `.env` from git, add to `.gitignore`
2. Regenerate all exposed keys
3. Add rate limiting to auth endpoints
4. Implement email verification

### Phase 2: Auth Improvements
1. Password reset flow
2. Migrate JWT to HttpOnly cookies
3. Add CSRF protection
4. Strengthen password requirements

### Phase 3: Code Quality
1. Enable strict TypeScript
2. Replace `any` types with interfaces
3. Standardize API responses
4. Add pagination

### Phase 4: UX Polish
1. Skeleton loaders
2. Form validation feedback
3. Error boundaries
4. Email failure notifications

---

*Last updated: January 2026*
