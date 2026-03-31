import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SEPARATOR = '.';

@Injectable()
export class EncryptionService {
  private readonly logger = new Logger(EncryptionService.name);
  private readonly key: Buffer;

  constructor(private configService: ConfigService) {
    const keyHex = this.configService.get<string>('ENCRYPTION_KEY');
    if (!keyHex || keyHex.length !== 64) {
      throw new Error(
        'ENCRYPTION_KEY must be 64 hex characters (32 bytes). Generate one with: openssl rand -hex 32',
      );
    }
    this.key = Buffer.from(keyHex, 'hex');
    this.logger.log('Encryption service initialized');
  }

  /**
   * Encrypt a plaintext string.
   * Returns format: base64(iv).base64(authTag).base64(ciphertext)
   */
  encrypt(plaintext: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, this.key, iv);

    let ciphertext = cipher.update(plaintext, 'utf-8', 'base64');
    ciphertext += cipher.final('base64');
    const tag = cipher.getAuthTag();

    return [
      iv.toString('base64'),
      tag.toString('base64'),
      ciphertext,
    ].join(SEPARATOR);
  }

  /**
   * Decrypt an encrypted string (iv.tag.ciphertext format).
   */
  decrypt(encrypted: string): string {
    const parts = encrypted.split(SEPARATOR);
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted format');
    }

    const [ivB64, tagB64, ciphertext] = parts;
    const iv = Buffer.from(ivB64, 'base64');
    const tag = Buffer.from(tagB64, 'base64');

    const decipher = crypto.createDecipheriv(ALGORITHM, this.key, iv);
    decipher.setAuthTag(tag);

    let plaintext = decipher.update(ciphertext, 'base64', 'utf-8');
    plaintext += decipher.final('utf-8');
    return plaintext;
  }

  /**
   * Check if a value looks like an encrypted string (iv.tag.ciphertext).
   */
  isEncrypted(value: string): boolean {
    const parts = value.split(SEPARATOR);
    if (parts.length !== 3) return false;
    // Each part should be valid base64 and non-empty
    return parts.every((p) => p.length > 0 && /^[A-Za-z0-9+/=]+$/.test(p));
  }

  /**
   * Encrypt a string field, handling null/undefined.
   */
  encryptField(value: string | null | undefined): string | null {
    if (value == null) return null;
    if (value === '') return '';
    return this.encrypt(value);
  }

  /**
   * Decrypt a string field, handling null/undefined and unencrypted values
   * (backward compatibility with data stored before encryption was enabled).
   */
  decryptField(value: string | null | undefined): string | null {
    if (value == null) return null;
    if (!this.isEncrypted(value)) return value;
    try {
      return this.decrypt(value);
    } catch {
      // If decryption fails, return original value (pre-encryption data)
      this.logger.warn('Failed to decrypt field, returning raw value');
      return value;
    }
  }

  /**
   * Encrypt a JSON-serializable value as an encrypted string.
   */
  encryptJson(value: any): string | null {
    if (value == null) return null;
    return this.encrypt(JSON.stringify(value));
  }

  /**
   * Decrypt an encrypted string back to a parsed JSON value.
   * Handles both encrypted and unencrypted (pre-migration) JSON strings.
   */
  decryptJson(value: string | null | undefined): any {
    if (value == null) return null;

    let raw: string;
    if (this.isEncrypted(value)) {
      try {
        raw = this.decrypt(value);
      } catch {
        this.logger.warn('Failed to decrypt JSON field, trying raw parse');
        raw = value;
      }
    } else {
      raw = value;
    }

    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }
}
