# Setup full-stack (front + API en local)

## Prérequis

- [Node.js](https://nodejs.org/) v20+
- PostgreSQL installé localement (`brew install postgresql@14` ou supérieur)
- Accès au repo GitHub

## Installation

```bash
git clone https://github.com/cascadestudio/saas-psy.git
cd saas-psy
npm install
```

## Setup de la DB locale

```bash
# Démarrer PostgreSQL si ce n'est pas déjà fait
brew services start postgresql@14

# Créer la base de données
createdb melya_dev

# Appliquer les migrations
cd apps/api
npx prisma migrate dev
```

## Configuration

### API (`apps/api/.env`)

```env
DATABASE_URL="postgresql://<ton-user>@localhost:5432/melya_dev"
NODE_ENV="development"
```

Les autres variables (JWT_SECRET, ENCRYPTION_KEY, etc.) sont déjà configurées dans le `.env`.

### Front (`apps/web/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_MODE=full
```

## Lancer le projet

```bash
npm run dev:all
```

- Front : http://localhost:3000
- API : http://localhost:3001/api

## Accéder à la DB staging (optionnel)

Si tu as besoin d'accéder aux données staging (debug, Prisma Studio sur staging, etc.), ouvre un tunnel SSH dans un terminal séparé :

```bash
# Utiliser un port local différent (5433) car 5432 est pris par le PostgreSQL local
ssh -L 5433:localhost:5432 cascade@195.154.205.18 -N
```

Puis modifier temporairement `DATABASE_URL` dans `apps/api/.env` :

```env
DATABASE_URL="postgresql://melya_app_staging:<password>@localhost:5433/melya_staging"
```

## Commandes utiles

| Commande | Description |
|---|---|
| `npm run dev:all` | Lance front + API |
| `npm run dev:staging` | Lance le front seul (API staging distante) |
| `npm run dev:api` | Lance l'API seule |
| `npm run prisma:studio` | Interface visuelle pour la DB |
| `npm run prisma:migrate` | Créer une migration Prisma |
