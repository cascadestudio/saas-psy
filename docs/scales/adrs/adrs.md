# Test spec — ADRS (Échelle de repérage de la dépression de l'adolescent)

<!--
Voir _TEMPLATE.md pour les règles projet.
Fiche rédigée et implémentée par Claude en autonomie (lot du 10/10/2026, validée
sur le principe par Clément : domaine Humeur, catégorie « Dépression — adolescents »).
Arbitrages et niveaux de confiance en §10, pour relecture par Clément.
-->

---

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | ADRS (version auto-questionnaire, ADRSp dans la publication) |
| **Nom complet (FR)** | Échelle de repérage de la dépression de l'adolescent (nom au catalogue, cf. §10) |
| **Nom complet (langue originale)** | Adolescent Depression Rating Scale — l'instrument a été construit en français (Revah-Lévy et al., 2007) |
| **Thème principal** | Dépression |
| **Sous-thèmes / tags** | adolescent, repérage, dépression |
| **Nombre d'items** | 10 |
| **Durée estimée de passation** | 5 min (fiche medecin-ado : « 5 min ou plus pour l'ado ») |
| **Public cible** | Adolescents (validation : 402 adolescents francophones) |
| **Mode d'administration** | auto (une version clinicien distincte existe, non portée) |
| **Description praticien (bibliothèque)** | Auto-questionnaire de 10 items vrai / faux pour repérer un risque de dépression chez l'adolescent. |
| **Description patient (portail)** | AUCUNE — règle projet. |

---

## 2. Sources et traçabilité

### Source primaire (items, cotation, seuils de validation)

- **Type** : publication de validation française, en accès libre (CC BY 2.0).
- **Référence** : Revah-Lévy, A., Birmaher, B., Gasquet, I., & Falissard, B. (2007). The Adolescent Depression Rating Scale (ADRS): a validation study. *BMC Psychiatry*, 7, 2. doi:10.1186/1471-244X-7-2
- **URL** : https://bmcpsychiatry.biomedcentral.com/articles/10.1186/1471-244X-7-2 (texte intégral aussi sur PubMed Central, PMC1785378)
- **Fichier de portage** : `docs/scales/adrs/ADRS_BMC-Psychiatry-2007.pdf` — items : tableau 2 (« French and English final version of ADRS patient version »), modalité « vrai/faux » ; seuils : tableau 7 et section « Receiver operator curve analysis ».
- **Date de consultation** : 10/10/2026

### Sources de cross-check (françaises)

- **Société française de dermatologie** — « Repérage de la dépression de l'adolescent – ADRS », fiche score (`ADRS_SFD.pdf`, https://www.sfdermato.org/upload/scores/depression-de-ladolescent.pdf). Même texte, avec une consigne et une cotation propres (cf. divergences).
- **medecin-ado.org** — « 37. Autoquestionnaire ADRS » (`ADRS_medecin-ado.pdf`, https://www.medecin-ado.org/addeo_content/documents_annexes/420-2-adrs.pdf). Reprend les seuils de la publication (« Score = 3 : dépression clinique ; Score = 4 : dépression selon le DSM 4 »).
- **Santé publique France** — « La santé mentale et le bien-être des collégiens et lycéens en France hexagonale. EnCLASS 2024 », 2 juin 2026 (`ADRS_SPF-EnCLASS-2024.pdf`) : les 10 items cités, « un score supérieur ou égal à 7 définit ainsi un risque important de dépression ».
- **ORSaG** — « La santé mentale et le bien-être des élèves en Guadeloupe en 2023 » (EnCLASS, méthodologie OFDT) (`ADRS_ORSaG-EnCLASS-2023.pdf`) : « niveau de risque faible (score de 0 à 3), modéré (score de 4 à 6), patent/évident de dépression (score de 7 à 10) ».
- Toutes consultées le 10/10/2026.

### Divergences constatées entre sources

| Point | Publication (source primaire) | Autres sources |
| --- | --- | --- |
| Item 4 | « …plus rien qui m'amuse. » | SFD : « plus rien ne m'amuse » ; Santé publique France, medecin-ado : « plus rien qui m'amuse » |
| Item 8 | « Je me sens découragé » | SFD : « découragé (e) » ; Santé publique France : « découragé·e » |
| Item 10 | « A l'école, au boulot, j'y arrive pas » | SFD, medecin-ado : « je n'y arrive pas » ; Santé publique France : « À l'école, au boulot, j'y arrive pas » |
| Ordre des items | Tableau 2 | medecin-ado : autre ordre |
| Consigne | Aucune (seule la modalité « vrai/faux » est indiquée) | SFD : « Je coche « vrai » si la phrase correspond à ce que je vis, ou « faux » si elle ne correspond pas. » |
| Seuils | Seuils ROC : 3 (dépression selon le jugement clinique), 4 (dépression selon le DSM-IV) | Enquêtes nationales : 0-3 / 4-6 / 7-10 ; SFD : cotation incohérente (« < 4 et < 8 », « > 8 », « seuil > 4 ») |

### Version française retenue

Instrument original francophone (validation multicentrique France, Belgique, Suisse) : pas de traduction.

### Comparaison Mentaal

Parcours praticien → patient complet sur [mentaal.fr/send/adrs](https://mentaal.fr/send/adrs) le 10/10/2026 (catégories Mentaal « Dépression, Enfance », public « Adolescents »), patient fictif, jeu R7 (7 réponses « Vrai », item 6 = Faux). La publication tranche.

| Point | Publication (source primaire) | Melya | Mentaal |
| --- | --- | --- | --- |
| Consigne | Aucune | Aucune (§10) | « Pour chaque question cochez « vrai » si cela correspond à ce que vous vivez en ce moment, « faux » si cela ne correspond pas » (adaptée de la fiche SFD, absente de la publication) |
| Item 4 | « …plus rien qui m'amuse » | Verbatim | « …plus rien ne m'amuse » (texte SFD) |
| Item 8 | « Je me sens découragé » | « découragé(e) » | « découragé(e) » |
| Item 10 | « A l'école, au boulot, j'y arrive pas » | « À l'école… j'y arrive pas » | « A l'école, au boulot, je n'y arrive pas » (texte SFD) |
| Tranches | Seuils ROC 3 et 4, sans bandes | 0-3 / 4-6 / 7-10 (OFDT, Santé publique France) | 0-3 « faible » / 4-8 « modéré » / 9-10 « important » (proches de la fiche SFD, source non indiquée) |
| Score du jeu R7 | 7 | 7/10, « Risque important de dépression » | 7/10, « Risque de dépression modéré » |
| Alerte item 6 | — | Oui (alerte critique) | Non vérifiée (item 6 = Faux dans le jeu) |
| Durée annoncée | — | 5 minutes | 2 minutes |

**Lecture** : Mentaal porte le texte de la fiche SFD (une source secondaire) plutôt que celui de la publication, et des tranches 4-8 / 9-10 qui contredisent les enquêtes nationales : un adolescent à 7 ou 8 est classé « modéré » chez eux, « risque important » chez nous et chez Santé publique France.

---

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | libre ✅ |
| **Détenteur des droits** | Revah-Lévy, Birmaher, Gasquet & Falissard (2007) |
| **Phrase de licence** | « This is an Open Access article distributed under the terms of the Creative Commons Attribution License (http://creativecommons.org/licenses/by/2.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original work is properly cited. » (article, PMC1785378, consulté le 10/10/2026) |
| **Mention obligatoire à afficher** | « ADRS (Adolescent Depression Rating Scale), version auto-questionnaire — Revah-Lévy, Birmaher, Gasquet & Falissard (2007), BMC Psychiatry, 7:2 (article sous licence CC BY 2.0). Instrument original francophone. » |
| **Restrictions d'usage commercial** | Aucune (CC BY : citation obligatoire) |
| **Décision Melya** | go |
| **PDF source en téléchargement (SEO, transparence)** | 📥 hébergeable — Article de validation (Revah-Lévy et al., BMC Psychiatry 2007) sous licence CC BY 2.0. Fichier `ADRS_BMC-Psychiatry-2007.pdf` avec attribution. Les fiches SFD, medecin-ado, SPF et ORSaG : lien seulement. Statut tranché par Claude le 11/10/2026 (grille : 📥 hébergeable / 🔗 lien vers la source officielle / 🚫 non). |

---

## 4. Structure de l'échelle

### Consigne officielle

Aucune consigne dans la source primaire : aucune consigne n'est affichée (règle 5 ; même choix que le FTND). Voir §10.

### Comportement UX de la consigne

| Champ | Valeur |
| --- | --- |
| **Persistance** | Sans objet (pas de consigne) |
| **Emplacement** | Sans objet |
| **Justification** | Absente de la source primaire |
| **Cas particuliers** | Aucun |

### Affichage du titre côté portail patient

| Champ | Valeur |
| --- | --- |
| **Élément(s) affiché(s) en titre sur le PDF source primaire** | Le questionnaire n'a pas d'en-tête propre (tableau 2 de l'article) |
| **Sous-titre à afficher dans l'app (`patientIntroSubtitle`)** | `null` (acronyme seul) |
| **Divergence avec le PDF** | Aucune |

### Dimensions de cotation

**Dimension unique — vrai / faux**

- `1` — Vrai
- `0` — Faux

---

## 5. Items

| # | Item (source primaire, tableau 2) |
| --- | --- |
| 1 | Je n'ai pas d'énergie pour l'école, pour le travail |
| 2 | J'ai du mal à réfléchir |
| 3 | Je sens que la tristesse, le cafard me débordent en ce moment |
| 4 | Il n'y a rien qui m'intéresse, plus rien qui m'amuse |
| 5 | Ce que je fais ne sert à rien |
| 6 | Au fond, quand c'est comme ça, j'ai envie de mourir |
| 7 | Je ne supporte pas grand-chose |
| 8 | Je me sens découragé(e) |
| 9 | Je dors très mal |
| 10 | À l'école, au boulot, j'y arrive pas |

Écarts au texte de l'article (items 4, 8, 10) : §10.

---

## 6. Algorithme de scoring

### Calcul du score total

Nombre de réponses « Vrai » (1 point chacune). **Plage** : 0 à 10.

### Subscores calculés

Sans objet.

### Inversions d'items

Sans objet.

### Gestion des réponses manquantes

Passation incomplète refusée, pas d'imputation (règle projet). Les enquêtes OFDT calculent le score même avec des items non renseignés ; non retenu.

---

## 7. Seuils d'interprétation

| Score | Interprétation |
| --- | --- |
| 0–3 | Niveau de risque faible |
| 4–6 | Niveau de risque modéré |
| 7–10 | Risque important de dépression |

**Source des seuils** :

| Champ | Valeur |
| --- | --- |
| **Référence académique** | Méthodologie OFDT des enquêtes EnCLASS (ORSaG 2024, résultats EnCLASS 2023) ; Santé publique France, EnCLASS 2024 (2026) pour le seuil ≥ 7 |
| **URL directe vérifiable** | https://orsag.fr/wp-content/uploads/2024/10/Rapport_Sante_mentale_Bien-etre_VF.pdf ; https://www.santepubliquefrance.fr/sites/default/files/cadic_files/documents/spf00006678.pdf |
| **Date de consultation** | 10/10/2026 |
| **Niveau de consensus** | propre à la version FR (enquêtes nationales françaises) ; le seuil de 4 rejoint le seuil DSM-IV de la publication |

**Remarques sur les seuils** : la publication propose deux seuils ROC (3 : dépression selon le jugement clinique, sensibilité 0,79 / spécificité 0,60 ; 4 : dépression selon le DSM-IV, 0,80 / 0,60) mais aucun libellé de bande. Arbitrage en §10.

---

## 8. Alertes cliniques

**Règle d'alerte** : si l'item 6 (« Au fond, quand c'est comme ça, j'ai envie de mourir ») = Vrai, alerte `suicide-ideation` de sévérité critique, indépendamment du score total.

| Champ | Valeur |
| --- | --- |
| **Référence** | Choix Melya, sur le modèle de l'item 9 du PHQ-9 (aucune règle d'alerte dans les sources) |
| **URL** | Sans objet |
| **Date de consultation** | Sans objet |
| **Justification du seuil exact** | Item binaire : toute réponse « Vrai » exprime une envie de mourir |

**Comportement côté UI** : bandeau d'alerte et item signalé côté praticien ; rien côté patient.

**Rationale clinique** : un score total faible avec une envie de mourir déclarée reste une urgence d'évaluation.

---

## 9. Cas de test unitaires

*Réponses : 1 = Vrai, 0 = Faux. Calculs vérifiés en Python le 10/10/2026, rejoués par `apps/api/src/scoring/scorers/adrs.spec.ts`.*

### 1. Cas limites (min/max)

| # | Réponses | Score | Interprétation | Alerte |
| --- | --- | --- | --- | --- |
| T1 | 10 × Faux | 0 | Niveau de risque faible | non |
| T7 | 10 × Vrai | 10 | Risque important de dépression | oui |

### 2. Transitions de seuil (« Vrai » placés hors item 6)

| # | Nombre de « Vrai » | Score | Interprétation |
| --- | --- | --- | --- |
| T2 | 3 | 3 | Niveau de risque faible |
| T3 | 4 | 4 | Niveau de risque modéré |
| T4 | 6 | 6 | Niveau de risque modéré |
| T5 | 7 | 7 | Risque important de dépression |
| T6 | 9 | 9 | Risque important de dépression |

### 3. Cas spécifiques à l'échelle

| # | Cas | Score | Résultat attendu |
| --- | --- | --- | --- |
| T8 | Item 6 seul = Vrai | 1 | Niveau de risque faible + alerte critique sur l'item 6 |

### 4. Entrées invalides

| # | Cas | Comportement attendu |
| --- | --- | --- |
| T9 | Valeur hors {0, 1}, réponse manquante, tableau de mauvaise taille | Non contrôlé par le scorer (comportement commun à tous les scorers, cf. §10) ; impossible depuis la passation |

---

## 10. Choix et arbitrages méthodologiques

*Arbitrages tranchés par Claude (10/10/2026), à relire par Clément. Confiance : haute / moyenne / basse.*

### Écarts à la source primaire

| Élément | Source primaire | Texte retenu | Origine du texte retenu | Justification | Confiance |
| --- | --- | --- | --- | --- | --- |
| Item 8 | « Je me sens découragé » | « Je me sens découragé(e) » | Accord en genre (SFD : « découragé (e) » ; SPF : « découragé·e ») | Type 2 : écriture inclusive, cohérente avec le catalogue et avec les sources secondaires | haute |
| Item 10 | « A l'école… » | « À l'école… » | Santé publique France | Type 2 : accent sur la capitale (typographie) | haute |
| Item 4 | « …plus rien qui m'amuse. » (seul item avec un point) | Sans point final | Typographie | Harmonisation avec les 9 autres items, sans point dans la source | haute |

Les autres reformulations des sources secondaires (« je n'y arrive pas », « plus rien ne m'amuse ») ne sont **pas** retenues : la publication fait foi.

### Autres arbitrages

| Sujet | Choix retenu | Justification et sources | Confiance |
| --- | --- | --- | --- |
| Seuils | 0-3 / 4-6 / 7-10 (enquêtes nationales) plutôt que les seuils ROC 3 et 4 de la publication | Seule source française à nommer toutes les bandes ; méthodologie OFDT reprise par Santé publique France et l'ORSaG ; le seuil 4 coïncide avec le seuil DSM-IV de la publication. Les seuils de la publication n'ont pas de libellés français pour toutes les bandes (medecin-ado parle de « dépression clinique », trop diagnostique pour un outil de repérage). | moyenne |
| Libellés des bandes | « Niveau de risque faible », « Niveau de risque modéré », « Risque important de dépression » | Termes de l'ORSaG et de Santé publique France | haute |
| Consigne | Aucune | Absente de la source primaire (règle 5, précédent FTND). La consigne de la SFD est disponible si Clément souhaite l'afficher : ce serait un ajout issu d'une source secondaire. | moyenne |
| Alerte item 6 | Alerte critique dès « Vrai » | Choix de sécurité clinique sur le modèle du PHQ-9 ; aucune source n'en définit. | moyenne |
| Nom au catalogue | « Échelle de repérage de la dépression de l'adolescent » | Titre de la fiche SFD (« Repérage de la dépression de l'adolescent ») ; la publication n'a pas de nom français. | moyenne |
| Sous-titre patient | Aucun (acronyme seul) | Le questionnaire n'a pas d'en-tête dans la source | haute |
| Domaine et catégorie | Humeur ; « Dépression — adolescents » | Architecture validée par Clément (domaine = famille DSM-5, âge dans la catégorie) | haute |
| Version | Auto-questionnaire seulement | La version clinicien est une hétéro-évaluation, hors flux actuel | haute |
| Entrées invalides | Comportement existant (pas de validation serveur) | Aucun scorer ne valide ses entrées ; en créer une serait un mécanisme nouveau | haute |

### Questions ouvertes

1. **Afficher la consigne de la SFD ?** Recommandation : oui si l'écran sans consigne gêne en recette, en la consignant comme ajout issu d'une source secondaire.

### Recette

Recette Claude du 10/10/2026 sur staging (commit 7fb339e, déploiements API et web verts), patient de test « Patient Test » :

| Jeu | Réponses « Vrai » | Attendu | Staging |
| --- | --- | --- | --- |
| Min (T1) | aucune | 0, risque faible, pas d'alerte | 0/10, « Niveau de risque faible », pas d'alerte ✓ |
| Début tranche 2 (T3) | items 1-4 | 4, risque modéré | 4/10, « Niveau de risque modéré » ✓ |
| Début tranche 3 (T5) | items 1-5, 7, 8 | 7, risque important | 7/10, « Risque important de dépression » ✓ |
| Alerte (T8) | item 6 seul | 1, risque faible, alerte | 1/10, « Niveau de risque faible », bandeau « Alerte critique » sur l'item 6 ✓ |
| Max (T7) | tous | 10, risque important, alerte | 10/10, « Risque important de dépression », « Alerte critique » ✓ |

Contrôles : écran d'intro patient sans consigne ni sous-titre (« ADRS · 10 questions · 5 minutes ») ; boutons Vrai puis Faux ; aucun score côté patient ; source des tranches affichée sous la jauge.

**Point à regarder** : faute de consigne, le résultat praticien affiche un intitulé « Consigne » vide (comportement existant de la page résultats ; signalé dans le ticket design).

---

## 11. Contrat technique

- Entrée `adrs` dans `packages/core/src/scales/index.ts` : `formType: "single-scale"`, clés `intensity_0` … `intensity_9`, `answerScales.intensity` = Vrai (1) / Faux (0) (patron HSPS), pas d'`instructions`, `patientIntroSubtitle: null`, 3 bandes.
- Scorer `apps/api/src/scoring/scorers/adrs.ts` (somme + `resolveSeverity` + alerte `suicide-ideation` sur l'item 6, patron PHQ-9), enregistré sous `adrs`.
- Tests : `adrs.spec.ts` (T1-T8 + ordre des réponses).

---

## 12. Historique des modifications

| Date | Auteur | Modification |
| --- | --- | --- |
| 10/10/2026 | Claude (lot autonome, validé sur le principe par Clément) | Création de la fiche et implémentation : publication BMC Psychiatry 2007 (CC BY) en source primaire, items verbatim, tranches OFDT / Santé publique France, alerte item 6. Tests 9/9. |
| 10/10/2026 | Claude (lot autonome) | Recette staging conforme (0, 4, 7, alerte item 6, 10). Parcours Mentaal : texte SFD et tranches 4-8 / 9-10 chez eux (jeu R7 classé « modéré » chez Mentaal, « important » chez nous). |

## 13. Reste à faire avant prod

<!-- Généré le 12/10/2026 depuis la repasse « regard neuf » ; suivi interactif : https://claude.ai/artifact/RLrDZwNayBy3gQCFcMDwPB -->

- [ ] **Recette** : Recette manuelle sur staging (parcours patient + page résultat), puis passage en ✅ dans Linear et SUIVI.
- [ ] **Arbitrage à valider** : Item 8 « découragé(e) » classé « Type 2 » — Source primaire, tableau 2 : « Je me sens découragé » ; app : « Je me sens découragé(e) ». Le type 2 couvre une **coquille manifeste** : un masculin générique n'est pas une coquille. Ce n'est pas non plus une erreur prouvée (type 3). Il s'agit donc d'un ajout de texte, même minime, que les règles n'admettent pas tel quel. Il reste défendable parce que deux sources secondaires françaises le portent (SFD : « découragé (e) » ; SPF EnCLASS 2024, l. 187 : « découragé·e »). — Option recommandée : soit revenir au verbatim « découragé », le plus fidèle ; soit garder « découragé(e) » en requalifiant la ligne du §10. La justification deviendrait alors « accord en genre repris d'une source secondaire (SFD) ; ne relève d'aucun des types admis, dérogation assumée ». La décision revient à l'humain. — Confiance recommandée : **moyenne**, pas haute.
- [ ] **Arbitrage à valider** : Un score de 3 est libellé « Niveau de risque faible » — Publication (source primaire, p. 6) : « the cut-off corresponding to the clinical judgment of depression was 3 and the cut-off corresponding to the DSM-IV was 4 » (tableau 7 : « Cut off 3: 0.79/0.60 ; Cut-off 4: 0.80/0.60 ») ; medecin-ado : « Score = 3 : dépression clinique ». L'app, en revanche, classe un 3 dans la bande « Niveau de risque faible » (`{ min: 0, max: 3 }`). Les bandes OFDT/SPF sont sourcées, ce qui rend le choix acceptable. Mais elles proviennent d'une méthodologie d'**enquête épidémiologique**, alors que les seuils de **validation clinique** de la source primaire restent invisibles pour le praticien. — Option recommandée : garder les bandes OFDT, mais mentionner dans `scoring.method` (texte praticien, hors patient) les seuils ROC de la publication : « seuil 3 : dépression selon le jugement clinique (Se 0,79 / Sp 0,60) ; seuil 4 : dépression selon le DSM-IV (Se 0,80 / Sp 0,60) ». Il faut aussi signaler en §10 qu'un 3 est « faible » pour l'OFDT mais au seuil clinique pour la publication. La confiance « moyenne » du §10 est juste.
