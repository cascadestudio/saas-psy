# Test spec — PCL-5 (Liste de Vérification du TSPT)

## Sources utilisées

**Source primaire** : *PCL-5 (PTSD Checklist for DSM-5)*, National Center for PTSD — U.S. Department of Veterans Affairs. Accessible sur https://www.ptsd.va.gov/professional/assessment/adult-sr/ptsd-checklist.asp

**Statut copyright** : instrument du domaine public (gouvernement fédéral américain). Reproduction et distribution libres ; aucune permission formelle requise.

**Version française** : à sourcer. Le code ne précise pas quelle traduction française est utilisée. La traduction officielle validée la plus répandue est celle de Weathers et al. (2013) adaptée en français par le CNRS/INSERM — à confirmer avec la clinicienne.

**Référence de seuil** : Weathers, F. W., Litz, B. T., Keane, T. M., Palmieri, P. A., Marx, B. P., & Schnurr, P. P. (2013). *The PTSD Checklist for DSM-5 (PCL-5)*. Le seuil de 33 utilisé dans le code est celui recommandé par le National Center for PTSD pour le dépistage — à sourcer explicitement.

---

## Structure de l'échelle

- **20 items**, chacun coté de **0 à 4**
- Consigne : _« Dans le dernier mois, dans quelle mesure avez-vous été affecté par : »_
- Modalités de réponse :
  - `0` — Pas du tout
  - `1` — Un peu
  - `2` — Modérément
  - `3` — Beaucoup
  - `4` — Extrêmement

## Items (libellés exacts tels qu'implémentés dans le code)

| #  | Item |
|----|------|
| 1  | Des souvenirs répétés, pénibles et involontaires de l'expérience stressante ? |
| 2  | Des rêves répétés et pénibles de l'expérience stressante ? |
| 3  | Se sentir ou agir soudainement comme si vous viviez à nouveau l'expérience stressante ? |
| 4  | Se sentir mal quand quelque chose vous rappelle l'événement ? |
| 5  | Avoir de fortes réactions physiques lorsque quelque chose vous rappelle l'événement (accélération cardiaque, difficulté respiratoire, sudation) ? |
| 6  | Essayer d'éviter les souvenirs, pensées, et sentiments liés à l'événement ? |
| 7  | Essayer d'éviter les personnes et les choses qui vous rappellent l'expérience stressante (lieux, personnes, activités, objets) ? |
| 8  | Des difficultés à vous rappeler des parties importantes de l'événement ? |
| 9  | Des croyances négatives sur vous-même, les autres, le monde (des croyances comme : je suis mauvais, j'ai quelque chose qui cloche, je ne peux avoir confiance en personne, le monde est dangereux) ? |
| 10 | Vous blâmer ou blâmer quelqu'un d'autre pour l'événement ou ce qui s'est produit ensuite ? |
| 11 | Avoir des sentiments négatifs intenses tels que peur, horreur, colère, culpabilité, ou honte ? |
| 12 | Perdre de l'intérêt pour des activités que vous aimiez auparavant ? |
| 13 | Vous sentir distant ou coupé des autres ? |
| 14 | Avoir du mal à éprouver des sentiments positifs (par exemple être incapable de ressentir de la joie ou de l'amour envers vos proches) ? |
| 15 | Comportement irritable, explosions de colère, ou agir agressivement ? |
| 16 | Prendre des risques inconsidérés ou encore avoir des conduites qui pourraient vous mettre en danger ? |
| 17 | Être en état de « super-alerte », hyper vigilant ou sur vos gardes ? |
| 18 | Sursauter facilement ? |
| 19 | Avoir du mal à vous concentrer ? |
| 20 | Avoir du mal à trouver le sommeil ou à rester endormi ? |

## Calcul du score

**Score total = somme des 20 items** (plage : 0 à 80)

Implémenté dans `calculateSingleScaleScore` (`apps/api/src/scoring/calculators/single-scale.ts`). Les réponses sont lues sous les clés `intensity_0` à `intensity_19`.

## Seuils de sévérité

| Score | Interprétation |
|-------|----------------|
| 0–32  | Pas de trouble de stress post-traumatique |
| 33–80 | Présence éventuelle d'un trouble de stress post-traumatique |

> **Note** : le code implémente uniquement deux niveaux (dépistage binaire). La littérature propose des découpages plus fins. Voir section « Points à valider ».

## Alertes cliniques

Aucune alerte implémentée sur item individuel. Le score total seul détermine l'interprétation.

À noter pour le practicien : l'item 16 (conduites à risque) peut avoir une valeur clinique propre indépendamment du score total. Aucun drapeau technique n'est actuellement défini dans le code.

---

## Cas de test

### 1. Cas limites (min/max)

| #  | Réponses (20 items)                             | Score | Interprétation |
|----|-------------------------------------------------|-------|----------------|
| T1 | `[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]`  | 0     | Pas de TSPT |
| T2 | `[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]`  | 80    | Présence éventuelle de TSPT |

### 2. Transitions de seuil (borne des deux côtés)

| #  | Score visé | Exemple de réponses | Interprétation attendue |
|----|------------|---------------------|-------------------------|
| T3 | 32         | `[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0]` (16×2) | Pas de TSPT |
| T4 | 33         | `[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0]` (16×2+1) | Présence éventuelle de TSPT |

### 3. Cas typiques

| #  | Réponses                                          | Score | Interprétation |
|----|---------------------------------------------------|-------|----------------|
| T5 | `[2,2,3,2,1,2,2,1,2,1,2,1,2,1,1,0,1,1,1,1]`     | 30    | Pas de TSPT |
| T6 | `[3,3,3,2,2,2,2,2,2,2,2,1,2,2,2,1,2,2,2,2]`     | 41    | Présence éventuelle de TSPT |
| T7 | `[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,1]` (somme = 33) | 33 | Présence éventuelle de TSPT |

### 4. Entrées invalides (doivent être rejetées avec erreur explicite)

| #   | Cas                                            | Comportement attendu |
|-----|------------------------------------------------|----------------------|
| T8  | Valeur hors borne : item 1 = 5                 | Erreur de validation, pas de score calculé |
| T9  | Valeur négative : item 1 = -1                  | Erreur de validation |
| T10 | Réponse manquante (item 10 = `null` ou absent) | Erreur de validation — les 20 items sont requis |
| T11 | Valeur non numérique : item 3 = "beaucoup"     | Erreur de validation |
| T12 | Tableau de 19 réponses au lieu de 20           | Erreur de validation |
| T13 | Tableau de 21 réponses                         | Erreur de validation |

---

## Points à valider

### À sourcer

1. **Version française utilisée** — le code ne documente pas quelle traduction française est implémentée. À confirmer : est-ce la traduction du National Center for PTSD, ou une autre version validée en France ?
2. **Seuil de 33** — le code documente ce seuil mais pas sa référence précise. Weathers et al. (2013) recommandent ce seuil pour le dépistage DSM-5 ; d'autres proposent 31–33 selon les populations. À sourcer et annoter dans le code.

### À valider avec Renata

1. **Deux niveaux seulement** — l'implémentation offre un dépistage binaire (TSPT probable / non). En pratique clinique, un découpage en 4–5 niveaux de sévérité faciliterait le suivi longitudinal. Décision produit : rester sur 2 niveaux ou enrichir ?
2. **Libellés des 20 items** — confirmer que la formulation correspond à la traduction française utilisée en pratique.
3. **Gestion des réponses manquantes** — passation refusée si un item manque, ou imputation ?

## À implémenter par Adrien

13 cas de test unitaires sur la fonction de scoring PCL-5. Contrat attendu :

```
scorePcl5(réponses: number[]) → {
  scoreTotal: number,
  interprétation: "Pas de trouble de stress post-traumatique" | "Présence éventuelle d'un trouble de stress post-traumatique"
}
```

Erreurs de validation levées avec un message explicite.
