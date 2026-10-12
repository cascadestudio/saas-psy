# Test spec — QPA-30 (Questionnaire des pensées automatiques, ATQ)

<!-- Fiche rédigée et implémentée par Claude (mission n°3, 12/10/2026). Source de classe B (sites de praticiens, à confronter au livre). Arbitrages en §10, reste à faire en §13. -->

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | QPA (id `atq`) |
| **Libellé** | Questionnaire des pensées automatiques |
| **Sous-titre patient** | — (libellé) |
| **Thème** | Dépression (domaine Humeur) |
| **Items** | 30 (1-5), somme 30-150 |
| **Durée** | 15 minutes (fiche de la source) |
| **Public** | Adultes |

## 2. Sources et traçabilité

- **Source principale (classe B)** : PDF « Questionnaire des pensées automatiques (QPA) — Traduction française : J. Cottraux », site de Fabienne Ballet, psychologue (Meyzieu) : consigne, 30 items, modalités, cotation, repères de la version française — archivé `QPA-30_FabienneBallet-psychologue.pdf` (+ `.txt`). https://fabienneballet-psychologue.fr/IMG/pdf/depression_-_questionnaire_des_pensees_automatiques_qpa_.pdf
- **Source secondaire concordante** : PDF « Questionnaire des pensées automatiques A.T.Q » de Sandra Recolin, psychologue TCC (Bandol) — archivé `QPA-30_SandraRecolin-psychologue.pdf`. Mêmes 30 items, même consigne (sans la coquille « en indiquer »).
- **Référence papier à confronter** : Bouvard & Cottraux, *Protocoles et échelles d'évaluation en psychiatrie et psychologie* (action documentaire MEL-368).
- **Journal de recherche** : triage mission 3 (classe C) → recherche complémentaire par agent (11/10/2026) : deux PDF de praticiens + items sur memoireonline (mémoire 2014).

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | ❓ — aucune phrase de licence ; traduction de J. Cottraux publiée dans ses ouvrages, diffusée par des praticiens (règle pragmatique : implémentable) |
| **Mention obligatoire** | « Questionnaire des pensées automatiques (ATQ) — Hollon & Kendall (1980). Traduction française : J. Cottraux. » |
| **PDF source en téléchargement** | 🚫 (pas de source institutionnelle) |

## 4-5. Structure et items

- **Consigne** : texte de la source, avec « et indiquer » (source secondaire) et « choisissez la réponse correspondante » (adaptation écran).
- **Rappel persistant** : « Durant la dernière semaine » (en-tête du tableau de la source).
- **Réponses** : 1 Pas du tout · 2 Parfois · 3 Assez souvent · 4 Souvent · 5 Tout le temps.
- 30 items verbatim (entrée `atq`), sauf l'item 14 (§10).

## 6-7. Scoring et seuils

Somme 30-150. **Pas de seuil clinique** ; repères de la version française (source) : sujets déprimés 95,7 (ET 23), sujets contrôles 46,24 (ET 12), affichés dans la méthode.

## 8. Alertes

Aucune dans la source. L'item 19 (« Je souhaite disparaître ») n'est pas une alerte de la source (§13).

## 9. Cas de test (`atq.spec.ts`, 5/5)

30 (min), 150 (max), 90 (tout à 3), 90 (1-5 en boucle).

## 10. Choix et arbitrages méthodologiques

| Sujet | Choix | Justification | Confiance |
| --- | --- | --- | --- |
| Source | Deux PDF de praticiens concordants | Seules sources en ligne ; classe B, à confronter au livre | moyenne |
| Item 14 | « Qu’il y a-t-il de mauvais en moi ? » → « Qu’y a-t-il de mauvais en moi ? » | Type 2 : tournure agrammaticale présente dans les deux sources | moyenne |
| Consigne | « en indiquer » → « et indiquer » | Type 2, leçon de la source secondaire | haute |
| Consigne | « cochez la colonne correspondante » → « choisissez la réponse correspondante » | Type 1 | haute |
| Seuil | Aucun ; repères déprimés / contrôles dans la méthode | La source ne donne que des moyennes | haute |
| Acronyme | « QPA », sans sous-titre anglais (révisé le 12/10/2026) | Sigle de la source principale ; « QPA-30 » et le sous-titre anglais n'apparaissaient dans aucune source | haute |

### Recette

À compléter après déploiement sur staging.


### Repasse « regard neuf » (12/10/2026)

- **Corrigé** : sigle « QPA » (source) au lieu de « QPA-30 » ; sous-titre anglais retiré (absent des sources) ; apostrophes harmonisées.
- **Références trouvées** (HAL, https://hal.univ-lorraine.fr/hal-03197078/document) : traduction Cottraux, Bouvard & Légeron (1985) ; validation française Bouvard et al. (1992), *Journal de thérapie comportementale et cognitive*, 2(2), 25-28 — origine probable des repères 95,7 / 46,24.
- **Reste** : item 14 « Qu'y a-t-il » non attesté en ligne (correction Melya, type 2) ; confrontation au livre (MEL-368).

## 11-12. Contrat technique et historique

Entrée `atq` (`single-scale`, 1-5, 1 bande), scorer `atq.ts` (somme), tests `atq.spec.ts`. 12/10/2026 — Claude (mission n°3) : création. Issue MEL-323 (James Harris, « Todo ») commentée.

## 13. Reste à faire avant prod

- [ ] **Action documentaire** : confronter au livre de Bouvard & Cottraux (MEL-368).
- [ ] **Arbitrage à valider** : correction de l'item 14.
- [ ] **Vigilance clinique** : item 19 « Je souhaite disparaître » — pas d'alerte dans la source ; à décider (pas d'ajout sans source).
- [ ] **Coordination** : MEL-323 était assignée à James.
