# Test spec — HSPS (Questionnaire d'hypersensibilité d'Elaine Aron)

<!--
Voir _TEMPLATE.md pour les règles projet (sourcing, copyright, FR-only,
hiérarchie versions, comparaison Mentaal).
-->

---

## 1. Métadonnées produit

| Champ | Valeur |
|-------|--------|
| **Nom court** | HSPS |
| **Nom complet (FR)** | Questionnaire d'hypersensibilité d'Elaine Aron |
| **Nom complet (langue originale)** | Highly Sensitive Person self-test (E. N. Aron, *The Highly Sensitive Person*, 1996) |
| **Thème principal** | Hypersensibilité |
| **Sous-thèmes / tags** | haute sensibilité, sensibilité de traitement sensoriel, HSP |
| **Nombre d'items** | 23 items scorés (OUI/NON) |
| **Durée estimée de passation** | 3–5 min |
| **Public cible** | Adultes. |
| **Mode d'administration** | auto |
| **Note sur le mode d'administration** | ⚠️ **Version portée = auto-test du livre** (23 items dichotomiques), PAS l'échelle de recherche HSPS 27 items en Likert (ni sa validation HSPS-FR 2022, sous paywall). Décision Adrien 16/07/2026. |
| **Description praticien (bibliothèque)** | Auto-test de 23 items (oui/non) issu des travaux d'Elaine Aron sur la haute sensibilité de traitement sensoriel. Outil d'auto-repérage, non diagnostique. |
| **Description patient (portail)** | AUCUNE — règle projet. |

---

## 2. Sources et traçabilité

### Source primaire (version FR retenue)

- **Type** : reproduction du test du livre d'Aron (traduction française Éditions de l'Homme), diffusée par psypersensible.com.
- **URL** : https://psypersensible.com/storage/2024/01/Test-hypersensibilite-Elaine-Aron.pdf
- **Fichier de portage** : `docs/scales/hsps/HSPS_Aron.pdf`
- **Date de consultation** : 16/07/2026

### Instrument original

- Aron, E. N. (1996). *The Highly Sensitive Person.* Broadway Books. Traduction française : *Ces gens qui ont peur d'avoir peur — Mieux comprendre l'hypersensibilité*, Éditions de l'Homme.
- Échelle de recherche associée : Aron & Aron (1997), HSPS 27 items — **non portée** (validation FR 2022 sous paywall).

### Divergences constatées entre sources

- Item 13 : point final du PDF retiré (uniformisation — aucun autre item n'en porte).
- Mentaal (#19 de leur catalogue) diffuse un « Questionnaire hypersensibilité d'Elaine Aron » — version exacte non vérifiable sans compte.

---

## 3. Statut copyright et licence

| Champ | Valeur |
|-------|--------|
| **Statut** | ⚠️ **fragile** — l'auto-test original est diffusé par l'auteure (hsperson.com) pour usage personnel ; la **traduction française est extraite d'un livre © Éditions de l'Homme**. |
| **Détenteur des droits** | Elaine N. Aron (test) ; Éditions de l'Homme (traduction FR). |
| **Mention obligatoire à afficher** | *« Questionnaire d'hypersensibilité — Elaine N. Aron, The Highly Sensitive Person (1996). Traduction française : « Ces gens qui ont peur d'avoir peur », Éditions de l'Homme. »* |
| **Restrictions d'usage** | ⚠️ **Risque assumé** (décision Adrien 16/07/2026, question posée explicitement) : la reproduction commerciale de la traduction n'a pas de clearance. À instruire avant montée en charge ; retrait facile le cas échéant. |
| **Décision Melya** | go **sous réserve** — décision de droits à confirmer avant sortie de beta. |

---

## 4. Structure de l'échelle

### Consigne officielle

> *« Répondez de la façon la plus sincère possible à chaque question. Répondez OUI si cela s'applique le plus souvent à vous. Répondez NON si cela ne s'applique pas vraiment ou pas du tout à vous. »*

### Dimensions de cotation

Dichotomique : **Oui (1) / Non (0)** — portée en `answerScales.intensity` à 2 modalités (UI single-scale standard, 2 boutons).

---

## 5. Items

23 items portés verbatim depuis le PDF psypersensible.

---

## 6. Algorithme de scoring

Nombre de OUI (somme des valeurs). **Plage : 0-23.** Réponses incomplètes refusées.

---

## 7. Seuils d'interprétation

| Score | Interprétation |
|-------|----------------|
| 0–11 | Hypersensibilité peu probable |
| 12–23 | Hypersensibilité probable |

**Source du seuil** : notation du test (« Si vous avez répondu OUI à 12 questions ou plus, vous êtes probablement hypersensible »). L'avertissement d'Aron (« aucun test psychologique n'est d'une exactitude absolue ») est repris dans la `longDescription`.

---

## 8. Alertes cliniques

Aucune.

---

## 9. Cas de test unitaires

| # | Réponses | Score | Niveau |
|---|----------|-------|--------|
| T1 | Tous NON | 0 | Peu probable |
| T2 | 11 OUI | 11 | Peu probable |
| T3 | 12 OUI | 12 | Probable |
| T4 | Tous OUI | 23 | Probable |

Vérifiés dans le script de recette (40/40 PASS, 16/07/2026).

---

## 10. Points à valider avec le·la psychologue référent·e

1. **Statut de l'outil** — auto-test grand public, non diagnostique : valider son positionnement dans le catalogue (badge ? mention ?).
2. **Droits de la traduction** (Éditions de l'Homme) — à instruire avant sortie de beta.
3. Libellés des deux bandes.

---

## 11. Contrat technique

- `formType: "single-scale"`, clés `intensity_0 … intensity_22`, modalités Oui (1) / Non (0).
- Scorer `apps/api/src/scoring/scorers/hsps.ts`, id `hsps` dans `ScoringService`.
- Icône : `hsps.svg` — ⚠️ placeholder (copie de `rses.svg`). Couleur catégorie « Hypersensibilité » : `#7FA99B` / `#C2D6CE` (nouvelle).

---

## 12. Historique des modifications

| Date | Auteur | Modification |
|------|--------|--------------|
| 16/07/2026 | Adrien (avec Claude) | Création : entrée `Scale` (single-scale OUI/NON), scorer somme 0-23 (seuil 12), icône placeholder, spec. Version = auto-test du livre (23 items), décision explicite d'Adrien malgré droits de traduction fragiles (documenté §3). |
