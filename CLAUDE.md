# Projet Melya – Plateforme de Questionnaires Psychométriques

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
- **PostgreSQL 16** (Scaleway Managed Database - certifié HDS)
- JWT Authentication
- TypeScript

### Infrastructure

**Production (Scaleway - certifié HDS)** :
- **Frontend** : Scaleway Object Storage + CDN (Next.js static)
- **Backend** : Scaleway Serverless Containers (auto-scaling, pay-per-use)
- **Database** : Scaleway PostgreSQL Managed Database (certifié HDS)
- **Région** : France (Paris) uniquement
- **CI/CD** : GitHub Actions

**Pourquoi Serverless Containers ?**
- ✅ Auto-scaling (0 → N instances selon le trafic)
- ✅ Pay-per-use (pas de coût si pas de trafic, idéal MVP)
- ✅ Zéro maintenance serveur (Scaleway gère tout)
- ✅ Cold start acceptable (~1-2s, OK pour SaaS métier)
- ✅ Multi-environnements pas cher (dev/staging/prod)

**Développement local (Solo Dev)** :
- **PostgreSQL natif** (recommandé pour performances optimales)
- **Monorepo** (npm workspaces)
- **Docker** : uniquement pour le Dockerfile de production (NestJS)
- **Turbo** (optional, pour build pipeline)

**Note** : En solo dev, NestJS et Next.js tournent directement sur ta machine pour hot reload optimal. Docker n'est utilisé qu'en production pour Scaleway Serverless Containers.

**⚠️ Pourquoi Scaleway full stack et pas Vercel ?**
- HIPAA (USA) ≠ HDS (France) : aucune valeur légale en France
- Vercel héberge en USA/Global → données transitent hors France (non-conforme)
- Obligation légale : Article L.1111-8 Code Santé Publique impose certification HDS
- Scaleway = 100% France + certification HDS complète + contrat unique

---

## 📁 Structure du monorepo

```
melya/
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
├── apps/api/
│   └── Dockerfile              # Production Dockerfile (Scaleway)
├── package.json                # Root workspace config
├── turbo.json                  # Turbo config
└── README.md
```

---

## 🚀 Installation et démarrage

### Prérequis

- **Node.js** 20+
- **PostgreSQL 16** (installation native recommandée)
- **npm** (ou pnpm)
- **Docker** (optionnel, uniquement pour build de production)

### Installation

```bash
# Clone le repository
git clone <repository-url>
cd melya

# Installe toutes les dépendances
npm install

# Copie les fichiers d'environnement
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Configure les variables d'environnement
# Édite .env, apps/api/.env et apps/web/.env avec tes valeurs
```

### Setup PostgreSQL (une fois)

```bash
# macOS
brew install postgresql@16
brew services start postgresql@16

# Créer la base de données
createdb melya

# Linux (Debian/Ubuntu)
sudo apt install postgresql-16
sudo systemctl start postgresql
sudo -u postgres createdb melya
```

### Démarrage quotidien

```bash
# PostgreSQL démarre automatiquement au boot
# Si besoin de le démarrer manuellement :
# brew services start postgresql@16  (macOS)
# sudo systemctl start postgresql   (Linux)

# Génère le client Prisma et migre la DB (première fois)
cd apps/api
npm run prisma:generate
npm run prisma:migrate:dev
cd ../..

# Lance l'API (Terminal 1)
npm run dev:api

# Lance le frontend (Terminal 2)
npm run dev

# Ou les deux en même temps (Terminal unique)
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

```

### Accès aux services

- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001/api
- **API Health**: http://localhost:3001/api/health
- **Prisma Studio**: `npm run prisma:studio` (GUI pour la DB)
- **PostgreSQL**: `psql melya` (CLI natif)

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

### Package Core (@melya/core)

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

Private - Melya © 2025

---

## 🆘 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Contactez-moi directement

---

**Build in public** 🚀 Suivi de développement sur [Twitter/LinkedIn]
