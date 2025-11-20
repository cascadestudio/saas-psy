/**
 * Format a date to a readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a date with time
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Generate a pseudo-anonymous patient ID
 */
export function generatePatientPseudoId(
  firstName: string,
  lastName: string,
  dateOfBirth?: string,
): string {
  const hash = simpleHash(`${firstName}-${lastName}-${dateOfBirth || ''}`);
  return `PAT-${hash.substring(0, 8).toUpperCase()}`;
}

/**
 * Simple hash function (NOT for security purposes)
 */
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Calculate session expiration date (default 7 days)
 */
export function calculateExpirationDate(days: number = 7): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

/**
 * Check if a session is expired
 */
export function isSessionExpired(expiresAt: Date | string | null): boolean {
  if (!expiresAt) return false;
  const expiry = typeof expiresAt === 'string' ? new Date(expiresAt) : expiresAt;
  return expiry < new Date();
}

/**
 * Sanitize patient data for logs (remove sensitive info)
 */
export function sanitizePatientData(data: any): any {
  const sanitized = { ...data };
  delete sanitized.email;
  delete sanitized.dateOfBirth;
  return sanitized;
}

