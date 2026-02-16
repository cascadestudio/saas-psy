/**
 * Migration script: encrypt existing plaintext data in the database.
 *
 * This script reads all patients and sessions, detects unencrypted fields,
 * encrypts them, and writes back the encrypted values.
 *
 * Safe to run multiple times — skips already-encrypted data.
 *
 * Usage:
 *   cd apps/api
 *   npx ts-node scripts/encrypt-existing-data.ts
 *
 * Requires ENCRYPTION_KEY and DATABASE_URL in .env
 */

import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SEPARATOR = '.';

// --- Encryption helpers (standalone, no NestJS dependency) ---

function getKey(): Buffer {
  const keyHex = process.env.ENCRYPTION_KEY;
  if (!keyHex || keyHex.length !== 64) {
    throw new Error(
      'ENCRYPTION_KEY must be 64 hex characters. Generate with: openssl rand -hex 32',
    );
  }
  return Buffer.from(keyHex, 'hex');
}

function encrypt(plaintext: string, key: Buffer): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let ciphertext = cipher.update(plaintext, 'utf-8', 'base64');
  ciphertext += cipher.final('base64');
  const tag = cipher.getAuthTag();
  return [iv.toString('base64'), tag.toString('base64'), ciphertext].join(
    SEPARATOR,
  );
}

function isEncrypted(value: string): boolean {
  const parts = value.split(SEPARATOR);
  if (parts.length !== 3) return false;
  return parts.every((p) => p.length > 0 && /^[A-Za-z0-9+/=]+$/.test(p));
}

// --- Main ---

async function main() {
  const key = getKey();
  const prisma = new PrismaClient();

  try {
    await prisma.$connect();
    console.log('Connected to database\n');

    // --- Encrypt Patients ---
    const patients = await prisma.patient.findMany();
    console.log(`Found ${patients.length} patients`);

    let patientsEncrypted = 0;
    for (const patient of patients) {
      const updates: Record<string, string> = {};

      if (patient.firstName && !isEncrypted(patient.firstName)) {
        updates.firstName = encrypt(patient.firstName, key);
      }
      if (patient.lastName && !isEncrypted(patient.lastName)) {
        updates.lastName = encrypt(patient.lastName, key);
      }
      if (patient.notes && !isEncrypted(patient.notes)) {
        updates.notes = encrypt(patient.notes, key);
      }

      if (Object.keys(updates).length > 0) {
        await prisma.patient.update({
          where: { id: patient.id },
          data: updates,
        });
        patientsEncrypted++;
      }
    }
    console.log(`  Encrypted: ${patientsEncrypted} patients`);
    console.log(`  Skipped (already encrypted): ${patients.length - patientsEncrypted}\n`);

    // --- Encrypt Sessions ---
    const sessions = await prisma.session.findMany();
    console.log(`Found ${sessions.length} sessions`);

    let sessionsEncrypted = 0;
    for (const session of sessions) {
      const updates: Record<string, string> = {};

      // responses and score are now String? (were Json?, migrated to TEXT)
      // After the Prisma migration, existing JSON data is stored as a text string like '{"q1": 5}'
      if (session.responses && !isEncrypted(session.responses)) {
        updates.responses = encrypt(session.responses, key);
      }
      if (session.score && !isEncrypted(session.score)) {
        updates.score = encrypt(session.score, key);
      }
      if (session.interpretation && !isEncrypted(session.interpretation)) {
        updates.interpretation = encrypt(session.interpretation, key);
      }
      if (session.patientComments && !isEncrypted(session.patientComments)) {
        updates.patientComments = encrypt(session.patientComments, key);
      }

      if (Object.keys(updates).length > 0) {
        await prisma.session.update({
          where: { id: session.id },
          data: updates,
        });
        sessionsEncrypted++;
      }
    }
    console.log(`  Encrypted: ${sessionsEncrypted} sessions`);
    console.log(`  Skipped (already encrypted): ${sessions.length - sessionsEncrypted}\n`);

    console.log('Migration complete!');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
