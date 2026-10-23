# Fiches échelles publiques — points à valider

Généré le 23/10/2026, après la mise en ligne des 38 fiches pratiques
(`apps/web/content/echelles/`, une fiche par échelle, rendues par
`components/scale-guide/ScaleGuide.tsx` sur `/echelles/<slug>`).

Chaque fiche part de la spec `docs/scales/<échelle>.md` et des données de
`@melya/core` (cotation, seuils, mention copyright : jamais ressaisis). Les
références citées ont été vérifiées sur PubMed ou CrossRef, sauf mention
contraire ci-dessous.

Les points sont triés par priorité. Coche au fur et à mesure.

---

## 1. Droits : à trancher avant d'ouvrir plus largement

Les fiches sont publiques et indexées : elles exposent désormais le catalogue
au-delà du cercle de bêta-testeurs.

- [ ] **SPIN** — la transmission au patient nécessite une autorisation écrite
  de J. R. T. Davidson (`mail@cd-risc.com`, spec §3). La fiche publique rend
  l'échelle visible : régulariser, ou retirer le SPIN du catalogue.
- [ ] **HSPS** — la traduction française vient d'un livre des Éditions de
  l'Homme (risque assumé pendant la bêta, spec §3).
- [ ] **Y-BOCS** — numérisation soumise à licence (OCD Scales, LLC, MEL-351).
- [ ] **PDSS** — permission de K. Shear limitée aux cliniciens et à la
  recherche ; un SaaS payant n'est pas couvert.
- [ ] **AUDIT** — l'OMS exclut l'usage « in conjunction with commercial
  purposes » : confirmer que Melya est couvert.
- [ ] **PDEQ** (© 1997 Marmar), **PSI-II, QAP, QEC** (laboratoire Dugas),
  **CST**, **QPA**, **EDI** : pas de licence explicite (✉️, contacts groupés
  MEL-351).
- [ ] **PDF hébergés par Melya** (statut 📥 tranché par Claude le 11/10/2026,
  à valider par Clément) : PHQ-9, GAD-7, PCL-5, PDI, ADRS (article de
  validation CC BY, pas un formulaire), ASRS v1.1, BAT (versions travail et
  générale dans le même PDF). Fichiers dans
  `apps/web/public/questionnaires/`.

## 2. Relecture clinique (Clément, puis Renata)

- [ ] **Mention « Relu par »** : le champ `reviewedBy` est prévu dans chaque
  fiche mais n'est renseigné nulle part. Il ne doit l'être qu'une fois la
  relecture réellement faite (avec la date). Exemple commenté dans
  `phq-9.ts`.
- [ ] **Contenu de James retiré** car non sourcé ou contraire à la spec :
  - GAD-7 : la règle « item 7 = attention particulière » (aucune source) ;
  - LSAS : « la LSAS est dans le domaine public » (la spec dit : licence non
    documentée) et « l'évitement diminue avant la peur » (non sourcé).
- [ ] **Affirmations à confirmer** (sources non relues en texte intégral ou
  citées de mémoire) :
  - Y-BOCS : critères Mataix-Cols et al. 2016 (réponse ≥ 35 %, rémission
    ≤ 12) — le texte intégral n'a pas pu être relu ;
  - AUDIT : équivalences du verre standard (vin 10 cl, demi 25 cl, 3 cl de
    spiritueux), absentes de la spec ;
  - PHQ-9 / GAD-7 : fréquence de passation « toutes les 2 à 4 séances »
    (pratique courante, non sourcée) ;
  - ASRS : `validated: true` repose sur Caci et al. 2014 (texte non lu) ;
  - GAD-7 : `validated: true` repose sur Micoulaud-Franchi et al. 2016
    (validation en population épileptique).

## 3. Références incomplètes ou à vérifier

- [ ] **EDI** : la référence de validation (Yao et al., 1998b) n'a ni titre ni
  revue, et la thèse de Yao (Lyon 2, 1999) n'a pas de titre. Elles sont
  affichées « à confirmer » : à compléter en priorité.
- [ ] **CST** : référence du livre de Cungi sans année ni édition.
- [ ] **QPA** : titre exact de Bouvard et al. (1992), trouvé via HAL.
- [ ] **PDEQ** : éditeurs du livre de 1997 (j'ai mis Wilson & Keane ; la spec
  écrit « Wilson & Marmar »).
- [ ] **DERS** : sous-titre de Dan-Glauser & Scherer (2013) (« Factor
  structure and consistency of a French translation »).
- [ ] **CAT-Q** : initiale du premier auteur de Hannon et al. (2026).

## 4. Seuils construits par Melya ou divergents (signalés dans les fiches)

- [ ] **PSWQ** : la grille 16-39 / 40-54 / 55-80 est une construction Melya ;
  la spec recommande le score brut avec les moyennes de Gosselin 2001. La
  fiche le dit et met les moyennes en avant.
- [ ] **Y-BOCS** : tranches 0-7 / 8-15 / … absentes de Mollard et de
  Cottraux ; la fiche met en avant le seuil de 16.
- [ ] **PDI** : seuil 15 (Cn2r) ou 14 (INSPQ) — la fiche cite les deux.
- [ ] **LSAS** : grille Heimberg (dès 30) ≠ grille française Bouvard-Cottraux
  (dès 56) — signalé.
- [ ] **FTND** : grille HAS (4 niveaux) ≠ Unicancer/RESPADD (5 niveaux) —
  signalé.
- [ ] **CST** : bornes chevauchantes de la source rendues continues par Melya.
- [ ] **PSI-II** : le score total est un ajout Melya (la fiche des auteurs
  raisonne en 5 sous-échelles).

## 5. Avertissements « traduction » affichés sur les fiches

Fiches qui affichent un encadré « version française non validée » ou un
avertissement spécifique (champ `frenchVersion.warning`) : PHQ-9, SPIN, Y-BOCS,
FTND, PDSS, HONC, CRIES-13, SCARED, SCARED-R-51, CAT-Q, BAT, CST, HSPS.

- [ ] Vérifier que le ton de ces avertissements convient (ils sont factuels,
  mais visibles par tous les psys qui arrivent de Google).

## 6. Technique et SEO

- [ ] **Liens à vérifier dans un navigateur** (bloqués pour les robots ou en
  dépassement de délai) : formulaire PDSS (GMF-U de Lévis), page PCL-S de
  l'INSPQ, PDF SCARED de l'Université de Pittsburgh, thèses de Lyon 2 (EDI,
  erreur SSL). Les liens DOI renvoient 403 aux robots mais ont tous été
  vérifiés sur CrossRef.
- [ ] **Contenu Sanity** de PHQ-9, GAD-7 et LSAS : plus utilisé (les fiches du
  repo prennent le relais). Décider s'il faut le supprimer.
- [ ] **FAQ de la page d'accueil** : réponses absentes du HTML (accordéon
  Radix) et texte obsolète (« Melya propose 6 échelles » alors qu'il y en a
  38).
- [ ] **Tag « Bientôt disponible »** sur « Visualisez l'évolution » : à retirer
  quand le suivi longitudinal sera en ligne (`TrendBlock` n'est utilisé nulle
  part).
- [ ] **Fond de base éclairci** (`globals.css`, #EFEBE3 → #F5F3EF) : changement
  global, à vérifier dans l'app (badges et encadrés `muted` ressortent plus).
- [ ] **Search Console** : demander l'indexation de `/echelles` et des fiches
  principales (PHQ-9, GAD-7, PCL-5, LSAS, AUDIT, ASRS…).
- [ ] **Build** : vérifié par typage seulement (le serveur de dev tournait) ;
  le build Vercel du push fera foi.

## 7. Pistes pour la suite

- Ajouter des équivalences dans les fiches quand une échelle entre au
  catalogue (LEC-5, citée dans la FAQ de la PCL-5, n'a pas encore de fiche).
- Lister les items de chaque sous-échelle du SCARED-R-51 (absents de l'extrait
  de spec lu).
- Ajouter les recherches Google les plus fréquentes par échelle au fil des
  données Search Console (requêtes « score X », « pdf », etc.).
