# Test spec — BAT (Burnout Assessment Tool), versions travail (`bat-w`) et générale (`bat-g`)

<!-- Fiche commune aux deux versions, rédigée et implémentée par Claude (mission n°3, 11/10/2026). Arbitrages en §10, reste à faire en §13. -->

## 1. Métadonnées produit

| Champ | Version travail (`bat-w`) | Version générale (`bat-g`) |
| --- | --- | --- |
| **Libellé** | Burnout Assessment Tool — version travail | Burnout Assessment Tool — version générale |
| **Public** | Personnes en emploi | Personnes qui ne travaillent pas actuellement (arrêt prolongé, etc.) |
| **Items** | 33 : 23 primaires (épuisement 1-8, distance mentale 9-13, déficience cognitive 14-18, déficience émotionnelle 19-23) + 10 secondaires (24-33) | 32 : 22 primaires (épuisement 1-8, distance mentale 9-12, cognitive 13-17, émotionnelle 18-22) + 10 secondaires (23-32) |
| **Réponses** | 1 Jamais · 2 Rarement · 3 Parfois · 4 Souvent · 5 Toujours | idem |
| **Durée** | ≈ 5 min (manuel) | idem |

Domaine **Burn-out** (nouveau, teinte sable), catégorie « Burn-out ». Mode auto. Description praticien : questionnaire de 33 (ou 32) items évaluant les symptômes de burn-out.

## 2. Sources et traçabilité

- **Source primaire** : version française (France) officielle, « BURNOUT ASSESSMENT TOOL — FRANÇAIS (FRANCE) », versions travail (p. 1-2) et générale (p. 3-4), « Avec l'aide de dr. Ilona Boniwell » : https://burnoutassessmenttool.be/wp-content/uploads/2020/08/BAT-Françias-France.pdf — `BAT_Francais-France.pdf` — 11/10/2026.
- **Cotation et seuils** : *User Manual – Burnout Assessment Tool – Version 2.0* (Schaufeli, De Witte & Desart, juillet 2020) — `BAT_User-Manual-v2.0_EN.pdf` (tableaux 5 et 7).
- **Autre version** : français de Belgique (même site) — `BAT_Francais-Belgique.pdf` (non comparée en détail).
- **Validation** : Schaufeli et al. (2020), IJERPH 17, 9495 ; validation franco-canadienne (enseignants, 2025) dont les items ne sont pas publiés. Pas de validation française de France trouvée → traduction officielle non validée, acceptée (règle pragmatique).
- **Journal de recherche** : site officiel (page « Manual | Questionnaire » : 40 langues, dont France et Belgique) ; recherches « BAT version française », Slate, Blick, CRIRES (Laval). Mentaal : `/send/bat-w` (33 items, n°61), `/send/bat-g` (32 items, n°48).

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | ✅ — « The BAT is non-proprietary and may be used free of charge without requesting permission from the authors. Please note, however, that the instrument should not be modified, and the following publication should be cited » (burnoutassessmenttool.be) |
| **Mention obligatoire** | « BAT — Schaufeli, W.B., De Witte, H. & Desart, S. (2020). Burnout Assessment Tool (BAT) – Development, validity and reliability. International Journal of Environmental Research and Public Health, 17, 9495. Version française (France), avec l'aide de Dr Ilona Boniwell (Positran). Outil non propriétaire (KU Leuven). » |
| **Décision Melya** | go |
| **PDF source en téléchargement** | 📥 hébergeable (non propriétaire, sans modification, avec la citation) — `BAT_Francais-France.pdf`. Le manuel est « All rights reserved » : 🔗 seulement. |

## 4. Structure

- **Consigne** : travail « Les énoncés suivants sont liés à votre situation de travail et à la manière dont vous la vivez. Veuillez indiquer la fréquence à laquelle chaque déclaration s'applique à vous. » ; générale « Les énoncés suivants sont liés à ce que vous ressentez et à la manière dont vous la vivez. Veuillez indiquer la fréquence à laquelle chaque déclaration s'applique à vous. » (verbatim).
- **Rappel** : « Veuillez indiquer la fréquence à laquelle chaque déclaration s'applique à vous. » (2e phrase, verbatim).
- **Titre patient** : acronyme seul (`patientIntroSubtitle: null`), §10.

## 5. Items

Texte du PDF France, verbatim (astérisques de la version courte retirés). Texte complet : entrées `bat-w` et `bat-g` de `index.ts`.

## 6-7. Scoring et seuils

Le manuel interprète la **moyenne** des items primaires (1 à 5), arrondie à 2 décimales, avec les seuils cliniques flamands : ≤ 2,58 vert (pas de risque), 2,59-3,01 orange (risque de burn-out), ≥ 3,02 rouge (risque très élevé) — tableau 5 (employés, BAT-23) et tableau 7 (non-travailleurs, version générale). Melya affiche la **somme équivalente**, vérifiée par script sur toutes les sommes possibles :

| Zone | Travail (23 items) | Générale (22 items) |
| --- | --- | --- |
| Verte | 23-59 | 22-56 |
| Orange | 60-69 | 57-66 |
| Rouge | 70-115 | 67-110 |

Sous-scores : 4 dimensions primaires + symptômes secondaires (10 items, hors total). Les seuils par sous-échelle sont donnés dans `scoring.method`.

## 8. Alertes

Aucune.

## 9. Cas de test

`bat-w.spec.ts` (7/7) : 23, 115, 59/60 (vert/orange), 69/70 (orange/rouge). `bat-g.spec.ts` (7/7) : 22, 110, 56/57, 66/67.

## 10. Choix et arbitrages méthodologiques

| Sujet | Choix | Justification | Confiance |
| --- | --- | --- | --- |
| Moyenne → somme | Somme des items primaires, bandes converties | Score entier (pas de mécanisme « moyenne ») ; conversion exacte vérifiée pour toutes les sommes | haute |
| Seuils | Seuils cliniques flamands | Seuls seuils cliniques publiés ; le manuel recommande des normes locales quand elles existent (aucune pour la France) | moyenne |
| Libellés des zones | « Zone verte : pas de risque… » etc. | Traduction des catégories du manuel (« no risk / at risk / very high risk of burnout »), texte praticien | moyenne |
| Titre patient | Acronyme « BAT » seul | Le manuel conseille de ne pas montrer « Burnout Assessment Tool » au répondant (connotation) | moyenne |
| Texte | Strictement verbatim (« A la fin », « épuisé/e », « actif/ve ») | Licence : « the instrument should not be modified » (précédent ASRS) | haute |
| Item 11 de la version générale | Point final retiré | Seul item avec point ; harmonisation typographique minime | moyenne |
| Secondaires | Passés et affichés en sous-score, hors total | Le manuel les interprète séparément | haute |
| Domaine | Nouveau domaine **Burn-out** (teinte sable `#DBCEB8`) | Domaine validé par Clément (MEL-348) | haute |

### Recette

#### BAT-W (version travail)

**Staging (11/10/2026, Claude)** : **conforme** (6 jeux sur 6), même protocole que les autres échelles du lot (dernier jeu par le parcours patient, autres par l'endpoint du portail, relecture côté praticien).

| Jeu | Réponses | Attendu | Obtenu |
| --- | --- | --- | --- |
| T1 min | 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 | 23 ; sous-scores 8 / 5 / 5 / 5 / 10 | 23, « Zone verte : pas de risque de burn-out (moyenne ≤ 2,58) » ; sous-scores 8 / 5 / 5 / 5 / 10 |
| T2 max | 5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5 | 115 ; sous-scores 40 / 25 / 25 / 25 / 50 | 115, « Zone rouge : risque très élevé de burn-out (moyenne ≥ 3,02) » ; sous-scores 40 / 25 / 25 / 25 / 50 |
| T3 haut de la zone verte | 5,5,5,5,5,5,5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3 | 59 ; sous-scores 40 / 9 / 5 / 5 / 30 | 59, « Zone verte : pas de risque de burn-out (moyenne ≤ 2,58) » ; sous-scores 40 / 9 / 5 / 5 / 30 |
| T4 bas de la zone orange | 5,5,5,5,5,5,5,5,5,2,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3 | 60 ; sous-scores 40 / 10 / 5 / 5 / 30 | 60, « Zone orange : risque de burn-out (moyenne 2,59 à 3,01) » ; sous-scores 40 / 10 / 5 / 5 / 30 |
| T5 haut de la zone orange | 5,5,5,5,5,5,5,5,5,5,5,3,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3 | 69 ; sous-scores 40 / 19 / 5 / 5 / 30 | 69, « Zone orange : risque de burn-out (moyenne 2,59 à 3,01) » ; sous-scores 40 / 19 / 5 / 5 / 30 |
| T6 bas de la zone rouge (parcours patient) | 5,5,5,5,5,5,5,5,5,5,5,4,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3 | 70 ; sous-scores 40 / 20 / 5 / 5 / 30 | 70, « Zone rouge : risque très élevé de burn-out (moyenne ≥ 3,02) » ; sous-scores 40 / 20 / 5 / 5 / 30 |

**Mentaal** (même jeu T6) : moyenne 3,04 (= 70 / 23), zone rouge ≥ 3,02 : identique. Mentaal affiche en plus des seuils par dimension, que Melya n'a pas (pas d'interprétation par sous-échelle, limite connue, MEL-356).

#### BAT-G (version générale)

**Staging (11/10/2026, Claude)** : **conforme** (6 jeux sur 6), même protocole que les autres échelles du lot (dernier jeu par le parcours patient, autres par l'endpoint du portail, relecture côté praticien).

| Jeu | Réponses | Attendu | Obtenu |
| --- | --- | --- | --- |
| T1 min | 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 | 22 ; sous-scores 8 / 4 / 5 / 5 / 10 | 22, « Zone verte : pas de risque de burn-out (moyenne ≤ 2,58) » ; sous-scores 8 / 4 / 5 / 5 / 10 |
| T2 max | 5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5 | 110 ; sous-scores 40 / 20 / 25 / 25 / 50 | 110, « Zone rouge : risque très élevé de burn-out (moyenne ≥ 3,02) » ; sous-scores 40 / 20 / 25 / 25 / 50 |
| T3 haut de la zone verte | 5,5,5,5,5,5,5,5,3,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3 | 56 ; sous-scores 40 / 6 / 5 / 5 / 30 | 56, « Zone verte : pas de risque de burn-out (moyenne ≤ 2,58) » ; sous-scores 40 / 6 / 5 / 5 / 30 |
| T4 bas de la zone orange | 5,5,5,5,5,5,5,5,4,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3 | 57 ; sous-scores 40 / 7 / 5 / 5 / 30 | 57, « Zone orange : risque de burn-out (moyenne 2,59 à 3,01) » ; sous-scores 40 / 7 / 5 / 5 / 30 |
| T5 haut de la zone orange | 5,5,5,5,5,5,5,5,5,5,5,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3 | 66 ; sous-scores 40 / 16 / 5 / 5 / 30 | 66, « Zone orange : risque de burn-out (moyenne 2,59 à 3,01) » ; sous-scores 40 / 16 / 5 / 5 / 30 |
| T6 bas de la zone rouge (parcours patient) | 5,5,5,5,5,5,5,5,5,5,5,2,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3 | 67 ; sous-scores 40 / 17 / 5 / 5 / 30 | 67, « Zone rouge : risque très élevé de burn-out (moyenne ≥ 3,02) » ; sous-scores 40 / 17 / 5 / 5 / 30 |

**Mentaal** (même jeu T6) : moyenne 3,05 (= 67 / 22), zone rouge : identique.

Affichage (les deux versions) : consigne, 5 libellés, graduations des zones (60 et 70 pour BAT-W, 57 et 67 pour BAT-G), mention « Seuils cliniques flamands du manuel BAT 2.0 (moyennes converties en sommes) », 5 sous-scores (dont symptômes secondaires hors total), 33 et 32 items et copyright : conformes.


### Repasse « regard neuf » (12/10/2026)

- **Corrigé** : coquille « Version version » dans les descriptions ; « personnes flamandes sans emploi » → « ne travaillant pas » (le manuel dit « non-working », arrêts prolongés compris).
- **Confirmé** : fusion des plaintes psychiques et psychosomatiques en un seul sous-score secondaire — le manuel 2.0 (§1.1.3) les additionne et les interprète ensemble.
- **Suggestions (non bloquantes)** : confiance « haute » pour le titre patient et l'item 11 ; consigner le retrait des astérisques ; archiver la page de licence du site BAT.

## 11-12. Contrat technique et historique

Entrées `bat-w` et `bat-g` (`single-scale`, 1-5, total sur les items primaires via `TOTAL_ITEMS`), scorers `bat-w.ts` / `bat-g.ts`, tests associés ; domaine `burnout` ajouté à `ScaleDomain`, `DOMAIN_ORDER`, `DOMAIN_APPEARANCE`. 11/10/2026 — Claude (mission n°3) : création et implémentation.

## 13. Reste à faire avant prod

- [ ] **Arbitrage à valider** : affichage de la somme (avec la moyenne expliquée) plutôt que de la moyenne du manuel.
- [ ] **Arbitrage à valider** : seuils flamands faute de normes françaises.
- [ ] **Design** : teinte sable du domaine Burn-out (MEL-356).
- [ ] **Évolution (Adrien)** : interprétation par sous-échelle (seuils orange/rouge par dimension), même besoin que DASS-21 et SCARED.
