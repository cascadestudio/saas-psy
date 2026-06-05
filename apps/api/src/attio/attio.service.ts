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

    // On ne tague la source "App" que si le contact n'a pas déjà une
    // source (prospect Instagram/Clément déjà connu) : la conversion ne
    // doit pas écraser le canal d'acquisition d'origine.
    const tagAppSource = await this.shouldTagAppSource(params.email);

    const body = {
      data: {
        values: {
          email_addresses: [{ email_address: params.email }],
          ...(name ? { name } : {}),
          // Marque l'inscription : promeut automatiquement un prospect
          // existant (matching par email) vers le statut "Inscrit".
          // NB : l'attribut titré "Status" dans Attio a pour slug `type`.
          type: [{ option: 'Inscrit' }],
          ...(tagAppSource ? { source: [{ option: 'App' }] } : {}),
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

  /**
   * Retourne true si l'on peut taguer la source "App" : contact inexistant
   * ou sans source. En cas de doute (erreur réseau/API), retourne false pour
   * ne jamais écraser une source d'acquisition existante.
   */
  private async shouldTagAppSource(email: string): Promise<boolean> {
    try {
      const res = await fetch(
        `${this.baseUrl}/objects/people/records/query`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filter: { email_addresses: email },
            limit: 1,
          }),
        },
      );
      if (!res.ok) return false;
      const json = (await res.json()) as {
        data?: Array<{ values?: { source?: unknown[] } }>;
      };
      const record = json.data?.[0];
      return !record || !record.values?.source?.length;
    } catch {
      return false;
    }
  }
}
