/**
 * Fiche pratique publique d'une échelle (`/echelles/<slug>`).
 *
 * Objectif : un psy tape « PHQ-9 cotation » ou « PHQ-9 score 12 » dans Google
 * et la fiche répond à toutes ses questions, de la plus recherchée à la moins
 * recherchée. Les titres de section reprennent donc les formulations des
 * recherches (« Comment coter le PHQ-9 ? »).
 *
 * Ce qui est clinique et calculé — méthode de cotation, seuils, nombre
 * d'items, mention copyright — vient de `@melya/core` et n'est jamais
 * ressaisi ici : la fiche ne peut pas annoncer une interprétation que l'app
 * contredit. Les items eux-mêmes ne sont jamais reproduits (copyright).
 */

/**
 * Un paragraphe, ou une liste à puces. `**gras**` est rendu en gras ; aucun
 * autre balisage n'est interprété.
 */
export type Block = string | { list: string[] };

export type GuideSection = {
  /** Formulé comme la recherche du psy : « Comment administrer le PHQ-9 ? » */
  title: string;
  body: Block[];
};

/**
 * Statut « PDF source en téléchargement » de la spec (§3 de
 * `docs/scales/<échelle>.md`) : 📥 hébergeable / 🔗 lien / 🚫 non.
 */
export type OfficialQuestionnaire =
  | {
      kind: "download";
      /** Chemin sous `public/`, ex. `/questionnaires/phq-9-questionnaire-francais.pdf`. */
      file: string;
      /** Éditeur ou détenteur des droits, cité à côté du bouton. */
      publisher: string;
    }
  | { kind: "link"; url: string; publisher: string }
  | {
      kind: "none";
      /** Pourquoi on ne diffuse pas le questionnaire (droits réservés…). */
      reason: string;
    };

export type Source = {
  /** Référence au format APA. */
  citation: string;
  url?: string;
};

export type ScaleGuideContent = {
  /** `id` de l'échelle dans `@melya/core`. */
  scaleId: string;

  /** ~60 caractères : Google tronque au-delà. */
  seoTitle: string;
  /** ~155 caractères, phrase complète. */
  seoDescription: string;
  heading: string;

  /** L'essentiel en trois lignes : ce que mesure l'échelle, pour qui, à quoi elle sert. */
  essentials: string[];
  /** Faits affichés à côté de ceux calculés depuis `@melya/core`. */
  audience: string;
  administrationMode: string;

  administration: GuideSection;
  /** Affichée sous la méthode de cotation de `@melya/core`. */
  scoring: GuideSection;
  /** Affichée sous le tableau des seuils de `@melya/core`. */
  interpretation: GuideSection;
  vigilance: GuideSection;
  followUp: GuideSection;
  /** Sections propres à l'échelle (ex. « PHQ-9 ou PHQ-2 ? »). */
  extraSections?: GuideSection[];

  faq: { question: string; answer: string }[];

  questionnaire: OfficialQuestionnaire;
  frenchVersion: {
    /** Quelle version FR est retenue et pourquoi. */
    summary: string;
    /**
     * `false` affiche un avertissement : la traduction n'a pas fait l'objet
     * d'une validation psychométrique publiée.
     */
    validated: boolean;
    /** Remplace l'avertissement par défaut quand `validated` est `false`. */
    warning?: string;
  };
  sources: Source[];
  /** Référence à citer, au format APA 7. */
  apaCitation: string;

  /** `id` d'échelles proches, affichées en bas de fiche. */
  related: string[];

  /** Date de dernière mise à jour du contenu (AAAA-MM-JJ). */
  updatedAt: string;
  /**
   * Relecture clinique. À ne renseigner qu'une fois la relecture faite :
   * c'est un engagement affiché au psy, et un signal que Google vérifie sur
   * les contenus santé.
   */
  reviewedBy?: { name: string; jobTitle: string; date: string };
};
