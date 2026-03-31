# Melya - Plateforme d'échelles psychométriques

SaaS pour psychologues : envoi d'échelles, passation en ligne, scoring automatique, interprétation et historique longitudinal.

## Stack

- **Frontend**: Next.js 15 (App Router), TailwindCSS, shadcn/ui, TypeScript
- **Backend**: NestJS (REST API), Prisma ORM, PostgreSQL 16, JWT Auth, TypeScript
- **Infra**: Frontend on Vercel, API + PostgreSQL on Scaleway Dedibox (HDS), CI/CD GitHub Actions
- **Backups**: Chiffrés, stockés sur Hetzner Storage Box, via SFTP
- **Shared**: `@melya/core` package (types, scoring algorithms, utils)

## Monorepo Structure

```
apps/web/          # Next.js frontend (port 3000)
apps/api/          # NestJS backend (port 3001)
packages/core/     # Shared types, scoring, utils
docs/              # Reference docs (pricing, HDS, audit, encryption, etc.)
```

## Dev Commands

```bash
npm run dev          # Next.js (port 3000)
npm run dev:api      # NestJS (port 3001)
npm run dev:all      # Both

# Prisma
cd apps/api
npx prisma migrate dev --name migration_name
npx prisma generate
npx prisma studio
```

## API Modules

| Module           | Description                                    |
| ---------------- | ---------------------------------------------- |
| AuthModule       | JWT auth, token validation                     |
| UsersModule      | User management (practitioners)                |
| ProfilesModule   | User profiles, preferences                     |
| EchellesModule   | CRUD échelles psychométriques                  |
| SessionsModule   | Sessions / passations (create, send, respond)  |
| ScoringModule    | Score calculation (BDI, STAI, Liebowitz, etc.) |
| EmailModule      | Email sending (Resend)                         |
| EncryptionModule | AES-256-GCM encryption of sensitive fields     |

## Database Models

```
User, Profile, Patient, Echelle, Session, AuditLog, EmailLog
```

## Constraints

- Health data (HDS compliance) - see `docs/` for details
- RGPD + audit logging
- Copyright on psychometric scales
- Data encrypted at rest (AES-256-GCM via Prisma middleware)

## Current app state

- L'app est actuelement en phase de pré-lancement
- Landing page sert uniquement à récolter les mails de beta testeurs
- La landing page ne doit pas avoir de lien vers l'app (en construction)
