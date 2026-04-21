# Test spec — PHQ-9 (Questionnaire sur la Santé du Patient)

**Version de référence** : PHQ-9, traduction française officielle Pfizer (France)
**Source** : Kroenke, Spitzer & Williams, 2001 • traduction française Arthurs et al., 2012 - consulté le 21 avril 2026.
**Statut copyright** : libre de reproduction, traduction et distribution (mention Pfizer obligatoire)

---

## Structure de l'échelle

- **9 items**, chacun coté de **0 à 3**
- Consigne : _« Au cours des 2 dernières semaines, selon quelle fréquence avez-vous été gêné(e) par les problèmes suivants ? »_
- Modalités de réponse :
  - `0` — Jamais
  - `1` — Plusieurs jours
  - `2` — Plus de la moitié du temps
  - `3` — Presque tous les jours

## Items (libellés exacts à utiliser dans l'app)

| #   | Item                                                                                                                                                                       |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Peu d'intérêt ou de plaisir à faire les choses                                                                                                                             |
| 2   | Être triste, déprimé(e) ou désespéré(e)                                                                                                                                    |
| 3   | Difficultés à s'endormir ou à rester endormi(e), ou dormir trop                                                                                                            |
| 4   | Se sentir fatigué(e) ou manquer d'énergie                                                                                                                                  |
| 5   | Avoir peu d'appétit ou manger trop                                                                                                                                         |
| 6   | Avoir une mauvaise opinion de soi-même, ou avoir le sentiment d'être nul(le), ou d'avoir déçu sa famille ou s'être déçu(e) soi-même                                        |
| 7   | Avoir du mal à se concentrer, par exemple pour lire le journal ou regarder la télévision                                                                                   |
| 8   | Bouger ou parler si lentement que les autres auraient pu le remarquer. Ou au contraire, être si agité(e) que vous avez eu du mal à tenir en place par rapport à d'habitude |
| 9   | Penser qu'il vaudrait mieux mourir ou envisager de vous faire du mal d'une manière ou d'une autre                                                                          |

## Calcul du score

**Score total = somme des 9 items** (plage : 0 à 27)

## Seuils de sévérité

| Score | Sévérité          |
| ----- | ----------------- |
| 0–4   | Minimale          |
| 5–9   | Légère            |
| 10–14 | Modérée           |
| 15–19 | Modérément sévère |
| 20–27 | Sévère            |

## Alerte clinique — Item 9

**Règle impérative** : si l'item 9 (idéation suicidaire) est coté ≥ 1, la fonction de scoring doit renvoyer un **drapeau d'alerte clinique** (`alerte_suicide: true`), **indépendamment du score total**.

Ce drapeau conditionne l'affichage d'un signal dédié côté practicien. Un score total faible avec un item 9 ≥ 1 reste une alerte.

---

## Cas de test

Chaque cas décrit : les entrées (réponses aux 9 items), le score total attendu, la sévérité attendue, et l'état de l'alerte suicide.

### 1. Cas limites (min/max)

| #   | Réponses              | Score | Sévérité | Alerte |
| --- | --------------------- | ----- | -------- | ------ |
| T1  | `[0,0,0,0,0,0,0,0,0]` | 0     | Minimale | non    |
| T2  | `[3,3,3,3,3,3,3,3,3]` | 27    | Sévère   | oui    |

### 2. Transitions de seuils (chaque borne testée des deux côtés)

Les réponses sont construites pour atteindre exactement le score cible, avec item 9 = 0 sauf mention contraire.

| #   | Score visé | Exemple de réponses                                                                     | Sévérité attendue | Alerte |
| --- | ---------- | --------------------------------------------------------------------------------------- | ----------------- | ------ |
| T3  | 4          | `[1,1,1,1,0,0,0,0,0]`                                                                   | Minimale          | non    |
| T4  | 5          | `[1,1,1,1,1,0,0,0,0]`                                                                   | Légère            | non    |
| T5  | 9          | `[1,1,1,1,1,1,1,1,1]` avec item 9 = 0 → `[1,1,1,1,2,1,1,1,0]` ou équivalent (somme = 9) | Légère            | non    |
| T6  | 10         | `[2,2,2,2,2,0,0,0,0]`                                                                   | Modérée           | non    |
| T7  | 14         | `[2,2,2,2,2,2,1,1,0]` (somme = 14)                                                      | Modérée           | non    |
| T8  | 15         | `[2,2,2,2,2,2,1,2,0]` (somme = 15)                                                      | Modérément sévère | non    |
| T9  | 19         | `[3,3,3,2,2,2,2,2,0]` (somme = 19)                                                      | Modérément sévère | non    |
| T10 | 20         | `[3,3,3,3,2,2,2,2,0]` (somme = 20)                                                      | Sévère            | non    |

### 3. Alerte suicide (item 9)

| #   | Réponses              | Score | Sévérité | Alerte  |
| --- | --------------------- | ----- | -------- | ------- |
| T11 | `[0,0,0,0,0,0,0,0,1]` | 1     | Minimale | **oui** |
| T12 | `[0,0,0,0,0,0,0,0,3]` | 3     | Minimale | **oui** |
| T13 | `[2,2,2,0,0,0,0,0,1]` | 7     | Légère   | **oui** |

### 4. Entrées invalides (doivent être rejetées avec erreur explicite)

| #   | Cas                                           | Comportement attendu                              |
| --- | --------------------------------------------- | ------------------------------------------------- |
| T14 | Valeur hors borne : item 1 = 4                | Erreur de validation, pas de score calculé        |
| T15 | Valeur négative : item 1 = -1                 | Erreur de validation                              |
| T16 | Réponse manquante (item 5 = `null` ou absent) | Erreur de validation — le PHQ-9 exige les 9 items |
| T17 | Valeur non numérique : item 1 = "oui"         | Erreur de validation                              |
| T18 | Tableau de 8 réponses au lieu de 9            | Erreur de validation                              |
| T19 | Tableau de 10 réponses                        | Erreur de validation                              |

### 5. Cas typique (sanity check)

| #   | Réponses              | Score | Sévérité | Alerte |
| --- | --------------------- | ----- | -------- | ------ |
| T20 | `[2,2,1,2,1,2,1,1,0]` | 12    | Modérée  | non    |

---

## À valider avec Renata

Un passage rapide sur cette fiche suffira :

1. **Libellés des 9 items** — confirmer que la formulation Pfizer France correspond à ce qu'elle voit/utilise en pratique clinique.
2. **Libellés de sévérité** — _Minimale / Légère / Modérée / Modérément sévère / Sévère_ : ce sont les termes français standards, à confirmer.
3. **Règle d'alerte item 9** — valider que l'alerte se déclenche dès item 9 ≥ 1, indépendamment du score total.
4. **Gestion des réponses manquantes** — confirmer qu'on refuse une passation incomplète plutôt que d'imputer une valeur par défaut.

## À implémenter par Adrien

20 cas de test unitaires sur la fonction de scoring PHQ-9. Contrat attendu de la fonction :

```
scorePhq9(réponses: number[]) → {
  scoreTotal: number,
  sévérité: "Minimale" | "Légère" | "Modérée" | "Modérément sévère" | "Sévère",
  alerteSuicide: boolean
}
```

Erreurs de validation levées avec un message explicite (pas un score silencieux à 0).
