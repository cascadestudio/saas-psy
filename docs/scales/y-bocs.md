# Test spec — Y-BOCS (Échelle d'obsession-compulsion de Yale-Brown)

<!--
Template canonique Melya — fiche d'échelle psychométrique.

Public visé : Cascade (relecteur primaire), Adrien (implémentation),
équipe Melya en interne. Pas de relecture directe par les praticiens —
la validation clinique se fait sur staging.

Règles projet (rappel) :
1. Nom complet (FR) = libellé exact du PDF source primaire. Pas de traduction inventée.
2. Hiérarchie versions FR retenues : France > Suisse > Belgique > Canada.
3. Mention copyright obligatoire :
   - Côté patient : écran de fin de passation, gris discret, une fois.
   - Côté praticien : fiche du questionnaire (bibliothèque).
4. Comparaison Mentaal systématique sur chaque spec : version FR, seuils, divergences visibles.
-->

---

## 1. Métadonnées produit

| Champ                                    | Valeur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nom court**                            | Y-BOCS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Nom complet (FR)**                     | Échelle d'obsession-compulsion de Yale-Brown                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Nom complet (langue originale)**       | Yale-Brown Obsessive Compulsive Scale (Y-BOCS)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Thème principal**                      | Troubles Obsessionnels Compulsifs (TOC)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Sous-thèmes / tags**                   | TOC, obsessions, compulsions, sévérité                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Nombre d'items**                       | 10 items de sévérité (5 obsessions + 5 compulsions)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Note structurelle**                    | La Y-BOCS originale Mollard 1989 comporte au total 19 items : les 10 items de sévérité (validés psychométriquement, retenus par Melya) et 9 items heuristiques additionnels (capacité d'introspection, évitement, indécision, responsabilité pathologique, lenteur, doute pathologique, sévérité globale, amélioration globale, fiabilité) que Mollard 1989 décrit explicitement comme « considérés pour l'instant comme heuristiques et non pris en compte dans les études psychométriques » (p. 335). Ces items ne sont pas implémentés dans Melya, conformément à la pratique standard.                                                                                                                                                                                                                                                  |
| **Durée estimée de passation**           | 10-15 min                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Public cible**                         | Adultes (18+)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Mode d'administration**                | `auto`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Note sur le mode d'administration**    | La traduction française de référence (Mollard, Cottraux, Bouvard, 1989) est celle de l'**entretien semi-structuré** administré par un clinicien (hétéro-évaluation). L'usage en auto-passation à distance retenu pour Melya s'appuie sur la version self-report Y-BOCS-SR (Steketee, Frost & Bogart, 1996), validée psychométriquement (corrélation r = .76 avec la version clinicien) et largement utilisée en essais cliniques. **Pas de validation française spécifique de la Y-BOCS-SR identifiée à ce stade.** Les libellés FR retenus sont ceux de Mollard 1989 ; la consigne adaptée au mode auto-passation est à valider avec Renata. À noter : les patients tendent à se rater systématiquement moins sévèrement que les cliniciens, particulièrement sur les items de résistance (Steketee et al., 1996 ; Federici et al., 2010). |
| **Description praticien (bibliothèque)** | Échelle de référence internationale pour évaluer la sévérité des symptômes obsessionnels-compulsifs, indépendamment de leur contenu. 10 items cotés 0-4 sur 5 dimensions (durée, gêne, anxiété, résistance, contrôle), répartis entre obsessions (items 1-5) et compulsions (items 6-10).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Description patient (portail)**        | AUCUNE — règle projet : le portail patient ne comporte pas de description de l'échelle. Seule la consigne officielle (ci-dessous) est affichée.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

---

## 2. Sources et traçabilité

### Source primaire (traduction française)

- **Type** : Publication peer-reviewed française (validation de la traduction)
- **Référence complète** : Mollard, E., Cottraux, J., & Bouvard, M. (1989). Version française de l'échelle d'obsession-compulsion de Yale-Brown. _L'Encéphale_, XV, 335-341.
- **URL** : https://www.researchgate.net/publication/232556810_Version_francaise_de_l%27echelle_d%27obsession-compulsion_de_Yale-Brown_Yale-Brown_Obsessive-Compulsive_Scale_A_French_version
- **Date de consultation** : 30/04/2026 (PDF source primaire récupéré et lu intégralement)

Le PDF source primaire (7 pages, L'Encéphale 1989) a été récupéré et lu intégralement. Tous les libellés items, consignes patient et questions d'amorce de la spec sont des reproductions ou adaptations directes de ce PDF, sans intermédiaire de source secondaire.

### Source de cross-check n°1 (PDF officiel signé Cottraux)

- **Type** : Document de référence francophone signé J. Cottraux (co-auteur de la traduction)
- **Référence complète** : Cottraux, J. _Echelle d'obsessions-compulsions de Yale-Brown Y-BOCS_. Document PDF reprenant l'introduction, les items et la méthodologie de Mollard, Cottraux & Bouvard (1989).
- **URL** : https://www.psychologie-et-cardiologie.fr/wp-content/uploads/2025/01/YBOCS-Echelle-dobsessions-compulsions-de-Yale-Brown.pdf
- **Date de consultation** : 30/04/2026

### Source de cross-check n°2 (validation psychométrique FR)

- **Type** : Publication peer-reviewed française (étude de validation)
- **Référence complète** : Bouvard, M., Sauteraux, A., Note, I., Bourgeois, M., Dirson, S., & Cottraux, J. (1992). Étude de validation et analyse factorielle de l'échelle de Yale-Brown. _Journal de Thérapie Comportementale et Cognitive_, 2(4), 18-22.
- **URL** : https://www.researchgate.net/publication/291879670_Etude_de_validation_et_analyse_factorielle_de_la_version_francaise_de_l'echelle_d'obsession_compulsion_de_Yale-Brown
- **Date de consultation** : 30/04/2026

### Source de cross-check n°3 (recommandations cliniques FR contemporaines)

- **Type** : Manuel TCC de référence FR
- **Référence complète** : Clair, A.-H., Trybou, V., & Demonfaucon, C. (2016). _Comprendre et traiter les TOC : données actuelles et nouvelles perspectives pour le Trouble Obsessionnel Compulsif_ (Annexe 1 — Hétéro-questionnaires). Paris : Dunod.
- **URL** : https://shs.cairn.info/comprendre-et-traiter-les-toc--9782100743483-page-315?lang=fr
- **Date de consultation** : 30/04/2026

### Source originale (anglaise, traçabilité)

- **Référence complète** : Goodman, W. K., Price, L. H., Rasmussen, S. A., Mazure, C., Fleischmann, R. L., Hill, C. L., Heninger, G. R., & Charney, D. S. (1989). The Yale-Brown Obsessive Compulsive Scale. I. Development, Use, and Reliability. _Archives of General Psychiatry_, 46(11), 1006-1011.

### Divergences constatées entre sources

- **Singulier / pluriel dans le titre FR** : Mollard et al. (1989) utilise « obsession-compulsion » au singulier dans le titre de leur publication. Le PDF Cottraux (2025) et plusieurs sites institutionnels (IFEMDR, Cairn) utilisent « obsessions-compulsions » au pluriel. **Choix Melya** : forme singulier, fidèle au titre exact de la publication validation FR (règle projet n°1).
- **Mentaal** affiche un titre légèrement différent : « Echelle du trouble obsessionnel-compulsif de Yale-Brown ». Cette formulation n'apparaît dans aucune source académique consultée — divergence notable mais non bloquante (les libellés items et seuils sont alignés).
- **Libellé du seuil 32-40** : Mentaal indique « TOC extrêmement sévère ». La traduction Mollard et l'ensemble des autres sources francophones utilisent « extrême » seul. **Choix Melya** : « TOC extrême » (fidèle aux sources académiques FR).

### Version française retenue

- **Traducteur(s)** : Evelyne Mollard, Jean Cottraux, Martine Bouvard
- **Année de la traduction** : 1989
- **Publication de validation française** : Bouvard, M., Sauteraux, A., Note, I., Bourgeois, M., Dirson, S., & Cottraux, J. (1992). Étude de validation et analyse factorielle de l'échelle de Yale-Brown. _Journal de Thérapie Comportementale et Cognitive_, 2(4), 18-22.
- **Justification du choix** : Traduction française de référence, citée par toutes les sources francophones consultées (apprendre-la-psychologie.fr, IFEMDR, Cairn/Trybou 2016, PDF Cottraux). Validation psychométrique complète (validité convergente, discriminante, critériée). Auteurs faisant autorité en TCC FR (école de Lyon, Cottraux). Hiérarchie projet respectée (France).
- **Alternative écartée** : Adaptation québécoise (Chaloult, Goulet, Ngô, 2013, _Guide de pratique pour le traitement du TOC_). Source utile en cross-check mais hors hiérarchie projet (Canada en repli).

---

## 3. Statut copyright et licence

| Champ                               | Valeur                                                                                                                                                                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statut**                          | `zone grise`                                                                                                                                                                                                                    |
| **Détenteur des droits**            | Y-BOCS originale : Goodman et al. / University of Florida (Gainesville). Traduction FR : Mollard, Cottraux & Bouvard (1989), publiée dans L'Encéphale (Elsevier Masson).                                                        |
| **Mention obligatoire à afficher**  | « Échelle Y-BOCS — Goodman et al. (1989). Traduction française : Mollard, Cottraux & Bouvard (1989), L'Encéphale, XV, 335-341. »                                                                                                |
| **Restrictions d'usage commercial** | À clarifier. La Y-BOCS est largement reproduite en recherche académique sans mention de licence libre dans les sources consultées. Aucune publication consultée ne mentionne explicitement une autorisation d'usage commercial. |
| **Décision Melya**                  | `bloqué` (à passer en `go` après clarification avec les ayants-droit)                                                                                                                                                           |

### Suivi des démarches externes

- **Motif du blocage** : Statut copyright non explicitement clarifié dans les sources consultées. La Y-BOCS n'apparaît pas dans la liste des trois échelles flagguées comme nécessitant licence payante (BDI/Pearson, CBCL/ASEBA, SRS-2/WPS), mais une démarche de clarification reste recommandée avant exploitation commerciale.
- **Contact en cours** : Aucun à ce stade.
- **Prochaine action** : Identifier le détenteur des droits (University of Florida pour l'originale ; ayants-droit de la traduction FR via L'Encéphale / Elsevier Masson). Envoyer demande d'autorisation d'usage commercial avec mention.
- **Date de dernière mise à jour du suivi** : 30/04/2026

---

## 4. Structure de l'échelle

### Consigne officielle (affichée au patient avant les items)

L'échelle comporte **deux consignes distinctes**, l'une avant le bloc obsessions (items 1-5), l'autre avant le bloc compulsions (items 6-10), conformément à la traduction Mollard/Cottraux/Bouvard 1989.

#### Consigne du bloc obsessions (avant item 1)

> _« Les obsessions sont des idées pénibles, des pensées, des images ou des désirs impulsifs qui vous viennent à l'esprit d'une manière répétitive. Elles peuvent vous sembler apparaître contre votre volonté. Vous pouvez aussi les trouver répugnantes, reconnaître qu'elles sont dénuées de sens, ou estimer qu'elles ne correspondent pas du tout à votre personnalité. Elles sont souvent source d'angoisse. »_

#### Consigne du bloc compulsions (avant item 6)

> _« Les compulsions, d'un autre côté, sont des comportements ou des actes que vous vous sentez obligé d'accomplir, même si vous les reconnaissez comme dénués de sens ou excessifs. Parfois, vous essayez de résister et de ne pas les faire, mais ceci s'avère souvent difficile. Vous pouvez ressentir une anxiété qui ne diminuera pas, tant que l'acte n'est pas accompli. »_

**Source de la consigne** : Mollard, Cottraux & Bouvard (1989), L'Encéphale, XV, 335-341, p. 336 — texte littéral du script de définition des obsessions et compulsions à donner au patient avant la passation. Texte récupéré directement depuis le PDF source primaire.

### Comportement UX de la consigne

| Champ                | Valeur                                                                                                                                                                                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Persistance**      | `spécifique`                                                                                                                                                                                                                                                                               |
| **Emplacement**      | Consigne obsessions affichée en en-tête au-dessus des items 1 à 5 ; consigne compulsions affichée en en-tête au-dessus des items 6 à 10.                                                                                                                                                   |
| **Justification**    | La Y-BOCS comporte structurellement deux blocs avec deux définitions cliniques distinctes (obsessions vs compulsions) que le patient doit comprendre séparément. La consigne unique en page de garde ne suffit pas — la définition de chaque concept doit accompagner les items concernés. |
| **Cas particuliers** | UI doit prévoir un séparateur visuel clair entre items 5 et 6 pour signaler la transition obsessions → compulsions.                                                                                                                                                                        |

### Dimensions de cotation

**Dimension unique — Sévérité** (déclinée en 5 dimensions cliniques distinctes par item)

- Plage : 0 à 4
- Modalités : 5 options ordinales par item, **avec libellés spécifiques à chaque item** (cf. section 5 — Variante B)
- Les 5 dimensions cliniques évaluées par les items (en parallèle pour obsessions et compulsions) :
  1. Temps / durée (items 1 et 6)
  2. Interférence / gêne (items 2 et 7)
  3. Détresse / anxiété (items 3 et 8)
  4. Résistance (items 4 et 9)
  5. Degré d'emprise / contrôle (items 5 et 10)

---

## 5. Items

### Note méthodologique sur l'adaptation des libellés

Le PDF source primaire Mollard, Cottraux & Bouvard (1989, _L'Encéphale_, XV, 335-341) est la référence de fond pour cette spec. Les libellés ci-dessous appliquent un **principe d'adaptation explicite et limité**, sur le modèle des Y-BOCS-SR anglophones validées (Steketee, Frost & Bogart, 1996) :

1. **Titres d'items** : repris à l'identique du tableau de cotation Mollard p. 341. Seule exception : les items 4 et 9, tous deux titrés "Résistance" dans Mollard, sont différenciés en "Résistance aux obsessions" / "Résistance aux compulsions" pour lisibilité UI.
   1.bis. **Titres patient affichés au-dessus des questions** : repris littéralement des rubriques Mollard p. 337-338 (déjà en MAJUSCULES dans le PDF source). Ces titres patient sont distincts des titres identifiants (p. 341) utilisés en interne dans la spec. Convention alignée sur la Y-BOCS-SR officielle (Lee Baer 1991) et sur Mentaal.
2. **Consignes patient (section 4)** : reproduites littéralement depuis Mollard p. 336 (script déjà rédigé à la 2ème personne pour le patient, donc directement utilisable en auto-passation sans modification).
3. **Questions d'amorce** : reproduites littéralement depuis Mollard p. 337-338, y compris les questions enchaînées multiples (items 2, 4, 5, 7, 8, 10). Pour les items 1 et 6, où Mollard distingue une "Q :" (durée) et un script "Demandez" (fréquence), les deux questions sont concaténées dans la spec Melya pour préserver l'intégralité de la formulation patient prévue par Mollard. Pour l'item 8, seule la "Q :" est retenue (le "Demandez" Mollard est une précision méthodologique destinée à l'évaluateur clinicien).
4. **Libellés des options de réponse** : **adaptation Melya assumée**.
   - **Fond clinique** : intégralement préservé depuis Mollard (durée, gêne, angoisse, résistance, contrôle ; bornes quantitatives ; nuances cliniques).
   - **Forme grammaticale** : adaptée pour cohérence question-réponse en auto-passation. Concrètement :
     - Passage de la 3ème personne (perspective évaluateur Mollard : _"Cède volontiers"_) à la 1ère personne (perspective patient : _"Je cède volontiers"_).
     - Pour les items "durée" (1, 6) : retrait des qualificatifs Mollard ("Légère", "Moyenne"...) car ils ne répondent pas grammaticalement à la question "Combien de temps...?". Seules les bornes temporelles sont conservées.
     - Pour les items "gêne" (2, 7) : reformulation pour répondre à la question "Dans quelle mesure...?" sans le qualificatif redondant ("Importante, cause une altération réelle..." → "Altération réelle...").
     - Pour les items "angoisse" / "résistance" / "contrôle" (3, 4, 5, 8, 9, 10) : libellés Mollard quasi-littéraux, simplement transposés à la 1ère personne.
5. **Niveau 0** : adapté pour cohérence sémantique avec la question (ex. "Pas de pensées obsédantes" plutôt que "Nulle" pour répondre à "Combien de temps...?").

**À valider Renata** : confirmer ligne à ligne que cette adaptation préserve fidèlement le sens clinique des libellés Mollard. Toute dérive de sens identifiée par Renata sera corrigée par retour au libellé Mollard littéral, en assumant la friction grammaticale plutôt que la dérive clinique.

### Variante B — Items avec libellés de réponse spécifiques

#### Obsessions (items 1 à 5)

**Item 1 — Temps passé aux obsessions**

> **DURÉE DES PENSÉES OBSÉDANTES**
>
> Combien de temps durent les pensées obsédantes ? Combien de fois la pensée obsédante arrive-t-elle ?

| Valeur | Libellé                                                                                                                     |
| ------ | --------------------------------------------------------------------------------------------------------------------------- |
| 0      | Aucun                                                                                                                       |
| 1      | Moins d'une heure par jour, ou survenue occasionnelle (pas plus de 8 fois par jour)                                         |
| 2      | 1 à 3 heures par jour, ou survenue très fréquente (plus de 8 fois par jour, mais la majorité de ma journée se passe sans)   |
| 3      | 3 à 8 heures par jour, ou survenue très fréquente (plus de 8 fois par jour, occupant une très grande partie de ma journée)  |
| 4      | Plus de 8 heures par jour, ou envahissement pratiquement constant (pensées tellement nombreuses que je ne peux les compter) |

**Item 2 — Gêne liée aux obsessions**

> **GÊNE LIÉE AUX PENSÉES OBSÉDANTES**
>
> Dans quelle mesure vos pensées obsédantes vous gênent-elles dans votre vie sociale ou professionnelle ? Y a-t-il des choses qu'il vous est impossible de faire à cause de ces pensées obsédantes ?

| Valeur | Libellé                                                                                                    |
| ------ | ---------------------------------------------------------------------------------------------------------- |
| 0      | Aucune                                                                                                     |
| 1      | Faible gêne dans mes activités sociales ou professionnelles, mais mon efficacité globale n'est pas altérée |
| 2      | Gêne nette dans mes activités sociales ou professionnelles, mais je peux encore faire face                 |
| 3      | Altération réelle de mes activités sociales ou professionnelles                                            |
| 4      | Gêne invalidante                                                                                           |

**Item 3 — Angoisse associée aux obsessions**

> **ANGOISSE ASSOCIÉE AUX PENSÉES OBSÉDANTES**
>
> Quel niveau d'angoisse ces pensées obsédantes créent-elles en vous ?

| Valeur | Libellé                                                                  |
| ------ | ------------------------------------------------------------------------ |
| 0      | Aucune                                                                   |
| 1      | Légère, rare et très peu gênante                                         |
| 2      | Moyenne, fréquente et gênante, mais je la gère encore assez bien         |
| 3      | Importante, très fréquente et très gênante                               |
| 4      | Extrêmement importante, pratiquement constante et d'une gêne invalidante |

**Item 4 — Résistance aux obsessions**

> **RÉSISTANCE AUX PENSÉES OBSÉDANTES**
>
> Quel effort fournissez-vous pour résister aux pensées obsédantes ? Essayez-vous souvent de détourner votre attention de ces pensées quand elles vous viennent à l'esprit ?

| Valeur | Libellé                                                                                                                        |
| ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| 0      | Je fais toujours l'effort de résister, ou les symptômes sont si minimes qu'il n'est pas nécessaire de leur résister            |
| 1      | J'essaie de résister la plupart du temps                                                                                       |
| 2      | Je fais quelques efforts pour résister                                                                                         |
| 3      | Je cède à toutes les obsessions sans essayer de les contrôler, mais je suis quelque peu contrarié(e) de ne pouvoir mieux faire |
| 4      | Je cède volontiers et totalement à toutes les obsessions                                                                       |

**Item 5 — Contrôle sur les obsessions**

> **DEGRÉ DE CONTRÔLE SUR LES PENSÉES OBSÉDANTES**
>
> Quel contrôle exercez-vous sur vos pensées obsédantes ? Dans quelle mesure arrivez-vous à stopper ou à détourner vos pensées obsédantes ?

| Valeur | Libellé                                                                                                                                         |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 0      | Contrôle total                                                                                                                                  |
| 1      | Beaucoup de contrôle ; je suis généralement capable de stopper ou détourner les obsessions avec quelques efforts et de la concentration         |
| 2      | Contrôle moyen, j'arrive de temps en temps à stopper ou détourner mes obsessions                                                                |
| 3      | Peu de contrôle, j'arrive rarement à stopper mes obsessions, je peux seulement détourner mon attention avec difficulté                          |
| 4      | Aucun contrôle, je me sens totalement dépourvu(e) de volonté, rarement capable de détourner mon attention de mes obsessions, même momentanément |

#### Compulsions (items 6 à 10)

**Item 6 — Temps passé aux compulsions**

> **DURÉE DES RITUELS**
>
> Combien de temps passez-vous à faire des rituels ? Quelle est la fréquence de vos rituels ?

| Valeur | Libellé                                                                                                                         |
| ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| 0      | Aucun rituel                                                                                                                    |
| 1      | Moins d'une heure par jour, ou émission occasionnelle de conduites ritualisées (pas plus de 8 fois par jour)                    |
| 2      | 1 à 3 heures par jour, ou apparition fréquente (plus de 8 fois par jour, mais le temps n'est pas en majorité envahi)            |
| 3      | 3 à 8 heures par jour, ou apparition très fréquente (plus de 8 fois par jour, la plupart du temps est pris par les compulsions) |
| 4      | Plus de 8 heures par jour, ou présence pratiquement constante (conduites trop nombreuses pour être dénombrées)                  |

**Item 7 — Gêne liée aux compulsions**

> **GÊNE LIÉE AUX RITUELS**
>
> Dans quelle mesure les rituels vous gênent-ils dans votre vie sociale ou professionnelle ? Y a-t-il des choses qu'il vous est impossible de faire à cause de vos rituels ?

| Valeur | Libellé                                                                                                    |
| ------ | ---------------------------------------------------------------------------------------------------------- |
| 0      | Aucune gêne                                                                                                |
| 1      | Faible gêne dans mes activités sociales ou professionnelles, mais mon efficacité globale n'est pas altérée |
| 2      | Gêne nette dans mes activités sociales ou professionnelles, mais je peux encore faire face                 |
| 3      | Altération réelle de mes activités sociales ou professionnelles                                            |
| 4      | Gêne invalidante                                                                                           |

**Item 8 — Angoisse associée aux compulsions**

> **ANGOISSE ASSOCIÉE AUX RITUELS**
>
> Comment vous sentiriez-vous si l'on vous empêchait de faire votre/vos rituel(s) ? Seriez-vous très anxieux ?

| Valeur | Libellé                                                                                                                                   |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 0      | Aucune angoisse                                                                                                                           |
| 1      | Légère anxiété si l'on m'empêchait de ritualiser, ou légère anxiété pendant l'accomplissement                                             |
| 2      | L'angoisse monterait mais resterait contrôlable si l'on m'empêchait, ou l'anxiété augmente mais reste contrôlée pendant l'accomplissement |
| 3      | Augmentation très nette et très éprouvante de l'anxiété si les rituels sont interrompus, ou pendant leur accomplissement                  |
| 4      | Anxiété invalidante dès qu'une intervention vise à modifier l'activité ritualisée, ou pendant l'accomplissement                           |

**Item 9 — Résistance aux compulsions**

> **RÉSISTANCE AUX COMPULSIONS**
>
> Quel effort fournissez-vous pour résister aux compulsions ?

| Valeur | Libellé                                                                                                                   |
| ------ | ------------------------------------------------------------------------------------------------------------------------- |
| 0      | Je fais toujours l'effort de résister, ou les symptômes sont si minimes qu'il n'est pas nécessaire de leur résister       |
| 1      | J'essaie de résister la plupart du temps                                                                                  |
| 2      | Je fais quelques efforts pour résister                                                                                    |
| 3      | Je cède à tous les rituels sans essayer de les contrôler, mais je suis quelque peu contrarié(e) de ne pouvoir mieux faire |
| 4      | Je cède volontiers et totalement à tous les rituels                                                                       |

**Item 10 — Contrôle sur les compulsions**

> **DEGRÉ DE CONTRÔLE SUR LES RITUELS**
>
> Quelle est l'intensité de la pulsion qui vous oblige à ritualiser ? Quel contrôle pouvez-vous exercer sur les rituels ?

| Valeur | Libellé                                                                                                                                                                         |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0      | Contrôle total                                                                                                                                                                  |
| 1      | Beaucoup de contrôle ; je ressens une certaine obligation à accomplir les rituels, mais je peux généralement exercer un contrôle volontaire sur cette pression                  |
| 2      | Contrôle moyen, forte obligation à accomplir les rituels, je peux la contrôler mais avec difficulté                                                                             |
| 3      | Peu de contrôle, très forte obligation à accomplir les rituels ; je dois aller jusqu'au bout de l'activité ritualisée et ne peux différer qu'avec difficulté                    |
| 4      | Aucun contrôle, l'obligation à accomplir les rituels est vécue comme complètement involontaire et irrésistible ; je ne peux que rarement différer même momentanément l'activité |

---

## 6. Algorithme de scoring

### Calcul du score total

Somme des 10 items.

**Plage du score total** : 0 à 40

### Subscores calculés

| Subscore          | Formule                | Plage | Affiché dans l'UI    |
| ----------------- | ---------------------- | ----- | -------------------- |
| Score Obsessions  | Somme des items 1 à 5  | 0–20  | oui (côté praticien) |
| Score Compulsions | Somme des items 6 à 10 | 0–20  | oui (côté praticien) |

**Source de la définition des subscores** : Goodman et al. (1989), repris par Mollard, Cottraux & Bouvard (1989) et confirmé par toutes les sources cliniques FR consultées (PDF Cottraux, Cairn/Trybou 2016, IFEMDR, Mentaal). Mentaal affiche également ces deux subscores côté praticien — alignement confirmé.

### Inversions d'items

Aucune inversion mathématique. Les items 4 et 9 (Résistance) sont **sémantiquement inversés** : un score 0 indique une résistance maximale (état le moins symptomatique), un score 4 indique l'abandon de la résistance (état le plus symptomatique). La direction reste cohérente avec les autres items (score élevé = plus sévère). **Aucun traitement spécial dans le code** ; à signaler côté UI praticien comme nuance d'interprétation (cf. section 10).

### Gestion des réponses manquantes

**Refus de la passation incomplète.** Les 10 items sont obligatoires. Toute réponse manquante doit produire une erreur de validation explicite, jamais un score à 0 silencieux (cf. section 9.5).

---

## 7. Seuils d'interprétation

| Score | Interprétation           |
| ----- | ------------------------ |
| 0–7   | Symptômes sous-cliniques |
| 8–15  | TOC léger                |
| 16–23 | TOC modéré               |
| 24–31 | TOC sévère               |
| 32–40 | TOC extrême              |

**Source des seuils** :

| Champ                      | Valeur                                                                                                                                                                                                                                                                                                                                          |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Référence académique**   | Goodman, W. K., Price, L. H., Rasmussen, S. A., et al. (1989). The Yale-Brown Obsessive Compulsive Scale. I. Development, Use, and Reliability. _Archives of General Psychiatry_, 46(11), 1006-1011. Seuils repris par Mollard et al. 1989 et confirmés par Cervin et al. (2022) comme « historiquement utilisés en recherche et en clinique ». |
| **URL directe vérifiable** | https://www.sciencedirect.com/science/article/abs/pii/S0165032725011619 (Cervin et al. 2022, ré-examen empirique des seuils Y-BOCS)                                                                                                                                                                                                             |
| **Date de consultation**   | 30/04/2026                                                                                                                                                                                                                                                                                                                                      |
| **Niveau de consensus**    | `référence universelle`                                                                                                                                                                                                                                                                                                                         |

**Remarques sur les seuils** :

- Repères cliniques complémentaires (Cairn/Trybou & Demonfaucon 2016) pour suivi longitudinal :
  - Score ≥ 16 : critère de sélection en études cliniques contrôlées
  - Score < 16 : rémission
  - Score < 8 : guérison
  - Réduction de 35 % du score : réponse positive au traitement
  - Réduction de 25 à 35 % : réponse partielle
- Ces repères ne sont pas affichés dans l'UI mais peuvent être documentés dans une fiche clinique secondaire (à arbitrer avec Renata).

---

## 8. Alertes cliniques

Aucune alerte spécifique. La Y-BOCS ne comporte pas d'item type « idéation suicidaire » (PHQ-9 item 9) ou critère DSM directement diagnostique justifiant un drapeau indépendant du score total.

---

## 9. Cas de test unitaires

<!--
Tous les cas ci-dessous ont été VÉRIFIÉS ARITHMÉTIQUEMENT EN PYTHON
avant validation. La V1 contenait 4 erreurs arithmétiques sur les
transitions de seuil (T7, T8, T9, T10) — corrigées dans cette V2.
-->

### 1. Cas limites (min/max)

| #   | Réponses                | Total | Obs | Comp | Interprétation           |
| --- | ----------------------- | ----- | --- | ---- | ------------------------ |
| T1  | `[0,0,0,0,0,0,0,0,0,0]` | 0     | 0   | 0    | Symptômes sous-cliniques |
| T2  | `[4,4,4,4,4,4,4,4,4,4]` | 40    | 20  | 20   | TOC extrême              |

### 2. Transitions de seuil

| #   | Score visé | Réponses                | Total | Obs | Comp | Interprétation attendue  |
| --- | ---------- | ----------------------- | ----- | --- | ---- | ------------------------ |
| T3  | 7          | `[2,1,1,1,0,1,1,0,0,0]` | 7     | 5   | 2    | Symptômes sous-cliniques |
| T4  | 8          | `[2,1,1,1,1,1,1,0,0,0]` | 8     | 6   | 2    | TOC léger                |
| T5  | 15         | `[2,2,2,2,2,2,1,1,1,0]` | 15    | 10  | 5    | TOC léger                |
| T6  | 16         | `[2,2,2,2,2,2,2,1,1,0]` | 16    | 10  | 6    | TOC modéré               |
| T7  | 23         | `[3,3,3,2,2,3,3,2,1,1]` | 23    | 13  | 10   | TOC modéré               |
| T8  | 24         | `[3,3,3,2,2,3,3,2,2,1]` | 24    | 13  | 11   | TOC sévère               |
| T9  | 31         | `[4,3,3,3,3,4,3,3,3,2]` | 31    | 16  | 15   | TOC sévère               |
| T10 | 32         | `[4,3,3,3,3,4,4,3,3,2]` | 32    | 16  | 16   | TOC extrême              |

### 3. Cas typiques (sanity check)

| #   | Réponses                | Total | Obs | Comp | Interprétation |
| --- | ----------------------- | ----- | --- | ---- | -------------- |
| T11 | `[2,2,2,1,1,2,2,2,1,1]` | 16    | 8   | 8    | TOC modéré     |
| T12 | `[3,2,3,2,2,3,2,3,2,2]` | 24    | 12  | 12   | TOC sévère     |

### 4. Cas spécifiques à l'échelle (asymétrie subscores)

<!--
Cas spécifiques pour vérifier que les subscores Obsessions/Compulsions
sont calculés indépendamment et non simplement la moitié du total.
-->

| #   | Réponses                | Total | Obs | Comp | Interprétation                             |
| --- | ----------------------- | ----- | --- | ---- | ------------------------------------------ |
| T13 | `[4,4,4,4,4,1,1,1,1,1]` | 25    | 20  | 5    | TOC sévère (profil obsessions dominantes)  |
| T14 | `[1,1,1,1,1,4,4,4,4,4]` | 25    | 5   | 20   | TOC sévère (profil compulsions dominantes) |

### 5. Entrées invalides

| #   | Cas                                      | Comportement attendu                            |
| --- | ---------------------------------------- | ----------------------------------------------- |
| T15 | Valeur hors borne haute : item 1 = 5     | Erreur de validation, pas de score calculé      |
| T16 | Valeur négative : item 3 = -1            | Erreur de validation                            |
| T17 | Réponse manquante : item 5 absent        | Erreur de validation — les 10 items sont requis |
| T18 | Valeur non numérique : item 2 = "modéré" | Erreur de validation                            |
| T19 | Tableau trop court : 9 réponses          | Erreur de validation                            |
| T20 | Tableau trop long : 11 réponses          | Erreur de validation                            |

---

## 10. Points à valider avec Renata

1. **Mode d'administration auto-passation** : la traduction française officielle Mollard 1989 est celle de l'entretien clinicien. Validez-vous l'usage de ces libellés en auto-passation à distance, sachant que (a) la Y-BOCS-SR existe et est validée psychométriquement en anglais, (b) aucune validation FR spécifique de la Y-BOCS-SR n'est identifiée à ce stade ?
2. **Adaptation de la consigne au mode auto-passation** : les consignes Mollard 1989 sont rédigées pour un évaluateur. Faut-il les reformuler pour s'adresser directement au patient ou les conserver telles quelles ?
3. **Libellés exacts des items et consignes** : les libellés ci-dessus sont reproduits littéralement depuis le PDF source primaire Mollard, Cottraux & Bouvard (1989), L'Encéphale, XV, 335-341. Les libellés des options de réponse ont été adaptés de la 3ème personne (perspective évaluateur Mollard) à la 1ère personne (perspective patient), sur le modèle des Y-BOCS-SR anglaises validées (Steketee, Frost & Bogart, 1996). Cette adaptation est-elle acceptable cliniquement ? Y a-t-il un libellé qui dérive du sens Mollard ?
4. **Items 4 et 9 (Résistance) — sémantique inversée** : un score 0 = résistance maximale (état le moins grave). Validez-vous que ce sens reste compréhensible par les patients en auto-passation ? Faut-il un texte d'aide ou ces libellés sont-ils suffisamment clairs ?
5. **Affichage des subscores Obsessions / Compulsions côté praticien** : confirmez-vous l'utilité clinique d'afficher les deux subscores séparément (en plus du score total), conformément à la pratique standard Goodman 1989 et à Mentaal ?
6. **Repères de suivi longitudinal** (Trybou & Demonfaucon 2016 : rémission < 16, guérison < 8, réduction 35 % = réponse positive) : faut-il les afficher sur la fiche praticien ou les laisser hors interface ?
7. **Checklist des symptômes obsessions/compulsions (~74 items binaires)** : validation de la décision MVP de l'inclure en option/cochable côté praticien — décision faite mais pas de spécification des items aujourd'hui. Spec dédiée à produire en V2 future.
8. **Réponses manquantes** : passation refusée si un item manque (recommandation projet) — confirmez-vous ?
9. **Vocabulaire « rituels » vs « compulsions »** : Mollard 1989 utilise « rituels » dans les titres et libellés des items 6, 7, 8, 10 mais « compulsions » pour le titre de l'item 9 et la consigne du bloc. Cette inconsistance est conservée à l'identique du PDF source. Faut-il l'harmoniser pour clarté patient (par exemple toujours « compulsions ») ou conserver la fidélité Mollard ?

---

## 11. Contrat technique pour Adrien

### Signature de la fonction de scoring

```typescript
scoreYbocs(réponses: number[]) → {
  scoreTotal: number,           // 0 à 40
  scoreObsessions: number,      // 0 à 20, somme items 1-5 (index 0-4)
  scoreCompulsions: number,     // 0 à 20, somme items 6-10 (index 5-9)
  interprétation:
    | "Symptômes sous-cliniques"
    | "TOC léger"
    | "TOC modéré"
    | "TOC sévère"
    | "TOC extrême"
}
```

### Contrat d'erreur

- Erreurs de validation levées avec un **message explicite** (jamais de score à 0 silencieux).
- Toute entrée invalide (cf. section 9.5) doit produire une erreur typée, pas un crash non géré.
- Cas à couvrir explicitement : tableau de longueur ≠ 10, valeurs hors `[0, 4]`, valeurs non entières, valeurs non numériques, valeurs `null` ou `undefined`.

### Clés de réponse attendues

Format d'entrée : tableau plat de 10 entiers `[i1, i2, ..., i10]`, où l'index 0 correspond à l'item 1 (première obsession) et l'index 9 à l'item 10 (dernière compulsion).

Si le calculateur générique partagé `calculateOptionsScore` est conservé, les clés `option_0` à `option_9` doivent suivre le même ordre. La spec V1 mentionne un préfixe `bdi_*` cohabitant dans `calculateOptionsScore` — sans impact pour la Y-BOCS, mais à documenter comme couplage implicite.

### Notes d'implémentation

- **Subscores affichés** : la V1 calculait le score total mais n'exposait pas les subscores dans `ScoreResult`. La V2 exige leur exposition (`scoreObsessions`, `scoreCompulsions`).
- **Pas d'inversion mathématique** : les items 4 et 9 sont sémantiquement inversés mais directionnellement cohérents (score élevé = plus sévère). Aucune transformation à appliquer.
- **18 cas de test unitaires** à implémenter (T1-T20 ; T17, T18 et T19 partagent la même catégorie « entrée invalide »).

---

## 12. Historique des modifications

| Date       | Auteur                | Modification                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 30/04/2026 | Cascade (avec Claude) | Récupération du PDF source primaire Mollard 1989 (L'Encéphale, XV, 335-341, 7 pages). Remplacement intégral des libellés items, des consignes patient et des questions d'amorce par les versions littérales du PDF, avec adaptation explicite à la 1ère personne pour les libellés de réponse (sur modèle Y-BOCS-SR Steketee 1996). Correction des titres d'items : passage de paraphrases V2 (« Temps accaparé... », « Détresse occasionnée... », « Degré d'emprise... ») aux titres exacts Mollard (« Temps passé aux... », « Angoisse associée aux... », « Contrôle sur les... »). Différenciation des items 4 et 9 (tous deux titrés « Résistance » dans Mollard) en « Résistance aux obsessions » / « Résistance aux compulsions » pour clarté UI. Ajout d'une note structurelle sur les 19 items totaux de la Y-BOCS originale (10 validés + 9 heuristiques). Ajout de l'affichage des titres d'items au patient en MAJUSCULES, repris des rubriques Mollard p. 337-338, conformément à la convention Y-BOCS-SR (Lee Baer 1991) et à Mentaal. Distinction explicite dans la spec entre titres identifiants internes (p. 341) et titres patient affichés (p. 337). |
| 30/04/2026 | Cascade (avec Claude) | Migration V1 → V2 sur le template canonique. Sourcing rigoureux : Mollard/Cottraux/Bouvard 1989 (primaire) + Bouvard 1992 (validation FR) + PDF Cottraux + Cairn/Trybou 2016 + Mentaal/IFEMDR/Psychiaclic en cross-check. Ajout des subscores Obsessions/Compulsions calculés ET affichés. Renommage du nom complet FR (V1 « Y-BOCS - Index des Symptômes Obsessionnels-Compulsifs » → V2 « Échelle d'obsession-compulsion de Yale-Brown », fidèle au titre Mollard 1989). Correction de 4 erreurs arithmétiques détectées dans les cas de test V1 (T7, T8, T9, T10). Ajout de cas spécifiques pour validation des subscores asymétriques (T13, T14). Statut copyright passé à `bloqué` en attente de clarification ayants-droit. Note explicite sur l'écart entre traduction FR officielle (entretien clinicien) et usage Melya (auto-passation).                                                                                                                                                                                                                                                                                                                      |
| Antérieur  | (V1, non daté)        | Spec V1 initiale, basée sur le code existant (`calculateOptionsScore`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
