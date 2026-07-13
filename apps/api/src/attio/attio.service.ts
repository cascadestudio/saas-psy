import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface UpsertPersonParams {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  signupDate: Date;
}

/** Métriques d'usage poussées quotidiennement sur la fiche Attio du psy. */
export interface PersonActivity {
  signupDate: Date;
  /** Date de la 1re passation envoyée à un patient (moment d'activation). */
  firstScaleDate: Date | null;
  /** Acronyme de l'échelle de cette 1re passation (ex. "PHQ-9"). */
  firstScale: string | null;
  sessionsSent: number;
  sessionsCompleted: number;
  lastActivityDate: Date | null;
}

interface SyncActivityParams {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  activity: PersonActivity;
}

/** Comptes internes (équipe, tests) : jamais poussés dans le CRM. */
const INTERNAL_EMAIL_DOMAINS = ['cascadestudio.fr', 'melya.app'];

type AttioRecord = {
  values?: {
    source?: unknown[];
    type?: unknown[];
    [slug: string]: unknown;
  };
};

@Injectable()
export class AttioService {
  private readonly logger = new Logger(AttioService.name);
  private readonly apiKey: string | undefined;
  private readonly baseUrl = 'https://api.attio.com/v2';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('ATTIO_API_KEY');
    if (!this.apiKey) {
      this.logger.warn('ATTIO_API_KEY not configured - Attio sync disabled');
    }
  }

  /** Un compte interne ne doit jamais atterrir dans Attio. */
  isSyncable(email: string): boolean {
    const domain = email.split('@')[1]?.toLowerCase();
    return !!domain && !INTERNAL_EMAIL_DOMAINS.includes(domain);
  }

  async upsertPerson(params: UpsertPersonParams): Promise<void> {
    if (!this.apiKey || !this.isSyncable(params.email)) return;

    // On ne tague la source "App" que si le contact n'a pas déjà une
    // source (prospect Instagram/Clément déjà connu) : la conversion ne
    // doit pas écraser le canal d'acquisition d'origine.
    const existing = await this.fetchPerson(params.email);
    const tagAppSource =
      existing !== undefined && !existing?.values?.source?.length;

    await this.putRecord({
      email_addresses: [{ email_address: params.email }],
      ...this.nameValue(params.firstName, params.lastName),
      // Marque l'inscription : promeut automatiquement un prospect
      // existant (matching par email) vers le statut "Inscrit".
      // NB : l'attribut titré "Status" dans Attio a pour slug `type`.
      type: [{ option: 'Inscrit' }],
      ...(tagAppSource ? { source: [{ option: 'App' }] } : {}),
      signup_date: [{ value: this.formatDate(params.signupDate) }],
    });
  }

  /**
   * Pousse les métriques d'usage (job quotidien).
   *
   * Contrairement à `upsertPerson`, ce sync ne touche ni au statut ni à la
   * source d'un contact existant : ces attributs sont pilotés à la main dans
   * Attio et un passage quotidien les écraserait. Ils ne sont posés que si la
   * fiche est créée ici, cas qui n'arrive que si le push d'inscription a
   * échoué (il est non-bloquant) — le job le rattrape donc au passage.
   */
  async syncActivity(params: SyncActivityParams): Promise<void> {
    if (!this.apiKey || !this.isSyncable(params.email)) return;

    const existing = await this.fetchPerson(params.email);
    if (existing === undefined) return; // API KO : on ne tente pas d'écrire.

    const activityValues = this.activityValues(params.activity);
    if (existing && !this.hasChanged(existing, activityValues)) return;

    await this.putRecord({
      email_addresses: [{ email_address: params.email }],
      ...activityValues,
      ...(existing
        ? {}
        : {
            ...this.nameValue(params.firstName, params.lastName),
            type: [{ option: 'Inscrit' }],
          }),
    });
  }

  private activityValues(a: PersonActivity): Record<string, unknown[]> {
    // Une valeur nulle est omise plutôt qu'envoyée vide : ces champs ne font
    // que passer de "vide" à "rempli" (une 1re passation ne se dé-produit pas).
    return {
      signup_date: [{ value: this.formatDate(a.signupDate) }],
      ...(a.firstScaleDate
        ? { first_scale_date: [{ value: this.formatDate(a.firstScaleDate) }] }
        : {}),
      ...(a.firstScale ? { first_scale: [{ value: a.firstScale }] } : {}),
      sessions_sent: [{ value: a.sessionsSent }],
      sessions_completed: [{ value: a.sessionsCompleted }],
      ...(a.lastActivityDate
        ? {
            last_activity_date: [
              { value: this.formatDate(a.lastActivityDate) },
            ],
          }
        : {}),
    };
  }

  /** Évite un PUT inutile quand Attio est déjà à jour (quota API). */
  private hasChanged(
    record: AttioRecord,
    values: Record<string, unknown[]>,
  ): boolean {
    return Object.entries(values).some(([slug, next]) => {
      const current = (
        record.values?.[slug] as Array<{ value?: unknown }>
      )?.[0];
      const wanted = (next[0] as { value?: unknown })?.value;
      return this.normalize(current?.value) !== this.normalize(wanted);
    });
  }

  /**
   * Les dates reviennent d'Attio horodatées ("2026-07-13T00:00:00...Z") alors
   * qu'on envoie un jour civil : on compare sur les 10 premiers caractères.
   * Toute valeur d'un autre type est traitée comme "différente", ce qui
   * déclenche une écriture — le mauvais côté sur lequel se tromper.
   */
  private normalize(value: unknown): string | number | undefined {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return value.slice(0, 10);
    return undefined;
  }

  private nameValue(firstName?: string | null, lastName?: string | null) {
    if (!firstName && !lastName) return {};
    return {
      name: [
        {
          first_name: firstName ?? '',
          last_name: lastName ?? '',
          full_name: `${firstName ?? ''} ${lastName ?? ''}`.trim(),
        },
      ],
    };
  }

  /** Les attributs `date` d'Attio attendent un jour civil (YYYY-MM-DD). */
  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-CA', { timeZone: 'Europe/Paris' });
  }

  private async putRecord(values: Record<string, unknown>): Promise<void> {
    const res = await fetch(
      `${this.baseUrl}/objects/people/records?matching_attribute=email_addresses`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { values } }),
      },
    );

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Attio putRecord failed (${res.status}): ${text}`);
    }
  }

  /**
   * Fiche Attio du contact.
   *
   * `null` = le contact n'existe pas ; `undefined` = on n'a pas pu savoir
   * (réseau/API KO). Les appelants distinguent les deux pour ne jamais écraser
   * une valeur existante sur la foi d'une réponse manquante.
   */
  private async fetchPerson(
    email: string,
  ): Promise<AttioRecord | null | undefined> {
    try {
      const res = await fetch(`${this.baseUrl}/objects/people/records/query`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter: { email_addresses: email },
          limit: 1,
        }),
      });
      if (!res.ok) return undefined;
      const json = (await res.json()) as { data?: AttioRecord[] };
      return json.data?.[0] ?? null;
    } catch {
      return undefined;
    }
  }
}
