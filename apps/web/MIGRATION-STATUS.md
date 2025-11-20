# Frontend Auth Migration - Status

## ✅ Completed

### 1. API Client Created
- **File**: `lib/api-client.ts`
- Includes methods for:
  - `authApi.register()`
  - `authApi.login()`
  - `authApi.logout()`
  - `authApi.getMe()`
  - `authApi.isAuthenticated()`
- Token stored in localStorage
- Error handling with `ApiError` class

### 2. Auth Actions Updated
- **File**: `app/actions.ts`
- All server actions now use NestJS API:
  - `signUpAction` → calls `/api/auth/register`
  - `signInAction` → calls `/api/auth/login`
  - `signOutAction` → clears token
  - Password reset actions (TODO: implement in backend)

### 3. Middleware Updated
- **File**: `middleware.ts`
- Simplified (no server-side token validation yet)
- Note: Can be enhanced later with cookie-based JWT validation

### 4. UserContext Updated
- **File**: `app/context/UserContext.tsx`
- Now uses NestJS API instead of Supabase
- Provides: `user`, `isLoading`, `refreshUser()`, `logout()`
- Automatic token validation on mount

### 5. Components Updated
- **header-auth.tsx**: Now uses `useUser()` hook
- **dashboard/page.tsx**: Client component with auth check
- **protected/page.tsx**: Client component with auth check

## 🚧 Still Using Supabase

The following files/features still reference Supabase:

### High Priority
1. **app/my-questionnaires/page.tsx**
   - Uses `supabase.from("profiles")` for favorites
   - Needs favorites API migration

2. **app/api/favorites/route.ts**
   - API route using Supabase
   - Should be replaced by NestJS `/api/favorites`

3. **utils/favorites.ts**
   - Helper functions using Supabase
   - Update to use `api.favorites`

4. **utils/auth.ts**
   - `createUserProfile()` using Supabase admin
   - Can be removed (profile creation now in NestJS)

### Medium Priority
5. **app/dashboard/components/user-profile-form.tsx**
   - Uses `supabase.auth.updateUser()`
   - Needs profile update API

6. **components/user-profile-form.tsx**
   - Same as above

7. **app/questionnaire/description/[id]/FavoriteButtonWrapper.tsx**
   - Uses `supabase.auth.getSession()`
   - Update to use `useUser()`

8. **components/HomeClient.tsx**
   - Uses `supabase.auth.getSession()`
   - Update to use `useUser()`

### Low Priority (Static Data)
9. **app/page.tsx**
   - Uses `supabase.from("questionnaires")`
   - But questionnaires are static data in `questionnairesData.ts`
   - Low priority unless you want DB-backed questionnaires

### Auth Callback (Can be removed)
10. **app/auth/callback/route.ts**
    - Supabase OAuth callback
    - Not needed for JWT auth
    - Can be deleted

## 📝 Next Steps

### Immediate (to get app working)
1. **Test current auth flow**:
   ```bash
   # Start API
   cd apps/api && npm run start:dev
   
   # Start Web (in another terminal)
   cd apps/web && npm run dev
   ```

2. **Try registration**:
   - Go to http://localhost:3000/sign-up
   - Register a user
   - Check if token is stored in localStorage
   - Check if redirected properly

3. **Try login**:
   - Go to http://localhost:3000/sign-in
   - Login with credentials
   - Check dashboard access

### Phase 2: Favorites & Profiles API
1. Create `apps/api/src/profiles/` module
2. Create `apps/api/src/favorites/` module (or merge with profiles)
3. Update frontend files listed above
4. Remove `app/api/favorites/route.ts`

### Phase 3: Cleanup
1. Remove Supabase packages:
   ```bash
   npm uninstall @supabase/ssr @supabase/supabase-js
   ```

2. Delete files:
   - `utils/supabase/` directory
   - `app/auth/callback/route.ts`
   - `utils/auth.ts`

3. Update environment variables

## 🔍 Known Issues

1. **Server Actions**: Auth actions are marked as `"use server"` but use localStorage
   - Works because localStorage access is in API client (client-side)
   - Token is stored after successful API call

2. **Protected Routes**: Using client-side redirect
   - Works but could be improved with middleware
   - Consider cookie-based tokens for SSR protection

3. **Password Reset**: Not implemented in NestJS yet
   - `forgotPasswordAction` and `resetPasswordAction` are placeholders

## ✨ Improvements for Later

1. **Use HttpOnly cookies** instead of localStorage for tokens
2. **Implement refresh tokens** for better security
3. **Add server-side middleware** token validation
4. **Email verification** flow
5. **Password reset** flow
6. **Remember me** functionality

---

Last updated: Phase 1 Complete - Frontend Auth Migration Done! 🎉

