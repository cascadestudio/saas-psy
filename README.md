# Melya

SaaS pour psychologues : envoi d'échelles psychométriques, passation en ligne, scoring automatique, interprétation et historique longitudinal.

## Stack

- **Frontend** : Next.js 15 (App Router), TailwindCSS, shadcn/ui, TypeScript
- **Backend** : NestJS (REST API), Prisma ORM, PostgreSQL 16, JWT Auth, TypeScript
- **Infra** : Frontend sur Vercel, API + PostgreSQL sur Scaleway Dedibox (HDS), CI/CD GitHub Actions
- **Backups** : chiffrés, stockés sur Hetzner Storage Box via SFTP
- **Shared** : `@melya/core` (types, scoring, utils)

## Structure du monorepo

```
apps/web/        # Next.js frontend (port 3000)
apps/api/        # NestJS backend (port 3001)
packages/core/   # Types, scoring, utils partagés
docs/            # Documentation (compliance, pricing, échelles)
```

## Prérequis

- [Node.js](https://nodejs.org/) v20+
- PostgreSQL 14+ (uniquement pour le mode full-stack local)
- Accès au repo GitHub

## Installation

```bash
git clone https://github.com/cascadestudio/saas-psy.git
cd saas-psy
npm install
```

## Modes de développement

### Mode front-only (staging API distante)

Idéal pour travailler uniquement sur le front. Pas besoin de PostgreSQL local ni de tunnel SSH.

```bash
npm run dev:staging
```

Front sur http://localhost:3000, pointe sur l'API staging.

### Mode full-stack (front + API + DB locale)

#### Setup de la DB locale

```bash
brew services start postgresql@14
createdb melya_dev

cd apps/api
npx prisma migrate dev
```

#### Configuration

`apps/api/.env` :

```env
DATABASE_URL="postgresql://<user>@localhost:5432/melya_dev"
```

`apps/web/.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_MODE=full
```

#### Lancer le projet

```bash
npm run dev:all
```

- Front : http://localhost:3000
- API : http://localhost:3001/api

### Accéder à la DB staging

Tunnel SSH (port 5433 pour ne pas entrer en conflit avec Postgres local) :

```bash
ssh -L 5433:localhost:5432 cascade@195.154.205.18 -N
```

Puis dans `apps/api/.env` :

```env
DATABASE_URL="postgresql://melya_app_staging:<password>@localhost:5433/melya_staging"
```

## Commandes utiles

| Commande                | Description                                |
| ----------------------- | ------------------------------------------ |
| `npm run dev:staging`   | Front seul (API staging distante)          |
| `npm run dev:all`       | Front + API en local                       |
| `npm run dev:api`       | API seule                                  |
| `npm run build:web`     | Build de production du front               |
| `npm run prisma:studio` | Interface visuelle de la DB                |
| `npm run prisma:migrate`| Créer une migration Prisma                 |

## Workflow

1. `git checkout staging`
2. `git checkout -b ma-feature`
3. Commit + push, ouvrir une PR vers `staging`

## Documentation

- [`docs/compliance/`](./docs/compliance/) — HDS, audit, PCA-PRA, contrat Scaleway, suppression des données
- [`docs/product/`](./docs/product/) — décisions produit / business (pricing, etc.)
- [`docs/scales/`](./docs/scales/) — échelles psychométriques

## Modules API

| Module           | Description                                    |
| ---------------- | ---------------------------------------------- |
| AuthModule       | JWT auth, validation des tokens                |
| UsersModule      | Gestion des praticiens                         |
| ProfilesModule   | Profils, préférences                           |
| EchellesModule   | CRUD échelles psychométriques                  |
| SessionsModule   | Sessions / passations                          |
| ScoringModule    | Calcul des scores (BDI, STAI, Liebowitz, etc.) |
| EmailModule      | Envoi d'emails (Resend)                        |
| EncryptionModule | Chiffrement AES-256-GCM via Prisma middleware  |

## Contraintes

- Données de santé (conformité HDS) — voir `docs/compliance/`
- RGPD + audit logging
- Copyright sur les échelles psychométriques
- Données chiffrées au repos (AES-256-GCM via Prisma middleware)
