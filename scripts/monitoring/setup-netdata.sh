#!/usr/bin/env bash
# ============================================================================
# Netdata installation & configuration for Melya Dedibox (HDS)
# Run as: sudo bash setup-netdata.sh
# ============================================================================
set -euo pipefail

ALERT_EMAIL="${1:-adrien@cascadestudio.fr}"

echo "==> Installing Netdata..."
curl -fsSL https://get.netdata.cloud/kickstart.sh > /tmp/netdata-kickstart.sh
bash /tmp/netdata-kickstart.sh --stable-channel --dont-wait

echo "==> Waiting for Netdata to start..."
sleep 5
systemctl enable netdata
systemctl start netdata

# ---------------------------------------------------------------------------
# Enable PostgreSQL monitoring
# ---------------------------------------------------------------------------
echo "==> Configuring PostgreSQL monitoring..."

# Create a read-only PostgreSQL user for Netdata
sudo -u postgres psql -c "
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'netdata') THEN
    CREATE ROLE netdata LOGIN PASSWORD 'netdata_monitor';
  END IF;
END
\$\$;
GRANT pg_monitor TO netdata;
" 2>/dev/null || echo "Warning: Could not create PostgreSQL user (may already exist)"

# Configure the PostgreSQL collector
mkdir -p /etc/netdata/go.d
cat > /etc/netdata/go.d/postgres.conf <<'PGCONF'
jobs:
  - name: melya_prod
    dsn: "postgresql://netdata:netdata_monitor@localhost:5432/melya_prod?sslmode=require"
  - name: melya_staging
    dsn: "postgresql://netdata:netdata_monitor@localhost:5432/melya_staging?sslmode=require"
PGCONF

# ---------------------------------------------------------------------------
# Enable Docker monitoring
# ---------------------------------------------------------------------------
echo "==> Configuring Docker monitoring..."

# Add netdata user to docker group for container metrics
usermod -aG docker netdata 2>/dev/null || true

# Docker collector is enabled by default, but ensure the config exists
cat > /etc/netdata/go.d/docker.conf <<'DOCKERCONF'
jobs:
  - name: local
    address: unix:///var/run/docker.sock
DOCKERCONF

# ---------------------------------------------------------------------------
# Configure email notifications
# ---------------------------------------------------------------------------
echo "==> Configuring email alerts to ${ALERT_EMAIL}..."

# health_alarm_notify.conf - email notifications
cat > /etc/netdata/health_alarm_notify.conf <<NOTIFYCONF
# Email notifications
SEND_EMAIL="YES"
DEFAULT_RECIPIENT_EMAIL="${ALERT_EMAIL}"
EMAIL_SENDER="netdata@melya.app"

# Disable other notification methods
SEND_SLACK="NO"
SEND_DISCORD="NO"
SEND_TELEGRAM="NO"
SEND_PUSHOVER="NO"
SEND_PAGERDUTY="NO"
SEND_OPSGENIE="NO"
NOTIFYCONF

# ---------------------------------------------------------------------------
# Restrict Netdata access to localhost only (security)
# ---------------------------------------------------------------------------
echo "==> Restricting Netdata dashboard to localhost..."

cat > /etc/netdata/netdata.conf <<'NDCONF'
[web]
    bind to = 127.0.0.1
    default port = 19999

[plugins]
    cgroups = yes
    proc = yes
    go.d = yes
NDCONF

# ---------------------------------------------------------------------------
# Install custom alert configurations
# ---------------------------------------------------------------------------
echo "==> Installing custom alert configurations..."

# Copy custom health configs (run this after placing the files)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "${SCRIPT_DIR}/health.d/melya-alerts.conf" ]; then
    mkdir -p /etc/netdata/health.d
    cp "${SCRIPT_DIR}/health.d/melya-alerts.conf" /etc/netdata/health.d/
    echo "    Custom alerts installed."
else
    echo "    Warning: health.d/melya-alerts.conf not found. Skipping custom alerts."
fi

# Copy HTTP check config for API health monitoring
if [ -f "${SCRIPT_DIR}/go.d/httpcheck.conf" ]; then
    mkdir -p /etc/netdata/go.d
    cp "${SCRIPT_DIR}/go.d/httpcheck.conf" /etc/netdata/go.d/
    echo "    HTTP check config installed."
else
    echo "    Warning: go.d/httpcheck.conf not found. Skipping HTTP checks."
fi

# ---------------------------------------------------------------------------
# Restart Netdata to apply all configuration
# ---------------------------------------------------------------------------
echo "==> Restarting Netdata..."
systemctl restart netdata

# ---------------------------------------------------------------------------
# Verify
# ---------------------------------------------------------------------------
echo "==> Verifying installation..."
sleep 3

if systemctl is-active --quiet netdata; then
    echo "OK: Netdata is running"
else
    echo "ERROR: Netdata failed to start"
    exit 1
fi

if curl -sf http://127.0.0.1:19999/api/v1/info > /dev/null 2>&1; then
    echo "OK: Netdata API responding"
else
    echo "WARNING: Netdata API not responding yet (may need a moment)"
fi

echo ""
echo "============================================"
echo "  Netdata installed and configured!"
echo "============================================"
echo ""
echo "  Dashboard: http://127.0.0.1:19999"
echo "  (accessible via SSH tunnel: ssh -L 19999:localhost:19999 cascade@195.154.205.18)"
echo ""
echo "  Alerts sent to: ${ALERT_EMAIL}"
echo ""
echo "  Next steps:"
echo "  - Set up UptimeRobot for external HTTP + SSL monitoring"
echo "  - Test alerts: netdatacli test-alert"
echo ""
