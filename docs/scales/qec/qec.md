# Test spec — QEC (Questionnaire d'évitement cognitif)

<!--
Voir _TEMPLATE.md pour les règles projet.
Fiche rédigée et implémentée par Claude en autonomie (lot du 11/10/2026).
Arbitrages et niveaux de confiance en §10, pour relecture par Clément.
-->

---

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | QEC (id technique `qec` — référencée CAQ dans le benchmark Mentaal et dans `SUIVI_ECHELLES.md`) |
| **Nom complet (FR)** | Questionnaire d'évitement cognitif (titre de la publication de validation ; le PDF source ne porte que le sigle) |
| **Nom complet (langue originale)** | Original francophone ; version anglaise : Cognitive Avoidance Questionnaire (CAQ, Sexton & Dugas 2008) |
| **Thème principal** | Anxiété généralisée |
| **Sous-thèmes / tags** | évitement cognitif, inquiétude, TAG, modèle de Dugas |
| **Nombre d'items** | 25 (aucun inversé) |
| **Durée estimée de passation** | 5-10 min (estimation Melya) |
| **Public cible** | Adultes et adolescents (validation auprès des deux populations) |
| **Mode d'administration** | auto |
| **Description praticien (bibliothèque)** | Questionnaire de 25 items évaluant cinq stratégies d'évitement cognitif. |
| **Description patient (portail)** | AUCUNE — règle projet. |

---

## 2. Sources et traçabilité

### Source primaire (items, consigne, réponses, cotation)

- **Type** : formulaire officiel du laboratoire des auteurs (UQO, équipe de M. J. Dugas), 3 pages d'items + 1 page « Instructions pour la cotation ».
- **URL** : https://uqo.ca/sites/default/files/fichiers-uqo/anxiete/qec.pdf
- **Fichier de portage** : `docs/scales/qec/QEC_UQO.pdf`
- **Date de consultation** : 11/10/2026

### Exception de sourcing — autorité unique justifiée

Même situation que l'ÉII, la QIA, le PSI-II et le QAP (laboratoire d'un co-auteur, original francophone, cotation officielle incluse). Aucune seconde source indépendante reproduisant les 25 items n'a été trouvée.

### Publication de validation

- Gosselin, P., Langlois, F., Freeston, M. H., Ladouceur, R., Dugas, M. J., & Pelletier, O. (2002). Le Questionnaire d'évitement cognitif (QEC) : développement et validation auprès d'adultes et d'adolescents. *Journal de thérapie comportementale et cognitive*, 12, 24-37. **Texte intégral non consulté** (sur abonnement).

### Divergences constatées entre sources

Aucune (source unique). Comparaison Mentaal : §10, « Recette ».

### Version française retenue

Original francophone (Québec), seule version française.

---

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | zone grise ✉️ — diffusé publiquement par le laboratoire des auteurs, sans phrase de licence |
| **Détenteur des droits** | Gosselin, Langlois, Freeston, Ladouceur, Dugas & Pelletier (2002) |
| **Mention obligatoire à afficher** | « Questionnaire d'évitement cognitif (QEC) — Gosselin, Langlois, Freeston, Ladouceur, Dugas & Pelletier (2002), Journal de thérapie comportementale et cognitive, 12, 24-37. Instrument original francophone. » |
| **Restrictions d'usage commercial** | Non mentionnées (✉️, contact groupé laboratoire Dugas, cf. MEL-351) |
| **Décision Melya** | go sous réserve |
| **PDF source en téléchargement (SEO, transparence)** | 🔗 lien seul — Formulaire public du laboratoire Dugas (uqo.ca), sans phrase de licence. Renvoyer vers uqo.ca. Statut tranché par Claude le 11/10/2026 (grille : 📥 hébergeable / 🔗 lien vers la source officielle / 🚫 non). |

---

## 4. Structure de l'échelle

### Consigne officielle

> _« Les gens réagissent de différentes façons à certains types de pensées. Veuillez utiliser l'échelle ci-dessous pour exprimer jusqu'à quel point chacun des énoncés suivants correspond à votre façon de réagir à certaines pensées. »_

**Source** : source primaire, page 1, sans la phrase « Encerclez le numéro (1 à 5) approprié. » (adaptation du support, §10).

### Comportement UX de la consigne

| Champ | Valeur |
| --- | --- |
| **Persistance** | `persistante` |
| **Emplacement** | Écran d'intro ; rappel au-dessus de chaque item : la 2e phrase de la consigne, mot pour mot |
| **Justification** | Précédents CUDIT-R, PSI-II, QAP |
| **Cas particuliers** | Aucun |

### Affichage du titre côté portail patient

`patientIntroSubtitle: null` (le PDF n'affiche que « QEC »).

### Dimensions de cotation

Likert 1 à 5 : `1` Pas du tout correspondant · `2` Un peu correspondant · `3` Assez correspondant · `4` Très correspondant · `5` Tout à fait correspondant.

---

## 5. Items

| # | Item | Sous-échelle |
| --- | --- | --- |
| 1 | Il y a des choses auxquelles je préfère ne pas penser. | Suppression |
| 2 | J'évite certaines situations qui m'amènent à porter attention à des choses auxquelles je ne veux pas penser. | Suppression |
| 3 | Je remplace les images menaçantes que j'ai en tête par un discours intérieur. | Transformation |
| 4 | Je pense à des choses qui me concernent comme si cela arrivait à quelqu'un d'autre que moi. | Substitution |
| 5 | J'ai des pensées que j'essaie d'éviter. | Suppression |
| 6 | J'essaie de ne pas penser aux aspects les plus dérangeants de certaines situations pour ne pas avoir trop peur. | Suppression |
| 7 | J'évite parfois des objets qui peuvent déclencher des idées dérangeantes. | Évitement |
| 8 | Je me distrais pour éviter de penser à certains sujets troublants. | Distraction |
| 9 | J'évite des gens qui me font penser à des choses auxquelles je ne veux pas réfléchir. | Évitement |
| 10 | Je fais souvent des choses pour me distraire de mes pensées. | Distraction |
| 11 | Je pense à des détails inutiles pour ne pas penser aux sujets importants qui m'inquiètent. | Substitution |
| 12 | Parfois, je me plonge dans une activité pour ne pas penser à certaines choses. | Distraction |
| 13 | Pour éviter de penser aux sujets qui me dérangent, je m'efforce de penser à autre chose. | Distraction |
| 14 | Il y a des choses auxquelles j'essaie de ne pas penser. | Suppression |
| 15 | Je maintiens un discours intérieur pour éviter de voir des scénarios (une suite d'images) qui me font peur. | Transformation |
| 16 | Parfois, j'évite des endroits qui me font réfléchir à des choses auxquelles je préfèrerais ne pas penser. | Évitement |
| 17 | Je pense aux événements passés pour ne pas penser aux événements futurs insécurisants. | Substitution |
| 18 | J'évite de poser des gestes qui me rappellent des choses auxquelles je ne veux pas penser. | Évitement |
| 19 | Lorsque je vois des images dans ma tête qui sont trop dérangeantes, je les remplace par des pensées verbales (monologue interne). | Transformation |
| 20 | Je m'inquiète de beaucoup de petites affaires pour ne pas penser aux choses plus importantes. | Substitution |
| 21 | Parfois, je me garde occupé(e) seulement pour empêcher les pensées de surgir dans mon esprit. | Distraction |
| 22 | J'évite des situations avec d'autres personnes qui me font penser à des choses désagréables. | Évitement |
| 23 | J'essaie de décrire intérieurement des événements dérangeants plutôt que d'en former une image dans ma tête. | Transformation |
| 24 | Je mets de côté les images associées à une situation menaçante en tentant plutôt de me la décrire intérieurement. | Transformation |
| 25 | Je pense à ce qui inquiète les autres plutôt que de penser à mes propres inquiétudes. | Substitution |

---

## 6. Algorithme de scoring

### Calcul du score total

Fiche de cotation : « Pour utiliser le QÉC comme instrument unifactoriel, calculez la somme des réponses de tous les items. » **Plage** : 25 à 125.

### Subscores calculés

| Sous-score | Items | Plage | Affiché |
| --- | --- | --- | --- |
| Substitution de pensées | 4, 11, 17, 20, 25 | 5-25 | oui |
| Transformation des images en pensées | 3, 15, 19, 23, 24 | 5-25 | oui |
| Distraction | 8, 10, 12, 13, 21 | 5-25 | oui |
| Évitement des stimuli menaçants | 7, 9, 16, 18, 22 | 5-25 | oui |
| Suppression de pensées | 1, 2, 5, 6, 14 | 5-25 | oui |

**Source** : source primaire, page 4. Les cinq sous-échelles partitionnent les 25 items (vérifié en Python).

Pas d'inversion. Passation incomplète refusée (règle projet).

---

## 7. Seuils d'interprétation

Aucun seuil dans la source : une bande 25-125, libellé praticien « Pas de seuil clinique fourni par les auteurs. »

---

## 8. Alertes cliniques

Aucune.

---

## 9. Cas de test unitaires

*Calculs vérifiés en Python le 11/10/2026, rejoués par `apps/api/src/scoring/scorers/qec.spec.ts`. Sous-scores dans l'ordre de la §6.*

| # | Réponses (items 1 à 25) | Total | Sous-scores |
| --- | --- | --- | --- |
| T1 | 25 × 1 | 25 | 5 / 5 / 5 / 5 / 5 |
| T2 | 25 × 5 | 125 | 25 × 5 |
| T3 | 3,2,4,1,5,2,3,4,2,3,1,5,4,2,3,1,2,4,3,2,5,1,3,4,2 | 71 | 8 / 17 / 21 / 11 / 14 |
| T4 (R1) | 1,1,4,5,1,1,2,3,2,3,5,3,3,1,4,2,5,2,4,5,3,2,4,4,5 | 75 | 25 / 20 / 15 / 10 / 5 |
| T5 | Valeur hors borne, réponse manquante | Non contrôlé par le scorer (comportement commun) ; impossible depuis la passation | |

Détail T3 : substitution 1+1+2+2+2 = 8 ; transformation 4+3+3+3+4 = 17 ; distraction 4+3+5+4+5 = 21 ; évitement 3+2+1+4+1 = 11 ; suppression 3+2+5+2+2 = 14.

---

## 10. Choix et arbitrages méthodologiques

*Tranchés par Claude (11/10/2026), à relire par Clément.*

### Écarts à la source primaire

| Élément | Source primaire | Texte retenu | Origine | Justification | Confiance |
| --- | --- | --- | --- | --- | --- |
| Consigne | « … Encerclez le numéro (1 à 5) approprié. » | Phrase retirée | Source primaire | Type 1 (adaptation du support) | haute |
| Items 8 et 21 | Pas de point final | Point final ajouté | Typographie | Harmonisation avec les 23 autres items | haute |

### Autres arbitrages

| Sujet | Choix retenu | Justification | Confiance |
| --- | --- | --- | --- |
| Sources | Source unique (laboratoire Dugas, UQO) | Exception « autorité unique » ; article 2002 inaccessible | moyenne |
| Score total | Affiché (25-125) avec les 5 sous-scores | La fiche de cotation prévoit les deux usages (unifactoriel et multifactoriel) | haute |
| Bande unique | « Pas de seuil clinique fourni par les auteurs. » | Aucun seuil dans la source (précédent PSI-II) | moyenne |
| Libellés des sous-scores | Repris de la fiche de cotation | Source primaire p. 4 | haute |
| Public | Adultes (validation aussi chez l'adolescent) | Catégorie « Anxiété généralisée » sans mention d'âge | moyenne |
| Domaine | Anxiété | Modèle du TAG de Dugas | haute |
| Durée | « 5-10 minutes » | Non sourcée ; 25 items (comme le PSI-II) | basse |

### Questions ouvertes

1. Obtenir l'article de 2002 pour recouper les items. Recommandation : demande groupée au laboratoire Dugas (MEL-351).

### Recette

**Staging (11/10/2026, Claude)** — patient « Patient Test », parcours patient complet puis page résultat praticien : **conforme**.

| Jeu | Réponses (items 1-25) | Attendu | Obtenu |
| --- | --- | --- | --- |
| Minimum | 25 × 1 | 25 / 125 ; sous-scores 5 × 5/25 | 25 / 125 |
| Maximum | 25 × 5 | 125 / 125 ; sous-scores 5 × 25/25 | 125 / 125 |
| R1 (une valeur par sous-échelle) | 1,1,4,5,1,1,2,3,2,3,5,3,3,1,4,2,5,2,4,5,3,2,4,4,5 | 75 ; substitution 25, transformation 20, distraction 15, évitement 10, suppression 5 | 75 / 125 ; 25/25, 20/25, 15/25, 10/25, 5/25 |

Le jeu R1 vérifie à lui seul le rattachement de chaque item à sa sous-échelle (chaque sous-échelle reçoit une valeur distincte). Libellé « Pas de seuil clinique fourni par les auteurs. », consigne, 5 libellés de réponse et mention de copyright : conformes.

**Comparaison Mentaal (11/10/2026)** — fiche « CAQ » ([mentaal.fr/send/caq](https://mentaal.fr/send/caq)), patient fictif, jeu R1 : **75/125 et sous-scores 25/20/15/10/5 chez Mentaal comme chez Melya**, mêmes regroupements d'items. La source primaire tranche.

| Point | Source primaire (UQO) | Melya | Mentaal |
| --- | --- | --- | --- |
| Consigne d'intro | Texte du formulaire | Texte du formulaire, sans « Encerclez… » | Texte réécrit (« Veuillez répondre à chaque question aussi honnêtement que possible… ») |
| Rappel au-dessus des items | — (en-tête papier) | Phrase de la consigne, mot pour mot | « À quel point l'énoncé suivant vous correspond ? » (formulation Mentaal) |
| Item 9 | « …auxquelles je ne veux pas réfléchir » | Verbatim | « auxquelle » (coquille Mentaal) |
| Items 8 et 21 | Sans point final | Point ajouté (§10) | Point présent |
| Ancres de réponse | « Pas du tout correspondant » … « Tout à fait correspondant » | Idem | Idem sur les boutons ; le texte d'aide praticien parle de « 1 = jamais, 5 = toujours » (inexact) |
| Interprétation | Aucun seuil | Bande unique sans seuil | Aucun seuil ; une description par sous-échelle |
| Nom | « QEC » | « Questionnaire d'évitement cognitif » | « Questionnaire des évitements cognitifs (CAQ) » |

Aucun écart de cotation.

---

## 11. Contrat technique

- Entrée `qec` dans `packages/core/src/scales/index.ts` : `single-scale`, clés `intensity_0` … `intensity_24`, `answerScales.intensity` 1-5, `persistentInstructions` = 2e phrase de la consigne, `patientIntroSubtitle: null`, une bande 25-125.
- Scorer `apps/api/src/scoring/scorers/qec.ts` (somme + 5 sous-scores, patron PSI-II), enregistré sous `qec`. Tests `qec.spec.ts`.

---

## 12. Historique des modifications

| Date | Auteur | Modification |
| --- | --- | --- |
| 11/10/2026 | Claude (lot autonome) | Création de la fiche et implémentation : formulaire UQO en autorité unique, 25 items verbatim, total 25-125 et 5 sous-scores, sans seuil. Tests 5/5. |
| 11/10/2026 | Claude (lot autonome) | Recette staging (min, max, R1) conforme ; comparaison Mentaal (75 et sous-scores identiques). |

## 13. Reste à faire avant prod

<!-- Généré le 12/10/2026 depuis la repasse « regard neuf » ; suivi interactif : https://claude.ai/artifact/RLrDZwNayBy3gQCFcMDwPB -->

- [ ] **Recette** : Recette manuelle sur staging (parcours patient + page résultat), puis passage en ✅ dans Linear et SUIVI.
