# Test spec — RSES (Échelle d'Estime de Soi de Rosenberg)

## Sources utilisées

**Source primaire** : *Échelle d'Estime de Soi (ÉES-10)*, traduction française validée par Vallières & Vallerand, 1990 — PDF hébergé par le LRCS (Laboratoire de Recherche sur le Comportement Social, UQAM).
URL : https://www.lrcs.uqam.ca/wp-content/uploads/2017/08/ees_en.pdf — consulté le 21 avril 2026.

**Publication de validation** : Vallières, É. F., & Vallerand, R. J. (1990). *Traduction et validation canadienne-française de l'Échelle de l'Estime de Soi de Rosenberg*. International Journal of Psychology, 25, 305-316.

**Source de cross-check** : IFEMDR — https://www.ifemdr.fr/echelle-destime-de-soi/ — consulté le 21 avril 2026. Items strictement identiques.

**Statut copyright** : © Évelyne F. Vallières et Robert J. Vallerand, 1990. Usage clinique toléré (l'échelle est largement diffusée sur des plateformes institutionnelles et cliniques francophones). À surveiller : aucune mention explicite de licence libre — à distinguer du cas Pfizer.

---

## Structure de l'échelle

- **10 items**, chacun coté de **1 à 4** (Likert)
- Consigne : *« Pour chacune des caractéristiques ou descriptions suivantes, indiquez à quel point chacune est vraie pour vous en encerclant le chiffre approprié. »*
- Modalités de réponse :
  - `1` — Tout à fait en désaccord
  - `2` — Plutôt en désaccord
  - `3` — Plutôt en accord
  - `4` — Tout à fait en accord

**Note importante pour Adrien** : cotation 1-4 (pas 0-3 comme les échelles Pfizer). Le schéma JSON et la fonction de scoring doivent supporter des plages de cotation différentes selon l'échelle.

## Items (libellés exacts à utiliser dans l'app)

| # | Item | Sens |
|---|------|------|
| 1 | Je pense que je suis une personne de valeur, au moins égale à n'importe qui d'autre. | positif |
| 2 | Je pense que je possède un certain nombre de belles qualités. | positif |
| 3 | Tout bien considéré, je suis porté(e) à me considérer comme un(e) raté(e). | **négatif (inversé)** |
| 4 | Je suis capable de faire les choses aussi bien que la majorité des gens. | positif |
| 5 | Je sens peu de raisons d'être fier(e) de moi. | **négatif (inversé)** |
| 6 | J'ai une attitude positive vis-à-vis moi-même. | positif |
| 7 | Dans l'ensemble, je suis satisfait(e) de moi. | positif |
| 8 | J'aimerais avoir plus de respect pour moi-même. | **négatif (inversé)** |
| 9 | Parfois je me sens vraiment inutile. | **négatif (inversé)** |
| 10 | Il m'arrive de penser que je suis un(e) bon(ne) à rien. | **négatif (inversé)** |

## Calcul du score

**Étape 1** — Inverser la cote pour les items 3, 5, 8, 9, 10 selon la règle :
- `1 → 4`
- `2 → 3`
- `3 → 2`
- `4 → 1`

**Étape 2** — Score total = somme des 10 items après inversion des items négatifs.

**Plage du score total** : 10 à 40. Un score plus élevé indique une estime de soi plus élevée.

## Interprétation du score

Pas de seuils d'interprétation affichés. L'app restitue uniquement le **score brut (10-40)** avec la mention : *« Plus le score est élevé, plus l'estime de soi est élevée. »*

Ce choix est motivé par l'absence de seuils officiels validés dans la publication originale Vallières & Vallerand (1990). Les seuils qui circulent en ligne sont des conventions d'usage sans consensus scientifique. L'interprétation clinique reste du ressort du practicien.

## Alertes cliniques

Aucune alerte spécifique sur item individuel.

---

## Cas de test

### 1. Cas limites (min/max)

| # | Réponses brutes | Score après inversion | Score total |
|---|----------------|----------------------|-------------|
| T1 | `[1,1,4,1,4,1,1,4,4,4]` | toutes les réponses interprétées comme estime minimale | 10 |
| T2 | `[4,4,1,4,1,4,4,1,1,1]` | toutes les réponses interprétées comme estime maximale | 40 |

### 2. Test de l'inversion (critique)

| # | Cas | Comportement attendu |
|---|-----|----------------------|
| T3 | Tous les items à 1 (réponse brute uniforme) | Score = 5×1 + 5×4 = 25 (les 5 items négatifs s'inversent en 4) |
| T4 | Tous les items à 4 (réponse brute uniforme) | Score = 5×4 + 5×1 = 25 |
| T5 | Tous les items à 2 | Score = 5×2 + 5×3 = 25 |
| T6 | Tous les items à 3 | Score = 5×3 + 5×2 = 25 |

Les T3 à T6 vérifient que le scoring compense bien les inversions. Un bug classique d'implémentation d'inversion : oublier la transformation sur un ou plusieurs items, ou l'appliquer deux fois.

### 3. Cas typiques

| # | Réponses brutes | Détail du calcul | Score total |
|---|----------------|------------------|-------------|
| T7 | `[3,3,2,3,2,3,3,2,2,2]` | pos: 3+3+3+3+3=15, neg: (5→2)+(5→2)+(5→2)+(5→2)+(5→2) = inversion de 2→3 soit 3+3+3+3+3=15 | 30 |
| T8 | `[4,4,2,3,2,4,3,2,2,2]` | pos: 4+4+3+4+3=18, neg inversés: 3+3+3+3+3=15 | 33 |

### 4. Entrées invalides (doivent être rejetées avec erreur explicite)

| # | Cas | Comportement attendu |
|---|-----|----------------------|
| T9 | Valeur hors borne : item 1 = 5 | Erreur de validation |
| T10 | Valeur hors borne : item 1 = 0 | Erreur de validation (plage = 1-4, pas 0-4) |
| T11 | Valeur négative : item 1 = -1 | Erreur de validation |
| T12 | Réponse manquante : item 5 absent | Erreur de validation — les 10 items sont requis |
| T13 | Valeur non numérique : item 1 = "oui" | Erreur de validation |
| T14 | Tableau de 9 réponses | Erreur de validation |
| T15 | Tableau de 11 réponses | Erreur de validation |

---

## À valider avec Renata

1. **Libellés des 10 items** — confirmer que la formulation Vallières & Vallerand (version canadienne-française de 1990) convient à une pratique française contemporaine. Pas de version française de France validée équivalente à notre connaissance.
2. **Gestion des réponses manquantes** — passation refusée si un item manque.
3. **Usage clinique du RSES en TCC** — l'échelle est-elle généralement re-passée pour suivi longitudinal ? Si oui, afficher l'évolution du score dans l'app a du sens ; sinon, c'est un one-shot.

## À implémenter par Adrien

Au minimum 15 cas de test unitaires sur la fonction de scoring RSES. Contrat de la fonction :

```
scoreRses(réponses: number[]) → {
  scoreTotal: number
}
```

**Spécificités à prévoir dans l'implémentation** :
- Plage de cotation 1-4 (différent des PHQ-9/GAD-7 en 0-3) → le schéma JSON commun des échelles doit supporter cette variation.
- Règle d'inversion sur items 3, 5, 8, 9, 10 → cas de test dédiés T3 à T6.
- Erreurs de validation levées avec un message explicite (pas un score silencieux).
