# Melya - HDS Hosting Research

**Last updated**: February 2026

---

## TL;DR - Final Recommendation

```
Vercel (gratuit)              Scaleway Dedibox HDS (~75€/mois)
────────────────              ──────────────────────────────────
Frontend Next.js              API NestJS + PostgreSQL
(pas de données santé)        (toutes les données santé)

                              Backups chiffrés → Object Storage
                              (n'importe quel provider, ~2€/mois)
```

**Alternative** : Clever Cloud (HDS 6 activités, zero ops, ~300€/mois estimé - devis en attente)

---

**Scaleway Call** - January 2026

---

## Initial Target Setup (Before Call)

What we hoped to get with HDS:

```
┌─────────────────────────────────────────────────────────────────────┐
│                      Scaleway (fr-par only)                         │
│                                                                     │
│   ┌───────────────────┐                                            │
│   │   Object Storage  │◄─────── Static files (Next.js)             │
│   │      + CDN        │         HTML, JS, CSS, images              │
│   └───────────────────┘         No health data here                │
│                                                                     │
│   ┌───────────────────┐         ┌───────────────────┐              │
│   │    Serverless     │◄───────►│ Managed PostgreSQL │              │
│   │    Containers     │ Private │                    │              │
│   │    (NestJS API)   │ Network │  All health data   │              │
│   └─────────┬─────────┘         └───────────────────┘              │
│             │                                                       │
│             │ HTTPS                                                 │
└─────────────┼───────────────────────────────────────────────────────┘
              │
              ▼
        [ Internet ]
         api.melya.fr
```

**Expected benefits:**
- Zero ops (Scaleway manages everything)
- Pay-per-use (~25-30€/month)
- Auto-scaling
- Scale-to-zero (no cost when idle)

**Expected cost:** ~25-30€/month

---

## TL;DR - Call Outcome

Scaleway's modern serverless stack is **NOT HDS certified**. Only dedicated servers (Dedibox) are HDS compliant à prix raisonnable.

| Service | HDS Certified? | HDS Support Cost |
|---------|---------------|------------------|
| Managed PostgreSQL | ❌ No | - |
| Serverless Containers | ❌ No | - |
| Object Storage | ✅ Yes | **250€/mois** (comme OVH) |
| Dedibox (Gen 9 Start-9-M+) | ✅ Yes | **35€/mois** |

**Result**: Must use dedicated server instead of serverless architecture.

> ⚠️ **Object Storage HDS = 250€/mois de support obligatoire**, ce qui le rend non viable pour un MVP. Heureusement, le frontend n'a pas besoin d'HDS.

---

## Final Architecture (HDS Compliant)

```
┌─────────────────────────────────────────────────────────────────┐
│   Vercel (gratuit)                                              │
│   ┌───────────────────┐                                         │
│   │   Next.js Static  │◄─── Frontend (HTML, JS, CSS)            │
│   │   CDN Global      │     Aucune donnée de santé              │
│   └───────────────────┘     Pas besoin HDS                      │
└─────────────────────────────────────────────────────────────────┘
              │
              │ API calls (HTTPS)
              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Scaleway HDS (fr-par)                        │
│                                                                 │
│   ┌───────────────────────────────────────────────────────────┐ │
│   │              Dedibox Gen 9 Start-9-M (HDS)                │ │
│   │                                                           │ │
│   │   ┌─────────────────┐      ┌─────────────────────┐        │ │
│   │   │     Docker      │      │     PostgreSQL      │        │ │
│   │   │   (NestJS API)  │◄────►│   (self-managed)    │        │ │
│   │   └─────────────────┘      └─────────────────────┘        │ │
│   │                                                           │ │
│   │   ┌─────────────────┐                                     │ │
│   │   │      Nginx      │◄─── Reverse proxy + SSL             │ │
│   │   └─────────────────┘                                     │ │
│   │                                                           │ │
│   └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
              │
              │ Backups chiffrés (daily)
              ▼
┌─────────────────────────────────────────────────────────────────┐
│   Object Storage (Scaleway, Backblaze, AWS S3...)               │
│   ┌───────────────────┐                                         │
│   │  Backups chiffrés │◄─── pg_dump + age/gpg encryption        │
│   │  (pas besoin HDS) │     Clé reste sur Dedibox               │
│   └───────────────────┘     ~2€/mois                            │
└─────────────────────────────────────────────────────────────────┘
```

### Pourquoi le frontend n'a pas besoin d'HDS ?

Le frontend Next.js en mode static ne contient que du HTML/JS/CSS. Les données de santé transitent **directement** du navigateur de l'utilisateur vers l'API sur le Dedibox HDS. Vercel ne voit jamais les données patients.

```
Flux des données de santé :

Navigateur ────────────────────────► API Dedibox (HDS) ────► PostgreSQL (HDS)
    │                                       ▲
    │         Données de santé              │
    └───────────────────────────────────────┘

Vercel ne sert que la "coquille" de l'app (HTML/JS/CSS)
```

---

## Dedibox Start-9-M Specs

| Spec | Value |
|------|-------|
| CPU | AMD Ryzen 5 PRO 3600 (6C/12T, 3.6 GHz) |
| RAM | 32 GB DDR4 ECC |
| Storage | 2 × 1 TB NVMe |
| Public bandwidth | 500 Mbps |
| Private bandwidth | 1 Gbps (RPNv2) |
| CPU Benchmark | 18037 |

---

## Real MVP Budget

| Component | Monthly Cost |
|-----------|--------------|
| Dedibox Start-9-M | 39,99€ |
| HDS Support (mandatory) | 35,00€ |
| Vercel (frontend) | 0€ (free tier) |
| Object Storage (backups chiffrés) | ~2€ |
| **Total** | **~77€/month** |

### Business Perspective

- 77€/month = ~2-3 paying customers to cover infrastructure
- If pricing is 30€/month per psychologist → break-even at 3 users

### Pourquoi pas 2 VPS séparés (API + DB) ?

| Aspect | 1 VPS (API + DB) | 2 VPS séparés |
|--------|------------------|---------------|
| Coût | ~77€/mois | ~154€/mois |
| Latence API↔DB | ~0ms (localhost) | ~1-5ms (réseau) |
| Complexité | Simple | Plus de config |
| Ressources | 32GB RAM suffisant | Gaspillage pour MVP |

Le Dedibox Start-9-M a largement assez de ressources pour les deux. Séparer quand tu auras des centaines d'utilisateurs simultanés.

---

## What You Manage (Self-Hosted)

| Task | Responsibility |
|------|----------------|
| OS installation & updates | You |
| PostgreSQL installation | You |
| PostgreSQL backups | You |
| PostgreSQL updates | You |
| Docker setup | You |
| Nginx + SSL certificates | You |
| Firewall configuration | You |
| Monitoring & alerting | You |
| Security patches | You |

### Suggested Server Setup

```
Dedibox Start-9-M
├── Ubuntu 22.04 LTS (or Debian 12)
├── PostgreSQL 16
│   ├── database: melya_staging
│   └── database: melya_prod
├── Docker
│   ├── container: api-staging (port 3001)
│   └── container: api-prod (port 3002)
├── Nginx (reverse proxy)
│   ├── api-staging.melya.fr → localhost:3001
│   └── api.melya.fr → localhost:3002
├── Let's Encrypt (SSL)
├── UFW firewall
└── Automated backups (pg_dump → Object Storage)
```

---

## Backup Strategy

With 2 × 1 TB NVMe drives:

| Option | Setup |
|--------|-------|
| **Option A** | RAID 1 (mirror) - 1 TB usable, hardware redundancy |
| **Option B** | Separate drives - DB on disk 1, backups on disk 2 |

### Recommended Backup Flow

```
PostgreSQL (disk 1)
      │
      │ pg_dump (daily)
      ▼
Chiffrement (age/gpg)
      │
      ▼
Local backup (disk 2)
      │
      │ rclone sync (daily)
      ▼
Object Storage (off-site, pas besoin HDS)
```

### Pourquoi les backups n'ont pas besoin d'HDS ?

Si les backups sont **chiffrés avant** de quitter le Dedibox HDS, le provider Object Storage ne voit que des blobs illisibles. La clé de déchiffrement reste exclusivement sur le Dedibox.

**Interprétation juridique courante** : des données chiffrées dont la clé reste sur infrastructure HDS ne sont plus des "données de santé lisibles" pour l'hébergeur non-HDS.

### Options Object Storage pour backups

| Provider | Prix ~100GB | Localisation |
|----------|-------------|--------------|
| Scaleway (sans HDS) | ~2€/mois | France |
| Backblaze B2 | ~1€/mois | EU (Amsterdam) |
| AWS S3 | ~2-3€/mois | EU (Paris) |
| OVH Object Storage | ~1-2€/mois | France |

### Script backup type

```bash
#!/bin/bash
# Sur le Dedibox

# 1. Dump
pg_dump melya_prod > /tmp/backup.sql

# 2. Chiffre
age -r "ta_clé_publique" /tmp/backup.sql > /tmp/backup.sql.enc

# 3. Upload
rclone copy /tmp/backup.sql.enc scaleway:melya-backups/

# 4. Nettoyage
rm /tmp/backup.sql /tmp/backup.sql.enc
```

---

## Environments (Staging + Prod)

Both run on the same Dedibox:

| Environment | Database | API Container | URL |
|-------------|----------|---------------|-----|
| Staging | melya_staging | api-staging:3001 | api-staging.melya.fr |
| Production | melya_prod | api-prod:3002 | api.melya.fr |

**Cost**: 0€ extra (same server)

---

## Frontend Deployment

Frontend has no health data → can use Vercel (gratuit, pas besoin HDS).

```
GitHub                                 Vercel
──────────────────────────────────────────────────────
git push → auto build → deploy → CDN Global
                                 (melya.fr)
```

### Avantages Vercel vs Object Storage Scaleway

| Aspect | Vercel | Scaleway Object Storage |
|--------|--------|------------------------|
| Coût | Gratuit (free tier) | ~1-2€/mois |
| Déploiement | Auto (git push) | CI/CD à configurer |
| Preview deployments | ✅ Inclus | ❌ À configurer |
| Analytics | ✅ Inclus | ❌ Non |
| CDN | ✅ Global | ✅ France |

---

## Comparison: All Options

| Aspect | Initial Hope | Scaleway Dedibox | Clever Cloud HDS | OVH Managed + HDS |
|--------|--------------|------------------|------------------|-------------------|
| Monthly cost | ~25-30€ | ~77€ | ~300€ (estimé) | ~295€ |
| Operations | Zero ops | Self-managed | Zero ops | Zero ops |
| Scaling | Automatic | Manual | Automatic | Automatic |
| Pay model | Per-use | Fixed monthly | Per-second + 200€ fixe | Fixed monthly |
| HDS activities | - | 1-4 only | 1-6 (all) | 1-6 (all) |
| Engagement | - | Aucun | 12 mois | Aucun |
| Backups | - | Self-managed | Inclus (7j) | Inclus |
| DB replication | - | Self-managed | Incluse | Incluse |
| Frontend | Scaleway | Vercel (free) | Vercel (free) | Vercel (free) |

---

## Key Learnings

1. **"HDS certified" ≠ all services** - Only specific products are covered
2. **Serverless + HDS don't mix** (at Scaleway) - Modern stack isn't certified yet
3. **Budget 3x higher** than initial estimate for HDS compliance
4. **More ops work** required - no managed database available with HDS (chez Scaleway)
5. **Frontend n'a pas besoin HDS** - Les données de santé transitent directement du navigateur vers l'API HDS
6. **Backups chiffrés = pas besoin HDS** - Si la clé reste sur l'infra HDS, les blobs chiffrés ne sont plus des "données de santé"
7. **Clever Cloud = zero ops HDS** - 6 activités + managed, mais ~300€/mois (200€ fixe + coeff ×1.4)
8. **Object Storage HDS Scaleway = 250€/mois** - Trop cher, mais non nécessaire pour frontend/backups
9. **Le vrai arbitrage** : ~77€ self-managed (Scaleway) vs ~300€ zero ops (Clever Cloud/OVH) - le zero ops HDS coûte ~4x plus cher

---

## OVH Comparison (Investigated)

### What OVH Offers with HDS

OVH has more HDS-certified services than Scaleway:

| Service | HDS Certified |
|---------|---------------|
| Managed PostgreSQL | ✅ Yes |
| Managed Kubernetes | ✅ Yes |
| Public Cloud Compute | ✅ Yes |
| Object Storage | ✅ Yes |
| Dedicated Servers | ✅ Yes |

### The Catch: Mandatory Support Tier

To activate HDS on any OVH service, you **must** subscribe to Business or Enterprise support:

| Support Tier | Monthly Cost |
|--------------|--------------|
| Business | **250€ HT/mois** |
| Enterprise | **5000€ HT/mois** |

### OVH Total Cost Estimate

```
Support Business (mandatory)      250€
PostgreSQL Essential              ~20€
Kubernetes node (smallest)        ~22€
Object Storage                    ~2€
─────────────────────────────────────
Total                            ~295€/mois
```

### Verdict: OVH vs Scaleway

| Solution | Monthly Cost | Ops Work |
|----------|--------------|----------|
| **Scaleway Dedibox** | ~77€ | Self-managed |
| **OVH Managed + HDS** | ~295€ | Zero ops |

**OVH costs ~4x more** than Scaleway for managed services with HDS.

For a solo dev MVP, paying 77€ + doing some ops work beats paying 295€ for managed convenience.

---

## Clever Cloud (Investigated - February 2026)

**Clever Cloud Call** - February 2026

### Ce qu'ils offrent

Clever Cloud a obtenu la certification HDS en **janvier 2025** pour **les 6 activités** (contrairement à Scaleway qui ne couvre que 1-4). Certification valide jusqu'en **2027**.

| Aspect | Clever Cloud | Scaleway Dedibox |
|--------|--------------|------------------|
| **Certification HDS** | ✅ 6 activités (1-6) | ⚠️ 4 activités (1-4) |
| **Services HDS** | PostgreSQL, Docker, Node.js managés | Dedibox uniquement |
| **Modèle** | PaaS managé (zero ops) | Serveur dédié (self-managed) |
| **Facturation** | À la seconde | Mensuel fixe |
| **Scaling** | Automatique (vertical + horizontal) | Manuel |
| **Backups** | Inclus (rétention 7 jours) | À gérer soi-même |
| **Réplication DB** | Incluse (doublée) | À gérer soi-même |

### Services HDS certifiés

- PostgreSQL, MySQL, Elasticsearch, Redis, MongoDB (managed)
- Applications Docker, Node.js, etc.
- Backups inclus (7 jours de rétention)
- Réplication de base de données incluse

### Pricing HDS (Call Outcome)

| Élément | Détail |
|---------|--------|
| **Abonnement HDS fixe** | 200€/mois |
| **Engagement** | 12 mois |
| **Coefficient HDS** | ×1.4 sur toute la consommation |
| **Paiement progressif** | 10 premiers mois (mois 1 = 10%, mois 2 = 20%, ...) |

### Estimation coût mensuel (à confirmer avec devis)

| Composant | Coût standard | Avec coeff HDS (×1.4) |
|-----------|--------------|----------------------|
| Abonnement HDS fixe | - | 200€ |
| PostgreSQL (nano) | ~20-30€ | ~28-42€ |
| Docker container(s) | ~54€ (à confirmer) | ~76€ |
| **Total estimé** | - | **~300-320€/mois** |

> ⚠️ Le paiement progressif les 10 premiers mois réduit la charge initiale :
> Mois 1 ≈ 30€, Mois 2 ≈ 60€, ... Mois 10 ≈ 300€, puis plein tarif.

### Avantages confirmés

- **Zero ops** : managed PostgreSQL, managed containers, backups automatiques
- **HDS 6 activités** = pas besoin de se certifier soi-même (activités 5-6 incluses)
- **Scaling automatique** (vertical + horizontal)
- **Support réactif** : escalade aux bonnes équipes, retours rapides
- **Couverture géographique** : AZ à Paris et autres zones disponibles
- **Frontend séparable** : confirmé que le frontend peut rester sur Vercel

### Inconvénients

- **Coût élevé** : ~300€/mois vs 77€ pour Scaleway Dedibox (~4x plus cher)
- **Engagement 12 mois** : pas de flexibilité
- **Obligations documentaires** : audits et demandes de documents liés à la certification HDS
- **Convention HDS** : nécessite signature (SIREN, coordonnées, périmètre)
- **Risque de surconsommation** : arrêt automatique des services si surconso RAM/CPU

### Prochaines étapes Clever Cloud

- [ ] Recevoir le devis officiel de Clever Cloud
- [ ] Signer la convention HDS (format Word, infos SIREN/téléphone)
- [ ] Créer un compte organisation + crédits gratuits offerts
- [ ] Comparer devis final vs Scaleway Dedibox

### Références

- [Clever Cloud HDS](https://clever.cloud/health-data-hosting/)
- [Annonce certification HDS](https://www.clever.cloud/blog/press/2025/01/15/clever-cloud-obtains-hds-certification/)

---

## Other Providers (Not Investigated)

| Provider | HDS Option | Notes |
|----------|-----------|-------|
| **Outscale** | Full HDS | Dassault subsidiary, enterprise-focused |
| **Azure France** | HDS available | More complex, likely expensive |

---

## HDS Certification: Do I Need It as a Developer?

### The 6 HDS Activity Levels

| Activities | Who | Description |
|------------|-----|-------------|
| 1-4 | **Infrastructure host** | Datacenter, hardware, physical security |
| 5-6 | **Managed services (Infogéreur)** | Application management, administration, backups |

### For Melya (SaaS)

**Réponse confirmée par le contrat Scaleway (février 2026)** : Scaleway ne couvre que les activités 1-4. Les activités 5-6 sont explicitement à la charge du client.

```
Scaleway (Dedibox HDS)              CASCADE (Client)
──────────────────────────────────────────────────────────
Activities 1-4 ✅                    Activities 5-6 ⚠️
Physical infrastructure              Application management
Certified by Scaleway                À la charge du client
```

Le contrat liste comme responsabilités client :
- Maintenance OS, correctifs de sécurité → **Activité 5**
- Sauvegardes régulières, déportées et testées → **Activité 6**
- Gestion des accès (IAM) → **Activité 5**
- Journalisation des accès → **Activité 5**
- Plan de continuité (PCA/PRA) → **Activités 5-6**

### Key Rules

| Situation | Certification Required |
|-----------|----------------------|
| Software installed at client's location | ❌ No |
| SaaS hosting health data yourself | ⚠️ Potentially yes (activities 5-6) |
| Using fully certified HDS host (1-6) | ✅ Covered by host |

### Deux interprétations possibles

| Interprétation | Conséquence |
|----------------|------------|
| **Stricte** : éditeur SaaS = hébergeur pour activités 5-6 | Certification HDS 5-6 requise (~10 000€+ one-time + audits annuels) |
| **Courante** : éditeur SaaS ≠ hébergeur pour compte de tiers | Pas de certification HDS requise, bonnes pratiques suffisent |

> ⚠️ **Avec Clever Cloud (activités 1-6)**, ce flou juridique disparaît : tout est couvert par l'hébergeur.

### Risques concrets sans certification 5-6 (Scaleway)

#### Sanctions théoriques

| Type | Sanction | Base légale |
|------|----------|-------------|
| **Pénale** | 3 ans d'emprisonnement + 45 000€ d'amende | Art. L.1115-1 CSP |
| **CNIL** | Jusqu'à 20M€ ou 4% du CA annuel | RGPD |
| **Administrative** | Mise en demeure, injonction | ARS / CNIL |

#### Risque réel pour un MVP

- **Probabilité d'un contrôle** sur un petit SaaS : très faible
- **Aucun cas connu** d'un éditeur SaaS sanctionné pour absence de certification 5-6
- La plupart des startups santé françaises lancent sans certification HDS complète
- L'interprétation juridique est débattue

#### Quand ça devient un vrai problème

| Situation | Risque |
|-----------|--------|
| Tout va bien, pas de plainte | Quasi nul |
| **Fuite de données** | Non-conformité HDS = **facteur aggravant** |
| Client psy demande des garanties | Impossible de prouver la conformité |
| Prospection **hôpitaux / institutions** | Ils exigeront la certification |
| Dénonciation par concurrent | Possible mais rare |

> **En résumé** : pas de certification 5-6 + pas d'incident = probablement rien. Pas de certification 5-6 + fuite de données = gros problème. C'est un risque calculé que beaucoup de startups prennent au début.

### If Self-Certification Required (Scaleway)

Cost estimate for HDS activities 5-6:
- ISO 27001 certification prerequisite
- HDS audit by accredited body
- Total: likely **10,000€+ one-time** + annual audits

### References

- [ANS - Certification HDS](https://esante.gouv.fr/produits-services/hds)
- [Éditeur de logiciels de santé et HDS](https://www.dpo-partage.fr/editeur-de-logiciels-de-sante/)
- [Article L.1115-1 CSP - Sanctions pénales](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000021941353)

---

## Next Steps

### Option A : Scaleway Dedibox (~77€/mois)

- [ ] Confirmer commande Dedibox avec support HDS
- [x] Clarifier activités 5-6 → **Contrat confirme : Scaleway = activités 1-4 seulement, 5-6 à la charge du client**
- [ ] Setup serveur (OS, PostgreSQL, Docker, Nginx)
- [ ] Configurer backups chiffrés → Object Storage
- [ ] Connecter Vercel pour le frontend
- [ ] CI/CD pour déploiement API sur Dedibox

### Option B : Clever Cloud (~300€/mois estimé, devis en attente)

- [x] Contacter Clever Cloud pour pricing HDS → **appel fait février 2026**
- [ ] Recevoir et analyser le devis officiel
- [ ] Signer la convention HDS si retenu (SIREN, périmètre)
- [ ] Créer compte organisation
- [ ] Comparer devis final vs Scaleway (arbitrage coût vs temps ops)

---

## Useful References

### Scaleway
- [Scaleway Security & Compliance](https://www.scaleway.com/fr/securite-conformite/)
- [Scaleway Dedibox](https://www.scaleway.com/fr/dedibox/)

### Clever Cloud
- [Clever Cloud HDS](https://clever.cloud/health-data-hosting/)
- [Clever Cloud Pricing](https://clever.cloud/pricing/)

### Réglementation
- [Article L.1111-8 CSP](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000021941353)
- [ANS - Référentiel HDS](https://esante.gouv.fr/produits-services/hds)
- [PGSSI-S](https://esante.gouv.fr/produits-services/pgssi-s/corpus-documentaire)

### Frontend
- [Vercel](https://vercel.com/)
