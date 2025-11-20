# Projet SaaS Psy – Plateforme de Questionnaires Psychométriques

SaaS pour psychologues destiné à automatiser tout le cycle des questionnaires psychométriques : envoi, passation en ligne, scoring automatique, interprétation et historique longitudinal.

---

## 📋 Table des matières

- [Contexte du projet](#contexte-du-projet)
- [Stack technique](#stack-technique)
- [Structure du monorepo](#structure-du-monorepo)
- [Installation et démarrage](#installation-et-démarrage)
- [Développement](#développement)
- [Architecture](#architecture)
- [Base de données](#base-de-données)
- [Roadmap](#roadmap)

---

## 🎯 Contexte du projet

### Problème chez les psychologues aujourd'hui

- PDF / papier pour les questionnaires
- Cotation manuelle → erreurs + perte de temps
- Archivage non centralisé
- Process lourd et peu fluide pour le patient

### Ce que le produit apporte

- Envoi d'un test en 2–3 clics
- Passation fluide en ligne
- Score + interprétation automatiques
- Stockage centralisé des passations par patient
- Gain de temps considérable pour le psychologue

### Contraintes importantes

- **Données sensibles** → montée future vers hébergement certifié **HDS**
- Respect **RGPD** + journalisation + confidentialité stricte
- Droits d'auteur sur les échelles psychométriques
- Volonté de **build in public**
- Besoin d'une stack **évolutive** et durable

---

## 🛠 Stack technique

### Frontend
- **Next.js 15** (App Router)
- **TailwindCSS** + **shadcn/ui**
- **Auth.js** (NextAuth v5)
- TypeScript

### Backend
- **NestJS** (API REST)
- **Prisma** ORM
- **PostgreSQL 16**
- JWT Authentication
- TypeScript

### Infrastructure
- **Monorepo** (npm workspaces)
- **Docker** & **Docker Compose**
- **Turbo** (optional, pour build pipeline)

---

## 📁 Structure du monorepo

```
saas-psy/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── app/                # App Router
│   │   ├── components/         # React components
│   │   ├── lib/                # Utilities
│   │   └── package.json
│   └── api/                    # NestJS backend
│       ├── src/
│       │   ├── auth/           # Authentication module
│       │   ├── users/          # Users management
│       │   ├── questionnaires/ # Questionnaires module
│       │   ├── sessions/       # Sessions (passations)
│       │   ├── prisma/         # Prisma client & service
│       │   └── main.ts
│       ├── prisma/
│       │   └── schema.prisma   # Database schema
│       └── package.json
├── packages/
│   └── core/                   # Shared code
│       ├── src/
│       │   ├── types/          # TypeScript types
│       │   ├── scoring/        # Scoring algorithms
│       │   └── utils/          # Utilities
│       └── package.json
├── docker/
│   ├── Dockerfile.api          # API Dockerfile
│   └── Dockerfile.web          # Web Dockerfile
├── docker-compose.yml          # Docker orchestration
├── package.json                # Root workspace config
├── turbo.json                  # Turbo config
└── README.md
```

---

## 🚀 Installation et démarrage

### Prérequis

- **Node.js** 20+
- **Docker** & **Docker Compose**
- **npm** (ou pnpm)

### Installation

```bash
# Clone le repository
git clone <repository-url>
cd saas-psy

# Installe toutes les dépendances
npm install

# Copie les fichiers d'environnement
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Configure les variables d'environnement
# Édite .env, apps/api/.env et apps/web/.env avec tes valeurs
```

### Démarrage avec Docker

```bash
# Démarre PostgreSQL uniquement
docker-compose up -d postgres

# Génère le client Prisma et migre la DB
cd apps/api
npm run prisma:generate
npm run prisma:migrate:dev

# Retourne à la racine
cd ../..

# Démarre l'API en mode développement
npm run dev:api

# Dans un autre terminal, démarre le frontend
npm run dev
```

### Démarrage sans Docker

```bash
# Assure-toi d'avoir PostgreSQL installé localement

# Configure DATABASE_URL dans apps/api/.env
# DATABASE_URL="postgresql://user:password@localhost:5432/saas_psy"

# Génère Prisma client et migre
npm run prisma:generate
npm run prisma:migrate

# Démarre tout
npm run dev:all
```

---

## 💻 Développement

### Scripts disponibles

```bash
# Frontend
npm run dev              # Démarre Next.js (port 3000)
npm run build:web        # Build Next.js

# Backend
npm run dev:api          # Démarre NestJS (port 3001)
npm run build:api        # Build NestJS

# Les deux en même temps
npm run dev:all          # Démarre web + api avec concurrently

# Prisma
npm run prisma:generate  # Génère le client Prisma
npm run prisma:migrate   # Crée et applique les migrations
npm run prisma:studio    # Ouvre Prisma Studio (DB GUI)

# Docker
npm run docker:up        # Démarre les services Docker
npm run docker:down      # Arrête les services Docker
npm run docker:logs      # Affiche les logs
```

### Accès aux services

- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001/api
- **API Health**: http://localhost:3001/api/health
- **Prisma Studio**: Exécute `npm run prisma:studio`
- **pgAdmin** (optionnel): http://localhost:5050

---

## 🏗 Architecture

### Modules API (NestJS)

| Module | Description |
|--------|-------------|
| **AuthModule** | Authentification JWT, validation des tokens |
| **UsersModule** | Gestion des utilisateurs (praticiens, admins) |
| **ProfilesModule** | Profils utilisateurs, préférences, favoris |
| **QuestionnairesModule** | CRUD questionnaires psychométriques |
| **SessionsModule** | Passations de questionnaires (création, envoi, réponses) |
| **ScoringModule** | Calcul des scores (BDI, STAI, Liebowitz, etc.) |
| **EmailModule** | Envoi d'emails (Resend) |
| **AuditModule** | Journalisation des actions (HDS compliance) |

### Package Core (@saas-psy/core)

Package partagé entre frontend et backend contenant :
- **Types** : Interfaces TypeScript (User, Session, Questionnaire, etc.)
- **Scoring** : Algorithmes de scoring (BDI, STAI, dual-scale, etc.)
- **Utils** : Fonctions utilitaires (formatage dates, validation, etc.)

---

## 🗄 Base de données

### Modèles Prisma

```prisma
User          // Utilisateurs (praticiens)
Profile       // Profils et préférences
Questionnaire // Questionnaires psychométriques
Session       // Passations de questionnaires
AuditLog      // Logs d'audit (HDS)
EmailLog      // Logs d'envoi d'emails
```

### Migrations

```bash
# Créer une nouvelle migration
cd apps/api
npx prisma migrate dev --name nom_de_la_migration

# Appliquer les migrations en production
npx prisma migrate deploy

# Reset la base (DEV ONLY)
npx prisma migrate reset
```

---

## 🗺 Roadmap

### ✅ Phase 1 : Foundation (Complète)

- [x] Monorepo structure (apps/web, apps/api, packages/core)
- [x] Docker & Docker Compose setup
- [x] Prisma schema avec tous les modèles
- [x] NestJS API structure de base
- [x] Next.js frontend migration

### 🚧 Phase 2 : Core Features (En cours)

- [ ] Module Auth avec JWT
- [ ] CRUD Questionnaires
- [ ] Sessions (création, envoi par email)
- [ ] Interface patient pour répondre aux questionnaires
- [ ] Scoring automatique (BDI, STAI, Liebowitz)
- [ ] Dashboard praticien

### 📅 Phase 3 : Polish & Security

- [ ] Auth.js integration complète
- [ ] Rate limiting
- [ ] Tests automatisés (Jest, Supertest)
- [ ] Pseudo-anonymisation des patients
- [ ] Audit logging complet

### 🔮 Phase 4 : HDS Compliance

- [ ] Tenant isolation (multi-tenant)
- [ ] Encryption at rest
- [ ] Immutable audit logs
- [ ] Conformité HDS documentation
- [ ] Migration vers infrastructure certifiée

---

## 📚 Documentation

### Liens utiles

- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com/)
- [Prisma Docs](https://www.prisma.io/docs)
- [Auth.js Docs](https://authjs.dev/)

### Standards de code

- TypeScript strict mode
- ESLint + Prettier
- Conventional Commits
- Code review obligatoire

---

## 🤝 Contribution

Ce projet est actuellement en développement privé. Si vous souhaitez contribuer, contactez-moi.

---

## 📄 License

Private - SaaS Psy © 2025

---

## 🆘 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Contactez-moi directement

---

**Build in public** 🚀 Suivi de développement sur [Twitter/LinkedIn]
