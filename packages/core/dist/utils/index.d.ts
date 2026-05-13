/**
 * Format a date to a readable string
 */
export declare function formatDate(date: Date | string): string;
/**
 * Format a date with time
 */
export declare function formatDateTime(date: Date | string): string;
/**
 * Generate a pseudo-anonymous patient ID
 */
export declare function generatePatientPseudoId(firstName: string, lastName: string, dateOfBirth?: string): string;
/**
 * Validate email format
 */
export declare function isValidEmail(email: string): boolean;
/**
 * Calculate session expiration date (default 7 days)
 */
export declare function calculateExpirationDate(days?: number): Date;
/**
 * Check if a session is expired
 */
export declare function isSessionExpired(expiresAt: Date | string | null): boolean;
/**
 * Sanitize patient data for logs (remove sensitive info)
 */
export declare function sanitizePatientData(data: any): any;
