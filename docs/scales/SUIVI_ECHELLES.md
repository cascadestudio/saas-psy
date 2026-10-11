# Suivi d'implémentation des échelles

> Document de pilotage du catalogue Melya. **Objectif : rattraper le catalogue
> disponible de Mentaal** sur le périmètre libre de droits, et rester devant sur
> les échelles qu'ils n'ont pas. La partie 2 conserve le benchmark Mentaal figé
> (extraction 2026-07-15) qui a servi à prioriser.
>
> **Miroir Linear** : ce tableau est répliqué dans Linear (projet *Catalogue
> d'échelles*, une issue par échelle) pour l'équipe non-dev. Tout changement de
> statut se reporte des deux côtés — correspondance dans `RECETTE_PLAYBOOK.md` §6 bis.

## Tableau de bord

**✅ 12 validées · 🔵 14 implémentées · 🚧 5 en cours · 📋 2 prévues · 🔍 83 à instruire · ⬜ 23 non planifiées · 🚫 28 écartées** (167 échelles, dont 83 ajoutées depuis le catalogue « Apprendre la psychologie » le 10/10/2026)

**Rattrapage Mentaal : 13/42.** Le plafond n'est pas 74 : sur leur catalogue
disponible, 12 sont écartées d'office (payantes, outils maison Mentaal, ou
licence incompatible) et 20 restent à instruire côté droits — il reste **42
échelles vraisemblablement libres**, dont 8 déjà chez Melya. S'y ajoutent les
échelles hors catalogue Mentaal (SPIN déjà en prod, DES/EPDS/… en file) où
Melya prend de l'avance.

### Légende

- ✅ **Validée** — recette manuelle passée (cf. `RECETTE_PLAYBOOK.md`)
- 🔵 **Implémentée** — code mergé (`packages/core` + scorer), recette à confirmer → passer en ✅
- 🚧 **En cours** — sources récupérées / doc de portage en rédaction
- 📋 **Prévue (n)** — priorisée, n = ordre de la file d'attente (partie 2)
- 🔍 **À instruire** — candidate, mais droits à vérifier avant toute décision
- ⬜ **Non planifiée** — vraisemblablement libre, pas encore priorisée
- 🚫 **Écartée** — payante 💰, outil maison Mentaal, ou licence incompatible

**Droits** (grille du registre, 11/10/2026 — détail et preuves dans « Registre des droits » sous le tableau) : ✅ = phrase explicite de libre usage ou domaine public ; ✉️ = libre pour les cliniciens ou la recherche, usage commercial non mentionné (implémentable, contact groupé non bloquant) ; 🔒 = licence non commerciale ou autorisation requise pour un usage commercial (**demande obligatoire avant implémentation**, cf. ticket Linear des demandes de droits) ; 💰 = éditeur commercial ou outil propriétaire (no-go) ; ❓ = détenteur ou licence introuvable après recherche.
✉️ = **contact auteur à faire** : usage commercial pas explicitement couvert
(typiquement « libre pour les cliniciens / la recherche »). Ne bloque pas la
sortie ; les auteurs flaggés seront contactés en une fois, plus tard.
**PDF** (téléchargement du PDF source dans l'app, pour le SEO et la transparence des sources ; tranché par Claude le 11/10/2026, détail en §3 de chaque fiche) : 📥 = hébergeable, la licence autorise la rediffusion sans modification (domaine public, CC BY, « freely available ») ; 🔗 = lien seul vers la source officielle (PDF public chez son diffuseur, rediffusion non autorisée explicitement) ; 🚫 = non (droits 🔒 / 💰 / ❓, ou pas de source publique) ; ⏳ = à établir à l'implémentation (droits ✅ / ✉️, source primaire pas encore retenue).
**Classe** (faisabilité, cf. partie 2) : 🟢 A data seule · 🟡 B scorer patterné
(~30 l.) · 🟠 C petite évolution de brique · 🔴 D hors flux d'auto-passation.
**Mentaal** : `#n` = position dans leur catalogue disponible (74 outils — la
75ᵉ entrée est la fonctionnalité « créez votre questionnaire ») ; `Bientôt · x v.`
= dans leur file d'attente avec x votes ; `Absent` = pas à leur catalogue.
`Catalogue` = présent au catalogue Mentaal relevé le 10/10/2026 (480 outils, disponibles ou à venir, sans distinction).
**[ALP]** = ajoutée depuis le catalogue « Apprendre la psychologie » et sa liste issue du rapport Inserm 2004 (cf. section dédiée sous le tableau). Les hétéro-évaluations (🔴 D) sont conservées en vue d'une future passation en séance.

## Tableau de suivi

| Échelle | Nom | Statut | Droits | PDF | Classe | Mentaal | Notes |
|---------|-----|--------|--------|-----|--------|---------|-------|
| RSES | Estime de soi de Rosenberg | ✅ | ✅ | 🔗 | — | #7 | |
| GAD-7 | Dépistage du TAG | ✅ | ✅ | 📥 | — | #8 | |
| LSAS | Anxiété sociale de Liebowitz | ✅ | ❓ | 🚫 | — | #13 | |
| PHQ-9 | Questionnaire santé patient (dépression) | ✅ | ✅ | 📥 | — | #18 | alerte item 9 |
| PCL-5 | TSPT (DSM-5) | ✅ | ✅ | 📥 | — | #20 | |
| Y-BOCS | TOC de Yale-Brown | ✅ | 🔒 | 🚫 | — | #44 | |
| PSWQ | Inquiétude de Penn State | ✅ | ✉️ | 🔗 | — | #53 | acronyme public **PSWQ** ; id interne `qips` ; VF validée = QIPS (Gosselin 2001) ; recette OK (Clément, PDF source) — bandes de seuils à trancher (équipe, §10) |
| AUDIT | Troubles liés à l'alcool | ✅ | 🔒 | 🔗 | 🟢 A | #66 | aligné sur les sources le 29/09/2026 (OMS FR mot pour mot, écarts repris de l'OFDT, verre standard Michaud 2003, seuils SFA/OFDT « 6 F / 7 H ») ; recette OK (Clément, 29/09/2026) |
| SPIN | Inventaire de la phobie sociale | 🔵 | 🔒 | 🚫 | — | Bientôt · 31 v. | **Melya devant Mentaal** |
| HSPS | Hypersensibilité (Aron) | 🔵 | 🔒 | 🚫 | 🟢 A | #19 | auto-test du livre (23 items OUI/NON, seuil 12) — droits trad. Éditions de l'Homme à instruire avant sortie de beta |
| WAQ | Inquiétude et anxiété (Dugas) | 🔵 | ✉️ | 🔗 | 🟡 B | #25 | porté sous l'id **QIA** — criteriaCheck TAG (pas une simple somme) + item thèmes en texte libre (nouvelle brique `openingTextItem`) |
| IUS | Intolérance à l'incertitude | 🔵 | ✉️ | 🔗 | 🟢 A | #26 | porté sous l'id **EII** — score brut 27-135 sans bandes (aucun cutoff établi) + sous-scores bifactoriels |
| PDEQ | Dissociation péritraumatique | ✅ | ✉️ | 🔗 | 🟢 A | #59 | seuil ≥ 15 (fiche Cn2r) ; source secondaire URPS-ML PACA (Brunet & Routhier 1999) ; recette OK (Clément, 29/09/2026) |
| CUDIT-R | Troubles liés au cannabis | ✅ | ✉️ | 🔗 | 🟢 A | #70 | question-porte « 6 derniers mois » portée en consigne ; seuils 8-10 / > 10 (RESPADD) ; recette OK (Clément, 29/09/2026) |
| FTND | Dépendance à la nicotine (Fagerström) | ✅ | ✉️ | 🔗 | 🟢 A | Bientôt · 29 v. | **Melya devant Mentaal** ; seuils HAS 2014, options dans l'ordre du PDF HAS, sans intitulés courts ni consigne (absents de la source) ; implémenté en réutilisation (patron CUDIT-R) le 24/09/2026 ; recette OK (Clément, 24/09/2026) |
| ASRS | TDAH adulte | 🔵 | ✅ (6 items) / 🔒 (18 items) | 📥 | 🟡 B | #3 | **dépistage 6 questions** porté (fiche `asrs/asrs.md`, VF officielle NYU, comptage des cases grisées ≥ 4) ; nouveau domaine Neurodéveloppement ; 18 items sous licence NYU ; implémentée par Claude (11/10/2026) ; recette Claude staging + Mentaal conforme (partie A identique, traduction Mentaal non officielle), recette Clément à faire |
| DES | Expériences dissociatives | 🚧 | ✉️ | ⏳ | 🟠 C | Bientôt · 130 v. | #1 des votes ; widget de réponse 0–100 à créer |
| EPDS | Dépression périnatale (Édimbourg) | 🚧 | 🔒 | 🚫 | 🟢 A | Bientôt · 96 v. | alerte item 10 (idéation) façon PHQ-9 ; **droits 🔒** : republication en ligne soumise à autorisation écrite du RCPsych (11/10/2026, MEL-351) |
| DASS-21 | Dépression, anxiété et stress | 🚧 | ✅ (avec conditions) | ⏳ | 🟠 C | #2 | sévérité par sous-échelle → étendre `Subscore` |
| ATQ | Pensées automatiques | 📋 (6) | ❓ | 🚫 | 🟢 A | Bientôt · 77 v. | |
| PDSS | Sévérité du trouble panique | ✅ | 🔒 | 🔗 | 🟢 A | Bientôt · 62 v. | PDSS-SR, VF MSSS Québec 2019 (aucune VF France) ; seuil ≥ 9 (Roberge 2022). Recette OK (Adrien, 29/09/2026) ; cross-check a posteriori sur la version Roberge (demandée, MEL-339). © Shear : usage commercial à demander (✉️) — cf. MEL-324 |
| DERS | Régulation émotionnelle | 🚧 | ❓ | 🚫 | 🟡 B | #14 | reverse + subscores |
| TAS-20 | Alexithymie de Toronto | 📋 (10) | 🔒 | 🚫 | 🟡 B | #37 | reverse + 3 subscores |
| LEC-5 | Liste des événements de vie (DSM-5) | 🚧 | ✅ | ⏳ | 🟠 C | Absent | couplée à la PCL-5 en clinique (identification de l'événement de référence) — cf. `pcl-5/pcl-5.md` §13 ; pas de score : 17 événements × 6 modalités (vécu / témoin / appris / cadre pro / pas sûr / sans objet) → widget multi-choix par item à créer ; VF Cn2r à sourcer ; priorité à rediscuter (équipe) |
| ASQ-SF | Styles d'attachement | 🔍 | ❓ | 🚫 | — | #10 | |
| SCT | Test de confiance en soi | 🔍 | ❓ | 🚫 | — | #15 | |
| ADHD-RS | Évaluation du TDAH | 🔍 | 💰 | 🚫 | — | #16 | DuPaul/Guilford — alternative libre : ASRS |
| PDQ-4 | Diagnostic des personnalités | 🔍 | ❓ | 🚫 | — | #24 | |
| BPQ | Personnalité borderline | 🔍 | ❓ | 🚫 | — | #28 | |
| CAQ | Évitements cognitifs | 🔵 | ✉️ | 🔗 | 🟡 B | #32 | porté sous l'id **QEC** ; fiche `qec/qec.md` ; original francophone (Gosselin et al. 2002), laboratoire Dugas (UQO) ; 25 items, total + 5 sous-scores, sans seuil ; implémentée par Claude (11/10/2026) ; recette Claude staging + Mentaal conforme (75 et sous-scores identiques), recette Clément à faire |
| BIG-5 | Cinq grands facteurs | 🔍 | ✅ (si version IPIP) | ⏳ | — | #33 | items IPIP libres — version exacte à confirmer ; **bloquée VF (11/10/2026)** : aucune version française validée de l'IPIP (50 items ou Mini-IPIP) trouvée avec son texte ; le BFI-Fr (Plaisant et al.) n'est pas IPIP (droits à instruire) |
| PPAG | Phobie, panique, anxiété généralisée | 🔍 | ❓ | 🚫 | — | #35 | |
| SCQ | Cognitions sociales | 🔍 | ❓ | 🚫 | — | #39 | |
| GAD-SBQ | Comportements sécurisants du TAG | 🔵 | ✅ | 🔗 | 🟢 A | #40 | porté sous l'id **qcs-tag** (QCS-TAG, version FR abrégée validée) ; fiche `qcs-tag/qcs-tag.md` ; formulaire du labo Dugas (UQO) ; 10 items 1-5 avec exemples, somme 10-50 sans seuil ; implémentée par Claude (11/10/2026, mission 3), recette staging à confirmer |
| CAT | Assertivité de Chalvin | 🔍 | 💰 | 🚫 | — | #41 | |
| EDQ | Dépendance affective | 🔍 | ❓ | 🚫 | — | #42 | |
| COPSOQ | Risques psychosociaux | 🔍 | ✉️ | ⏳ | — | #51 | libre non commercial — usage commercial à vérifier |
| SPRS | Cotation de la phobie sociale | 🔍 | ❓ | 🚫 | — | #55 | |
| QAP | Attitudes face aux problèmes | 🔵 | ✉️ | 🔗 | 🟢 A | #56 | fiche `qap/qap.md` ; original francophone (Gosselin, Ladouceur & Pelletier 2005), formulaire et cotation du laboratoire Dugas (UQO) ; 12 items, total 12-60 sans seuil ; implémentée par Claude (11/10/2026) ; recette Claude staging + Mentaal conforme (Mentaal ajoute un seuil 48 non sourcé), recette Clément à faire |
| CST | Stress de Cungi | 🔍 | ❓ | 🚫 | — | #60 | |
| RIASEC | Intérêts professionnels | 🔍 | ✅ (si O*NET Interest Profiler) | ⏳ | — | #62 | modèle libre, version des items à vérifier |
| ASA-27 | Anxiété de séparation adulte | 🔍 | ❓ | 🚫 | — | #63 | |
| FSS | Échelle des peurs | 🔍 | 💰 | 🚫 | — | #64 | |
| IAT | Addiction à Internet | 🔍 | 💰 | 🚫 | — | #71 | Young/Stoelting — licence à vérifier |
| ISI | Sévérité de l'insomnie | 🔍 | 🔒 | 🚫 | — | Non dispo | motif sommeil = trou Mentaal → opportunité |
| PSQI | Qualité de sommeil de Pittsburgh | 🔍 | 🔒 | 🚫 | — | Non dispo | idem ISI |
| AQ | Quotient du spectre de l'autisme | ⬜ | 🔒 | 🚫 | 🟡 B | #4 | 50 items, recode binaire + 5 subscores ; 2e passe (10/10/2026) : ⛔ usage commercial interdit sans autorisation (Autism Research Centre, Cambridge Enterprise) |
| RAADS-R | Autisme / Asperger de Ritvo | ⬜ | 🔒 | 🚫 | 🟡 B | #6 | 80 items — lourd ; 2e passe : ⛔ licence non commerciale (CC BY-NC) |
| CAT-Q | Camouflage autistique | ⬜ | ✅ | ⏳ | 🟡 B | #9 | 2e passe : ⛔ original CC BY, mais validation française (Bureau et al. 2024, JADD) sur abonnement |
| EQ | Quotient empathique | ⬜ | 🔒 | 🚫 | 🟡 B | #11 | recode + reverse ; 2e passe : ⛔ usage commercial interdit sans autorisation (ARC, Cambridge Enterprise) |
| PID-5 | Personnalité DSM-5 | ⬜ | 🔒 | 🚫 | — | #17 | 220 items (ou brève 25) — volume énorme ; 2e passe : ⛔ autorisation APA requise pour une application commerciale |
| RAS | Affirmation de soi de Rathus | ⬜ | ❓ | 🚫 | 🟡 B | #21 | reverse + offset ; 2e passe : ⛔ aucune VF validée accessible ; droits non établis |
| SNAP-IV | TDAH enfant | ⬜ | ✅ | ⏳ | 🟡 B | #23 | public enfant ; 2e passe : ⛔ seule VF trouvée marquée « non validée » |
| MDQ | Troubles de l'humeur | ⬜ | 🔒 | 🚫 | 🟡 B | #30 | criteriaCheck + oui/non ; droits UTMB, usage sur permission de l'auteur (tri du 10/10/2026) |
| SCARED | Troubles anxieux enfant | ⬜ | ✉️ | ⏳ | 🟡 B | #34 | public enfant ; 2e passe : ⛔ VF validée = SCARED-R (Muris, autre instrument) ; VF du SCARED (fr-CA, Pittsburgh) sans validation retrouvée |
| PCL-S | État de stress post-traumatique | ⬜ | ✅ | ⏳ | — | #36 | redondant avec PCL-5 ; VF Yao et al. 2003 sur abonnement : bloquée (tri du 10/10/2026) |
| ASSQ | Dépistage TSA enfant | ⬜ | ❓ | 🚫 | 🟡 B | #38 | public enfant ; 2e passe : ⛔ aucune VF validée trouvée |
| FMPS | Perfectionnisme de Frost | ⬜ | ❓ | 🚫 | 🟡 B | #45 | subscores ; 2e passe : ⛔ VF (Rhéaume et al.) non accessible ; droits non établis |
| BAT-G | Burnout (version générale) | ⬜ | ✅ | ⏳ | 🟡 B | #48 | alternative libre au MBI ; 2e passe : ⛔ droits libres (« non-proprietary ») mais VF France officielle non validée ; VF validée = franco-canadienne 2025, items non publiés |
| IES-R | Impact des événements | ⬜ | ❓ | 🚫 | 🟡 B | #49 | 3 subscores ; statut de droits contradictoire (Weiss & Marmar), tri du 10/10/2026 |
| SVS | Valeurs de Schwartz | ⬜ | ❓ | 🚫 | — | #50 | centrage ipsatif = calcul spécifique |
| EAT-26 | Attitudes alimentaires | ⬜ | 🔒 | 🚫 | 🟡 B | #52 | recode asymétrique + seuil ; 2e passe : ⛔ licence exigée pour les plateformes web payantes (Eating Attitudes LLC) |
| ADRS | Dépression pour adolescents | 🔵 | ✅ | 📥 | 🟢 A | #57 | fiche `adrs/adrs.md` ; original français (Revah-Lévy et al. 2007, BMC Psychiatry, CC BY) ; tranches OFDT / Santé publique France 0-3 / 4-6 / 7-10 ; alerte item 6 ; domaine Humeur, catégorie « Dépression — adolescents » ; implémentée par Claude (10/10/2026) ; recette staging Claude OK (0, 4, 7, alerte, 10) ; Mentaal : texte SFD et tranches 4-8 / 9-10 ; recette manuelle de Clément à faire → ✅ |
| WW-II | Pourquoi s'inquiéter ? | 🔵 | ✉️ | 🔗 | 🟡 B | #58 | porté sous l'id **PSI-II** (original francophone, Gosselin et al. 2003, formulaire et cotation du laboratoire Dugas, UQO) ; 5 sous-scores + total 25-125, pas de seuil ; fiche `ww-ii/psi-ii.md` ; implémentée par Claude (lot autonome du 10/10/2026) ; recette staging Claude OK (min, max, sous-scores) et parcours Mentaal comparé ; recette manuelle de Clément à faire → ✅ |
| BAT-W | Burnout (version travail) | ⬜ | ✅ | ⏳ | 🟡 B | #61 | 2e passe : ⛔ idem BAT-G |
| BSQ | Sensations corporelles | ⬜ | ❓ | 🚫 | 🟢 A | #65 | Likert + somme ; aucune VF validée trouvée : bloquée (tri du 10/10/2026) |
| FQ | Peurs de Marks & Mathews | ⬜ | ❓ | 🚫 | 🟡 B | #67 | subscores ; VF Cottraux 1987 publiée seulement dans Guelfi (1997), droits non établis : bloquée (tri du 10/10/2026) |
| PVQ-RR | Valeurs par portraits | ⬜ | ❓ | 🚫 | — | #68 | ipsatif, usage niche |
| CRIES-13 | Stress post-traumatique enfant | 🔵 | ✉️ | 🔗 | 🟡 B | #69 | public enfant ; fiche `cries-13/cries-13.md` ; Cn2r (VF non validée entièrement, acceptée par la règle pragmatique) + Children and War Foundation ; 0/1/3/5, seuil ≥ 30, 3 sous-scores ; implémentée par Claude (11/10/2026, mission 3), recette staging à confirmer |
| EDS-R | Dépendance à l'exercice | ⬜ | 🔒 | 🚫 | 🟡 B | #73 | criteria + subscores ; usage sur autorisation des auteurs (tri du 10/10/2026) |
| THI | Handicap pour acouphènes | ⬜ | ❓ | 🚫 | 🟢 A | #74 | hors psycho (ORL) ; 2e passe : exclue (outil ORL, hors champ psychologique ; utilisé en TCC des acouphènes, à trancher dans MEL-348) |
| WHO-5 | Bien-être (OMS) | ⬜ | 🔒 | 🚫 | — | Absent | idéal suivi longitudinal — angle différenciation ; copyright OMS depuis 2024, licence CC BY-NC-SA (non commercial) : autorisation à demander à WHO-5@who.int (tri du 10/10/2026) |
| CDI | Distorsions cognitives | 🚫 | 💰 | 🚫 | — | #1 | outil maison Mentaal (≠ CDI Pearson) |
| YSQ-L3 | Schémas de Young (long) | 🚫 | 💰 | 🚫 | — | #5 | payant |
| YSQ-S3 | Schémas de Young (court) | 🚫 | 💰 | 🚫 | — | #12 | payant |
| SCID-II-PQ | Dépistage troubles de personnalité | 🚫 | 💰 | 🚫 | — | #22 | SCID/APA |
| ASTA-20 | Anxiété d'état et de trait | 🚫 | 💰 | 🚫 | — | #27 | outil maison Mentaal, proche STAI (payante) — alt. : STICSA |
| SDQ | Forces et difficultés | 🚫 | 🔒 | 🚫 | — | #29 | licence requise pour usage électronique/commercial |
| MBI | Burnout de Maslach | 🚫 | 💰 | 🚫 | — | #31 | Mind Garden — alternative libre : BAT |
| TOMQ-36 | Théorie de l'esprit | 🚫 | 💰 | 🚫 | — | #43 | outil maison Mentaal |
| MSQ | Questionnaire sur le sommeil | 🚫 | 💰 | 🚫 | — | #46 | outil maison Mentaal — le vrai motif sommeil passe par ISI/PSQI |
| EDI-2 | Troubles alimentaires | 🚫 | 💰 | 🚫 | — | #47 | Pearson — alternative libre : EAT-26 |
| QPC-L | Première consultation (long) | 🚫 | 💰 | 🚫 | — | #54 | outil maison Mentaal |
| QPC-S | Première consultation (court) | 🚫 | 💰 | 🚫 | — | #72 | outil maison Mentaal |
| BDI | Inventaire de dépression de Beck | 🚫 | 💰 | 🚫 | — | Catalogue | [ALP] éditeur : Pearson ; cf. MEL-346 (fiche de redirection BDI-II → PHQ-9) |
| BAI | Inventaire d'anxiété de Beck | 🚫 | 💰 | 🚫 | — | Catalogue | [ALP] éditeur : Pearson |
| BHS | Échelle de désespoir de Beck | 🚫 | 💰 | 🚫 | — | Catalogue | [ALP] éditeur : Pearson |
| BSS | Échelle d'idéation suicidaire de Beck | 🚫 | 💰 | 🚫 | — | Absent | [ALP] éditeur : Pearson |
| EAT-40 | Test des attitudes alimentaires (40 items) | 🚫 | 🔒 | 🚫 | — | Absent | [ALP] licence exigée pour les plateformes payantes (Eating Attitudes LLC), comme l'EAT-26 |
| CDRS-R | Échelle d'évaluation de la dépression chez l'enfant | 🚫 | 💰 | 🚫 | 🔴 D | Absent | [ALP] éditeur : WPS ; hétéro-évaluation ; enfant |
| MASC | Échelle d'anxiété multidimensionnelle pour enfants | 🚫 | 💰 | 🚫 | — | Catalogue | [ALP] éditeur : MHS (MASC-2 chez Mentaal) ; enfant |
| IASTA-Y | Inventaire d'anxiété état-trait, forme Y (STAI-Y) | 🚫 | 💰 | 🚫 | — | Catalogue | [ALP] éditeur : Mind Garden (VF : ECPA) |
| CDI (enfant) | Inventaire de dépression de l'enfant (Kovacs) | 🚫 | 💰 | 🚫 | — | Catalogue | [ALP] éditeur : MHS ; enfant ; ≠ CDI « distorsions cognitives » de Mentaal (ligne 🚫 ci-dessus) |
| HAD | Échelle HAD (anxiété et dépression en milieu hospitalier) | 🚫 | 💰 | 🚫 | — | Catalogue | [ALP] éditeur : GL Assessment |
| Minimult | Inventaire multiphasique de personnalité du Minnesota, version abrégée | 🚫 | 💰 | 🚫 | — | Catalogue | [ALP] dérivé du MMPI, éditeur : University of Minnesota Press (MMPI-2 chez Mentaal) |
| EPI | Inventaire de personnalité d'Eysenck | 🚫 | 💰 | 🚫 | — | Absent | [ALP] éditeur : EdITS / Hodder (EPQ-R chez Mentaal) |
| NEO-PI-R | Inventaire de personnalité NEO révisé (cinq grands facteurs) | 🚫 | 💰 | 🚫 | — | Catalogue | [ALP] éditeur : PAR (VF : Hogrefe) ; NEO-PI-3 chez Mentaal |
| SAS-SR | Échelle d'adaptation sociale (Weissman) | 🚫 | 💰 | 🚫 | — | Absent | [ALP] éditeur : MHS |
| GHQ | Questionnaire de santé générale (Goldberg) | 🚫 | 💰 | 🚫 | — | Absent | [ALP] éditeur : GL Assessment |
| SCL-90-R | Liste de symptômes (Derogatis) | 🚫 | 💰 | 🚫 | — | Catalogue | [ALP] éditeur : Pearson |
| CAS (colère) | Échelle clinique de colère (Clinical Anger Scale) | 🔍 | ❓ | 🚫 | — | Absent | [ALP] |
| ECAB | Échelle cognitive d'attachement aux benzodiazépines | 🔵 | ✉️ | 🔗 | 🟢 A | Absent | [ALP] fiche `ecab/ecab.md` ; fiche HAS 2007 (via OMéDIT Grand Est) ; 10 items V/F, item 10 inversé, seuil ≥ 6 ; implémentée par Claude (11/10/2026, mission 3), recette staging à confirmer |
| ECAP | Échelle comportementale d'anxiété et phobie de Véra | 🔍 | ❓ | 🚫 | — | Catalogue | [ALP] |
| DAS | Échelle d'attitudes dysfonctionnelles (Weissman et Beck) | 🔍 | ❓ | 🚫 | — | Catalogue | [ALP] |
| MAAS | Échelle d'attention et de pleine conscience | 🔍 | 🔒 | 🚫 | — | Catalogue | [ALP] domaine à définir (pleine conscience) |
| FFMQ | Questionnaire des cinq facettes de la pleine conscience | 🔍 | ❓ | 🚫 | — | Absent | [ALP] domaine à définir (pleine conscience) |
| Fusion pensée-forme | Échelle de fusion pensée-forme | 🔍 | 🔒 | 🚫 | — | Absent | [ALP] domaine Troubles alimentaires (validé, pas encore créé) |
| DBAS | Échelle des croyances et attitudes dysfonctionnelles à propos du sommeil | 🔍 | ❓ | 🚫 | — | Catalogue | [ALP] « CAS » chez Mentaal ; domaine à définir (sommeil) |
| MEQ-SA | Questionnaire de chronotype révisé | 🔍 | ✅ | ⏳ | — | Absent | [ALP] domaine à définir (sommeil) ; **bloquée VF (11/10/2026)** : validation française (Taillard et al. 2004, seuils propres aux travailleurs français) inaccessible ; deux traductions françaises divergentes (CHU de Besançon, avec les réponses de l'item 9 recopiées de l'item 5 ; Réseau Morphée) ; SFRMS : version courte 5 items sans cotation ; items 1, 2, 10 sur échelle horaire graduée à adapter en options |
| Q-EDD | Questionnaire for Eating Disorder Diagnosis | 🔍 | ❓ | 🚫 | — | Absent | [ALP] domaine Troubles alimentaires (validé, pas encore créé) |
| CAST | Cannabis Abuse Screening Test | 🔵 | ✉️ | 🔗 | 🟢 A | Absent | [ALP] fiche `cast/cast.md` ; version définitive OFDT (Note 2013-02, 12 mois, 0-4), seuils < 3 / 3-6 / ≥ 7 ; version HAS oui/non écartée ; implémentée par Claude (11/10/2026) ; recette Claude staging conforme, recette Clément à faire |
| HONC | Test de Honc (Hooked on Nicotine Checklist) | 🔍 | ❓ | 🚫 | — | Absent | [ALP] domaine addictions |
| LAO | Liste des activités obsessives-compulsives | 🔍 | ❓ | 🚫 | — | Absent | [ALP] domaine TOC |
| CAC | Liste des obsessions-compulsions (Marks) | 🔍 | ❓ | 🚫 | — | Absent | [ALP] domaine TOC |
| LPO | Liste de pensées obsédantes (Bouvard) | 🔍 | ❓ | 🚫 | — | Absent | [ALP] domaine TOC ; original français |
| Quatre rituels cibles | Échelle des quatre rituels cibles (Marks) | 🔍 | ❓ | 🚫 | — | Absent | [ALP] domaine TOC |
| QPII | Questionnaire des pensées intrusives et de leurs interprétations (Yao) | 🔍 | ❓ | 🚫 | — | Absent | [ALP] domaine TOC ; original français |
| III | Inventaire des interprétations des pensées intrusives (OCCWG) | 🔍 | ❓ | 🚫 | — | Absent | [ALP] domaine TOC |
| OBQ | Questionnaire des croyances obsessionnelles (ICRO / QCO-87) | 🔍 | ❓ | 🚫 | — | Catalogue | [ALP] OBQ-44 chez Mentaal ; domaine TOC |
| MOCI | Inventaire des obsessions-compulsions de Maudsley | 🔍 | ❓ | 🚫 | — | Catalogue | [ALP] domaine TOC |
| ACQ | Questionnaire des cognitions agoraphobiques (Chambless) | 🔍 | ❓ | 🚫 | — | Catalogue | [ALP] domaine anxiété |
| MIA | Inventaire de mobilité pour l'agoraphobie (Chambless) | 🔍 | ❓ | 🚫 | — | Catalogue | [ALP] domaine anxiété |
| TAPIS | Test des pensées en interaction sociale (Glass) | 🔍 | ❓ | 🚫 | — | Absent | [ALP] domaine anxiété |
| Échelle d'infériorité | Échelle d'infériorité (Yao) | 🔍 | ❓ | 🚫 | — | Absent | [ALP] original français |
| Sociotropie-autonomie | Échelle de sociotropie-autonomie (Beck) | 🔍 | ❓ | 🚫 | — | Absent | [ALP] domaine humeur |
| PDI | Inventaire de détresse péritraumatique | 🔵 | ✅ | 📥 | 🟢 A | Catalogue | [ALP] fiche `pdi/pdi.md` ; fiche Cn2r (version Jehel 2005), 13 items 0-4, seuil ≥ 15 ; implémentée par Claude (11/10/2026) ; recette Claude staging conforme, recette Clément à faire |
| CPTS-RI | Index de réaction au stress post-traumatique de l'enfant | 🔍 | ❓ | 🚫 | — | Catalogue | [ALP] domaine trauma ; enfant |
| SCAS | Questionnaire d'anxiété pour enfants de Spence | 🔍 | 🔒 | 🚫 | — | Catalogue | [ALP] enfant |
| RCADS | Échelle d'anxiété et de dépression pour enfants révisée (Chorpita) | 🔍 | 🔒 | 🚫 | — | Catalogue | [ALP] RCADS-47 chez Mentaal ; enfant |
| SCARED-R | Grille d'évaluation des troubles anxieux (SCARED-R, 51 items) | 🔍 | ❓ | 🚫 | — | Absent | [ALP] ≠ SCARED (Birmaher) ; VF SCARED-R : Bouvard et al. 2013 ; enfant/ado |
| BCIS | Échelle d'insight cognitif de Beck | 🔍 | ❓ | 🚫 | — | Absent | [ALP] domaine à définir (psychose) |
| BIS (Birchwood) | Échelle d'insight de Birchwood | 🔍 | ❓ | 🚫 | — | Absent | [ALP] domaine à définir (psychose) |
| BAVQ-R | Échelle révisée des croyances au sujet des voix | 🔍 | ❓ | 🚫 | — | Absent | [ALP] ≠ BVAQ (alexithymie) ; domaine à définir (psychose) |
| STORI | Stages of Recovery Instrument | 🔍 | ❓ | 🚫 | — | Absent | [ALP] domaine à définir (psychose, rétablissement) |
| QCI | Questionnaire des conduites interpersonnelles | 🔍 | ❓ | 🚫 | — | Absent | [ALP] |
| BIS-11 | Échelle d'impulsivité de Barratt | 🔍 | ✉️ | ⏳ | — | Catalogue | [ALP] ; **bloquée VF (11/10/2026)** : la validation française de Bayle et al. (2000) porte sur la BIS-10 (texte non accessible) ; seule traduction BIS-11 trouvée : Gélinas et al. 2015 (Québec, CC BY-NC, non commercial) |
| TCI | Inventaire du tempérament et du caractère (Cloninger) | 🔍 | 💰 | 🚫 | — | Catalogue | [ALP] licence à vérifier (Washington University) |
| SDS (Sheehan) | Échelle de handicap de Sheehan | 🔍 | 🔒 | 🚫 | — | Catalogue | [ALP] |
| QdV Marks | Échelle de qualité de vie de Marks | 🔍 | ❓ | 🚫 | — | Absent | [ALP] |
| FSQ | Functional Status Questionnaire | 🔍 | ✉️ | ⏳ | — | Absent | [ALP] ; **bloquée VF (11/10/2026)** : aucune version française (« Martin 1993 ») retrouvée ; versions portugaise, suédoise, hongroise seulement ; outil de statut fonctionnel physique, à la marge du champ psychologique |
| HAq-II | Questionnaire d'alliance thérapeutique (Luborsky) | 🔍 | ❓ | 🚫 | — | Absent | [ALP] relation thérapeutique ; traduction Cottraux non publiée |
| ERT | Échelle de relation thérapeutique (Cottraux) | 🔍 | ❓ | 🚫 | — | Absent | [ALP] relation thérapeutique |
| Attentes thérapeutiques | Échelles d'attentes thérapeutiques thérapeute / patient (Cottraux) | 🔍 | ❓ | 🚫 | — | Absent | [ALP] relation thérapeutique |
| ESS | Échelle de somnolence d'Epworth | 🔍 | 🔒 | 🚫 | — | Catalogue | [ALP] licence à vérifier (Mapi Research Trust) ; domaine à définir (sommeil) |
| CY-BOCS | Échelle d'obsession-compulsion de Yale-Brown pour enfants | 🔍 | ❓ | 🚫 | 🔴 D | Catalogue | [ALP] hétéro-évaluation ; enfant |
| HDRS | Échelle de dépression de Hamilton | 🔍 | ✅ | ⏳ | 🔴 D | Catalogue | [ALP] hétéro-évaluation |
| MADRS | Échelle de dépression de Montgomery et Åsberg | 🔍 | 🔒 | 🚫 | 🔴 D | Catalogue | [ALP] hétéro-évaluation |
| HAM-A | Échelle d'appréciation de l'anxiété de Hamilton | 🔍 | ✅ | ⏳ | 🔴 D | Catalogue | [ALP] hétéro-évaluation |
| CDSS | Échelle de dépression de Calgary pour la schizophrénie | 🔍 | 🔒 | 🚫 | 🔴 D | Absent | [ALP] hétéro-évaluation |
| MES | Échelle de mélancolie de Bech et Rafaelsen | 🔍 | ❓ | 🚫 | 🔴 D | Absent | [ALP] hétéro-évaluation |
| ERD | Échelle de ralentissement dépressif de Widlöcher | 🔍 | ❓ | 🚫 | 🔴 D | Absent | [ALP] hétéro-évaluation |
| HARD | Diagramme HARD (Rufin et Ferreri) | 🔍 | ❓ | 🚫 | 🔴 D | Absent | [ALP] hétéro-évaluation |
| Covi | Échelle d'anxiété de Covi | 🔍 | ❓ | 🚫 | 🔴 D | Absent | [ALP] hétéro-évaluation |
| Test d'évitement | Test comportemental d'évitement (Marks) | 🔍 | ❓ | 🚫 | 🔴 D | Absent | [ALP] évaluation comportementale en séance |
| SUMD | Scale to assess Unawareness of Mental Disorder | 🔍 | ❓ | 🚫 | 🔴 D | Absent | [ALP] hétéro-évaluation |
| BPRS | Échelle abrégée d'évaluation psychiatrique | 🔍 | ✅ | ⏳ | 🔴 D | Absent | [ALP] hétéro-évaluation |
| CPRS | Échelle d'évaluation psychopathologique générale (Åsberg) | 🔍 | ❓ | 🚫 | 🔴 D | Absent | [ALP] hétéro-évaluation |
| NOSIE | Nurse Observation Scale for Inpatient Evaluation | 🔍 | ❓ | 🚫 | 🔴 D | Absent | [ALP] hétéro-évaluation (soignants) |
| SANS / SAPS | Échelles des symptômes négatifs et positifs (Andreasen) | 🔍 | ❓ | 🚫 | 🔴 D | Catalogue | [ALP] hétéro-évaluation ; SANS chez Mentaal |
| PAS | Personality Assessment Schedule (Tyrer) | 🔍 | ❓ | 🚫 | 🔴 D | Absent | [ALP] entretien |
| IPDE | International Personality Disorder Examination | 🔍 | 💰 | 🚫 | 🔴 D | Absent | [ALP] entretien |
| DIB-R | Entretien diagnostique pour la personnalité borderline | 🔍 | ❓ | 🚫 | 🔴 D | Absent | [ALP] entretien |
| MINI | Mini International Neuropsychiatric Interview | 🔍 | 🔒 | 🚫 | 🔴 D | Catalogue | [ALP] entretien ; licence commerciale à vérifier |
| HSRS | Échelle santé-maladie (Luborsky) | 🔍 | ❓ | 🚫 | 🔴 D | Absent | [ALP] hétéro-évaluation |
| GAS (Spitzer) | Échelle d'évaluation globale (Global Assessment Scale) | 🔍 | ❓ | 🚫 | 🔴 D | Absent | [ALP] hétéro-évaluation ; ≠ GAS « addiction aux jeux vidéo » de Mentaal |
| EGF | Échelle d'évaluation globale du fonctionnement (axe V du DSM-IV) | 🔍 | 🔒 | 🚫 | 🔴 D | Absent | [ALP] hétéro-évaluation |
| CGI | Impression clinique globale | 🔍 | ✅ | ⏳ | 🔴 D | Absent | [ALP] hétéro-évaluation |

_Maintenance : à chaque échelle mergée → 🔵 ; recette manuelle passée → ✅ ;
mettre à jour le tableau de bord. Les candidates hors catalogue Mentaal
(cluster enfant/ado, réserve votée…) sont dans la partie 2 — les remonter ici
quand elles entrent en file._

### Tri du lot autonome (Claude, 10/10/2026)

Mission confiée par Clément : implémenter, sans arbitrage de sa part, toutes les échelles non implémentées qui remplissent **trois critères** : (1) droits libres pour l'original et la VF (✉️ accepté, comme la PDSS ; éditeur ou statut douteux = exclue) ; (2) aucun mécanisme nouveau dans le code ; (3) VF publiée et validée, consultable en texte intégral (sinon : bloquée). Arbitrages consignés en §10 de chaque fiche, relus ensuite par Clément.

**Lecture du critère 2 retenue** : réutilisation des briques existantes (`formType`, scorer somme / sous-scores / inversions / `criteriaCheck`), auto-questionnaire adulte, **et domaine clinique existant**. Le domaine est un enum fermé de 7 valeurs avec une couleur chacune (`ScaleDomain`, `apps/web/lib/scale-appearance.ts`) : en créer un (autisme, TCA, burnout…) est un choix produit et visuel, donc un mécanisme nouveau. Confiance : moyenne — à re-trancher par Clément.

**Retenues après le tri, puis vérifiées aux sources** (droits + VF en texte intégral) :

| # | Échelle | Domaine | Résultat de la vérification |
|---|---------|---------|-----------------------------|
| 1 | WHO-5 | humeur | ⛔ **Bloquée — droits.** Copyright transféré à l'OMS en 2024, diffusion sous licence CC BY-NC-SA 3.0 IGO (usage **non commercial** explicite) ; usage dans un service payant = autorisation à demander à WHO-5@who.int. VF officielle (Psychiatric Research Unit, 1999) et seuil < 50 (INRS, fiche FRPS 43) trouvés : prête à reprendre si l'OMS accorde l'usage. |
| 2 | IES-R | trauma | ⛔ **Exclue — droits douteux.** Statut contradictoire (domaine public selon certains, copyright Weiss & Marmar selon d'autres ; autorisation de reproduction refusée par D. Weiss en 2015). VF Brunet et al. (2003) accessible (McGill). |
| 3 | MDQ | humeur | ⛔ **Exclue — droits.** Copyright University of Texas Medical Branch, utilisation « avec la permission de l'auteur » (Hirschfeld) : pas de libre usage. |
| 4 | WW-II (PSI-II) | anxiété | ✅ **Retenue — implémentée par Claude** (cf. ligne du tableau). Original francophone (Gosselin et al., 2003), formulaire et fiche de cotation du laboratoire Dugas (UQO), même statut que l'ÉII. |
| 5 | BSQ | anxiété | ⛔ **Bloquée — pas de VF validée trouvée** (aucune validation française du Body Sensations Questionnaire de Chambless). |
| 6 | FQ | anxiété | ⛔ **Bloquée — VF inaccessible et droits non établis.** VF Cottraux, Bouvard & Messy (1987, L'Encéphale) ; texte publié seulement dans Guelfi (1997), ouvrage non accessible en ligne. |
| 7 | EDS-R | addictions | ⛔ **Exclue — droits.** Usage sur autorisation des auteurs (Hausenblas, détentrice du manuel). |
| 8 | PCL-S | trauma | ⛔ **Bloquée — VF inaccessible.** Domaine public (NCPTSD) mais validation française (Yao et al., 2003, L'Encéphale) sur abonnement, texte des items introuvable ailleurs. |

**Exclues, avec motif** :

| Échelle(s) | Motif |
|---|---|
| DERS, ATQ (James), ASRS, LEC-5 (Adrien) | Attribuées dans Linear à un autre membre de l'équipe |
| EPDS | Fiche en relecture chez Clément (exclue à sa demande) |
| TAS-20 | Lot d'Adrien (`REDACTION_PLAYBOOK.md` §10) |
| DASS-21 | Sévérité par sous-échelle : `Subscore` à étendre (mécanisme nouveau) |
| DES | Widget de réponse 0–100 à créer |
| SVS, PVQ-RR | Centrage ipsatif : calcul nouveau |
| AQ, RAADS-R, CAT-Q, EQ | Domaine « autisme » inexistant |
| EAT-26 | Domaine « TCA » inexistant |
| BAT-G, BAT-W | Domaine « burnout » inexistant |
| FMPS | Domaine « perfectionnisme » inexistant |
| RAS | Domaine « affirmation de soi » inexistant ; MEL-344 « à confirmer » par Clément |
| PID-5 | Domaine « personnalité » inexistant ; 220 items |
| THI | Domaine ORL inexistant, hors psychologie |
| SNAP-IV, SCARED, ASSQ, CRIES-13, ADRS | Public enfant/ado ou hétéro-évaluation (hors périmètre fixé par Clément) |
| Toutes les 🔍 (dont ISI, PSQI) | Droits ⚠️ non instruits : statut douteux |
| 🚫 | Déjà écartées |


### Deuxième passe — domaines validés et cluster enfant/ado (Claude, 10/10/2026)

Clément a validé l'architecture : domaine = grande famille DSM-5 / HAS (Neurodéveloppement, Troubles alimentaires, Burn-out, Personnalité ; « Estime de soi » → « Estime et affirmation de soi ») ; catégorie = trouble ou motif ; âge et répondant hors domaine ; échelles enfant/ado rangées par domaine clinique ; THI exclu. Ticket de fond : MEL-348. Les 15 échelles débloquées ont été vérifiées aux sources (motifs dans la colonne Notes) : **seule l'ADRS passe** (domaine Humeur, existant). Les nouveaux domaines ne sont donc **pas créés** tant qu'aucune échelle ne les utilise (pas de section vide au catalogue).

### Apport du catalogue « Apprendre la psychologie » (10/10/2026)

Source recommandée par Renata : [catalogue des tests](https://tcc.apprendre-la-psychologie.fr/catalogue/tests-psychologiques/) (57 fiches) et [Échelles en français](https://tcc.apprendre-la-psychologie.fr/echelles-en-francais.html) (liste classée par trouble d'après le rapport Inserm 2004, *Psychothérapie – Trois approches évaluées*). Les échelles absentes du tableau y ont été ajoutées (étiquette **[ALP]**), **sans instruction** (consigne de Clément) :

- 🚫 quand un éditeur commercial est clairement identifié (Pearson, MHS, WPS, Mind Garden, GL Assessment, PAR, EdITS, University of Minnesota Press ; EAT-40 : licence plateformes payantes). Éditeurs notés d'après leur notoriété, non re-vérifiés pour cette mise à jour ;
- 🔍 pour toutes les autres, droits ⚠️ à instruire ; classe 🔴 D pour les hétéro-évaluations et entretiens, conservés pour une future passation en séance.

Déjà présentes dans le tableau avant cet ajout : EDI-2, ÉII (IUS), PCL-S, LSAS, RSES, Y-BOCS, IES-R, ISI, FQ, AUDIT, PDEQ, YSQ-L3, PSWQ (QIPS), FTND, MBI, ATQ, PPAG, FSS, PDSS, RAS, TAS-20, SCID-II-PQ, PDQ-4, YSQ.

Plusieurs ajouts appellent des domaines encore inexistants (sommeil, psychose, pleine conscience, relation thérapeutique) : à traiter dans MEL-348 avant toute instruction.


### PDF sources téléchargeables (Claude, 11/10/2026)

Tâche subsidiaire demandée par Clément : repérer les PDF sources que Melya pourra proposer en téléchargement (SEO, transparence méthodologique). Colonne « PDF » du tableau ; justification par échelle en §3 de chaque fiche ; ligne ajoutée au `_TEMPLATE.md` pour les prochaines.

| Statut | Échelles implémentées | Fichier ou cible |
|---|---|---|
| 📥 hébergeable (6) | GAD-7, PHQ-9, PCL-5, ASRS (6 questions), ADRS, PDI | `gad-7/GAD7_French-for-France.pdf`, `phq-9/PHQ9_French-for-France.pdf`, `pcl-5/PCL-5_Cn2r.pdf`, `asrs/ASRS_6Q_French_NYU.pdf`, `adrs/ADRS_BMC-Psychiatry-2007.pdf`, `pdi/PDI_Cn2r.pdf` — sans modification, avec la mention de copyright de l'échelle |
| 🔗 lien seul (13) | RSES, PSWQ, AUDIT, PDSS, QIA, ÉII, PSI-II, QEC, QAP, PDEQ, CUDIT-R, FTND, CAST | URL de la source primaire (§2 de chaque fiche) : uqo.ca, cn2r.fr, ofdt.fr, has-sante.fr, respadd.org, OMS, publications |
| 🚫 non (4) | LSAS, Y-BOCS, SPIN, HSPS | Droits à régulariser d'abord (MEL-351) |

Sur les 144 échelles non implémentées : 20 ⏳ (droits ✅ / ✉️), 124 🚫 (droits 🔒 / 💰 / ❓ ou écartées). Une confirmation des détenteurs (MEL-351, bloc ✉️) ferait passer plusieurs 🔗 en 📥 (laboratoire Dugas, Cn2r, OFDT).

### Registre des droits (Claude, 11/10/2026)

Statut de droits de **chacune des 167 échelles** du tableau, établi par recherche documentaire (sites des auteurs et des diffuseurs, fiches institutionnelles, répertoires McGill MAPPRO, CamCOPS, Mapi, BiblioPRO), consultée le 10-11/10/2026. Grille : voir la légende « Droits » en tête de fichier. Répartition : ✅ 21 · ✉️ 16 · 🔒 29 · 💰 32 · ❓ 69 (EPDS reclassée ✉️ → 🔒 le 11/10/2026).

- Les **🔒** et les **❓** sont repris dans le ticket Linear des demandes de droits **MEL-351** (groupés par détenteur, avec les ✉️ à confirmer).
- ⚠️ **Échelles déjà implémentées dont les droits ne couvrent pas un usage commercial** : Y-BOCS (licence payante OCD Scales, LLC pour tout usage numérique), AUDIT (document OMS « not for… commercial purposes »), SPIN (autorisation écrite de J. Davidson), PDSS (« other uses » à demander à M. K. Shear), HSPS (traduction © Éditions de l'Homme), LSAS (à confirmer auprès de M. R. Liebowitz). À traiter en priorité.
- Les éditeurs marqués « notoriété ; non re-vérifié » ont été classés sans nouvelle recherche (éditeurs bien connus).
- « VF » indique l'état de la version française au regard du critère « publiée, validée, accessible en texte intégral ».

| Échelle | Droits | Détenteur | Preuve (phrase de licence ou constat, source) | Version française | Action |
|---|---|---|---|---|---|
| AQ | 🔒 | Autism Research Centre / Cambridge Enterprise | « used for research purposes and not for commercial use » ; usage commercial via Cambridge Enterprise | VF disponible (ARC), validation à vérifier | Demande de licence (Cambridge Enterprise) |
| AUDIT | 🔒 | Organisation mondiale de la Santé | « may… be freely reviewed, abstracted, reproduced and translated… but not for sale or for use in conjunction with commercial purposes » (document OMS) | VF OMS | Implémentée ; ⚠️ autorisation OMS à demander |
| CDSS | 🔒 | D. Addington (University of Calgary) | « Permission to use the scale is available at a standard rate for commercial organizations » ; gratuit pour les cliniciens en pratique courante (ucalgary.ca/cdss) | VF Bernard et al. à vérifier | Demande de licence ; hétéro-évaluation |
| EAT-26 | 🔒 | Eating Attitudes LLC (D. M. Garner) | Licence exigée pour les plateformes web payantes | VF à vérifier | Demande de licence |
| EAT-40 | 🔒 | Eating Attitudes LLC (D. M. Garner) | Licence exigée pour les plateformes web payantes (eat-26.com/permission) | VF à vérifier | Demande de licence |
| EDS-R | 🔒 | Hausenblas & Symons Downs (détentrices du manuel) | Usage sur autorisation des auteures | VF Kern 2007 | Demande d'autorisation |
| EGF | 🔒 | American Psychiatric Association (GAF, axe V du DSM-IV) | Copyright APA ; reproduction refusée (APA à R. Cardinal, 2013, documentation CamCOPS) | — | Demande d'autorisation (APA) ; hétéro-évaluation |
| EQ | 🔒 | Autism Research Centre / Cambridge Enterprise | Idem AQ | VF Berthoz et al. 2008 | Demande de licence (Cambridge Enterprise) |
| ESS | 🔒 | M. W. Johns (diffusion Mapi Research Trust) | « a license is required to use it, whether or not a license fee is payable » ; licences gratuites seulement pour l'usage non commercial | VF à vérifier | Demande de licence Mapi |
| Fusion pensée-forme | 🔒 | Shafran et al. 1999 | « You must contact the authors to request use » (BiblioPRO) | VF à vérifier | Demande d'autorisation (R. Shafran) |
| HSPS | 🔒 | E. N. Aron ; traduction © Éditions de l'Homme | Auto-test pour usage personnel ; traduction extraite d'un livre de l'éditeur | Traduction du livre | Implémentée (risque accepté) ; ⚠️ autorisation éditeur à demander |
| ISI | 🔒 | Charles M. Morin (diffusion Mapi Research Trust) | Organisations, dossiers patients, produits numériques et outils web : licence Mapi requise ; accès direct seulement pour les cliniciens individuels (eprovide.mapi-trust.org) | VF à vérifier | Demande de licence Mapi |
| MAAS | 🔒 | Brown & Ryan 2003 (Center for Self-Determination Theory) | « in the public domain… for research or clinical purposes » ; « you must obtain permission from the Center for Self-Determination Theory for commercial use » | VF Jermann et al. 2009 à vérifier | Demande d'autorisation (CSDT) |
| MADRS | 🔒 | Royal College of Psychiatrists (Montgomery & Åsberg 1979) | Copyright RCPsych ; permission refusée pour un usage commercial non restreint (documentation CamCOPS, « tasks missing ») | VF Pellet et al. 1980 à vérifier | Demande d'autorisation (RCPsych) ; hétéro-évaluation |
| MDQ | 🔒 | University of Texas Medical Branch (R. Hirschfeld) | Utilisation « avec la permission de l'auteur » | VF Weber Rouget et al. 2005 (archive ouverte UNIGE) | Demande d'autorisation |
| MINI | 🔒 | D. V. Sheehan (Harm Research Institute) | « A fully executed license is required for use of the MINI… in any language » ; 15 USD par administration | VF Lecrubier et al. 1998 à vérifier | Demande de licence (payante) ; entretien |
| PDSS | 🔒 | M. K. Shear (© 1997) ; VF MSSS Québec 2019 | Permission limitée aux cliniciens et à la recherche hors industrie : un SaaS payant relève des « other uses » | VF MSSS Québec | Implémentée ; ⚠️ autorisation à demander (MEL-324) |
| PID-5 | 🔒 | American Psychiatric Association | Autorisation APA requise pour une application commerciale | VF Roskam et al. 2015 (PLoS ONE, accès libre) | Demande d'autorisation (APA) |
| PSQI | 🔒 | University of Pittsburgh | « may be reprinted without charge only for non-commercial research and educational purposes » ; licence payante pour les entités commerciales (Office of Technology Management) | VF à vérifier | Demande de licence Pitt |
| RAADS-R | 🔒 | Ritvo et al. 2011 | Licence non commerciale (CC BY-NC, source secondaire) | VF Montpellier (JADD) à vérifier | Demande d'autorisation |
| RCADS | 🔒 | B. F. Chorpita & S. H. Spence | « Commercial distribution of the RCADS instruments… in any form or medium is prohibited » ; usage institutionnel sur autorisation écrite (rcads.ucla.edu) | VF à vérifier | Demande d'autorisation |
| SCAS | 🔒 | S. H. Spence | « Commercial organizations and for-profit clinical services should contact the author to discuss a commercial licence arrangement before use » (scaswebsite.com) | VF à vérifier | Demande de licence (S. Spence) |
| SDQ | 🔒 | youthinmind (R. Goodman) | Licence requise pour un usage électronique ou commercial (youthinmind.com) | VF disponible | Demande de licence |
| SDS (Sheehan) | 🔒 | D. V. Sheehan (Harm Research Institute) | « A fully executed license is required for use of the Sheehan Disability Scale in any language » ; tarif par administration | — | Demande de licence (payante) |
| SPIN | 🔒 | J. R. T. Davidson (Duke University) | « Permission to use the SPIN must be obtained from the copyright holder at mail@cd-risc.com » | VF validée | Implémentée (risque accepté par Adrien) ; ⚠️ autorisation à demander |
| TAS-20 | 🔒 | Taylor, Bagby & Parker (University of Toronto) | « Use of the scale requires payment of a copyright fee » ; licence auprès de G. J. Taylor | VF Loas 1996 à vérifier | Demande de licence (payante) |
| WHO-5 | 🔒 | Organisation mondiale de la Santé (depuis 2024) | CC BY-NC-SA 3.0 IGO (usage non commercial) ; contact WHO-5@who.int | VF officielle 1999 (Psychiatric Research Unit), seuil INRS | Demande d'autorisation (OMS) |
| Y-BOCS | 🔒 | OCD Scales, LLC (Goodman et al.) | Licence payante exigée pour la numérisation, les dossiers électroniques et les applications (sources secondaires : Tacklit, BastionGPT) | VF Mollard, Cottraux & Bouvard 1989 | Implémentée ; ⚠️ licence à demander en priorité |
| ACQ | ❓ | Chambless et al. 1984 | Aucune phrase de licence trouvée (instructions diffusées sur le site de D. Chambless, UPenn) | VF à vérifier | À identifier |
| ASA-27 | ❓ | Manicavasagar et al. 2003 | Aucune phrase de licence trouvée | Non trouvée | À identifier |
| ASQ-SF | ❓ | Alexander et al. 2001 ; Karantzas et al. 2010 | Aucune phrase de licence trouvée | À vérifier | À identifier |
| ASSQ | ❓ | Ehlers, Gillberg & Wing 1999 | Droits non établis | Aucune VF validée trouvée | Bloquée (VF) ; à identifier |
| ATQ | ❓ | Hollon & Kendall 1980 | Aucune phrase de licence trouvée (reproduction accordée aux acheteurs de manuels Guilford) | À vérifier | À identifier |
| Attentes thérapeutiques | ❓ | J. Cottraux 1995 | Publiées dans un ouvrage de J. Cottraux ; éditeur et licence non établis | Non trouvée en accès libre | À identifier |
| BAVQ-R | ❓ | Chadwick, Lees & Birchwood 2000 | Aucune phrase de licence trouvée | VF à vérifier | À identifier |
| BCIS | ❓ | Beck et al. 2004 | Aucune phrase de licence trouvée | VF à vérifier | À identifier |
| BIS (Birchwood) | ❓ | Birchwood et al. 1994 | « No information found » (McGill MAPPRO) | VF à vérifier | À identifier |
| BPQ | ❓ | Poreh et al. 2006 (J Personal Disord, Guilford) | Aucune phrase de licence trouvée | À vérifier | À identifier |
| BSQ | ❓ | Chambless et al. 1984 | Aucune phrase de licence trouvée | Aucune VF validée trouvée | Bloquée (VF) |
| CAC | ❓ | I. Marks 1977 | Aucune source en ligne | Non trouvée | À identifier |
| CAS (colère) | ❓ | Snell, Gum, Shuck, Mosley & Hite 1995 | Largement diffusé en ligne, sans phrase de licence trouvée | VF à vérifier | À identifier |
| Covi | ❓ | L. Covi 1984 | Aucune source de licence en ligne | VF à vérifier | À identifier ; hétéro-évaluation |
| CPRS | ❓ | Åsberg, Montgomery et al. 1978 | Aucune phrase de licence trouvée | VF à vérifier | À identifier ; hétéro-évaluation |
| CPTS-RI | ❓ | Pynoos et al. (UCLA) | Aucune phrase de licence trouvée (UCLA PTSD-RI : copyright des auteurs) | VF à vérifier | À identifier |
| CST | ❓ | C. Cungi | Échelle publiée dans des ouvrages de C. Cungi ; éditeur et licence non établis | Non trouvée en accès libre | À identifier |
| CY-BOCS | ❓ | Goodman et al. 1997 (Y-BOCS : OCD Scales, LLC ?) | Détenteur formel inconnu ; la Y-BOCS adulte serait sous licence d'OCD Scales, LLC | VF à vérifier | À identifier ; hétéro-évaluation |
| DAS | ❓ | Weissman & Beck 1978 | Aucune phrase de licence trouvée | VF à vérifier | À identifier |
| DBAS | ❓ | C. M. Morin (Université Laval) | Aucune phrase de licence trouvée | VF probable (équipe francophone de Morin) à vérifier | À identifier |
| DERS | ❓ | Gratz & Roemer 2004 | Aucune phrase de licence trouvée | À vérifier | À identifier |
| DIB-R | ❓ | Zanarini et al. 1989 | Aucune phrase de licence trouvée | VF validée 2023 en accès libre (PMC10506241) | À identifier ; entretien |
| ECAB | ✉️ | Pélissolo & Naja 1996 ; fiche © HAS 2007 | Fiche publique HAS, aucune phrase de licence sur l'instrument | Originale FR (fiche HAS 2007) | Implémentée (mission 3) |
| ECAP | ❓ | L. Véra | Aucune source en ligne | Non trouvée | À identifier |
| EDQ | ❓ | « Dépendance affective » (Mentaal) — auteur non identifié | Aucune source identifiée | Non trouvée | À identifier |
| ERD | ❓ | D. Widlöcher 1981 | Aucune source de licence en ligne | Originale FR, texte non trouvé en accès libre | À identifier ; hétéro-évaluation |
| ERT | ❓ | J. Cottraux 1995 | Publiée dans un ouvrage de J. Cottraux ; éditeur et licence non établis | Non trouvée en accès libre | À identifier |
| FFMQ | ❓ | Baer et al. 2006 | Aucune phrase de licence trouvée ; VF hébergée par l'ACBS (contextualscience.org) | VF Heeren et al. 2011 (contextualscience.org) | À identifier |
| FMPS | ❓ | R. O. Frost 1990 | Droits non établis | VF Rhéaume et al. non accessible | À identifier |
| FQ | ❓ | Marks & Mathews 1979 | Droits non établis | VF Cottraux 1987, publiée seulement dans Guelfi (1997) | Bloquée (VF) ; à identifier |
| GAD-SBQ | ✅ | Marcotte-Beaumier, Hébert & Dugas 2020 / laboratoire Dugas (UQO) | « peuvent être téléchargés et utilisés gratuitement » (uqo.ca/anxiete/outils, 11/10/2026) | Originale FR (QCS-TAG, UQO) | Implémentée (mission 3) |
| GAS (Spitzer) | ❓ | Endicott, Spitzer et al. 1976 | Aucune phrase de licence trouvée | VF à vérifier | À identifier ; hétéro-évaluation |
| HAq-II | ❓ | Luborsky et al. 1996 (University of Pennsylvania) | Article et guide de cotation diffusés par l'UPenn, sans phrase de licence ; traduction Cottraux non publiée | Non publiée | À identifier |
| HARD | ❓ | Rufin & Ferreri 1984 | Aucune source de licence en ligne | Originale FR, texte non trouvé | À identifier ; hétéro-évaluation |
| HONC | ❓ | J. DiFranza (UMass) | Largement diffusé par des organismes publics (NCI, Alberta Health Services), sans phrase de licence trouvée | « Test HONC » (La Revue du Praticien), validation FR à vérifier | À identifier |
| HSRS | ❓ | L. Luborsky | Aucune source de licence en ligne | VF à vérifier | À identifier ; hétéro-évaluation |
| IES-R | ❓ | Weiss & Marmar 1997 | Statut contradictoire (domaine public selon certains, copyright selon d'autres ; autorisation refusée par D. Weiss en 2015) | VF Brunet et al. 2003 accessible (McGill) | À identifier / confirmer (D. Weiss) |
| III | ❓ | Obsessive Compulsive Cognitions Working Group | Aucune phrase de licence trouvée | VF à vérifier | À identifier |
| LAO | ❓ | Auteur à confirmer | Aucune source en ligne | Non trouvée | À identifier |
| LPO | ❓ | M. Bouvard | Aucune source en ligne | Non trouvée | À identifier |
| LSAS | ❓ | M. R. Liebowitz | Licence commerciale non documentée : autorisation à confirmer avant usage commercial | VF Yao et al. 1999 | Implémentée ; ⚠️ à confirmer auprès de l'auteur |
| MES | ❓ | Bech & Rafaelsen 1980 | Aucune source de licence en ligne | VF à vérifier | À identifier ; hétéro-évaluation |
| MIA | ❓ | Chambless et al. 1985 | Aucune phrase de licence trouvée | VF à vérifier | À identifier |
| MOCI | ❓ | Hodgson & Rachman 1977 | Aucune phrase de licence trouvée | VF à vérifier | À identifier |
| NOSIE | ❓ | Honigfeld 1966 | Aucune source de licence en ligne | VF à vérifier | À identifier ; hétéro-évaluation (soignants) |
| OBQ | ❓ | Obsessive Compulsive Cognitions Working Group | Diffusé par l'IOCDF sans phrase de licence trouvée | VF à vérifier | À identifier |
| PAS | ❓ | P. Tyrer 1988 | Aucune source de licence en ligne | VF à vérifier | À identifier ; entretien |
| PDQ-4 | ❓ | S. E. Hyler (NYSPI) | Aucune phrase de licence trouvée | À vérifier | À identifier |
| PPAG | ❓ | Cottraux 1985 | Aucune phrase de licence trouvée ; texte dans des ouvrages (Cottraux, Bouvard & Légeron) | Non trouvée en accès libre | À identifier |
| PVQ-RR | ❓ | S. H. Schwartz | Droits non recherchés en détail | — | Mécanisme à créer (centrage ipsatif) |
| Q-EDD | ❓ | Mintz et al. 1997 | Aucune phrase de licence trouvée | VF à vérifier (« Les troubles alimentaires : présentation d'un outil », EM-consulte) | À identifier |
| QCI | ❓ | Auteur à confirmer | Aucune source en ligne | Non trouvée | À identifier |
| QdV Marks | ❓ | I. Marks (in Cottraux 1995) | Instrument non identifié en ligne | Non trouvée | À identifier |
| QPII | ❓ | S.-N. Yao | Aucune source en ligne | Non trouvée | À identifier |
| Quatre rituels cibles | ❓ | I. Marks 1980 | Aucune source en ligne | Non trouvée | À identifier |
| RAS | ❓ | S. A. Rathus 1973 | Droits non établis | VF non trouvée en accès libre | À identifier |
| SANS / SAPS | ❓ | N. C. Andreasen (University of Iowa) | « No information found » sur le coût / la licence (McGill MAPPRO) | VF à vérifier | À identifier ; hétéro-évaluation |
| SCARED-R | ❓ | P. Muris et al. | Aucune phrase de licence trouvée | VF Bouvard, Roulin & Denis 2013 (Psychologica Belgica, accès libre) — items non reproduits dans l’article | À identifier |
| SCQ | ❓ | Wells et al. 1993 (Social Cognitions Questionnaire) | Aucune phrase de licence trouvée | Non trouvée | À identifier |
| SCT | ❓ | « Test de confiance en soi » (Mentaal) — auteur non identifié | Aucune source identifiée | Non trouvée | À identifier |
| Sociotropie-autonomie | ❓ | Beck et al. 1983 (Beck Institute) | Document complet diffusé par le Beck Institute, sans phrase de licence trouvée | VF à vérifier | À identifier |
| SPRS | ❓ | Échelle d'appréciation de la phobie sociale (auteur à confirmer) | Aucune source identifiée | Non trouvée | À identifier |
| STORI | ❓ | Andresen, Caputi & Oades (University of Wollongong) | Aucune phrase de licence trouvée | VF à vérifier | À identifier |
| SUMD | ❓ | X. F. Amador | Aucune phrase de licence trouvée (traduction FR validée par l'auteur) | VF validée (EM-consulte, sur abonnement) | À identifier ; hétéro-évaluation |
| SVS | ❓ | S. H. Schwartz | Droits non recherchés en détail | — | Mécanisme à créer (centrage ipsatif) |
| TAPIS | ❓ | Glass & Larsen 1982 (SISST) ; VF Yao et al. 1998 | Aucune phrase de licence trouvée | VF Yao et al. 1998 (Behav Cogn Psychother, sur abonnement) | À identifier |
| Test d'évitement | ❓ | I. Marks 1977 | Évaluation comportementale décrite dans des ouvrages, sans licence identifiée | — | À identifier ; évaluation en séance |
| THI | ❓ | Newman et al. 1996 | Droits non recherchés en détail (exclue : outil ORL) | — | Exclue |
| Échelle d'infériorité | ❓ | S.-N. Yao 1998 | Aucune source en ligne | Non trouvée | À identifier |
| BIS-11 | ✉️ | Patton, Stanford & Barratt 1995 | Disponible sans frais ; usage commercial non mentionné | VF Bayle et al. 2000 à vérifier | Implémentable si VF accessible |
| CAQ (QEC) | ✉️ | Gosselin et al. 2002 / laboratoire Dugas (UQO) | Formulaire et fiche de cotation diffusés publiquement par le laboratoire (uqo.ca/…/anxiete/qec.pdf), sans phrase de licence ; même statut que l'ÉII | Originale FR (UQO), 25 items, total + 5 sous-échelles | Implémentable |
| CAST | ✉️ | OFDT (Legleye, Karila, Beck & Reynaud 2007) | Instrument public gratuit de l'OFDT (ofdt.fr), sans phrase de licence formelle | Originale FR, validée (OFDT, Santé publique France) | Implémentable |
| COPSOQ | ✉️ | COPSOQ International Network | CC BY-NC-ND 4.0 ; usage commercial admis selon les guidelines, sans facturer le questionnaire en tant que tel (copsoq-network.org/guidelines) | VF via le membre français du réseau (à contacter) | Contact du réseau français requis avant usage |
| CRIES-13 | ✉️ | Children and War Foundation | « These instruments are provided free of costs » (childrenandwar.org) ; « do not charge for its use » vise les auteurs de nouvelles traductions | Cn2r (non validée entièrement) + version CW | Implémentée (mission 3) ; confirmation CW non bloquante |
| CUDIT-R | ✉️ | Adamson et al. 2010 ; VF Luquiens et al. 2021 (RESPADD) | Publié en annexe d'articles ; CCSA : « réimprimé avec l'autorisation d'Elsevier » | VF validée (RESPADD) | Implémentée ; confirmation recommandée |
| DES | ✉️ | Carlson & Putnam | Copie et reproduction autorisées « for research and clinical use » ; commercial non mentionné | VF à vérifier | Mécanisme à créer (réponse 0-100) |
| EPDS | 🔒 | Royal College of Psychiatrists (Cox, Holden & Sagovsky 1987) | « may be photocopied by individual researchers or clinicians for their own use without seeking permission… Written permission must be obtained from the Royal College of Psychiatrists for copying and distribution to others or for republication (in print, online or by any other medium) » (mention © 1987 citée par CamCOPS, 11/10/2026 ; reclassée ✉️ → 🔒) | VF Guedeney & Fermanian 1998 à vérifier | Demande RCPsych obligatoire (MEL-351, avec MADRS) |
| FSQ | ✉️ | Jette et al. 1986 | Répertorié comme gratuit (Shirley Ryan AbilityLab) ; usage commercial non mentionné | VF Martin 1993 à vérifier | Implémentable si VF accessible |
| FTND | ✉️ | Heatherton, Fagerström et al. 1991 ; mise en forme © HAS 2014 | Reproduction sans autorisation ; usage commercial non mentionné | VF HAS | Implémentée |
| IUS | ✉️ | Freeston et al. 1994 (laboratoire Dugas, UQO) | Idem | Originale FR | Implémentée (ÉII) ; contact groupé UQO |
| PDEQ | ✉️ | Marmar, Weiss & Metzler ©1997 ; VF Brunet & Routhier 1999 | Diffusé librement par le Cn2r à visée clinique ; usage commercial à confirmer | VF validée | Implémentée ; confirmation recommandée |
| PSI-II | ✉️ | Gosselin et al. 2003 / laboratoire Dugas (UQO) | Formulaire diffusé publiquement par le laboratoire des auteurs, sans phrase de licence | Originale FR (UQO), article 2003 sur abonnement | Implémentée ; contact groupé |
| PSWQ | ✉️ | Meyer et al. 1990 ; VF « © Tous droits réservés » Gosselin et al. (Université Laval) | Libre pour la clinique et la recherche ; VF sous copyright des traducteurs | VF QIPS validée | Implémentée ; confirmation traducteurs |
| QAP | ✉️ | Gosselin, Ladouceur & Pelletier 2005 / laboratoire Dugas (UQO) | Formulaire et fiche de cotation diffusés par le laboratoire (uqo.ca/…/anxiete/qap.pdf), sans phrase de licence | Originale FR (UQO), 12 items, score total | Implémentable |
| SCARED | ✉️ | B. Birmaher (University of Pittsburgh) | « free to use in clinical practice and research » ; commercial non mentionné | VF fr-CA (Pittsburgh) sans validation retrouvée ; VF validée = SCARED-R (autre instrument) | Bloquée (VF) |
| WAQ | ✉️ | Dugas et al. 2001 (laboratoire Dugas, UQO) | Diffusé publiquement par le laboratoire, sans phrase de licence | Originale FR | Implémentée (QIA) ; contact groupé UQO |
| ADRS | ✅ | Revah-Lévy et al. 2007 | Article BMC Psychiatry sous CC BY 2.0 (PMC1785378) | Originale FR, validée, accessible | Implémentée |
| ASRS | ✅ (6 items) / 🔒 (18 items) | NYU et Harvard (Kessler) | « The screener is freely available for clinical and non-clinical use, including commercial use… no other modifications, other than creating electronic versions, are permitted » (6 items) ; 18 items : licence via NYU (license.tov.med.nyu.edu) | VF officielle NYU `6Q_French_final.pdf` (archivée) | Écran 6 items implémentable ; 18 items : demande de licence NYU |
| BAT-G | ✅ | Schaufeli, De Witte & Desart (KU Leuven) | « non-proprietary and may be used free of charge without requesting permission » | VF France officielle non validée ; VF franco-canadienne validée (2025) non publiée | Bloquée (VF) |
| BAT-W | ✅ | Schaufeli, De Witte & Desart (KU Leuven) | Idem BAT-G | Idem BAT-G | Bloquée (VF) |
| BIG-5 | ✅ (si version IPIP) | International Personality Item Pool | « public domain… free for any use, commercial or academic, without permission » (ipip.ori.org) ; version Mentaal à confirmer | VF IPIP à identifier | Vérifier qu'une VF validée existe |
| BPRS | ✅ | Overall & Gorham 1962 | Domaine public (financement VA / NIMH, œuvre du gouvernement fédéral américain) | VF à vérifier | Hétéro-évaluation |
| CAT-Q | ✅ | Hull et al. 2019 | Article sous CC BY 4.0, questionnaire en annexe | VF Bureau et al. 2024 (JADD, sur abonnement) | Bloquée (VF inaccessible) |
| CGI | ✅ | W. Guy 1976 (NIMH, ECDEU) | Œuvre du gouvernement fédéral américain (domaine public) | VF à vérifier | Hétéro-évaluation |
| DASS-21 | ✅ (avec conditions) | Lovibond & Lovibond (UNSW) | « The DASS questionnaire is in the public domain, and so permission is not needed to use it » (FAQ 3) ; conditions : pas de score au répondant (FAQ 9) | VF Ottawa (Canada), validation 2018 non consultée | Mécanisme à créer (sévérité par sous-échelle) |
| GAD-7 | ✅ | Pfizer / Spitzer, Kroenke et al. | « no permission required to reproduce, translate, display or distribute » | VF Pfizer | Implémentée |
| HAM-A | ✅ | M. Hamilton 1959 | « The Hamilton Anxiety Rating Scale is in the public domain » | VF à vérifier | Hétéro-évaluation |
| HDRS | ✅ | M. Hamilton 1960 | « The HAM-D is in the public domain » | VF à vérifier | Hétéro-évaluation (future passation en séance) |
| LEC-5 | ✅ | National Center for PTSD | Diffusé en accès libre par le NCPTSD (ptsd.va.gov) | VF Cn2r à vérifier | Mécanisme à créer (multi-choix par item) |
| MEQ-SA | ✅ | Horne & Östberg 1976 | « freely available, so it can be used without permission » (ATS, sleep questionnaires) | VF Taillard et al. (travailleurs français) à vérifier | Domaine à créer (sommeil) |
| PCL-5 | ✅ | National Center for PTSD ; VF Ashbaugh et al. 2016 (CC BY) | Domaine public ; traduction CC BY | VF validée | Implémentée |
| PCL-S | ✅ | National Center for PTSD | Domaine public (NCPTSD) | VF Yao et al. 2003 sur abonnement | Bloquée (VF inaccessible) |
| PDI | ✅ | A. Brunet et al. 2001 (VF originale) | « in the public domain, and the source must be mentioned » (INSPQ) ; VF diffusée par le Cn2r (cn2r.fr/…/PDI_Cn2r.pdf) | VF Jehel 2005 (Cn2r) ; variante québécoise INSPQ distincte | Implémentable |
| PHQ-9 | ✅ | Pfizer / Spitzer, Kroenke et al. | Idem GAD-7 | VF Pfizer | Implémentée |
| RIASEC | ✅ (si O*NET Interest Profiler) | US Department of Labor (O*NET) | Interest Profiler Short Form sous CC BY 4.0 (onetcenter.org) ; le Self-Directed Search de Holland est chez PAR (💰) | VF à identifier | Hors champ clinique ; vérifier la version |
| RSES | ✅ | M. Rosenberg (University of Maryland) ; VF © Vallières & Vallerand 1990 | « now in the public domain, meaning you may use it without charge » (socy.umd.edu) ; VF sous copyright des traducteurs | VF validée | Implémentée ; confirmation traducteurs recommandée |
| SNAP-IV | ✅ | J. M. Swanson | Largement diffusé en accès libre (domaine public selon les sources secondaires) | Seule VF trouvée marquée « non validée » | Bloquée (VF) |
| ADHD-RS | 💰 | Guilford Press (DuPaul et al.) | Reproduction réservée aux acheteurs du manuel, pour leurs propres patients (guilford.com) | — | No-go |
| ASTA-20 | 💰 | Outil propriétaire Mentaal | Outil maison d'un concurrent | — | No-go |
| BAI | 💰 | Pearson (Beck) | Éditeur commercial (notoriété ; non re-vérifié) | — | No-go |
| BDI | 💰 | Pearson (Beck) | Éditeur commercial (notoriété ; non re-vérifié) | — | No-go ; cf. MEL-346 |
| BHS | 💰 | Pearson (Beck) | Éditeur commercial (notoriété ; non re-vérifié) | — | No-go |
| BSS | 💰 | Pearson (Beck) | Éditeur commercial (notoriété ; non re-vérifié) | — | No-go |
| CAT | 💰 | ESF Éditeur (D. Chalvin, « L'affirmation de soi », 1980) | Test publié dans un ouvrage de l'éditeur ESF | — | No-go (éditeur identifié) |
| CDI | 💰 | Outil propriétaire Mentaal (« distorsions cognitives ») | Outil maison d'un concurrent | — | No-go |
| CDI (enfant) | 💰 | MHS | Éditeur commercial (notoriété ; non re-vérifié) | — | No-go |
| CDRS-R | 💰 | WPS | Éditeur commercial (notoriété ; non re-vérifié) | — | No-go |
| EDI-2 | 💰 | PAR / Pearson (Garner) | Éditeur commercial | — | No-go |
| EPI | 💰 | EdITS / Hodder | Éditeur commercial (notoriété ; non re-vérifié) | — | No-go |
| FSS | 💰 | EdITS (Wolpe & Lang, FSS-III) | Publié par EdITS / Educational and Industrial Testing Service (Buros) | — | No-go (éditeur identifié) |
| GHQ | 💰 | GL Assessment | Copyright GL Assessment (licences via Mapi Research Trust) | — | No-go |
| HAD | 💰 | GL Assessment (licences hors Royaume-Uni : Mapi Research Trust) | « protected worldwide by international copyright… all rights reserved to GL Assessment » | — | No-go |
| IASTA-Y | 💰 | Mind Garden (VF : ECPA) | Éditeur commercial (notoriété ; non re-vérifié) | — | No-go |
| IAT | 💰 | Stoelting (K. Young) | « No part of the IAT product may be reproduced… without written permission from the publisher » (stoeltingco.com) | — | No-go |
| IPDE | 💰 | OMS / NIH (Loranger et al.) — vendu par Hogrefe et PAR | Publication commerciale (hogrefe.com, parinc.com) | — | No-go |
| MASC | 💰 | MHS | Éditeur commercial (notoriété ; non re-vérifié) | — | No-go |
| MBI | 💰 | Mind Garden | Éditeur commercial | — | No-go |
| Minimult | 💰 | University of Minnesota Press (MMPI) | Éditeur commercial (notoriété ; non re-vérifié) | — | No-go |
| MSQ | 💰 | Outil propriétaire Mentaal | Outil maison d'un concurrent | — | No-go |
| NEO-PI-R | 💰 | PAR (VF : Hogrefe) | Éditeur commercial (notoriété ; non re-vérifié) | — | No-go |
| QPC-L | 💰 | Outil propriétaire Mentaal | Outil maison d'un concurrent | — | No-go |
| QPC-S | 💰 | Outil propriétaire Mentaal | Outil maison d'un concurrent | — | No-go |
| SAS-SR | 💰 | MHS | Éditeur commercial (notoriété ; non re-vérifié) | — | No-go |
| SCID-II-PQ | 💰 | American Psychiatric Association Publishing | Éditeur commercial | — | No-go |
| SCL-90-R | 💰 | Pearson | Publié par Pearson Clinical Assessment | — | No-go |
| TCI | 💰 | C. R. Cloninger (Center for Psychobiology of Personality, Washington University) | « Copyright… all rights reserved… distribution is not permitted without express written permission » ; achat et licence (psychobiology.wustl.edu) | — | No-go (vendu sous licence) |
| TOMQ-36 | 💰 | Outil propriétaire Mentaal | Outil maison d'un concurrent | — | No-go |
| YSQ-L3 | 💰 | Schema Therapy Institute (J. Young) | Licence payante | — | No-go |
| YSQ-S3 | 💰 | Schema Therapy Institute (J. Young) | Licence payante | — | No-go |

---

# Partie 2 — Benchmark catalogue Mentaal

> ⚠️ **Snapshot figé (extraction 2026-07-15)** — sert de référence de
> priorisation. L'état Melya à jour vit dans la partie 1 ci-dessus (les
> mentions « 6 échelles Melya » ci-dessous sont datées).
>
> Relevé du catalogue de [mentaal.fr](https://mentaal.fr/outils) — concurrent direct
> (même positionnement psys, HDS Scaleway, passation sans compte patient, ~10 €/mois illimité).

## Chiffres clés

- **~424 outils référencés** au catalogue total (dont beaucoup en « bientôt disponibles » / « non disponibles » — le formulaire « un outil vous manque ? » sert à capter la demande + SEO).
- **75 outils réellement disponibles** (filtre `?status=available`) — listés ci-dessous.
- Deux badges Mentaal : **Standardisé** (échelle publiée) vs **Communauté** (outil maison / contribué, non standardisé).
- **Les 6 échelles de Melya sont un sous-ensemble strict des leurs** (LSAS, PHQ-9, GAD-7, PCL-5, Y-BOCS, RSES). Aucune échelle Melya n'est absente de Mentaal.

## ⚠️ Avertissement sur la colonne « Droits »

La colonne **Droits est une estimation, PAS une clearance juridique.**

- ✅ = *vraisemblablement libre*, mais **à confirmer contre la source primaire** avant toute intégration.
- 💰 = éditeur commercial identifié (licence payante à la passation) — **à éviter** (cf. décision projet : catalogue Melya = libre de droits uniquement).
- ⚠️ = statut incertain / à instruire.

La présence d'une échelle chez Mentaal **ne prouve pas** qu'elle est libre : ils diffusent MBI, YSQ, EDI-2 (tous payants). On ne construit rien sur leur catalogue comme précédent. Voir le fil de décision sur les droits + le `RECETTE_PLAYBOOK.md`.

## Liste des 75 outils disponibles

Ordre = ordre d'affichage Mentaal (reflète vraisemblablement leur curation / popularité).

| # | Acronyme | Nom | Type | Droits (est.) | Melya |
|---|----------|-----|------|---------------|-------|
| 1 | CDI¹ | Inventaire des distorsions cognitives | Communauté | ⚠️ | |
| 2 | DASS-21 | Échelle de dépression, d'anxiété et de stress | Standardisé | ✅ | |
| 3 | ASRS | Échelle d'auto-évaluation du TDAH chez l'adulte | Standardisé | ✅ (OMS) | |
| 4 | AQ | Quotient du spectre de l'autisme | Standardisé | ✅ | |
| 5 | YSQ-L3 | Questionnaire des schémas de Young (version longue) | Standardisé | 💰 | |
| 6 | RAADS-R | Échelle diagnostique de l'autisme et de l'Asperger de Ritvo | Standardisé | ✅ | |
| 7 | RSES | Échelle d'estime de soi de Rosenberg | Standardisé | ✅ | ✓ |
| 8 | GAD-7 | Échelle de dépistage du TAG | Standardisé | ✅ | ✓ |
| 9 | CAT-Q | Questionnaire sur les traits autistiques de camouflage | Standardisé | ✅ | |
| 10 | ASQ-SF | Questionnaire des styles d'attachement | Standardisé | ⚠️ | |
| 11 | EQ | Quotient empathique | Standardisé | ✅ | |
| 12 | YSQ-S3 | Questionnaire des schémas de Young (version courte) | Standardisé | 💰 | |
| 13 | LSAS | Échelle d'anxiété sociale de Liebowitz | Standardisé | ✅ | ✓ |
| 14 | DERS | Échelle des difficultés de régulation émotionnelle | Standardisé | ✅ | |
| 15 | SCT | Test de confiance en soi | Standardisé | ⚠️ | |
| 16 | ADHD-RS | Échelle d'évaluation du TDAH | Standardisé | ⚠️⁸ | |
| 17 | PID-5 | Inventaire de personnalité pour le DSM-5 | Standardisé | ✅ (APA) | |
| 18 | PHQ-9 | Questionnaire santé patient | Standardisé | ✅ | ✓ |
| 19 | HSPS | Questionnaire hypersensibilité d'Elaine Aron | Standardisé | ✅ | |
| 20 | PCL-5 | Échelle de mesure du TSPT pour le DSM-5 | Standardisé | ✅ | ✓ |
| 21 | RAS | Échelle d'affirmation de soi de Rathus | Standardisé | ✅ | |
| 22 | SCID-II-PQ | Questionnaire de dépistage des troubles de personnalité | Standardisé | 💰 (SCID/APA) | |
| 23 | SNAP-IV | Échelle TDAH chez l'enfant | Standardisé | ✅ | |
| 24 | PDQ-4 | Questionnaire diagnostique des personnalités | Standardisé | ⚠️ | |
| 25 | WAQ | Questionnaire sur l'inquiétude et l'anxiété | Standardisé | ✅ | |
| 26 | IUS | Échelle d'intolérance à l'incertitude | Standardisé | ✅ | |
| 27 | ASTA-20 | Évaluation de l'anxiété d'état et de trait | Communauté | ⚠️² | |
| 28 | BPQ | Questionnaire de la personnalité borderline | Standardisé | ⚠️ | |
| 29 | SDQ | Questionnaire des forces et des difficultés | Standardisé | ⚠️³ | |
| 30 | MDQ | Questionnaire sur les troubles de l'humeur | Standardisé | ✅ | |
| 31 | MBI | Inventaire du burnout de Maslach | Standardisé | 💰 (Mind Garden) | |
| 32 | CAQ | Questionnaire des évitements cognitifs | Standardisé | ⚠️ | |
| 33 | BIG-5 | Big Five — modèle des 5 grands facteurs | Standardisé | ⚠️⁴ | |
| 34 | SCARED | Dépistage des troubles anxieux chez l'enfant | Standardisé | ✅ | |
| 35 | PPAG | Phobie, panique, anxiété généralisée | Standardisé | ⚠️ | |
| 36 | PCL-S | Évaluation d'un état de stress post-traumatique | Standardisé | ✅ | |
| 37 | TAS-20 | Échelle d'alexithymie de Toronto | Standardisé | ✅ | |
| 38 | ASSQ | Questionnaire de dépistage des TSA chez l'enfant | Standardisé | ✅ | |
| 39 | SCQ | Questionnaire des cognitions sociales | Standardisé | ⚠️ | |
| 40 | GAD-SBQ | Comportements sécurisants du TAG | Standardisé | ⚠️ | |
| 41 | CAT | Test d'assertivité de Chalvin | Standardisé | ⚠️ | |
| 42 | EDQ | Questionnaire de dépendance affective | Standardisé | ⚠️ | |
| 43 | TOMQ-36 | Questionnaire de la théorie de l'esprit | Communauté | ⚠️ | |
| 44 | Y-BOCS | Échelle du TOC de Yale-Brown | Standardisé | ✅ | ✓ |
| 45 | FMPS | Échelle multidimensionnelle du perfectionnisme de Frost | Standardisé | ✅ | |
| 46 | MSQ | Questionnaire sur le sommeil | Communauté | ⚠️ | |
| 47 | EDI-2 | Inventaire des troubles alimentaires | Standardisé | 💰 (Pearson) | |
| 48 | BAT-G | Outil d'évaluation du burnout (version générale) | Standardisé | ✅ | |
| 49 | IES-R | Échelle d'impact des événements | Standardisé | ✅ | |
| 50 | SVS | Questionnaire des valeurs de Schwartz | Standardisé | ✅ | |
| 51 | COPSOQ | Évaluation des risques psychosociaux | Standardisé | ✅⁵ | |
| 52 | EAT-26 | Test des attitudes alimentaires | Standardisé | ✅ | |
| 53 | PSWQ | Questionnaire d'inquiétude de Penn State | Standardisé | ✅ | |
| 54 | QPC-L | Questionnaire de première consultation (long) | Communauté | ⚠️ | |
| 55 | SPRS | Échelle de cotation de la phobie sociale | Standardisé | ⚠️ | |
| 56 | QAP | Questionnaire des attitudes face aux problèmes | Standardisé | ⚠️ | |
| 57 | ADRS | Échelle de dépression pour adolescents | Standardisé | ✅ | |
| 58 | WW-II | Pourquoi s'inquiéter ? | Standardisé | ✅ | |
| 59 | PDEQ | Expériences dissociatives péritraumatiques | Standardisé | ✅ | |
| 60 | CST | Questionnaire sur le stress de Cungi | Standardisé | ⚠️ | |
| 61 | BAT-W | Outil d'évaluation du burnout (version travail) | Standardisé | ✅ | |
| 62 | RIASEC | Test des intérêts professionnels | Standardisé | ⚠️⁶ | |
| 63 | ASA-27 | Anxiété de séparation chez l'adulte | Standardisé | ⚠️ | |
| 64 | FSS | Échelle des peurs | Standardisé | ⚠️ | |
| 65 | BSQ | Questionnaire des sensations corporelles | Standardisé | ✅ | |
| 66 | AUDIT | Troubles liés à la consommation d'alcool | Standardisé | ✅ (OMS) | |
| 67 | FQ | Questionnaire des peurs de Marks & Mathews | Standardisé | ✅ | |
| 68 | PVQ-RR | Questionnaire des valeurs par portraits | Standardisé | ✅ | |
| 69 | CRIES-13 | Stress post-traumatique de l'enfant | Standardisé | ✅ | |
| 70 | CUDIT | Troubles liés à l'usage de cannabis | Standardisé | ✅ | |
| 71 | IAT | Test d'addiction à Internet | Standardisé | ⚠️⁷ | |
| 72 | QPC-S | Questionnaire de première consultation (court) | Communauté | ⚠️ | |
| 73 | EDS-R | Échelle de dépendance à l'exercice | Standardisé | ✅ | |
| 74 | THI | Questionnaire d'handicap pour acouphènes | Standardisé | ✅ | |

_(Ligne « Créez votre propre questionnaire » exclue — c'est une fonctionnalité, pas un outil.)_

### Notes

1. **CDI** ici = *Inventaire des distorsions cognitives* (outil communauté Mentaal), **PAS** le Children's Depression Inventory de Pearson (payant). Homonymie d'acronyme à ne pas confondre.
2. **ASTA-20** : variante « communauté » proche de la STAI (Spielberger, Hogrefe, payante). À traiter avec prudence — préférer une alternative libre (STICSA).
3. **SDQ** : gratuit en version papier, mais **licence requise pour usage électronique/commercial** — exactement le cas de Melya. À ne pas intégrer sans licence.
4. **BIG-5** : les items IPIP sont domaine public, mais « Big Five » recouvre des versions au statut variable. Confirmer la version exacte.
5. **COPSOQ** : libre pour usage non commercial ; l'usage commercial demande une vérification.
6. **RIASEC / Holland** : le modèle est libre, mais le Self-Directed Search (PAR) est payant. Dépend de la version des items.
7. **IAT** (Young) : diffusé par Stoelting — statut de licence à vérifier avant tout usage.
8. **ADHD-RS** (DuPaul) : diffusé par **Guilford Press** (formulaires reproductibles sous conditions) — statut à revérifier avant usage électronique commercial. Alternative TDAH libre : **ASRS** (OMS). Corrigé de ✅ → ⚠️.

## 🔧 Implémentables directement (libre × réutilise UI + scoring existants)

Parmi les 75, ceux qu'on peut porter **sans nouvelle UI/UX ni nouvelle brique de calcul** — filtrés sur **libre de droits ✅** ET **réutilisation des méthodes en place** (formTypes `single-scale`/`options`/`dual-scale`, `reverseItems`, subscores, `criteriaCheck`, `alerts`, `ScoreArcGauge`, `CriteriaCheckBlock`). Exclus d'office : les 6 déjà dans Melya, les payantes 💰, les droits incertains ⚠️, les outils Communauté maison.

Rappel : ✅ = estimation à recocher contre la source primaire avant intégration.

### 🟢 Tier 1 — réutilisation quasi-totale (data + scorer « somme » type GAD-7)

Likert/options unique, scoring = somme + seuils. Scorer = copier-coller de `gad7.ts`. Zéro nouvelle logique.

| Échelle | Motif | Format |
|---------|-------|--------|
| **AUDIT** | Addictions alcool | `options` (réponses par item) + somme + seuil |
| **CUDIT** | Addictions cannabis | idem AUDIT |
| **IUS** | Intolérance à l'incertitude | Likert + somme |
| **WAQ** | Inquiétude / anxiété (Dugas) | Likert 0-8 + somme |
| **PSWQ** | Inquiétude (Penn State) | Likert + `reverseItems` + somme |
| **PDEQ** | Dissociation péritraumatique | Likert + somme |
| **BSQ** | Sensations corporelles (panique) | Likert + somme |
| **HSPS** | Hypersensibilité (Aron) | Likert + somme |
| **THI** | Acouphènes (ORL — hors psycho) | 3 options + somme + grades |

### 🟡 Tier 2 — UI réutilisée + scorer dédié déjà « patterné »

Même UI de passation, scoring = subscores / `criteriaCheck` / reverse / recode → scorer ~20-30 l. calqué sur PCL-5, Y-BOCS, LSAS ou RSES. Toujours zéro nouvelle UI.

| Échelle | Motif | Pattern réutilisé |
|---------|-------|-------------------|
| **ASRS** ⭐ | TDAH adulte | `criteriaCheck` (PCL-5) — cases grisées |
| **MDQ** | Bipolarité | `criteriaCheck` + réponses oui/non |
| **TAS-20** | Alexithymie | reverse + 3 subscores |
| **DERS** | Régulation émotionnelle | reverse + subscores |
| **IES-R** | Impact d'un événement | 3 subscores |
| **BAT-G / BAT-W** | Burnout (alt. libre au MBI) | subscores |
| **FMPS** | Perfectionnisme | subscores |
| **WW-II** | Inquiétude (pourquoi s'inquiéter) | subscores |
| **FQ** | Peurs / phobies | subscores |
| **EAT-26** | TCA | recode asymétrique + seuil |
| **RAS** | Affirmation de soi (Rathus) | reverse + offset |
| **CAT-Q** | Camouflage autistique | 7 pts + reverse + subscores |
| **EQ** | Empathie | recode + reverse |
| **AQ** ⚠️lourd | Autisme (50 items) | recode binaire + 5 subscores |
| **RAADS-R** ⚠️lourd | Autisme (80 items) | recode + subscores |
| **EDS-R** | Dépendance à l'exercice | criteria + subscores |
| **SCARED, ASSQ, SNAP-IV, CRIES-13** | Anxiété / TSA / TDAH / trauma **enfant** | subscores — **public ≠ le vôtre** |

### Exclus du « direct » parmi les 75 (et pourquoi)

- **DASS-21** → 🟠 chaque sous-échelle a sa **propre sévérité**, or `Subscore` ne porte pas de `ranges` → petite extension du type à faire une fois.
- **PID-5** → réutilisable mais **220 items** (ou brève 25) : volume de data énorme.
- **SVS / PVQ-RR** (valeurs de Schwartz) → centrage ipsatif = calcul spécifique + usage clinique niche.
- **ADHD-RS** → repassé en ⚠️ : DuPaul/**Guilford**, statut à revérifier (marqué ✅ un peu vite plus haut).
- **COPSOQ** → transform 0-100 + usage commercial à vérifier.
- **PCL-S** → réutilisable, mais redondant avec PCL-5 déjà en place.

> ⚠️ **Deux nuances honnêtes.** (1) Les ✅ restent des estimations — plusieurs Tier 1/2 sont des échelles TCC françaises (WAQ, WW-II, PDEQ) ou anglo-saxonnes libres pour la recherche (BAT, TAS-20, IES-R) : chacune passe par la recoche source avant intégration. (2) « Recode » ≠ « somme » — AQ / EQ / RAADS-R / EAT-26 / RAS demandent une **logique de cotation par item** (vrai scorer à écrire, même s'il suit un pattern connu). Seul le Tier 1 est du quasi-pur data.

**Premier lot « zéro risque technique »** = Tier 1 (AUDIT, IUS, PSWQ, BSQ, HSPS…) + **ASRS** du Tier 2 pour l'impact motif.

## Lecture stratégique

- **Bloc neurodéveloppemental massif chez eux** (AQ, RAADS-R, CAT-Q, EQ, ASSQ, SCQ, ADHD-RS, ASRS, SNAP-IV) → **le plus gros trou de Melya**. Point d'entrée recommandé : **ASRS** (OMS, libre, motif TDAH adulte très demandé).
- **Motifs couverts chez eux, absents chez Melya, avec candidats libres** : addictions (AUDIT, CUDIT ✅), sommeil (leur MSQ est « communauté » — trou réel : ni ISI ni PSQI), TCA (EAT-26 ✅), burnout (BAT ✅ — alternative libre au MBI), régulation émotionnelle (DERS ✅), alexithymie (TAS-20 ✅).
- **Où Melya peut être DEVANT** : sommeil (ISI/PSQI validés — absents de leur catalogue standardisé), bien-être / mesure de routine (WHO-5 — absent chez eux, et idéal pour le suivi longitudinal qui est le moat de Melya).
- **Payantes à ignorer** : YSQ-L3/S3, MBI, EDI-2, SCID-II-PQ. Substituts libres : MSS-YSQ (schémas), BAT (burnout), EAT-26 (TCA).

---

## 🎯 Shortlist actionable — voté × libre de droits

Croisement demande (votes Mentaal) × statut de droits (estimation à confirmer) × coût d'implémentation × motif ouvert. Objectif : quoi construire, dans quel ordre.

Rappel : ✅ = vraisemblablement libre (à recocher contre la source primaire), ⚠️ = à instruire, 💰 = payant → écarté.

### File d'attente recommandée (adulte — cohérent avec le positionnement actuel)

| Ordre | Échelle | Votes | Droits | Items | Motif ouvert | Pourquoi |
|-------|---------|-------|--------|-------|--------------|----------|
| 1 | **ASRS** | (dispo) | ✅ OMS | 18 | TDAH adulte | Motif le + demandé (3 outils chez eux), petit scorer Partie A. Déjà argumenté. |
| 2 | **AUDIT** | (dispo) | ✅ OMS | 10 | Addictions alcool | Motif absent chez vous, scoring trivial. Idéal test pipeline. |
| 3 | **DES** | **130** 🥇 | ✅ Bernstein-Putnam | 28 | Dissociation / trauma | #1 des votes. Auto-report, libre. Ouvre un motif à forte demande. |
| 4 | **EPDS** | 96 | ✅ | 10 | Dépression périnatale | Court, répétable → nourrit le suivi longitudinal. Nouveau public (périnat). |
| 5 | **DASS-21** | (dispo) | ✅ Lovibond | 21 | Stress (+ dép/anx) | 3 sous-échelles, teste le modèle subscores. N'ajoute que le stress. |
| 6 | **ATQ** | 77 | ✅ Hollon-Kendall | 30 | Pensées automatiques | Très TCC, complète PHQ-9/GAD-7 (cognitions dépressives). |
| 7 | **PDSS** | 62 | ⚠️ ✉️ Shear | 7 | Trouble panique | Court, complète la suite anxiété. |
| 8 | **DERS** | (dispo) | ✅ Gratz-Roemer | 36 | Régulation émotionnelle | Motif transdiagnostique très demandé. |
| 9 | **AUDIT→CUDIT / FTND** | 29 (FTND) | ✅ | 6-8 | Addictions (cannabis/tabac) | Complète le motif addictions une fois AUDIT en place. |
| 10 | **TAS-20** | (dispo) | ✅ Bagby | 20 | Alexithymie | Motif neuf, scoring simple. |

**Autres candidats adultes libres & votés à garder en réserve** : BIS-11 (77, impulsivité), UPPS (96, impulsivité — attention version), ACE (73, ATCD trauma enfance chez l'adulte), OCI-R (24, TOC auto-report), MADRS/HAM-A (hétéro-évaluées → format différent), IES-R (dispo, impact événements), PSWQ (dispo, inquiétude), EAT-26 (dispo, TCA), BAT (dispo, burnout — alternative libre au MBI).

### Option stratégique — le cluster enfant / ado (gros votes, mais changement de public)

Les votes les plus forts après DES pointent vers la **pédopsychiatrie**, un public que vos 6 échelles actuelles ne servent pas (et qui pose une question d'UX : qui remplit — parent ou enfant ?).

| Échelle | Votes | Droits | Public | Motif |
|---------|-------|--------|--------|-------|
| RCADS-47 | 106 | ✅ Chorpita | Enfant/ado | Anxiété + dépression |
| SCAS | 100 | ✅ Spence | Enfant | Anxiété |
| VADRS (Vanderbilt) | 88 | ✅ NICHQ | Enfant | TDAH |
| M-CHAT | 76 | ✅ Robins | Jeune enfant | Dépistage TSA |
| CY-BOCS | 75 | ✅ | Enfant | TOC |

→ **Décision de positionnement, pas juste d'ajout.** À trancher selon la cible beta. Fort si vous visez des (pédo)psychologues ; hors-sujet si vos beta testeurs sont adultes-only.

### Écartées malgré des votes élevés (droits)

YPI (121, Young/Schema Inst. 💰), CBCL (83, ASEBA 💰), PSI (79, PAR 💰), CDI-2 (69, MHS/Pearson 💰), Barkley BSSQ/BHSQ (63/56, Guilford 💰), Piers-Harris PHCSCS-2 (60, WPS 💰), DAS-32 (95, MHS ⚠️/💰). Toute la liste « non disponibles » (BDI, STAI-Y, HAD, Wechsler, Conners…) est payante par construction.

### Ma reco de séquencement

**ASRS ou AUDIT en #1** (valider la chaîne sur du simple + libre + motif neuf), puis **DES en #2** pour capitaliser sur le vote le plus fort. EPDS et DASS-21 juste après (courtes, répétables, motifs neufs). Le cluster enfant est un chantier séparé à décider avec la cible beta, pas à mélanger dans ce premier lot.

### Classement de faisabilité — réutilisation des méthodes existantes

Vérifié sur le code (`packages/core/src/types` + `apps/api/src/scoring/scorers` + `apps/web/components/passation`). Briques réutilisables déjà en place :
- **UI passation** : `formType` `single-scale` (PHQ-9/GAD-7), `options` (Y-BOCS), `dual-scale` (LSAS) ; `sectionIntros` (A/B, Y-BOCS) ; `reverseItems` (RSES) ; `followUpItem` non scoré (PHQ-9) ; IntroScreen / ProgressBar / revue / transitions automatiques.
- **Scoring** : scorer générique (somme + `ranges`) ; scorer dédié à **subscores** (Y-BOCS, LSAS, PCL-5) ; scorer à **`criteriaCheck`** = décompte-critères façon dépistage (PCL-5, via `countEndorsed`) ; **alerts** item critique (PHQ-9 item 9).
- **Résultats** : `ScoreArcGauge` (si `ranges ≥ 2`), `CriteriaCheckBlock` (dépistage positif/négatif), affichage subscores.

Classes :
- 🟢 **A — réutilisation totale, scorer générique** : data + somme + seuils. Aucun code neuf notable.
- 🟡 **B — UI réutilisée, scorer dédié déjà "patterné"** (subscores ou `criteriaCheck`). ~30 lignes.
- 🟠 **C — petit ajout** : sévérité **par sous-échelle** (non portée par `Subscore` aujourd'hui) ou **widget de réponse** différent des boutons Likert.
- 🔴 **D — hors flux actuel** : hétéro-évaluation clinicien / entretien (pas d'auto-passation patient).

| Échelle | Classe | Méthode réutilisée | Net-new |
|---------|--------|--------------------|---------|
| **ASRS** | 🟡 B | single-scale + sectionIntros (A/B) + scorer `criteriaCheck` (cases grisées) façon PCL-5 | scorer ~30 l. ; seuils Partie A à sourcer (OMS) |
| **AUDIT** | 🟢 A | `options` (réponses par item hétérogènes) + somme + seuils | data seule (+ scorer générique) |
| **EPDS** | 🟢 A | single-scale + `reverseItems` + `alerts` (item 10 = idéation suicidaire, comme PHQ-9 item 9) | data + 1 règle d'alerte |
| **ATQ** | 🟢 A | single-scale (Likert 1-5) + somme + seuils | data seule |
| **PDSS** | 🟢 A | single-scale (0-4) + somme + seuils | data seule |
| **PSWQ** | 🟢 A | single-scale + `reverseItems` + somme + seuils | data seule |
| **TAS-20** | 🟡 B | single-scale + reverse + 3 subscores (total interprété) | scorer subscores ~20 l. |
| **IES-R** | 🟡 B | single-scale + 3 subscores | scorer subscores ~20 l. |
| **DERS** | 🟡 B | single-scale + reverse + subscores | scorer subscores |
| **DASS-21** | 🟠 C | single-scale + 3 sous-échelles **avec sévérité propre** | `Subscore` ne porte pas de `ranges`/interprétation → petite extension du type |
| **DES** | 🟠 C | scorer trivial (moyenne), mais réponse **0–100 / 0–10** = widget ≠ boutons Likert | nouveau widget de réponse (slider/échelle 11 pts) |
| **MADRS / HAM-A / HDRS** | 🔴 D | hétéro-évaluation par le clinicien | nouveau flux praticien (hors passation patient) |

**Lecture** : le premier lot le moins risqué techniquement = les 🟢 A (AUDIT, EPDS, ATQ, PDSS, PSWQ) + l'🟡 B **ASRS** (qui ne coûte qu'un scorer, et ouvre le motif le plus demandé). **DASS-21** et **DES**, malgré leur intérêt, demandent chacun une petite évolution de brique (sévérité par sous-échelle ; widget de réponse) — à faire une fois, mais pas en tout premier. Les hétéro-évaluées (MADRS…) sont **hors périmètre** du flux d'auto-passation actuel.

---

## Non disponibles (49) — la file d'attente des payantes

Ces outils apparaissent au catalogue avec un badge **« Non disponible »** (pas d'acronyme cliquable) et **portent quand même des votes**. C'est la liste la plus instructive du site : ce sont presque tous des instruments **sous licence d'éditeur** que Mentaal ne peut pas diffuser — exactement la frontière qu'on s'est fixée. Elle confirme, de leur propre main, quelles échelles sont payantes.

| Votes | Outil | Éditeur / statut probable |
|-------|-------|----------------------------|
| 74 | BDI — Inventaire de dépression de Beck | 💰 Pearson/ECPA |
| 53 | DIVA — Entretien diagnostique TDAH adulte | 💰 licence |
| 44 | Conners 3 | 💰 MHS |
| 43 | HAD — Anxiété et dépression (HADS) | 💰 GL Assessment/Hogrefe |
| 42 | STAI-Y — Anxiété état-trait (Spielberger) | 💰 Hogrefe/Mind Garden |
| 38 | ADOS-2 — Observation diagnostic autisme | 💰 Hogrefe/WPS |
| 35 | BAI — Inventaire d'anxiété de Beck | 💰 Pearson/ECPA |
| 33 | BRIEF-A — Fonctions exécutives | 💰 PAR/Hogrefe |
| 32 | BSS — Idéation suicidaire de Beck | 💰 Pearson |
| 31 | SRS-2 — Réciprocité sociale | 💰 WPS |
| 31 | CAARS-2 — TDAH adulte de Conners | 💰 MHS |
| 26 | NEO-PI-3 — Personnalité | 💰 PAR/Hogrefe |
| 24 | ADI-R — Diagnostic autisme | 💰 Hogrefe/WPS |
| 22 | WAIS-IV — Intelligence adulte (Wechsler) | 💰 Pearson |
| 21 | MINI — Entretien neuropsychiatrique international | 💰 licence |
| 18 | WISC-V — Intelligence enfant (Wechsler) | 💰 Pearson |
| 16 | SCQ — Communication sociale | 💰 WPS |
| 16 | CBRS — Échelles comportementales de Conners | 💰 MHS |
| 15 | DUNN-2 — Profil sensoriel 2 | 💰 Pearson |
| 14 | R-CMAS — Anxiété manifeste enfant | 💰 WPS |
| 14 | SCID-5 — Entretien structuré DSM-5 | 💰 APA |
| 12 | ISI — Index de sévérité de l'insomnie | ⚠️ distributeur (sommeil) |
| 11 | ToMI — Théorie de l'esprit | ⚠️ |
| 11 | Brown EF/A — Attention et fonctions exécutives | 💰 Pearson |
| 11 | SCID-5-PD — Troubles de personnalité DSM-5 | 💰 APA |
| 11 | PSQI — Qualité de sommeil de Pittsburgh | ⚠️ (sommeil) |
| 9 | SCL-90-R — Liste de symptômes | 💰 Pearson |
| 8 | BASC-3 — Comportement de l'enfant | 💰 Pearson |
| 8 | PSS — Échelle de stress perçu | ⚠️ (en réalité libre — Cohen) |
| 7 | TRAUMAQ — Traumatisme psychique | ⚠️ |
| 7 | MDI-C — Dépression composite enfant | 💰 |
| 6 | BULIT — Test de boulimie | ⚠️ |
| 5 | EC — Petite enfance de Conners | 💰 MHS |
| 5 | TAP — Performance attentionnelle | 💰 |
| 5 | SSIS — Apprentissage socio-émotionnel | 💰 Pearson |
| 5 | NEPSY-II — Bilan neuropsychologique enfant | 💰 Pearson |
| 5 | TEA — Attention quotidienne | 💰 |
| 5 | VABS — Comportement adaptatif de Vineland | 💰 Pearson |
| 5 | PCS — Catastrophisme face à la douleur | ⚠️ (en réalité libre) |
| 4 | SEI — Estime de soi de Coopersmith | 💰 |
| 4 | MMPI-2 — Personnalité du Minnesota | 💰 Pearson |
| 4 | ClaCos — Cognition sociale adulte | ⚠️ |
| 4 | PANSS — Syndromes positifs et négatifs | 💰 |
| 4 | CAS — Croyances dysfonctionnelles sur le sommeil | ⚠️ (sommeil) |
| 4 | BSQ-34 — Forme du corps | ⚠️ |
| 2 | BHS — Désespoir de Beck | 💰 Pearson |
| 2 | ADIS-5 — Troubles anxieux DSM-5 | 💰 |
| 2 | CES-D — Dépression CES-D | ⚠️ (en réalité domaine public) |
| 1 | ACSo — Cognition sociale | ⚠️ |

**Ce que cette liste révèle :**
- Le mur des **Beck (BDI, BAI, BSS, BHS)** et des **Wechsler/Conners/WPS** est infranchissable pour un modèle illimité — Mentaal l'assume en les classant « non disponibles ».
- **ISI et PSQI (sommeil) sont ici** → confirme que Mentaal n'a aucune échelle de sommeil jouable. Trou stratégique : un substitut sommeil réellement libre (à instruire) vous mettrait devant.
- Quelques échelles **libres** ont été rangées à tort en « non disponible » (PSS de Cohen, CES-D domaine public, PCS) — opportunités faciles s'ils les croient bloquées.

---

## Bientôt disponibles (305) — triés par votes

Les **votes** sont le signal de demande le plus fiable du site (les psys votent pour l'ordre de priorité). Top des motifs plébiscités : **dissociation (DES #1)**, neurodéveloppemental enfant (RCADS-47, SCAS, M-CHAT, CY-BOCS, Vanderbilt), périnatalité (EPDS), couple (DAS-32), impulsivité (UPPS, BIS-11), phobie scolaire. Beaucoup sont libres de droits — à instruire au cas par cas.

_Format : votes — acronyme — nom. Badge Communauté noté (C) le cas échéant ; tout le reste est Standardisé._

| Votes | Acr. | Nom |
|-------|------|-----|
| 130 | DES | Échelle des expériences dissociatives |
| 121 | YPI | Inventaire des attitudes parentales de Young |
| 118 | BDDQ | Questionnaire sur le trouble dysmorphique corporel |
| 117 | IPPA-R | Inventaire des liens d'attachement aux parents et aux pairs |
| 106 | RCADS-47 | Échelle révisée d'anxiété et de dépression chez l'enfant |
| 105 | ACQ | Questionnaire des cognitions agoraphobiques |
| 100 | SCAS | Échelle d'anxiété chez l'enfant |
| 96 | UPPS | Échelle de comportement impulsif UPPS |
| 96 | EPDS | Échelle de dépression postnatale d'Édimbourg |
| 95 | DAS-32 | Échelle d'ajustement dyadique (couple) |
| 93 | SBI | Inventaire d'épuisement scolaire |
| 88 | VADRS | Échelle diagnostique du TDAH de Vanderbilt |
| 86 | BITE | Test d'investigation de la boulimie d'Édimbourg |
| 84 | RASA | Affirmation de soi de Rathus pour adolescents |
| 83 | CBCL | Liste de comportements de l'enfant |
| 79 | PSI | Inventaire du stress parental |
| 79 | AQ | Questionnaire d'évaluation de l'agoraphobie |
| 77 | BIS-11 | Échelle d'impulsivité de Barratt |
| 77 | ATQ | Questionnaire des pensées automatiques |
| 76 | M-CHAT | Dépistage TSA chez les jeunes enfants |
| 75 | CY-BOCS | Yale-Brown obsessionnel-compulsif pour enfants |
| 74 | PDI | Inventaire de détresse péritraumatique |
| 74 | SPT | Test de phobie scolaire |
| 73 | ACE | Expériences négatives durant l'enfance |
| 73 | SBQ | Questionnaire de comportement social |
| 69 | DASS-42 | Dépression, anxiété et stress (42 items) |
| 69 | CDI-2 | Inventaire de dépression pour enfants |
| 69 | MIA | Inventaire de mobilité pour l'agoraphobie |
| 67 | Mini-CERTS | Stratégies de régulation cognitive des émotions |
| 64 | IGD-20 | Test du trouble du jeu vidéo |
| 64 | PEERS-Q | Questionnaire des compétences sociales |
| 63 | BSSQ | Situations scolaires de Barkley |
| 62 | BPDSI | Sévérité du trouble de personnalité borderline |
| 62 | PDSS | Sévérité du trouble panique |
| 60 | PHCSCS-2 | Estime de soi chez l'enfant |
| 59 | BSDS | Diagnostic du spectre bipolaire |
| 59 | CLH-32 | Check-list d'hypomanie |
| 58 | PARS | TDAH pour la petite enfance |
| 58 | GDS | Test d'attention de Gordon |
| 57 | ECR-R | Expériences dans les relations proches |
| 56 | STAXI-2 | Expression de la colère |
| 56 | CERQ | Régulation cognitive des émotions |
| 56 | BHSQ | Situations à la maison de Barkley |
| 56 | SMI | Inventaire des modes schématiques |
| 55 | DAS | Anxiété face à la mort |
| 55 | ITQ | Questionnaire international sur le traumatisme |
| 55 | AAI | Entretien d'attachement adulte |
| 54 | WURS | Wender Utah pour le TDAH |
| 52 | MID-60 | Inventaire multidimensionnel de la dissociation |
| 51 | SAQ | Questionnaire des attitudes sociales |
| 51 | SDQ-20 | Dissociation somatoforme |
| 49 | ACE+ | Entretien diagnostique TDAH adulte |
| 49 | MLQ | Sens de la vie |
| 49 | PSDQ | Styles parentaux et leurs dimensions |
| 47 | CTQ | Traumatismes durant l'enfance – version enfant |
| 47 | EDE-Q-A | Troubles alimentaires – version adolescent |
| 47 | RRS | Réponses ruminatives |
| 45 | MASC-2 | Anxiété multidimensionnelle chez l'enfant |
| 43 | ASCQ | Classification des styles d'attachement |
| 43 | BPNSFS | Satisfaction/frustration des besoins psychologiques |
| 43 | MSI-BPD | Dépistage McLean du trouble borderline |
| 43 | HAM-A | Anxiété d'Hamilton |
| 42 | MAIA | Conscience de soi multidimensionnelle |
| 41 | MADRS | Dépression de Montgomery et Åsberg |
| 41 | WSR | Symptômes Weiss |
| 40 | C-SSRS | Columbia — gravité du risque suicidaire |
| 38 | ECI-4 | Inventaire de la petite enfance |
| 38 | CAI | Attachement pour enfants |
| 38 | MCQ-30 | Métacognitions |
| 37 | HDRS | Dépression de Hamilton |
| 37 | CAPS-5 | TSPT administré par clinicien (DSM-5) |
| 36 | SAS | Affirmation de soi |
| 36 | BESAA | Estime corporelle ados et adultes |
| 36 | CBI | Épuisement professionnel de Copenhague |
| 36 | DEP-ADO | Usage problématique alcool/drogues chez ados |
| 35 | CTQ | Traumatismes durant l'enfance – version adulte |
| 35 | DIS-Q | Questionnaire de dissociation |
| 35 | RMS | Dépistage rapide de l'humeur |
| 35 | SCID-D | Entretien structuré des troubles dissociatifs |
| 34 | BSSQ | Spectre bipolaire — Goldberg |
| 34 | DPQ | Personnalité dépendante |
| 34 | GQ-ASC | TSA chez les filles |
| 34 | TCI | Tempérament et caractère |
| 33 | SPWSS | Résumé hebdomadaire de la phobie sociale |
| 33 | CPQ | Schémas de communication |
| 33 | PQ-16 | Symptômes prodromiques |
| 33 | CADDRA | Évaluation TDAH de la CADDRA |
| 32 | DAS | Attitudes dysfonctionnelles |
| 32 | FES | Environnement familial |
| 31 | PSOC | Compétence parentale |
| 31 | CPSS | Symptômes de stress post-traumatique chez l'enfant |
| 31 | SPIN | Inventaire de la phobie sociale |
| 31 | RRQ | Rumination et réflexion |
| 30 | DECA | Développement socio-émotionnel Devereux |
| 30 | PAAI | Attachement adulte (parental) |
| 30 | AQC | Alexithymie pour enfants |
| 30 | SIQ-JR | Idées suicidaires – Juniors |
| 29 | BBQ | Croyances bloquantes |
| 29 | CSI | Satisfaction conjugale |
| 29 | GAS | Addiction aux jeux vidéo |
| 29 | ExIS | Anxiété existentielle |
| 29 | WCQ | Stratégies d'adaptation au stress |
| 29 | PAQ-IV | Attaques de panique-IV |
| 29 | FTND | Dépendance à la nicotine de Fagerström |
| 28 | PBI | Lien parental |
| 28 | ASI | Style d'attachement (entretien) |
| 28 | Brief COPE | Brief COPE |
| 27 | MINI-Suicide | MINI – module suicidaire |
| 27 | SIBID | Dysphorie situationnelle de l'image corporelle |
| 27 | OII | Intrusions obsessionnelles |
| 27 | WHOQOL-BREF | Qualité de vie abrégé (OMS) |
| 27 | SCREEN | Refus scolaire anxieux au collège |
| 27 | SCS | Auto-compassion |
| 25 | PAM | Attachement en psychose |
| 25 | MAC-R | Cognitions anorexiques de Mizes |
| 25 | OLBI | Épuisement professionnel d'Oldenburg |
| 25 | SVO | Orientation de la valeur sociale |
| 25 | SSI | Compétences sociales |
| 24 | OCI-R | Inventaire obsessionnel-compulsif |
| 24 | GSQ | Questionnaire sensoriel de Glasgow |
| 24 | SWAN-P | SWAN – version préscolaire |
| 23 | TAFS | Fusion pensée-action |
| 23 | SAS | Addiction au smartphone |
| 22 | TCQ | Contrôle des pensées |
| 22 | ASIC | Sensibilité à l'anxiété pour enfants |
| 21 | SBQ-R | Comportements suicidaires |
| 21 | EBQ-36 | Croyances alimentaires |
| 21 | BVAQ | Alexithymie de Bermond-Vorst |
| 21 | SLSC | Auto-appréciation et compétence personnelle |
| 21 | TSI-2 | Symptômes de traumatisme |
| 21 | BADS | Activation comportementale pour la dépression |
| 21 | ASSIST | Consommation alcool/tabac/substances (OMS) |
| 20 | BIDQ | Perturbations de l'image du corps |
| 20 | SF-36 | Questionnaire de santé SF-36 |
| 20 | BOS | Échelle du Boreout |
| 20 | SST | Test des histoires étranges |
| 20 | CADSS | États dissociatifs |
| 20 | BDDE | Examen du trouble dysmorphique corporel |
| 19 | MAQ | Qualités d'attachement |
| 19 | MDQ-A | Troubles de l'humeur – ados |
| 19 | ACQ | Contrôle de l'anxiété |
| 19 | RSQ | Échelles de la relation |
| 19 | SPQ | Phobies spécifiques |
| 19 | BI-AAQ | Acceptation/action sur l'image corporelle |
| 19 | PSPCSA | Compétence perçue et acceptation sociale (enfants) |
| 19 | YMRS | Manie de Young |
| 18 | EVQ | Vide existentiel |
| 18 | SPSSE | Auto-efficacité sociale perçue |
| 18 | YSR | Auto-questionnaire pour les jeunes |
| 18 | JCQ | Contenu du travail (Karasek) |
| 18 | PSS-A | Suicide de Paykel – ados |
| 18 | SDS | Sévérité de la dépendance |
| 18 | OBQ-44 | Croyances obsessionnelles |
| 18 | PIL | Sens de la vie |
| 18 | BPS | Propension à l'ennui |
| 18 | WBSI | Suppression de l'ours blanc |
| 17 | DSM-5-TR | Symptômes transversaux niveau 1 (DSM-5-TR) |
| 17 | YFAS | Addiction alimentaire de Yale |
| 17 | SCS | Confiance en soi |
| 17 | PAQ | Autorité parentale |
| 17 | ISS | Honte intériorisée |
| 17 | DSI-SS | Suicidalité (symptômes dépressifs) |
| 17 | ESS | Expérience de la honte |
| 16 | APS-R | Perfectionnisme quasi-parfait |
| 16 | BWAS | Dépendance au travail de Bergen |
| 16 | PSS | Standards personnels |
| 16 | DAST | Dépistage des abus de drogues |
| 16 | UCLA PTSD | Réaction au PTSD de l'UCLA (DSM-5) |
| 16 | MSI-R | Satisfaction conjugale |
| 15 | VOCI | Obsessionnel-compulsif de Vancouver |
| 15 | APPQ | Panique et phobie |
| 15 | SMS-II | Motivation dans le sport |
| 15 | WAMI | Travail et sens |
| 15 | SIDAS | Attributs de l'idéation suicidaire |
| 15 | PS | Parentalité |
| 15 | IDI | Dépendance interpersonnelle |
| 15 | AAQ-II | Acceptation et action |
| 15 | RPT | Profil relationnel |
| 14 | SOQ | Auto-objectification |
| 14 | QMI | Qualité du mariage |
| 14 | CDC | Checklist dissociative de l'enfant |
| 14 | TICS | Trier — stress chronique |
| 14 | SQ-R | Quotient de systématisation |
| 14 | MSPSS | Soutien social perçu |
| 14 | IGDS9-SF | Trouble du jeu vidéo sur Internet |
| 14 | PSP-R | Profil sensoriel |
| 12 | KMSS | Satisfaction conjugale du Kansas |
| 12 | URICA | Motivation au changement |
| 12 | AI | Inventaire d'assertion |
| 12 | UCLA-LS | Solitude de l'UCLA |
| 12 | A-DES | Expériences dissociatives pour adolescents |
| 12 | CSE | Auto-efficacité à faire face |
| 12 | MOCI | Obsessionnel-compulsif de Maudsley |
| 12 | MBSRQ | Relations au corps (multidimensionnel) |
| 12 | HTQ | Harvard — traumatisme |
| 11 | SSQ6 | Soutien social de Sarason |
| 11 | APQ | Parentalité de l'Alabama |
| 11 | GSE | Auto-efficacité générale |
| 11 | TOSCA-3 | Affects de conscience de soi |
| 11 | FES | Événements futurs |
| 10 | PTQ | Pensées persévérantes |
| 10 | CPGI | Jeu excessif (canadien) |
| 10 | SSES | Estime de soi d'état |
| 10 | CARE | Évaluation cognitive des événements à risque |
| 10 | GRIMS | État matrimonial (Golombok-Rust) |
| 10 | EMSS | Satisfaction conjugale ENRICH |
| 10 | ESS | Somnolence d'Epworth |
| 10 | MAST | Dépistage de l'alcoolisme du Michigan |
| 10 | ASI-3 | Sensibilité à l'anxiété |
| 10 | DASI-2 | Diagnostic du trouble du spectre de l'autisme |
| 10 | HCL-32 | Hypomanie de Angst |
| 9 | CRAFFT | Dépistage CRAFFT |
| 9 | SOGS | Dépistage du jeu problématique |
| 9 | SIDP-IV | Troubles de personnalité DSM-IV |
| 9 | PDI-21 | Idées délirantes de Peters |
| 9 | SS | Échelle de sécurité |
| 9 | SPAQ | Satisfaction et zones de problèmes |
| 9 | SSD-12 | Trouble symptomatique somatique |
| 9 | EDE-Q | Examen des troubles des conduites alimentaires |
| 8 | SOPS | Symptômes prodromiques |
| 8 | IERQ | Régulation émotionnelle interpersonnelle |
| 8 | GPTS | Pensées paranoïaques de Green |
| 8 | FQ | Quotient amitié et relation |
| 8 | PI-R | Inventaire de Padoue |
| 8 | CPTS-RI | Stress post-traumatique de l'enfant |
| 8 | DOCS | Troubles obsessionnels compulsifs (dimensionnel) |
| 8 | IBM | Liens intimes |
| 8 | RAS | Évaluation de la relation |
| 7 | K-SADS-PL | Troubles affectifs et schizophrénie chez l'enfant |
| 7 | DTS | Tolérance à la détresse |
| 7 | CDS | Dépersonnalisation de Cambridge |
| 7 | CAGE | Questionnaire CAGE |
| 7 | ASRM | Manie d'Altman |
| 7 | A-MISO-S | Misophonie d'Amsterdam |
| 6 | SPAQ | Schéma saisonnier |
| 6 | CSQ | Adaptation à la douleur |
| 6 | PEC | Compétences émotionnelles |
| 6 | ORT | Risque aux opioïdes |
| 6 | PPS | Pure procrastination |
| 6 | SDS | Handicap de Sheehan |
| 6 | ECAP | Anxiété et phobie de Véra |
| 6 | NPI | Personnalité narcissique |
| 6 | EDS | Dysrégulation émotionnelle |
| 6 | EQ-i | Quotient émotionnel |
| 5 | RSQ | Sensibilité au rejet |
| 5 | EMBU-C | Styles éducatifs parentaux perçus par l'enfant |
| 5 | PDI | Incapacité liée à la douleur |
| 4 | RQ | Questionnaire sur les relations |
| 4 | ISPE | Schémas précoces pour l'enfant |
| 4 | AQS | Q-sort attachement |
| 4 | DSS | Sévérité de la dépersonnalisation |
| 4 | TEC | Expériences traumatiques |
| 4 | EQCA | Comportements adaptatifs (québécoise) |
| 4 | RBQ-3 | Comportements répétitifs |
| 4 | DQ | Drivers relationnels |
| 4 | LAI | Addiction amoureuse |
| 4 | DEQ | Expériences dépressives |
| 4 | CFQ | Défaillances cognitives |
| 4 | SIDES | Troubles de stress extrême |
| 4 | BPAQ | Agressivité de Buss et Perry |
| 3 | IIP-32 | Problèmes interpersonnels |
| 3 | PSM-25 | Stress psychologique |
| 3 | PAS-SR | Spectre panique-agoraphobique |
| 3 | SD4 | Tétrade noire |
| 3 | RSAS | Anhédonie sociale (révisée) |
| 3 | SASI | Symptômes d'anxiété de séparation |
| 3 | OAS | Agressivité manifeste |
| 3 | SADRS | Anxiété de séparation (quotidienne) |
| 3 | RPAS | Anhédonie physique de Chapman |
| 3 | TFEQ-51 | Trois facteurs de l'alimentation |
| 2 | MDI | Dissociation (multidimensionnel) |
| 2 | RDQ | Drivers relationnels |
| 2 | PWQ | Inquiétudes paranoïdes |
| 2 | FIS | Peur de l'intimité |
| 2 | ALS | Labilité affective |
| 2 | TEPS | Expérience temporelle du plaisir |
| 2 | SANS | Symptômes négatifs |
| 2 | BNSS | Symptômes négatifs (bref) |
| 2 | ADA | Attachement désorganisé de l'adulte |
| 1 | BES | Hyperphagie boulimique |
| 1 | MHLC | Locus de contrôle de la santé |
| 1 | SATAQ-3 | Attitudes socioculturelles envers l'apparence |
| 1 | ERS | Réactivité émotionnelle |
| 1 | PANAS | Affects positifs et négatifs |
| 1 | LOI | Obsessionnel de Leyton |
| 1 | QP-R | Perfectionnisme révisé |
| 1 | CODAT | Codépendance |
| 1 | ZBI | Échelle de Zarit |
| 1 | LEAS | Niveaux de conscience émotionnelle |
| 1 | CP QOL-Child | Qualité de vie — paralysie cérébrale (enfant) |
| 1 | SCS-R | Connexion sociale |
| 1 | DARS | Anhédonie (dimensionnelle) |
| 1 | SHAPS | Plaisir de Snaith-Hamilton |
| 1 | ESQ | États du moi |
| 1 | SCI-SAS | Anxiété de séparation (entretien structuré) |
| 0 | WEMWBS | Bien-être mental de Warwick-Édimbourg |
| 0 | TAS | Absorption de Tellegen |
| 0 | ODQ | Dépression d'Oxford |
| 0 | SIRS-2 | Symptômes rapportés (structuré) |
| 0 | PHQ-15 | Santé du patient-15 (somatique) |
| 0 | RMDQ | Incapacité de Roland-Morris |
| 0 | DASH-II | Diagnostic (handicap sévère) |
| 0 | FABQ | Croyances d'évitement liées à la peur |
| 0 | SSS-8 | Symptômes somatiques |
| 0 | IASC | Capacités du soi altérées |

_Toutes les entrées « bientôt disponibles » portent le badge Standardisé dans cette extraction (aucune Communauté). Extraction du 2026-07-15 ; les votes évoluent._
