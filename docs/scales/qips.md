# Test spec — QIPS (PSWQ)

<!--
Voir _TEMPLATE.md pour les règles projet (sourcing, copyright, FR-only,
hiérarchie versions, comparaison Mentaal).
-->

---

## 1. Métadonnées produit

| Champ | Valeur |
|-------|--------|
| **Nom court** | QIPS |
| **Nom complet (FR)** | Questionnaire sur les inquiétudes du Penn State |
| **Nom complet (langue originale)** | Penn State Worry Questionnaire (PSWQ) |
| **Thème principal** | Anxiété généralisée |
| **Sous-thèmes / tags** | inquiétude, worry, tendance à s'inquiéter, TAG |
| **Nombre d'items** | 16 items scorés (dont 5 inversés) |
| **Durée estimée de passation** | 5–10 min |
| **Public cible** | Adultes (≥ 18 ans). |
| **Mode d'administration** | auto |
| **Note sur le mode d'administration** | Auto-questionnaire. Mesure la tendance générale (dispositionnelle) à s'inquiéter, sans période de référence temporelle explicite. |
| **Description praticien (bibliothèque)** | Échelle d'auto-évaluation de 16 items mesurant la tendance générale, excessive et incontrôlable à s'inquiéter — symptôme central du trouble anxieux généralisé. |
| **Description patient (portail)** | AUCUNE — règle projet : le portail patient ne comporte pas de description de l'échelle. Seule la consigne officielle (section 4) est affichée. |

---

## 2. Sources et traçabilité

### Source primaire (version FR retenue)

- **Type** : traduction française officielle **validée** — QIPS de Gosselin et al.
- **Référence complète** : Gosselin, P., Dugas, M. J., Ladouceur, R., & Freeston, M. H. (2001). *Évaluation des inquiétudes : validation d'une traduction française du Penn State Worry Questionnaire*. L'Encéphale, 27(5), 475–484.
- **Fichier de portage** : formulaire QIPS (mise en page cabinet F. Ballet) reprenant la traduction Gosselin — 16 items, consigne, échelle 1–5 « caractéristique », items inversés et cotation identifiés.
- **URL** : https://pubmed.ncbi.nlm.nih.gov/11760697/ (validation) · formulaire consulté : fabienneballet-psychologue.fr
- **Date de consultation** : 15/07/2026

### Instrument original

- Meyer, T. J., Miller, M. L., Metzger, R. L., & Borkovec, T. D. (1990). *Development and validation of the Penn State Worry Questionnaire*. Behaviour Research and Therapy, 28(6), 487–495.

### Divergences constatées entre sources

- Le libellé de l'échelle de réponse **retenu** est celui du formulaire Gosselin : *Pas du tout / Un peu / Assez / Très / Extrêmement **caractéristique***. Certaines vulgarisations en ligne raccourcissent en « Pas du tout … Extrêmement » (sans « caractéristique ») — **écarté**, car « caractéristique » traduit fidèlement l'ancre originale « typical of me » et fait partie de la version validée.

### Version française retenue

- **Traducteur(s)** : P. Gosselin, M. J. Dugas, R. Ladouceur, M. H. Freeston (2001).
- **Publication de validation française** : Gosselin et al. (2001), L'Encéphale — propriétés psychométriques excellentes (cohérence interne, validité convergente/divergente) sur populations clinique et non clinique francophones.

---

## 3. Statut copyright et licence

| Champ | Valeur |
|-------|--------|
| **Statut** | libre (usage clinique et recherche) |
| **Détenteur des droits** | Auteurs originaux (Meyer, Miller, Metzger, Borkovec, 1990) ; traduction Gosselin et al. (2001). |
| **Mention obligatoire à afficher** | *« Penn State Worry Questionnaire (PSWQ) — Meyer, Miller, Metzger & Borkovec, 1990. Traduction française (QIPS) : P. Gosselin, M. J. Dugas, R. Ladouceur & M. H. Freeston, 2001, L'Encéphale. »* |
| **Emplacement de la mention (règle projet)** | Côté patient : écran de fin de passation (post-soumission), texte gris discret, une fois. Côté praticien : fiche du questionnaire en bibliothèque. |
| **Restrictions d'usage** | Le PSWQ est largement diffusé en accès libre pour l'usage clinique et de recherche, avec attribution. |
| **Décision Melya** | go |

---

## 4. Structure de l'échelle

### Consigne officielle (affichée au patient avant les items)

> *« Veuillez utiliser l'échelle ci-dessous pour exprimer jusqu'à quel point chacun des énoncés suivants vous correspond. »*

**Source de la consigne** : formulaire QIPS Gosselin (verbatim, hors mention du report du numéro « en tête de chacun des énoncés » propre au format papier, sans objet en passation numérique).

### Comportement UX de la consigne

| Champ | Valeur |
| --- | --- |
| **Persistance** | persistante — rappel court `persistentInstructions` : « Jusqu'à quel point cet énoncé vous correspond-il ? » |
| **Emplacement** | en-tête au-dessus de l'item |
| **Justification** | La consigne complète est peu actionnable item par item ; un rappel court soutient la cotation « caractéristique ». |

### Affichage du titre côté portail patient

| Champ | Valeur |
| --- | --- |
| **Élément affiché en titre sur le formulaire source** | Nom complet français + acronyme : « Questionnaire sur les inquiétudes du Penn State (QIPS) » |
| **Sous-titre à afficher dans l'app (`patientIntroSubtitle`)** | non défini → fallback sur `label` = « Questionnaire sur les inquiétudes du Penn State ». Reproduit le formulaire source (nom complet FR affiché). |

### Dimensions de cotation

**Dimension unique — Correspondance (« caractéristique »)**

- Plage : 1 à 5
- Modalités :
  - `1` — Pas du tout caractéristique
  - `2` — Un peu caractéristique
  - `3` — Assez caractéristique
  - `4` — Très caractéristique
  - `5` — Extrêmement caractéristique

⚠️ **Cotation débutant à 1** (comme le RSES), pas à 0. Le score minimal théorique est 16 (et non 0).

---

## 5. Items

### Variante A — Items à modalités de réponse uniformes

| # | Item | Inversé |
|---|------|:---:|
| 1 | Si je n'ai pas assez de temps pour tout faire, je ne m'en inquiète pas. | ✅ |
| 2 | Mes inquiétudes me submergent. | |
| 3 | Je n'ai pas tendance à m'inquiéter à propos des choses. | ✅ |
| 4 | Plusieurs situations m'amènent à m'inquiéter. | |
| 5 | Je sais que je ne devrais pas m'inquiéter, mais je n'y peux rien. | |
| 6 | Quand je suis sous pression, je m'inquiète beaucoup. | |
| 7 | Je m'inquiète continuellement à propos de tout. | |
| 8 | Il m'est facile de me débarrasser de pensées inquiétantes. | ✅ |
| 9 | Aussitôt que j'ai fini une tâche, je commence immédiatement à m'inquiéter au sujet de toutes les autres choses que j'ai encore à faire. | |
| 10 | Je ne m'inquiète jamais. | ✅ |
| 11 | Quand je ne peux plus rien faire au sujet d'un souci, je ne m'en inquiète plus. | ✅ |
| 12 | J'ai été un inquiet tout au long de ma vie. | |
| 13 | Je remarque que je m'inquiète pour certains sujets. | |
| 14 | Quand je commence à m'inquiéter, je ne peux plus m'arrêter. | |
| 15 | Je m'inquiète tout le temps. | |
| 16 | Je m'inquiète au sujet de mes projets jusqu'à ce qu'ils soient terminés. | |

---

## 6. Algorithme de scoring

### Calcul du score total

1. **Inverser** les items 1, 3, 8, 10, 11 sur l'échelle 1–5 : `valeur_recodée = 6 − valeur`.
2. **Additionner** les 16 items recodés.

**Plage du score total** : 16 à 80.

### Inversions d'items

Items **1, 3, 8, 10, 11** (formulés dans le sens « faible inquiétude »). Formule `6 − v` (1↔5, 2↔4, 3↔3).

### Note d'implémentation importante

Le scorer RSES (échelle 1–4) utilise `5 − v`. Le QIPS est en 1–5 → formule **`6 − v`**. Scorer dédié `apps/api/src/scoring/scorers/qips.ts` (ne pas réutiliser le scorer RSES tel quel).

### Gestion des réponses manquantes

Refus de la passation incomplète. Les 16 items sont requis ; pas d'imputation.

---

## 7. Seuils d'interprétation

| Score | Interprétation |
|-------|----------------|
| 16–39 | Inquiétude faible |
| 40–54 | Inquiétude modérée |
| 55–80 | Inquiétude élevée (évocatrice d'un TAG) |

**Source des seuils** — ⚠️ **à valider** :

- Le formulaire Gosselin ne donne que deux « scores théoriques » **non contigus** : *25–40 = normal* et *55–75 = TAG*, laissant des zones sans étiquette (16–24, 41–54, 76–80).
- Melya a construit une grille **contiguë en 3 niveaux** couvrant tout l'intervalle 16–80, ancrée sur ces repères : borne haute du « normal » ≈ 40, borne basse du « TAG » = 55. La bande intermédiaire 40–54 (« modérée ») est un **choix produit Melya** pour combler le vide et permettre l'affichage de la gauge.
- **À faire valider par le·la psychologue référent·e** (voir section 10). Alternative possible : n'afficher que deux zones (normal / évocateur de TAG) sans bande intermédiaire, si la·le référent·e préfère coller strictement aux repères Gosselin.

---

## 8. Alertes cliniques

Aucune. Le score total seul détermine le niveau ; aucun item ne déclenche d'alerte autonome.

---

## 9. Cas de test unitaires

Rappel : les items 1, 3, 8, 10, 11 sont inversés (`6 − v`).

| # | Réponses | Score | Niveau |
|---|----------|-------|--------|
| T1 | Tous les items = 1 | 36 | Inquiétude faible |
| T2 | Tous les items = 5 | 60 | Inquiétude élevée |
| T3 | Tous les items = 3 | 48 | Inquiétude modérée |
| T4 | Score min réel : items normaux = 1, items inversés = 5 | 16 | Inquiétude faible |
| T5 | Score max réel : items normaux = 5, items inversés = 1 | 80 | Inquiétude élevée |

### Transitions de seuil

| # | Score | Niveau attendu |
|---|-------|----------------|
| T6 | 39 | Inquiétude faible |
| T7 | 40 | Inquiétude modérée |
| T8 | 54 | Inquiétude modérée |
| T9 | 55 | Inquiétude élevée |

### Entrées invalides

| # | Cas | Comportement attendu |
|---|-----|----------------------|
| T10 | Valeur hors borne : item 2 = 0 ou 6 | Erreur de validation |
| T11 | Réponse manquante | Erreur de validation — 16 items requis |
| T12 | Tableau de 15 ou 17 réponses | Erreur de validation |

---

## 10. Points à valider avec le·la psychologue référent·e

1. **Seuils / bandes de sévérité** — valider la grille contiguë en 3 niveaux (16–39 / 40–54 / 55–80) construite par Melya à partir des repères Gosselin non contigus (25–40 normal, 55–75 TAG). Notamment la bande intermédiaire 40–54 (« modérée ») qui est un choix produit. Alternative : affichage en 2 zones seulement.
2. **Libellés de niveaux** — valider *Inquiétude faible / modérée / élevée*.
3. **Échelle 1–5** — confirmer les libellés « … caractéristique » (version Gosselin validée) plutôt que la forme raccourcie.

---

## 11. Contrat technique

### Signature de scoring

```typescript
scoreQips(scale, responses) → {
  totalScore: number,        // 16–80
  maxScore: 80,
  interpretation: string,
  severityIndex: number,
  severityRangeCount: 3
}
```

### Notes d'implémentation

- `formType: "single-scale"`, `reverseItems: [1, 3, 8, 10, 11]`, clés de réponse `intensity_0 … intensity_15`.
- Inversion sur échelle 1–5 : `6 − v` (≠ RSES qui est `5 − v`).
- Scorer `apps/api/src/scoring/scorers/qips.ts`, enregistré sous l'id `qips` dans `ScoringService`.
- Icône : `apps/web/public/images/scales/qips.svg` — ⚠️ **placeholder** (copie de `gad-7.svg`, identique à la catégorie « Anxiété généralisée ») à remplacer par un doodle dédié.

---

## 12. Historique des modifications

| Date | Auteur | Modification |
|------|--------|--------------|
| 15/07/2026 | Adrien (avec Claude) | Création de l'échelle QIPS : entrée `Scale` dans `packages/core`, scorer `qips.ts` (inversion `6 − v`) + enregistrement, icône placeholder, spec. Items FR issus de la traduction validée Gosselin et al. (2001), portés verbatim depuis un formulaire QIPS. Inversés 1/3/8/10/11, échelle 1–5 « caractéristique », score 16–80. Grille de seuils contiguë en 3 niveaux construite par Melya à partir des repères Gosselin non contigus — à valider. |
