# Test spec — ÉII / IUS (Échelle d'intolérance à l'incertitude)

<!--
Voir _TEMPLATE.md pour les règles projet (sourcing, copyright, FR-only,
hiérarchie versions, comparaison Mentaal).
-->

---

## 1. Métadonnées produit

| Champ | Valeur |
|-------|--------|
| **Nom court** | ÉII (id technique : `eii` — référencée IUS dans le benchmark Mentaal) |
| **Nom complet (FR)** | Échelle d'intolérance à l'incertitude |
| **Nom complet (langue originale)** | L'original **est** francophone (Freeston et al., 1994) ; version anglaise dérivée : Intolerance of Uncertainty Scale (IUS). |
| **Thème principal** | Anxiété généralisée |
| **Sous-thèmes / tags** | intolérance à l'incertitude, inquiétude, TAG, modèle de Dugas |
| **Nombre d'items** | 27 items scorés (aucun inversé) |
| **Durée estimée de passation** | 5–10 min |
| **Public cible** | Adultes. |
| **Mode d'administration** | auto |
| **Description praticien (bibliothèque)** | Échelle de 27 items mesurant les réactions émotionnelles, cognitives et comportementales face à l'incertitude — mécanisme central du TAG dans le modèle de Dugas. |
| **Description patient (portail)** | AUCUNE — règle projet. |

---

## 2. Sources et traçabilité

### Source primaire (version FR retenue)

- **Type** : formulaire officiel du laboratoire des auteurs (UQO — équipe Dugas), items + fiche de cotation.
- **Référence** : *ÉII*, uqo.ca (dossier « anxiété »).
- **URL** : https://uqo.ca/sites/default/files/fichiers-uqo/anxiete/eii.pdf
- **Fichier de portage** : `docs/scales/ius/IUS_EII_UQO.pdf`
- **Date de consultation** : 16/07/2026

### Exception de sourcing — autorité unique justifiée

Le PDF UQO émane du laboratoire des auteurs originaux (Dugas) et inclut la
fiche de cotation officielle. L'instrument étant un original francophone, il
n'existe pas de « traduction » à cross-checker.

### Instrument original

- Freeston, M.H., Rhéaume, J., Letarte, H., Dugas, M.J., & Ladouceur, R. (1994). *Why do people worry?* Personality and Individual Differences, 17(6), 791-802.
- Structure bifactorielle : Sexton, K.A., & Dugas, M.J. (2009). Psychological Assessment, 21, 176-186.

### Divergences constatées entre sources

- Consigne papier « Veuillez encercler le numéro (1 à 5) approprié pour exprimer… » adaptée en « Veuillez indiquer jusqu'à quel point… » (passation numérique). Aucune autre modification.
- Français québécois assumé (original) : « Lorsque c'est le temps d'agir », « On devrait tout prévenir pour éviter les surprises ». **Porté verbatim** — à confirmer en session clinique si une adaptation France est souhaitée (ce serait alors une divergence avec la version validée).

---

## 3. Statut copyright et licence

| Champ | Valeur |
|-------|--------|
| **Statut** | libre (instrument de recherche diffusé publiquement par le laboratoire des auteurs) |
| **Détenteur des droits** | Freeston, Rhéaume, Letarte, Dugas & Ladouceur (1994). |
| **Mention obligatoire à afficher** | *« Échelle d'intolérance à l'incertitude (ÉII / IUS) — Freeston, Rhéaume, Letarte, Dugas & Ladouceur (1994), Personality and Individual Differences, 17, 791-802. Instrument original francophone. »* |
| **Décision Melya** | go |

---

## 4. Structure de l'échelle

### Consigne officielle

> *« Voici une série d'énoncés qui représentent comment les gens peuvent réagir à l'incertitude dans la vie. Veuillez indiquer jusqu'à quel point chacun des énoncés suivants correspond à vous. »*

### Comportement UX de la consigne

Rappel persistant : « Jusqu'à quel point cet énoncé correspond-il à vous ? »

### Dimensions de cotation

Likert unique 1-5 : Pas du tout / Un peu / Assez / Très / Tout à fait **correspondant**.

⚠️ **Cotation débutant à 1** — score minimal théorique = 27.

---

## 5. Items

27 items portés verbatim depuis le PDF UQO. Aucun inversé.

**Cotation bifactorielle (fiche UQO)** :
- **Facteur 1** (15 items — 1, 2, 3, 9, 12, 13, 14, 15, 16, 17, 20, 22, 23, 24, 25) : l'incertitude a des implications négatives sur la perception de soi et les comportements. Max 75.
- **Facteur 2** (12 items — 4, 5, 6, 7, 8, 10, 11, 18, 19, 21, 26, 27) : l'incertitude est injuste et gâche tout. Max 60.

_Note : sur le PDF UQO la liste du facteur 1 est tronquée à droite après « 24 » ; l'item 25 est reconstitué par complémentarité avec le facteur 2 (les deux facteurs partitionnent les 27 items — cohérent avec Sexton & Dugas 2009 et les fiches ORVIS/INLB)._

---

## 6. Algorithme de scoring

- **Score total** : somme des 27 items (unifactoriel, fiche UQO). **Plage : 27-135.**
- **Sous-scores** : facteurs 1 et 2 (somme des items listés en §5), affichés via `subscores`.
- Réponses incomplètes refusées.

---

## 7. Seuils d'interprétation

| Score | Interprétation |
|-------|----------------|
| 27–135 | Plus le score est élevé, plus l'intolérance à l'incertitude est marquée. |

**Décision produit (Adrien, 16/07/2026)** : **score brut sans bandes de sévérité** — il n'existe **aucun seuil clinique établi** pour l'ÉII-27 (la fiche UQO n'en donne pas). Une seule range descriptive (précédent : RSES) → pas de gauge à seuils. Le suivi longitudinal reste pertinent (delta de score).

---

## 8. Alertes cliniques

Aucune.

---

## 9. Cas de test unitaires

| # | Réponses | Total | F1 | F2 |
|---|----------|-------|----|----|
| T1 | Tous = 1 | 27 | 15 | 12 |
| T2 | Tous = 5 | 135 | 75 | 60 |
| T3 | Partition | F1 + F2 = total, 15 + 12 items = 27 | ✓ | ✓ |

Vérifiés dans le script de recette (40/40 PASS, 16/07/2026).

---

## 10. Points à valider avec le·la psychologue référent·e

1. **Absence de bandes de sévérité** (décision produit) — confirmer que le score brut + facteurs suffit, ou fournir des repères normatifs à afficher en texte.
2. **Québécismes** portés verbatim (items 10, 12) — garder la version validée ou adapter (⚠️ adaptation = sortie de la version validée).
3. Libellés des deux facteurs (raccourcis pour l'UI ?).

---

## 11. Contrat technique

- `formType: "single-scale"`, clés `intensity_0 … intensity_26`, échelle 1-5.
- Scorer `apps/api/src/scoring/scorers/eii.ts` (somme + 2 subscores), id `eii` dans `ScoringService`.
- Icône : `eii.svg` — ⚠️ placeholder (copie de `gad-7.svg`).

---

## 12. Historique des modifications

| Date | Auteur | Modification |
|------|--------|--------------|
| 16/07/2026 | Adrien (avec Claude) | Création : entrée `Scale` (id `eii`), scorer somme 27-135 + sous-scores bifactoriels, icône placeholder, spec. Items verbatim UQO. Décision : pas de bandes de sévérité (aucun cutoff établi). |
