# Test spec — CUDIT-R (Test de repérage des troubles liés à l'usage du cannabis)

<!--
Voir _TEMPLATE.md pour les règles projet (sourcing, copyright, FR-only,
hiérarchie versions, comparaison Mentaal).
-->

---

## 1. Métadonnées produit

| Champ | Valeur |
|-------|--------|
| **Nom court** | CUDIT-R |
| **Nom complet (FR)** | Test de repérage des troubles liés à l'usage du cannabis |
| **Nom complet (langue originale)** | Cannabis Use Disorder Identification Test – Revised (CUDIT-R) |
| **Thème principal** | Addictions |
| **Sous-thèmes / tags** | cannabis, trouble de l'usage, repérage, 6 derniers mois |
| **Nombre d'items** | 8 items scorés |
| **Durée estimée de passation** | 2–3 min |
| **Public cible** | Adultes ayant consommé du cannabis au cours des 6 derniers mois. |
| **Mode d'administration** | auto |
| **Note sur le mode d'administration** | ⚠️ Question-porte papier (« Avez-vous consommé du cannabis au cours des 6 derniers mois ? ») portée **dans la consigne d'intro** — voir §4. |
| **Description praticien (bibliothèque)** | Questionnaire de 8 items repérant une consommation de cannabis problématique ou un trouble de l'usage (6 derniers mois). |
| **Description patient (portail)** | AUCUNE — règle projet. |

---

## 2. Sources et traçabilité

### Source primaire (version FR retenue)

- **Type** : flyer officiel **RESPADD** (réseau de prévention des addictions) — CUDIT-R-Fr complet avec cotation et interprétation.
- **URL** : https://www.respadd.org/wp-content/uploads/2021/11/Flyer-Test-Curit-Fr-BAT3.pdf
- **Fichier de portage** : `docs/scales/cudit-r/CUDIT-R_RESPADD.pdf`
- **Date de consultation** : 16/07/2026

### Source secondaire

- **Type** : institutionnel — Centre canadien sur les dépendances et l'usage de substances (CCSA / CCDUS), guide *Cannabis : connaître ses limites* (2022), p. 5-6 ; CUDIT-R « réimprimé avec l'autorisation d'Elsevier ». Guide offert gratuitement, diffusable sans modification.
- **URL** : https://www.ccsa.ca/sites/default/files/2022-04/CCSA-Knowing-Your-Limits-with-Cannabis-Guide-2022-fr.pdf
- **Fichier de portage** : `docs/scales/cudit-r/CUDIT-R_CCSA-Connaitre-ses-limites-2022.pdf`
- **Date de consultation** : 29/09/2026
- Même traduction que le RESPADD, réponses en toutes lettres. Seuils d'origine d'Adamson (0-7 faible / 8-11 moyen / ≥ 12 élevé). Défauts : item 1, « Moins de 1 fois par mois » au lieu de « une fois par mois ou moins » (l'anglais dit « Monthly or less ») ; item 5, « à » manquant.
- Consultés, non retenus : guide RESPADD 2022 (même éditeur et même texte que le flyer) ; guide GREA (Suisse), qui porte l'ancien CUDIT, un autre instrument ; article de validation Luquiens et al. (2021), non accessible.

### Validation française

- Validation française : Luquiens, A., et al. (2021). *Validation of the French version of the CUDIT-R (CUDIT-R-Fr)…* Drug and Alcohol Review. doi:10.1111/dar.13298 (α = 0,89 ; test-retest ρ = 0,97). Référencée sur le flyer lui-même.

### Instrument original

- Adamson, S.J., Kay-Lambkin, F.J., Baker, A.L., et al. (2010). *An Improved Brief Measure of Cannabis Misuse: The CUDIT-R.* Drug and Alcohol Dependence, 110, 137-143.

### Divergences constatées entre sources

- Abréviations du flyer développées pour l'UI : « ≤ 1 fois/mois » → « Une fois par mois ou moins », « < 1 fois/mois » → « Moins d'une fois par mois », « < 1 heure » → « Moins d'une heure ».
- Item 2 : « défoncé » porté en « défoncé(e) » (accord en genre, cohérent avec le reste du catalogue).
- Seuils d'origine Adamson (≥ 8 hazardous ; ≥ 12 possible CUD) : le flyer FR retient **8-10 / > 10** — la version FR fait foi (hiérarchie France d'abord).

---

## 3. Statut copyright et licence

| Champ | Valeur |
|-------|--------|
| **Statut** | libre (instrument publié en annexe d'articles scientifiques ; version FR diffusée publiquement par le RESPADD) |
| **Détenteur des droits** | Adamson et al. (2010) ; version FR Luquiens et al. (2021). |
| **Mention obligatoire à afficher** | *« CUDIT-R — Adamson, Kay-Lambkin, Baker, Lewin, Thornton, Kelly & Sellman (2010). Version française (CUDIT-R-Fr) : Luquiens et al. (2021), Drug and Alcohol Review. Diffusion : RESPADD. »* |
| **Décision Melya** | go |

---

## 4. Structure de l'échelle

### Question-porte (décision produit, Adrien 16/07/2026)

Le support papier s'ouvre sur « Avez-vous consommé du cannabis au cours des
6 derniers mois ? OUI/NON » (si NON, pas de passation). L'app n'ayant pas de
logique conditionnelle, la porte est portée **en première ligne de la consigne
d'intro** : « Ce questionnaire s'adresse aux personnes ayant consommé du
cannabis au cours des 6 derniers mois. » — c'est le praticien qui décide de
l'envoyer. Documenté ici, pas de brique conditionnelle.

### Consigne officielle

> *« Ce questionnaire s'adresse aux personnes ayant consommé du cannabis au cours des 6 derniers mois. Répondez aux questions suivantes en choisissant la réponse qui correspond le plus à votre consommation de cannabis au cours des 6 derniers mois. Veuillez répondre à toutes les questions. »*

Rappel persistant : « Votre consommation au cours des 6 derniers mois : »

### Dimensions de cotation (`formType: "options"`)

- **Item 1** : fréquence de consommation, 0-4.
- **Item 2** : heures « défoncé(e) » un jour typique, 0-4.
- **Items 3-7** : fréquence (Jamais / Moins d'une fois par mois / Environ une fois par mois / Environ une fois par semaine / Tous les jours ou presque), 0-4.
- **Item 8** : Jamais (0) / Oui, mais pas au cours des 6 derniers mois (2) / Oui, au cours des 6 derniers mois (4). ⚠️ non linéaire.

---

## 5. Items

8 items portés depuis le flyer RESPADD (adaptations listées en §2).

Aucun intitulé court (eyebrow) : la source RESPADD n'en a pas. L'app affiche la question seule (arbitrage du 24/09/2026).

---

## 6. Algorithme de scoring

Somme simple des 8 items. **Plage : 0-32.** Réponses incomplètes refusées.

---

## 7. Seuils d'interprétation

| Score | Interprétation |
|-------|----------------|
| 0–7 | Consommation pouvant être à faible risque |
| 8–10 | Consommation de cannabis pouvant être problématique |
| 11–32 | Trouble important de l'usage de cannabis possible |

**Source des seuils** : flyer RESPADD — « De 8 à 10 points : Votre consommation de cannabis peut être problématique » ; « Au-delà de 10 points : Il est possible que vous présentiez un trouble important de l'usage de cannabis ». La tranche 0-7 n'est pas nommée par le RESPADD ; son libellé vient du CCSA (« Votre consommation pourrait être à faible risque »), dont la tranche basse couvre les mêmes scores (0-7).

---

## 8. Alertes cliniques

Aucune.

---

## 9. Cas de test unitaires

| # | Score | Niveau |
|---|-------|--------|
| T1 | 0 | Consommation pouvant être à faible risque |
| T2 | 7 | Consommation pouvant être à faible risque |
| T3 | 8 | Consommation de cannabis pouvant être problématique |
| T4 | 10 | Consommation de cannabis pouvant être problématique |
| T5 | 11 | Trouble important de l'usage de cannabis possible |
| T6 | 32 (max) | Trouble important de l'usage de cannabis possible |

Vérifiés dans le script de recette (40/40 PASS, 16/07/2026). Rejoués par `apps/api/src/scoring/scorers/cudit.spec.ts` (7/7, 29/09/2026).

---

## 10. Choix et arbitrages méthodologiques

### Écarts à la source primaire

| Élément | Source primaire | Texte retenu | Origine du texte retenu | Justification |
| --- | --- | --- | --- | --- |
| Libellés de réponse | Abréviations du flyer (« ≤ 1 fois/mois », « < 1 fois/mois », « Environ 1 fois/mois », « < 1 heure ») | « Une fois par mois ou moins », « Moins d'une fois par mois », « Environ une fois par mois », « Moins d'une heure » | Développement des abréviations | Adaptation du support et typographie, sens inchangé. Le CCSA les écrit aussi en toutes lettres (« Moins de 1 fois par mois »…), mais se trompe à l'item 1 ; nos formes suivent le sens du RESPADD et de l'anglais. Validé par Clément le 29/09/2026. |
| Item 2 | « défoncé » | « défoncé(e) » | Accord en genre | Écriture inclusive, cohérente avec le reste du catalogue ; sens inchangé. Validé par Clément le 29/09/2026. |
| Sous-titre patient | « CANNABIS USE DISORDER IDENTIFICATION TEST - REVISED - version française (CUDIT-R-Fr) » | « Cannabis Use Disorder Identification Test - Revised - version française (CUDIT-R-Fr) » | Source primaire | Casse seule ; titre de l'instrument repris tel quel. |
| Question-porte | « Avez-vous consommé du cannabis au cours des 6 derniers mois ? OUI/NON » (si NON, pas de passation) | Première phrase de la consigne : « Ce questionnaire s'adresse aux personnes ayant consommé du cannabis au cours des 6 derniers mois. » | Formulation Melya | Sens inchangé ; la question-porte est remplacée par une phrase d'information, le praticien décidant de l'envoi (l'app n'a pas de logique conditionnelle). Exception assumée à la règle du mot pour mot : choix de Clément, 29/09/2026. |
| Consigne, 2e phrase | « Si OUI, répondre aux questions suivantes relatives à votre consommation de cannabis en entourant la réponse qui correspond le plus à votre consommation au cours des 6 derniers mois. » | « Répondez aux questions suivantes en choisissant la réponse qui correspond le plus à votre consommation de cannabis au cours des 6 derniers mois. » | Formulation Melya | Reformulation, sens inchangé (« Si OUI » sans objet sans question-porte ; « en entourant » → « en choisissant », adaptation du support). Exception assumée à la règle du mot pour mot : choix de Clément, 29/09/2026. |

### Autres arbitrages

| Sujet | Choix retenu | Justification |
| --- | --- | --- |
| Seuils | Flyer RESPADD : 8-10 / > 10, plutôt que les seuils d'origine d'Adamson (8-11 / ≥ 12, repris par le CCSA) | Seuils de la validation française ; la version française fait foi (hiérarchie France d'abord). |
| Libellés des tranches | « Consommation pouvant être à faible risque » (CCSA) ; « Consommation de cannabis pouvant être problématique » et « Trouble important de l'usage de cannabis possible » (RESPADD) | Termes des sources, à la 3e personne (lus par le praticien). « important » rétabli pour la tranche haute : le premier libellé l'omettait. La tranche 0-7, non nommée par le RESPADD, reprend le CCSA, dont la tranche basse couvre les mêmes scores. |
| Rappel au-dessus des items | « Votre consommation au cours des 6 derniers mois : » | Extrait mot pour mot de la consigne source ; reproduit la présence de la consigne au-dessus des items sur le papier. Validé par Clément le 29/09/2026 (même logique que la PDEQ). |
| Nom au catalogue | « Test de repérage des troubles liés à l'usage du cannabis » | Aucune source ne donne de nom français (le titre source est en anglais). Nom descriptif choisi par Melya pour le catalogue praticien ; il apparaît aussi dans l'e-mail envoyé au patient. Validé par Clément le 29/09/2026. |
| Terme « défoncé(e) » | Conservé | Terme du flyer officiel RESPADD. |
| Intitulés courts des items | Aucun | Absents de la source RESPADD (retirés le 24/09/2026). |
| Réponses manquantes | Passation incomplète refusée, pas d'imputation | Règle projet commune à toutes les échelles. |

### Questions ouvertes

Aucune.

---

## 11. Contrat technique

- `formType: "options"`, clés `option_0 … option_7`.
- Chaque item n'a qu'un `title` = la question, sans `prompt` (pas d'eyebrow).
- Scorer `apps/api/src/scoring/scorers/cudit.ts`, id `cudit-r` dans `ScoringService`.
- Domaine : `addictions` (la couleur de la tuile en dérive, cf. `apps/web/lib/scale-appearance.ts`).

---

## 12. Historique des modifications

| Date | Auteur | Modification |
|------|--------|--------------|
| 16/07/2026 | Adrien (avec Claude) | Création : entrée `Scale` (`options`, 8 items), scorer somme 0-32 (seuils 8/11), icône placeholder, spec. Items flyer RESPADD, question-porte portée en consigne (décision produit). |
| 24/09/2026 | Clément (avec Claude) | Intitulés courts (eyebrows) retirés des 8 items : absents de la source RESPADD. Chaque item n'a plus qu'un `title` = la question ; texte des questions inchangé. |
| 29/09/2026 | Clément (avec Claude) | §10 réécrite en « Choix et arbitrages méthodologiques » : fin de la validation clinique externe, les arbitrages sont tranchés par l'équipe. Points ouverts reformulés en décisions d'équipe, avec la règle « on n'invente rien » (écarts à la source repris de la source secondaire). |
| 29/09/2026 | Clément (avec Claude) | **Recette (partie documentaire).** Source secondaire ajoutée (CCSA 2022). Consigne reformulée et question-porte conservées (choix de Clément). Libellés des tranches repris des sources (« important » rétabli, tranche 0-7 d'après le CCSA). Sous-titre patient aligné sur la source (« version française »). Rappel, abréviations développées, « défoncé(e) » et nom au catalogue conservés et consignés en §10. Tests automatisés 7/7. Recette manuelle à passer. |
