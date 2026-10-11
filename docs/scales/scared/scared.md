# Test spec — SCARED (Dépistage des troubles liés à l'anxiété chez l'enfant), version de l'enfant

<!-- Fiche rédigée et implémentée par Claude (mission n°3, 11/10/2026). Arbitrages en §10, reste à faire en §13. -->

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | SCARED (id `scared`), version de l'enfant |
| **Nom complet (FR)** | Dépistage des troubles liés à l'anxiété chez l'enfant |
| **Langue originale** | Screen for Child Anxiety Related (Emotional) Disorders, Birmaher et al. (1995) |
| **Thème** | Anxiété — enfants et adolescents |
| **Items** | 41 (0-2) |
| **Durée** | 10 min (estimation Melya) |
| **Public** | Enfants et adolescents (8-18 ans) ; 8-11 ans : présence d'un adulte recommandée par la source |
| **Mode** | auto (l'enfant répond) ; une version parent existe (archivée, non portée, §13) |
| **Description praticien** | Questionnaire de 41 items rempli par l'enfant pour dépister les troubles anxieux au cours des 3 derniers mois. |

## 2. Sources et traçabilité

- **Source primaire** : version française (fr-CA) de l'University of Pittsburgh, « Version de l'ENFANT », 2 pages + feuille d'évaluation, datée du 27 mars 2012 : https://pre.pediatricbipolar.pitt.edu/sites/default/files/assets/AH/SCARED_Child_Updated_June_2015_fr-CA.pdf — `SCARED_enfant_fr-CA_Pittsburgh.pdf` — 11/10/2026.
- **Version parent** (même site) : `SCARED_parent_fr-CA_Pittsburgh.pdf`.
- **Validation** : Birmaher et al. (1999), JAACAP 38(10), 1230-6 (anglais). Pas de validation française de cette traduction trouvée (traduction acceptée par la règle pragmatique).
- **Journal de recherche** : « SCARED version française » → le PDF intitulé « French SCARED » du site de Pittsburgh est en réalité le SCARED-R-51 de Martin & Gosselin (fiche `scared-r`) ; recherche « Pittsburgh SCARED translations French » → versions enfant et parent fr-CA. Mentaal : `/send/scared` (41 items, n°34).

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | ✉️ — « L'étude SCARED est offerte gratuitement » (PDF) ; usage commercial non mentionné |
| **Mention obligatoire** | « SCARED — élaboré par Boris Birmaher, Suneeta Khetarpal, Marlane Cully, David Brent et Sandra McKenzie, Western Psychiatric Institute and Clinic, University of Pittsburgh (octobre 1995). Version française (fr-CA) diffusée gratuitement par l'University of Pittsburgh. » |
| **Décision Melya** | go |
| **PDF source en téléchargement (SEO, transparence)** | 🔗 lien seul — renvoyer vers pediatricbipolar.pitt.edu. |

## 4. Structure

- **Consigne** (adaptée, §10) : « Tu trouveras ci-dessous une liste de phrases qui décrivent ce que les gens ressentent. Lis chaque énoncé et décide s'il est « Pas vrai ou presque jamais vrai » ou « Plutôt vrai ou parfois vrai » ou « Très vrai ou souvent vrai » pour toi. Ensuite, pour chaque phrase, choisis la réponse qui semble te décrire au cours des 3 derniers mois. »
- **Rappel persistant** : « Au cours des 3 derniers mois : ».
- **Titre patient** : fallback sur le libellé (titre du PDF sans la parenthèse anglaise).
- **Réponses** : `0` Pas vrai ou presque jamais vrai · `1` Plutôt vrai ou parfois vrai · `2` Très vrai ou souvent vrai.

## 5. Items

41 items du PDF, verbatim sauf l'item 26 (§10). Rattachement aux sous-échelles (sigles du PDF) : PN 1, 6, 9, 12, 15, 18, 19, 22, 24, 27, 30, 34, 38 ; TAG 5, 7, 14, 21, 23, 28, 33, 35, 37 ; TAS 4, 8, 13, 16, 20, 25, 29, 31 ; PS 3, 10, 26, 32, 39, 40, 41 ; RSA 2, 11, 17, 36. Texte complet : entrée `scared` de `packages/core/src/scales/index.ts`.

## 6-7. Scoring et seuils

Somme 0-82. Bandes : 0-24 « Sous le seuil de dépistage (score < 25) » ; 25-30 « Peut indiquer la présence d'un trouble anxieux (score ≥ 25) » ; 31-82 « Peut indiquer la présence d'un trouble anxieux (score > 30, plus spécifique) ». Sous-scores PN (0-26), TAG (0-18), TAS (0-16), PS (0-14), RSA (0-8), avec leur seuil indicatif dans le libellé.

## 8. Alertes

Aucune.

## 9. Cas de test (`scared.spec.ts`, 8/8, vérifiés en Python)

0 ; 24 (sous le seuil) ; 25 (seuil) ; 30 ; 31 (plus spécifique) ; 82 ; jeu « une valeur par sous-échelle » : 32 avec PN 7, TAG 9, TAS 5, PS 8, RSA 3 (chaque sous-score à son seuil).

## 10. Choix et arbitrages méthodologiques

| Sujet | Choix | Justification | Confiance |
| --- | --- | --- | --- |
| Seuil de spécificité | « > 30 » (page 2 du questionnaire) | La feuille d'évaluation écrit « > 40 » et « > 25 » ; la page du questionnaire (« ≥ 25 », « > 30 ») concorde avec la version anglaise originale | moyenne |
| Sous-échelles | Sous-scores affichés, seuil dans le libellé | La source donne un seuil par sous-échelle ; une interprétation par sous-échelle est un mécanisme absent (comme la DASS-21) → signalé à Adrien (MEL-356) | moyenne |
| Item 26 | « …des gens que je ne connais peu » → « …que je connais peu » | Type 2 : faute de syntaxe évidente (double négation incomplète) ; correction minimale | moyenne |
| Consigne | « remplis un cercle qui correspond à la réponse » → « choisis la réponse » | Type 1, support papier | moyenne |
| Masculin seul (« nerveux », « seul », « fou », « gêné ») | Conservé | Verbatim de la source (pas de « (e) » ajouté) | moyenne |
| Version | Enfant d'abord | La version parent (41 items reformulés) pourra être ajoutée ensuite (§13) | haute |
| Domaine | Anxiété, catégorie « Anxiété — enfants et adolescents » | Règle validée (enfant/ado rangé par domaine clinique) | haute |

### Recette

**Staging (11/10/2026, Claude)** — patient « Patient Test » : **conforme** (7 jeux sur 7). Le dernier jeu a été saisi par le parcours patient complet dans l'interface ; les autres ont été soumis par l'endpoint du portail patient (`POST /sessions/patient/:id/submit`, le même que l'interface), puis tous relus côté praticien (total, interprétation, sous-scores).

| Jeu | Réponses | Attendu | Obtenu |
| --- | --- | --- | --- |
| T1 min | 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 | 0 ; sous-scores 0 / 0 / 0 / 0 / 0 | 0, « Sous le seuil de dépistage (score < 25) » ; sous-scores 0 / 0 / 0 / 0 / 0 |
| T2 24 | 2,0,0,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,2,0,0,2,0,2,0,0,2,0,0,2,0,0,0,2,0,0,0,0,0,0,0 | 24 ; sous-scores 24 / 0 / 0 / 0 / 0 | 24, « Sous le seuil de dépistage (score < 25) » ; sous-scores 24 / 0 / 0 / 0 / 0 |
| T3 seuil 25 | 2,0,0,0,1,2,0,0,2,0,0,2,0,0,2,0,0,2,2,0,0,2,0,2,0,0,2,0,0,2,0,0,0,2,0,0,0,0,0,0,0 | 25 ; sous-scores 24 / 1 / 0 / 0 / 0 | 25, « Peut indiquer la présence d'un trouble anxieux (score ≥ 25) » ; sous-scores 24 / 1 / 0 / 0 / 0 |
| T4 30 | 2,0,0,0,2,2,2,0,2,0,0,2,0,0,2,0,0,2,2,0,0,2,0,2,0,0,2,0,0,2,0,0,0,2,0,0,0,2,0,0,0 | 30 ; sous-scores 26 / 4 / 0 / 0 / 0 | 30, « Peut indiquer la présence d'un trouble anxieux (score ≥ 25) » ; sous-scores 26 / 4 / 0 / 0 / 0 |
| T5 31 | 2,0,0,0,2,2,2,0,2,0,0,2,0,1,2,0,0,2,2,0,0,2,0,2,0,0,2,0,0,2,0,0,0,2,0,0,0,2,0,0,0 | 31 ; sous-scores 26 / 5 / 0 / 0 / 0 | 31, « Peut indiquer la présence d'un trouble anxieux (score > 30, plus spécifique) » ; sous-scores 26 / 5 / 0 / 0 / 0 |
| T6 max | 2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2 | 82 ; sous-scores 26 / 18 / 16 / 14 / 8 | 82, « Peut indiquer la présence d'un trouble anxieux (score > 30, plus spécifique) » ; sous-scores 26 / 18 / 16 / 14 / 8 |
| T7 sous-échelles distinctes (parcours patient) | 1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,2,0,1,0,0,0,2,1,0,1,0,1,0,0,0,0 | 32 ; sous-scores 7 / 9 / 5 / 8 / 3 | 32, « Peut indiquer la présence d'un trouble anxieux (score > 30, plus spécifique) » ; sous-scores 7 / 9 / 5 / 8 / 3 |

Consigne enfant complète, 3 libellés, graduations 25 et 31, mention « Seuils de la version française de l'University of Pittsburgh », 5 sous-scores avec leur seuil, 41 items et copyright : conformes.

**Mentaal** (même jeu T7, version parent chez Mentaal) : total 32/82 et 5 sous-scores (7, 9, 5, 8, 3) identiques. **Écart Mentaal** : tranches 0-24 / 25-29 / 30-82, alors que la source donne « ≥ 25 » et « > 30 » ; Melya garde 25-30 / 31-82 (un score de 30 reste dans la tranche ≥ 25).

## 11. Contrat technique

Entrée `scared` (`single-scale`, 0-2, 3 bandes, `thresholdsSource`), scorer `scared.ts` (somme + 5 sous-scores), tests `scared.spec.ts`.

## 12. Historique

| Date | Auteur | Modification |
| --- | --- | --- |
| 11/10/2026 | Claude (mission n°3) | Création et implémentation (VF fr-CA Pittsburgh, version enfant), tests 8/8. |

## 13. Reste à faire avant prod

- [ ] **Arbitrage à valider** : seuil « > 30 » (questionnaire) plutôt que « > 40 » (feuille d'évaluation).
- [ ] **Arbitrage à valider** : correction de l'item 26.
- [ ] **Décision produit** : ajouter la version parent (PDF archivé) comme échelle distincte ?
- [ ] **Évolution (Adrien)** : interprétation par sous-échelle (seuils 7, 9, 5, 8, 3), même besoin que la DASS-21 (MEL-356).
- [ ] **Vigilance** : traduction québécoise non validée en France ; 8-11 ans → adulte présent.
