# Audit Melya - January 2026

Comprehensive audit of the Melya platform with MVP-focused prioritization.

---

## Needed for Launch

### Password Reset Flow
- **Risk**: Users locked out = support burden, looks unprofessional
- **Status**: Must implement before public launch
- **Workaround for beta**: Manual reset via Prisma Studio
- **Implementation**: Token-based reset via email

---

## Reviewed & OK for MVP

### ~~Exposed Credentials in Git~~
- **Status**: `.env` files are properly gitignored and not in history
- **Verified**: `.gitignore` includes `.env`, `.env.local`, `.env*.local`

### JWT Storage in localStorage
- **Location**: `apps/web/lib/api-client.ts:25-26`
- **Risk**: XSS could steal tokens - but React auto-escapes, making XSS rare
- **Decision**: Keep for MVP - many production apps use this safely
- **Later**: Consider HttpOnly cookies in Phase 3

### ~~CSRF Protection~~
- **Status**: Not needed - only applies to cookie-based auth
- **Reason**: Using localStorage + Authorization header = no CSRF risk

### Password Requirements (8 chars min)
- **Location**: `apps/api/src/auth/dto/register.dto.ts:8`
- **Decision**: Current setup is fine per NIST 2017+ guidelines
- **Reason**: Complexity rules don't help, length matters more
- **Later**: Add breached password check (HaveIBeenPwned) in Phase 3

---

## Defer to Post-MVP

### Rate Limiting
- **Location**: Auth endpoints, public APIs
- **Risk**: Low for unknown MVP with few users
- **When to add**: Before marketing push or if abuse detected
- **Implementation**: `@nestjs/throttler` (30 min to add)

### Email Verification
- **Location**: Prisma schema has `emailVerified` field (unused)
- **Decision**: Extra friction hurts conversion, add after launch
- **When to add**: When polishing onboarding experience

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
- **Risk**: HDS non-compliance (needed later)
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

## HDS Compliance (Phase 4)

| Requirement | Status | Notes |
|-------------|--------|-------|
| Audit logging | Not implemented | Model exists in Prisma |
| Session management | Not implemented | No logout-all-devices |
| MFA | Not implemented | Consider for practitioners |
| Soft deletes | Not implemented | Hard deletes only |
| Encryption at rest | TBD | Verify with Scaleway |

---

## Phase Summary

| Phase | Focus | Items |
|-------|-------|-------|
| **Launch** | Core functionality | Password reset |
| **Post-MVP** | Security hardening | Rate limiting, email verification |
| **Phase 3** | Polish | HttpOnly cookies, breach check, strict TS |
| **Phase 4** | HDS Compliance | Audit logs, MFA, soft deletes |

---

*Last updated: January 2026*
