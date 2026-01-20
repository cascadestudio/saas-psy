# Melya - HDS Hosting Research

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

Scaleway's modern serverless stack is **NOT HDS certified**. Only dedicated servers (Dedibox) and Object Storage are HDS compliant.

| Service | HDS Certified? |
|---------|---------------|
| Managed PostgreSQL | ❌ No |
| Serverless Containers | ❌ No |
| Object Storage | ✅ Yes |
| Dedibox (Gen 9 Start-9-M+) | ✅ Yes |

**Result**: Must use dedicated server instead of serverless architecture.

---

## Final Architecture (HDS Compliant)

```
┌─────────────────────────────────────────────────────────────────┐
│                    Scaleway HDS (fr-par)                        │
│                                                                 │
│   ┌───────────────────┐                                         │
│   │   Object Storage  │◄─── Frontend (Next.js static)           │
│   │   + CDN (HDS)     │     HTML, JS, CSS                       │
│   └───────────────────┘     No health data                      │
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
| Object Storage + CDN | ~1-2€ |
| **Total** | **~77€/month** |

### Business Perspective

- 77€/month = ~2-3 paying customers to cover infrastructure
- If pricing is 30-50€/month per psychologist → break-even at 2-3 users

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
Local backup (disk 2)
      │
      │ rclone sync (daily)
      ▼
Object Storage HDS (off-site)
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

Frontend has no health data → can use Object Storage + CDN (HDS certified anyway).

```
GitHub Actions                         Scaleway
──────────────────────────────────────────────────────
git push → npm run build → upload → Object Storage → CDN
                                    (melya.fr)
```

---

## Comparison: Expected vs Reality

| Aspect | Expected (Serverless) | Reality (Dedibox) |
|--------|----------------------|-------------------|
| Monthly cost | ~25-30€ | ~77€ |
| Operations | Zero ops | Full server management |
| Scaling | Automatic | Manual |
| Pay model | Per-use | Fixed monthly |
| Cold start | 1-2s after inactivity | Always warm |
| HDS certified | ❌ (surprise) | ✅ |

---

## Key Learnings

1. **"HDS certified" ≠ all services** - Only specific products are covered
2. **Serverless + HDS don't mix** (at Scaleway) - Modern stack isn't certified yet
3. **Budget 3x higher** than initial estimate for HDS compliance
4. **More ops work** required - no managed database available with HDS

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

## Other Providers (Not Investigated)

| Provider | HDS Option | Notes |
|----------|-----------|-------|
| **Clever Cloud** | Claims HDS | Worth investigating serverless options |
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

```
Scaleway (Dedibox HDS)              You (SaaS Editor)
──────────────────────────────────────────────────────────
Activities 1-4 ✅                    Activities 5-6 ❓
Physical infrastructure              Application management
Certified by Scaleway                Potentially required
```

### Key Rules

| Situation | Certification Required |
|-----------|----------------------|
| Software installed at client's location | ❌ No |
| SaaS hosting health data yourself | ⚠️ Potentially yes (activities 5-6) |
| Using fully certified HDS host (1-6) | ✅ Covered by host |

### Question to Ask Scaleway

> "With the 35€ HDS support, am I covered for all 6 activities, or do I need to certify myself for activities 5-6?"

### If Self-Certification Required

Cost estimate for HDS activities 5-6:
- ISO 27001 certification prerequisite
- HDS audit by accredited body
- Total: likely **10,000€+ one-time** + annual audits

### References

- [ANS - Certification HDS](https://esante.gouv.fr/produits-services/hds)
- [Éditeur de logiciels de santé et HDS](https://www.dpo-partage.fr/editeur-de-logiciels-de-sante/)

---

## Next Steps

- [ ] Confirm Dedibox order with HDS support
- [ ] Plan server setup (OS, PostgreSQL, Docker, Nginx)
- [ ] Design backup automation (pg_dump → Object Storage)
- [ ] Set up CI/CD for Dedibox deployment
- [ ] Document server maintenance procedures

---

## Useful References

- [Scaleway Security & Compliance](https://www.scaleway.com/fr/securite-conformite/)
- [Scaleway Dedibox](https://www.scaleway.com/fr/dedibox/)
- [Article L.1111-8 CSP](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000021941353)
- [ANS - Référentiel HDS](https://esante.gouv.fr/produits-services/hds)
