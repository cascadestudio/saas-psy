# Test spec — PDI (Inventaire de détresse péritraumatique)

<!--
Voir _TEMPLATE.md pour les règles projet.
Fiche rédigée et implémentée par Claude en autonomie (lot du 11/10/2026).
Arbitrages et niveaux de confiance en §10, pour relecture par Clément.
-->

---

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | PDI |
| **Nom complet (FR)** | Inventaire de détresse péritraumatique |
| **Nom complet (langue originale)** | Peritraumatic Distress Inventory (PDI) |
| **Thème principal** | Traumatismes |
| **Sous-thèmes / tags** | détresse péritraumatique, TSPT, facteur de risque, critère A2 |
| **Nombre d'items** | 13 (aucun inversé) |
| **Durée estimée de passation** | 5 min (fiche descriptive Cn2r) |
| **Public cible** | Adultes exposés à un événement potentiellement traumatique (fiche Cn2r : « Adultes ») |
| **Mode d'administration** | auto |
| **Note sur le mode d'administration** | Se réfère à un événement précis : « pendant et immédiatement après l'événement critique ». Instrument jumeau du PDEQ (même laboratoire, même cadre temporel). |
| **Description praticien (bibliothèque)** | Questionnaire de 13 items évaluant la détresse émotionnelle et physique ressentie pendant un événement traumatogène et immédiatement après. |
| **Description patient (portail)** | AUCUNE — règle projet. |

---

## 2. Sources et traçabilité

### Source primaire (version FR retenue)

- **Type** : fiche officielle du **Centre national de ressources et de résilience (Cn2r)** — questionnaire complet (p. 1) + fiche descriptive (cotation, seuil, références, p. 2).
- **Référence** : *Inventaire de Détresse Péritraumatique (PDI)*, « Brunet et al. (2001) ©2001 — Traduction française et validation par Jehel et al. (2005) », mise en page Cn2r.
- **URL** : https://cn2r.fr/wp-content/uploads/2025/04/PDI_Cn2r.pdf
- **Fichier de portage** : `docs/scales/pdi/PDI_Cn2r.pdf`
- **Date de consultation** : 11/10/2026

### Source secondaire (typographie uniquement)

- **Type** : INSPQ (Institut national de santé publique du Québec), *Boîte à outils pour la surveillance post-sinistre des impacts sur la santé mentale*, « Questionnaire 9 — Peritraumatic Distress Inventory (PDI) » (bilingue FR/EN). Note de l'INSPQ : « Les questionnaires français et anglais ont été transmis par A. Brunet. »
- **URL** : https://www.inspq.qc.ca/boite-outils-pour-la-surveillance-post-sinistre-des-impacts-sur-la-sante-mentale/instruments-de-mesure-standardises/questionnaires/impact-immediat-du-trauma (page protégée par Cloudflare, lue dans Chrome)
- **Fiche descriptive associée** : …/fiches-pour-les-instruments-de-mesure-standardises-recommandes/impact-immediat-du-trauma
- **Date de consultation** : 11/10/2026

C'est une **variante québécoise** distincte de la version validée en France (Jehel 2005) : formulations différentes aux items 1, 3, 8, 10, 12 et 13 (tableau ci-dessous). Elle n'est donc pas une seconde source du texte, seulement de la ponctuation des items communs. Aucune autre source française reproduisant les 13 items de la version Jehel n'a été trouvée (recherches du 11/10/2026) : **exception « autorité unique »** pour le texte, comme le PDEQ avant l'ajout de sa source URPS — le Cn2r est le centre national de référence en psychotraumatologie.

### Autres sources consultées

- **Cn2r**, *Article « Détresse péritraumatique »* (2021) : « Un score supérieur à 15 indique une détresse significative. Ce questionnaire est disponible gratuitement en français. » (https://cn2r.fr/wp-content/uploads/2021/05/Article_Detresse_Peritraumatique_DEF.pdf).
- **Jehel et al. (2005)**, article de validation (Canadian Journal of Psychiatry) : non consulté en texte intégral.

### Instrument original et validation

- Brunet, A., Weiss, D.S., Metzler, T.J., Best, S.R., Neylan, T.C., Rogers, C., Fagan, J., & Marmar, C.R. (2001). The Peritraumatic Distress Inventory: A proposed measure of PTSD criterion A2. *American Journal of Psychiatry*, 158(9), 1480-1485.
- Jehel, L., Brunet, A., Paterniti, S., & Guelfi, J.D. (2005). Validation de la version française de l'inventaire de détresse péritraumatique. *Canadian Journal of Psychiatry*, 50(1), 67-71.

### Divergences constatées entre sources

| Élément | Cn2r (primaire, version Jehel 2005) | INSPQ (variante québécoise) |
| --- | --- | --- |
| Consigne | « Complétez s'il vous plaît les énoncés qui suivent en entourant le nombre qui correspond au mieux à ce que vous avez ressenti pendant et immédiatement après l'événement critique. Si une proposition ne s'applique pas à votre expérience de l'événement, alors entourer la réponse « Pas du tout vrai ». » | « Veuillez compléter les énoncés qui suivent, en cochant la case qui correspond le mieux à ce que vous avez ressenti pendant et immédiatement après l'événement qui est à l'origine de votre stress post-traumatique. » (pas de 2e phrase en français) |
| Item 1 | « Je me sentais totalement incapable de faire quoi que ce soit. » | « Je ressentais de l'impuissance. » |
| Item 2 | « …du chagrin » (sans point) | « …du chagrin. » |
| Item 3 | « …en colère car je ne pouvais rien faire de plus. » | « …en colère. » |
| Items 4, 5 | Sans point final | Avec point final |
| Item 8 | « J'avais l'impression de perdre le contrôle… » | « J'avais l'impression que j'allais perdre le contrôle… » |
| Item 10 | « J'étais horrifié(e) par ce que j'avais vu. » | « J'étais horrifié(e). » |
| Item 12 | « J'étais sur le point de m'évanouir. » | « Je sentais que je pourrais m'évanouir. » |
| Item 13 | « Je pensais que j'allais mourir. » | « Je pensais que je pourrais mourir. » |
| Seuil | ≥ 15 (fiche descriptive) | « Un score de 14 ou plus identifierait les personnes qui sont à risque de développer un TSPT » |

Items 6, 7, 9, 11 et libellés de réponse identiques.

### Version française retenue

Version de Jehel et al. (2005), validée en France, telle que diffusée par le Cn2r (hiérarchie France d'abord).

---

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | ✅ domaine public — fiche INSPQ : « Domaine public. Il faut mentionner la source (Jehel et al. 2005 [anglais]; Brunet et al., 2001 [français]). » (les crochets inversent manifestement les langues) |
| **Détenteur des droits** | Brunet et al. ©2001 (affiché sur la fiche Cn2r) ; traduction et validation Jehel et al. (2005) |
| **Mention obligatoire à afficher** | « PDI — Brunet, Weiss, Metzler et al. (2001), American Journal of Psychiatry ©2001. Traduction française et validation : Jehel et al. (2005), Canadian Journal of Psychiatry. Domaine public (INSPQ). Mise en page : Centre national de ressources et de résilience (Cn2r). » |
| **Restrictions d'usage commercial** | Aucune mentionnée ; citation des sources obligatoire |
| **Décision Melya** | go |

---

## 4. Structure de l'échelle

### Consigne officielle

> _« Complétez s'il vous plaît les énoncés qui suivent en choisissant la réponse qui correspond au mieux à ce que vous avez ressenti pendant et immédiatement après l'événement critique. Si une proposition ne s'applique pas à votre expérience de l'événement, alors choisissez la réponse « Pas du tout vrai ». »_

**Source** : fiche Cn2r, verbes papier adaptés à l'écran (« en entourant le nombre » → « en choisissant la réponse » ; « alors entourer » → « alors choisissez »), cf. §10.

### Comportement UX de la consigne

| Champ | Valeur |
| --- | --- |
| **Persistance** | `persistante` — rappel court : « Pendant et immédiatement après l'événement critique : » |
| **Emplacement** | Écran d'intro (consigne complète) ; rappel au-dessus de chaque item |
| **Justification** | Extrait mot pour mot de la consigne. Sur le papier, la consigne reste visible au-dessus des 13 items (une seule page) ; même choix que le PDEQ, validé par Clément le 29/09/2026 |
| **Cas particuliers** | Aucun |

### Affichage du titre côté portail patient

| Champ | Valeur |
| --- | --- |
| **Élément(s) affiché(s) en titre sur le PDF source primaire** | `nom complet + acronyme` (« Inventaire de Détresse Péritraumatique (PDI) ») |
| **Sous-titre à afficher dans l'app (`patientIntroSubtitle`)** | non renseigné (fallback sur `label`) |
| **Divergence avec le PDF** | Majuscules de titre du PDF non reprises (typographie française), comme le PDEQ |

### Dimensions de cotation

Likert unique 0-4 : `0` Pas du tout vrai · `1` Un peu vrai · `2` Plutôt vrai · `3` Très vrai · `4` Extrêmement vrai.

⚠️ **Cotation débutant à 0** (le PDEQ, instrument jumeau, débute à 1).

---

## 5. Items

| # | Item |
| --- | --- |
| 1 | Je me sentais totalement incapable de faire quoi que ce soit. |
| 2 | Je ressentais de la tristesse et du chagrin. |
| 3 | Je me sentais frustré(e) et en colère car je ne pouvais rien faire de plus. |
| 4 | J'avais peur pour ma propre sécurité. |
| 5 | Je me sentais coupable. |
| 6 | J'avais honte de mes réactions émotionnelles. |
| 7 | J'étais inquiet pour la sécurité des autres. |
| 8 | J'avais l'impression de perdre le contrôle de mes émotions. |
| 9 | J'avais envie d'uriner et d'aller à la selle. |
| 10 | J'étais horrifié(e) par ce que j'avais vu. |
| 11 | J'avais des réactions physiques comme des sueurs, des tremblements et des palpitations. |
| 12 | J'étais sur le point de m'évanouir. |
| 13 | Je pensais que j'allais mourir. |

Écarts au PDF (items 2, 4, 5 ; apostrophes) : §10.

---

## 6. Algorithme de scoring

Somme simple des 13 items (fiche Cn2r : « Le score total est la somme des items »). **Plage : 0-52.** Pas d'inversion, pas de sous-score. Passation incomplète refusée (règle projet).

---

## 7. Seuils d'interprétation

| Score | Interprétation |
| --- | --- |
| 0–14 | Détresse péritraumatique non significative |
| 15–52 | Détresse péritraumatique significative |

**Source** : fiche descriptive Cn2r — « Un score total ≥ 15 indique une détresse péritraumatique significative ». Divergences (INSPQ ≥ 14, article Cn2r « supérieur à 15 ») : §10.

---

## 8. Alertes cliniques

Aucune. L'item 13 (« Je pensais que j'allais mourir ») décrit une peur de mourir pendant l'événement, pas une idéation suicidaire : pas d'alerte (cf. §10).

---

## 9. Cas de test unitaires

*Calculs vérifiés en Python le 11/10/2026, rejoués par `apps/api/src/scoring/scorers/pdi.spec.ts` (5/5).*

| # | Réponses (items 1 à 13) | Score | Niveau |
| --- | --- | --- | --- |
| T1 | 13 × 0 | 0 | Non significative |
| T2 | 2,2,2,2,2,2,1,1,0,0,0,0,0 | 14 | Non significative |
| T3 | 2,2,2,2,2,2,1,1,1,0,0,0,0 | 15 | Significative |
| T4 | 13 × 4 | 52 | Significative |

---

## 10. Choix et arbitrages méthodologiques

*Tranchés par Claude (11/10/2026), à relire par Clément. Confiance : haute / moyenne / basse.*

Règle suivie (précédent PDEQ) : texte de la fiche Cn2r mot pour mot ; on ne s'en écarte qu'en cas de faute ou pour adapter le support papier à l'écran, le texte corrigé venant de la source secondaire quand elle le porte.

### Écarts à la source primaire

| Élément | Source primaire (Cn2r) | Texte retenu | Origine | Justification | Confiance |
| --- | --- | --- | --- | --- | --- |
| Consigne, 1re phrase | « en entourant le nombre qui correspond » | « en choisissant la réponse qui correspond » | Adaptation Melya (précédent PDEQ) | Type 1, adaptation du support ; l'INSPQ dit aussi papier (« en cochant la case ») | moyenne |
| Consigne, 2e phrase | « alors entourer la réponse « Pas du tout vrai » » | « alors choisissez la réponse « Pas du tout vrai » » | Adaptation Melya | Type 1 ; l'infinitif « entourer » est en outre une rupture de construction après « Complétez » ; l'impératif rétablit la cohérence | moyenne |
| Items 2, 4, 5 | Pas de point final | Point final | INSPQ | Type 2, typographie ; l'INSPQ porte le point | haute |
| Apostrophes | Courbes (’) | Droites (') | Convention du code | Convention de toutes les entrées existantes | haute |

L'item 7 « J'étais inquiet pour la sécurité des autres. » est conservé sans « (e) » : la forme est identique dans les deux sources, contrairement aux items 3 et 10 ; ajouter « (e) » serait une formulation Melya.

### Autres arbitrages

| Sujet | Choix retenu | Justification | Confiance |
| --- | --- | --- | --- |
| Version française | Jehel 2005 (Cn2r) plutôt que la variante INSPQ | Hiérarchie France d'abord ; la variante québécoise reformule six items | haute |
| Seuil | ≥ 15 | Fiche descriptive Cn2r (source primaire). L'INSPQ écrit « 14 ou plus » au conditionnel et l'article Cn2r « supérieur à 15 » ; la fiche descriptive est le texte normatif le plus précis. À recouper avec Jehel 2005 | moyenne |
| Libellés des bandes | « Détresse péritraumatique significative » / « non significative » | Terme de la source ; bande basse = négation (précédent PDEQ) | haute |
| Rappel au-dessus des items | « Pendant et immédiatement après l'événement critique : » | Extrait mot pour mot de la consigne (précédent PDEQ) | haute |
| Alerte item 13 | Aucune | Peur de mourir pendant l'événement, pas une idéation suicidaire ; aucune source ne prévoit d'alerte | haute |
| Domaine / catégorie | `trauma` / « Traumatismes » | Comme le PDEQ et la PCL-5 | haute |
| Version enfant (PDI-C) | Non portée | Existe au Cn2r (`PDI-C_Cn2r.pdf`) ; échelle distincte, à traiter séparément | haute |

### Questions ouvertes

1. Recouper le seuil (14 ou 15) avec l'article de Jehel et al. (2005). Recommandation : garder ≥ 15 (source primaire) tant que l'article n'est pas lu.

### Recette

**Staging (11/10/2026, Claude)** — patient « Patient Test », parcours patient complet puis page résultat praticien : **conforme**.

| Jeu | Réponses (items 1-13) | Attendu | Obtenu |
| --- | --- | --- | --- |
| Minimum | 13 × 0 | 0 / 52, non significative | 0, « Détresse péritraumatique non significative » |
| Seuil | 2,2,2,2,2,2,1,1,1,0,0,0,0 | 15, significative | 15, « Détresse péritraumatique significative » |
| Maximum | 13 × 4 | 52, significative | 52, idem |

Écran d'intro (deux paragraphes de consigne), rappel « Pendant et immédiatement après l'événement critique : », 5 libellés, mention « Seuil de la fiche descriptive Cn2r » sous la jauge et copyright en pied : conformes.

**Mentaal** : PDI affiché « Bientôt disponible » (82 votes) le 11/10/2026 ; pas de passation de comparaison possible.

---

## 11. Contrat technique

- Entrée `pdi` dans `packages/core/src/scales/index.ts` : `single-scale`, clés `intensity_0` … `intensity_12`, `answerScales.intensity` 0-4, `persistentInstructions` = rappel court, deux bandes 0-14 / 15-52, `thresholdsSource` « Seuil de la fiche descriptive Cn2r ».
- Scorer `apps/api/src/scoring/scorers/pdi.ts` (somme), enregistré sous `pdi`. Tests `pdi.spec.ts`.
- Domaine : `trauma`.

---

## 12. Historique des modifications

| Date | Auteur | Modification |
| --- | --- | --- |
| 11/10/2026 | Claude (lot autonome) | Création de la fiche et implémentation : fiche Cn2r (version Jehel 2005) en source primaire, INSPQ pour la ponctuation, 13 items 0-4, seuil ≥ 15. Tests 5/5. |
| 11/10/2026 | Claude (lot autonome) | Recette staging conforme (0, 15, 52) ; Mentaal : « bientôt disponible ». |
