-- Cloudflare D1, ejecutar en el entorno seleccionado antes de activar WAITLIST_ENABLED.
CREATE TABLE IF NOT EXISTS waitlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL DEFAULT 'site',
  consent_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_waitlist_consent ON waitlist(consent_at);
