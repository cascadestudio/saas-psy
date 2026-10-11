# Test spec — CAT-Q (Questionnaire sur les traits autistiques de camouflage)

<!-- Fiche rédigée et implémentée par Claude (mission n°3, 11/10/2026). Arbitrages en §10, reste à faire en §13. -->

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | CAT-Q (id `cat-q`) |
| **Nom complet (FR)** | Questionnaire sur les traits autistiques de camouflage (Embrace Autism) |
| **Langue originale** | Camouflaging Autistic Traits Questionnaire (Hull et al., 2018) |
| **Thème** | Autisme (TSA) de l'adulte — domaine Neurodéveloppement |
| **Items** | 25 (1-7), 5 inversés, 3 sous-échelles |
| **Durée** | 5-10 min (source) |
| **Public** | Adultes 16 ans et plus |
| **Mode** | auto |
| **Description praticien** | Questionnaire de 25 items mesurant le recours aux stratégies de camouflage social des traits autistiques chez l'adulte. |

## 2. Sources et traçabilité

- **Source primaire** : Embrace Autism, « Le CAT-Q », traduction de Marika B. Bessette (page web, test en ligne, consigne de cotation, licence) : https://embrace-autism.com/cat-q-fr/ — texte archivé `CAT-Q_EmbraceAutism_FR_2026-10-11.txt` — 11/10/2026.
- **Qualité de la source** : traduction diffusée par une association (non validée) ; la **validation française** est Bureau et al. (2024), *Journal of Autism and Developmental Disorders* (abonnement, texte non consulté) → à confronter (§13).
- **Original** : Hull L. et al. (2018). Development and validation of the CAT-Q. *J Autism Dev Disord*, 49, 819-833 (CC BY).
- **Journal de recherche** : « CAT-Q version française » → Bureau 2024 (JADD, abonnement), embrace-autism.com/cat-q-fr ; Mentaal : `/send/cat-q` (25 items, n°9).

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | ✅ — « distribué sous les termes de la licence internationale Creative Commons Attribution 4.0 » (page Embrace Autism ; article original également CC BY) |
| **Mention obligatoire** | « CAT-Q — Hull, Mandy, Lai, Baron-Cohen, Allison, Smith & Petrides (2018), licence CC BY 4.0. Traduction française : Marika B. Bessette (Embrace Autism). » |
| **Décision Melya** | go |
| **PDF source en téléchargement** | 📥 possible (CC BY) mais pas de PDF français officiel ; 🔗 vers Embrace Autism en pratique. |

## 4. Structure

- **Consigne** (verbatim du formulaire, aussi en rappel persistant) : « Lisez les énoncés suivants et choisissez les réponses qui correspondent le plus fidèlement possible à vos expériences personnelles lors d'interactions sociales. »
- **Titre patient** : `null` (acronyme seul).
- **Réponses** (libellés du formulaire) : `1` Totalement en désaccord · `2` Pas d'accord · `3` Un peu en désaccord · `4` Ni d'accord ni en désaccord · `5` Plutôt d'accord · `6` D'accord · `7` Tout à fait d'accord.

## 5. Items

25 énoncés de la page (texte : entrée `cat-q` et fichier archivé). Inversés : 3, 12, 19, 22, 24.

## 6-7. Scoring et seuils

Somme après inversion, 25-175 ; sous-scores compensation (9-63), masquage (8-56), assimilation (8-56). Bandes : 25-99 « Sous le seuil de 100 indiqué par Embrace Autism » ; 100-175 « Score ≥ 100 : camouflage de traits autistiques (seuil indiqué par Embrace Autism) ».

## 8. Alertes

Aucune.

## 9. Cas de test (`cat-q.spec.ts`, 6/6, vérifiés en Python)

25 (min, inversés à 7) ; 175 (max) ; tout à 4 = 100 ; 99 ; 100 ; sous-scores contrôlés.

## 10. Choix et arbitrages méthodologiques

| Sujet | Choix | Justification | Confiance |
| --- | --- | --- | --- |
| Traduction | Bessette (Embrace Autism) | Seule version française complète accessible ; la validée (Bureau 2024) est sur abonnement | moyenne |
| Libellés de réponse | Ceux du formulaire (« Totalement en désaccord »…) | La page liste d'autres libellés dans sa présentation ; le formulaire fait foi | moyenne |
| Seuil 100 | Retenu, attribué à Embrace Autism dans les libellés | Indiqué par la source ; absent de l'article original ; l'afficher clairement comme non publié par les auteurs | basse |
| Guillemets « performer », « normal » | Guillemets français | Typographie (précédent PDEQ) ; la page utilise des guillemets anglais | haute |
| Masculin seul (« détendu », « intéressé », « conscient ») | Conservé | Verbatim | moyenne |
| Domaine | Neurodéveloppement, catégorie « Autisme (TSA) de l'adulte » | Famille DSM-5 | haute |

### Recette

**Staging (11/10/2026, Claude)** — patient « Patient Test » : **conforme** (5 jeux sur 5). Le dernier jeu a été saisi par le parcours patient complet dans l'interface ; les autres ont été soumis par l'endpoint du portail patient (`POST /sessions/patient/:id/submit`, le même que l'interface), puis tous relus côté praticien (total, interprétation, sous-scores).

| Jeu | Réponses | Attendu | Obtenu |
| --- | --- | --- | --- |
| T1 min (inversés à 7) | 1,1,7,1,1,1,1,1,1,1,1,7,1,1,1,1,1,1,7,1,1,7,1,7,1 | 25 ; sous-scores 9 / 8 / 8 | 25, « Sous le seuil de 100 indiqué par Embrace Autism » ; sous-scores 9 / 8 / 8 |
| T2 max (inversés à 1) | 7,7,1,7,7,7,7,7,7,7,7,1,7,7,7,7,7,7,1,7,7,1,7,1,7 | 175 ; sous-scores 63 / 56 / 56 | 175, « Score ≥ 100 : camouflage de traits autistiques (seuil indiqué par Embrace Autism) » ; sous-scores 63 / 56 / 56 |
| T3 tout à 4 | 4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4 | 100 ; sous-scores 36 / 32 / 32 | 100, « Score ≥ 100 : camouflage de traits autistiques (seuil indiqué par Embrace Autism) » ; sous-scores 36 / 32 / 32 |
| T4 juste sous le seuil (99) | 3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4 | 99 ; sous-scores 35 / 32 / 32 | 99, « Sous le seuil de 100 indiqué par Embrace Autism » ; sous-scores 35 / 32 / 32 |
| T5 seuil (100) (parcours patient) | 4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4 | 100 ; sous-scores 36 / 32 / 32 | 100, « Score ≥ 100 : camouflage de traits autistiques (seuil indiqué par Embrace Autism) » ; sous-scores 36 / 32 / 32 |

Consigne, 7 libellés, graduation 100, mention « Seuil indiqué par Embrace Autism (non publié par les auteurs) », 3 sous-scores, 25 items, items inversés (T1, T2) et mention CC BY 4.0 : conformes.

**Mentaal** (même jeu T5) : 100/175 et sous-scores 36 / 32 / 32 identiques. Mentaal n'affiche pas de seuil mais des moyennes de référence par genre.

## 11-12. Contrat technique et historique

Entrée `cat-q` (1-7, `reverseItems`), scorer `cat-q.ts` (inversion + somme + 3 sous-scores), tests `cat-q.spec.ts`. 11/10/2026 — Claude (mission n°3) : création et implémentation, tests 6/6.

## 13. Reste à faire avant prod

- [ ] **Action documentaire** : article de validation française Bureau et al. 2024 (JADD) — comparer les items et décider de basculer sur la version validée.
- [ ] **Arbitrage à valider** : seuil de 100 (source associative, pas les auteurs) — le garder, ou bande unique sans seuil.
- [ ] **Relecture** : libellés de réponse du formulaire vs ceux du texte de présentation.
