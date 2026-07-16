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

### Cross-check

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

---

## 6. Algorithme de scoring

Somme simple des 8 items. **Plage : 0-32.** Réponses incomplètes refusées.

---

## 7. Seuils d'interprétation

| Score | Interprétation |
|-------|----------------|
| 0–7 | Pas de trouble de l'usage repéré |
| 8–10 | Consommation de cannabis possiblement problématique |
| 11–32 | Trouble de l'usage du cannabis possible |

**Source des seuils** : flyer RESPADD — « De 8 à 10 points : consommation peut être problématique ; au-delà de 10 points : trouble important de l'usage possible ».

---

## 8. Alertes cliniques

Aucune.

---

## 9. Cas de test unitaires

| # | Score | Niveau |
|---|-------|--------|
| T1 | 0 | Pas de trouble repéré |
| T2 | 7 | Pas de trouble repéré |
| T3 | 8 | Possiblement problématique |
| T4 | 10 | Possiblement problématique |
| T5 | 11 | Trouble possible |
| T6 | 32 (max) | Trouble possible |

Vérifiés dans le script de recette (40/40 PASS, 16/07/2026).

---

## 10. Points à valider avec le·la psychologue référent·e

1. **Question-porte en consigne** (décision produit) — valider que l'envoi ciblé par le praticien suffit.
2. Libellés des trois bandes.
3. « défoncé(e) » — terme du flyer officiel, à confirmer pour le portail patient.

---

## 11. Contrat technique

- `formType: "options"`, clés `option_0 … option_7`.
- Scorer `apps/api/src/scoring/scorers/cudit.ts`, id `cudit-r` dans `ScoringService`.
- Icône : `cudit-r.svg` — ⚠️ placeholder (copie de `audit.svg`, catégorie Addictions).

---

## 12. Historique des modifications

| Date | Auteur | Modification |
|------|--------|--------------|
| 16/07/2026 | Adrien (avec Claude) | Création : entrée `Scale` (`options`, 8 items), scorer somme 0-32 (seuils 8/11), icône placeholder, spec. Items flyer RESPADD, question-porte portée en consigne (décision produit). |
