# Test spec — CAST (Cannabis Abuse Screening Test)

<!--
Voir _TEMPLATE.md pour les règles projet.
Fiche rédigée et implémentée par Claude en autonomie (lot du 11/10/2026).
Arbitrages et niveaux de confiance en §10, pour relecture par Clément.
-->

---

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | CAST |
| **Nom complet (FR)** | Cannabis Abuse Screening Test (l'OFDT n'emploie que le nom anglais ; « échelle de repérage des consommations problématiques de cannabis » en description) |
| **Nom complet (langue originale)** | Instrument construit en français par l'OFDT ; nom anglais d'origine |
| **Thème principal** | Addictions |
| **Sous-thèmes / tags** | cannabis, repérage, usage problématique, dépendance |
| **Nombre d'items** | 6 (aucun inversé) |
| **Durée estimée de passation** | 2 min (estimation Melya, cf. §10) |
| **Public cible** | Adolescents et adultes consommateurs de cannabis (validé chez l'adolescent ; adulte : Baromètre santé, cf. §10) |
| **Mode d'administration** | auto |
| **Description praticien (bibliothèque)** | Questionnaire de 6 items repérant un usage problématique de cannabis au cours des 12 derniers mois. |
| **Description patient (portail)** | AUCUNE — règle projet. |

---

## 2. Sources et traçabilité

### Source primaire (items, réponses, cotation, seuils)

- **Type** : publication de l'OFDT, concepteur de l'outil — questionnaire complet (p. 3, encadré « CAST ») et règles de cotation (p. 3).
- **Référence** : Spilka S., Janssen E. (OFDT) et Legleye S. (INED), *Détection des usages problématiques de cannabis : le Cannabis Abuse Screening Test (CAST)*, Note n°2013-02, Saint-Denis, 03/09/2013, 9 p.
- **Page** : https://www.ofdt.fr/publication/2013/detection-des-usages-problematiques-de-cannabis-le-cannabis-abuse-screening-test
- **URL du PDF** : https://www.ofdt.fr/sites/ofdt/files/2023-11/field_media_document-4464-doc_num--explnum_id-17343-.pdf (l'hôte sans « www » redirige vers l'accueil)
- **Fichier de portage** : `docs/scales/cast/CAST_OFDT_Note2013-02.pdf`
- **Date de consultation** : 11/10/2026

Passages normatifs :

- « Le CAST est une échelle à 6 items […] sa version actuelle n'a été définitive qu'en 2006. La modification concerne la période de temps de référence : initialement, les items proposés se référaient à la vie entière alors que désormais le test se rapporte au 12 derniers mois. »
- « Pour calculer un score, les modalités sont codées de 0 à 4. En fonction du total obtenu (qui peut donc varier de 0 à 24), on définit les usagers sans risque lorsqu'ils présentent un score inférieur à 3, les usagers avec un risque faible pour un score égal à 3 et inférieur à 7 et enfin ceux avec un risque élevé de dépendance pour un score égal ou supérieur à 7. »

### Sources secondaires consultées

- **HAS**, *Outil d'aide au repérage précoce et intervention brève : alcool, cannabis, tabac chez l'adulte*, fiche outil (mise à jour 2021). Reproduit **l'ancienne version** « vie entière » en oui/non (« Avez-vous déjà fumé… »), cotée en nombre de réponses positives (1 : information ; 2 : intervention brève ; 3 ou plus : consultation d'addictologie). URL : https://www.has-sante.fr/upload/docs/application/pdf/2021-02/reco403_fiche_outil_2021_alcool_cannabis_tabac_cd_2021_02_11_v0.pdf — fichier `docs/scales/cast/HAS_fiche_outil_RPIB_2021.pdf`.
- **Collectivité de Corse** (isula.corsica), fiche de repérage des addictions, 2021 : version 12 mois, réponses 0-4 identiques, mais items reformulés (« lorsque vous fumiez », item 4 sans « de cannabis », item 5 « d'arrêter ou de réduire… sans y parvenir »). URL : https://www.isula.corsica/attachment/2673802 — fichier `docs/scales/cast/CAST_Collectivite_de_Corse.pdf`.
- **RESPADD** (`CAST-Cannabis-Abuse-Screening-Test-RESPADD.pdf`) et **Santé publique France** (fiche « Usage problématique de cannabis : outils et structures ») : liens morts (404) le 11/10/2026.

### Exception de sourcing — autorité unique justifiée

La note OFDT émane du concepteur de l'instrument (original francophone, pas de traduction à recouper) ; aucune autre source ne reproduit mot pour mot sa version définitive. Même raisonnement que les formulaires du laboratoire Dugas.

### Publications de validation

- Legleye S., Karila L., Beck F., Reynaud M. (2007). Validation of the CAST, a general population Cannabis Abuse Screening Test. *Journal of Substance Use*, 12(4), 233-242.
- Legleye S., Piontek D., Kraus L. (2011). Psychometric properties of the CAST in a French sample of adolescents. *Drug and Alcohol Dependence*, 113, 229-235.
- Legleye S., Piontek D., Kraus L., Morand E., Falissard B. (2013). A validation of the CAST using a latent class analysis of the DSM-IV among adolescents. *Int J Methods Psychiatr Res*, 22(1), 16-26.
- Adultes : Santé publique France, « Properties of the Cannabis Abuse Screening Test (CAST) in the general population » (Baromètre santé) — seuils 3 (trouble modéré à sévère) et 8 (sévère) relevés dans le résumé ; texte intégral non lu.

### Divergences constatées entre sources

| Élément | OFDT 2013 (primaire) | HAS 2021 | Collectivité de Corse |
| --- | --- | --- | --- |
| Période | 12 derniers mois | Vie entière (« déjà ») | 12 derniers mois |
| Réponses | Jamais / Rarement / De temps en temps / Assez souvent / Très souvent (0-4) | Oui / non | Identiques à l'OFDT |
| Cotation | Somme 0-24 ; < 3 / 3-6 / ≥ 7 | Nombre de « oui » : 1 / 2 / ≥ 3 | Non lue |
| Item 3 | « quand vous fumiez du cannabis » | « quand vous fumez du cannabis » | « lorsque vous fumiez du cannabis » |
| Item 5 | « de réduire ou d'arrêter… sans y arriver » | « …sans y parvenir » | « d'arrêter ou de réduire… sans y parvenir » |
| Item 6 | « mauvais résultats à l'école… » + « Lesquels ? » | « mauvais résultat à l'école... », sans « Lesquels ? » | Non relu |

### Comparaison Mentaal

CAST absent du catalogue Mentaal (`/send/cast` : « Ce questionnaire n'existe pas », 11/10/2026).

---

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | ✉️ — outil public de l'OFDT (établissement public), recommandé par la HAS, diffusé gratuitement, sans phrase de licence |
| **Détenteur des droits** | OFDT (aujourd'hui Observatoire français des drogues et des tendances addictives) ; Legleye et al. |
| **Mention obligatoire à afficher** | « CAST (Cannabis Abuse Screening Test) — Observatoire français des drogues et des toxicomanies (OFDT) ; Legleye, Karila, Beck & Reynaud (2007), Journal of Substance Use. Questionnaire et cotation : Spilka, Janssen & Legleye, Note OFDT n°2013-02. » |
| **Restrictions d'usage commercial** | Non mentionnées (contact OFDT groupé dans MEL-351, non bloquant) |
| **Décision Melya** | go |
| **PDF source en téléchargement (SEO, transparence)** | 🔗 lien seul — Note OFDT n°2013-02, outil public sans licence formelle. Renvoyer vers la page de l'OFDT. Statut tranché par Claude le 11/10/2026 (grille : 📥 hébergeable / 🔗 lien vers la source officielle / 🚫 non). |

---

## 4. Structure de l'échelle

### Consigne officielle

> _« Au cours des 12 derniers mois… »_

**Source** : en-tête du tableau (p. 3). La mention « Une seule réponse par ligne » et la question filtre « Au cours des 12 DERNIERS MOIS, avez-vous fumé du cannabis ? Non / Oui » ne sont pas reprises (§10).

### Comportement UX de la consigne

| Champ | Valeur |
| --- | --- |
| **Persistance** | `persistante` — « Au cours des 12 derniers mois… » au-dessus de chaque item |
| **Emplacement** | Écran d'intro et rappel au-dessus de chaque item |
| **Justification** | Sur le papier, l'en-tête reste au-dessus des 6 items ; chaque item se lit comme la suite de l'en-tête |
| **Cas particuliers** | Aucun |

### Affichage du titre côté portail patient

| Champ | Valeur |
| --- | --- |
| **Élément(s) affiché(s) en titre sur le PDF source primaire** | `acronyme seul` (« CAST ») |
| **Sous-titre à afficher dans l'app (`patientIntroSubtitle`)** | `null` |
| **Divergence avec le PDF** | Aucune |

### Dimensions de cotation

`0` Jamais · `1` Rarement · `2` De temps en temps · `3` Assez souvent · `4` Très souvent.

---

## 5. Items

| # | Item |
| --- | --- |
| 1 | Avez-vous fumé du cannabis avant midi ? |
| 2 | Avez-vous fumé du cannabis lorsque vous étiez seul(e) ? |
| 3 | Avez-vous eu des problèmes de mémoire quand vous fumiez du cannabis ? |
| 4 | Des amis ou des membres de votre famille vous ont-ils dit que vous devriez réduire votre consommation de cannabis ? |
| 5 | Avez-vous essayé de réduire ou d'arrêter votre consommation de cannabis sans y arriver ? |
| 6 | Avez-vous eu des problèmes à cause de votre consommation de cannabis (dispute, bagarre, accident, mauvais résultats à l'école…) ? |

Les soulignements du questionnaire OFDT (« avant midi », « seul(e) », « réduire », etc.) ne sont pas reproduits (§10).

---

## 6. Algorithme de scoring

Somme des 6 items (0-4). **Plage : 0-24.** Pas d'inversion, pas de sous-score. Passation incomplète refusée (règle projet).

---

## 7. Seuils d'interprétation

| Score | Interprétation |
| --- | --- |
| 0–2 | Usage sans risque |
| 3–6 | Risque faible |
| 7–24 | Risque élevé d'usage problématique, voire de dépendance |

**Source** : Note OFDT 2013-02, p. 3 (« sans risque » < 3 ; « risque faible » 3 à < 7 ; « risque élevé de dépendance » ≥ 7) et p. 5 (« risque élevé d'usage problématique, voire de dépendance »). `thresholdsSource` : « Seuils OFDT (Note n°2013-02) ».

---

## 8. Alertes cliniques

Aucune.

---

## 9. Cas de test unitaires

*Calculs vérifiés en Python le 11/10/2026, rejoués par `apps/api/src/scoring/scorers/cast.spec.ts` (7/7).*

| # | Réponses (items 1 à 6) | Score | Niveau |
| --- | --- | --- | --- |
| T1 | 0,0,0,0,0,0 | 0 | Usage sans risque |
| T2 | 1,1,0,0,0,0 | 2 | Usage sans risque |
| T3 | 1,1,1,0,0,0 | 3 | Risque faible |
| T4 | 2,2,1,1,0,0 | 6 | Risque faible |
| T5 | 2,2,1,1,1,0 | 7 | Risque élevé |
| T6 | 4,4,4,4,4,4 | 24 | Risque élevé |

---

## 10. Choix et arbitrages méthodologiques

*Tranchés par Claude (11/10/2026), à relire par Clément. Confiance : haute / moyenne / basse.*

### Écarts à la source primaire

| Élément | Source primaire (OFDT 2013) | Texte retenu | Origine | Justification | Confiance |
| --- | --- | --- | --- | --- | --- |
| Question filtre | « Au cours des 12 DERNIERS MOIS, avez-vous fumé du cannabis ? Non / Oui » (le tableau ne concerne que les « Oui ») | Non reprise | — | Le praticien envoie le CAST à un consommateur ; un filtre conditionnel serait un mécanisme nouveau. Un non-consommateur qui répond « Jamais » partout obtient 0, « Usage sans risque », sans contresens | moyenne |
| « Une seule réponse par ligne » | Sous l'en-tête | Retirée | — | Type 1 : adaptation du support (un item par écran, une seule réponse possible) | haute |
| Item 6, « Lesquels ? » | Question ouverte sous l'item 6 | Non reprise | — | Hors cotation ; pas de réponse libre dans le composant (mécanisme nouveau). La HAS l'omet aussi | moyenne |
| Item 6, ponctuation | « à l'école …) ? » | « à l'école…) ? » | Typographie | Espace parasite avant les points de suspension ; caractère « … » | haute |
| Soulignements | Mots-clés soulignés dans 6 items | Non reproduits | — | Le rendu des items est en texte brut (comme pour les autres échelles) ; sens inchangé | moyenne |
| Apostrophes | Courbes | Droites | Convention du code | Convention de toutes les entrées | haute |

### Autres arbitrages

| Sujet | Choix retenu | Justification | Confiance |
| --- | --- | --- | --- |
| Version | Version définitive OFDT (12 mois, 0-4, somme) plutôt que la version HAS oui/non « vie entière » | Le concepteur indique que la version « vie entière » est antérieure (définitive depuis 2006) ; la cotation 0-24 est celle des validations (Legleye 2011, 2013) | haute |
| Seuils | < 3 / 3-6 / ≥ 7 | Seuils OFDT. La note précise que « les seuils ne sont pas définitivement arrêtés » et que le CAST « surestime les prévalences » ; en population adulte, Santé publique France relève 3 et 8 (non lu en entier) | moyenne |
| Libellé de la tranche haute | « Risque élevé d'usage problématique, voire de dépendance » | Formule de la note (p. 5), plus prudente que « risque élevé de dépendance » (p. 3), cohérente avec l'avertissement sur la surestimation | moyenne |
| Nom au catalogue | « Cannabis Abuse Screening Test » | L'OFDT n'emploie que le nom anglais ; pas de traduction Melya | haute |
| Public | Adolescents et adultes | Validé chez les adolescents ; utilisé en population adulte depuis le Baromètre santé 2010 | moyenne |
| Durée | « 2 minutes » | Non sourcée ; 6 items courts | basse |
| Domaine / catégorie | `addictions` / « Addictions » | Comme la CUDIT-R | haute |

### Questions ouvertes

1. Seuils adultes : lire l'article Santé publique France (Baromètre santé) et décider s'il faut des seuils distincts pour les adultes (3 et 8). Recommandation : garder les seuils OFDT tant que l'article n'est pas lu.

### Recette

**Staging (11/10/2026, Claude)** — patient « Patient Test », parcours patient complet puis page résultat praticien : **conforme**.

| Jeu | Réponses (items 1-6) | Attendu | Obtenu |
| --- | --- | --- | --- |
| Minimum | 0,0,0,0,0,0 | 0, usage sans risque | 0, « Usage sans risque » |
| Tranche 2 | 1,1,1,1,0,0 | 4, risque faible | 4, « Risque faible » |
| Maximum | 4,4,4,4,4,4 | 24, risque élevé | 24, « Risque élevé d'usage problématique, voire de dépendance » |

Consigne et rappel « Au cours des 12 derniers mois… », 5 libellés, graduations 3 et 7 sur la jauge, mention « Seuils OFDT (Note n°2013-02) » et copyright : conformes. L'écran d'intro ne porte que la consigne (une ligne), fidèle à la source mais sobre.

**Mentaal** : CAST absent de leur catalogue.

---

## 11. Contrat technique

- Entrée `cast` dans `packages/core/src/scales/index.ts` : `single-scale`, clés `intensity_0` … `intensity_5`, `answerScales.intensity` 0-4, `instructions` = `persistentInstructions` = « Au cours des 12 derniers mois… », `patientIntroSubtitle: null`, trois bandes, `thresholdsSource`.
- Scorer `apps/api/src/scoring/scorers/cast.ts` (somme), enregistré sous `cast`. Tests `cast.spec.ts`.

---

## 12. Historique des modifications

| Date | Auteur | Modification |
| --- | --- | --- |
| 11/10/2026 | Claude (lot autonome) | Création de la fiche et implémentation : Note OFDT 2013-02 en autorité unique (version définitive 12 mois, 0-4), seuils < 3 / 3-6 / ≥ 7 ; version HAS oui/non documentée et écartée. Tests 7/7. |
| 11/10/2026 | Claude (lot autonome) | Recette staging conforme (0, 4, 24). |
