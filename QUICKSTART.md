# 🚀 Quick Start Guide

Get started with SaaS Psy in 5 minutes!

## Prerequisites

- Node.js 20+
- Docker Desktop running
- Terminal

## 1️⃣ Install dependencies (2 min)

```bash
npm install
```

## 2️⃣ Start PostgreSQL (30 sec)

```bash
docker-compose up -d postgres
```

## 3️⃣ Setup database (1 min)

```bash
# Generate Prisma client
cd apps/api
npm run prisma:generate

# Create database tables
npm run prisma:migrate:dev --name init

# Go back to root
cd ../..
```

## 4️⃣ Start everything (30 sec)

```bash
# Start API and Web together
npm run dev:all
```

## ✅ Verify

- **Web**: http://localhost:3000
- **API**: http://localhost:3001/api
- **Health**: http://localhost:3001/api/health

## 🎯 What's next?

1. Check out `MIGRATION-GUIDE.md` for detailed instructions
2. Configure environment variables in `.env` files
3. Start implementing auth module in NestJS
4. Migrate Supabase calls to NestJS API

## 📂 Project structure

```
saas-psy/
├── apps/
│   ├── web/     # Next.js frontend (port 3000)
│   └── api/     # NestJS backend (port 3001)
├── packages/
│   └── core/    # Shared types & scoring
└── docker-compose.yml
```

## 🆘 Issues?

```bash
# Reset everything
docker-compose down -v
npm run prisma:migrate:reset

# Restart
docker-compose up -d postgres
npm run dev:all
```

Happy coding! 🎉

