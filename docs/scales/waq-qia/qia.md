# Test spec — QIA / WAQ (Questionnaire sur l'inquiétude et l'anxiété)

<!--
Voir _TEMPLATE.md pour les règles projet (sourcing, copyright, FR-only,
hiérarchie versions, comparaison Mentaal).
-->

---

## 1. Métadonnées produit

| Champ | Valeur |
|-------|--------|
| **Nom court** | QIA (id technique : `qia` — référencé WAQ dans le benchmark Mentaal) |
| **Nom complet (FR)** | Questionnaire sur l'inquiétude et l'anxiété |
| **Nom complet (langue originale)** | L'original **est** francophone (Dugas et al., 2001) ; version anglaise dérivée : Worry and Anxiety Questionnaire (WAQ). |
| **Thème principal** | Anxiété généralisée |
| **Sous-thèmes / tags** | TAG, inquiétude, critères diagnostiques, symptômes somatiques |
| **Nombre d'items** | 1 item non coté (thèmes, texte libre) + 10 items cotés 0-8 |
| **Durée estimée de passation** | 5 min |
| **Public cible** | Adultes. |
| **Mode d'administration** | auto |
| **Description praticien (bibliothèque)** | Questionnaire évaluant la présence et la sévérité des symptômes du TAG : thèmes d'inquiétude, caractère excessif, fréquence, contrôle, sensations somatiques, interférence. Cotation par critères. |
| **Description patient (portail)** | AUCUNE — règle projet. |

---

## 2. Sources et traçabilité

### Source primaire (version FR retenue)

- **Type** : formulaire officiel du laboratoire des auteurs (UQO — équipe Dugas), items + fiche de cotation (score total + critères TAG).
- **URL** : https://uqo.ca/sites/default/files/fichiers-uqo/anxiete/qia.pdf
- **Fichier de portage** : `docs/scales/waq-qia/WAQ_QIA_UQO.pdf`
- **Date de consultation** : 16/07/2026

### Exception de sourcing — autorité unique justifiée

Formulaire + cotation émanant du laboratoire des auteurs originaux ; instrument original francophone (pas de traduction à cross-checker).

### Instrument original

- Dugas, M.J., Freeston, M.H., Provencher, M.D., Lachance, S., Ladouceur, R., & Gosselin, P. (2001). *Le Questionnaire sur l'Inquiétude et l'Anxiété. Validation dans des échantillons non cliniques et cliniques.* Journal de Thérapie Comportementale et Cognitive, 11(1), 31-36.

### Divergences constatées entre sources

- ⚠️ **Le benchmark Mentaal classait la WAQ en « Likert 0-8 + somme » (Tier 1)** — la fiche de cotation UQO montre en réalité une **cotation par critères** (type PCL-5) en plus de la somme. Corrigé dans le portage.
- Item 1 papier = 6 champs de texte (a-f) → porté en **un champ de texte libre unique** (`openingTextItem`, nouvelle brique UI). Décision Adrien 16/07/2026.
- Échelles 0-8 papier ancrées aux points 0/4/8 uniquement → 9 boutons dont les valeurs intermédiaires affichent le chiffre seul (« 1 », « 2 », …) et les ancres le chiffre + libellé (« 4 — Modérément excessives »).

---

## 3. Statut copyright et licence

| Champ | Valeur |
|-------|--------|
| **Statut** | libre (instrument de recherche diffusé publiquement par le laboratoire des auteurs) |
| **Détenteur des droits** | Dugas et al. (2001). |
| **Mention obligatoire à afficher** | *« Questionnaire sur l'Inquiétude et l'Anxiété (QIA / WAQ) — Dugas, Freeston, Provencher, Lachance, Ladouceur & Gosselin (2001), Journal de Thérapie Comportementale et Cognitive, 11(1), 31-36. Instrument original francophone. »* |
| **Décision Melya** | go |

---

## 4. Structure de l'échelle

### Item d'ouverture — texte libre (nouvelle brique `openingTextItem`)

- Item 1 : « Quels sont les sujets à propos desquels vous vous inquiétez le plus souvent ? » — texte libre, **non coté**, stocké sous la clé `worry_themes`.
- Le patient peut poursuivre sans remplir (fidèle au papier) ; dans ce cas le critère « ≥ 1 thème » n'est pas rencontré.
- Affiché côté praticien en tête des réponses (section « non scoré »).
- Brique générique : `Scale.openingTextItem` + composant `OpeningTextQuestion` + phase `opening-text` du `SessionRunner`. Réutilisable pour d'autres échelles.

### Consigne officielle

> *« Ce questionnaire porte sur vos inquiétudes et votre anxiété au cours des six derniers mois. Vous listerez d'abord les sujets à propos desquels vous vous inquiétez le plus souvent, puis vous répondrez à chaque question en choisissant le chiffre correspondant (0 à 8). »*

(Adaptation numérique de « Pour les numéros suivants, encerclez le chiffre correspondant (0 à 8) ».)

### Section « Sensations physiques »

`sectionIntros` à l'index 3 avec écran de transition : « Durant les derniers six mois, avez-vous souvent été troublé(e) par une ou l'autre des sensations suivantes lorsque vous étiez inquiet(ète) ou anxieux(se) ? » (consigne verbatim de l'item 5).

### Dimensions de cotation (`formType: "options"`)

10 items cotés 0-8, ancres aux points 0 / 4 / 8 (libellés propres à chaque item, verbatim UQO).

---

## 5. Items

| # UQO | Portage | Contenu |
|-------|---------|---------|
| 1 | `openingTextItem` (`worry_themes`) | Thèmes d'inquiétude (texte libre, non coté) |
| 2 | `option_0` | Caractère excessif (Aucunement / Modérément / Complètement excessives) |
| 3 | `option_1` | Fréquence sur 6 mois (Jamais / 1 jour sur 2 / À tous les jours) |
| 4 | `option_2` | Difficulté à contrôler (Aucune / Modérée / Extrême) |
| 5 a-f | `option_3 … option_8` | Sensations somatiques ×6 (Aucunement / Modérément / Très sévèrement) |
| 6 | `option_9` | Interférence avec la vie (Aucunement / Modérément / Très sévèrement) |

---

## 6. Algorithme de scoring

### Score total

Somme des 10 items cotés (item 1 exclu — fiche UQO : « sauf les réponses à l'item 1 »). **Plage : 0-80.**

### Cotation par critères (fiche UQO) — `criteriaCheck`, seuil d'endossement = 4

| Rangée | Critère | Requis |
|--------|---------|--------|
| theme | ≥ 1 thème d'inquiétude rapporté (item 1 non vide) | 1/1 |
| cognitif | Items 2, 3 et 4 cotés ≥ 4 | 3/3 |
| somatique | ≥ 3 des 6 sensations cotées ≥ 4 (item 5) | 3/6 |
| interference | Item 6 coté ≥ 4 | 1/1 |

`met` global = les 4 rangées rencontrées → profil compatible TAG. (Les catégories intermédiaires de la fiche — critère cognitif seul / somatique seul — sont lisibles rangée par rangée dans le `CriteriaCheckBlock`.)

---

## 7. Seuils d'interprétation

| Score | Interprétation |
|-------|----------------|
| 0–80 | Plus le score est élevé, plus la symptomatologie d'inquiétude et d'anxiété est marquée. |

Pas de bandes de sévérité : la fiche UQO ne fournit **aucun seuil sur le score total** (l'interprétation clinique passe par les critères). Une seule range descriptive (précédent : RSES, ÉII).

---

## 8. Alertes cliniques

Aucune.

---

## 9. Cas de test unitaires

| # | Cas | Attendu |
|---|-----|---------|
| T1 | Thèmes + items 2,3,4,6 ≥ 4 + 3 somatiques ≥ 4 | criteriaCheck.met = true |
| T2 | Idem sans thème (texte vide/blanc) | met = false (rangée theme) |
| T3 | 2/6 somatiques ≥ 4 | met = false, count somatique = 2 |
| T4 | Item 4 coté 3 | rangée cognitif 2/3, met = false |
| T5 | Tous à 8 + thème | total = 80, met = true |

Vérifiés dans le script de recette (40/40 PASS, 16/07/2026).

---

## 10. Points à valider avec le·la psychologue référent·e

1. **Texte libre unique** vs 6 champs séparés (papier) pour les thèmes.
2. Formulation des 4 rangées de critères dans le `CriteriaCheckBlock`.
3. UI 9 boutons (0-8, ancres 0/4/8) — confort de passation à confirmer en recette.
4. Absence de bandes de sévérité sur le score total.

---

## 11. Contrat technique

- `formType: "options"`, clés `option_0 … option_9` + `worry_themes` (string).
- `Scale.openingTextItem` (nouveau champ core) relayé par `sessions.service.ts` et `session/[sessionId]/page.tsx` ; composant `OpeningTextQuestion.tsx` ; phase `opening-text` dans `SessionRunner` (progress bar masquée, back intro↔texte↔items) ; affichage praticien dans `ItemResponsesList`.
- Scorer `apps/api/src/scoring/scorers/qia.ts` (somme + criteriaCheck), id `qia` dans `ScoringService`.
- Icône : `qia.svg` — ⚠️ placeholder (copie de `gad-7.svg`).

---

## 12. Historique des modifications

| Date | Auteur | Modification |
|------|--------|--------------|
| 16/07/2026 | Adrien (avec Claude) | Création : entrée `Scale` (id `qia`, `options` 0-8 + `openingTextItem`), scorer somme 0-80 + criteriaCheck TAG, nouvelle brique texte libre (core + API relay + runner + résultats), icône placeholder, spec. Correction du classement benchmark (criteria, pas simple somme). |
