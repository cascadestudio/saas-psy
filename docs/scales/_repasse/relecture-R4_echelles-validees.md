# R4 — Contrôle de bon sens (16 échelles)

## phq-9
- **[À REVOIR]** §10 « Aucun écart » alors que la relance fonctionnelle de l'app dit « Si vous avez *indiqué* au moins un des problèmes » ; la source dit « Si vous avez *coché* ». La consigne « (Veuillez cocher (✔) votre réponse) » est aussi omise. Ce sont des adaptations papier→écran licites mais non consignées en §10 — consigner (confiance haute).
- **[À REVOIR]** Libellés de bande « Dépression minimale/légère/modérée/modérément sévère/sévère » : absents du PDF Pfizer (qui ne donne aucune bande) ; bornes 5/10/15/20 conformes à Kroenke 2001. Déjà en « questions ouvertes » §10 ; sourcer ou assumer comme libellé Melya (confiance moyenne).
- OK : 9 items, 4 modalités 0-3, alerte item 9 ≥ 1, scorer, copyright : conformes au PDF.

## gad-7
- **[SUGGESTION mineure]** Coquille dans `longDescription` : « practicien » → « praticien ». Hors source patient.
- **[À REVOIR]** Libellés « Anxiété minimale/légère/modérée/sévère » et chiffres sensibilité 89 % / spé 82 % absents des sources archivées (le PDF Pfizer n'a ni bandes ni seuil). Bornes 5/10/15 = Spitzer 2006, correctes. Déjà noté en question ouverte.
- OK : 7 items mot pour mot, modalités, scorer, mention Pfizer.

## qips (PSWQ, dossier pswq)
- **[ERREUR]** Bandes 16-39 / 40-54 / 55-80 et libellé « Inquiétude élevée (évocatrice d'un TAG) » : aucune source (Gosselin 2001 ne donne aucun seuil ; §10 question ouverte 1 admet « construction Melya »). Contraire à la règle « pas de seuil si la source n'en donne pas ». Recommandé : option (a) score brut sans bandes (moyennes de réf. 44,5 non clinique / TAG ≈ 62 en repère) — confiance haute.
- **[ERREUR]** `persistentInstructions` « Jusqu'à quel point cet énoncé vous correspond-il ? » : ajout de texte absent de l'annexe 1 (§10 question 2 l'admet). Supprimer — confiance haute.
- OK : 16 items mot pour mot (sauf item 16 « terminés » vs « complétés », consigné), ancres 1-5, items inversés 1/3/8/10/11 et formule 6−v corrects, mention © Gosselin conforme à l'annexe 1. Consigne sans la parenthèse « écrivez le numéro » consignée.

## traumatismes-pcl5 (dossier pcl-5)
- **[À REVOIR]** §10 affirme « items et consigne repris mot pour mot », or la consigne de l'app n'est pas la source. App : « Lisez chacun des énoncés en gardant à l'esprit le pire évènement que vous avez vécu ; celui qui vous perturbe le plus actuellement. Puis indiquez à quel point vous avez été perturbé(e) par ce problème au cours du dernier mois. » Source (p.2) : « A présent, lisez chacun des énoncés de la page suivante en gardant à l'esprit ce pire événement, puis encerclez le chiffre qui indique à quel point vous avez été perturbé(e) par ce problème au cours du dernier mois. » L'app fusionne deux phrases de la p.1 et de la p.2 (« ce pire événement » devenu « le pire évènement que vous avez vécu ; celui qui… ») et omet la présentation de l'événement (critère A). Recommandé : reprendre la phrase p.2 avec adaptations (« de la page suivante » -> supprimé, « encerclez » -> « choisissez »), consigner en §10 ; sinon consigner la recomposition comme arbitrage — confiance moyenne.
- **[À REVOIR]** Libellés d'interprétation « Pas de TSPT / Présence de TSPT au seuil de dépistage » : absents de la source (qui dit « permet le dépistage du TSPT »), déjà en question ouverte. Formulation « Présence de TSPT » est plus affirmative que la source (dépistage ≠ diagnostic). Suggestion « Score sous / au-dessus du seuil de dépistage (32) » — confiance moyenne.
- OK : 20 items mot pour mot, modalités 0-4, seuil 32 (≥ 32), clusters B 1-5 / C 6-7 / D 8-14 / E 15-20 et règle 1/1/2/2 avec seuil item ≥ 2 corrects.

## index-symptomes-ybocs (dossier y-bocs) — Mollard 1989 relu par OCR (scan), Cottraux en texte
- **[ERREUR]** Item 1 (durée des obsessions), niveau 2 : l'app dit « ou survenue *très* fréquente (plus de 8 fois par jour, mais la majorité de ma journée se passe sans) ». Mollard p.337 et Cottraux : « survenue fréquente » (« très fréquente » est le niveau 3). Doublon du niveau 3, perte de l'échelonnement. Corriger en « survenue fréquente » — confiance haute.
- **[ERREUR]** Items 6, 7, 8, 10 : Mollard dit « rituels » (« Combien de temps passez-vous à faire des *rituels* ? », « Gêne liée aux rituels », « faire votre (vos) rituel(s) », « Degré de contrôle sur les rituels » ; options « Cède à tous les rituels », « obligation à accomplir les rituels »). L'app dit « compulsions » partout (titres, prompts, options) alors que le §10 annonce « incohérence rituels/compulsions conservée telle quelle ». Soit rétablir « rituels » (rappel : seuls les items 9 et 5 emploient « compulsions »), soit consigner l'écart en §10 — confiance moyenne.
- **[À REVOIR]** Seuils 0-7 / 8-15 / 16-23 / 24-31 / 32-40 et libellés « TOC léger… extrême » : §7 les attribue à « Mollard 1989 » mais ni Mollard (OCR) ni Cottraux ni Baer 2022 ne les contiennent ; seul Cottraux donne « seuil de 16 » pour l'inclusion en essai. Les bornes sont la grille Goodman classique (correcte), mais non sourcée dans les fichiers archivés. Reformuler la source en §7 (Goodman 1989b / Cervin 2022) ou limiter l'affichage — confiance moyenne.
- **[À REVOIR]** Consigne : la phrase « Cette échelle évalue la sévérité… au cours de la semaine écoulée. Vous trouverez 10 questions… » est un cadrage rédigé par Melya (le §10 ne la liste pas dans « Écarts »). Les deux définitions sont bien reprises de Cottraux/Mollard (« Les OBSESSIONS sont… »), mais la définition des compulsions est répétée à l'identique dans `sectionIntros`. Consigner le cadrage comme ajout assumé, ou le réduire à la source (« pendant la semaine écoulée ») — confiance moyenne.
- **[À REVOIR]** Intitulés courts d'items (« DURÉE DES PENSÉES OBSÉDANTES »…) : présents dans la source (titres numérotés), donc OK sur le fond ; la question ouverte 3 peut être close pour les items 1-5 (en revanche « DURÉE DES COMPULSIONS » etc. découlent du point ci-dessus).
- **[OK]** 10 items cotés 0-4, sous-scores 1-5 / 6-10, scorer, items 4 et 9 non inversés (cohérent avec la source). Libellés « Nulle/Légère/Moyenne/Importante » retirés en début d'option : adaptation 1re personne déclarée.

## echelle-d-anxiete-sociale-de-liebowitz (dossier lsas)
- **[À REVOIR]** Consigne : traduction Melya de Heimberg & Becker 2002 (aucune source française, aucun fichier archivé ne la contient) ; elle est consignée en §10 et reconnue question ouverte. Texte sans source primaire archivée -> à traiter comme ajout tant que non validé. Option : consigne minimale tirée de Boulenger/Liebowitz 2003 (« demander d'imaginer la réaction si confronté ») ou assumer explicitement — confiance basse.
- **[À REVOIR]** §10 affirme la grille 0-29/30-49/50-64/65-79/80-94/≥95 « validée empiriquement (Mennin 2002, Rytwinski 2009) » ; les sources archivées (Liebowitz 2003) ne citent que les points de coupe 30 et 60 ; les autres bornes (50, 65, 80, 95) ne sont pas validées par ces études. Boulenger (archivé) dit « en l'absence de valeur-seuil démontrée… ne saurait être utilisée dans un but diagnostique ». Ajuster la formulation de la justification, et le libellé « Pas d'anxiété sociale » (< 30) est plus affirmatif que la source — confiance moyenne.
- **[À REVOIR]** Sous-échelles 12 P / 12 S (item 21 en S d'après Yao 1999 / Retz) : les deux sources archivées (Boulenger, Liebowitz 2003) donnent 13 P + 11 S. Le choix est consigné et sourcé via Retz (non archivé) ; vérifier que la citation Retz est bien dans le dossier, sinon la cataloguer. Le scorer est cohérent avec le choix (indices 21 -> S) — confiance moyenne.
- **[OK]** 24 items et ordre, modalités anxiété 0-3 (Aucune/Légère/Moyenne/Sévère) et évitement 0-3 (Jamais/Occasionnel/Fréquent/Habituel) concordants avec Boulenger/Liebowitz ; total 0-144 ; sous-scores 4+4 ; bornes sans chevauchement.

## spin (dossier spin)
- **[ERREUR]** Aucune source archivée dans `docs/scales/spin/` (seul spin.md) : ni la version anglaise Connor 2000 / Davidson, ni aucune version française. Impossible de vérifier le texte sur pièce. Archiver le formulaire Davidson (même s'il n'est pas redistribuable) — confiance haute.
- **[ERREUR]** Tout le texte patient (17 items, consigne, 5 modalités) est une traduction Melya (§10 le reconnaît : « non conforme à la règle actuelle »). Contrôle de bon sens contre l'anglais Connor 2000 (de mémoire) : items, ordre, consigne et ancres sont fidèles, aucun contresens. Mais ajout non sourcé = interdit par la règle. Options : traduction française publiée, sinon (c) assumer « traduction non validée » signalée au praticien — confiance basse.
- **[À REVOIR]** Incohérence interne : `lsas.md` §13 cite une « version française disponible (Radomsky et al. 2006) » du SPIN, alors que `spin.md` §10 dit « aucune version française publiée identifiée ». Vérifier Radomsky 2006 (Canadian French, J. Anxiety Disord.) avant de conclure — confiance moyenne.
- **[À REVOIR]** `copyrightAttribution` : l'app affiche « Toute reproduction est soumise à l'autorisation… » alors que la décision est « go » sans autorisation obtenue ; risque de droits (restriction explicite « may not be reproduced or transmitted »). Décision déjà prise par Adrien (15/07/2026), à régulariser.
- **[OK]** Bandes 0-20 / 21-30 / 31-40 / 41-50 / 51-68 conformes à Connor 2000 et sans chevauchement ; aucun item inversé ; scorer.

## rses (dossier rses)
- **[À REVOIR]** §10 consigne l'écart « cliquant sur le chiffre approprié », mais l'app dit « en *sélectionnant* la réponse appropriée » (et la source « en encerclant le chiffre approprié »). Écart licite, mais la fiche et l'app divergent : aligner le §10 sur le texte réel — confiance haute.
- **[OK]** 10 items mot pour mot (V&V 1990), 4 ancres 1-4, items inversés 3/5/8/9/10 conformes à la clé de codification, formule 5−v, pas de seuil (bande unique informative), mention © conforme.

## audit (dossier audit)
- **[À REVOIR]** Bande unique 6-12 « Évocateur d'un mésusage » appliquée aux deux sexes : un homme à 6 est étiqueté mésusage alors que l'OFDT/SFA fixe ≥ 7 chez l'homme (faux positif possible). Choix consigné et compensé par `thresholdLabel` « 6 F / 7 H » et la note ; acceptable, mais à valider humainement (alternative : demander le sexe/la référence côté praticien) — confiance moyenne.
- **[À REVOIR]** « Un verre standard = 10 g d'alcool pur. » est un ajout absent de l'OMS FR et de l'OFDT, repris de Michaud & Lécallier 2003 (vérifié dans le PDF archivé : « Un verre standard = 10 g d'alcool pur. »). C'est une 4e catégorie d'écart (ajout sourcé) non prévue par la règle projet à trois types ; consignée en §10, sourcée, recommandation OMS — acceptable si l'équipe l'admet explicitement — confiance moyenne.
- **[OK]** Items 1-10, libellés, valeurs (items 9-10 : 0/2/4), consigne (= parenthèse OMS sans parenthèses), corrections item 10 / 5 / 6 / réponses 9-10 (OFDT vérifié), seuils 6/7 et > 12 conformes à l'OFDT, bornes 0-5 / 6-12 / 13-40 sans chevauchement.

## pdeq (dossier pdeq)
- **[OK]** Contrôle croisé avec la fiche Cn2r : 10 items et ancres conformes (corrections item 5 / 9 / 10 consignées), consigne conforme (cocher -> choisir / répondre, consigné), seuil ≥ 15 conforme à « Étalonnage », bornes 10-14 / 15-50 sans trou. Rien à signaler.
- **[SUGGESTION mineure]** Libellé « Dissociation péritraumatique non significative » (bande basse) : négation du terme source, consigné. Aucune action.

## eii (dossier ius)
- **[ERREUR]** `persistentInstructions` « Jusqu'à quel point cet énoncé correspond-il à vous ? » : texte absent du formulaire UQO (ajout interdit, admis en §10 question ouverte 1). Supprimer — confiance haute.
- **[À REVOIR]** Libellé du facteur 1 : l'app affiche « Implications négatives sur la perception de soi et les comportements » (raccourci Melya) au lieu de « l'incertitude a des implications négatives sur la perception de soi et les comportements » (UQO). Même chose pour le facteur 2 dans le scorer : « L'incertitude est injuste et gâche tout » est correct. Reprendre le libellé UQO (déjà §10 question 2) — confiance haute.
- **[À REVOIR]** Item 25 rattaché au facteur 1 : la liste UQO du facteur 1 s'arrête à l'item 24 (14 items) ; l'item 25 n'est dans aucune liste du PDF. Rattachement reconstitué (consigné, 15 + 12 = 27) ; le scorer le présente comme « source UQO » (commentaire du code) ce qui est inexact — corriger le commentaire — confiance moyenne.
- **[OK]** 27 items mot pour mot (québécismes conservés), 5 ancres, total 27-135, pas de seuil (conforme à la source), sauf les points ci-dessus.

## cudit-r (dossier cudit-r)
- **[OK]** 8 items et 5/3 modalités conformes au flyer RESPADD (abréviations développées, « défoncé(e) », consignés), valeurs 0-4 et 0/2/4 (item 8), bandes 0-7 / 8-10 / 11-32 conformes au RESPADD (« De 8 à 10 » / « Au-delà de 10 ») et sans chevauchement, libellé « trouble important de l'usage de cannabis » = texte RESPADD.
- **[SUGGESTION mineure]** Les ajouts de consigne (phrase « Ce questionnaire s'adresse aux personnes ayant consommé… » à la place de la question-porte) sont consignés et validés par Clément ; la `longDescription` répète cette phrase en dernière ligne, redondante côté praticien. Aucune action requise.

## ftnd (dossier ftnd)
- **[OK]** Rien à signaler : 6 items, options et valeurs dans l'ordre du PDF HAS, bornes 0-2 / 3-4 / 5-6 / 7-10 et libellés = « Interprétation selon les auteurs » HAS, mention © HAS.

## pdss (dossier pdss)
- **[OK]** Texte du formulaire MSSS 2019 comparé à la consigne, aux 7 items et aux 35 réponses : mot pour mot (hors adaptations « cochant -> choisissant », liste à puces, gras, cotation retirée, coquille « responsabilités à la maison » corrigée, tous consignés). Seuil ≥ 9 conforme au résumé de Roberge 2022 (« optimal threshold for probable diagnosis was 9 »), bandes 0-8 / 9-28 sans trou.
- **[SUGGESTION mineure]** §10 : le libellé de bande basse « En dessous du seuil de dépistage » est une formulation Melya assumée (question ouverte 1) ; option plus fidèle à la source : « Trouble panique non probable » (négation, comme PDEQ) — confiance moyenne. La sensibilité/spécificité 78,8 % / 70,4 % citée n'apparaît pas dans le résumé de l'article archivé (peut figurer dans le corps du texte, non vérifié).

## hsps (dossier hsps)
- **[À REVOIR]** §10 ne liste que le point final de l'item 13 ; l'item 20 (« …les subtiles œuvres d'art. ») perd aussi son point final dans l'app. Écart typographique licite, à consigner (item 13 et 20) — confiance haute.
- **[À REVOIR]** Le PDF archivé est une feuille du site tiers « psypersensible.com » qui cite le livre en note ; ni le livre ni la 2e édition ne sont archivés. Le §3/§10 présentent la traduction des Éditions de l'Homme comme source primaire : indiquer que le texte est vérifié sur une reproduction web (la fidélité au livre n'est pas prouvée) — confiance moyenne.
- **[SUGGESTION]** Acronyme « HSPS » (= Highly Sensitive Person Scale, 27 items Likert, Aron & Aron 1997) appliqué à un auto-test de 23 items oui/non du livre : source de confusion pour les psys (la `longDescription` le précise déjà). Envisager un acronyme/étiquette distinct — confiance moyenne.
- **[OK]** 23 items, consigne, notation (≥ 12 OUI) et phrase « aucun test psychologique n'est d'une exactitude absolue… » conformes à la source ; bande basse « peu probable » : formulation non source, déjà en question ouverte 3 ; bornes 0-11 / 12-23 correctes.

## qia (dossier waq-qia)
- **[ERREUR]** Consigne d'introduction : « Ce questionnaire porte sur vos inquiétudes et votre anxiété au cours des six derniers mois. Vous listerez d'abord les sujets… » est une rédaction Melya ; la source ne dit que « Pour les numéros suivants, encerclez le chiffre correspondant (0 à 8) » (la période de six mois n'apparaît que dans les items 3 et 5). Ajout interdit, admis en §10 (« Formulation Melya ⚠️ ») et question ouverte 1. Recommandé : ne garder que la phrase source adaptée (« choisissez le chiffre correspondant (0 à 8) ») — confiance haute.
- **[ERREUR]** `openingTextItem.helperText` « Listez jusqu'à six sujets (par exemple : santé, travail, famille, finances…). » : texte et exemples absents de la source (a-f seulement) et **non consignés en §10** ; les exemples peuvent orienter la réponse. Supprimer (ou garder « jusqu'à six » si on veut refléter les champs a-f) — confiance haute.
- **[À REVOIR]** Sous-consigne des sensations : app « …Cotez chaque sensation de 0 à 8. » vs source « …Cotez chaque sensation en encerclant un chiffre (0 à 8). » : adaptation papier->écran licite, mais §10 affirme « mot pour mot » — consigner — confiance haute.
- **[À REVOIR]** Cotation par critères : le PDF distingue aussi trois catégories (critère cognitif ; critère somatique ; aucun critère) en plus du TAG complet ; l'app n'affiche que le contrôle global TAG (4 lignes). Pas d'erreur, mais la formulation des lignes (question ouverte 2) reste à valider ; la ligne « interférence » (item 6) fait partie des critères TAG complets seulement (conforme) — confiance moyenne.
- **[OK]** 10 items cotés 0-8 + item 1 non coté (texte libre), ancres 0/4/8 conformes (« 1 jour sur 2 », « Très sévèrement »…), total 0-80, seuil ≥ 4 (items 2/3/4/6, ≥ 3 symptômes sur 6), pas de bande de sévérité (conforme à la fiche de cotation).

## Tableau récapitulatif

| Échelle | Erreurs | À revoir | Suggestions |
| --- | --- | --- | --- |
| phq-9 | 0 | 2 | 0 |
| gad-7 | 0 | 1 | 1 |
| qips (PSWQ) | 2 | 0 | 0 |
| traumatismes-pcl5 | 0 | 2 | 0 |
| index-symptomes-ybocs | 2 | 3 | 0 |
| echelle-d-anxiete-sociale-de-liebowitz | 0 | 3 | 0 |
| spin | 2 | 2 | 0 |
| rses | 0 | 1 | 0 |
| audit | 0 | 2 | 0 |
| pdeq | 0 | 0 | 1 |
| eii | 1 | 2 | 0 |
| cudit-r | 0 | 0 | 1 |
| ftnd | 0 | 0 | 0 |
| pdss | 0 | 0 | 1 |
| hsps | 0 | 2 | 1 |
| qia | 2 | 2 | 0 |
