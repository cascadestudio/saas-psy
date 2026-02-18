# Pricing & Paiement - Melya

Business model, stratégie freemium et choix du service de paiement.

---

## Offres Tarifaires

### Gratuit (Free)

**Prix** : 0€ - Durée illimitée (pas de période d'essai)

| Fonctionnalité | Limite |
|----------------|--------|
| Patients actifs | 5 maximum |
| Envoi d'échelles | Illimité |
| Passations | Illimité |
| Scoring automatique | Oui |
| Historique des passations | Oui |
| Archivage des patients | Non |
| Export PDF | Non |
| Support | Communautaire |

### Premium

| Période | Prix | Équivalent mensuel | Économie |
|---------|------|-------------------|----------|
| **Mensuel** | 29€/mois | 29€/mois | - |
| **Annuel** | 278€/an | 23,20€/mois | -20% (70€) |

| Fonctionnalité | Accès |
|----------------|-------|
| Patients actifs | Illimité |
| Envoi d'échelles | Illimité |
| Passations | Illimité |
| Scoring automatique | Oui |
| Historique des passations | Oui |
| Archivage des patients | Oui |
| Export PDF | Oui |
| Support | Prioritaire par email |

---

## Stratégie Freemium

### Philosophie

Laisser les utilisateurs découvrir la valeur du produit avant de demander un engagement. Le mur d'upgrade apparaît uniquement quand c'est techniquement nécessaire, pas comme une barrière artificielle.

### Système à Deux Gates

| Gate | Déclencheur | Message |
|------|-------------|---------|
| **Auth Gate** | Création de données (patient, envoi) | "Créez un compte pour sauvegarder vos données" |
| **Premium Gate** | Limite atteinte ou feature premium | "Passez à Premium pour débloquer" |

### Parcours Utilisateur

```
Utilisateur Anonyme
    │
    ├── PEUT: Naviguer, voir les échelles, explorer l'UI
    │
    └── NE PEUT PAS: Créer patient, envoyer échelle
                    │
                    ▼
              [Auth Gate Modal]
                    │
                    ▼
Utilisateur Free (authentifié)
    │
    ├── PEUT: Toutes les features, jusqu'à 5 patients
    │
    └── NE PEUT PAS: 6ème patient, archivage, export PDF
                    │
                    ▼
              [Premium Gate Modal]
                    │
                    ▼
Utilisateur Premium
    │
    └── PEUT: Patients illimités, toutes les features
```

### Points de Conversion Naturels

- **Anonyme → Inscrit** : Quand l'utilisateur a un vrai patient à ajouter
- **Free → Premium** : Quand le cabinet grandit au-delà de 5 patients

---

## Choix du Service de Paiement

### Comparatif

| Service | Frais | Type | Siège | Avantages | Inconvénients |
|---------|-------|------|-------|-----------|---------------|
| **Stripe** | 1.4% + 0.25€ | Processeur | USA (données EU possible) | DX excellente, docs top, standard du marché, Checkout hébergé | Gestion TVA manuelle si clients hors France |
| **Paddle** | 5% + 0.50€ | MoR | UK | Gère TVA mondiale, tu n'es pas le vendeur légal | Plus cher, moins flexible |
| **LemonSqueezy** | 5% + 0.50€ | MoR | USA | Comme Paddle, UI moderne, simple | Nouveau, moins de features |
| **Mollie** | 1.8% + 0.25€ | Processeur | Pays-Bas | 100% européen, SEPA natif | Moins de docs/exemples que Stripe |
| **GoCardless** | 1% + 0.20€ | SEPA only | UK | Prélèvement SEPA très économique | Pas de CB, UX moins moderne |
| **PayPal** | 2.9% + 0.35€ | Processeur | USA | Connu du grand public | UX datée, frais élevés |

### Merchant of Record (MoR) vs Processeur

**Processeur (Stripe, Mollie)** :
- Toi = vendeur légal
- Tu gères la TVA (déclarations, taux par pays)
- Tu émets les factures
- Frais ~1.5-2%

**Merchant of Record (Paddle, LemonSqueezy)** :
- Eux = vendeur légal
- Ils gèrent toute la TVA mondiale
- Ils émettent les factures
- Frais ~5%

```
Exemple avec client Belge (TVA 21%) :

Stripe : Tu dois calculer 21%, déclarer à la Belgique, etc.
Paddle : Paddle gère tout, te reverse ton montant net
```

### Critères de Décision

| Critère | Poids | Stripe | Paddle | Mollie |
|---------|-------|--------|--------|--------|
| Coût (frais %) | Élevé | ++ | - | ++ |
| Facilité d'intégration | Élevé | +++ | ++ | ++ |
| Gestion TVA automatique | Moyen | - | +++ | - |
| Documentation/Exemples | Moyen | +++ | ++ | + |
| Basé en Europe | Faible | - | - | +++ |
| Customer Portal inclus | Moyen | +++ | ++ | + |

### Recommandations par Contexte

| Contexte | Recommandation | Raison |
|----------|----------------|--------|
| **Clients France uniquement** | Stripe ou Mollie | TVA simple (20% France), frais bas |
| **Clients EU multiples** | Paddle ou LemonSqueezy | TVA gérée automatiquement |
| **MVP rapide** | Stripe | Meilleure DX, plus de tutos |
| **Budget serré** | Mollie + SEPA | Frais les plus bas |
| **Zéro compta** | Paddle | Ils gèrent tout |

### Marché Francophone International

Les échelles psychométriques (BDI, STAI, PHQ-9, etc.) sont standardisées mondialement. Le marché de Melya dépend de la langue de l'interface, pas des échelles.

**Clients francophones potentiels :**

| Pays | TVA | Complexité avec Stripe |
|------|-----|------------------------|
| France | 20% | Simple |
| Belgique | 21% | EU, gérable (OSS) |
| Luxembourg | 17% | EU, gérable (OSS) |
| Suisse | 8.1% | Hors EU, déclaration séparée |
| Québec | TPS 5% + TVQ 9.975% | Hors EU, système différent |
| Afrique francophone | Variable | Souvent pas de TVA à collecter |

**Impact sur le choix :**

Avec des clients hors EU (Suisse, Québec), la gestion TVA avec Stripe devient complexe :
- Déclarations TVA dans chaque pays
- Taux différents à appliquer
- Comptable nécessaire ou temps admin important

Avec Paddle/LemonSqueezy : ils gèrent tout, tu reçois ton net.

### Complexité d'une Migration

**Ce qui est simple :**
- Changer le code backend (~1-2 jours)
- Adapter les webhooks
- Nouveaux clients → direct sur nouveau système

**Ce qui est impossible :**
- Transférer les cartes bancaires entre providers (interdit PCI)
- → Les clients existants doivent re-saisir leur CB
- → Friction = risque de churn (perte de clients)

**Stratégies de migration :**

| Stratégie | Description | Risque |
|-----------|-------------|--------|
| Grandfathering | Anciens sur Stripe, nouveaux sur Paddle | Faible mais 2 systèmes à gérer |
| Migration douce | Email + 1 mois offert pour re-souscrire | Moyen, perte ~10-20% clients |
| Big bang | Tout migrer d'un coup | Élevé, déconseillé |

**Risque selon le moment :**

| Nb clients | Risque | Impact financier |
|------------|--------|------------------|
| 0 | Aucun | 0€ |
| 50 | Faible | Perdre 5-10 clients |
| 500 | Moyen | Perdre 50-100 clients |
| 5000 | Élevé | Projet de 3-6 mois |

### Coût Réel de la Différence

| Nb clients | Stripe (~1.5%) | Paddle (~5%) | Différence |
|------------|----------------|--------------|------------|
| 10 | 4€/mois | 15€/mois | 11€/mois |
| 50 | 22€/mois | 73€/mois | 51€/mois |
| 100 | 44€/mois | 145€/mois | 101€/mois |
| 500 | 218€/mois | 725€/mois | 507€/mois |

### Recommandation Finale

**Si tu penses avoir des clients hors France un jour → commence directement avec Paddle/LemonSqueezy.**

Raisons :
1. La différence de coût est minime au début (~10-50€/mois)
2. La migration plus tard = risque business (clients doivent re-saisir CB)
3. Zéro gestion TVA internationale = temps économisé
4. Le marché francophone (Québec, Suisse, Belgique) est quasi certain

**Ordre de préférence pour Melya :**

1. **Paddle** - MoR établi, gestion TVA mondiale, intégration solide
2. **LemonSqueezy** - Alternative moderne, même avantages, plus jeune
3. **Stripe** - Seulement si 100% certain de rester France only

---

## Considérations Futures

- **Période d'essai** : 14 jours premium gratuit ?
- **Coupons** : BETA50 pour early adopters ?
- **Team pricing** : Forfait cabinet multi-praticiens ?
- **Échelles premium** : Certaines échelles payantes uniquement ?

---

*Dernière mise à jour : Janvier 2026*
