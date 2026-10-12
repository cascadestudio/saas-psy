# Test spec — HONC (Hooked on Nicotine Checklist)

<!-- Fiche rédigée et implémentée par Claude (mission n°3, 11/10/2026). Arbitrages en §10, reste à faire en §13. -->

---

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | HONC (id `honc`) |
| **Nom complet (FR)** | Test HONC de mise en évidence de la dépendance tabagique (titre de la source) |
| **Langue originale** | Hooked on Nicotine Checklist (DiFranza et al., 2002) |
| **Thème** | Addictions (tabac) |
| **Items** | 10, oui/non |
| **Durée** | 2 min (estimation Melya) |
| **Public** | Jeunes fumeurs selon la source (validé chez l'adolescent puis l'adulte) |
| **Mode** | auto |
| **Description praticien** | Test de 10 questions oui/non repérant la perte d'autonomie vis-à-vis du tabac, notamment chez les jeunes fumeurs. |

---

## 2. Sources et traçabilité

- **Source primaire** : La Revue du Praticien, encadré « Test HONC de mise en évidence de la dépendance tabagique » (extrait de « Tabac et adolescents »), page web : https://www.larevuedupraticien.fr/outil/test-honc-de-mise-en-evidence-de-la-dependance-tabagique — texte archivé `HONC_LaRevueDuPraticien_2026-10-11.txt` — 11/10/2026.
- **Source secondaire** : Le Quotidien du médecin, « Test de HONC » (même traduction, relevé par la recherche, non archivé).
- **Original** : DiFranza JR, Savageau JA, Fletcher K, et al. Measuring the loss of autonomy over nicotine use in adolescents: the DANDY study. *Arch Pediatr Adolesc Med* 2002;156(4):397-403.
- **Qualité de la source** : revue médicale professionnelle française ; traduction non attribuée ni validée formellement (§10).
- **Journal de recherche** : recherche « test HONC version française » → La Revue du Praticien, Le Quotidien du médecin ; versions anglaises (NCI, Stanford) pour comparaison. Absent de Mentaal.

---

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | ❓ — aucune phrase de licence trouvée (règle pragmatique : implémentable) |
| **Mention obligatoire** | « HONC (Hooked on Nicotine Checklist) — d'après DiFranza JR, Savageau JA, Fletcher K, et al., Arch Pediatr Adolesc Med 2002;156(4):397-403. Version française : La Revue du Praticien (« Tabac et adolescents »). » |
| **Décision Melya** | go |
| **PDF source en téléchargement (SEO, transparence)** | 🔗 lien seul — renvoyer vers la page de La Revue du Praticien. |

---

## 4. Structure

- **Consigne** : aucune dans la source → `instructions` absent (précédent ADRS). Pas de rappel persistant.
- **Titre patient** : fallback sur le libellé (titre de l'encadré).
- **Réponses** : `1` Oui · `0` Non (ordre de la source).

## 5. Items

| # | Item |
| --- | --- |
| 1 | Avez-vous déjà essayé d'arrêter de fumer sans y parvenir ? |
| 2 | Fumez-vous actuellement parce que c'est vraiment difficile d'arrêter ? |
| 3 | Pensez-vous être dépendant(e) du tabac ? |
| 4 | Avez-vous déjà eu des envies impérieuses de fumer ? |
| 5 | Avez-vous déjà eu un grand besoin d'une cigarette ? |
| 6 | Est-ce difficile de ne pas fumer aux endroits où c'est interdit, comme à l'école ? |
| 7 | Quand vous essayez d'arrêter ou quand vous n'avez pas fumé depuis un certain temps : Était-il difficile de vous concentrer ? |
| 8 | Avez-vous été plus irritable parce que vous ne pouviez pas fumer ? |
| 9 | Avez-vous senti un besoin urgent, une envie impérieuse de fumer ? |
| 10 | Vous êtes-vous senti(e) nerveux(se), incapable de rester tranquille ou angoissé(e) parce que vous ne pouviez pas fumer ? |

## 6-7. Scoring et seuils

1 point par « oui », somme 0-10. Bandes : 0 « Pas de perte d'autonomie mise en évidence (aucune réponse positive) » ; 1-6 « Perte d'autonomie liée à la consommation de tabac » ; 7-10 « Forte dépendance à la nicotine (score ≥ 7) ». Source : « Une réponse positive à un seul item suffit à indiquer une perte d'autonomie… Un score supérieur ou égal à 7 indique un niveau de forte dépendance à la nicotine. »

## 8. Alertes

Aucune.

## 9. Cas de test (`honc.spec.ts`, 6/6, vérifiés en Python)

0 → aucune ; 1 (item 10) → perte d'autonomie ; 6 → perte d'autonomie ; 7 → forte dépendance ; 10 → forte dépendance.

---

## 10. Choix et arbitrages méthodologiques

| Sujet | Choix | Justification | Confiance |
| --- | --- | --- | --- |
| Source | La Revue du Praticien | Seule version française publiée trouvée ; revue professionnelle | moyenne |
| Items 7 à 10 | Item 7 garde l'amorce « Quand vous essayez d'arrêter… : » ; items 8-10 sans amorce | Verbatim de la source. Dans l'original, l'amorce vaut pour les items 7 à 10 ; un écran par item la fait disparaître pour 8-10 (les items restent compréhensibles) | moyenne |
| Bande « 0 » | « Pas de perte d'autonomie mise en évidence » | Négation de la règle de la source | moyenne |
| Consigne | Aucune | Absente de la source (règle « aucun ajout ») | haute |
| Domaine | Addictions | — | haute |

### Recette

**Staging (11/10/2026, Claude)** — patient « Patient Test » : **conforme** (5 jeux sur 5). Le dernier jeu a été saisi par le parcours patient complet dans l'interface ; les autres ont été soumis par l'endpoint du portail patient (`POST /sessions/patient/:id/submit`, le même que l'interface), puis tous relus côté praticien (total, interprétation, sous-scores).

| Jeu | Réponses | Attendu | Obtenu |
| --- | --- | --- | --- |
| T1 min | 0,0,0,0,0,0,0,0,0,0 | 0 | 0, « Pas de perte d'autonomie mise en évidence (aucune réponse positive) » |
| T2 une réponse positive | 0,0,0,0,0,0,0,0,0,1 | 1 | 1, « Perte d'autonomie liée à la consommation de tabac » |
| T3 six | 1,1,1,1,1,1,0,0,0,0 | 6 | 6, « Perte d'autonomie liée à la consommation de tabac » |
| T4 seuil 7 | 1,1,1,1,1,1,1,0,0,0 | 7 | 7, « Forte dépendance à la nicotine (score ≥ 7) » |
| T5 max (parcours patient) | 1,1,1,1,1,1,1,1,1,1 | 10 | 10, « Forte dépendance à la nicotine (score ≥ 7) » |

Pas de consigne (aucune dans la source) : l'écran d'intro n'affiche que le titre et « Commencer », la page praticien n'a pas de bloc « Consigne » (vigilance UX déjà en §13). Graduations 1 et 7, mention La Revue du Praticien, 10 items : conformes.

**Mentaal** : HONC absent de leur catalogue.

## 11. Contrat technique

Entrée `honc` (`single-scale`, Oui 1 / Non 0, sans consigne), scorer `honc.ts` (somme), tests `honc.spec.ts`.

## 12. Historique

| Date | Auteur | Modification |
| --- | --- | --- |
| 11/10/2026 | Claude (mission n°3) | Création et implémentation (La Revue du Praticien), tests 6/6. |

---

## 13. Reste à faire avant prod

- [ ] **Arbitrage à valider** : amorce des items 7-10 laissée sur le seul item 7 (verbatim), ou affichée comme intro de section (fonction `sectionIntros` existante).
- [ ] **Vigilance** : traduction sans auteur identifié (revue professionnelle) — à confronter si une version française validée existe (pas trouvée en ligne).
- [ ] **Vigilance UX** : absence de consigne (bloc « Consigne » vide côté praticien, MEL-356).

#### Ajouts de la repasse « regard neuf » (12/10/2026)

- [ ] **Recette** : Recette manuelle sur staging (parcours patient + page résultat), puis passage en ✅ dans Linear et SUIVI.
- [ ] **Arbitrage à valider** : Arbitrage à valider : amorce des items 7-10 laissée sur le seul item 7 (verbatim), ou affichée comme intro de section (fonction `sectionIntros` existante).
- [ ] **Vigilance** : Vigilance : traduction sans auteur identifié (revue professionnelle) — à confronter si une version française validée existe (pas trouvée en ligne).
- [ ] **Vigilance** : Vigilance UX : absence de consigne (bloc « Consigne » vide côté praticien, MEL-356).
- [ ] **Arbitrage à valider** : Amorce des items 7-10 (§10, confiance moyenne ; §13 « arbitrage à valider ») — l'original anglais (NCI : https://cancercontrol.cancer.gov/sites/default/files/2020-06/honc_questionnaire.pdf ; UMass : https://www.umassmed.edu/contentassets/64a47f3b30914f09b86645f5bfdf67ae/tts-part-2-materials/module-14/honc--hooked-on-nicotine-checklist.pdf) place « When you tried to stop smoking… (or, when you haven't used tobacco for a while…) » en **amorce commune** des items 7 à 10 (items en minuscule « did you… »). La source française l'accole à l'item 7 par mise en page, mais sans elle l'item 9 de l'app (« Avez-vous senti un besoin urgent, une envie impérieuse de fumer ? ») devient un quasi-doublon des items 4 et 5 : il perd sa spécificité (symptôme de sevrage). Ce n'est donc pas seulement une gêne de lecture. — Option recommandée : `sectionIntros` sur 7-10 = « Quand vous essayez d'arrêter ou quand vous n'avez pas fumé depuis un certain temps : » (texte français verbatim, simplement déplacé), et item 7 = « Était-il difficile de vous concentrer ? » (verbatim). C'est un déplacement, pas un ajout ; il est justifié par la structure de l'original. À consigner en §10 comme adaptation de mise en page. — confiance recommandée : haute.
- [ ] **Arbitrage à valider** : Écarts de traduction de la source primaire, à consigner (sans corriger le texte patient) — comparaison avec l'original DiFranza (NCI/UMass) : item 7 FR « Était-il difficile de vous concentrer ? » omet « because you couldn't smoke » (présent dans les items 8 et 10 FR) ; item 3 « Pensez-vous être dépendant(e) » (présent) pour « Have you ever felt like you were addicted » (vie entière) ; item 4 « Avez-vous déjà eu des envies impérieuses » (vie entière) pour « Do you ever have strong cravings » (actuel). Aucune source secondaire française ne corrige ces écarts (la fiche dit que Le Quotidien du médecin reprend la même traduction), donc le verbatim s'impose selon la règle du projet. — Les mentionner en §10 (« écarts connus de la traduction, non corrigés faute de source secondaire ») pour que le validateur décide en connaissance de cause ; archiver la page du Quotidien du médecin (§2 : « non archivé »). — confiance de la source : moyenne (justifiée).
- [ ] **Droits** : Droits §3 (❓) — aucune licence explicite trouvée ; le guide de l'Université de Stanford (outils tabac/vape) indique pour le HONC : « No direct link to scale and scoring available, we suggest seeking access and permission from the lead author directly » (résultat de recherche, cf. https://www.ncsct.co.uk/library/view/pdf/Assessments-for-nicotine-vaping-dependence.pdf). L'outil est largement rediffusé par des institutions publiques (NCI, UMass, Filha) sans restriction, ce qui ne contredit pas la règle pragmatique du projet. — Garder ❓/go, mais ajouter ces URL en §2/§3 et une ligne MEL de demande à l'auteur (J. DiFranza, UMass) non bloquante. Aucune version française validée trouvée (recherches : seules les validations espagnole, Arch Bronconeumol 2024, https://pubmed.ncbi.nlm.nih.gov/38580487/, et japonaise ressortent). — confiance : moyenne.

Suivi interactif : [dossier de recette](https://claude.ai/artifact/RLrDZwNayBy3gQCFcMDwPB).
