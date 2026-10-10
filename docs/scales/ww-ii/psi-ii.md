# Test spec — PSI-II (Questionnaire Pourquoi s'inquiéter-II)

<!--
Voir _TEMPLATE.md pour les règles projet (sourcing, copyright, FR-only,
hiérarchie versions, comparaison Mentaal).
Fiche rédigée et implémentée par Claude en autonomie (lot du 10/10/2026, à la
demande de Clément) : tous les arbitrages sont tranchés et consignés en §10
avec un niveau de confiance, pour relecture et re-tranchage par Clément.
-->

---

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | PSI-II (id technique : `psi-ii` — référencée WW-II dans le benchmark Mentaal et dans `SUIVI_ECHELLES.md`) |
| **Nom complet (FR)** | Questionnaire Pourquoi s'inquiéter-II — le PDF source ne porte que le sigle « PSI-II » (cf. §10) |
| **Nom complet (langue originale)** | L'original **est** francophone (Gosselin et al., 2003). Équivalent anglais : Why Worry-II (WW-II). |
| **Thème principal** | Anxiété généralisée |
| **Sous-thèmes / tags** | inquiétude, croyances à l'égard des inquiétudes, TAG, modèle de Dugas |
| **Nombre d'items** | 25 (aucun inversé) |
| **Durée estimée de passation** | 5-10 min (estimation Melya, cf. §10) |
| **Public cible** | Adultes |
| **Mode d'administration** | auto |
| **Description praticien (bibliothèque)** | Questionnaire de 25 items évaluant les croyances erronées à l'égard des inquiétudes, en cinq sous-échelles. |
| **Description patient (portail)** | AUCUNE — règle projet. Seule la consigne officielle est affichée. |

---

## 2. Sources et traçabilité

### Source primaire (items, consigne, réponses, cotation)

- **Type** : formulaire officiel du laboratoire des auteurs (UQO, équipe de M. J. Dugas, co-auteur de l'instrument), 3 pages d'items + 1 page « Instructions pour la cotation ».
- **Référence** : *PSI-II*, uqo.ca (dossier « anxiété ») ; PDF créé par Michel Dugas le 26/07/2011 (métadonnées). Pied de page : « Gosselin, P., Ladouceur, R., Langlois, F., Freeston, M. H., Dugas, M. J., & Bertrand, J. (2003). Revue Européenne de Psychologie Appliquée, 53 (3-4), 199-211. »
- **URL** : https://uqo.ca/sites/default/files/fichiers-uqo/anxiete/psi-ii.pdf
- **Fichier de portage** : `docs/scales/ww-ii/psi-ii.pdf` (archivé le 16/07/2026 ; re-téléchargé le 10/10/2026, identique octet pour octet)
- **Date de consultation** : 10/10/2026

### Exception de sourcing — autorité unique justifiée

Même situation que l'ÉII (`docs/scales/ius/eii.md`), validée par l'équipe : le PDF émane du laboratoire d'un des auteurs et contient la fiche de cotation officielle ; l'instrument est un original francophone, il n'y a pas de traduction à recouper. Aucune seconde source indépendante reproduisant les 25 items n'a été trouvée (recherches du 10/10/2026 : article de validation sur abonnement, mémoire UQO Guertin 2015 et guide « Gérer vos inquiétudes » du CISSS de Lanaudière consultés, sans le questionnaire).

### Publication de validation

- Gosselin, P., Ladouceur, R., Langlois, F., Freeston, M. H., Dugas, M. J., & Bertrand, J. (2003). Développement et validation d'un nouvel instrument évaluant les croyances erronées à l'égard des inquiétudes. *Revue européenne de psychologie appliquée*, 53(3-4), 199-211. **Texte intégral non consulté** (Elsevier, sur abonnement).

### Divergences constatées entre sources

- Aucune entre sources primaires (source unique).
- Écarts relevés chez Mentaal (qui ne fait pas foi) : voir « Comparaison Mentaal » ci-dessous et §10.

### Version française retenue

- **Auteurs** : Gosselin, Ladouceur, Langlois, Freeston, Dugas & Bertrand (Québec)
- **Année** : 2003
- **Justification** : original francophone ; seule version française existante. Français québécois assumé (ex. item 10, « qui voit à ses affaires »), porté verbatim comme pour l'ÉII.

### Comparaison Mentaal

Fiche publique [mentaal.fr/send/ww-ii](https://mentaal.fr/send/ww-ii) consultée le 10/10/2026 (n°58 de leur catalogue). Parcours patient : voir §10, « Recette ».

| Point | Source UQO | Melya | Mentaal |
| --- | --- | --- | --- |
| Nom | « PSI-II » | PSI-II, « Questionnaire Pourquoi s'inquiéter-II » | « Pourquoi s'inquiéter ? (WW-II) » |
| Consigne | « Vous retrouvez ci-dessous… en encerclant le numéro correspondant (1 à 5). » | Texte source sans la mention papier (§10) | Reformulée, absente de la source : « Indiquez dans quelle mesure cette affirmation vous semble juste : » |
| Item 2 | « …moins **ébranlé(e)** lorsque… » | Verbatim (« ébranlé(e) ») | « …moins **bouleversé(e)** lorsque… » |
| Réponse 5 | « Tout à fait » | Verbatim | « Tout à fait vrai » |
| Cotation | 5 sous-échelles de 5 items, pas de score total | 5 sous-scores **+ score total** 25-125 (§10) | 5 sous-scores sur 25, pas de score total |
| Seuils | Aucun | Aucun | Aucun |

---

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | zone grise ✉️ — instrument de recherche diffusé publiquement par le laboratoire des auteurs, sans phrase de licence ; même statut que l'ÉII |
| **Détenteur des droits** | Gosselin, Ladouceur, Langlois, Freeston, Dugas & Bertrand (2003) |
| **Mention obligatoire à afficher** | « Questionnaire Pourquoi s'inquiéter-II (PSI-II) — Gosselin, Ladouceur, Langlois, Freeston, Dugas & Bertrand (2003), Revue européenne de psychologie appliquée, 53(3-4), 199-211. Instrument original francophone. » |
| **Restrictions d'usage commercial** | Non mentionnées : usage dans un service payant non explicitement couvert (✉️, contact auteurs à grouper avec l'ÉII) |
| **Décision Melya** | go sous réserve (critère « ✉️ accepté » fixé par Clément pour le lot autonome) |

---

## 4. Structure de l'échelle

### Consigne officielle (affichée au patient avant les items)

> _« Vous retrouvez ci-dessous une série d'énoncés qui peuvent se rapporter aux inquiétudes. En vous référant aux moments où vous vous inquiétez, veuillez indiquer jusqu'à quel point les énoncés suivants vous semblent vrais. »_

**Source de la consigne** : source primaire, page 1, sans le segment « en encerclant le numéro correspondant (1 à 5) » (adaptation du support, §10).

### Comportement UX de la consigne

| Champ | Valeur |
| --- | --- |
| **Persistance** | `persistante` |
| **Emplacement** | Écran d'intro (consigne complète) ; rappel au-dessus de chaque item : « En vous référant aux moments où vous vous inquiétez, veuillez indiquer jusqu'à quel point les énoncés suivants vous semblent vrais. » |
| **Justification** | Le rappel est un extrait mot pour mot de la consigne source ; sur le papier, la consigne et les en-têtes de colonnes restent sous les yeux du répondant (même logique que la CUDIT-R). |
| **Cas particuliers** | Aucun |

### Affichage du titre côté portail patient

| Champ | Valeur |
| --- | --- |
| **Élément(s) affiché(s) en titre sur le PDF source primaire** | `acronyme seul` (« PSI-II ») |
| **Référence PDF** | Page 1, en-tête |
| **Sous-titre à afficher dans l'app (`patientIntroSubtitle`)** | `null` (acronyme seul) |
| **Divergence avec le PDF** | Aucune |

### Dimensions de cotation

**Dimension unique — Likert 1 à 5** (mêmes réponses pour les 25 items, dans l'ordre de la source)

- `1` — Pas du tout vrai
- `2` — Un peu vrai
- `3` — Assez vrai
- `4` — Très vrai
- `5` — Tout à fait

---

## 5. Items

| # | Item (source primaire) | Sous-échelle |
| --- | --- | --- |
| 1 | Si je ne m'inquiétais pas, je serais insouciant(e) et irresponsable. | 5 |
| 2 | Si je m'inquiète, je serai moins ébranlé(e) lorsque des événements imprévus se produiront. | 3 |
| 3 | Je m'inquiète dans le but de savoir quoi faire. | 1 |
| 4 | Si je m'inquiète à l'avance, je serai moins déçu(e) si quelque chose de grave se produit. | 3 |
| 5 | Le fait de m'inquiéter m'aide à planifier mes actions pour résoudre un problème. | 1 |
| 6 | Le simple fait de m'inquiéter peut empêcher les malheurs d'arriver. | 4 |
| 7 | Si je ne m'inquiétais pas, cela ferait de moi une personne négligente. | 5 |
| 8 | C'est en m'inquiétant que je finis par entreprendre le travail que j'ai à faire. | 2 |
| 9 | Je m'inquiète parce que je pense que cela peut m'aider à trouver une solution à mon problème. | 1 |
| 10 | Le fait de m'inquiéter prouve que je suis une personne qui voit à ses affaires. | 5 |
| 11 | Trop penser à des choses positives peut les empêcher de se produire. | 4 |
| 12 | Le fait de m'inquiéter confirme que je suis une personne prévoyante. | 5 |
| 13 | Si un malheur arrive, je me sentirai moins responsable si je m'en suis inquiété(e) auparavant. | 3 |
| 14 | En m'inquiétant, je peux trouver une meilleure façon de faire. | 1 |
| 15 | L'inquiétude me stimule et me rend plus efficace. | 2 |
| 16 | Le fait de m'inquiéter m'incite à passer à l'action. | 2 |
| 17 | Le simple fait de m'inquiéter diminue le risque que quelque chose de grave arrive. | 4 |
| 18 | En m'inquiétant, je fais certaines choses que je ne me déciderais pas à faire autrement. | 2 |
| 19 | Le fait de m'inquiéter me motive à faire les choses que je dois faire. | 2 |
| 20 | Mes inquiétudes à elles seules peuvent diminuer les risques de danger. | 4 |
| 21 | En m'inquiétant, j'augmente mes chances de trouver la meilleure solution. | 1 |
| 22 | Le fait de m'inquiéter me permettra de me sentir moins coupable si quelque chose de grave se produit. | 3 |
| 23 | Si je m'inquiète, je serai moins triste lorsqu'un événement négatif se produira. | 3 |
| 24 | En ne s'inquiétant pas, on peut attirer les malheurs. | 4 |
| 25 | Le fait de m'inquiéter démontre que je suis une bonne personne. | 5 |

Écarts au PDF (apostrophes, item 13, ponctuation finale des items 21 et 23) : §10.

---

## 6. Algorithme de scoring

### Calcul du score total

Somme des 25 items (1 à 5). **Plage du score total** : 25 à 125. Le score total n'est pas défini par la fiche de cotation de la source (§10).

### Subscores calculés

| Subscore | Formule | Plage | Affiché dans l'UI |
| --- | --- | --- | --- |
| 1. S'inquiéter aide à résoudre les problèmes | items 3 + 5 + 9 + 14 + 21 | 5–25 | oui |
| 2. S'inquiéter aide à se motiver | items 8 + 15 + 16 + 18 + 19 | 5–25 | oui |
| 3. S'inquiéter aide l'individu à se prémunir de vivre des émotions difficiles si un événement s'avère négatif | items 2 + 4 + 13 + 22 + 23 | 5–25 | oui |
| 4. S'inquiéter en soi prévient les événements négatifs | items 6 + 11 + 17 + 20 + 24 | 5–25 | oui |
| 5. S'inquiéter est un trait de personnalité positif | items 1 + 7 + 10 + 12 + 25 | 5–25 | oui |

**Source de la définition des subscores** : source primaire, page 4 « Instructions pour la cotation » (« Voici les items compris dans chacune des cinq sous-échelles de la version originale du PSI-II »). Libellés repris mot pour mot. Les cinq sous-échelles partitionnent exactement les 25 items (vérifié en Python) : la somme des sous-scores égale le score total.

### Inversions d'items

Sans objet — aucun item inversé.

### Gestion des réponses manquantes

Passation incomplète refusée, pas d'imputation (règle projet commune ; la passation impose de répondre à tous les items).

---

## 7. Seuils d'interprétation

**Aucun seuil** : la source ne fournit ni seuil ni norme. Une seule bande couvre 25-125, avec le libellé praticien « Pas de seuil clinique fourni par les auteurs. » (§10).

| Score | Interprétation |
| --- | --- |
| 25–125 | Pas de seuil clinique fourni par les auteurs. |

**Source des seuils** :

| Champ | Valeur |
| --- | --- |
| **Référence académique** | Sans objet — aucun seuil dans la source primaire ; article de validation non consulté |
| **URL directe vérifiable** | https://uqo.ca/sites/default/files/fichiers-uqo/anxiete/psi-ii.pdf (absence de seuil) |
| **Date de consultation** | 10/10/2026 |
| **Niveau de consensus** | Sans objet |

---

## 8. Alertes cliniques

Aucune alerte spécifique (aucun item à contenu sensible).

---

## 9. Cas de test unitaires

*Réponses : valeurs 1 à 5, items 1 à 25 dans l'ordre. Sous-scores dans l'ordre 1 à 5 de la §6. Calculs vérifiés en Python le 10/10/2026, rejoués par `apps/api/src/scoring/scorers/psi-ii.spec.ts`.*

### 1. Cas limites (min/max)

| # | Réponses | Score total | Sous-scores |
| --- | --- | --- | --- |
| T1 | 25 × 1 | 25 | 5 / 5 / 5 / 5 / 5 |
| T2 | 25 × 5 | 125 | 25 / 25 / 25 / 25 / 25 |

### 2. Transitions de seuil

Sans objet (aucun seuil).

### 3. Cas typiques (sanity check)

| # | Réponses (items 1 à 25) | Score total | Sous-scores |
| --- | --- | --- | --- |
| T3 | 2,3,4,3,4,1,2,3,4,2,1,2,3,4,3,3,1,2,3,1,4,2,3,1,2 | 63 | 20 / 14 / 14 / 5 / 10 |

Détail T3 : résolution (3,5,9,14,21) = 4+4+4+4+4 = 20 ; motivation (8,15,16,18,19) = 3+3+3+2+3 = 14 ; émotions (2,4,13,22,23) = 3+3+3+2+3 = 14 ; prévention (6,11,17,20,24) = 1+1+1+1+1 = 5 ; trait (1,7,10,12,25) = 2+2+2+2+2 = 10.

### 4. Cas spécifiques à l'échelle — appartenance des items aux sous-échelles

| # | Cas | Score total | Résultat attendu |
| --- | --- | --- | --- |
| T4 | Items 3, 5, 9, 14, 21 à 5, autres à 1 | 45 | Sous-échelle 1 = 25, autres = 5 |
| T5 | Items 8, 15, 16, 18, 19 à 5, autres à 1 | 45 | Sous-échelle 2 = 25, autres = 5 |
| T6 | Items 2, 4, 13, 22, 23 à 5, autres à 1 | 45 | Sous-échelle 3 = 25, autres = 5 |
| T7 | Items 6, 11, 17, 20, 24 à 5, autres à 1 | 45 | Sous-échelle 4 = 25, autres = 5 |
| T8 | Items 1, 7, 10, 12, 25 à 5, autres à 1 | 45 | Sous-échelle 5 = 25, autres = 5 |
| T9 | Item 13 seul à 5, autres à 1 | 29 | Sous-échelle 3 = 9 |

### 5. Entrées invalides

| # | Cas | Comportement attendu |
| --- | --- | --- |
| T10 | Valeur hors borne / négative / non numérique | Non contrôlé par le scorer (comportement commun à tous les scorers, cf. §10) ; impossible depuis la passation, qui ne propose que les 5 réponses |
| T11 | Réponse manquante, tableau trop court ou trop long | Idem : la passation exige les 25 réponses avant l'envoi |

---

## 10. Choix et arbitrages méthodologiques

*Tous les arbitrages ci-dessous ont été tranchés par Claude en autonomie (10/10/2026) et restent à relire par Clément. Confiance : haute / moyenne / basse.*

### Écarts à la source primaire

| Élément | Source primaire | Texte retenu | Origine du texte retenu | Justification | Confiance |
| --- | --- | --- | --- | --- | --- |
| Consigne | « …vous semblent vrais en encerclant le numéro correspondant (1 à 5). » | « …vous semblent vrais. » | Source primaire, segment papier retiré | Type 1 (adaptation du support) : à l'écran, on choisit une réponse, on n'encercle rien ; retrait sans ajout, même traitement que l'ÉII. Pas de seconde source dont reprendre un texte. | haute |
| Item 13 | « …si je m'en suis inquiété auparavant. » | « …si je m'en suis inquiété(e) auparavant. » | Accord en genre | Type 2 : le participe s'accorde avec le sujet ; tous les autres items portent la forme inclusive (« ébranlé(e) », « déçu(e) »…). Même choix que « défoncé(e) » pour la CUDIT-R, validé par Clément. | moyenne |
| Items 21 et 23 | Pas de point final visible (le texte se fond dans les pointillés de la colonne de réponse) | Point final ajouté | Typographie | Les 23 autres items se terminent par un point ; normalisation typographique, sens inchangé. | haute |
| Apostrophes | Mélange de ’ et ' dans le PDF | ' partout | Typographie | Normalisation, comme le reste du catalogue. | haute |

### Autres arbitrages

| Sujet | Choix retenu | Justification et sources | Confiance |
| --- | --- | --- | --- |
| Sources | Source unique (formulaire du laboratoire Dugas, UQO) | Exception « autorité unique » : laboratoire d'un co-auteur, original francophone, cotation officielle incluse ; précédent ÉII. Article de validation 2003 non accessible : il n'a pas pu servir de recoupement (cf. écart Mentaal sur l'item 2). | moyenne |
| Score total (25-125) | Affiché, en plus des 5 sous-scores | La fiche de cotation ne définit que les sous-échelles. Le modèle de résultat de l'app exige un score total ; les sous-échelles partitionnant les 25 items, le total est exactement leur somme, sans pondération. Mentaal n'affiche que les sous-scores. Alternative : ne pas mettre en avant le total (évolution d'interface, hors périmètre). | moyenne |
| Libellé de la bande unique | « Pas de seuil clinique fourni par les auteurs. » (texte praticien) | Aucun seuil dans la source ; l'app exige une bande. Formulation factuelle Melya, vue seulement par le praticien (précédent ÉII : « Plus le score est élevé… »). | moyenne |
| Libellés des sous-scores | Repris mot pour mot de la fiche de cotation | Source primaire p. 4. | haute |
| Réponse 5 « Tout à fait » | Verbatim, sans « vrai » | C'est le texte du PDF ; Mentaal affiche « Tout à fait vrai » (absent de la source). | moyenne (le PDF tronque peut-être l'en-tête ; à vérifier sur l'article 2003) |
| Item 2 « ébranlé(e) » | Verbatim | Mentaal affiche « bouleversé(e) ». Leur texte vient peut-être de l'article 2003 : on ne peut pas trancher sans lui ; la source primaire disponible fait foi. | moyenne |
| Nom au catalogue | « Questionnaire Pourquoi s'inquiéter-II » ; sous-titre patient : aucun (`null`) | Le PDF n'affiche que « PSI-II » (repris pour le patient) ; le nom développé suit l'usage de la littérature (questionnaire « Pourquoi s'inquiéter ? », Freeston et al., 1994 ; II = révision de 2003). | moyenne |
| Rappel au-dessus des items | Extrait de la consigne source | Même logique que la CUDIT-R (validée par Clément). | haute |
| Domaine | Anxiété (catégorie « Anxiété généralisée ») | Modèle cognitif du TAG de Dugas ; même domaine que l'ÉII et la QIA. | haute |
| Durée | « 5-10 minutes » | Non sourcée ; estimation alignée sur l'ÉII (27 items). Mentaal annonce 6 minutes. | basse |
| Entrées invalides (§9.5) | Comportement existant conservé : le scorer ne rejette pas une entrée invalide | Aucun scorer du repo ne valide ses entrées (chantier transverse, `REDACTION_PLAYBOOK.md` §10) ; créer cette validation serait un mécanisme nouveau, exclu du lot. La passation empêche ces cas. | haute |
| Droits | go sous réserve ✉️ | Pas de phrase de licence ; critère ✉️ accepté par Clément pour ce lot. | moyenne |

### Questions ouvertes

1. **Obtenir l'article de Gosselin et al. (2003)** pour recouper les items (notamment l'item 2 « ébranlé(e) » vs « bouleversé(e) » et la réponse 5 « Tout à fait » vs « Tout à fait vrai »), vérifier si l'article définit un score total, et voir pourquoi la fiche UQO parle de « version originale » des sous-échelles. Recommandation : demande de l'article à l'UQO ou à P. Gosselin (U. Sherbrooke), à grouper avec le contact ✉️ ÉII.
2. **Mettre en avant le score total ou seulement les sous-scores ?** Recommandation : garder le total pour l'instant (somme exacte des sous-échelles), à revoir si l'article ne le définit pas.

### Recette

À compléter après déploiement sur staging (même jeu de réponses sur staging et sur Mentaal).

---

## 11. Contrat technique

- Entrée `psi-ii` dans `packages/core/src/scales/index.ts` : `formType: "single-scale"`, clés de réponse `intensity_0` … `intensity_24`, échelle `answerScales.intensity` (1-5), `persistentInstructions` = extrait de la consigne, `patientIntroSubtitle: null`, une seule bande 25-125.
- Scorer `apps/api/src/scoring/scorers/psi-ii.ts` (patron ÉII : somme + sous-scores), enregistré sous `psi-ii` dans `ScoringService`.
- Tests : `apps/api/src/scoring/scorers/psi-ii.spec.ts` (cas §9 T1-T9 + ordre des réponses).
- Domaine `anxiete` : aucune évolution de type ni d'interface.

---

## 12. Historique des modifications

| Date | Auteur | Modification |
| --- | --- | --- |
| 10/10/2026 | Claude (lot autonome demandé par Clément) | Création de la fiche et implémentation : source UQO (laboratoire Dugas) en autorité unique, 25 items verbatim, 5 sous-scores de la fiche de cotation, score total 25-125 sans seuil. Arbitrages et niveaux de confiance en §10. Comparaison Mentaal (fiche publique). Tests 10/10. |
