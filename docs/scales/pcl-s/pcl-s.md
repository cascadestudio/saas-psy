# Test spec — PCL-S (Échelle de l'état de stress post-traumatique, version spécifique)

<!-- Fiche rédigée et implémentée par Claude (mission n°3, 11/10/2026). Arbitrages en §10, reste à faire en §13. -->

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | PCL-S (id `pcl-s`) |
| **Nom complet (FR)** | Échelle de l'état de stress post-traumatique, version spécifique (libellé ALP / Cottraux ; l'INSPQ titre en anglais) |
| **Langue originale** | Posttraumatic Stress Disorder Checklist for DSM-IV, Specific version (Weathers et al., 1993-1994) |
| **Thème** | Traumatismes |
| **Items** | 17 (1-5) |
| **Durée** | 5 min (estimation Melya) |
| **Public** | Adolescents, adultes (fiche INSPQ) |
| **Mode** | auto |
| **Description praticien** | Questionnaire de 17 items évaluant les symptômes de stress post-traumatique liés à un événement précis, dans le mois précédent (critères DSM-IV). |

## 2. Sources et traçabilité

- **Source primaire** : INSPQ, « Questionnaire 6 – PCL-S » (bilingue), qui reproduit la version française validée de Yao, Cottraux et al. (2003) ; fiche descriptive associée (conditions d'utilisation, seuils). Texte archivé : `PCL-S_INSPQ_2026-10-11.txt` (page Cloudflare, lue via Chrome) — 11/10/2026.
- **Source secondaire** : version de M. Salmona (diffusée par le barreau de Paris), mêmes items avec variantes et consigne réécrite : `PCL-S_Salmona_avocatparis.pdf`.
- **Validation française** : Yao S. N., Cottraux J. et al. (2003), *L'Encéphale*, 29(3), 232-238 (non consultée en texte intégral).
- **Journal de recherche** : phrase exacte d'item → INSPQ, avocatparis (Salmona), Cn2r (PCL-5 seulement) ; fiche ALP « PCLS » (consigne identique à l'INSPQ, lien ResearchGate vers l'article de validation). Mentaal : `/send/pcl-s` (17 items, n°36).

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | ✅ — « Domaine public. Il faut mentionner la source (Weathers et al., 1994). » (INSPQ) |
| **Mention obligatoire** | « PCL-S — Weathers, Litz, Herman, Huska & Keane (1994), National Center for PTSD (domaine public). Version française : Yao, Cottraux, Note, De Mey-Guillard, Mollard & Ventureyra (2003), L'Encéphale, 29(3), 232-238. Diffusion : INSPQ. » |
| **Décision Melya** | go |
| **PDF source en téléchargement** | 📥 hébergeable pour l'instrument (domaine public) ; pas de PDF français officiel téléchargeable trouvé (page web INSPQ) → 🔗 vers l'INSPQ en pratique. |

## 4. Structure

- **Consigne** (adaptée) : « Veuillez trouver ci-dessous une liste de problèmes et de symptômes fréquents à la suite d'un épisode de vie stressant. Veuillez lire chaque problème avec soin puis veuillez choisir la réponse qui indique à quel point vous avez été perturbé par ce problème dans le mois précédent. »
- **Rappel** : « Dans le mois précédent : » (extrait mot pour mot).
- **Titre patient** : « Posttraumatic Stress Disorder Checklist for DSM-IV » (titre de la source INSPQ).
- **Réponses** : `1` Pas du tout · `2` Un peu · `3` Parfois · `4` Souvent · `5` Très souvent.

## 5. Items

17 items de l'INSPQ (texte : entrée `pcl-s` et fichier archivé). Critères DSM-IV : B 1-5, C 6-12, D 13-17.

## 6-7. Scoring et seuils

Somme 17-85 ; sous-scores B (5-25), C (7-35), D (5-25). Bandes : 17-43 « Sous le seuil de dépistage du TSPT (score < 44) » ; 44-85 « Dépistage positif de TSPT (score ≥ 44) ». La méthode par critères (≥ 1 B, ≥ 3 C, ≥ 2 D cotés ≥ 3) est décrite dans `scoring.method`, pas calculée (§10).

## 8. Alertes

Aucune.

## 9. Cas de test (`pcl-s.spec.ts`, 6/6, vérifiés en Python)

17 ; 43 (sous le seuil) ; 44 (seuil) ; 85 ; jeu distinct 47 (B 25, C 7, D 15).

## 10. Choix et arbitrages méthodologiques

| Sujet | Choix | Justification | Confiance |
| --- | --- | --- | --- |
| Source | INSPQ (version Yao/Cottraux) | Institutionnelle, conforme à la consigne Cottraux citée par ALP ; Salmona modifie la consigne | haute |
| Consigne | « veuillez entourer un chiffre à droite pour indiquer » → « veuillez choisir la réponse qui indique » | Type 1, support papier | moyenne |
| Champ « événement stressant / date » | Non repris | Réponse libre = mécanisme nouveau ; l'événement est identifié avec le praticien (comme pour la PCL-5) | moyenne |
| Item 17 | Point final ajouté | Type 2 : harmonisation (16 autres items) | haute |
| Seuil | 44 (population générale) | Fiche INSPQ ; 50 chez les militaires mentionné dans la méthode | moyenne |
| Méthode par critères | Non calculée | Le bloc `criteriaCheck` de l'interface est écrit pour la PCL-5 (titre « Critères DSM-5 », règle B/C/D/E) : l'utiliser afficherait des règles fausses ; le rendre générique = évolution d'interface (Adrien, MEL-356) | haute |
| Redondance avec la PCL-5 | Échelle ajoutée quand même | Demandée par les praticiens (Mentaal n°36) ; DSM-IV, mention dans la description longue | moyenne |

Variantes Salmona (non retenues) : item 9 « Perte d'intérêt pour des activités », item 12 « l'avenir était raccourci ou bouché », item 16 « sur la défensive en permanence ».

### Recette

**Staging (11/10/2026, Claude)** — patient « Patient Test » : **conforme** (5 jeux sur 5). Le dernier jeu a été saisi par le parcours patient complet dans l'interface ; les autres ont été soumis par l'endpoint du portail patient (`POST /sessions/patient/:id/submit`, le même que l'interface), puis tous relus côté praticien (total, interprétation, sous-scores).

| Jeu | Réponses | Attendu | Obtenu |
| --- | --- | --- | --- |
| T1 min | 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 | 17 ; sous-scores 5 / 7 / 5 | 17, « Sous le seuil de dépistage du TSPT (score < 44) » ; sous-scores 5 / 7 / 5 |
| T2 sous le seuil (43) | 3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,1 | 43 ; sous-scores 15 / 19 / 9 | 43, « Sous le seuil de dépistage du TSPT (score < 44) » ; sous-scores 15 / 19 / 9 |
| T3 seuil (44) | 3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2 | 44 ; sous-scores 15 / 19 / 10 | 44, « Dépistage positif de TSPT (score ≥ 44) » ; sous-scores 15 / 19 / 10 |
| T4 max | 5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5 | 85 ; sous-scores 25 / 35 / 25 | 85, « Dépistage positif de TSPT (score ≥ 44) » ; sous-scores 25 / 35 / 25 |
| T5 sous-échelles distinctes (parcours patient) | 5,5,5,5,5,1,1,1,1,1,1,1,3,3,3,3,3 | 47 ; sous-scores 25 / 7 / 15 | 47, « Dépistage positif de TSPT (score ≥ 44) » ; sous-scores 25 / 7 / 15 |

Consigne, rappel « Dans le mois précédent : », 5 libellés, graduation 44, mention « Seuil de la fiche INSPQ (population générale) », 3 sous-scores (critères B, C, D), 17 items et copyright : conformes.

**Mentaal** (même jeu T5) : 47/85 et sous-scores 25 / 7 / 15 identiques. **Écart Mentaal** : tranches « 17-44 ESPT classique / 45-85 ESPT étendu », sans rapport avec le seuil de dépistage ≥ 44 de l'INSPQ que suit Melya.

## 11-12. Contrat technique et historique

Entrée `pcl-s` (1-5, `persistentInstructions`, `patientIntroSubtitle`, 2 bandes, `thresholdsSource`), scorer `pcl-s.ts` (somme + 3 sous-scores), tests `pcl-s.spec.ts`. 11/10/2026 — Claude (mission n°3) : création et implémentation, tests 6/6.

## 13. Reste à faire avant prod

- [ ] **Arbitrage à valider** : seuil 44 (population générale) par défaut.
- [ ] **Évolution (Adrien)** : rendre `CriteriaCheckBlock` générique pour afficher la méthode par critères DSM-IV (MEL-356).
- [ ] **Vigilance** : champ « événement stressant » non repris (version « spécifique ») — l'identifier en séance.

#### Ajouts de la repasse « regard neuf » (12/10/2026)

- [ ] **Recette** : Recette manuelle sur staging (parcours patient + page résultat), puis passage en ✅ dans Linear et SUIVI.
- [ ] **Arbitrage à valider** : Arbitrage à valider : seuil 44 (population générale) par défaut.
- [ ] **Évolution (Adrien)** : Évolution (Adrien) : rendre `CriteriaCheckBlock` générique pour afficher la méthode par critères DSM-IV (MEL-356).
- [ ] **Vigilance** : Vigilance : champ « événement stressant » non repris (version « spécifique ») — l'identifier en séance.
- [ ] **Arbitrage à valider** : Champ « L'événement stressant que vous avez vécu était (décrivez-le en une phrase) / Date de l'événement » non repris (§10, confiance moyenne) — pour une version **spécifique**, ce champ fixe le référent de tous les items (« cet épisode stressant », « cet événement »). La perte est plus lourde que pour la PCL-5 : la consigne retenue (« à la suite d'un épisode de vie stressant ») ne désigne aucun événement précis, si bien qu'un patient poly-exposé peut répondre pour un autre événement que celui visé par le praticien. — Même recommandation que pour l'ECAB : (a) dans le texte praticien (`longDescription` ou notice d'envoi), « identifiez avec le patient l'événement de référence avant l'envoi (champ de la version papier non repris) » ; (b) champ libre non coté à terme (mécanisme mutualisable avec l'ECAB). — confiance : moyenne (justifiée).
- [ ] **Arbitrage à valider** : Libellé « Échelle de l'état de stress post-traumatique, version spécifique » (§1 : « libellé ALP / Cottraux ») — la fiche ALP n'est **pas archivée** (le dossier ne contient que l'INSPQ et Salmona), et l'INSPQ titre en anglais. Le libellé n'a donc pas de pièce justificative dans le dépôt, et il n'est pas consigné en §10. — Archiver la fiche ALP (texte + URL + date) ou prendre le titre de l'article de validation cité par l'INSPQ (« Évaluation des états de stress post-traumatique : validation d'une échelle, la PCLS ») ; ajouter une ligne en §10. — confiance actuelle : basse → haute après archivage.

Suivi interactif : [dossier de recette](https://claude.ai/artifact/RLrDZwNayBy3gQCFcMDwPB).
