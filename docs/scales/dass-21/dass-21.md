# FICHE DASS-21 (Depression Anxiety Stress Scales, forme courte)

**Statut de licence : domaine public, avec des conditions d'usage qui touchent la conception (voir §3 et NOTE DROITS DASS-21). Point d'attention majeur : les auteurs demandent que les scores ne soient jamais montrés au patient et qu'aucune interprétation automatique ne lui soit proposée.**

**Statut de la fiche (10/10/2026) : rédigée, pas encore relue. Prochaine étape : relire et trancher les points de vigilance de la §10 (questions Q1 à Q12), puis implémentation (anticipation technique en §11), puis recette.**

---

## 1\. Métadonnées produit

| Champ | Valeur |
| :---- | :---- |
| **Nom court** | DASS-21 |
| **Nom complet (FR)** | EDAS21 — sigle tel qu'il figure sur le PDF de la version française ; **le libellé développé en français n'apparaît pas dans la source** \[À VALIDER PRACTICIEN\] |
| **Nom complet (langue originale)** | Depression Anxiety Stress Scales — 21 items (DASS21) |
| **Thème principal** | Détresse émotionnelle : dépression, anxiété, stress |
| **Sous-thèmes / tags** | dépression, anxiété, stress/tension, dépistage dimensionnel |
| **Nombre d'items** | 21 (3 échelles de 7 items) |
| **Durée estimée de passation** | \[À SOURCER — la FAQ officielle indique seulement que le DASS-21 prend environ moitié moins de temps que le DASS complet, sans durée chiffrée\] |
| **Public cible** | Adultes — la FAQ officielle indique un usage possible dès 14 ans (version DASS-Y en dessous) |
| **Mode d'administration** | Auto (auto-questionnaire) — FAQ officielle : aucune compétence particulière pour l'administrer ; l'interprétation relève de personnes formées |
| **Note sur le mode d'administration** | L'interprétation doit être faite par un professionnel qualifié, surtout si la personne a cherché une aide ou présente une détresse élevée (FAQ 2). |
| **Période de référence** | La dernière semaine |
| **Description praticien (bibliothèque)** | Auto-questionnaire de 21 items évaluant sur la dernière semaine trois dimensions de la détresse émotionnelle (dépression, anxiété, stress/tension). Mesure dimensionnelle de sévérité relative à la population, pas un outil diagnostique. |
| **Description patient (portail)** | AUCUNE — règle projet : le portail patient ne comporte pas de description de l'échelle. Seule la consigne officielle (ci-dessous) est affichée. |

---

## 2\. Sources et traçabilité

### Source primaire (items, consigne, libellés de réponse — français)

- **Type** : traduction française postée sur le site officiel du DASS (hébergé par le détenteur des droits)  
- **Référence complète** : Martin D. (Université d'Ottawa, Service d'appui au succès scolaire). *French translation of the DASS / DASS21*, PDF « EDAS21 ». Traduction mise en ligne sur le site DASS de la Psychology Foundation of Australia / UNSW.  
- **URL** : [https\://www2.psy.unsw.edu.au/DASS/French/DASS21French.pdf](https://www2.psy.unsw.edu.au/DASS/French/DASS21French.pdf) (page de présentation : [https\://www2.psy.unsw.edu.au/DASS/French/French.htm](https://www2.psy.unsw.edu.au/DASS/French/French.htm))  
- **Date de consultation** : 08/10/2026  
- **Archive** : `EDAS21.pdf` (dans ce dossier ; texte vérifié le 10/10/2026 contre la §5 : les 21 items, la consigne et les 4 libellés concordent). Le DASS-42 français (`EDAS.pdf`) et le DASS-21 anglais (`Dass21 questionnaire.pdf`) sont aussi archivés. Les captures `sources/*.md` citées plus bas n'ont pas été déposées (pas de dossier `sources/`) : voir §10, « Tenue de la fiche ».

### Sources de cross-check

- **Cross-check 1 — site officiel (anglais), structure, grille de cotation, règles d'usage** : DASS21 anglais officiel ([https\://www2.psy.unsw.edu.au/Dass/Download%20files/Dass21.pdf](https://www2.psy.unsw.edu.au/Dass/Download%20files/Dass21.pdf)), grille de cotation officielle ([https\://www2.psy.unsw.edu.au/Dass/Download%20files/Dass\_template.pdf](https://www2.psy.unsw.edu.au/Dass/Download%20files/Dass_template.pdf)), FAQ ([https\://www2.psy.unsw.edu.au/Dass/DASSFAQ.htm](https://www2.psy.unsw.edu.au/Dass/DASSFAQ.htm)). Consultés le 08/10/2026. Archive : `sources/DASS_officiel-UNSW-FAQ-droits-scoring.md`.  
- **Cross-check 2 — cohérence interne de la traduction (⚠️ non indépendant)** : DASS-42 français du même traducteur ([https\://www2.psy.unsw.edu.au/DASS/French/DASS42French.pdf](https://www2.psy.unsw.edu.au/DASS/French/DASS42French.pdf)), consulté le 08/10/2026. Les 21 formulations du DASS-21 français reprennent mot pour mot 21 items du DASS-42 français (correspondance complète dans `sources/DASS42_FR-Ottawa-crosscheck-items.md`).  
- **Seuils de sévérité** : restitutions tierces convergentes du manuel, voir §7 et `sources/DASS_seuils-severite-restitutions-tierces.md`.

### ⚠️ Pas de seconde source française indépendante

Aucune seconde version française du DASS-21 n'a pu être trouvée et consultée. La règle du playbook (deux sources indépendantes) n'est donc pas remplie pour le texte français des items. Justification et limites :

- La version retenue est celle que le détenteur des droits héberge lui-même sur son site officiel pour le français.  
- **Mais** l'équipe DASS déclare ne donner aucune garantie sur l'adéquation ou la validité des traductions listées. L'autorité sur la qualité de la traduction est donc faible.  
- Une validation de « la version française » existe (Canadian Journal of Behavioural Science, 2018, 50(4), 238-247 ; notice de l'Université de Lausanne : [https\://serval.unil.ch/notice/serval:BIB\_52FC62A2DDE2](https://serval.unil.ch/notice/serval:BIB_52FC62A2DDE2)). Ni les auteurs, ni la version de traduction utilisée, ni le texte n'ont pu être consultés. **Si cette étude s'appuie sur une version suisse, la hiérarchie de versions du projet (France \> Suisse \> Belgique \> Québec) la ferait primer sur la version d'Ottawa (Canada).** Point bloquant à lever, voir §10.

### Divergences constatées

1. **Seuils de sévérité absents du site officiel** : les auteurs ne les publient que dans le manuel payant (FAQ 5). Ils sont repris dans de nombreuses sources tierces, toutes concordantes, sauf une coquille probable (wiki AHSRI : Stress « léger » \= 14-18 au lieu de 15-18).  
2. **Correspondance DASS-21 / DASS-42** : les numéros d'items ne se correspondent pas (ex. item 13 du DASS-21 « abattu(e) et triste » \= item 26 du DASS-42 ; item 21 du DASS-21 « la vie n'avait pas de sens » \= item 38 du DASS-42). Ne jamais apparier les deux versions par numéro.  
3. **Titre** : le PDF français ne porte que le sigle « EDAS21 », sans titre développé en français.  
4. **Consigne de support papier** : la consigne française demande d'« encercler le chiffre », formulation propre au papier (voir §4 et §10).  
5. **Variantes de libellés dans des documents de cliniques** (étiquettes « jamais/parfois/souvent/presque toujours » ajoutées aux réponses) : absentes du formulaire officiel, non retenues.

### Version française retenue

- **Traducteur** : Donald Martin (Université d'Ottawa), crédité sur la page de présentation  
- **Année de la traduction** : \[À SOURCER — non indiquée\]  
- **Publication de validation française** : \[À SOURCER — aucune citée sur la page de la traduction ; une validation de « la version française » existe (CJBS 2018\) mais n'a pas pu être rattachée à cette traduction\]  
- **Justification du choix** : seule version française complète du DASS-21 identifiée et accessible, hébergée par le détenteur des droits (voir limites ci-dessus).

---

## 3\. Statut copyright et licence

Voir le Doc « NOTE DROITS DASS-21 » dans ce même dossier. En résumé :

| Champ | Valeur |
| :---- | :---- |
| **Statut** | Libre (domaine public), sous conditions d'usage |
| **Détenteur des droits** | Psychology Foundation of Australia / UNSW (instrument déclaré dans le domaine public par ses auteurs) |
| **Mention obligatoire à afficher** | Citation du manuel : Lovibond S.H. & Lovibond P.F. (1995). *Manual for the Depression Anxiety Stress Scales* (2nd ed.). Sydney: Psychology Foundation. |
| **Conditions d'usage** | (1) ne pas modifier les échelles ni les vendre ; (2) app réservée à un groupe défini, résultats renvoyés au praticien ; (3) scores non montrés aux répondants, pas d'interprétation automatisée destinée au répondant |
| **Décision Melya** | À trancher : voir §10, Q9 (usage commercial) et Q10 (décision droits) |

---

## 4\. Structure de l'échelle

### Consigne officielle (affichée au patient avant les items)

> *« Veuillez lire chaque énoncé et indiquez lequel correspond le mieux à votre expérience au cours de la dernière semaine. Indiquez votre choix en encerclant le chiffre qui y correspond (soit 0, 1, 2 ou 3). Il n'y a pas de bonne ou de mauvaise réponse. Ne vous attardez pas trop longuement aux énoncés. »*

**Source de la consigne** : source primaire (§2). Équivalent anglais officiel : Please read each statement and circle a number 0, 1, 2 or 3 which indicates how much the statement applied to you over the past week ; no right or wrong answers ; do not spend too much time on any statement.

**Adaptation de support à trancher (§10)** : « en encerclant le chiffre qui y correspond (soit 0, 1, 2 ou 3\) » est une formulation papier. Une adaptation du type « en sélectionnant la réponse qui y correspond » modifierait le texte officiel : à documenter comme déviation de support et à faire valider, puisque les auteurs interdisent la modification de l'échelle.

### Libellés de réponse (identiques pour les 21 items)

| Valeur | Libellé français (source primaire) | Libellé anglais officiel (vérification) |
| :---- | :---- | :---- |
| 0 | ne s'applique pas du tout à moi | Did not apply to me at all |
| 1 | s'applique un peu à moi, ou une partie du temps | Applied to me to some degree, or some of the time |
| 2 | s'applique beaucoup à moi, ou une bonne partie du temps | Applied to me to a considerable degree, or a good part of time |
| 3 | s'applique entièrement à moi, ou la grande majorité du temps | Applied to me very much, or most of the time |

### Comportement UX de la consigne

| Champ | Valeur |
| :---- | :---- |
| **Persistance** | \[À VALIDER PRACTICIEN — la consigne et l'échelle de notation apparaissent une seule fois, avant le bloc des 21 items\] |
| **Emplacement** | En-tête, avant l'item 1 |
| **Justification** | Position observée directement sur le document source. |
| **Cas particuliers** | Aucun. |

### Affichage du titre côté portail patient

| Champ | Valeur |
| :---- | :---- |
| **Élément(s) affiché(s) en titre sur le PDF source primaire** | Sigle « EDAS21 » uniquement, suivi de « Nom : » et « Date : » |
| **Référence PDF** | Page 1, en-tête |
| **Sous-titre à afficher dans l'app (`patientIntroSubtitle`)** | \[À VALIDER PRACTICIEN — aucun titre développé en français dans la source\] |
| **Divergence avec le PDF** | Sans objet à ce stade. |

### Dimensions de cotation

Trois échelles indépendantes de 7 items chacune, **pas de score total officiel** (voir §6) :

- **Dépression** (items 3, 5, 10, 13, 16, 17, 21\) — plage finale 0 à 42 après multiplication par 2  
- **Anxiété** (items 2, 4, 7, 9, 15, 19, 20\) — plage finale 0 à 42  
- **Stress** (items 1, 6, 8, 11, 12, 14, 18\) — plage finale 0 à 42

Appartenance des items lue sur la grille de cotation officielle (lettres S A D A D S A S A D S S D S A D D S A A D pour les items 1 à 21\) et concordante avec deux restitutions indépendantes.

---

## 5\. Items

*Échelle de réponse identique pour les 21 items (voir §4). Formulations françaises exactes de la source primaire ; colonne « Échelle » \= échelle de cotation officielle.*

| \# | Item (français — source primaire) | Échelle |
| :---- | :---- | :---- |
| 1 | J'ai trouvé difficile de décompresser. | Stress |
| 2 | J'ai été conscient(e) d'avoir la bouche sèche. | Anxiété |
| 3 | J'ai eu l'impression de ne pas pouvoir ressentir d'émotion positive. | Dépression |
| 4 | J'ai eu de la difficulté à respirer (par exemple, respirations excessivement rapides, essoufflement sans effort physique). | Anxiété |
| 5 | J'ai eu de la difficulté à initier de nouvelles activités. | Dépression |
| 6 | J'ai eu tendance à réagir de façon exagérée. | Stress |
| 7 | J'ai eu des tremblements (par exemple, des mains). | Anxiété |
| 8 | J'ai eu l'impression de dépenser beaucoup d'énergie nerveuse. | Stress |
| 9 | Je me suis inquiété(e) en pensant à des situations où je pourrais paniquer et faire de moi un(e) idiot(e). | Anxiété |
| 10 | J'ai eu le sentiment de ne rien envisager avec plaisir. | Dépression |
| 11 | Je me suis aperçu(e) que je devenais agité(e). | Stress |
| 12 | J'ai eu de la difficulté à me détendre. | Stress |
| 13 | Je me suis senti(e) abattu(e) et triste. | Dépression |
| 14 | J'ai été intolérant(e) à tout ce qui m'empêchait de faire ce que j'avais à faire. | Stress |
| 15 | J'ai eu le sentiment d'être presque pris(e) de panique. | Anxiété |
| 16 | J'ai été incapable de me sentir enthousiaste au sujet de quoi que ce soit. | Dépression |
| 17 | J'ai eu le sentiment de ne pas valoir grand chose comme personne. | Dépression |
| 18 | J'ai eu l'impression d'être assez susceptible. | Stress |
| 19 | J'ai été conscient(e) des palpitations de mon coeur en l'absence d'effort physique (sensation d'augmentation de mon rythme cardiaque ou l'impression que mon cœur venait de sauter). | Anxiété |
| 20 | J'ai eu peur sans bonne raison. | Anxiété |
| 21 | J'ai eu l'impression que la vie n'avait pas de sens. | Dépression |

**⚠️ Items 17 (« ne pas valoir grand chose comme personne ») et 21 (« la vie n'avait pas de sens »)** touchent à la dévalorisation et au sens de la vie. Aucune source officielle ne définit d'alerte pour ces items et ils ne portent pas explicitement sur des idées suicidaires. Conformément au playbook (§7 point 7), toute alerte clinique éventuelle est une décision de Clément, jamais du rédacteur. Voir §8 et §10 (Q6).

---

## 6\. Algorithme de scoring

### Calcul des scores

Pour chaque échelle : **somme des 7 items de l'échelle, puis multiplication par 2** (règle officielle pour le DASS-21, afin de pouvoir comparer aux normes du DASS complet). Chaque score final va de 0 à 42 et ne prend que des valeurs paires.

- Dépression \= 2 × (item 3 \+ item 5 \+ item 10 \+ item 13 \+ item 16 \+ item 17 \+ item 21\)  
- Anxiété \= 2 × (item 2 \+ item 4 \+ item 7 \+ item 9 \+ item 15 \+ item 19 \+ item 20\)  
- Stress \= 2 × (item 1 \+ item 6 \+ item 8 \+ item 11 \+ item 12 \+ item 14 \+ item 18\)

**Score total** : aucun score total n'est défini comme standard. La FAQ officielle indique qu'additionner les trois scores est possible, la méthode recommandée passant par des scores Z issus des normes du manuel. Cette méthode n'est pas implémentable sans le manuel : **pas de score total par défaut**.

### Subscores calculés

Sans objet au-delà des trois échelles.

### Inversions d'items

Sans objet — aucun item inversé.

### Gestion des réponses manquantes

\[À VALIDER PRACTICIEN\] La FAQ officielle (FAQ 27\) donne une règle empirique, sans en faire une norme fixe : jusqu'à 1 item manquant par échelle de 7 items pour le DASS-21 ; avec un seul item manquant, on moyenne les items restants ; au-delà, la validité est compromise (en clinique, explorer les raisons). Recommandation projet par défaut : refuser la passation incomplète, en sachant que la source officielle admet un item manquant par échelle. À trancher : §10, Q7.

---

## 7\. Seuils d'interprétation

**⚠️ Les seuils de sévérité ne sont pas publiés par les auteurs sur leur site** : la FAQ 5 précise qu'ils figurent uniquement dans le manuel payant (55 AUD), pour éviter une mauvaise interprétation. Le tableau ci-dessous provient de restitutions tierces convergentes du manuel et **n'a pas été vérifié sur le manuel lui-même**.

Scores **déjà multipliés par 2** :

| Niveau (libellé anglais) | Dépression | Anxiété | Stress |
| :---- | :---- | :---- | :---- |
| Normal | 0 – 9 | 0 – 7 | 0 – 14 |
| Mild | 10 – 13 | 8 – 9 | 15 – 18 |
| Moderate | 14 – 20 | 10 – 14 | 19 – 25 |
| Severe | 21 – 27 | 15 – 19 | 26 – 33 |
| Extremely severe | 28+ | 20+ | 34+ |

**Libellés français** : non fournis par la source française — \[À VALIDER PRACTICIEN\]. Je n'ai pas inventé de traduction.

**Source des seuils** :

| Champ | Valeur |
| :---- | :---- |
| **Référence académique** | Lovibond S.H. & Lovibond P.F. (1995). *Manual for the Depression Anxiety Stress Scales* (2nd ed.). Sydney: Psychology Foundation. Non consulté (payant). |
| **URL directe vérifiable** | Restitutions : [https\://pmc.ncbi.nlm.nih.gov/articles/PMC5012292/table/table-5](https://pmc.ncbi.nlm.nih.gov/articles/PMC5012292/table/table-5) (PeerJ 2016, tableau attribué à Lovibond & Lovibond 1995b) ; [https\://cesphn.org.au/wp-content/uploads/2022/10/DASS\_21.pdf](https://cesphn.org.au/wp-content/uploads/2022/10/DASS_21.pdf) (page « DASS Severity Ratings » attribuée au Psychology Department, UNSW) ; liste complète dans `sources/DASS_seuils-severite-restitutions-tierces.md` |
| **Date de consultation** | 08/10/2026 |
| **Niveau de consensus** | Fort entre sources tierces (six restitutions identiques ; une coquille probable isolée) ; source primaire non vérifiée. |

**Remarques sur les seuils** :

- Les étiquettes décrivent la position du score **dans la population** et pas un niveau de trouble : « léger » signifie au-dessus de la moyenne mais bien en dessous de la sévérité typique des personnes qui consultent (FAQ 5). Aucun diagnostic n'en découle.  
- Ces seuils reposent sur des normes de population en anglais. Ils ne voyagent pas automatiquement vers le français (règle du playbook) ; la validation française de 2018 pourrait fournir des repères propres, non consultée.  
- Les scores étant toujours pairs, les valeurs 9, 13 et 27 (bornes hautes impaires) ne peuvent jamais être atteintes.

---

## 8\. Alertes cliniques

Aucune alerte par item, indépendante du score, n'est définie par les sources officielles consultées. Les auteurs précisent que les scores individuels ne définissent pas d'interventions appropriées et que l'interprétation doit revenir à un professionnel qualifié. Les items 17 et 21 (§5) pourraient justifier une attention clinique particulière : **le rédacteur ne présume d'aucune règle d'alerte** — décision à prendre par Clément (§10, Q6).

---

## 9\. Cas de test unitaires

*Tous les scores ci-dessous sont les scores finaux (somme × 2). « Brut » \= somme des 7 items avant multiplication.*

### 1\. Cas limites (min/max)

| \# | Réponses | Dépression | Anxiété | Stress |
| :---- | :---- | :---- | :---- | :---- |
| T1 | Les 21 items à 0 | 0 — Normal | 0 — Normal | 0 — Normal |
| T2 | Les 21 items à 3 | 42 — Extremely severe | 42 — Extremely severe | 42 — Extremely severe |

### 2\. Transitions de seuil — Dépression

| \# | Brut | Final | Niveau |
| :---- | :---- | :---- | :---- |
| T3 | 4 | 8 | Normal |
| T4 | 5 | 10 | Mild |
| T5 | 6 | 12 | Mild |
| T6 | 7 | 14 | Moderate |
| T7 | 10 | 20 | Moderate |
| T8 | 11 | 22 | Severe |
| T9 | 13 | 26 | Severe |
| T10 | 14 | 28 | Extremely severe |

### 3\. Transitions de seuil — Anxiété

| \# | Brut | Final | Niveau |
| :---- | :---- | :---- | :---- |
| T11 | 3 | 6 | Normal |
| T12 | 4 | 8 | Mild |
| T13 | 5 | 10 | Moderate |
| T14 | 7 | 14 | Moderate |
| T15 | 8 | 16 | Severe |
| T16 | 9 | 18 | Severe |
| T17 | 10 | 20 | Extremely severe |

### 4\. Transitions de seuil — Stress

| \# | Brut | Final | Niveau |
| :---- | :---- | :---- | :---- |
| T18 | 7 | 14 | Normal |
| T19 | 8 | 16 | Mild |
| T20 | 9 | 18 | Mild |
| T21 | 10 | 20 | Moderate |
| T22 | 12 | 24 | Moderate |
| T23 | 13 | 26 | Severe |
| T24 | 16 | 32 | Severe |
| T25 | 17 | 34 | Extremely severe |

### 5\. Cas typique (sanity check)

| \# | Réponses (items 1 à 21\) | Détail | Résultat |
| :---- | :---- | :---- | :---- |
| T26 | 1,0,2,1,0,1,0,2,1,0,1,2,1,0,1,0,1,0,1,0,0 | Dépression (items 3,5,10,13,16,17,21) \= 2+0+0+1+0+1+0 \= 4 ; Anxiété (items 2,4,7,9,15,19,20) \= 0+1+0+1+1+1+0 \= 4 ; Stress (items 1,6,8,11,12,14,18) \= 1+1+2+1+2+0+0 \= 7 | Dépression 8 (Normal) ; Anxiété 8 (Mild) ; Stress 14 (Normal) |

### 6\. Cas spécifiques à l'échelle — appartenance des items aux échelles

| \# | Cas | Résultat attendu |
| :---- | :---- | :---- |
| T27 | Seul l'item 1 \= 3, tous les autres à 0 | Stress \= 6 ; Dépression \= 0 ; Anxiété \= 0 (l'item 1 appartient au Stress) |
| T28 | Seul l'item 21 \= 3, tous les autres à 0 | Dépression \= 6 ; Anxiété \= 0 ; Stress \= 0 |
| T29 | Items 3, 5, 10, 13, 16, 17, 21 \= 3, tous les autres à 0 | Dépression \= 42 (Extremely severe) ; Anxiété \= 0 ; Stress \= 0 |
| T30 | Même total brut réparti sur des items de plusieurs échelles | Chaque échelle ne somme que ses 7 items, jamais d'addition croisée |

### 7\. Entrées invalides

| \# | Cas | Comportement attendu |
| :---- | :---- | :---- |
| T31 | Valeur hors borne pour un item (ex. 4\) | Erreur de validation, pas de score calculé |
| T32 | Valeur négative | Erreur de validation |
| T33 | Réponse manquante | Erreur de validation par défaut (à confirmer, voir §6 et §10) |
| T34 | Valeur non numérique | Erreur de validation |
| T35 | Tableau trop court (\< 21 items) | Erreur de validation |
| T36 | Tableau trop long (\> 21 items) | Erreur de validation |

---

## 10\. Choix et arbitrages méthodologiques

*Section réécrite le 10/10/2026 au format commun (plus de validation clinique externe : c'est Clément qui tranche). Rien n'est encore tranché. Les questions Q1 à Q12 sont fermées, chacune avec une recommandation ; une fois tranchées, les décisions passent dans les deux premiers tableaux.*

### Écarts à la source primaire

Aucun écart validé à ce jour. Écarts **proposés**, en attente de décision :

| Élément | Source primaire | Texte proposé | Origine du texte proposé | Type (playbook §5.3) | Statut |
| --- | --- | --- | --- | --- | --- |
| Consigne, 2e phrase | « Indiquez votre choix en encerclant le chiffre qui y correspond (soit 0,1,2 ou 3). » | Voir Q5 | Formulation Melya (il n'existe pas de seconde source française dont reprendre le texte) | 1 — adaptation du support | Proposé, Q5 |
| Consigne, bloc « L'échelle de notation est la suivante : » suivi des 4 libellés | Affiché une fois, sous la consigne | Les 4 libellés sont affichés sur les boutons de réponse de chaque item ; le bloc d'en-tête est à garder ou retirer (Q5) | Source primaire (libellés inchangés) | 1 — adaptation du support | Proposé, Q5 |
| Item 19 | « palpitations de mon coeur […] mon cœur venait de sauter » (deux graphies dans le même item) | « cœur » aux deux endroits | Normalisation typographique | 2 — coquille manifeste | Proposé : typographie, sens inchangé (même logique que les guillemets PDEQ) |

### Autres arbitrages

Aucun tranché à ce jour.

### Questions ouvertes

#### A. À trancher avant l'implémentation

**Q1 — Source des seuils de sévérité.** Les auteurs ne publient les seuils que dans le manuel payant (55 AUD), volontairement (FAQ 5). La §7 reprend six restitutions tierces concordantes, non vérifiées sur le manuel : c'est contraire à la règle « la source officielle est le seul guide ».
- (A) Acheter le manuel et vérifier la grille sur la source primaire.
- (B) Garder les restitutions tierces en l'état, en le consignant.
- **Reco : A.** Le coût est faible. En attendant, on implémente avec les seuils de la §7 (l'implémentation n'est pas bloquée), mais la recette l'est tant que la grille n'est pas vérifiée.

**Q2 — Afficher des niveaux de sévérité au praticien, ou seulement les trois scores ?** Les étiquettes situent le score dans la population (« léger » = au-dessus de la moyenne, bien en dessous de la sévérité typique des personnes qui consultent ; FAQ 5) : ce n'est pas un niveau de trouble. Les seuils reposent sur des normes anglophones.
- (A) Scores + niveau de sévérité par sous-échelle.
- (B) Scores seuls.
- **Reco : A.** C'est ce qu'attend un praticien, et la FAQ 9 n'interdit l'interprétation automatique que pour le répondant. Ajouter une mention praticien « position par rapport à la population, pas un diagnostic » serait un ajout de texte : à décider en même temps.

**Q3 — Libellés français des niveaux.** Aucune source française ne les fournit (Normal / Mild / Moderate / Severe / Extremely severe).
- (A) Traduction littérale : Normal / Léger / Modéré / Sévère / Extrêmement sévère, consignée comme formulation Melya (texte lu par le praticien seulement).
- (B) Reprendre les libellés d'une publication française (validation 2018, cf. Q4), si elle en donne.
- **Reco : A**, à remplacer par B si l'article est obtenu et en fournit.

**Q4 — Traduction retenue.** Version d'Ottawa (D. Martin, Canada), hébergée par les auteurs mais sans garantie de leur part, sans seconde source française indépendante (règle des deux sources non remplie). Une validation de « la version française » existe (Canadian Journal of Behavioural Science, 2018, 50(4), 238-247 ; notice UNIL) : si elle repose sur une version suisse ou française, cette version passerait devant la canadienne (France > Suisse > Belgique > Québec).
- (A) Partir sur Ottawa et chercher l'article en parallèle (question non bloquante pour l'implémentation).
- (B) Bloquer jusqu'à lecture de l'article.
- **Reco : A**, avec l'article lu avant la recette si possible.

**Q5 — Consigne écrite pour le papier.** « en encerclant le chiffre qui y correspond (soit 0,1,2 ou 3) » ; or les auteurs interdisent de modifier l'échelle.
- (A) Texte source intégral, « encercler » compris.
- (B) Adaptation de support : « Indiquez votre choix en sélectionnant la réponse qui y correspond. » (« (soit 0, 1, 2 ou 3) » retiré si les chiffres ne sont pas affichés sur les boutons), et retrait du bloc « L'échelle de notation est la suivante : » puisque les libellés sont sur chaque bouton.
- **Reco : B.** Précédents PDEQ et CUDIT-R ; les auteurs acceptent les versions informatisées (FAQ 21), leur interdiction porte sur le contenu de l'échelle. Les items et les libellés restent mot pour mot.

**Q6 — Alerte sur les items 17 et 21** (« ne pas valoir grand chose comme personne », « la vie n'avait pas de sens »). Aucune source n'en définit et aucun des deux ne porte explicitement sur des idées suicidaires.
- (A) Pas d'alerte.
- (B) Signalement `critical-item` à partir d'une réponse donnée (laquelle ?).
- **Reco : A**, par fidélité à la source. Le praticien voit de toute façon les réponses item par item.

**Q7 — Réponses manquantes.**
- (A) Passation incomplète refusée, sans imputation (règle commune à toutes les échelles).
- (B) Règle empirique des auteurs (FAQ 27) : jusqu'à 1 item manquant par sous-échelle, remplacé par la moyenne des items restants.
- **Reco : A.** L'app impose déjà de répondre à tous les items.

**Q8 — Score total.** Aucun total standard : la méthode recommandée passe par des scores Z issus des normes du manuel (FAQ).
- (A) Pas de score total.
- (B) Somme brute des trois sous-échelles.
- **Reco : A.** Conséquence technique en §11 : l'écran de résultats et l'historique doivent fonctionner sans total.

#### B. À trancher avant la recette

**Q9 — Usage commercial.** La FAQ 22 autorise de facturer une évaluation qui inclut le DASS, et interdit de vendre l'échelle elle-même ; le cas d'un SaaS facturé aux praticiens n'est pas explicite.
- (A) Envoyer un court e-mail de confirmation à P. Lovibond (p.lovibond@unsw.edu.au, FAQ 29).
- (B) S'en tenir à notre lecture (Melya vend un service, pas l'échelle).
- **Reco : A**, non bloquant pour l'implémentation (même logique que la PDSS ✉️).

**Q10 — Décision Melya sur les droits (§3).**
- (A) ✅ libre sous conditions : pas de modification, pas de vente de l'échelle, patients invités uniquement avec résultats renvoyés au praticien, aucun score ni interprétation montrés au patient, citation du manuel.
- (B) En attente de la réponse à Q9.
- **Reco : A**, à revoir seulement si la réponse de Q9 est négative.

**Q11 — Nom au catalogue et sous-titre patient.** La source ne porte que le sigle « EDAS21 », sans titre développé.
- (A) Nom descriptif Melya au catalogue (ex. « Échelles de dépression, d'anxiété et de stress », précédent CUDIT-R) et sous-titre patient « EDAS21 », tel que sur la source.
- (B) Pas de sous-titre patient (`patientIntroSubtitle: null`).
- **Reco : A.**

**Q12 — Durée de passation.** Non sourcée : la FAQ dit seulement que le DASS-21 prend environ moitié moins de temps que le DASS-42. Le champ `estimatedTime` est obligatoire dans l'app.
- (A) Fourchette estimée par Melya, consignée comme estimation.
- (B) Chercher une durée sourcée (validation 2018, Q4).
- **Reco : A.**

#### Contraintes des auteurs à vérifier en recette (non négociables)

- Portail patient : aucun score, aucun niveau, aucune interprétation, y compris sur l'écran de fin de passation (FAQ 9).
- Résultats visibles du seul praticien qui a envoyé l'échelle (FAQ 21).
- Items et libellés de réponse mot pour mot (hors écarts validés ci-dessus).
- Citation du manuel dans `copyrightAttribution` : Lovibond S.H. & Lovibond P.F. (1995). *Manual for the Depression Anxiety Stress Scales* (2nd ed.). Sydney: Psychology Foundation. Créditer aussi la traduction (D. Martin, Université d'Ottawa), comme pour la PDEQ.

#### Pièges de calcul (à couvrir par les tests de la §9)

- Multiplication par 2 de chaque somme : un oubli donne des scores de 0 à 21, faux pour toute la grille.
- Scores toujours pairs : les bornes 9, 13 et 27 ne sont jamais atteintes, les transitions se testent sur des valeurs paires.
- Numérotation propre au DASS-21 : ne jamais apparier avec le DASS-42 par numéro d'item.
- Trois sous-échelles indépendantes, sans addition croisée.

#### Tenue de la fiche (avant relecture)

- Comparaison Mentaal absente (obligatoire, playbook §5.4) : le DASS-21 est dans leur catalogue disponible. Dérouler leur parcours patient et comparer à trois (nous / eux / source).
- Captures `sources/*.md` citées en §2 et §7 non déposées : soit les créer, soit remplacer les références par les URL et les PDF du dossier.
- Restes du gabarit à purger une fois les questions tranchées : `[À VALIDER PRACTICIEN]` (§1, §4, §6, §7) et `[À SOURCER]` (§1, §2).

---

## 11\. Contrat technique

*Le contrat définitif se fixe à l'implémentation (playbook §5.6). Points d'anticipation relevés le 10/10/2026 en lisant le code :*

- **Pas de score total, alors que `ScoreResult` en exige un** (`packages/core/src/types/index.ts`) : `totalScore`, `maxScore`, `interpretation`, `severityIndex` et `severityRangeCount` sont obligatoires, et l'écran de résultats s'appuie dessus (`ScoreArcGauge`, `TrendBlock` pour la comparaison avec la passation précédente). Il faut décider ce que ces champs portent pour une échelle sans total, ou les rendre optionnels, et afficher **trois scores** à la place de la jauge unique.
- **`Subscore` ne porte pas de sévérité** (`key`, `label`, `value`, `max` seulement) : l'étendre avec les tranches et l'interprétation par sous-échelle (`ranges`, `interpretation`, `severityIndex`), sans casser PCL-5, Y-BOCS, LSAS et ÉII qui l'utilisent déjà.
- **Historique longitudinal** : une courbe par sous-échelle, puisqu'il n'y a pas de total à suivre.
- **Passation** : `formType` `single-scale` (4 libellés identiques pour les 21 items), sans intitulé court par item (absents de la source).
- **Scorer** : `apps/api/src/scoring/scorers/dass21.ts`, somme × 2 par sous-échelle (max 42), validation stricte des entrées ; `dass21.spec.ts` rejoue les cas T1 à T36 de la §9 (même patron que `cudit.spec.ts`).
- **Portail patient** : vérifier qu'aucun composant de fin de passation n'affiche de score (contrainte FAQ 9).

---

## 12\. Historique des modifications

| Date | Auteur | Modification |
| :---- | :---- | :---- |
| 08/10/2026 | James (via Claude) | Création initiale. Source primaire \= traduction française d'Ottawa (D. Martin) hébergée sur le site officiel du DASS ; cross-checks \= DASS-21 anglais et grille officiels, FAQ officielle, DASS-42 français du même traducteur (non indépendant). Aucune seconde source française indépendante trouvée (point bloquant §2/§10). Seuils de sévérité repris de restitutions tierces convergentes du manuel payant (non vérifiés sur le manuel). Contraintes des auteurs sur l'usage logiciel (FAQ 9 et 21\) documentées. §11 laissée vide pour Adrien. |
| 10/10/2026 | Clément (avec Claude) | Préparation de la relecture (fiche pas encore relue par Clément). §10 réécrite au format « Choix et arbitrages méthodologiques » (plus de validation clinique externe) : 12 questions fermées avec recommandations (seuils non publiés, libellés FR, traduction, consigne papier, items 17/21, réponses manquantes, score total, droits, nom, durée), contraintes des auteurs et pièges de calcul à vérifier en recette, tenue de la fiche (comparaison Mentaal absente, captures `sources/` manquantes). §11 : anticipation technique (pas de score total vs `ScoreResult`, `Subscore` sans sévérité, historique par sous-échelle). Archive PDF `EDAS21.pdf` vérifiée contre la §5. Mentions de Renata retirées. Rien n'est tranché. |
