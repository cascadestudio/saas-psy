# Test spec — [NOM COURT] ([Nom complet de l'échelle en FR])

<!--
Template canonique Melya — fiche d'échelle psychométrique.

Règle générale : ce fichier est la SOURCE DE VÉRITÉ interne pour tout ce qui
concerne l'échelle dans l'app Melya. Ce qui est ici doit matcher 1:1 ce qui
est implémenté dans le code, affiché dans l'UI, et validé par un.e practicien.ne.

Public visé : Clément (relecteur primaire), Adrien (implémentation),
équipe Melya en interne. Pas de relecture directe par les praticiens —
la validation clinique se fait sur staging.

Règle de remplissage :
- `[À REMPLIR]` → champ obligatoire non renseigné
- `[OPTIONNEL]` → section à supprimer si non applicable
- `[À SOURCER]` → info présente mais sans référence confirmée, à lever avant prod
- `[À VALIDER PRACTICIEN]` → à trancher en session clinique

Règle de sourcing (rappel projet) :
2 sources indépendantes minimum, SAUF si une source faisant autorité
incontestable suffit à elle seule (ex. Pfizer pour PHQ-9/GAD-7). Dans ce
cas, justifier explicitement pourquoi une seule source est acceptée.

Toute donnée de l'échelle (consignes, items, labels de réponse, labels de
sévérité) DOIT être en français uniquement.

Règles projet (s'appliquent à toutes les specs) :
1. Nom complet (FR) = libellé exact du PDF source primaire. Pas de traduction inventée.
2. Hiérarchie versions FR retenues : France > Suisse > Belgique > Canada.
3. Mention copyright obligatoire :
   - Côté patient : écran de fin de passation, gris discret, une fois.
   - Côté praticien : fiche du questionnaire (bibliothèque).
4. Comparaison Mentaal systématique sur chaque spec : version FR, seuils, divergences visibles.
-->

---

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | [À REMPLIR — ex. PHQ-9, LSAS-SR] |
| **Nom complet (FR)** | [À REMPLIR] |
| **Nom complet (langue originale)** | [À REMPLIR — pour traçabilité, ne s'affiche pas dans l'app] |
| **Thème principal** | [À REMPLIR — ex. Dépression, Anxiété sociale, TOC, Traumatismes, Estime de soi, Anxiété généralisée] |
| **Sous-thèmes / tags** | [OPTIONNEL — ex. pour la LSAS : "anxiété sociale", "phobie sociale"] |
| **Nombre d'items** | [À REMPLIR] |
| **Durée estimée de passation** | [À REMPLIR — ex. 5-10 min] |
| **Public cible** | [À REMPLIR — ex. adultes, adolescents 12-17 ans, enfants 6-12 ans] |
| **Mode d'administration** | [À REMPLIR — `auto` / `hétéro` / `mixte`] |
| **Note sur le mode d'administration** | [OPTIONNEL — à remplir si consensus d'usage auto sur échelle hétéro, ou autre nuance notable. Ex. pour la LSAS-SR : "Version auto-évaluation validée de la LSAS originale (hétéro)."] |
| **Description praticien (bibliothèque)** | [À REMPLIR — 1-2 phrases factuelles visibles dans le catalogue côté praticien. Ex. "Échelle de 24 items évaluant la peur et l'évitement dans les situations sociales et de performance."] |
| **Description patient (portail)** | AUCUNE — règle projet : le portail patient ne comporte pas de description de l'échelle. Seule la consigne officielle (ci-dessous) est affichée. |

---

## 2. Sources et traçabilité

<!--
Règle : minimum 2 sources indépendantes, sauf exception "autorité unique"
explicitement justifiée. Chaque source doit avoir : URL directe, date de
consultation, type, auteur/éditeur.
-->

### Source primaire

- **Type** : [publication peer-reviewed FR / site officiel auteur / éditeur officiel]
- **Référence complète** : [À REMPLIR — format académique standard avec auteurs, année, titre, revue/éditeur, pages]
- **URL** : [À REMPLIR — lien direct vers le PDF ou la page]
- **Date de consultation** : [À REMPLIR — format JJ/MM/AAAA]

### Source de cross-check

<!--
Obligatoire dans le cas général. Si omise pour cause d'"autorité unique",
remplacer cette sous-section par un paragraphe "Exception de sourcing"
qui justifie pourquoi une seule source suffit.
-->

- **Type** : [institutionnel FR / clinique reconnu / manuel TCC de référence]
- **Référence complète** : [À REMPLIR]
- **URL** : [À REMPLIR]
- **Date de consultation** : [À REMPLIR]

### Divergences constatées entre sources

<!--
À remplir si les sources diffèrent sur quoi que ce soit : libellé d'item,
cotation, seuils, type de catégorisation. Ex. pour la LSAS : item 21
catégorisé (P) dans Psychiaclic mais (S) dans Yao et al. 1999 / Retz.
Si aucune divergence : écrire "Aucune divergence détectée."
-->

[À REMPLIR ou "Aucune divergence détectée."]

### Version française retenue

- **Traducteur(s)** : [À REMPLIR]
- **Année de la traduction** : [À REMPLIR]
- **Publication de validation française** : [À REMPLIR — référence académique]
- **Justification du choix** (si plusieurs versions FR existent) : [OPTIONNEL]

---

## 3. Statut copyright et licence

| Champ                               | Valeur                                                                           |
| ----------------------------------- | -------------------------------------------------------------------------------- |
| **Statut**                          | [À REMPLIR — `libre` / `mention obligatoire` / `licence payante` / `zone grise`] |
| **Détenteur des droits**            | [À REMPLIR ou "Domaine public"]                                                  |
| **Mention obligatoire à afficher**  | [OPTIONNEL — ex. "© Pfizer Inc."]                                               |
| **Restrictions d'usage commercial** | [À REMPLIR — ex. "Aucune" / "Licence Pro à acquérir"]                            |
| **Décision Melya**                  | [À REMPLIR — `go` / `bloqué`]                                                    |

### Suivi des démarches externes [OPTIONNEL — à remplir si `bloqué`]

<!--
Section à remplir quand l'échelle est `bloqué` en attente d'une démarche
externe : contact avec les auteurs, demande de licence, recherche du
détenteur des droits, etc.

Tant que cette démarche n'a pas abouti, l'échelle reste `bloqué` et ne
doit pas passer en prod, même si techniquement elle est implémentable.

Cette section sert de tableau de bord minimal pour suivre l'avancement
directement dans la fiche, sans document parallèle.
-->

- **Motif du blocage** : [À REMPLIR — ex. "Détenteur des droits non identifié"]
- **Contact en cours** : [OPTIONNEL — nom / email / date du dernier échange]
- **Prochaine action** : [OPTIONNEL — ex. "Relance prévue fin mai 2026"]
- **Date de dernière mise à jour du suivi** : [À REMPLIR]

---

## 4. Structure de l'échelle

### Consigne officielle (affichée au patient avant les items)

<!--
Cette consigne DOIT provenir d'une des sources référencées ci-dessus.
Si plusieurs formulations existent dans la littérature, retenir celle de la
version française validée. Si aucune consigne n'est présente dans les sources,
l'indiquer explicitement et soumettre à Renata pour formulation.
-->

> _« [À REMPLIR — consigne exacte] »_

**Source de la consigne** : [À REMPLIR — référence précise parmi les sources de la section 2]

### Comportement UX de la consigne

| Champ                    | Valeur                                                                     |
| ------------------------ | -------------------------------------------------------------------------- |
| **Persistance**          | [À REMPLIR — `persistante` / `page_de_garde_seule` / `spécifique`]        |
| **Emplacement**          | [À REMPLIR — ex. "en-tête au-dessus du bloc d'items"]                     |
| **Justification**        | [OBLIGATOIRE si `persistante` n'est pas la valeur retenue]                 |
| **Cas particuliers**     | [OPTIONNEL — ex. Y-BOCS : deux consignes distinctes selon bloc]            |

### Dimensions de cotation

<!--
Certaines échelles n'ont qu'une dimension (PHQ-9, GAD-7, PCL-5, RSES, Y-BOCS),
d'autres en ont plusieurs (LSAS = anxiété + évitement).
Cette sous-section doit lister chaque dimension avec ses modalités.
-->

**Dimension 1 — [NOM]**

- Plage : 0 à N
- Modalités :
  - `0` — [libellé FR]
  - `1` — [libellé FR]
  - ...

**Dimension 2 — [NOM]** [OPTIONNEL]

- Plage : ...
- Modalités : ...

---

## 5. Items

<!--
Tableau unique listant tous les items en français.
Colonnes adaptées au besoin selon l'échelle :
- Pour échelles à catégories (LSAS) : colonne "Type" (P/S ou équivalent)
- Pour échelles avec items inversés (RSES) : colonne "Sens" (positif/négatif)
- Pour échelles avec libellés de réponse spécifiques par item (Y-BOCS) :
  utiliser la structure alternative décrite plus bas.

Les libellés sont les libellés EXACTS tels qu'ils doivent apparaître dans l'app.
Toute modification nécessite re-validation clinique.
-->

### Variante A — Items à modalités de réponse uniformes (cas standard)

| #   | Item        | [Type / Sens / Catégorie — optionnel] |
| --- | ----------- | ------------------------------------- |
| 1   | [À REMPLIR] | [si applicable]                       |
| 2   | [À REMPLIR] |                                       |
| ... |             |                                       |

### Variante B — Items avec libellés de réponse spécifiques (cas Y-BOCS)

<!--
À utiliser uniquement si chaque item a ses propres libellés de réponses
(comme la Y-BOCS). Sinon utiliser la Variante A.
-->

**Item 1 — [Titre de l'item]**

> [Énoncé exact de l'item]

| Valeur | Libellé     |
| ------ | ----------- |
| 0      | [À REMPLIR] |
| 1      | [À REMPLIR] |
| ...    |             |

[Répéter pour chaque item]

---

## 6. Algorithme de scoring

### Calcul du score total

[À REMPLIR — formule explicite, ex. "Somme des 9 items." Ou plus complexe si subscores, inversions, etc.]

**Plage du score total** : [À REMPLIR — ex. 0 à 27]

### Subscores calculés [OPTIONNEL]

<!--
Liste chaque subscore avec sa formule et sa plage. À utiliser si l'échelle
comporte des sous-dimensions (LSAS, Y-BOCS, etc.).
Préciser si chaque subscore est AFFICHÉ dans l'UI ou juste CALCULÉ
(cf. note sur la Y-BOCS actuelle : calculs existants mais non exposés).
-->

| Subscore | Formule   | Plage     | Affiché dans l'UI |
| -------- | --------- | --------- | ----------------- |
| [Nom]    | [Formule] | [Min–Max] | [oui/non]         |

**Source de la définition des subscores** : [À REMPLIR uniquement si l'échelle comporte des subscores. Doit indiquer la référence qui définit la répartition des items entre subscores. Ex. pour LSAS : "Yao S.N. et al. (1999), L'Encéphale, 25:429-435 — catégorisation Performance/Sociale des 24 items selon la version française validée." — Si pas de subscores : "Sans objet (pas de subscores)."]

### Inversions d'items [OPTIONNEL]

<!--
À remplir si l'échelle comporte des items inversés (RSES : items 3, 5, 8, 9, 10).
Préciser la règle de transformation.
-->

- **Items concernés** : [À REMPLIR]
- **Règle d'inversion** : [À REMPLIR — ex. "1 → 4, 2 → 3, 3 → 2, 4 → 1"]

### Gestion des réponses manquantes

[À REMPLIR — règle explicite. Recommandation projet : refuser la passation incomplète plutôt qu'imputer une valeur par défaut. À confirmer cas par cas avec Renata.]

---

## 7. Seuils d'interprétation

<!--
Règle stricte : chaque jeu de seuils doit pointer vers une source explicite
(section 2). Si les seuils sont contestés dans la littérature (cas LSAS :
Psychiaclic dit explicitement "pas de valeur-seuil démontrée"), le signaler.
Les libellés de sévérité doivent être en français clinique standard.
-->

| Score                   | Interprétation                          |
| ----------------------- | --------------------------------------- |
| [borne inf]–[borne sup] | [À REMPLIR — ex. "Dépression minimale"] |
| ...                     | ...                                     |

**Source des seuils** :

| Champ | Valeur |
| --- | --- |
| **Référence académique** | [À REMPLIR — citation académique complète] |
| **URL directe vérifiable** | [À REMPLIR — lien vers PDF, PubMed Central, fiche officielle, etc.] |
| **Date de consultation** | [À REMPLIR — format JJ/MM/AAAA] |
| **Niveau de consensus** | [À REMPLIR — `référence universelle` / `consensus partiel` / `propre à la version FR` / `controversé`] |

**Remarques sur les seuils** : [OPTIONNEL — ex. pour la LSAS : "Psychiaclic précise l'absence de valeur-seuil démontrée. Seuils issus des études anglophones, utilisés à titre indicatif pour le suivi longitudinal."]

---

## 8. Alertes cliniques [OPTIONNEL]

<!--
Section à conserver uniquement si l'échelle comporte un item (ou combinaison)
qui doit déclencher une alerte côté praticien INDÉPENDAMMENT du score total.
Ex. PHQ-9 item 9 (idéation suicidaire).
Si aucune alerte : écrire "Aucune alerte spécifique."
-->

**Règle d'alerte** : [À REMPLIR — ex. "Si item 9 ≥ 1, drapeau `alerteSuicide` = true, indépendamment du score total."]

**Source de la règle d'alerte** :

| Champ | Valeur |
| --- | --- |
| **Référence** | [À REMPLIR — recommandation HAS, NICE, publication académique, ou "Choix Melya basé sur pratique clinique courante"] |
| **URL** | [À REMPLIR si applicable, ou "Sans objet" si choix interne Melya] |
| **Date de consultation** | [À REMPLIR — format JJ/MM/AAAA, ou "Sans objet" si choix interne] |
| **Justification du seuil exact** | [À REMPLIR — expliquer pourquoi ce seuil précis et pas un autre] |

**Comportement côté UI** : [À REMPLIR — ex. "Badge rouge sur la fiche patient côté praticien. Aucune mention côté patient."]

**Rationale clinique** : [À REMPLIR — ex. "Un score total faible avec idéation suicidaire reste une urgence clinique."]

---

## 9. Cas de test unitaires

<!--
Tests structurés par catégorie :
1. Cas limites (min/max)
2. Transitions de seuil (chaque borne testée des deux côtés — c'est celui
   qui attrape les off-by-one dans le scoring)
3. Cas typiques (sanity check)
4. Cas spécifiques à l'échelle (inversion RSES, alerte PHQ-9 item 9,
   subscores LSAS, etc.)
5. Entrées invalides (rejet avec erreur explicite — jamais de score à 0 silencieux)

Format : tableau avec #, description/réponses, score attendu, interprétation attendue.
-->

### 1. Cas limites (min/max)

| #   | Réponses    | Score       | Interprétation |
| --- | ----------- | ----------- | -------------- |
| T1  | [à remplir] | [à remplir] | [à remplir]    |
| T2  | [à remplir] | [à remplir] | [à remplir]    |

### 2. Transitions de seuil

[Tableau — chaque borne des seuils de la section 7 doit avoir un test des deux côtés.]

### 3. Cas typiques (sanity check)

[Tableau — au moins un cas réaliste de passation moyenne.]

### 4. Cas spécifiques à l'échelle [OPTIONNEL]

[Tableau — inversions, alertes, subscores, cotations multi-dimensions, etc.]

### 5. Entrées invalides

| #   | Cas                  | Comportement attendu                           |
| --- | -------------------- | ---------------------------------------------- |
| T?  | Valeur hors borne    | Erreur de validation, pas de score calculé     |
| T?  | Valeur négative      | Erreur de validation                           |
| T?  | Réponse manquante    | Erreur de validation — les N items sont requis |
| T?  | Valeur non numérique | Erreur de validation                           |
| T?  | Tableau trop court   | Erreur de validation                           |
| T?  | Tableau trop long    | Erreur de validation                           |

---

## 10. Points à valider avec Renata

<!--
Liste actionnable, à agréger pour la session de validation clinique
groupée. Chaque point doit être formulé comme une question fermée ou
un choix binaire/ternaire, pas en "réfléchir à X".
-->

1. [À REMPLIR]
2. [À REMPLIR]
3. ...

---

## 11. Contrat technique pour Adrien

### Signature de la fonction de scoring

```typescript
// Adapter selon les spécificités de l'échelle
scoreXXX(réponses: number[]) → {
  scoreTotal: number,
  [subscores éventuels]: number,
  interprétation: "[libellés exacts de la section 7]",
  [alertes éventuelles]: boolean
}
```

### Contrat d'erreur

- Erreurs de validation levées avec un **message explicite** (pas un score à 0 silencieux).
- Toute entrée invalide (cf. section 9.5) doit produire une erreur typée, pas un crash non géré.

### Clés de réponse attendues [OPTIONNEL]

<!--
À remplir si le format d'entrée n'est pas un simple tableau
(cas LSAS : { anxiety: [...], avoidance: [...] }).
-->

[À REMPLIR si applicable]

### Notes d'implémentation [OPTIONNEL]

<!--
Spécificités techniques — ex. plage de cotation différente (RSES = 1-4 vs
0-3 ailleurs), partage de calculateur générique avec une autre échelle
(BDI / Y-BOCS qui partagent `calculateOptionsScore`), etc.
-->

[À REMPLIR si applicable]

---

## 12. Historique des modifications

<!--
Journal daté pour tracer qui a validé quoi et quand. Format court,
chronologique (du plus récent au plus ancien).

Types d'entrées recommandés :
- Création initiale du spec
- Validation clinique Renata (avec date et périmètre validé)
- Modification d'un item / seuil / source suite à feedback
- Changement de version (ex. passage LSAS → LSAS-SR)

Cette section est cruciale pour la rigueur long terme : dans 6 mois, pouvoir
retracer pourquoi un libellé est celui-ci et pas un autre.
-->

| Date         | Auteur               | Modification |
| ------------ | -------------------- | ------------ |
| [JJ/MM/AAAA] | [Clément/Renata/...] | [À REMPLIR]  |
