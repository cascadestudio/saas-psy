# Test spec — QAP (Questionnaire d'attitude face aux problèmes)

<!--
Voir _TEMPLATE.md pour les règles projet.
Fiche rédigée et implémentée par Claude en autonomie (lot du 11/10/2026).
Arbitrages et niveaux de confiance en §10, pour relecture par Clément.
-->

---

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | QAP |
| **Nom complet (FR)** | Questionnaire d'attitude face aux problèmes (titre de la publication de validation ; le PDF source ne porte que le sigle) |
| **Nom complet (langue originale)** | Original francophone ; équivalent anglais : Negative Problem Orientation Questionnaire (NPOQ, Robichaud & Dugas 2005) |
| **Thème principal** | Anxiété généralisée |
| **Sous-thèmes / tags** | orientation négative face aux problèmes, TAG, modèle de Dugas |
| **Nombre d'items** | 12 (aucun inversé) |
| **Durée estimée de passation** | 3-5 min (estimation Melya, cf. §10) |
| **Public cible** | Adultes |
| **Mode d'administration** | auto |
| **Description praticien (bibliothèque)** | Questionnaire de 12 items évaluant l'attitude négative face aux problèmes de la vie quotidienne. |
| **Description patient (portail)** | AUCUNE — règle projet. |

---

## 2. Sources et traçabilité

### Source primaire (items, consigne, réponses, cotation)

- **Type** : formulaire officiel du laboratoire des auteurs (UQO, équipe de M. J. Dugas), 2 pages d'items + 1 page « Instructions pour la cotation ».
- **Référence** : *QAP*, uqo.ca (dossier « anxiété ») ; PDF « Dugas Lab », 29/05/2013. Pied de page : « Gosselin, P., Pelletier O., & Ladouceur, R. (2001, juillet). Affiche présentée au congrès mondial des thérapies comportementales et cognitives, Vancouver ».
- **URL** : https://uqo.ca/sites/default/files/fichiers-uqo/anxiete/qap.pdf
- **Fichier de portage** : `docs/scales/qap/QAP_UQO.pdf`
- **Date de consultation** : 11/10/2026

### Exception de sourcing — autorité unique justifiée

Même situation que l'ÉII, la QIA et le PSI-II : formulaire et cotation diffusés par le laboratoire d'un co-auteur ; original francophone, pas de traduction à recouper. Aucune seconde source indépendante reproduisant les 12 items n'a été trouvée.

### Publication de validation

- Gosselin, P., Ladouceur, R., & Pelletier, O. (2005). Évaluation de l'attitude d'un individu face aux différents problèmes de vie : le Questionnaire d'attitude face aux problèmes (QAP). *Journal de thérapie comportementale et cognitive*, 15(4), 141-153. **Texte intégral non consulté** (sur abonnement).

### Divergences constatées entre sources

Aucune (source unique). Comparaison Mentaal : §10, « Recette ».

### Version française retenue

Original francophone (Québec), seule version française.

---

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | zone grise ✉️ — diffusé publiquement par le laboratoire des auteurs, sans phrase de licence (même statut que l'ÉII) |
| **Détenteur des droits** | Gosselin, Ladouceur & Pelletier (2005) |
| **Mention obligatoire à afficher** | « Questionnaire d'attitude face aux problèmes (QAP) — Gosselin, Ladouceur & Pelletier (2005), Journal de thérapie comportementale et cognitive, 15(4), 141-153. Instrument original francophone. » |
| **Restrictions d'usage commercial** | Non mentionnées (✉️, contact groupé laboratoire Dugas, cf. MEL-351) |
| **Décision Melya** | go sous réserve |

---

## 4. Structure de l'échelle

### Consigne officielle

> _« Les gens peuvent réagir de différentes façons lorsqu'ils font face à des problèmes de la vie quotidienne (ex : problèmes de santé, disputes, manques de temps, etc.). Veuillez utiliser l'échelle ci-dessous pour exprimer jusqu'à quel point chacun des énoncés suivants correspond à votre façon de réagir ou de penser lorsque vous êtes confronté(e) à un problème. »_

**Source** : source primaire, page 1, sans la dernière phrase « Encerclez le chiffre qui correspond à votre choix. » (adaptation du support, §10).

### Comportement UX de la consigne

| Champ | Valeur |
| --- | --- |
| **Persistance** | `persistante` |
| **Emplacement** | Écran d'intro (consigne complète) ; rappel au-dessus de chaque item : la 2e phrase de la consigne, mot pour mot |
| **Justification** | Sur le papier, la consigne et l'en-tête de l'échelle restent sous les yeux du répondant (même logique que la CUDIT-R et le PSI-II) |
| **Cas particuliers** | Aucun |

### Affichage du titre côté portail patient

| Champ | Valeur |
| --- | --- |
| **Élément(s) affiché(s) en titre sur le PDF source primaire** | `acronyme seul` (« QAP ») |
| **Sous-titre à afficher dans l'app (`patientIntroSubtitle`)** | `null` |
| **Divergence avec le PDF** | Aucune |

### Dimensions de cotation

Likert 1 à 5, dans l'ordre de la source : `1` Pas du tout correspondant · `2` Un peu correspondant · `3` Assez correspondant · `4` Très correspondant · `5` Extrêmement correspondant.

---

## 5. Items

| # | Item |
| --- | --- |
| 1 | Je perçois les problèmes comme étant menaçants pour mon bien-être. |
| 2 | Je doute souvent de mes capacités à résoudre les problèmes. |
| 3 | Souvent, avant même d'avoir essayé de trouver une solution, je me dis qu'il est difficile de résoudre un problème. |
| 4 | Les problèmes qui m'arrivent me semblent souvent insurmontables. |
| 5 | Lorsque je tente de résoudre un problème, je remets souvent en question mes habiletés. |
| 6 | Souvent, j'ai l'impression que les problèmes qui m'arrivent ne peuvent pas être résolus. |
| 7 | Même si j'arrive à voir certaines solutions à mes problèmes, je doute qu'ils pourront se régler facilement. |
| 8 | J'ai tendance à voir les problèmes comme un danger. |
| 9 | Ma première réaction devant un problème est de remettre en question mes habiletés. |
| 10 | Je perçois souvent mes problèmes comme étant plus gros qu'ils le sont en réalité. |
| 11 | Même si j'ai regardé un problème sous tous les angles possibles, je me demande encore si la solution que j'ai retenue va être efficace. |
| 12 | Je considère les problèmes comme des obstacles qui perturbent mon fonctionnement. |

Écarts au PDF (items 1, 2, 12) : §10.

---

## 6. Algorithme de scoring

Somme des 12 items (fiche de cotation : « Le QAP est une mesure unifactorielle sans question inversée. Pour calculer le score total, faites la somme des réponses de tous les items. »). **Plage** : 12 à 60. Pas de sous-score, pas d'inversion. Passation incomplète refusée (règle projet).

---

## 7. Seuils d'interprétation

Aucun seuil dans la source : une bande 12-60, libellé praticien « Pas de seuil clinique fourni par les auteurs. » (même choix que le PSI-II, §10).

---

## 8. Alertes cliniques

Aucune.

---

## 9. Cas de test unitaires

*Calculs vérifiés en Python le 11/10/2026, rejoués par `apps/api/src/scoring/scorers/qap.spec.ts`.*

| # | Réponses (items 1 à 12) | Score |
| --- | --- | --- |
| T1 | 12 × 1 | 12 |
| T2 | 12 × 5 | 60 |
| T3 | 2,3,4,1,5,2,3,4,2,3,1,5 | 35 |
| T4 | Valeur hors borne, réponse manquante | Non contrôlé par le scorer (comportement commun) ; impossible depuis la passation |

---

## 10. Choix et arbitrages méthodologiques

*Tranchés par Claude (11/10/2026), à relire par Clément. Confiance : haute / moyenne / basse.*

### Écarts à la source primaire

| Élément | Source primaire | Texte retenu | Origine | Justification | Confiance |
| --- | --- | --- | --- | --- | --- |
| Consigne | « … Encerclez le chiffre qui correspond à votre choix. » | Phrase retirée | Source primaire | Type 1 (adaptation du support), comme l'ÉII et le PSI-II | haute |
| Consigne | « (ex: problèmes… » | « (ex : problèmes… » | Typographie | Espace avant les deux-points | haute |
| Item 1 | « …comme étant menaçant pour mon bien-être. » | « menaçants » | Accord | Type 2 : l'adjectif qualifie « les problèmes » | haute |
| Item 2 | « …résoudre les problèmes . » | « …les problèmes. » | Typographie | Espace parasite avant le point | haute |
| Item 12 | « …perturbent mon fontionnement. » | « fonctionnement » | Coquille | Type 2 : faute de frappe manifeste | haute |
| Apostrophes | Droites | Droites | — | Aucun écart | haute |

L'item 10 (« plus gros qu'ils le sont », sans « ne » explétif) est conservé verbatim : tournure orale québécoise, pas une faute (précédent : québécismes conservés pour l'ÉII et le PSI-II).

### Autres arbitrages

| Sujet | Choix retenu | Justification | Confiance |
| --- | --- | --- | --- |
| Sources | Source unique (laboratoire Dugas, UQO) | Exception « autorité unique » ; article 2005 inaccessible | moyenne |
| Bande unique | « Pas de seuil clinique fourni par les auteurs. » | Aucun seuil dans la source ; texte praticien (précédent PSI-II) | moyenne |
| Rappel au-dessus des items | 2e phrase de la consigne, mot pour mot | Précédents CUDIT-R, PSI-II | haute |
| Nom au catalogue | « Questionnaire d'attitude face aux problèmes » | Titre de la publication de validation (2005) ; le PDF ne porte que « QAP » | haute |
| Domaine | Anxiété (« Anxiété généralisée ») | Modèle cognitif du TAG de Dugas, comme l'ÉII, la QIA, le PSI-II | haute |
| Durée | « 3-5 minutes » | Non sourcée ; 12 items | basse |

### Questions ouvertes

1. Obtenir l'article de 2005 pour recouper les items et vérifier l'absence de seuil. Recommandation : demande groupée au laboratoire Dugas (MEL-351).

### Recette

**Staging (11/10/2026, Claude)** — patient « Patient Test », parcours patient complet puis page résultat praticien : **conforme**.

| Jeu | Réponses | Attendu | Obtenu |
| --- | --- | --- | --- |
| Minimum | 12 × 1 | 12 / 60, « Pas de seuil clinique fourni par les auteurs. » | 12 / 60, idem |
| Maximum | 12 × 5 | 60 / 60, même libellé | 60 / 60, idem (historique longitudinal : +48) |

Consigne complète à l'écran d'intro, rappel au-dessus de chaque item, 5 libellés dans l'ordre de la source, mention de copyright en pied de résultat : conformes.

**Comparaison Mentaal (11/10/2026)** — [mentaal.fr/send/qap](https://mentaal.fr/send/qap), patient fictif, jeu T3 (attendu 35) : **35/60 chez Mentaal comme chez Melya**. La source primaire tranche.

| Point | Source primaire (UQO) | Melya | Mentaal |
| --- | --- | --- | --- |
| Consigne d'intro | Texte du formulaire | Texte du formulaire, sans « Encerclez… » | Texte réécrit (« Ce questionnaire vise à mieux comprendre comment vous réagissez face aux difficultés… ») |
| Rappel au-dessus des items | — (en-tête papier) | 2e phrase de la consigne, mot pour mot | « Indiquez dans quelle mesure cet énoncé correspond à votre façon habituelle de réagir : » (formulation Mentaal) |
| Items 1 et 12 | « menaçant », « fontionnement » | « menaçants », « fonctionnement » (§10) | Coquilles du PDF conservées |
| Libellé de réponse 5 | « Extrêmement correspondant » | Idem | Idem sur les boutons ; « Entièrement correspondant » dans le texte d'aide praticien |
| Interprétation | Aucun seuil | Bande unique « Pas de seuil clinique fourni par les auteurs. » | 12-47 « Aucun seuil publié » / **48-60 « Attitude très négative »** (seuil non sourcé) |
| Synthèse narrative | — | — | Paragraphe généré (« Le patient semble rapporter une appréhension marquée… ») |
| Nom | « QAP » ; titre de publication « Questionnaire d'attitude face aux problèmes » | Titre de publication | « Questionnaire des attitudes face aux problèmes » ; nom original annoncé « Problem Attitude Questionnaire » (l'original est francophone) |

À regarder par Clément : le seuil 48 de Mentaal n'apparaît pas dans la fiche de cotation UQO ; ne pas le reprendre sans l'article de 2005 (question ouverte 1).

---

## 11. Contrat technique

- Entrée `qap` dans `packages/core/src/scales/index.ts` : `single-scale`, clés `intensity_0` … `intensity_11`, `answerScales.intensity` 1-5, `persistentInstructions` = 2e phrase de la consigne, `patientIntroSubtitle: null`, une bande 12-60.
- Scorer `apps/api/src/scoring/scorers/qap.ts` (somme), enregistré sous `qap`. Tests `qap.spec.ts`.

---

## 12. Historique des modifications

| Date | Auteur | Modification |
| --- | --- | --- |
| 11/10/2026 | Claude (lot autonome) | Création de la fiche et implémentation : formulaire UQO en autorité unique, 12 items (3 corrections typographiques ou d'accord), score total 12-60 sans seuil. Tests 4/4. |
| 11/10/2026 | Claude (lot autonome) | Recette staging (min, max) conforme ; comparaison Mentaal (35/60 identique, seuil 48 non sourcé chez Mentaal). |
