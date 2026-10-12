# Test spec — EDI (Échelle d'infériorité, Yao et coll.)

<!-- Fiche rédigée et implémentée par Claude (mission n°3, 12/10/2026). Texte trouvé par la recherche complémentaire (classe C → B : thèse). -->

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | EDI (id `edi`) — ≠ EDI-2 (Eating Disorder Inventory) |
| **Libellé** | Échelle d'infériorité |
| **Thème** | Sentiment d'infériorité (domaine Estime de soi) |
| **Items** | 34 (1-5), total 34-170, 2 sous-scores |
| **Durée** | 10 minutes (estimation Melya) |

## 2. Sources et traçabilité

- **Source** : thèse de doctorat de S.-N. Yao (Université Lumière Lyon 2, 1999, en ligne, HTML) — formulaire complet (annexe, part 9212), codage (part 9213), construction et validation (parts 9211, 9214-9216) — archivé `EDI_these-Yao-Lyon2-1999_extraits.txt`. https://theses.univ-lyon2.fr/documents/lyon2/1999/syao
- **Publication** : Yao, S.-N. et coll. (1998b), validation de l'EDI (référence complète à confronter : action documentaire MEL-368, livre Bouvard & Cottraux).
- **Journal de recherche** : triage mission 3 (classe C) → recherche complémentaire par agent (11/10/2026) : thèse Yao.

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | ❓ — instrument original français publié dans une thèse en libre accès, sans phrase de licence (règle pragmatique : implémentable) |
| **Mention** | « Échelle d'infériorité (EDI) — Yao, S.-N. et coll. (1998b). Formulaire reproduit dans la thèse de S.-N. Yao, Université Lumière Lyon 2 (1999). » |
| **PDF source en téléchargement** | 🚫 (thèse HTML, pas de PDF de l'échelle) |

## 4-5. Structure et items

- **Consigne** : « Vous trouverez ci-dessous une liste de pensées. Pour chacun des énoncés, veuillez choisir la réponse qui correspond le mieux à votre façon de penser. » (« encercler le chiffre de 1 à 5 … selon l'échelle suivante » → « choisir la réponse »).
- **Réponses** : 1 Ne correspond pas du tout · 2 Correspond faiblement · 3 Correspond moyennement · 4 Correspond assez fortement · 5 Correspond exactement.
- 34 items verbatim (apostrophes harmonisées ; accords de la source conservés : item 7 « fatigué », item 11 « maladroit », item 28 « inférieur »).

## 6-7. Scoring et seuils

Somme 34-170. EDI-soi : 1, 4, 6, 7, 9, 10, 13, 15, 18, 20, 23, 24, 26, 27, 29, 32, 33. EDI-autres : 2, 3, 5, 8, 11, 12, 14, 16, 17, 19, 21, 22, 25, 28, 30, 31, 34. **Pas de seuil validé** ; repères dans la méthode : non cliniques 58,8 (12,6), phobiques sociaux 109,3 (22), TOC 105,8 (35,8), limite « environ » vers 70.

## 8. Alertes

Aucune.

## 9. Cas de test (`edi.spec.ts`, 5/5)

34 (min) ; 170 (max) ; 102 (tout à 3, 51/51) ; 100 (1-5 en boucle, 52/48).

## 10. Choix et arbitrages méthodologiques

| Sujet | Choix | Justification | Confiance |
| --- | --- | --- | --- |
| Source | Thèse Yao (formulaire + codage de l'auteur) | Seule source en ligne, de première main | moyenne |
| Seuil | Aucun ; repères dans la méthode | « environ 70 » n'est pas un seuil validé | haute |
| Consigne | « encercler le chiffre… selon l'échelle suivante » → « choisir la réponse » | Type 1 | haute |
| Accords (items 7, 11, 28) | Verbatim (pas de « (e) ») | La source n'accorde pas ces trois items ; pas de correction indiscutable | moyenne |
| Domaine | Estime de soi | Sentiment d'infériorité ; échelle utilisée en anxiété (TOC, phobie sociale) — MEL-348 | moyenne |

### Recette

À compléter après déploiement sur staging.

## 11-12. Contrat technique et historique

Entrée `edi` (`single-scale`, 1-5, 1 bande), scorer `edi.ts` (somme + 2 sous-scores), tests `edi.spec.ts`. 12/10/2026 — Claude (mission n°3) : création.

## 13. Reste à faire avant prod

- [ ] **Recette** : recette manuelle sur staging, puis ✅.
- [ ] **Arbitrage à valider** : accords non inclusifs des items 7, 11 et 28 (verbatim) ; domaine Estime de soi.
- [ ] **Action documentaire (optionnelle)** : confronter au livre Bouvard & Cottraux (MEL-368).
