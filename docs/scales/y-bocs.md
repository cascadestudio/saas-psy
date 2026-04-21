# Test spec — Y-BOCS (Échelle Yale-Brown des Obsessions et des Compulsions)

## Sources utilisées

**Source primaire** : Goodman, W. K., Price, L. H., Rasmussen, S. A., Mazure, C., Fleischmann, R. L., Hill, C. L., Heninger, G. R., & Charney, D. S. (1989). *The Yale-Brown Obsessive Compulsive Scale. I. Development, use, and reliability*. Archives of General Psychiatry, 46(11), 1006–1011.

**Statut copyright** : à sourcer. L'échelle est largement reproduite en recherche clinique ; aucune mention de licence libre n'a été trouvée dans le code ni dans les docs du repo. À vérifier avant toute diffusion commerciale.

**Version française** : à sourcer. Le code ne précise pas quelle traduction française est utilisée. La version francophone la plus diffusée est celle traduite par Mollard, Cottraux & Bouvard (1989) — à confirmer avec la clinicienne.

**Référence des seuils** : Goodman et al. (1989) et la littérature de suivi (Kim et al., 1990 ; Storch et al., 2010). Les cinq niveaux implémentés (0–7 / 8–15 / 16–23 / 24–31 / 32–40) correspondent aux seuils standards de la publication originale — à vérifier formellement.

---

## Structure de l'échelle

- **10 items** (5 obsessions + 5 compulsions), chacun coté de **0 à 4**
- Consigne en deux parties :
  - _Items 1–5 (obsessions)_ : « Les questions 1 à 5 ont trait à vos obsessions. **Les obsessions** sont des idées, des images ou des impulsions qui s'insinuent dans votre esprit contre votre gré en dépit de vos efforts pour leur résister… »
  - _Items 6–10 (compulsions)_ : « Les questions 6 à 10 ont trait à vos comportements compulsifs. **Les compulsions** sont des actes que le sujet est poussé à accomplir pour atténuer son angoisse ou son malaise… »
- Chaque item propose **5 options ordinales** (0 à 4), avec des libellés distincts par item.

## Items et options (libellés exacts tels qu'implémentés dans le code)

### Obsessions (items 1–5)

**Item 1 — Temps accaparé par les pensées obsédantes**
| Valeur | Libellé |
|--------|---------|
| 0 | Aucune |
| 1 | Moins d'une heure par jour/occasionnelles |
| 2 | Entre une et trois heures par jour/fréquentes |
| 3 | Entre trois et huit heures par jour/très fréquentes |
| 4 | Plus de huit heures par jour/presque constantes |

**Item 2 — Interférence causée par les pensées obsédantes**
| Valeur | Libellé |
|--------|---------|
| 0 | Aucune interférence |
| 1 | Nuisent un peu à mes activités sociales ou autres, mais ne m'empêchent pas de fonctionner normalement |
| 2 | Nuisent sans aucun doute à mes activités sociales ou professionnelles, mais j'arrive quand même à fonctionner |
| 3 | Nuisent considérablement à ma vie sociale ou à mon travail |
| 4 | M'empêchent de fonctionner |

**Item 3 — Détresse occasionnée par les pensées obsédantes**
| Valeur | Libellé |
|--------|---------|
| 0 | Pas du tout |
| 1 | Un peu |
| 2 | À un niveau tolérable |
| 3 | Énormément |
| 4 | Je me sens presque constamment dans un état de détresse invalidante |

**Item 4 — Résistance opposée aux obsessions**
| Valeur | Libellé |
|--------|---------|
| 0 | J'essaie toujours de leur résister |
| 1 | J'essaie de leur résister la plupart du temps |
| 2 | Je fais certains efforts pour leur résister |
| 3 | Je cède à toutes mes obsessions sans essayer de les dominer, mais un peu à contrecœur |
| 4 | Je cède complètement et volontairement à toutes mes obsessions |

**Item 5 — Degré d'emprise sur les pensées obsédantes**
| Valeur | Libellé |
|--------|---------|
| 0 | Je les maîtrise complètement |
| 1 | J'arrive généralement à les refreiner ou à les détourner avec des efforts et de la concentration |
| 2 | J'arrive parfois à les refréner ou à les détourner |
| 3 | J'arrive rarement et avec peine à les refréner ou à les chasser de mon esprit |
| 4 | Je n'ai aucune emprise sur mes obsessions, j'arrive rarement à détourner mon attention même momentanément |

### Compulsions (items 6–10)

**Item 6 — Temps accaparé par les comportements compulsifs**
| Valeur | Libellé |
|--------|---------|
| 0 | Aucune |
| 1 | Moins d'une heure par jour/occasionnels |
| 2 | Entre une et trois heures par jour/fréquents |
| 3 | Entre trois et huit heures par jour/très fréquents |
| 4 | Plus de huit heures par jour/presque constants (trop nombreux pour les compter) |

**Item 7 — Interférence causée par les comportements compulsifs**
| Valeur | Libellé |
|--------|---------|
| 0 | Aucune interférence |
| 1 | Nuisent un peu à mes activités sociales ou autres, mais ne m'empêchent pas de fonctionner normalement |
| 2 | Nuisent sans aucun doute à mes activités sociales ou professionnelles, mais j'arrive quand même à fonctionner |
| 3 | Nuisent considérablement à ma vie sociale ou à mon travail |
| 4 | M'empêchent de fonctionner |

**Item 8 — Détresse occasionnée par les comportements compulsifs**
| Valeur | Libellé |
|--------|---------|
| 0 | Je ne me sentirais nullement angoissé(e) |
| 1 | Je me sentirais un peu angoissé(e) |
| 2 | Je me sentirais angoissé(e) mais à un niveau tolérable |
| 3 | Je me sentirais très angoissé(e) |
| 4 | Je me sentirais extrêmement angoissé(e) au point d'être incapable de fonctionner |

**Item 9 — Résistance opposée aux compulsions**
| Valeur | Libellé |
|--------|---------|
| 0 | J'essaie toujours de leur résister |
| 1 | J'essaie de leur résister la plupart du temps |
| 2 | Je fais certains efforts pour leur résister |
| 3 | Je cède à toutes mes compulsions sans essayer de les dominer, mais un peu à contrecœur |
| 4 | Je cède complètement et volontairement à toutes mes compulsions |

**Item 10 — Degré d'emprise sur les compulsions**
| Valeur | Libellé |
|--------|---------|
| 0 | Je les maîtrise complètement |
| 1 | Je me sens poussé(e) à accomplir un acte compulsif mais j'arrive généralement à me dominer |
| 2 | Je ressens une forte envie d'accomplir un acte compulsif mais j'arrive à me dominer avec beaucoup d'efforts |
| 3 | J'éprouve un besoin pressant d'accomplir un acte compulsif, j'arrive seulement à en retarder l'accomplissement et avec peine |
| 4 | J'éprouve un besoin irrésistible d'accomplir un acte compulsif, je n'ai aucune emprise sur mes compulsions, j'arrive rarement à me retenir ne serait-ce que quelques instants |

## Calcul du score

**Score total = somme des 10 items** (plage : 0 à 40)

Implémenté dans `calculateOptionsScore` (`apps/api/src/scoring/calculators/options.ts`). Les réponses sont lues sous les clés `option_0` à `option_9`.

> **Note** : le `scoring.method` dans la définition de l'échelle mentionne des sous-totaux obsessions (items 1–5) et compulsions (items 6–10), mais **ces subscores ne sont pas calculés** par `calculateOptionsScore` qui retourne uniquement `totalScore` + `maxTotal` + `interpretation`. Incohérence à traiter — voir section « Incohérences détectées ».

## Seuils de sévérité

| Score | Interprétation |
|-------|----------------|
| 0–7   | Symptômes sous-cliniques |
| 8–15  | TOC léger |
| 16–23 | TOC modéré |
| 24–31 | TOC sévère |
| 32–40 | TOC extrême |

## Alertes cliniques

Aucune alerte implémentée sur item individuel. Le score total seul détermine l'interprétation.

À noter pour le practicien : les items 4 et 9 (Résistance) sont sémantiquement inversés — un score élevé indique un abandon de la résistance (état cliniquement plus grave). Cette direction est cohérente avec les autres items (score élevé = plus sévère) mais peut prêter à confusion à la lecture. Aucun traitement spécial dans le code.

---

## Cas de test

### 1. Cas limites (min/max)

| #  | Réponses (10 items)          | Score | Obsessions (1–5) | Compulsions (6–10) | Interprétation |
|----|------------------------------|-------|------------------|--------------------|----------------|
| T1 | `[0,0,0,0,0,0,0,0,0,0]`     | 0     | 0                | 0                  | Symptômes sous-cliniques |
| T2 | `[4,4,4,4,4,4,4,4,4,4]`     | 40    | 20               | 20                 | TOC extrême |

### 2. Transitions de seuil (chaque borne testée des deux côtés)

| #  | Score visé | Exemple de réponses | Interprétation attendue |
|----|------------|---------------------|-------------------------|
| T3 | 7  | `[2,2,1,1,1,0,0,0,0,0]` (somme = 7) | Symptômes sous-cliniques |
| T4 | 8  | `[2,2,1,1,1,1,0,0,0,0]` (somme = 8) | TOC léger |
| T5 | 15 | `[3,3,3,3,3,0,0,0,0,0]` (somme = 15) | TOC léger |
| T6 | 16 | `[3,3,3,3,3,1,0,0,0,0]` (somme = 16) | TOC modéré |
| T7 | 23 | `[3,3,3,3,3,3,3,2,1,1]` (somme = 23) | TOC modéré |
| T8 | 24 | `[3,3,3,3,3,3,3,2,2,1]` (somme = 24) | TOC sévère |
| T9 | 31 | `[4,4,4,3,4,3,3,3,3,2]` (somme = 31) | TOC sévère |
| T10| 32 | `[4,4,4,3,4,3,3,3,3,3]` (somme = 32) | TOC extrême |

### 3. Cas typique

| #   | Réponses | Score | Obsessions | Compulsions | Interprétation |
|-----|----------|-------|------------|-------------|----------------|
| T11 | `[2,2,2,1,1,2,2,2,1,1]` | 16 | 8 | 8 | TOC modéré |
| T12 | `[3,2,3,2,2,3,2,3,2,2]` | 24 | 12 | 12 | TOC sévère |

### 4. Entrées invalides (doivent être rejetées avec erreur explicite)

| #   | Cas | Comportement attendu |
|-----|-----|----------------------|
| T13 | Valeur hors borne : item 1 = 5 | Erreur de validation |
| T14 | Valeur négative : item 3 = -1 | Erreur de validation |
| T15 | Réponse manquante : item 5 absent | Erreur de validation — les 10 items sont requis |
| T16 | Valeur non numérique : item 2 = "modéré" | Erreur de validation |
| T17 | Tableau de 9 réponses au lieu de 10 | Erreur de validation |
| T18 | Tableau de 11 réponses | Erreur de validation |

---

## Incohérences détectées

1. **Subscores obsessions/compulsions non calculés** : le champ `scoring.method` dans `packages/core/src/scales/index.ts` indique explicitement que « les scores sont divisés en sous-totaux pour les obsessions (items 1–5) et les compulsions (items 6–10) », mais `calculateOptionsScore` ne les calcule pas et ne les retourne pas dans `ScoreResult`. La Y-BOCS clinique standard présente toujours les deux subscores séparément (Goodman 1989). C'est un manque fonctionnel à corriger.

2. **Clé de réponse `bdi_*` dans `calculateOptionsScore`** : le calculateur filtre `option_* | bdi_*`. Le préfixe `bdi_*` est utilisé par l'échelle BDI (qui partage `formType: "options"`). Pour la Y-BOCS, seul `option_*` est pertinent. Pas un bug mais un couplage implicite à documenter.

## Points à valider

### À sourcer

1. **Seuils de sévérité** — les cinq bornes (7/15/23/31) correspondent aux seuils standards de Goodman et al. (1989) mais leur source n'est pas annotée dans le code.
2. **Version française** — préciser la traduction utilisée et sa validation psychométrique.

### À valider avec Renata

1. **Libellés des items** — confirmer que la formulation française correspond à la traduction utilisée en pratique (Mollard/Cottraux/Bouvard ou autre).
2. **Items 4 et 9 (Résistance)** — valider que le sens inversé (0 = résistance totale = meilleur score) est bien compris par les patients en auto-passation. Pas d'inversion mathématique dans le code — c'est sémantique uniquement.
3. **Affichage des subscores** — l'interface doit-elle présenter le sous-total obsessions et le sous-total compulsions séparément ?
4. **Gestion des réponses manquantes** — passation refusée si un item manque ?

## À implémenter par Adrien

18 cas de test unitaires sur la fonction de scoring Y-BOCS. Contrat attendu (après correction des subscores) :

```
scoreYbocs(réponses: number[]) → {
  scoreTotal: number,
  scoreObsessions: number,       // somme items 1–5 (index 0–4)
  scoreCompulsions: number,      // somme items 6–10 (index 5–9)
  interprétation: "Symptômes sous-cliniques" | "TOC léger" | "TOC modéré" | "TOC sévère" | "TOC extrême"
}
```

Erreurs de validation levées avec un message explicite.
