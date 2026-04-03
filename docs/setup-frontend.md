# Setup frontend (staging)

## Prérequis

- [Node.js](https://nodejs.org/) v20+
- Accès au repo GitHub

## Installation

```bash
git clone https://github.com/cascadestudio/saas-psy.git
cd saas-psy
npm install
```

## Lancer le projet

```bash
npm run dev:staging
```

Le front tourne sur http://localhost:3000 et pointe automatiquement sur l'API staging.

> **Note** : ce mode ne nécessite ni PostgreSQL local, ni tunnel SSH. Idéal pour travailler uniquement sur le front.

## Workflow

1. Se mettre sur la branche `staging` : `git checkout staging`
2. Créer une branche depuis staging : `git checkout -b ma-feature`
3. Bosser dans `apps/web/` uniquement
4. Commit + push, puis ouvrir une PR vers `staging`

## Structure du front

```
apps/web/
├── app/           # Pages (App Router Next.js)
├── components/    # Composants React
├── lib/           # Utilitaires, API client
└── public/        # Assets statiques
```

## Commandes utiles

| Commande | Description |
|---|---|
| `npm run dev:staging` | Lance le front en mode staging |
| `npm run build:web` | Build de production |
| `npm run lint --workspace=apps/web` | Lint du code |

## Passer en mode full-stack

Pour travailler aussi sur l'API avec une DB locale, voir [setup-fullstack.md](setup-fullstack.md).
