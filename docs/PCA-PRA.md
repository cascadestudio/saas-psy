# Plan de Continuité et de Reprise d'Activité (PCA/PRA)

> **Application** : Melya - Plateforme d'échelles psychométriques
> **Responsable** : Adrien Lapasset - adrien@cascadestudio.fr - 06 89 56 67 89
> **Version** : 1.0 - Mars 2026
> **Prochaine révision** : Septembre 2026

---

## 1. Périmètre

| Composant | Hébergement | Données de santé |
|-----------|-------------|------------------|
| API NestJS | Dedibox HDS (195.154.205.18) | Oui |
| PostgreSQL 16 | Dedibox HDS (localhost:5432) | Oui (chiffrées AES-256-GCM) |
| Frontend Next.js | Vercel | Non |
| Backups | Hetzner Storage Box (SFTP) | Oui (chiffrées) |

---

## 2. Objectifs de reprise

| Métrique | Objectif | Justification |
|----------|----------|---------------|
| **RPO** (perte de données max) | 24h | Backups quotidiens |
| **RTO** (temps de reprise max) | 4h | Provisionnement serveur + restauration |

---

## 3. Contacts d'urgence

| Rôle | Contact | Téléphone |
|------|---------|-----------|
| Responsable technique | Adrien Lapasset | 06 89 56 67 89 |
| Scaleway - Commercial HDS | Elif Kaya (hds-contact@scaleway.com) | 06 44 60 84 97 |
| Scaleway - Sécurité | security@scaleway.com | - |
| Scaleway - DPO | dpo@iliad.fr | - |

---

## 4. Plan de Continuité d'Activité (PCA)

### 4.1 Classification des incidents

| Niveau | Description | Exemple | Impact |
|--------|-------------|---------|--------|
| P1 - Critique | Service totalement indisponible | Serveur HS, DB corrompue | Aucun accès utilisateur |
| P2 - Majeur | Fonctionnalité clé dégradée | API lente, erreurs intermittentes | Usage dégradé |
| P3 - Mineur | Impact limité | Emails non envoyés, monitoring down | Service principal OK |

### 4.2 Détection

| Outil | Ce qu'il détecte | Alerte |
|-------|-------------------|--------|
| UptimeRobot | API down, SSL expiré | Email, push (< 5 min) |
| Netdata | CPU, RAM, disque, PostgreSQL, Docker | Email |

### 4.3 Procédure en cas de panne serveur (P1)

1. **Diagnostic immédiat** (< 15 min)
   ```bash
   # Tenter connexion SSH
   ssh cascade@195.154.205.18

   # Si SSH OK, vérifier les services
   sudo systemctl status postgresql
   docker ps
   sudo systemctl status nginx
   ```

2. **Si le serveur répond** - Relancer les services :
   ```bash
   # PostgreSQL
   sudo systemctl restart postgresql

   # Container API
   docker restart melya-api-prod

   # Nginx
   sudo systemctl restart nginx

   # Vérifier
   curl -f http://localhost:3002/api/health
   ```

3. **Si le serveur ne répond pas** :
   - Ouvrir un ticket Scaleway (console.scaleway.com ou hds-contact@scaleway.com)
   - GTI contractuelle : 2h (heures ouvrées)
   - Si délai > 2h → déclencher le PRA (section 5)

### 4.4 Procédure en cas de problème PostgreSQL (P1/P2)

```bash
# Vérifier l'état
sudo systemctl status postgresql
sudo -u postgres pg_isready

# Vérifier les logs
sudo tail -100 /var/log/postgresql/postgresql-16-main.log

# Vérifier l'espace disque (cause fréquente)
df -h

# Redémarrer si nécessaire
sudo systemctl restart postgresql

# Vérifier intégrité
sudo -u postgres psql -d melya_prod -c "SELECT count(*) FROM \"User\";"
```

### 4.5 Procédure en cas de problème Docker/API (P2)

```bash
# Logs du container
docker logs --tail 100 melya-api-prod

# Redémarrer
docker restart melya-api-prod

# Si le container ne démarre pas, redéployer
docker stop melya-api-prod && docker rm melya-api-prod
# Relancer le workflow GitHub Actions (push sur main ou re-run manuel)
```

### 4.6 Communication aux utilisateurs

| Étape | Action | Délai |
|-------|--------|-------|
| Détection | Évaluer la gravité | Immédiat |
| P1 > 15 min | Bannière sur melya.app (Vercel, indépendant du serveur) | < 30 min |
| P1 > 1h | Email aux utilisateurs actifs | < 1h |
| Résolution | Notification de rétablissement | Immédiat |

Le frontend sur Vercel reste accessible même si l'API est down. Afficher un message d'indisponibilité temporaire côté frontend quand l'API ne répond pas.

---

## 5. Plan de Reprise d'Activité (PRA)

### 5.1 Prérequis

Avant de pouvoir exécuter le PRA, s'assurer d'avoir accès à :

- [ ] Compte Scaleway (console.scaleway.com)
- [ ] Compte GitHub (repo cascadestudio/saas-psy)
- [ ] Accès Hetzner Storage Box (identifiants SFTP)
- [ ] Secrets de production (stockés dans GitHub Actions Secrets) :
  - `DATABASE_URL_PROD` / `DATABASE_URL_MIGRATE`
  - `JWT_SECRET_PROD`
  - `ENCRYPTION_KEY_PROD`
  - `DEPLOY_SSH_KEY`

> **CRITIQUE** : Sans `ENCRYPTION_KEY_PROD`, les données chiffrées en base sont irrécupérables.
> S'assurer que cette clé est sauvegardée dans un lieu sécurisé distinct (coffre-fort numérique).

### 5.2 Étape 1 - Provisionner un nouveau serveur (~ 1h)

1. **Commander un Dedibox** sur console.scaleway.com
   - Gamme : Start-9-M (ou équivalent)
   - Datacenter : DC2, DC3 ou DC5 (France, éligible HDS)
   - OS : Ubuntu 24.04 LTS

2. **Sécuriser le serveur**
   ```bash
   # Créer l'utilisateur
   adduser cascade
   usermod -aG sudo cascade
   echo "cascade ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/cascade

   # SSH : clé uniquement
   mkdir -p /home/cascade/.ssh
   # Copier la clé publique dans authorized_keys
   chmod 700 /home/cascade/.ssh
   chmod 600 /home/cascade/.ssh/authorized_keys

   # Désactiver root login et password auth
   sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
   sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
   systemctl restart sshd

   # Firewall
   ufw allow 22/tcp
   ufw allow 80/tcp
   ufw allow 443/tcp
   ufw enable
   ```

3. **Installer les dépendances**
   ```bash
   # PostgreSQL 16
   sudo apt update
   sudo apt install -y postgresql-16 postgresql-client-16

   # Docker
   curl -fsSL https://get.docker.com | sh
   sudo usermod -aG docker cascade

   # Nginx + Certbot
   sudo apt install -y nginx certbot python3-certbot-nginx
   ```

4. **Configurer PostgreSQL**
   ```bash
   # Créer les users et la base
   sudo -u postgres psql <<SQL
   CREATE USER melya_admin WITH PASSWORD '<MOT_DE_PASSE_MIGRATE>';
   CREATE USER melya WITH PASSWORD '<MOT_DE_PASSE_APP>';
   CREATE DATABASE melya_prod OWNER melya_admin;
   GRANT CONNECT ON DATABASE melya_prod TO melya;
   SQL
   ```

5. **Configurer Nginx + SSL**
   ```bash
   # Mettre à jour le DNS : api.melya.app → nouvelle IP
   # Puis :
   sudo certbot --nginx -d api.melya.app
   ```

### 5.3 Étape 2 - Restaurer les données (~ 1-2h)

1. **Récupérer le dernier backup depuis Hetzner Storage Box**
   ```bash
   # Se connecter en SFTP et télécharger le dernier dump
   sftp <user>@<hetzner-host>
   # Identifier et télécharger le backup le plus récent
   ```

2. **Déchiffrer le backup**
   ```bash
   # Déchiffrer avec la méthode utilisée (GPG/age/openssl)
   # Exemple avec GPG :
   gpg --decrypt backup-YYYY-MM-DD.sql.gpg > backup.sql
   ```

3. **Restaurer dans PostgreSQL**
   ```bash
   sudo -u postgres psql melya_prod < backup.sql

   # Attribuer les droits DML à l'user app
   sudo -u postgres psql -d melya_prod -c "
     GRANT USAGE ON SCHEMA public TO melya;
     GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO melya;
     GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO melya;
     ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO melya;
     ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO melya;
   "
   ```

4. **Vérifier l'intégrité**
   ```bash
   sudo -u postgres psql -d melya_prod -c "SELECT count(*) FROM \"User\";"
   sudo -u postgres psql -d melya_prod -c "SELECT count(*) FROM \"Patient\";"
   sudo -u postgres psql -d melya_prod -c "SELECT count(*) FROM \"Session\";"
   ```

### 5.4 Étape 3 - Redéployer l'application (~ 30 min)

1. **Mettre à jour les GitHub Secrets** avec la nouvelle IP et les nouvelles credentials :
   - `DEPLOY_HOST` → nouvelle IP
   - `DEPLOY_SSH_KEY` → nouvelle clé deploy
   - `DATABASE_URL_PROD` → nouveau password si changé
   - `DATABASE_URL_MIGRATE` → nouveau password si changé

2. **Ajouter la clé deploy sur le serveur**
   ```bash
   # Générer ou copier la deploy key
   mkdir -p /home/cascade/.ssh
   # Ajouter la clé dans /home/cascade/.ssh/deploy_key
   chmod 600 /home/cascade/.ssh/deploy_key
   ```

3. **Déclencher le déploiement**
   - Push sur `main` ou re-run du workflow `Deploy API to Dedibox` dans GitHub Actions
   - Le workflow build l'image Docker, la copie sur le serveur, lance les migrations et démarre le container

4. **Vérifier**
   ```bash
   curl -f https://api.melya.app/api/health
   docker logs melya-api-prod --tail 20
   ```

### 5.5 Étape 4 - Post-reprise

- [ ] Mettre à jour le DNS si l'IP a changé (GoDaddy : `api.melya.app`)
- [ ] Reconfigurer le monitoring (Netdata + UptimeRobot avec nouvelle IP)
- [ ] Reconfigurer les backups automatiques vers Hetzner
- [ ] Reconfigurer les certificats SSL (certbot auto-renewal)
- [ ] Notifier les utilisateurs du rétablissement
- [ ] Documenter l'incident (cause, timeline, actions, leçons)

---

## 6. Checklist de reprise

À utiliser comme check-list lors d'un exercice PRA ou d'une reprise réelle :

| # | Action | Vérifié |
|---|--------|---------|
| 1 | Nouveau serveur provisionné et sécurisé | [ ] |
| 2 | PostgreSQL installé et configuré | [ ] |
| 3 | Docker installé | [ ] |
| 4 | Backup récupéré depuis Hetzner | [ ] |
| 5 | Backup déchiffré et restauré | [ ] |
| 6 | Intégrité des données vérifiée (counts) | [ ] |
| 7 | DNS mis à jour | [ ] |
| 8 | SSL configuré | [ ] |
| 9 | Nginx configuré | [ ] |
| 10 | GitHub Secrets mis à jour | [ ] |
| 11 | Déploiement API réussi | [ ] |
| 12 | Health check OK (`/api/health`) | [ ] |
| 13 | Login utilisateur fonctionnel | [ ] |
| 14 | Monitoring reconfiguré | [ ] |
| 15 | Backups automatiques reconfiguré | [ ] |
| 16 | Utilisateurs notifiés | [ ] |

---

## 7. Tests du PRA

| Test | Fréquence | Dernier test |
|------|-----------|--------------|
| Restauration d'un backup sur environnement de test | Semestriel | - |
| Vérification accès Hetzner Storage Box | Trimestriel | - |
| Vérification des secrets (ENCRYPTION_KEY accessible) | Trimestriel | - |
| Exercice PRA complet (nouveau serveur) | Annuel | - |

---

## 8. Historique des révisions

| Date | Version | Auteur | Modifications |
|------|---------|--------|---------------|
| 2026-03-26 | 1.0 | Adrien Lapasset | Création initiale |
