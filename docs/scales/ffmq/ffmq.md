# Test spec — FFMQ (Questionnaire des cinq facettes de la pleine conscience)

<!-- Fiche rédigée et implémentée par Claude (mission n°3, 12/10/2026). Texte trouvé par la recherche complémentaire (classe C → A). -->

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | FFMQ (id `ffmq`) |
| **Libellé** | Questionnaire des cinq facettes de la pleine conscience |
| **Thème** | Pleine conscience (**nouveau domaine**, teinte blush `#F1D4BD`) |
| **Items** | 39 (1-5), 19 inversés, 5 facettes + score global |
| **Sens** | Plus le score est élevé, plus la pleine conscience est marquée (`higherIsBetter: true`) |
| **Durée** | 10 minutes (estimation Melya) |

## 2. Sources et traçabilité

- **Source primaire** : PDF du laboratoire de psychopathologie expérimentale de l'UCLouvain (P. Philippot, coauteur de la VF), « Version originale : Baer et al. (2008) / Adaptation et validation francophone : Heeren et al. (2011) » : consigne, 39 items, modalités, **cotation** (p. 4, image) — archivé `FFMQ_UCLouvain_Heeren-2011.pdf`. URL : https://www.uclep.be/pdf/FFMQ_scale.pdf
- **Journal de recherche** : triage mission 3 (classe C : page contextualscience.org réservée aux membres ACBS) → recherche complémentaire par agent (11/10/2026) : PDF UCLouvain.

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | ❓ — aucune phrase de licence ; PDF diffusé publiquement par le laboratoire des auteurs de la VF (règle pragmatique : implémentable) |
| **Mention** | « FFMQ — version originale : Baer et al. (2008). Adaptation et validation francophone : Heeren et al. (2011), Université catholique de Louvain. » |
| **PDF source en téléchargement** | 🔗 |

## 4-5. Structure et items

- **Consigne** : « Evaluez chacune des propositions ci-dessous en utilisant l'échelle proposée. Choisissez la réponse qui correspond le mieux à ce qui est généralement vrai pour vous. » (« Cochez le chiffre » → « Choisissez la réponse »).
- **Réponses** : 1 Jamais ou très rarement vrai · 2 Rarement vrai · 3 Parfois vrai · 4 Souvent vrai · 5 Très souvent ou toujours vrai.
- 39 items verbatim (apostrophes harmonisées ; item 13 sans point final, comme la source).

## 6-7. Scoring et seuils

Items inversés 3, 5, 8, 10, 12, 13, 14, 16, 17, 18, 22, 23, 25, 28, 30, 34, 35, 38, 39 (6 − x). Facettes : observation (1, 6, 11, 15, 20, 26, 31, 36), description (2, 7, 12, 16, 22, 27, 32, 37), action en pleine conscience (5, 8, 13, 18, 23, 28, 34, 38), non-réactivité (4, 9, 19, 21, 24, 29, 33), non-jugement (3, 10, 14, 17, 25, 30, 35, 39). Score global « Mindfulness » = somme des 5 facettes, 39-195. **Pas de seuil** (bande unique).

## 8. Alertes

Aucune.

## 9. Cas de test (`ffmq.spec.ts`, 5/5)

39 (min, inversés à 5) ; 195 (max) ; 117 (tout à 3) ; 99 (1-5 en boucle) — facettes vérifiées.

## 10. Choix et arbitrages méthodologiques

| Sujet | Choix | Justification | Confiance |
| --- | --- | --- | --- |
| Version | Heeren et al. 2011 (PDF UCLouvain) | Seule VF validée accessible ; diffusée par le laboratoire des auteurs | haute |
| Cotation | Clé de la p. 4 du PDF | Source primaire | haute |
| Consigne | « Cochez le chiffre » → « Choisissez la réponse » | Type 1 | haute |
| « Evaluez » sans accent | Conservé | Verbatim (règle : majuscules de la source) | haute |
| Libellés | Majuscule initiale | Type 1 typographique (cohérent avec DERS) | moyenne |
| Domaine | Nouveau domaine « Pleine conscience » | Prévu au plan (familles hors nosographie) ; MEL-348 | moyenne |

### Recette

À compléter après déploiement sur staging.

## 11-12. Contrat technique et historique

Entrée `ffmq` (`single-scale`, 1-5, `reverseItems`, `higherIsBetter: true`, 1 bande), scorer `ffmq.ts` (somme après inversion + 5 facettes), tests `ffmq.spec.ts`. Nouveau domaine `pleine-conscience` (`ScaleDomain`, `DOMAIN_ORDER`, `DOMAIN_APPEARANCE`). 12/10/2026 — Claude (mission n°3) : création.

## 13. Reste à faire avant prod

- [ ] **Recette** : recette manuelle sur staging, puis ✅.
- [ ] **Arbitrage à valider** : nouveau domaine « Pleine conscience » et sa teinte blush (MEL-348 / MEL-356).
- [ ] **Droits** : aucune licence explicite (❓) ; demande groupée possible auprès de l'UCLouvain (MEL-351).
