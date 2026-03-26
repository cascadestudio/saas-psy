# Monitoring - Melya

## Architecture

| Outil | Type | Cible | Alertes |
|-------|------|-------|---------|
| **UptimeRobot** | Externe (SaaS gratuit) | Uptime HTTP + expiration SSL | Email, push |
| **Netdata** | Self-hosted sur Dedibox | CPU, RAM, disque, Docker, PostgreSQL | Email |

## UptimeRobot (monitoring externe)

### Setup

1. Creer un compte sur [uptimerobot.com](https://uptimerobot.com)
2. Ajouter les monitors suivants :

#### Monitor 1 : API Health Check
- **Type** : HTTP(s) - Keyword
- **URL** : `https://api.melya.app/api/health`
- **Keyword** : `"status":"ok"`
- **Keyword Type** : Exists
- **Interval** : 5 minutes
- **Alert contacts** : Email team

#### Monitor 2 : Frontend
- **Type** : HTTP(s) - Keyword
- **URL** : `https://melya.app`
- **Keyword** : `Melya`
- **Interval** : 5 minutes

### Status page (optionnel)
UptimeRobot permet de creer une status page publique gratuite (ex: `status.melya.app`).

## Netdata (monitoring systeme)

### Installation

```bash
# Sur le serveur Dedibox (en tant que cascade)
# Copier le dossier scripts/monitoring/ sur le serveur
scp -r scripts/monitoring/ cascade@195.154.205.18:/home/cascade/

# Se connecter au serveur
ssh cascade@195.154.205.18

# Lancer l'installation
sudo bash /home/cascade/monitoring/setup-netdata.sh adrien@cascadestudio.fr
```

### Ce que le script configure

- Installation Netdata (stable channel)
- Monitoring PostgreSQL (user `netdata` avec `pg_monitor`)
- Monitoring Docker (acces au socket Docker)
- HTTP checks sur les endpoints `/api/health` (prod + staging)
- Alertes email
- Dashboard restreint a localhost (securite)
- Alertes custom (voir ci-dessous)

### Alertes configurees

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

### Acceder au dashboard

Le dashboard Netdata est restreint a localhost pour des raisons de securite. Y acceder via tunnel SSH :

```bash
ssh -L 19999:localhost:19999 cascade@195.154.205.18
# Puis ouvrir http://localhost:19999
```

### Fichiers de configuration

```
/etc/netdata/
  netdata.conf              # Config principale (bind localhost)
  health_alarm_notify.conf  # Config notifications email
  health.d/
    melya-alerts.conf       # Alertes custom Melya
  go.d/
    postgres.conf           # Monitoring PostgreSQL
    docker.conf             # Monitoring Docker
    httpcheck.conf          # Health checks API
```

### Commandes utiles

```bash
# Status Netdata
sudo systemctl status netdata

# Redemarrer apres modif config
sudo systemctl restart netdata

# Tester les alertes
sudo netdatacli test-alert

# Voir les alertes actives
curl -s http://127.0.0.1:19999/api/v1/alarms | jq '.alarms | to_entries[] | select(.value.status != "CLEAR")'

# Logs
sudo journalctl -u netdata -f
```

## Couverture des exigences MEL-69

| Exigence | Solution | Status |
|----------|----------|--------|
| Monitoring uptime API | UptimeRobot HTTP keyword check | A configurer |
| Alertes disque, RAM, CPU | Netdata + alertes custom | Script pret |
| Alertes Docker crash | Netdata httpcheck (API health) | Script pret |
| Alertes SSL expire | Certbot auto-renouvellement + email on failure | Automatique |
| Alertes PostgreSQL down | Netdata postgres collector | Script pret |
