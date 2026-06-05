import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface UpsertPersonParams {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
}

@Injectable()
export class AttioService {
  private readonly logger = new Logger(AttioService.name);
  private readonly apiKey: string | undefined;
  private readonly baseUrl = 'https://api.attio.com/v2';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('ATTIO_API_KEY');
    if (!this.apiKey) {
      this.logger.warn(
        'ATTIO_API_KEY not configured - Attio sync disabled',
      );
    }
  }

  async upsertPerson(params: UpsertPersonParams): Promise<void> {
    if (!this.apiKey) return;

    const name =
      params.firstName || params.lastName
        ? [
            {
              first_name: params.firstName ?? '',
              last_name: params.lastName ?? '',
              full_name:
                `${params.firstName ?? ''} ${params.lastName ?? ''}`.trim(),
            },
          ]
        : undefined;

    const body = {
      data: {
        values: {
          email_addresses: [{ email_address: params.email }],
          ...(name ? { name } : {}),
          // Marque l'inscription : promeut automatiquement un prospect
          // existant (matching par email) vers le statut "Inscrit".
          status: [{ option: 'Inscrit' }],
        },
      },
    };

    const res = await fetch(
      `${this.baseUrl}/objects/people/records?matching_attribute=email_addresses`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(
        `Attio upsertPerson failed (${res.status}): ${text}`,
      );
    }
  }
}
