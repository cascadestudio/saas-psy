# Test spec — DERS (Échelle des difficultés de régulation émotionnelle, DERS-F)

<!-- Fiche rédigée et implémentée par Claude (mission n°3, 11/10/2026). Arbitrages en §10, reste à faire en §13. -->

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | DERS (id `ders`) |
| **Libellé** | Échelle des difficultés de régulation émotionnelle |
| **Sous-titre patient** | Difficulties in Emotion Regulation Scale |
| **Thème** | Régulation émotionnelle (domaine Humeur, provisoire — MEL-348) |
| **Items** | 36 (1-5), 11 inversés, 6 sous-scores |
| **Durée** | 10 minutes (estimation Melya) |
| **Public** | Adultes |
| **Mode** | auto |

## 2. Sources et traçabilité

- **Texte (source primaire)** : DERS-F, PDF de la Section de psychologie de l'Université de Genève (laboratoire des auteurs de la version française), « Version française validée : Dan-Glauser & Scherer (2013) » — archivé `DERS-F_UNIGE_Dan-Glauser-Scherer.pdf` (+ extraction texte `DERS-F_UNIGE.txt`). URL : https://www.unige.ch/cisa/application/files/1614/6719/2002/DERS-FSept2012_0.pdf
- **Cotation** : le PDF n'en donne pas. Clé de la version originale (Gratz & Roemer 2004), reprise de la page de l'Université de Coimbra (CINEICC) — archivée `DERS_cotation_UCoimbra_2026-10-11.txt`. L'ordre des items de la DERS-F est celui de l'original (vérifié item par item) et la validation française confirme la structure à 6 facteurs (Dan-Glauser & Scherer 2013, phi de Tucker .98).
- **Version non retenue** : traduction québécoise Côté, Gosselin & Dagenais (2013, Journal de thérapie comportementale et cognitive, abonnement ; page ACBS réservée aux membres).
- **Journal de recherche** : triage mission 3 (classe C) → recherche complémentaire par agent (11/10/2026) : PDF UNIGE trouvé ; clé : U. Coimbra, NCTSN, Valant (payant), LA County DMH (bloqué).

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | ❓ — aucune phrase de licence (original ni VF) ; PDF diffusé publiquement par l'université (règle pragmatique : implémentable) |
| **Mention obligatoire** | « DERS — Gratz & Roemer (2004). Version française validée (DERS-F) : Dan-Glauser & Scherer (2013), Swiss Journal of Psychology, 72(1), 5-11 ; Université de Genève. » |
| **PDF source en téléchargement** | 🔗 (lien vers le PDF UNIGE) |

## 4. Structure

- **Consigne** : paragraphe de présentation + « Répondez à toutes les questions en choisissant à chaque fois une seule réponse par énoncé selon si celui-ci vous correspond. » (adapté de « en cochant à chaque fois une seule case »).
- **Réponses** : 1 Presque jamais · 2 Quelques fois · 3 La moitié du temps · 4 La plupart du temps · 5 Presque toujours.
- Pas de rappel persistant : les items 10 à 36 portent eux-mêmes « Quand je suis contrarié(e), ».

## 5. Items

36 items, texte de l'entrée `ders`, verbatim sauf les items 3 et 14 (§10).

## 6-7. Scoring et seuils

Items inversés 1, 2, 6, 7, 8, 10, 17, 20, 22, 24, 34 (6 − x). Total 36-180. Sous-scores : non-acceptation 11, 12, 21, 23, 25, 29 ; buts 13, 18, 20, 26, 33 ; impulsions 3, 14, 19, 24, 27, 32 ; conscience 2, 6, 8, 10, 17, 34 ; stratégies 15, 16, 22, 28, 30, 31, 35, 36 ; clarté 1, 4, 5, 7, 9. **Aucun seuil clinique** publié par les auteurs (une seule bande « Pas de seuil clinique fourni par les auteurs. »).

## 8. Alertes

Aucune.

## 9. Cas de test (`ders.spec.ts`, 6/6)

| # | Réponses | Total | Sous-scores (non-acc./buts/impuls./consc./strat./clarté) |
| --- | --- | --- | --- |
| T1 | 1 partout, 5 aux inversés (min) | 36 | 6/5/6/6/8/5 |
| T2 | 5 partout, 1 aux inversés (max) | 180 | 30/25/30/30/40/25 |
| T3 | tout à 1 | 80 | 6/9/10/30/12/13 |
| T4 | tout à 3 | 108 | 18/15/18/18/24/15 |
| T5 | 1,2,3,4,5 en boucle | 110 | 16/11/17/19/25/22 |

## 10. Choix et arbitrages méthodologiques

| Sujet | Choix | Justification | Confiance |
| --- | --- | --- | --- |
| Version | DERS-F (Genève) plutôt que la version québécoise | Seule version française complète accessible en ligne, diffusée par l'université des auteurs, validée | haute |
| Cotation | Clé Gratz & Roemer 2004 | Absente du PDF ; ordre des items identique à l'original et structure factorielle confirmée par la validation française | haute |
| Item 3 | « incontrolables » → « incontrôlables » | Type 2 (accent manquant) | haute |
| Item 14 | « je devient » → « je deviens » | Type 2 (conjugaison) | haute |
| Consigne | « en cochant à chaque fois une seule case » → « en choisissant à chaque fois une seule réponse » | Type 1 | haute |
| Libellés | Majuscule initiale (« Presque jamais »…) | Type 1 typographique ; la source les écrit en minuscules | moyenne |
| Domaine | Humeur, catégorie « Régulation émotionnelle » | Dimension transdiagnostique sans domaine dédié ; à revoir dans MEL-348 | basse |
| Seuil | Aucun | Pas de norme clinique publiée par les auteurs | haute |

### Recette

À compléter après déploiement sur staging.

## 11-12. Contrat technique et historique

Entrée `ders` (`single-scale`, 1-5, `reverseItems`, 1 bande), scorer `ders.ts` (somme après inversion + 6 sous-scores), tests `ders.spec.ts`. 11/10/2026 — Claude (mission n°3) : création. Issue Linear MEL-325 (assignée à James Harris, aucun code existant au 11/10) commentée.

## 13. Reste à faire avant prod

- [ ] **Relecture** : 36 items contre le PDF UNIGE (corrections des items 3 et 14).
- [ ] **Arbitrage à valider** : domaine Humeur / catégorie « Régulation émotionnelle » (MEL-348).
- [ ] **Coordination** : James avait l'issue MEL-325 « In Progress » — vérifier qu'il n'y a pas de travail parallèle.
- [ ] **Évolution (Adrien)** : aucun seuil ; un « profil de sous-scores » serait plus parlant que le total (MEL-356).
