# Test spec — LSAS (Échelle d'Anxiété Sociale de Liebowitz)

## Sources utilisées

**Source primaire** : Liebowitz, M. R. (1987). *Social phobia*. Modern Problems of Pharmacopsychiatry, 22, 141–173.

**Statut copyright** : à sourcer. L'échelle est largement diffusée en recherche clinique ; aucune mention de licence libre n'a été trouvée dans le code ni dans les docs du repo. À vérifier avant toute diffusion commerciale.

**Version française** : à sourcer. Le code ne précise pas quelle traduction française est utilisée. Plusieurs versions validées existent (Yao et al., 1999 ; Bouvard & Cottraux, 2002) — à confirmer avec la clinicienne.

**Référence des seuils** : à sourcer. Les seuils implémentés (55 / 65 / 80) ne sont pas documentés dans le code. Les seuils les plus cités en littérature pour la version auto-administrée diffèrent selon les études — à vérifier.

---

## Structure de l'échelle

- **24 items**, chacun évalué selon **deux dimensions** :
  - **Anxiété** (peur ressentie) : 0 à 3
  - **Évitement** (fréquence d'évitement) : 0 à 3
- Consigne : _« Évaluez votre niveau d'anxiété et d'évitement pour chaque situation »_
- Modalités de réponse — **Anxiété** :
  - `0` — Aucune
  - `1` — Légère
  - `2` — Moyenne
  - `3` — Sévère
- Modalités de réponse — **Évitement** :
  - `0` — Jamais (0%)
  - `1` — Occasionnellement (1-33%)
  - `2` — Fréquemment (34-67%)
  - `3` — Habituellement (68-100%)

Chaque item contribue donc de 0 à 6 au score total (anxiété + évitement).

## Items (libellés exacts tels qu'implémentés dans le code)

Les items sont classés en deux types : **performance** (P) et **interaction** (I).
Répartition dans le code : **13 items performance**, **11 items interaction**.

| #  | Item | Type |
|----|------|------|
| 1  | Téléphoner en public | P |
| 2  | Participer à un petit groupe | I |
| 3  | Manger dans un lieu public | P |
| 4  | Boire en compagnie dans un lieu public | P |
| 5  | Parler à des personnes qui détiennent une autorité | I |
| 6  | Jouer, donner une représentation ou une conférence devant un public | P |
| 7  | Aller à une soirée | I |
| 8  | Travailler en étant observé | P |
| 9  | Écrire en étant observé | P |
| 10 | Appeler quelqu'un que vous ne connaissez pas très bien | I |
| 11 | Parler à des personnes que vous ne connaissez pas très bien | I |
| 12 | Rencontrer des inconnus | I |
| 13 | Uriner dans des toilettes publiques | P |
| 14 | Entrer dans une pièce alors que tout le monde est déjà assis | P |
| 15 | Être le centre d'attention | P |
| 16 | Prendre la parole à une réunion | P |
| 17 | Passer un examen | P |
| 18 | Exprimer son désaccord ou sa désapprobation à des personnes que vous ne connaissez pas très bien | I |
| 19 | Regarder dans les yeux des personnes que vous ne connaissez pas très bien | I |
| 20 | Faire un compte rendu à un groupe | P |
| 21 | Essayer de séduire quelqu'un | I |
| 22 | Rapporter des marchandises dans un magasin | P |
| 23 | Donner une soirée | I |
| 24 | Résister aux pressions d'un vendeur insistant | I |

## Calcul du score

**Score total = somme des 24 scores anxiété + somme des 24 scores évitement** (plage : 0 à 144)

Implémenté dans `calculateLiebowitzScore` (`apps/api/src/scoring/calculators/liebowitz.ts`). Les réponses sont lues sous les clés `anxiety_0` à `anxiety_23` et `avoidance_0` à `avoidance_23` (index 0-based).

**Subscores calculés et exposés dans `ScoreResult`** :

| Subscore | Calcul | Plage |
|----------|--------|-------|
| `anxietyScore` | somme des 24 scores anxiété | 0–72 |
| `avoidanceScore` | somme des 24 scores évitement | 0–72 |
| `anxietyPerformanceScore` | anxiété sur les 13 items performance | 0–39 |
| `anxietyInteractionScore` | anxiété sur les 11 items interaction | 0–33 |
| `avoidancePerformanceScore` | évitement sur les 13 items performance | 0–39 |
| `avoidanceInteractionScore` | évitement sur les 11 items interaction | 0–33 |

> **Note** : ces six subscores sont calculés et retournés par la fonction mais leur affichage dans l'interface n'a pas été vérifié — à confirmer.

## Seuils de sévérité

| Score total | Interprétation |
|-------------|----------------|
| 0–54        | Anxiété sociale légère |
| 55–64       | Anxiété sociale modérée |
| 65–79       | Anxiété sociale marquée |
| 80–144      | Anxiété sociale sévère |

## Alertes cliniques

Aucune alerte implémentée sur item individuel. Le score total seul détermine l'interprétation.

---

## Cas de test

Les réponses sont décrites sous la forme `(anxiété sur N items = x, évitement sur M items = y)` pour rester lisibles. Les clés effectives sont `anxiety_0`…`anxiety_23` et `avoidance_0`…`avoidance_23`.

### 1. Cas limites (min/max)

| #  | Réponses | Score total | Interprétation |
|----|----------|-------------|----------------|
| T1 | Tous anxiété = 0, tous évitement = 0 | 0 | Anxiété sociale légère |
| T2 | Tous anxiété = 3, tous évitement = 3 | 144 | Anxiété sociale sévère |

### 2. Transitions de seuil (chaque borne testée des deux côtés)

| #  | Score visé | Construction | Interprétation attendue |
|----|------------|--------------|-------------------------|
| T3 | 54 | Tous anxiété = 1 (somme = 24), évitement : 16 items à 2, 8 items à 1 (somme = 40). Total = 64 — non. Correction : tous anxiété = 1 (24), tous évitement = 1 (24) = 48 + 6 items anxiété à 2 au lieu de 1 (+6) = 54 | Anxiété sociale légère |
| T4 | 55 | Idem T3 + 1 item supplémentaire anxiété à 2 au lieu de 1 | Anxiété sociale modérée |
| T5 | 64 | Tous anxiété = 1 (24), tous évitement = 1 (24) = 48 + 16 items anxiété à 2 au lieu de 1 (+16) = 64 | Anxiété sociale modérée |
| T6 | 65 | Idem T5 + 1 item supplémentaire | Anxiété sociale marquée |
| T7 | 79 | Tous anxiété = 1, tous évitement = 1 = 48 + 31 items à 2 au lieu de 1 (+31) = 79 | Anxiété sociale marquée |
| T8 | 80 | Idem T7 + 1 item supplémentaire | Anxiété sociale sévère |

### 3. Cas typique

| #  | Description | Score total | `anxietyScore` | `avoidanceScore` | Interprétation |
|----|-------------|-------------|----------------|------------------|----------------|
| T9 | 12 items anxiété = 2, 12 items anxiété = 1 (anxiété = 36) ; 12 items évitement = 2, 12 items évitement = 1 (évitement = 36) | 72 | 36 | 36 | Anxiété sociale marquée |

### 4. Vérification des subscores performance/interaction

| #   | Description | `anxietyPerformanceScore` | `anxietyInteractionScore` | Total anxiété |
|-----|-------------|--------------------------|--------------------------|---------------|
| T10 | Tous 13 items performance anxiété = 3, tous 11 items interaction anxiété = 0 | 39 | 0 | 39 |
| T11 | Tous 13 items performance anxiété = 0, tous 11 items interaction anxiété = 3 | 0 | 33 | 33 |

### 5. Entrées invalides (doivent être rejetées avec erreur explicite)

| #   | Cas | Comportement attendu |
|-----|-----|----------------------|
| T12 | Valeur anxiété hors borne : item 1 anxiété = 4 | Erreur de validation |
| T13 | Valeur évitement hors borne : item 1 évitement = 4 | Erreur de validation |
| T14 | Valeur négative : item 3 anxiété = -1 | Erreur de validation |
| T15 | Réponse manquante : item 7 anxiété absent | Erreur de validation — les 48 valeurs sont requises (24 anxiété + 24 évitement) |
| T16 | Valeur non numérique : item 2 évitement = "souvent" | Erreur de validation |
| T17 | 23 items anxiété au lieu de 24 | Erreur de validation |

---

## Points à valider

### À sourcer

1. **Seuils de sévérité** — les bornes 55 / 65 / 80 ne sont pas documentées dans le code. Les seuils citables en littérature pour la version auto-administrée varient selon les études (ex. : Fresco et al. 2001 proposent 30/50/60/80 pour une version clinicien). La correspondance entre la version implémentée et une validation psychométrique est à établir.
2. **Version française** — préciser la traduction utilisée et sa validation.

### Incohérence détectée

- **Subscores non affichés (à vérifier)** : la fonction `calculateLiebowitzScore` calcule et retourne six subscores (`anxietyPerformanceScore`, etc.) mais leur présence dans l'interface résultats n'est pas confirmée. Si ces subscores ne sont pas exploités, le calcul est dead code.

### À valider avec Renata

1. **Libellés des 24 items** — confirmer que la formulation correspond à la traduction française utilisée en pratique.
2. **Affichage des subscores** — est-il cliniquement utile de distinguer anxiété de performance / anxiété sociale dans la restitution ?
3. **Seuils** — valider les quatre niveaux avec une source publiée.
4. **Gestion des réponses manquantes** — passation refusée si un item manque (anxiété ou évitement) ?

## À implémenter par Adrien

17 cas de test unitaires sur la fonction de scoring LSAS. Contrat attendu :

```
scoreLsas(réponses: { anxiety: number[], avoidance: number[] }) → {
  scoreTotal: number,
  anxietyScore: number,
  avoidanceScore: number,
  anxietyPerformanceScore: number,
  anxietyInteractionScore: number,
  avoidancePerformanceScore: number,
  avoidanceInteractionScore: number,
  interprétation: "Anxiété sociale légère" | "Anxiété sociale modérée" | "Anxiété sociale marquée" | "Anxiété sociale sévère"
}
```

Erreurs de validation levées avec un message explicite.
