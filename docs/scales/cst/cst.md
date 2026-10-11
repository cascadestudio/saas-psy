# Test spec — CST (Échelle brève d'évaluation du stress, Cungi)

<!-- Fiche rédigée et implémentée par Claude (mission n°3, 11/10/2026). Source de classe B (« à confronter »). Arbitrages en §10, reste à faire en §13. -->

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | CST (id `cst`) — « Stress de Cungi » dans le benchmark Mentaal |
| **Libellé** | Échelle brève d'évaluation du stress (Cungi) |
| **Thème** | Stress (domaine Anxiété, catégorie « Stress ») |
| **Items** | 11 (1-6) |
| **Durée** | 3 min (estimation Melya) |
| **Public** | Adultes |
| **Mode** | auto |
| **Description praticien** | Échelle brève de 11 questions issue des travaux de Charly Cungi pour évaluer son niveau de stress. |

## 2. Sources et traçabilité

- **Source (classe B, secondaire)** : Lefebvre Dalloz Compétences (organisme de formation), « Test : échelle brève d'évaluation du stress » — texte archivé `CST_Lefebvre-Dalloz_2026-10-11.txt` (page Cloudflare, lue via Chrome), 11/10/2026.
- **Seconde source (trouvée par la recherche complémentaire du 11/10/2026)** : Centre neuchâtelois de psychiatrie (CNP, établissement public suisse), PDF « Échelle brève d'évaluation du stress - Cungi 1997 » — archivé `CST_CNP-Neuchatel_Cungi1997.pdf`. Texte identique à Lefebvre Dalloz, mêmes bornes chevauchantes, sauf : 1re modalité « Non pas du tout » ; item 10 « un problème de tension artérielle » au lieu de « un problème de cholestérol » ; écriture inclusive (émotif·ve, fatigué·e). L'item 8 a la même virgule manquante.
- **Référence papier à confronter** : Charly Cungi, *Savoir gérer son stress* (Retz) — édition et pages à vérifier (action documentaire).
- **Écart avec Mentaal** : Mentaal (`/send/cungi-stress`, n°60) propose 19 questions → probablement une autre version (complète) de l'échelle de Cungi.
- **Journal de recherche** : « échelle de stress de Cungi questionnaire texte items » → Lefebvre Dalloz ; pages INRS (autres outils) ; aucun PDF institutionnel de l'échelle trouvé.

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | ❓ — aucune phrase de licence ; texte tiré d'un livre grand public (Retz) reproduit par un tiers (règle pragmatique : implémentable) |
| **Mention obligatoire** | « Échelle brève d'évaluation du stress — issue des travaux de Charly Cungi (Savoir gérer son stress, Retz). Version reprise de Lefebvre Dalloz Compétences. » |
| **Décision Melya** | go, sous réserve de confrontation au livre |
| **PDF source en téléchargement** | 🚫 (pas de source officielle publique) |

## 4. Structure

- **Consigne** (adaptée) : « Pour chacune des questions, choisissez la réponse appropriée selon l'échelle suivante : 1 - Pas du tout, 2 - Faiblement, 3 - Un peu, 4 - Assez, 5 - Beaucoup, 6 - Extrêmement. »
- **Titre patient** : acronyme seul.
- **Réponses** : 1 Pas du tout · 2 Faiblement · 3 Un peu · 4 Assez · 5 Beaucoup · 6 Extrêmement.

## 5. Items

11 questions (texte : entrée `cst` et fichier archivé), verbatim sauf l'item 8 (§10).

## 6-7. Scoring et seuils

Somme 11-66. Source : « Entre 11 et 19 : très bas ; entre 19 et 30 : bas ; entre 30 et 45 : élevé ; au-dessus de 45 : très élevé ». Bandes Melya : 11-18 très bas · 19-29 bas · 30-45 élevé · 46-66 très élevé.

## 8. Alertes

Aucune.

## 9. Cas de test (`cst.spec.ts`, 9/9)

11, 18, 19, 29, 30, 45, 46, 66 (chaque bord de bande).

## 10. Choix et arbitrages méthodologiques

| Sujet | Choix | Justification | Confiance |
| --- | --- | --- | --- |
| Source | Lefebvre Dalloz (secondaire) | Seule version en ligne ; classe B, à confronter au livre de Cungi | basse |
| Bornes des bandes | 19 → « bas », 30 → « élevé », 45 → « élevé » | La source chevauche (« entre 11 et 19 », « entre 19 et 30 ») ; lecture en intervalles semi-ouverts, « au-dessus de 45 » strict | basse |
| Item 10 | « problème de cholestérol » (Lefebvre Dalloz) conservé | Les deux sources divergent (CNP : « tension artérielle », redondant avec « hypertension artérielle » qui suit) ; la leçon Lefebvre Dalloz évite la redondance ; à trancher sur le livre | basse |
| 1re modalité | « Pas du tout » (Lefebvre Dalloz) | CNP : « Non pas du tout » ; différence mineure, à trancher sur le livre | moyenne |
| Item 8 | « des allergies de l'eczéma » → « des allergies, de l'eczéma » | Type 2 : virgule manquante évidente | moyenne |
| Consigne | « faites une croix dans la case appropriée » → « choisissez la réponse appropriée » | Type 1 | moyenne |
| Domaine | Anxiété, catégorie « Stress » | Stress général (pas spécifiquement professionnel) | moyenne |

### Recette

**Staging (11/10/2026, Claude)** — patient « Patient Test » : **conforme** (8 jeux sur 8). Le dernier jeu a été saisi par le parcours patient complet dans l'interface ; les autres ont été soumis par l'endpoint du portail patient (`POST /sessions/patient/:id/submit`, le même que l'interface), puis tous relus côté praticien (total, interprétation, sous-scores).

| Jeu | Réponses | Attendu | Obtenu |
| --- | --- | --- | --- |
| T1 min | 1,1,1,1,1,1,1,1,1,1,1 | 11 | 11, « Niveau de stress très bas » |
| T2 18 | 2,2,2,2,2,2,2,1,1,1,1 | 18 | 18, « Niveau de stress très bas » |
| T3 19 | 2,2,2,2,2,2,2,2,1,1,1 | 19 | 19, « Niveau de stress bas » |
| T4 29 | 3,3,3,3,3,3,3,2,2,2,2 | 29 | 29, « Niveau de stress bas » |
| T5 30 | 3,3,3,3,3,3,3,3,2,2,2 | 30 | 30, « Niveau de stress élevé » |
| T6 45 | 4,5,4,4,4,4,4,4,4,4,4 | 45 | 45, « Niveau de stress élevé » |
| T7 46 | 4,5,5,4,4,4,4,4,4,4,4 | 46 | 46, « Niveau de stress très élevé » |
| T8 max (parcours patient) | 6,6,6,6,6,6,6,6,6,6,6 | 66 | 66, « Niveau de stress très élevé » |

Consigne adaptée, 6 libellés, graduations 19, 30 et 46, mention « Bornes de la source (Lefebvre Dalloz, d'après Cungi), chevauchements tranchés par Melya », 11 items et mention : conformes.

**Mentaal** : leur « Stress de Cungi » compte 19 questions (autre version) ; pas de comparaison possible.

## 11-12. Contrat technique et historique

Entrée `cst` (1-6, 4 bandes), scorer `cst.ts` (somme), tests `cst.spec.ts`. 11/10/2026 — Claude (mission n°3) : création et implémentation (classe B).

## 13. Reste à faire avant prod

- [ ] **Action documentaire** : Cungi, *Savoir gérer son stress* (Retz) — photographier l'échelle (consigne, 11 items, cotation, bornes) ; vérifier s'il s'agit de la version courte et repérer la version à 19 items (Mentaal).
- [ ] **Arbitrage à valider** : bornes des bandes (chevauchement présent dans les deux sources).
- [ ] **Arbitrage à valider** : item 10 (« cholestérol » ou « tension artérielle ») et 1re modalité (« Pas du tout » ou « Non pas du tout ») — à trancher avec le livre.
- [ ] **Décision produit** : ajouter l'« Échelle brève d'évaluation des stresseurs » (8 items, Cungi 1997) qui, avec ces 11 items, forme la version à 19 items de Mentaal (texte en ligne, pas de seuil sourcé).
- [ ] **Vigilance** : source non clinique (organisme de formation).
