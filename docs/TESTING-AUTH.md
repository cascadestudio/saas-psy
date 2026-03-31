# Testing Authentication

## Prerequisites

Make sure you have the following environment variables set:

### Backend (`apps/api/.env`)
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/saas_psy"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV=development
CORS_ORIGIN="http://localhost:3000"
```

### Frontend (`apps/web/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
RESEND_API_KEY=re_dummy_key_for_build
```

## Running the Application

### 1. Start PostgreSQL (via Docker)
```bash
docker-compose up -d postgres
```

### 2. Run Prisma Migrations
```bash
cd apps/api
npm run prisma:migrate
```

### 3. Start the Backend API
```bash
# From project root
cd apps/api
npm run start:dev
```

The API should be running on `http://localhost:3001`

### 4. Start the Frontend
```bash
# In a new terminal, from project root
cd apps/web
npm run dev
```

The web app should be running on `http://localhost:3000`

## Testing Authentication Flow

### 1. Sign Up
1. Navigate to `http://localhost:3000/sign-up`
2. Fill in the form:
   - Prénom: `Jean`
   - Nom: `Dupont`
   - Email: `jean.dupont@example.com`
   - Mot de passe: `password123` (min 6 characters)
3. Click "S'inscrire"
4. You should see a success message and be redirected to the sign-in page

### 2. Sign In
1. Navigate to `http://localhost:3000/sign-in`
2. Fill in the form:
   - Email: `jean.dupont@example.com`
   - Mot de passe: `password123`
3. Click "Se connecter"
4. You should be redirected to the homepage (`/`)
5. The header should show your user info and a sign-out button

### 3. Access Protected Routes
1. While signed in, navigate to `http://localhost:3000/dashboard`
2. You should see your profile information
3. Try `http://localhost:3000/protected` - it should also work

### 4. Sign Out
1. Click the "Se déconnecter" button in the header
2. You should be redirected to the sign-in page
3. Try accessing `/dashboard` or `/protected` - you should be redirected to `/sign-in`

## Debugging

### Check if the API is running
```bash
curl http://localhost:3001/api/health
```

You should see:
```json
{
  "status": "ok",
  "timestamp": "2024-XX-XXTXX:XX:XX.XXXZ"
}
```

### Test Registration via API directly
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### Test Login via API directly
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

You should receive an `accessToken` in the response.

### Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for any errors related to API calls
4. Check the Network tab to see the actual API requests and responses

### Check localStorage
1. Open browser DevTools (F12)
2. Go to Application tab (Chrome) or Storage tab (Firefox)
3. Check localStorage
4. You should see an `accessToken` entry after signing in

## Common Issues

### Issue: "Cannot connect to API"
- **Solution**: Make sure the backend is running on port 3001
- Check `apps/api/.env` has `PORT=3001`
- Check `apps/web/.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:3001/api`

### Issue: "Database connection error"
- **Solution**: Make sure PostgreSQL is running
- Run `docker-compose up -d postgres`
- Check the connection string in `apps/api/.env`

### Issue: "Token not stored" or "User not authenticated"
- **Solution**: Check browser console for errors
- Make sure `localStorage` is accessible (not blocked by browser settings)
- Try clearing localStorage and signing in again

### Issue: "CORS error"
- **Solution**: Check `apps/api/.env` has `CORS_ORIGIN="http://localhost:3000"`
- Restart the backend API

## Changes Made

### Problem
The previous implementation used Next.js Server Actions which execute on the server side where `localStorage` is not available. This caused authentication to fail because the JWT token couldn't be stored.

### Solution
Created client-side forms that:
1. Handle form submission in the browser
2. Call the API using fetch
3. Store the JWT token in `localStorage`
4. Handle redirections using Next.js router
5. Show loading states and error messages

### Files Changed
- ✅ Created `apps/web/components/auth/sign-in-form.tsx` - Client-side sign-in form
- ✅ Created `apps/web/components/auth/sign-up-form.tsx` - Client-side sign-up form
- ✅ Updated `apps/web/app/(auth-pages)/sign-in/page.tsx` - Use new client form
- ✅ Updated `apps/web/app/(auth-pages)/sign-up/page.tsx` - Use new client form
- ✅ Updated `apps/web/components/submit-button.tsx` - Support external `isLoading` prop
- ✅ Created `apps/web/.env.example` - Document required env vars

### Architecture
```
User fills form → Client Component → API Client (fetch) → NestJS API
                                    ↓
                              localStorage (JWT)
                                    ↓
                              Next.js Router (redirect)
```

