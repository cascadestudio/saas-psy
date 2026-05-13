# Monitoring - Melya

## Architecture

| Outil | Type | Cible | Notif |
|-------|------|-------|-------|
| **UptimeRobot** | Externe (SaaS gratuit) | Uptime HTTP + expiration SSL | Email, push mobile |
| **Netdata** | Self-hosted sur Dedibox | CPU, RAM, disque, Docker, PostgreSQL, API health | Discord webhook |

## UptimeRobot (monitoring externe)

Deux monitors HTTP keyword, interval 5 min :

| Monitor | URL | Keyword |
|---------|-----|---------|
| API | `https://api.melya.app/api/health` | `"status":"ok"` |
| Frontend | `https://melya.app` | `Melya` |

Status page publique optionnelle (`status.melya.app`) configurable depuis UptimeRobot.

## Netdata (monitoring système)

### Installation

```bash
scp -r scripts/monitoring/ cascade@195.154.205.18:/home/cascade/
ssh cascade@195.154.205.18
sudo bash /home/cascade/monitoring/setup-netdata.sh adrien@cascadestudio.fr
```

### Ce que le script configure

- Installation Netdata (stable channel)
- Monitoring PostgreSQL (user `netdata` avec `pg_monitor`)
- Monitoring Docker (accès au socket Docker)
- HTTP checks sur les endpoints `/api/health` (prod + staging)
- Dashboard restreint à localhost (sécurité — pas d'exposition publique)
- Alertes custom (voir ci-dessous)

### Alertes configurées

| Alerte | Warning | Critical |
|--------|---------|----------|
| Espace disque | < 20 GiB | < 10 GiB |
| Disque % | > 80% | > 90% |
| RAM | > 85% | > 95% |
| CPU (5 min) | > 85% | > 95% |
| CPU soutenu (15 min) | > 75% | > 90% |
| API response time | > 2000ms | > 5000ms |
| API down | - | health check fail |
| PostgreSQL connexions | > 70% | > 90% |
| PostgreSQL dead tuples | > 100k | - |

### Notifications : Discord + Email

Double canal d'alerte :
- **Discord webhook** vers le canal `#alertes` du serveur Cascade Studio (canal principal, instantané)
- **Email** via SMTP Infomaniak vers `adrien@cascadestudio.fr` (backup)

Config dans `/etc/netdata/health_alarm_notify.conf` :

```bash
SEND_EMAIL="YES"
DEFAULT_RECIPIENT_EMAIL="adrien@cascadestudio.fr"
EMAIL_SENDER="contact@cascadestudio.fr"   # doit matcher le compte SMTP authentifié

SEND_DISCORD="YES"
DISCORD_WEBHOOK_URL="..."                 # secret, ne pas committer
DEFAULT_RECIPIENT_DISCORD="alerts"
role_recipients_discord[sysadmin]="alerts"
```

#### Notes techniques sur l'email

- **Pas de pare-feu Scaleway en amont** (confirmé par leur support, ticket 03/2026). Le filtrage outbound est entièrement à la charge du serveur — UFW est en `ACCEPT` en sortie.
- **IPv6 vers `mail.infomaniak.com` est cassé** (100% packet loss sur les AAAA records). msmtp tentait IPv6 d'abord et timeout. Contournement appliqué dans `/etc/hosts` du serveur :
  ```
  83.166.143.44 mail.infomaniak.com
  ```
  À mettre à jour si Infomaniak change d'IP. Investiguer la connectivité IPv6 outbound si besoin pour autre chose.
- **`EMAIL_SENDER` doit être une adresse autorisée du compte Infomaniak** (`contact@cascadestudio.fr`). Sinon Infomaniak retourne `550 5.7.1 Sender mismatch`.
- **Permissions** : l'utilisateur `netdata` doit être dans le groupe `msmtp` pour lire `/etc/msmtprc` (mode 640 root:msmtp). Vérifier avec `groups netdata`.

### Accéder au dashboard

Le dashboard Netdata est restreint à localhost. Y accéder via tunnel SSH :

```bash
ssh -L 19999:localhost:19999 cascade@195.154.205.18
# puis ouvrir http://localhost:19999
```

Le vhost public `monitor.melya.app` a été désactivé pour réduire la surface d'attaque. La conf reste dans `/etc/nginx/sites-available/monitor.melya.app` et peut être réactivée avec `ln -s` puis `nginx -s reload`.

### Fichiers de configuration

```
/etc/netdata/
  netdata.conf              # Config principale (bind localhost)
  health_alarm_notify.conf  # Webhook Discord
  health.d/
    melya-alerts.conf       # Alertes custom Melya
  go.d/
    postgres.conf           # Monitoring PostgreSQL
    docker.conf             # Monitoring Docker
    httpcheck.conf          # Health checks API (prod + staging)
```

### Commandes utiles

```bash
# Status Netdata
sudo systemctl status netdata

# Redémarrer après modif config
sudo systemctl restart netdata

# Tester l'envoi d'alerte (3 messages : WARNING, CRITICAL, CLEAR)
sudo -u netdata /usr/libexec/netdata/plugins.d/alarm-notify.sh test

# Voir les alertes actives (filtrer celles non-CLEAR)
curl -s http://127.0.0.1:19999/api/v1/alarms | \
  jq '.alarms | to_entries[] | select(.value.status != "CLEAR") | {name: .key, status: .value.status}'

# Logs
sudo journalctl -u netdata -f
```

### Tester sur un vrai problème

Pour valider la chaîne complète (détection → alerte) au-delà du test de notification :

```bash
# Stopper le container API staging — déclenche httpcheck WARNING en ~1 min
ssh cascade@195.154.205.18 "docker stop melya-api-staging"
# Attendre l'alerte Discord, puis relancer
ssh cascade@195.154.205.18 "docker start melya-api-staging"
# La notif CLEAR arrive ~3-5 min plus tard (le temps que la fenêtre glissante
# de Netdata ne contienne plus que des checks réussis)
```

Pour tester l'alerte disque (réversible) :

```bash
ssh cascade@195.154.205.18 "fallocate -l 8G /tmp/fake_fill_test"
# attendre ~1 min, vérifier alerte Discord
ssh cascade@195.154.205.18 "rm /tmp/fake_fill_test"
```

## Couverture des exigences MEL-69

| Exigence | Solution | Status |
|----------|----------|--------|
| Monitoring uptime API | UptimeRobot HTTP keyword check | ✅ Configuré |
| Alertes disque, RAM, CPU | Netdata + alertes custom → Discord | ✅ Configuré |
| Alertes Docker crash | Netdata httpcheck (API health) | ✅ Configuré |
| Alertes SSL expire | Certbot auto-renouvellement | ✅ Automatique |
| Alertes PostgreSQL down | Netdata postgres collector | ✅ Configuré |
| Alertes email | SMTP Infomaniak (IPv4 forcé via `/etc/hosts`) | ✅ Configuré |
