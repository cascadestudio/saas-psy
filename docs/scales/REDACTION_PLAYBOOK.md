# Playbook de rédaction d'une fiche d'échelle

> **Objectif du document** : permettre à quelqu'un qui n'est ni clinicien ni
> développeur de produire une fiche d'échelle complète et **relisable en une
> passe** par Clément. C'est le pendant amont du `RECETTE_PLAYBOOK.md` (qui,
> lui, décrit l'implémentation et la recette une fois la fiche validée).
>
> Trois documents, trois rôles :
> - `_TEMPLATE.md` → **le format** de la fiche (quoi remplir)
> - `REDACTION_PLAYBOOK.md` (ce fichier) → **la méthode** (comment le trouver et le décider)
> - `RECETTE_PLAYBOOK.md` → **l'implémentation et la recette** (une fois la fiche validée)

---

## En bref — James, concrètement

Une échelle à la fois. Pour chacune, dans cet ordre :

1. **Crée le dossier Drive** `Melya — Échelles/{ACRONYME}/` avec un sous-dossier
   `sources/`.
2. **Instruis les droits** (§3 du playbook) : qui détient l'échelle, sur quelle
   phrase de licence exacte on s'appuie, l'usage commercial est-il couvert.
   → livrable : le Doc « NOTE DROITS ». **Si un éditeur commercial apparaît
   (Pearson, Hogrefe, ECPA, MHS, PAR, WPS, Mind Garden, Guilford), tu t'arrêtes
   là** et tu passes à l'échelle suivante.
3. **Trouve 2 sources indépendantes** de la version française (§4), **télécharge
   les PDF** dans `sources/`, note pour chacune l'URL et la date de consultation.
   Pas de flyer, pas de blog, pas de site de tests en ligne.
4. **Remplis la fiche** dans un Doc, en dupliquant ton MODÈLE FICHE (copié depuis
   `_TEMPLATE.md`) : sections §1 à §10, numérotation inchangée, **§11 laissée
   vide**. Les items sont recopiés **en toutes lettres**, mot pour mot, sans rien
   reformuler.
5. **Relis-toi** avec la checklist §6, puis partage le dossier à Clément.

**Les deux réflexes qui comptent** : ne rien inventer — si ce n'est pas dans une
source, ça n'existe pas ; et tout ce dont tu doutes va en **§10** sous forme de
question fermée (« garder A ou B ? »), jamais tranché seul.

**Ton premier lot** : **PDSS** (courte, pour te faire la main), puis **ATQ**,
**FTND**, **EPDS**. En parallèle, l'instruction des droits des lignes 🔍 de
`SUIVI_ECHELLES.md`, en commençant par **ISI** et **PSQI**.

Le reste du document détaille chaque étape — l'annexe §9 est ta section de
référence.

---

## 0. Qui fait quoi

| Rôle | Personne | Périmètre | Support de travail |
| --- | --- | --- | --- |
| **Pilote / relecteur unique** | Clément | Choisit les échelles, relit **toutes** les fiches, vérifie les sources, arbitre les divergences, fait la recette staging, passe les statuts dans `SUIVI_ECHELLES.md` | repo |
| **Rédacteur hors repo** | James | Instruction des droits + fiche complète §1→§9 | Google Docs + dossier Drive (cf. §9) |
| **Rédacteur repo + implémentation** | Adrien | Fiche complète §1→§9 **puis** implémentation `packages/core` + scorer une fois la fiche relue | repo (`docs/scales/{id}/`) |
| **Validation clinique** | Renata (référente) | Tranche les points de §10 en session groupée | — |

**Règle de séparation** : le rédacteur ne valide jamais sa propre fiche. Un
rédacteur peut se tromper — c'est prévu. Ce qu'il ne doit **jamais** faire,
c'est masquer une incertitude : toute zone de doute se déclare (cf. §7), elle
ne se résout pas en silence.

**Adrien : ordre imposé.** La fiche est écrite et relue **avant** la moindre
ligne de code. Écrire le code d'abord, puis la fiche « pour documenter ce qui a
été fait », inverse la charge de la preuve et rend la relecture de Clément
inopérante.

---

## 1. Le pipeline

```
E0  Sélection          Clément   → échelle sortie de la file SUIVI_ECHELLES.md, assignée
E1  Instruction droits Rédacteur → Note de droits (§3)          → GO / STOP
E2  Dossier de sources Rédacteur → PDF archivés + §2 remplie    → GO / STOP
E3  Rédaction fiche    Rédacteur → §1 à §9 + §10 (questions)
E4  Relecture          Clément   → corrections, arbitrages, § validés
E5  Implémentation     Adrien    → packages/core + scorer (RECETTE_PLAYBOOK.md)
E6  Recette            Clément   → parcours patient complet → statut ✅
```

Un **GO/STOP** est bloquant : on ne passe pas à l'étape suivante sans réponse.
Une échelle bloquée en E1 pour cause de droits ne coûte que quelques heures ;
la même échelle découverte payante en E5 coûte une implémentation entière.

**Statuts dans `SUIVI_ECHELLES.md`** : le rédacteur passe la ligne en
`🚧 (E2 · James)` / `🚧 (E3 · Adrien)` dès qu'il commence, pour éviter que deux
personnes instruisent la même échelle. Clément passe en 🔵 puis ✅.

---

## 2. Les six règles d'or

1. **Ne rien inventer.** Aucune formulation, aucun seuil, aucun libellé de
   sévérité ne sort de la tête du rédacteur. S'il n'est pas dans une source,
   il n'existe pas → point STOP (§7).
2. **Tout en français.** Items, consignes, libellés de réponse, libellés de
   sévérité. L'anglais ne subsiste qu'en §1 (nom en langue originale) et §2
   (références académiques) — champs de traçabilité, non affichés au patient.
3. **Deux sources indépendantes minimum**, sauf autorité unique incontestable
   explicitement justifiée dans la fiche (Pfizer pour PHQ-9/GAD-7, OMS pour
   AUDIT, Cn2r pour PDEQ). « Indépendantes » = pas deux reprises du même PDF.
4. **Hiérarchie des versions françaises : France > Suisse > Belgique > Québec.**
   Beaucoup de bonnes traductions TCC sont québécoises (Dugas, Gosselin,
   Freeston…) — elles sont recevables, mais si une VF de France validée
   existe, elle prime. Le choix se justifie en §2 « Version française retenue ».
5. **Verbatim d'abord, déviation déclarée ensuite.** On part du texte exact du
   PDF source. Toute modification, même une virgule, se documente (cf. §5.3).
6. **Toute affirmation est traçable.** Un seuil, un item, une consigne = une
   URL + une date de consultation + un PDF archivé. Si Clément doit chercher
   lui-même d'où sort une phrase, la fiche n'est pas finie.

---

## 3. E1 — Instruire les droits

C'est l'étape la plus rentable et la moins technique : elle ne demande aucune
compétence clinique, et elle débloque à elle seule les 22 lignes 🔍 du tableau
de suivi.

### Où chercher, dans cet ordre

1. **La publication princeps** (l'article d'origine) : mentionne souvent
   « may be reproduced without permission » ou au contraire un éditeur.
2. **Le site de l'auteur ou de son laboratoire** — beaucoup d'auteurs
   diffusent leur instrument en libre accès avec une phrase de licence.
3. **Un éditeur de tests** : si l'échelle apparaît au catalogue de Pearson,
   Hogrefe, ECPA, MHS, PAR, WPS, Mind Garden, Guilford, Stoelting → **payante**,
   dossier clos.
4. **Les institutions** : OMS, APA, HAS, Cn2r, OFDT — une diffusion
   institutionnelle en PDF ouvert est un signal fort, mais pas une licence.

### L'arbre de décision

| Ce que tu trouves | Statut | Suite |
| --- | --- | --- |
| Éditeur commercial identifié | 💰 payante | 🚫 Écartée. On note l'éditeur dans `SUIVI_ECHELLES.md` et on cherche une alternative libre. |
| Mention explicite de libre reproduction / domaine public | ✅ libre | GO vers E2. Citer la phrase exacte + son URL. |
| Diffusion institutionnelle ouverte, sans phrase de licence | ⚠️ zone grise | GO vers E2 **mais** la fiche porte la réserve, et §3 « Décision Melya » reste `go sous réserve`. |
| « Free for research/clinical use » sans mention commerciale | ⚠️ zone grise | Idem — c'est le cas le plus fréquent. Melya étant payant, la question de l'usage commercial se pose systématiquement. |
| Rien de concluant après ~1 h | ⚠️ | STOP. On ne devine pas. Note de droits remise en l'état à Clément. |

⚠️ **La présence d'une échelle chez Mentaal ne prouve rien** : ils diffusent
MBI, YSQ et EDI-2, qui sont payantes. Leur catalogue n'est jamais un précédent
juridique.

### Livrable : la Note de droits

Dix lignes, qui alimenteront la §3 de la fiche :

```
Échelle :
Instrument original (auteurs, année, revue/éditeur) :
Version FR (traducteurs, année, publication de validation) :
Détenteur des droits apparent :
Phrase de licence trouvée (verbatim) :
  Source de cette phrase (URL + date de consultation) :
Éditeur commercial identifié ? oui / non — lequel :
Usage commercial explicitement couvert ? oui / non / non mentionné :
Statut proposé : libre / mention obligatoire / zone grise / payante
Démarche externe nécessaire ? (ex. écrire à l'auteur) — laquelle :
```

**Angle James** : écrire à un auteur ou à un éditeur pour clarifier une licence,
c'est de la comms — c'est ton terrain. Toute démarche engagée se journalise
dans la fiche §3 « Suivi des démarches externes » (contact, date, réponse).
Un email sortant au nom de Melya passe par Clément avant envoi.

---

## 4. E2 — Constituer le dossier de sources

### Ce qui compte comme source

**Source primaire** — celle dont on copie les items :
- publication de validation française (l'article qui présente la VF),
- ou PDF officiel de l'auteur / de l'organisme dépositaire,
- ou fiche d'une institution française de référence (Cn2r, OFDT, HAS…).

**Source de cross-check** — indépendante, sert à vérifier item par item :
- une deuxième publication (validation dans un autre échantillon, méta-analyse),
- un manuel TCC de référence,
- une fiche universitaire ou hospitalière francophone.

### Où chercher

Pistes fréquemment productives (à adapter, ce n'est pas un catalogue fermé) :
Google Scholar, HAL, PubMed / PubMed Central, Érudit et `theses.fr` pour le
francophone, les sites de laboratoires universitaires québécois (l'UQO a fourni
l'IUS et le PSWQ), les centres de référence français (Cn2r pour le trauma,
OFDT et RESPADD pour les addictions), les sites officiels d'instruments
(auditscreen.org), les annexes de thèses — souvent la seule source d'une VF
complète.

### Signaux d'alarme — sources à écarter

- **Flyers et plaquettes de sensibilisation** : recomposent l'échelle et
  introduisent des erreurs. Cas réel : le flyer Addict'AIDE de l'AUDIT saute
  une modalité de l'item 2 et incohérence les libellés de fréquence — écarté
  (cf. `audit/audit.md` §2).
- **Sites de « tests en ligne » grand public**, blogs, PDF sans en-tête ni
  auteur, versions recompilées en Word.
- **Le catalogue d'un concurrent** comme source d'items.
- Un PDF qui ne permet pas de dire **qui** l'a produit et **quand**.

### Archivage — obligatoire

Chaque source citée est **téléchargée** et conservée :
- Adrien : `docs/scales/{scale-id}/{ACRONYME}_{origine}.pdf`, chemin reporté
  dans le champ « Fichier de portage » de la §2 ;
- James : dossier Drive de l'échelle, lien reporté dans le même champ.

Un lien web meurt ; un PDF archivé permet à Clément de vérifier dans deux ans
pourquoi un libellé est celui-là. C'est non négociable.

**Sortie de E2** : §2 de la fiche remplie (sources, divergences entre sources,
version FR retenue) + PDF archivés. GO/STOP.

---

## 5. E3 — Rédiger la fiche

Ordre de remplissage recommandé : §2 (déjà faite) → §3 (Note de droits) →
§4 structure → §5 items → §6 scoring → §7 seuils → §1 métadonnées →
§9 tests → §10 questions.

### 5.1 Les items (§5) — le cœur

**Les items sont listés intégralement dans la fiche, en toutes lettres.**
Pas de renvoi au PDF, pas de « items portés verbatim depuis la source » : si
les items ne sont pas dans la fiche, Clément ne peut pas les relire sans
rouvrir le PDF et le code, et la relecture s'effondre. *(La fiche PDEQ actuelle
a ce défaut — ne pas la prendre comme modèle sur ce point.)*

Pour chaque item : le texte exact, dans l'ordre de la source, avec sa
catégorie/son sens si l'échelle en a (item inversé, sous-échelle, bloc).

### 5.2 Seuils (§7) et libellés de sévérité

Chaque bande de score pointe vers une source explicite. Trois pièges :

- **Les seuils voyagent mal d'une langue à l'autre.** Un cutoff anglophone
  n'est pas automatiquement valide sur la VF. Si la publication française en
  propose d'autres, ce sont les siens qui priment — et on le dit en §7.
- **Certaines échelles n'ont pas de seuil établi.** C'est un résultat, pas un
  échec : on l'écrit (cf. IUS/EII, score brut sans bandes). On n'invente jamais
  un découpage « raisonnable ».
- **Les libellés de sévérité sont du texte clinique affiché au praticien.**
  On reprend ceux de la source française. S'il faut les reformuler → §10.

### 5.3 Portage PDF → app : les quatre déviations autorisées

Une échelle validée sur papier n'est pas mécaniquement transposable à un écran.
Quatre types d'écart sont acceptables. **Tout autre écart est un point STOP.**

| # | Type | Exemple réel | Comment le traiter |
| --- | --- | --- | --- |
| 1 | **Adaptation du support** | « en cochant la case » → « en choisissant la réponse » (PDEQ) | Autorisé, à lister en §2 « Divergences ». |
| 2 | **Coquille manifeste de la source** | PDEQ item 5 « je l'observait » → « l'observais » | Autorisé **si** la correction est indiscutable (accord, conjugaison, typo). À lister item par item en §2. |
| 3 | **Déplacement d'une consigne répétée** | AUDIT : préfixe « Dans les douze derniers mois » retiré des items 4-8 et porté en en-tête persistant | ⚠️ **Ne pas décider seul.** Documenter les deux options et remonter en §10. C'est un vrai arbitrage. |
| 4 | **Ajout d'une précision nécessaire** | AUDIT : définition du « verre standard » (~10 g) ajoutée en consigne | Autorisé mais **signalé comme ajout produit Melya**, jamais présenté comme du texte source. Va en §10. |

Reformuler un item pour qu'il « sonne mieux » n'est aucun de ces quatre cas.

### 5.4 La comparaison Mentaal (obligatoire sur chaque fiche)

Mentaal étant le concurrent direct, chaque fiche compare, quand l'échelle est
à leur catalogue : version FR utilisée, formulation des items, seuils, ce
qu'ils affichent au patient. La méthode qui a marché sur l'AUDIT : dérouler
leur parcours patient en entier et comparer **à trois** — nous / eux / la
source primaire.

**La règle de lecture, apprise sur l'AUDIT** : quand un écart apparaît, la
question n'est pas « qui a raison entre eux et nous » mais « **qui s'écarte de
la source** ». Sur l'AUDIT, les « fautes » qui semblaient être les leurs
étaient en réalité dans le PDF de l'OMS — et c'est notre version qui déviait.
Sans le retour à la source, on inversait la conclusion.

**Angle James** : c'est de l'analyse concurrentielle appliquée. En sortent
directement des arguments produit sourcés (différenciation FR-France, alertes
cliniques, fidélité à l'instrument validé).

### 5.5 Les cas de test (§9)

Ce tableau devient la base de vérification du scoring. Il couvre :
min et max théoriques ; **chaque borne de seuil testée des deux côtés**
(score 5 → bande basse, score 6 → bande haute : c'est ce qui attrape les
erreurs de ±1) ; un cas réaliste ; les spécificités de l'échelle (inversions,
alerte, sous-scores) ; les entrées invalides, qui doivent produire une erreur
explicite et **jamais** un score à 0 silencieux.

Écrire les scores à la main, sans code. Si un calcul est laborieux à la main,
c'est souvent le signe que §6 est ambigu — le préciser.

### 5.6 Ce que le rédacteur ne remplit pas

§11 (contrat technique) est **le seul § réservé à Adrien**. James le laisse
vide : les `formType`, clés de réponse et chemins de scorer se décident au
moment de l'implémentation.

---

## 6. Auto-contrôle avant remise

À passer soi-même, avant de rendre à Clément. Une fiche qui échoue à un point
lui est renvoyée telle quelle — ce n'est pas un jugement, c'est ce qui rend le
dispositif tenable à trois.

- [ ] Aucun `[À REMPLIR]` restant ; les `[À SOURCER]` restants sont listés en §10.
- [ ] Tous les items sont écrits en toutes lettres en §5, dans l'ordre de la source.
- [ ] Chaque source de §2 a : type, référence complète, URL, **date de consultation**, fichier archivé.
- [ ] Les seuils de §7 pointent vers une source nommée, avec URL vérifiable.
- [ ] Zéro anglais dans les champs vus par le patient ou le praticien.
- [ ] Chaque écart au PDF source est listé en §2 et rattaché à l'un des 4 types de §5.3.
- [ ] La §3 permet de répondre à : qui détient les droits, sur quelle phrase on s'appuie, et l'usage commercial est-il couvert.
- [ ] §9 : chaque borne de seuil est testée des deux côtés.
- [ ] §10 est une liste de **questions fermées** (« garder A ou B ? »), pas de sujets de réflexion.
- [ ] §12 : ligne d'historique datée, à ton nom.

---

## 7. Points STOP — remonter à Clément sans trancher

Ne jamais choisir seul sur :

1. **Une formulation absente des sources** mais nécessaire à l'app (phrase
   d'intro, écran de transition, libellé court).
2. **Un seuil non chiffré dans la source**, ou plusieurs jeux de seuils
   concurrents.
3. **Deux VF en concurrence** dont la hiérarchie France > CH > BE > QC ne
   suffit pas à départager.
4. **Une divergence d'items entre les deux sources** (un item absent, une
   modalité différente, une numérotation qui ne tombe pas juste).
5. **Un statut de droits ambigu**, ou toute échelle qui touche un éditeur.
6. **Une substitution lexicale** (type « rituels » → « compulsions » sur la
   Y-BOCS) : lister les occurrences, faire valider une à une.
7. **Un item à contenu sensible** (idéation suicidaire, automutilation,
   violences) : il peut demander une alerte clinique — décision de Clément
   et de la référente, jamais du rédacteur.
8. **Toute échelle hétéro-évaluée** (remplie par le clinicien, type MADRS) :
   hors du flux d'auto-passation actuel, ne pas rédiger sans arbitrage.

Format d'un STOP : la question, les options envisagées, ce que dit chaque
source, et la recommandation du rédacteur. Un STOP formulé en « je ne sais
pas » est incomplet.

---

## 8. Grille de relecture (Clément)

Ordre conçu pour tomber tôt sur les problèmes coûteux.

1. **Droits (§3)** — 2 min. Si le statut ne tient pas, tout le reste est sans
   objet. Ouvrir la source de la phrase de licence.
2. **Sources (§2)** — ouvrir chaque PDF archivé, vérifier qu'il correspond à
   la référence annoncée et qu'il n'est pas un flyer recomposé.
3. **Items (§5) contre le PDF primaire** — la passe longue. Lire en parallèle.
   Chaque écart doit déjà être déclaré en §2 : un écart non déclaré est le
   défaut le plus grave, il signale que le rédacteur a édité sans le dire.
4. **Seuils (§7)** — vérifier le chiffre dans la source, pas seulement la
   présence d'une référence.
5. **Déviations (§5.3)** — les 4 types sont-ils respectés, les arbitrages du
   type 3 sont-ils bien remontés en §10 plutôt que tranchés ?
6. **§9** — les bornes sont-elles bien testées des deux côtés ?
7. **§10** — questions fermées, prêtes pour la session Renata.

Verdict : `validée E4` (→ E5 implémentation) ou renvoi au rédacteur avec les
points. Les corrections que tu fais toi-même se journalisent en §12 pour que
le rédacteur apprenne — c'est ce qui fait baisser ta charge de relecture au
fil des fiches.

---

## 9. Annexe A — Mode Google Docs (James)

Tu ne touches pas au repo. Ton unité de travail est **un dossier Drive par
échelle**.

```
Melya — Échelles/
└── ASRS/
    ├── FICHE ASRS                (Google Doc — la fiche §1→§10)
    ├── NOTE DROITS ASRS          (Google Doc — livrable de E1)
    └── sources/                  (les PDF téléchargés, nommés ACRONYME_origine.pdf)
```

**Mise en route (une fois)** : ouvre `_TEMPLATE.md` dans le repo via GitHub
(lecture seule dans le navigateur, aucun outil à installer), copie son contenu
dans un Google Doc « MODÈLE FICHE », qui te servira de base à dupliquer. Prends
`audit/audit.md` comme exemple de fiche dense et bien sourcée, et
`pswq/pswq.md` comme exemple plus court — en gardant en tête que la §5 de
`pdeq.md` est trop maigre, c'est le contre-exemple.

**Conventions dans le Doc**
- Garde la numérotation des sections `## 1.` à `## 12.` **à l'identique**.
  C'est ce qui permet la reprise en repo sans travail de remise en forme.
- Les tableaux Google Docs se convertissent proprement — utilise-les.
- Surligne en **jaune** tout point STOP, en **rouge** ce qui reste non sourcé.
- N'utilise pas les commentaires Google Docs pour les questions destinées à
  Clément : elles vont dans la **§10**, qui est le canal officiel.

**Remise** : tu partages le dossier et tu préviens Clément. La conversion en
`.md` et le dépôt dans `docs/scales/{id}/` sont faits côté repo (Clément ou
Adrien) — le Doc reste ta version de travail jusqu'à validation E4, après quoi
**le `.md` du repo devient la source de vérité** et le Doc n'est plus modifié.

**Ton premier lot** (les 🟢 A pures, sans implication technique, du plus simple
au plus riche) : **PDSS** (7 items, somme simple — la fiche d'entraînement),
puis **ATQ** (30 items, somme simple), **FTND**, puis **EPDS** (10 items, avec
un item d'alerte — tu documentes, Clément et Renata tranchent). En parallèle,
et c'est là que tu débloques le plus : **l'instruction des droits des lignes 🔍**
de `SUIVI_ECHELLES.md`, à commencer par celles qui ouvrent un motif absent du
catalogue (**ISI** et **PSQI**, le trou « sommeil » de Mentaal).

---

## 10. Annexe B — Mode repo (Adrien)

Même playbook, avec trois différences.

- **Emplacement** : `docs/scales/{scale-id}/{scale-id}.md`, PDF sources dans le
  même dossier, une branche par échelle, une PR par échelle.
- **Découpage des PR** : la PR « fiche » (E3) est **séparée** de la PR
  « implémentation » (E5). Clément relit la première avant que la seconde
  existe. C'est ce qui empêche le code de devenir la source de vérité de fait.
- **§11 contrat technique** : tu es le seul à la remplir, et tu la remplis dès
  E3 — anticiper le `formType`, les briques manquantes et les évolutions de
  type (le cas DASS-21 : `Subscore` ne porte pas de `ranges`) fait partie de
  la recherche, pas de l'implémentation.

**Ton lot** : les échelles à net-new technique, pour que la fiche et
l'anticipation de la brique soient faites par la même personne — **ASRS**
(`criteriaCheck` façon PCL-5), **DES** (widget de réponse 0–100 à créer),
**DASS-21** (sévérité par sous-échelle), **DERS**, **TAS-20**.

**Piste outillage, hors fiches** : il n'existe aujourd'hui aucun test
automatisé sur les 15 scorers de `apps/api/src/scoring/scorers/`, alors que
chaque fiche porte déjà en §9 un jeu de cas de test écrit à la main. Câbler la
§9 en tests exécutés en CI transformerait une vérification manuelle répétée de
Clément en garde-fou permanent, et attraperait toute régression de seuil. À
arbitrer avec lui — ça ne passe pas avant les fiches.

---

## 11. Historique du playbook

| Date | Auteur | Modification |
| --- | --- | --- |
| 28/08/2026 | Clément (avec Claude) | Création. Formalise le passage d'un rédacteur unique (Clément) à trois rédacteurs (Clément relecteur, James hors repo, Adrien en repo) : pipeline E0→E6, règles d'or, instruction des droits, dossier de sources, 4 déviations autorisées, points STOP, grille de relecture, lots initiaux. |
