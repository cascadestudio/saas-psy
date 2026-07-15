# Test spec — SPIN

<!--
Voir _TEMPLATE.md pour les règles projet (sourcing, copyright, FR-only,
hiérarchie versions, comparaison Mentaal).
-->

---

## 1. Métadonnées produit

| Champ | Valeur |
|-------|--------|
| **Nom court** | SPIN |
| **Nom complet (FR)** | Inventaire de phobie sociale |
| **Nom complet (langue originale)** | Social Phobia Inventory |
| **Thème principal** | Anxiété sociale |
| **Sous-thèmes / tags** | phobie sociale, anxiété sociale, peur, évitement, symptômes physiologiques |
| **Nombre d'items** | 17 items scorés |
| **Durée estimée de passation** | 3–5 min |
| **Public cible** | Adultes (≥ 18 ans). |
| **Mode d'administration** | auto |
| **Note sur le mode d'administration** | Auto-questionnaire, passation papier, en ligne ou en entretien. Période de référence : semaine écoulée. |
| **Description praticien (bibliothèque)** | Échelle d'auto-évaluation de 17 items pour mesurer la sévérité de l'anxiété sociale (peur, évitement, symptômes physiologiques) sur la semaine écoulée. |
| **Description patient (portail)** | AUCUNE — règle projet : le portail patient ne comporte pas de description de l'échelle. Seule la consigne officielle (section 4) est affichée. |

---

## 2. Sources et traçabilité

### Source primaire

- **Type** : formulaires officiels du SPIN (mise en page distributeur), items anglais originaux de Davidson.
- **Référence complète** : Davidson, J. R. T. et al. *Social Phobia Inventory (SPIN)*. Duke University. Version 17 items, cotation 0–4 sur la semaine écoulée.
- **Fichiers fournis** : trois PDF anglais concordants (formulaire standard Davidson © 1995/2008/2015, formulaire Carepatron, formulaire Duke), items identiques.
- **Date de consultation** : 15/07/2026

### Source de la version française

- **Type** : ⚠️ **traduction Melya (non validée cliniquement)**. Aucune version française officielle/validée n'a pu être sourcée à ce jour.
- **Méthode** : traduction calée au plus près de l'anglais original des PDF, en repartant d'une paraphrase FR circulant en ligne (chmpsy.com / Wikipédia FR) mais en **corrigeant les divergences** relevées (notamment items 11, 13, 17 qui déformaient le sens de l'original).
- **URL de cross-check** : https://fr.wikipedia.org/wiki/Inventaire_de_phobie_sociale · https://chmpsy.com/2022/07/18/spin-un-test-pour-evaluer-la-phobie-sociale/
- **Statut** : **à faire valider par un·e psychologue référent·e avant usage clinique réel.** Voir section 10.

### Divergences constatées entre sources

Les 3 PDF anglais sont **strictement concordants** sur les 17 items et la cotation.

La paraphrase FR en ligne (chmpsy.com) diverge de l'original sur plusieurs items — **non retenue telle quelle** :

| Item | Anglais original (PDF) | Paraphrase FR en ligne (écartée) | FR Melya retenu |
|---|---|---|---|
| 11 | I avoid having to give speeches | « J'évite de parler en public » | « J'évite d'avoir à faire des discours » |
| 13 | Heart palpitations bother me when I am around people | « …avec des **inconnus** » (contresens) | « Les palpitations cardiaques me gênent quand je suis entouré de gens » |
| 17 | Trembling or shaking in front of others is distressing to me | « Que les autres me voient **hésiter, rougir** ou trembler… » (ajout hors source) | « Trembler devant les autres me perturbe » |

Les libellés de réponse de la paraphrase (Absent/Léger/…) sont également faux : la cotation SPIN est *Pas du tout / Un peu / Modérément / Beaucoup / Extrêmement*.

---

## 3. Statut copyright et licence

| Champ | Valeur |
|-------|--------|
| **Statut** | propriétaire / restreint |
| **Détenteur des droits** | Jonathan R. T. Davidson (© 1995, 2008, 2015), Duke University. |
| **Mention obligatoire à afficher** | *« Social Phobia Inventory (SPIN) — © Jonathan R. T. Davidson, 1995, 2008, 2015, Duke University. Toute reproduction est soumise à l'autorisation du détenteur des droits (mail@cd-risc.com). »* |
| **Emplacement de la mention (règle projet)** | Côté patient : écran de fin de passation (post-soumission), texte gris discret, une fois. Côté praticien : fiche du questionnaire en bibliothèque. |
| **Restrictions d'usage** | ⚠️ Les formulaires portent une mention explicite : *« Permission to use the SPIN must be obtained from the copyright holder at mail@cd-risc.com. The SPIN may not be reproduced or transmitted in any form… without permission in writing. »* La reproduction ET la transmission (envoi patient) nécessitent donc en principe une autorisation écrite. |
| **Décision Melya** | **go** — arbitrage produit d'Adrien (15/07/2026) d'intégrer l'échelle malgré la restriction. À régulariser auprès du détenteur des droits (`mail@cd-risc.com`) si Melya passe en diffusion réelle. |

---

## 4. Structure de l'échelle

### Consigne officielle (affichée au patient avant les items)

> *« Indiquez à quel point les problèmes suivants vous ont gêné(e) au cours de la semaine écoulée. Répondez à tous les items en choisissant une seule réponse par ligne. »*

**Source de la consigne** : traduction de la consigne des PDF (« Please indicate how much the following problems have bothered you during the past week. Mark only one box for each problem, and be sure to answer all items. »).

### Comportement UX de la consigne

| Champ | Valeur |
| --- | --- |
| **Persistance** | persistante (fallback par défaut sur `instructions`) |
| **Emplacement** | en-tête au-dessus du bloc d'items |
| **Cas particuliers** | Aucun |

### Affichage du titre côté portail patient

| Champ | Valeur |
| --- | --- |
| **Élément affiché en titre sur le PDF source** | « Social Phobia Inventory (SPIN) » (anglais) |
| **Sous-titre à afficher dans l'app (`patientIntroSubtitle`)** | `null` — masqué côté portail patient. Choix : (a) le PDF est en anglais, non affichable en l'état dans une app FR ; (b) éviter d'exposer au patient l'étiquette « phobie sociale » sur l'écran d'intro. Aligné sur le précédent GAD-7. |

### Dimensions de cotation

**Dimension unique — Intensité**

- Plage : 0 à 4
- Modalités :
  - `0` — Pas du tout
  - `1` — Un peu
  - `2` — Modérément
  - `3` — Beaucoup
  - `4` — Extrêmement

---

## 5. Items

### Variante A — Items à modalités de réponse uniformes

| # | Item (FR Melya) | Anglais original |
|---|------|------|
| 1 | J'ai peur des personnes qui ont de l'autorité | I am afraid of people in authority |
| 2 | Le fait de rougir devant les gens me dérange | I am bothered by blushing in front of people |
| 3 | Les fêtes et les événements sociaux me font peur | Parties and social events scare me |
| 4 | J'évite de parler à des personnes que je ne connais pas | I avoid talking to people I don't know |
| 5 | Être critiqué m'effraie beaucoup | Being criticized scares me a lot |
| 6 | La peur d'être gêné me pousse à éviter de faire des choses ou de parler aux gens | Fear of embarrassment causes me to avoid doing things or speaking to people |
| 7 | Transpirer devant les autres me perturbe | Sweating in front of people causes me distress |
| 8 | J'évite d'aller aux fêtes | I avoid going to parties |
| 9 | J'évite les activités où je suis le centre de l'attention | I avoid activities in which I am the centre of attention |
| 10 | Parler à des inconnus me fait peur | Talking to strangers scares me |
| 11 | J'évite d'avoir à faire des discours | I avoid having to give speeches |
| 12 | Je ferais n'importe quoi pour éviter d'être critiqué | I would do anything to avoid being criticized |
| 13 | Les palpitations cardiaques me gênent quand je suis entouré de gens | Heart palpitations bother me when I am around people |
| 14 | J'ai peur de faire des choses quand les gens pourraient me regarder | I am afraid of doing things when people might be watching |
| 15 | Être gêné ou avoir l'air stupide fait partie de mes pires craintes | Being embarrassed or looking stupid is among my worst fears |
| 16 | J'évite de parler à toute personne ayant de l'autorité | I avoid speaking to anyone in authority |
| 17 | Trembler devant les autres me perturbe | Trembling or shaking in front of others is distressing to me |

**Répartition par domaine** (Connor et al., 2000) : peur (items 1, 3, 5, 10, 14, 15), évitement (items 4, 6, 8, 9, 11, 12, 16), symptômes physiologiques (items 2, 7, 13, 17). Melya ne calcule pas ces sous-scores — score total uniquement.

---

## 6. Algorithme de scoring

### Calcul du score total

**Score total = somme des 17 items.** Plage : 0 à 68.

### Subscores calculés

Aucun. Les trois domaines (peur / évitement / physiologique) existent dans la littérature mais ne sont pas restitués comme sous-scores dans Melya.

### Inversions d'items

Aucune. Tous les items sont cotés dans le même sens (score élevé = anxiété sociale plus marquée).

### Gestion des réponses manquantes

Refus de la passation incomplète. Les 17 items sont requis ; pas d'imputation. La soumission est bloquée tant qu'un item est manquant.

---

## 7. Seuils d'interprétation

| Score | Interprétation |
|-------|----------------|
| 0–20  | Pas d'anxiété sociale |
| 21–30 | Anxiété sociale légère |
| 31–40 | Anxiété sociale modérée |
| 41–50 | Anxiété sociale sévère |
| 51–68 | Anxiété sociale très sévère |

**Source des seuils** : grille de sévérité standard du SPIN (None / Mild / Moderate / Severe / Very severe), présente sur les formulaires Davidson et reprise par la littérature (Connor et al., 2000).

**Remarques** :

- Un des PDF affiche « None = Less than 20 », ce qui laisse la valeur 20 dans un trou entre *None* et *Mild (21–30)*. Melya rattache **20 à « Pas d'anxiété sociale » (0–20)**, cohérent avec la grille standard.
- Un seuil clinique de dépistage à **≥ 19** est parfois cité dans la littérature pour suspecter une phobie sociale. Melya ne l'implémente pas comme alerte — seule la grille de sévérité en 5 niveaux est utilisée.

---

## 8. Alertes cliniques

Aucune. Le score total seul détermine la sévérité ; aucun item ne déclenche d'alerte autonome.

---

## 9. Cas de test unitaires

### 1. Cas limites (min/max)

| # | Réponses | Score | Sévérité |
|---|----------|-------|----------|
| T1 | 17 × `0` | 0 | Pas d'anxiété sociale |
| T2 | 17 × `4` | 68 | Anxiété sociale très sévère |

### 2. Transitions de seuil (chaque borne testée des deux côtés)

| # | Score visé | Sévérité attendue |
|---|------------|-------------------|
| T3 | 20 | Pas d'anxiété sociale |
| T4 | 21 | Anxiété sociale légère |
| T5 | 30 | Anxiété sociale légère |
| T6 | 31 | Anxiété sociale modérée |
| T7 | 40 | Anxiété sociale modérée |
| T8 | 41 | Anxiété sociale sévère |
| T9 | 50 | Anxiété sociale sévère |
| T10 | 51 | Anxiété sociale très sévère |

### 3. Entrées invalides

| # | Cas | Comportement attendu |
|---|-----|----------------------|
| T11 | Valeur hors borne : item 1 = 5 | Erreur de validation |
| T12 | Valeur négative : item 1 = -1 | Erreur de validation |
| T13 | Réponse manquante : item 3 absent | Erreur de validation — 17 items requis |
| T14 | Tableau de 16 ou 18 réponses | Erreur de validation |

---

## 10. Points à valider avec le·la psychologue référent·e

1. **Traduction des 17 items** — la version FR ci-dessus est une **traduction Melya, non validée**. Faire relire chaque item, en particulier :
   - item 6 (formulation longue restructurée depuis « Fear of embarrassment causes me to avoid… »),
   - item 13 (« quand je suis entouré de gens » — bien vérifier que « around people » n'est pas rendu par « inconnus »),
   - item 17 (« Trembler devant les autres me perturbe » — sans l'ajout « hésiter/rougir » de la paraphrase en ligne).
2. **Libellés de sévérité** — valider *Pas d'anxiété sociale / légère / modérée / sévère / très sévère*.
3. **Seuil 20** — confirmer le rattachement de la valeur 20 à « Pas d'anxiété sociale ».
4. **Copyright** — statuer sur la régularisation auprès de `mail@cd-risc.com` avant diffusion réelle.

---

## 11. Contrat technique

### Signature de scoring

```typescript
scoreSpin(scale, responses) → {
  totalScore: number,        // 0–68
  maxScore: 68,
  interpretation: string,    // libellé de sévérité
  severityIndex: number,
  severityRangeCount: 5
}
```

### Notes d'implémentation

- `formType: "single-scale"`, clés de réponse `intensity_0 … intensity_16`.
- Scorer `apps/api/src/scoring/scorers/spin.ts` (somme des `intensity_`), enregistré sous l'id `spin` dans `ScoringService`. Logique identique au GAD-7 (aucune inversion, aucune alerte).
- Icône : `apps/web/public/images/scales/spin.svg` — ⚠️ **placeholder** (copie de `lsas.svg`) à remplacer par un doodle dédié.

---

## 12. Historique des modifications

| Date | Auteur | Modification |
|------|--------|--------------|
| 15/07/2026 | Adrien (avec Claude) | Création de l'échelle SPIN : entrée `Scale` dans `packages/core`, scorer `spin.ts` + enregistrement, icône placeholder, spec. Items anglais issus des 3 PDF fournis (concordants). Version FR = traduction Melya non validée, corrigeant les divergences d'une paraphrase en ligne (items 11/13/17). Seuils standard 5 niveaux (0–20 / 21–30 / 31–40 / 41–50 / 51–68). Copyright propriétaire (Davidson) : intégration décidée par Adrien malgré la restriction, à régulariser avant diffusion réelle. |
