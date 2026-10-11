# Test spec — SCARED-R-51 (version française de Martin & Gosselin, 2011)

<!-- Fiche rédigée et implémentée par Claude (mission n°3, 11/10/2026). Arbitrages en §10, reste à faire en §13. -->

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | SCARED-R-51 (id `scared-r`) |
| **Libellé catalogue** | Grille d'évaluation des troubles anxieux chez l'enfant (SCARED-R, 51 items) (libellé de `SUIVI_ECHELLES.md` ; le PDF ne porte que « SCARED-R-51 ») |
| **Langue originale** | Screen for Child Anxiety Related Emotional Disorders – Revised (Muris et al.) |
| **Thème** | Anxiété — enfants et adolescents |
| **Items** | 51 (0-2), 10 sous-échelles |
| **Durée** | 10-15 min (estimation Melya) |
| **Public** | Enfants (« personnes de ton âge ») |
| **Mode** | auto (l'enfant répond) |

## 2. Sources et traçabilité

- **Source primaire** : formulaire « SCARED-R-51 », © Martin, A. et Gosselin, P. (2011), 3 pages avec la liste des sous-échelles, hébergé par l'University of Pittsburgh sous le nom « French Screen for Child Anxiety Related Disorders (SCARED) » : https://pre.pediatricbipolar.pitt.edu/sites/default/files/assets/AH/French%20Screen%20for%20Child%20Anxiety%20Related%20Disorders%20(SCARED).pdf — `SCARED-R-51_Martin-Gosselin-2011_Pittsburgh.pdf` — 11/10/2026.
- **Autre version française** (non retenue) : SCARED-R 66 items de Bouvard, Roulin & Denis (2013), *Psychologica Belgica* 53(2) (accès libre, items non reproduits) — `SCARED-R_Bouvard-2013_PsychologicaBelgica.pdf`.
- **Journal de recherche** : recherche « SCARED version française » → ce PDF ; lecture : il s'agit du SCARED-R québécois en 51 items, distinct du SCARED (41 items, fiche `scared`) et du SCARED-R de Bouvard (66 items). Absent de Mentaal.

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | ❓ — « © Martin, A. et Gosselin, P. (2011) », aucune phrase de licence (règle pragmatique : implémentable) |
| **Mention obligatoire** | « SCARED-R-51 — © Martin, A. et Gosselin, P. (2011), d'après le SCARED-R de Muris et al. Version diffusée par l'University of Pittsburgh. » |
| **Décision Melya** | go |
| **PDF source en téléchargement** | 🔗 lien seul (© des traducteurs, pas de licence de rediffusion). |

## 4. Structure

- **Consigne** (adaptée) : « Voici des peurs que les personnes de ton âge peuvent avoir. Regarde chacune des phrases attentivement et indique à quel point tu as vécu ces peurs durant les 3 derniers mois. Il n'y a pas de bonne ou mauvaise réponse. Choisis la réponse qui te ressemble le plus. »
- **Rappel** : « Durant les 3 derniers mois : ». **Titre patient** : acronyme seul (`null`).
- **Réponses** : `0` Jamais ou presque jamais · `1` Quelques fois · `2` Souvent.

## 5. Items et sous-échelles

Items 1-51 du PDF (texte : entrée `scared-r` de `index.ts`). Sous-échelles (liste du PDF) : trouble panique 1, 9, 14, 27, 35, 42, 45 ; TAG 8, 17, 29, 30, 36, 41, 43 ; anxiété de séparation 7, 10, 15, 24, 32, 37, 38 ; phobie sociale 4, 11, 34, 39 ; TOC 6, 20, 22, 40, 47 ; TSPT 21, 31, 33, 49 ; phobie scolaire 3, 13, 25, 44 ; phobie des animaux 18, 28, 50 ; phobie situationnelle 2, 19, 23, 46, 48 ; phobie des soins médicaux 5, 12, 16, 26, 51.

## 6-7. Scoring et seuils

Somme 0-102 + 10 sous-scores. Aucun seuil dans la source : bande unique « Pas de seuil clinique fourni par les auteurs. »

## 8. Alertes

Aucune.

## 9. Cas de test (`scared-r.spec.ts`, 5/5)

0 ; 102 ; un item par sous-échelle (15, sous-scores 1/2 alternés) ; jeu typique (51).

## 10. Choix et arbitrages méthodologiques

| Sujet | Choix | Justification | Confiance |
| --- | --- | --- | --- |
| Item 8 | « ne n'aiment pas » → « ne m'aiment pas » | Type 2, coquille évidente | haute |
| Item 49 | « un événement négative » → « négatif » | Type 2, accord | haute |
| Item 20 | « …plus d'une fois en ligne pour vérifier… » conservé | Formulation étrange (« d'affilée » ?) mais sens compréhensible ; pas de source pour corriger | moyenne |
| Consigne | « Coche la réponse » → « Choisis la réponse » | Type 1 | moyenne |
| Identité de l'instrument | SCARED-R-51 (Martin & Gosselin) porté sous la ligne « SCARED-R » du suivi | Le suivi visait le SCARED-R de Muris (VF Bouvard 2013, 66 items, texte non accessible) ; la version 51 items est la seule française accessible | moyenne |
| Seuil | Aucun | Absent de la source | haute |

### Recette

**Staging (11/10/2026, Claude)** — patient « Patient Test » : **conforme** (4 jeux sur 4). Le dernier jeu a été saisi par le parcours patient complet dans l'interface ; les autres ont été soumis par l'endpoint du portail patient (`POST /sessions/patient/:id/submit`, le même que l'interface), puis tous relus côté praticien (total, interprétation, sous-scores).

| Jeu | Réponses | Attendu | Obtenu |
| --- | --- | --- | --- |
| T1 min | 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 | 0 ; sous-scores 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0, « Pas de seuil clinique fourni par les auteurs. » ; sous-scores 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 |
| T2 max | 2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2 | 102 ; sous-scores 14 / 14 / 14 / 8 / 10 / 8 / 8 / 6 / 10 / 10 | 102, « Pas de seuil clinique fourni par les auteurs. » ; sous-scores 14 / 14 / 14 / 8 / 10 / 8 / 8 / 6 / 10 / 10 |
| T3 un item par sous-échelle | 1,1,1,2,2,1,1,2,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 | 15 ; sous-scores 1 / 2 / 1 / 2 / 1 / 2 / 1 / 2 / 1 / 2 | 15, « Pas de seuil clinique fourni par les auteurs. » ; sous-scores 1 / 2 / 1 / 2 / 1 / 2 / 1 / 2 / 1 / 2 |
| T4 typique (parcours patient) | 0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2 | 51 ; sous-scores 10 / 8 / 6 / 3 / 4 / 4 / 3 / 3 / 4 / 6 | 51, « Pas de seuil clinique fourni par les auteurs. » ; sous-scores 10 / 8 / 6 / 3 / 4 / 4 / 3 / 3 / 4 / 6 |

Consigne, 3 libellés, jauge sans graduation, 10 sous-scores, 51 items et mention Martin & Gosselin (2011) : conformes.

**Mentaal** : SCARED-R-51 absente de leur catalogue.

## 11-12. Contrat technique et historique

Entrée `scared-r`, scorer `scared-r.ts` (somme + 10 sous-scores), tests `scared-r.spec.ts`. 11/10/2026 — Claude (mission n°3) : création et implémentation, tests 5/5.

## 13. Reste à faire avant prod

- [ ] **Arbitrage à valider** : porter la version québécoise 51 items (Martin & Gosselin) sous la ligne SCARED-R.
- [ ] **Relecture** : item 20 (« en ligne »).
- [ ] **Action documentaire (optionnelle)** : Bouvard, *Échelles et questionnaires d'évaluation chez l'enfant et l'adolescent* (2e éd. 2025) pour le SCARED-R 66 items validé en France, si on préfère la version française de France.
