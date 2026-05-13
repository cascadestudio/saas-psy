"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = formatDate;
exports.formatDateTime = formatDateTime;
exports.generatePatientPseudoId = generatePatientPseudoId;
exports.isValidEmail = isValidEmail;
exports.calculateExpirationDate = calculateExpirationDate;
exports.isSessionExpired = isSessionExpired;
exports.sanitizePatientData = sanitizePatientData;
/**
 * Format a date to a readable string
 */
function formatDate(date) {
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
function formatDateTime(date) {
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
function generatePatientPseudoId(firstName, lastName, dateOfBirth) {
    const hash = simpleHash(`${firstName}-${lastName}-${dateOfBirth || ''}`);
    return `PAT-${hash.substring(0, 8).toUpperCase()}`;
}
/**
 * Simple hash function (NOT for security purposes)
 */
function simpleHash(str) {
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
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
/**
 * Calculate session expiration date (default 7 days)
 */
function calculateExpirationDate(days = 7) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}
/**
 * Check if a session is expired
 */
function isSessionExpired(expiresAt) {
    if (!expiresAt)
        return false;
    const expiry = typeof expiresAt === 'string' ? new Date(expiresAt) : expiresAt;
    return expiry < new Date();
}
/**
 * Sanitize patient data for logs (remove sensitive info)
 */
function sanitizePatientData(data) {
    const sanitized = { ...data };
    delete sanitized.email;
    delete sanitized.dateOfBirth;
    return sanitized;
}
