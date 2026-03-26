# Chiffrement des données - Melya

> Ref: MEL-11 - Obligation contrat HDS Scaleway (Annexe 11, section 7.4.3)
> **Status: IMPLÉMENTÉ** (février 2026)

---

## Contexte

Le contrat HDS Scaleway impose au client (CASCADE) le **chiffrement des données au repos et en transit**.

### Données sensibles stockées en clair

| Modèle | Champs | Type Prisma |
|--------|--------|-------------|
| Patient | `firstName`, `lastName` | String |
| Patient | `email` | String |
| Patient | `birthDate` | DateTime? |
| Patient | `notes` | String? |
| Session | `responses` | Json? |
| Session | `score` | Json? |
| Session | `interpretation` | String? |
| Session | `patientComments` | String? |

---

## Architecture choisie

**Chiffrement applicatif avec Prisma middleware** : le chiffrement/déchiffrement est transparent pour les services existants.

```
Service (inchangé)
    │
    │ patient.create({ firstName: "Jean" })
    ▼
Prisma Middleware (intercepte)
    │
    │ encrypt("Jean") → "aGVsbG8=.dGFn.Y2lwaGVy"
    ▼
PostgreSQL (stocke le chiffré)
    │
    │ SELECT → "aGVsbG8=.dGFn.Y2lwaGVy"
    ▼
Prisma Middleware (intercepte)
    │
    │ decrypt("aGVsbG8=.dGFn.Y2lwaGVy") → "Jean"
    ▼
Service (reçoit "Jean" en clair)
```

### Algorithme

- **AES-256-GCM** (confidentialité + intégrité)
- IV aléatoire 16 bytes par opération (pas de pattern repeated)
- Auth tag 16 bytes (détecte la falsification)
- Format stocké : `base64(iv).base64(tag).base64(ciphertext)`
- Clé : 32 bytes via variable d'environnement `ENCRYPTION_KEY`

### Pourquoi Prisma middleware ?

- **Zéro changement** dans les services existants (patients, sessions)
- Chiffrement/déchiffrement transparent et centralisé
- Un seul endroit à maintenir
- Les champs `Json?` deviennent `String?` (seul changement schema)

---

## Fichiers à créer/modifier

### Nouveaux fichiers

| Fichier | Description |
|---------|-------------|
| `apps/api/src/encryption/encryption.service.ts` | Service AES-256-GCM (encrypt/decrypt) |
| `apps/api/src/encryption/encryption.module.ts` | Module NestJS |
| `apps/api/src/encryption/encryption.constants.ts` | Liste des champs à chiffrer par modèle |
| `apps/api/src/encryption/encryption.middleware.ts` | Prisma middleware transparent |
| `apps/api/src/encryption/encryption.service.spec.ts` | Tests unitaires |
| `apps/api/scripts/encrypt-existing-data.ts` | Script de migration des données existantes |

### Fichiers à modifier

| Fichier | Modification |
|---------|-------------|
| `apps/api/prisma/schema.prisma` | `responses Json?` → `String?`, `score Json?` → `String?` |
| `apps/api/src/prisma/prisma.service.ts` | Brancher le middleware d'encryption |
| `apps/api/src/app.module.ts` | Importer `EncryptionModule` |
| `apps/api/.env` | Ajouter `ENCRYPTION_KEY` |

---

## Implémentation

### Etape 1 : EncryptionService

```typescript
// apps/api/src/encryption/encryption.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SEPARATOR = '.';

@Injectable()
export class EncryptionService {
  private key: Buffer;

  constructor(private configService: ConfigService) {
    const keyHex = this.configService.get<string>('ENCRYPTION_KEY');
    if (!keyHex || keyHex.length !== 64) {
      throw new Error('ENCRYPTION_KEY must be 64 hex characters (32 bytes)');
    }
    this.key = Buffer.from(keyHex, 'hex');
  }

  encrypt(plaintext: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, this.key, iv);

    let ciphertext = cipher.update(plaintext, 'utf-8', 'base64');
    ciphertext += cipher.final('base64');
    const tag = cipher.getAuthTag();

    // Format: iv.tag.ciphertext (tout en base64)
    return [
      iv.toString('base64'),
      tag.toString('base64'),
      ciphertext,
    ].join(SEPARATOR);
  }

  decrypt(encrypted: string): string {
    const [ivB64, tagB64, ciphertext] = encrypted.split(SEPARATOR);

    const iv = Buffer.from(ivB64, 'base64');
    const tag = Buffer.from(tagB64, 'base64');
    const decipher = crypto.createDecipheriv(ALGORITHM, this.key, iv);
    decipher.setAuthTag(tag);

    let plaintext = decipher.update(ciphertext, 'base64', 'utf-8');
    plaintext += decipher.final('utf-8');
    return plaintext;
  }

  isEncrypted(value: string): boolean {
    const parts = value.split(SEPARATOR);
    return parts.length === 3 && parts.every((p) => p.length > 0);
  }
}
```

### Etape 2 : Configuration des champs à chiffrer

```typescript
// apps/api/src/encryption/encryption.constants.ts

// Champs chiffrés par modèle Prisma
export const ENCRYPTED_FIELDS: Record<string, string[]> = {
  Patient: ['firstName', 'lastName', 'notes'],
  Session: ['responses', 'score', 'interpretation', 'patientComments'],
};

// Champs qui étaient Json et sont maintenant String (besoin de serialize/parse)
export const JSON_FIELDS: Record<string, string[]> = {
  Session: ['responses', 'score'],
};
```

### Etape 3 : Prisma middleware

```typescript
// apps/api/src/encryption/encryption.middleware.ts
import { Prisma } from '@prisma/client';
import { EncryptionService } from './encryption.service';
import { ENCRYPTED_FIELDS, JSON_FIELDS } from './encryption.constants';

export function createEncryptionMiddleware(
  encryptionService: EncryptionService,
): Prisma.Middleware {
  return async (params, next) => {
    const model = params.model;
    if (!model || !ENCRYPTED_FIELDS[model]) return next(params);

    const fields = ENCRYPTED_FIELDS[model];
    const jsonFields = JSON_FIELDS[model] || [];

    // Chiffrer à l'écriture (create, update)
    if (['create', 'update', 'upsert'].includes(params.action)) {
      const data =
        params.action === 'upsert'
          ? params.args.create // chiffrer create et update
          : params.args.data;

      if (data) {
        for (const field of fields) {
          if (data[field] != null) {
            let value = data[field];
            // Sérialiser les Json en string avant chiffrement
            if (jsonFields.includes(field) && typeof value !== 'string') {
              value = JSON.stringify(value);
            }
            data[field] = encryptionService.encrypt(String(value));
          }
        }
      }

      // Même traitement pour upsert.update
      if (params.action === 'upsert' && params.args.update) {
        for (const field of fields) {
          if (params.args.update[field] != null) {
            let value = params.args.update[field];
            if (jsonFields.includes(field) && typeof value !== 'string') {
              value = JSON.stringify(value);
            }
            params.args.update[field] = encryptionService.encrypt(
              String(value),
            );
          }
        }
      }
    }

    // Exécuter la requête
    const result = await next(params);

    // Déchiffrer à la lecture
    if (result) {
      decryptResult(result, model, fields, jsonFields, encryptionService);
    }

    return result;
  };
}

function decryptResult(
  result: any,
  model: string,
  fields: string[],
  jsonFields: string[],
  encryptionService: EncryptionService,
) {
  // Gérer les tableaux (findMany)
  if (Array.isArray(result)) {
    result.forEach((item) =>
      decryptResult(item, model, fields, jsonFields, encryptionService),
    );
    return;
  }

  // Déchiffrer chaque champ
  for (const field of fields) {
    if (result[field] && typeof result[field] === 'string') {
      try {
        if (encryptionService.isEncrypted(result[field])) {
          const decrypted = encryptionService.decrypt(result[field]);
          // Parser les champs qui étaient Json
          if (jsonFields.includes(field)) {
            try {
              result[field] = JSON.parse(decrypted);
            } catch {
              result[field] = decrypted;
            }
          } else {
            result[field] = decrypted;
          }
        }
      } catch {
        // Si le déchiffrement échoue, laisser la valeur telle quelle
        // (données non chiffrées avant migration)
      }
    }
  }

  // Déchiffrer les relations incluses
  for (const [key, value] of Object.entries(result)) {
    if (value && typeof value === 'object' && ENCRYPTED_FIELDS[key]) {
      // C'est probablement une relation (ex: result.Patient)
      // Le middleware Prisma gère déjà les relations via des requêtes séparées
    }
  }
}
```

### Etape 4 : Brancher dans PrismaService

```typescript
// apps/api/src/prisma/prisma.service.ts - modification
import { createEncryptionMiddleware } from '../encryption/encryption.middleware';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    private configService: ConfigService,
    private encryptionService: EncryptionService,
  ) {
    super({ datasources: { db: { url: configService.get('DATABASE_URL') } } });

    // Middleware de chiffrement transparent
    this.$use(createEncryptionMiddleware(this.encryptionService));
  }
}
```

### Etape 5 : Migration Prisma

```prisma
// Changements dans schema.prisma

model Session {
  // AVANT
  // responses      Json?
  // score          Json?

  // APRES
  responses         String?    // Chiffré par middleware, était Json
  score             String?    // Chiffré par middleware, était Json
  interpretation    String?    // Chiffré par middleware
  patientComments   String?    @map("patient_comments") // Chiffré par middleware
}
```

```bash
cd apps/api && npx prisma migrate dev --name encrypt_json_to_string
```

### Etape 6 : Script de migration des données existantes

```typescript
// apps/api/scripts/encrypt-existing-data.ts
// Chiffre toutes les données existantes en clair

async function migrateData() {
  const encryption = new EncryptionService(configService);

  // Patients
  const patients = await prisma.patient.findMany();
  for (const patient of patients) {
    const updates: any = {};

    if (patient.firstName && !encryption.isEncrypted(patient.firstName)) {
      updates.firstName = encryption.encrypt(patient.firstName);
    }
    if (patient.lastName && !encryption.isEncrypted(patient.lastName)) {
      updates.lastName = encryption.encrypt(patient.lastName);
    }
    if (patient.notes && !encryption.isEncrypted(patient.notes)) {
      updates.notes = encryption.encrypt(patient.notes);
    }

    if (Object.keys(updates).length > 0) {
      // Update direct sans passer par le middleware
      await prisma.$executeRawUnsafe(
        `UPDATE patients SET first_name = $1, last_name = $2, notes = $3 WHERE id = $4`,
        updates.firstName || patient.firstName,
        updates.lastName || patient.lastName,
        updates.notes || patient.notes,
        patient.id,
      );
    }
  }

  // Sessions (responses et score sont déjà String après migration)
  const sessions = await prisma.session.findMany();
  for (const session of sessions) {
    // ... même logique
  }
}
```

### Etape 7 : Variable d'environnement

```bash
# Générer la clé
openssl rand -hex 32

# Ajouter dans apps/api/.env
ENCRYPTION_KEY="<output de la commande ci-dessus>"
```

---

## Chiffrement en transit (production)

Ce volet concerne le déploiement sur le Dedibox HDS :

| Composant | Solution |
|-----------|----------|
| Frontend → API | HTTPS via Nginx + Let's Encrypt |
| API → PostgreSQL | `sslmode=require` dans DATABASE_URL |
| Headers de sécurité | HSTS, X-Content-Type-Options, CSP via Nginx |

### Nginx (sur le Dedibox)

```nginx
server {
    listen 443 ssl http2;
    server_name api.melya.fr;

    ssl_certificate /etc/letsencrypt/live/api.melya.fr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.melya.fr/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;

    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header X-Forwarded-Proto https;
    }
}
```

### DATABASE_URL production

```
DATABASE_URL="postgresql://user:password@localhost:5432/melya_prod?sslmode=require"
```

---

## Impact sur le code existant

### Ce qui NE change PAS

- `apps/api/src/patients/patients.service.ts` - aucune modification
- `apps/api/src/sessions/sessions.service.ts` - aucune modification (sauf si les services font des requêtes JSON spécifiques sur `responses`/`score`)
- `apps/web/` - aucune modification (l'API renvoie toujours du JSON déchiffré)
- Auth / JWT / bcrypt - inchangés

### Limitation connue

Les champs chiffrés ne sont **plus queryables en SQL** :
- `WHERE firstName LIKE '%jean%'` ne fonctionne plus
- La recherche de patients devra se faire côté applicatif (charger + filtrer) ou via un index de recherche séparé
- `email` n'est **pas chiffré** volontairement (utilisé comme identifiant unique + recherche)

---

## Gestion des clés (futur)

| Phase | Stratégie |
|-------|-----------|
| MVP | Variable d'environnement `ENCRYPTION_KEY` |
| Post-MVP | Versionnage des clés (champ `encryptionVersion` sur chaque row) |
| HDS Phase 4 | Scaleway KMS ou Vault pour rotation automatique |

### Rotation de clé (quand nécessaire)

1. Ajouter la nouvelle clé dans l'env (`ENCRYPTION_KEY_V2`)
2. Déchiffrer avec l'ancienne, re-chiffrer avec la nouvelle (script batch)
3. Mettre à jour `ENCRYPTION_KEY` avec la nouvelle valeur
4. Supprimer l'ancienne clé

---

## Checklist de vérification

- [ ] `ENCRYPTION_KEY` générée et ajoutée au `.env`
- [ ] EncryptionService créé et testé unitairement
- [ ] Prisma middleware branché dans PrismaService
- [ ] Migration Prisma `Json? → String?` appliquée
- [ ] Script de migration des données existantes exécuté
- [ ] Vérifier : créer un patient → champ chiffré en DB
- [ ] Vérifier : lire un patient → données déchiffrées dans l'API
- [ ] Vérifier : soumettre des réponses → `responses` chiffré en DB
- [ ] Vérifier : consulter une session → `score` et `interpretation` lisibles
- [ ] Vérifier : les données pré-migration sont toujours lisibles
- [ ] HTTPS configuré sur le Dedibox (production)
- [ ] `sslmode=require` dans DATABASE_URL de production

---

## Sécurité

| Menace | Protection |
|--------|-----------|
| Vol de la base de données | Données chiffrées, inutilisables sans la clé |
| Falsification des données | Auth tag GCM détecte toute modification |
| Analyse de patterns | IV aléatoire par opération |
| Vol de la clé `.env` | Risque résiduel - KMS en Phase 4 |
| Accès mémoire runtime | Hors scope MVP (données en clair pendant le traitement) |

---

*Ref: Contrat HDS Scaleway v3.1 - Responsabilités client - Chiffrement des données*
