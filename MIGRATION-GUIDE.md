# Migration Guide: Setup & Next Steps

Congratulations! Your monorepo is now set up with the proper structure. Here's how to proceed:

## ✅ What's been done

1. **Monorepo structure created**
   - `apps/web/` - Next.js frontend
   - `apps/api/` - NestJS backend with Prisma
   - `packages/core/` - Shared types and scoring logic

2. **Docker configuration updated**
   - PostgreSQL service
   - API service (NestJS)
   - Web service (Next.js) - optional
   - pgAdmin - optional

3. **Prisma schema created**
   - All entities (User, Profile, Questionnaire, Session, etc.)
   - Healthcare-compliant structure
   - Audit logging ready

4. **Package configuration**
   - npm workspaces configured
   - Turbo.json for optimized builds
   - Shared core package

## 🚀 Next Steps

### Step 1: Install dependencies

```bash
# From the root directory
npm install

# This will install dependencies for all workspaces
```

### Step 2: Start PostgreSQL

```bash
# Start only PostgreSQL
docker-compose up -d postgres

# Verify it's running
docker-compose ps
```

### Step 3: Set up the database

```bash
# Navigate to API directory
cd apps/api

# Copy environment file
cp .env.example .env

# Edit .env with your settings (DATABASE_URL, JWT_SECRET, etc.)

# Generate Prisma client
npm run prisma:generate

# Create and apply migrations
npm run prisma:migrate:dev --name init

# (Optional) Open Prisma Studio to see your database
npm run prisma:studio
```

### Step 4: Start the backend

```bash
# From root directory
npm run dev:api

# Or from apps/api directory
cd apps/api
npm run start:dev
```

The API should be available at http://localhost:3001/api

Test the health endpoint: http://localhost:3001/api/health

### Step 5: Start the frontend

```bash
# From root directory
npm run dev

# Or from apps/web directory
cd apps/web
npm run dev
```

The web app should be available at http://localhost:3000

### Step 6: Remove Supabase dependencies (when ready)

In `apps/web/package.json`, remove:
```json
"@supabase/ssr": "latest",
"@supabase/supabase-js": "latest",
```

Then update your code to use the NestJS API instead of Supabase.

## 🔧 Development workflow

### Running both services

```bash
# From root - runs both API and Web concurrently
npm run dev:all
```

### Working with Prisma

```bash
# Generate client after schema changes
npm run prisma:generate

# Create a migration
cd apps/api
npx prisma migrate dev --name description_of_change

# Open Prisma Studio
npm run prisma:studio
```

### Building for production

```bash
# Build everything
npm run build

# Or build individually
npm run build:api
npm run build:web
```

## 📝 Important files to configure

1. **Root `.env`** - Docker compose variables
2. **`apps/api/.env`** - Backend environment variables
3. **`apps/web/.env.local`** - Frontend environment variables

## 🎯 Immediate priorities

1. **Implement Auth module in NestJS**
   - JWT authentication
   - Guard decorators
   - User registration/login endpoints

2. **Update Next.js to call NestJS API**
   - Create API client (`apps/web/lib/api-client.ts`)
   - Replace Supabase calls with fetch to NestJS
   - Update auth flow

3. **Move scoring logic to packages/core**
   - Already started in `packages/core/src/scoring/`
   - Import from `@melya/core` in both apps

4. **Create API endpoints**
   - Auth (login, register, etc.)
   - Questionnaires CRUD
   - Sessions management
   - Email sending

## 🐛 Troubleshooting

### Port already in use

```bash
# Kill process on port 3001 (API)
lsof -ti:3001 | xargs kill -9

# Kill process on port 3000 (Web)
lsof -ti:3000 | xargs kill -9
```

### Prisma client not found

```bash
cd apps/api
npm run prisma:generate
```

### Module not found @melya/core

```bash
# Build the core package
cd packages/core
npm run build

# Then restart your apps
```

### Docker issues

```bash
# Stop all containers
docker-compose down

# Remove volumes and start fresh
docker-compose down -v
docker-compose up -d postgres
```

## 📚 Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Auth.js Documentation](https://authjs.dev/)

## 🎉 You're all set!

The monorepo structure is ready. Start with implementing the Auth module in NestJS, then progressively migrate features from Supabase to your new backend.

Good luck building! 🚀

