# Test spec — GAD-7 (Generalized Anxiety Disorder 7-item)

**Version de référence** : GAD-7, traduction française officielle Pfizer
**Source** : Spitzer, Kroenke, Williams & Löwe, 2006 - consulté le 21 avril 2026.
**Statut copyright** : libre de reproduction, traduction, affichage et distribution (aucune permission requise — mention Pfizer obligatoire)

---

## Structure de l'échelle

- **7 items**, chacun coté de **0 à 3**
- Consigne : _« Au cours des 14 derniers jours, à quelle fréquence avez-vous été dérangé(e) par les problèmes suivants ? »_
- Modalités de réponse :
  - `0` — Jamais
  - `1` — Plusieurs jours
  - `2` — Plus de la moitié des jours
  - `3` — Presque tous les jours

## Items (libellés exacts à utiliser dans l'app)

| #   | Item                                                                  |
| --- | --------------------------------------------------------------------- |
| 1   | Sentiment de nervosité, d'anxiété ou de tension                       |
| 2   | Incapable d'arrêter de vous inquiéter ou de contrôler vos inquiétudes |
| 3   | Inquiétudes excessives à propos de tout et de rien                    |
| 4   | Difficulté à se détendre                                              |
| 5   | Agitation telle qu'il est difficile de rester tranquille              |
| 6   | Devenir facilement contrarié(e) ou irritable                          |
| 7   | Avoir peur que quelque chose d'épouvantable puisse arriver            |

## Calcul du score

**Score total = somme des 7 items** (plage : 0 à 21)

## Seuils de sévérité

| Score | Sévérité |
| ----- | -------- |
| 0–4   | Minimale |
| 5–9   | Légère   |
| 10–14 | Modérée  |
| 15–21 | Sévère   |

## Alertes cliniques

Aucune alerte spécifique sur item individuel. Le score total seul détermine la sévérité.

À noter pour le practicien : un score ≥ 10 correspond au seuil clinique de suspicion de trouble anxieux généralisé (sensibilité 89 %, spécificité 82 % à ce seuil). Ce n'est pas une alerte technique mais une information d'interprétation — à laisser au jugement du practicien, pas à surligner côté app.

---

## Cas de test

### 1. Cas limites (min/max)

| #   | Réponses          | Score | Sévérité |
| --- | ----------------- | ----- | -------- |
| T1  | `[0,0,0,0,0,0,0]` | 0     | Minimale |
| T2  | `[3,3,3,3,3,3,3]` | 21    | Sévère   |

### 2. Transitions de seuils (chaque borne testée des deux côtés)

| #   | Score visé | Exemple de réponses            | Sévérité attendue |
| --- | ---------- | ------------------------------ | ----------------- |
| T3  | 4          | `[1,1,1,1,0,0,0]`              | Minimale          |
| T4  | 5          | `[1,1,1,1,1,0,0]`              | Légère            |
| T5  | 9          | `[2,2,2,1,1,1,0]` (somme = 9)  | Légère            |
| T6  | 10         | `[2,2,2,2,1,1,0]` (somme = 10) | Modérée           |
| T7  | 14         | `[3,3,2,2,2,2,0]` (somme = 14) | Modérée           |
| T8  | 15         | `[3,3,3,2,2,2,0]` (somme = 15) | Sévère            |

### 3. Entrées invalides (doivent être rejetées avec erreur explicite)

| #   | Cas                                           | Comportement attendu                              |
| --- | --------------------------------------------- | ------------------------------------------------- |
| T9  | Valeur hors borne : item 1 = 4                | Erreur de validation, pas de score calculé        |
| T10 | Valeur négative : item 1 = -1                 | Erreur de validation                              |
| T11 | Réponse manquante (item 3 = `null` ou absent) | Erreur de validation — le GAD-7 exige les 7 items |
| T12 | Valeur non numérique : item 1 = "oui"         | Erreur de validation                              |
| T13 | Tableau de 6 réponses au lieu de 7            | Erreur de validation                              |
| T14 | Tableau de 8 réponses                         | Erreur de validation                              |

### 4. Cas typique (sanity check)

| #   | Réponses          | Score | Sévérité |
| --- | ----------------- | ----- | -------- |
| T15 | `[2,2,1,2,1,1,1]` | 10    | Modérée  |

---

## À valider avec Renata

1. **Libellés des 7 items** — confirmer que la formulation Pfizer correspond à l'usage clinique français.
2. **Libellés de sévérité** — _Minimale / Légère / Modérée / Sévère_ : à confirmer.
3. **Question d'impact fonctionnel** — le GAD-7 officiel comporte une question finale sur l'impact dans la vie quotidienne qui **n'est pas scorée**. Décision produit à prendre : on l'inclut dans la passation (non scorée, pour information clinique) ou on l'exclut.
4. **Gestion des réponses manquantes** — confirmer qu'on refuse une passation incomplète plutôt que d'imputer une valeur par défaut.

## À implémenter par Adrien

15 cas de test unitaires sur la fonction de scoring GAD-7. Contrat attendu de la fonction :

```
scoreGad7(réponses: number[]) → {
  scoreTotal: number,
  sévérité: "Minimale" | "Légère" | "Modérée" | "Sévère"
}
```

Erreurs de validation levées avec un message explicite (pas un score silencieux à 0).
