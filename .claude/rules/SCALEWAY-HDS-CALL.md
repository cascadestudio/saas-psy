# Melya - HDS Hosting Discussion

**Call with Scaleway** - January 2026

---

## The Project

### Melya in a Nutshell
SaaS platform for psychologists that automates psychometric questionnaires:
- **Send** questionnaires to patients in 2-3 clicks
- **Collect** responses online (patient-friendly interface)
- **Score** automatically (BDI, STAI, Liebowitz, etc.)
- **Track** longitudinal history per patient

### Why HDS is Mandatory
- Storing **sensitive health data** (psychological assessments, patient responses)
- Legal requirement: **Article L.1111-8 du Code de la Santé Publique**
- Target users: French psychologists in private practice

### Current Stage
- Solo developer
- MVP in development
- Local dev environment working
- Ready to plan production infrastructure

---

## Target Architecture

### Overview
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

### Component Breakdown

#### Frontend - Static Hosting
| | |
|---|---|
| **Technology** | Next.js 15 (static export) |
| **Content** | HTML, JS, CSS, images |
| **Sensitive data?** | No - just UI assets |
| **Ideal hosting** | Object Storage + CDN |
| **Size** | ~10-50 MB |

#### Backend - API Server
| | |
|---|---|
| **Technology** | NestJS (Node.js 20) in Docker |
| **Role** | REST API, business logic, auth |
| **Sensitive data?** | Yes - processes all health data |
| **Ideal hosting** | Serverless Containers |
| **Scaling needs** | Low traffic initially, pay-per-use preferred |

#### Database - PostgreSQL
| | |
|---|---|
| **Technology** | PostgreSQL 16 |
| **Data stored** | Users, patients, sessions, questionnaire responses, scores |
| **Sensitive data?** | Yes - all health data lives here |
| **Ideal hosting** | Managed PostgreSQL |
| **Size** | Starting small (~10 GB), grows with usage |

---

## What I Need

### Must Have (Non-negotiable)

| Requirement | Why |
|-------------|-----|
| **HDS certification** | Legal obligation for health data in France |
| **Data stays in France** | No replication or transit outside fr-par |
| **Managed PostgreSQL** | Don't want to manage DB ops myself |
| **Encryption at rest** | HDS compliance requirement |
| **Automated backups** | Data protection, disaster recovery |
| **Private networking** | Database not exposed to internet |

### Should Have (Important)

| Requirement | Why |
|-------------|-----|
| **Serverless / pay-per-use** | Cost optimization for MVP stage |
| **Auto-scaling** | Handle traffic spikes without manual intervention |
| **Easy CI/CD integration** | GitHub Actions deployment |
| **Custom domains + SSL** | Professional appearance (melya.fr, api.melya.fr) |

### Nice to Have

| Requirement | Why |
|-------------|-----|
| **Scale to zero** | No cost when no traffic (nights, weekends) |
| **Startup program** | Credits to reduce early-stage costs |

---

## Key Topics to Discuss

### 1. HDS Scope
Which services are covered by HDS certification?
- Serverless Containers?
- Managed PostgreSQL?
- Object Storage?
- Private Networks?

What certification level? (Infrastructure physique vs Infogéreur)

### 2. Architecture Validation
Is my proposed architecture the right approach for:
- A solo dev starting an MVP?
- Future scaling if the product takes off?
- HDS compliance requirements?

Alternative approaches to consider?

### 3. Security Model
- How does private networking work between Containers and PostgreSQL?
- Secrets/environment variables handling?
- Encryption details (at rest, in transit)?
- Access logging and audit trails?

### 4. Operational Aspects
- Backup strategy (frequency, retention, PITR)?
- Monitoring and alerting?
- Incident response process?
- Support levels available?

### 5. Compliance & Legal
- DPA (Data Processing Agreement) process?
- Documentation I can show to clients/auditors?
- What's my responsibility vs Scaleway's? (shared responsibility model)

### 6. Pricing & Growth Path
- Realistic cost estimate for MVP stage (~1000 req/day)?
- How costs scale with growth?
- Any startup program or credits?

---

## Why Scaleway?

Considered other options:

| Provider | Issue |
|----------|-------|
| **Vercel** | US-based, no HDS, data transits outside France |
| **AWS** | Complex, no native HDS (requires partner like Claranet) |
| **Azure** | HDS available but complex setup, overkill for MVP |
| **OVH** | HDS available, but serverless offerings less mature |

**Scaleway looks ideal because:**
- French company with full HDS certification
- Modern serverless stack (Containers, Functions)
- Managed PostgreSQL with HDS
- Developer-friendly (good docs, simple pricing)
- Everything in one place (no multi-vendor complexity)

---

## About Me

- **Background**: Solo developer, building Melya as a SaaS product
- **Stage**: MVP development, preparing for first users
- **Timeline**: Want to have production infrastructure ready in coming weeks
- **Growth expectation**: Starting small, hoping to scale if product-market fit works

---

## Notes from Call

_(Space for notes)_

### Architecture decisions:


### HDS clarifications:


### Pricing discussed:


### Next steps:


### Action items:
- [ ]
- [ ]
- [ ]

---

## Useful References

- [Scaleway Security & Compliance](https://www.scaleway.com/fr/securite-conformite/)
- [Article L.1111-8 CSP](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000021941353)
- [ANS - Référentiel HDS](https://esante.gouv.fr/produits-services/hds)
