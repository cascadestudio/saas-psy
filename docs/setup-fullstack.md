# Setup full-stack (front + API en local)

## Prérequis

- [Node.js](https://nodejs.org/) v20+
- Accès SSH au serveur Dedibox (clé SSH configurée)
- Accès au repo GitHub

## Installation

```bash
git clone https://github.com/cascadestudio/saas-psy.git
cd saas-psy
npm install
```

## Lancer le projet

### 1. Ouvrir le tunnel SSH vers la DB staging

Dans un premier terminal (à laisser ouvert) :

```bash
ssh -L 5432:localhost:5432 cascade@195.154.205.18 -N
```

Cela redirige le port local 5432 vers la DB PostgreSQL du serveur.

### 2. Lancer le front + l'API

Dans un second terminal :

```bash
npm run dev:all
```

- Front : http://localhost:3000
- API : http://localhost:3001/api

## Configuration

- **Front** : `apps/web/.env.local` (généré automatiquement par `dev:staging`, ou copier `.env.staging`)
- **API** : `apps/api/.env` (déjà configuré pour pointer vers la DB staging via le tunnel)

## Commandes utiles

| Commande | Description |
|---|---|
| `npm run dev:all` | Lance front + API |
| `npm run dev:staging` | Lance le front seul (API staging distante) |
| `npm run dev:api` | Lance l'API seule |
| `npm run prisma:studio` | Interface visuelle pour la DB |
| `npm run prisma:migrate` | Créer une migration Prisma |
