# Suivi d'implémentation des échelles

> Document de pilotage du catalogue Melya. **Objectif : rattraper le catalogue
> disponible de Mentaal** sur le périmètre libre de droits, et rester devant sur
> les échelles qu'ils n'ont pas. La partie 2 conserve le benchmark Mentaal figé
> (extraction 2026-07-15) qui a servi à prioriser.

## Tableau de bord

**🔵 14 implémentées · 🚧 0 en cours · 📋 9 prévues · 🔍 22 à instruire · ⬜ 26 non planifiées · 🚫 12 écartées**

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

**Droits** : ✅ = vraisemblablement libre (estimation — **à recocher contre la
source primaire avant intégration**), ⚠️ = incertain, 💰 = payant.
**Classe** (faisabilité, cf. partie 2) : 🟢 A data seule · 🟡 B scorer patterné
(~30 l.) · 🟠 C petite évolution de brique · 🔴 D hors flux d'auto-passation.
**Mentaal** : `#n` = position dans leur catalogue disponible (74 outils — la
75ᵉ entrée est la fonctionnalité « créez votre questionnaire ») ; `Bientôt · x v.`
= dans leur file d'attente avec x votes ; `Absent` = pas à leur catalogue.

## Tableau de suivi

| Échelle | Nom | Statut | Droits | Classe | Mentaal | Notes |
|---------|-----|--------|--------|--------|---------|-------|
| RSES | Estime de soi de Rosenberg | 🔵 | ✅ | — | #7 | |
| GAD-7 | Dépistage du TAG | 🔵 | ✅ | — | #8 | |
| LSAS | Anxiété sociale de Liebowitz | 🔵 | ✅ | — | #13 | |
| PHQ-9 | Questionnaire santé patient (dépression) | 🔵 | ✅ | — | #18 | alerte item 9 |
| PCL-5 | TSPT (DSM-5) | 🔵 | ✅ | — | #20 | |
| Y-BOCS | TOC de Yale-Brown | 🔵 | ✅ | — | #44 | |
| PSWQ | Inquiétude de Penn State | 🔵 | ✅ | — | #53 | porté sous l'id **QIPS** |
| AUDIT | Troubles liés à l'alcool | 🔵 | ✅ OMS | 🟢 A | #66 | ordre 2 de la file — fait |
| SPIN | Inventaire de la phobie sociale | 🔵 | ✅ | — | Bientôt · 31 v. | **Melya devant Mentaal** |
| HSPS | Hypersensibilité (Aron) | 🔵 | ⚠️ | 🟢 A | #19 | auto-test du livre (23 items OUI/NON, seuil 12) — droits trad. Éditions de l'Homme à instruire avant sortie de beta |
| WAQ | Inquiétude et anxiété (Dugas) | 🔵 | ✅ | 🟡 B | #25 | porté sous l'id **QIA** — criteriaCheck TAG (pas une simple somme) + item thèmes en texte libre (nouvelle brique `openingTextItem`) |
| IUS | Intolérance à l'incertitude | 🔵 | ✅ | 🟢 A | #26 | porté sous l'id **EII** — score brut 27-135 sans bandes (aucun cutoff établi) + sous-scores bifactoriels |
| PDEQ | Dissociation péritraumatique | 🔵 | ✅ | 🟢 A | #59 | seuil ≥ 15 (fiche Cn2r) |
| CUDIT-R | Troubles liés au cannabis | 🔵 | ✅ | 🟢 A | #70 | question-porte « 6 derniers mois » portée en consigne ; seuils 8-10 / > 10 (RESPADD) |
| ASRS | TDAH adulte | 📋 (1) | ✅ OMS | 🟡 B | #3 | `criteriaCheck` façon PCL-5 ; motif le + demandé |
| DES | Expériences dissociatives | 📋 (3) | ✅ | 🟠 C | Bientôt · 130 v. | #1 des votes ; widget de réponse 0–100 à créer |
| EPDS | Dépression périnatale (Édimbourg) | 📋 (4) | ✅ | 🟢 A | Bientôt · 96 v. | alerte item 10 (idéation) façon PHQ-9 |
| DASS-21 | Dépression, anxiété et stress | 📋 (5) | ✅ | 🟠 C | #2 | sévérité par sous-échelle → étendre `Subscore` |
| ATQ | Pensées automatiques | 📋 (6) | ✅ | 🟢 A | Bientôt · 77 v. | |
| PDSS | Sévérité du trouble panique | 📋 (7) | ✅ | 🟢 A | Bientôt · 62 v. | |
| DERS | Régulation émotionnelle | 📋 (8) | ✅ | 🟡 B | #14 | reverse + subscores |
| FTND | Dépendance à la nicotine (Fagerström) | 📋 (9) | ✅ | — | Bientôt · 29 v. | complète le motif addictions |
| TAS-20 | Alexithymie de Toronto | 📋 (10) | ✅ | 🟡 B | #37 | reverse + 3 subscores |
| ASQ-SF | Styles d'attachement | 🔍 | ⚠️ | — | #10 | |
| SCT | Test de confiance en soi | 🔍 | ⚠️ | — | #15 | |
| ADHD-RS | Évaluation du TDAH | 🔍 | ⚠️ | — | #16 | DuPaul/Guilford — alternative libre : ASRS |
| PDQ-4 | Diagnostic des personnalités | 🔍 | ⚠️ | — | #24 | |
| BPQ | Personnalité borderline | 🔍 | ⚠️ | — | #28 | |
| CAQ | Évitements cognitifs | 🔍 | ⚠️ | — | #32 | |
| BIG-5 | Cinq grands facteurs | 🔍 | ⚠️ | — | #33 | items IPIP libres — version exacte à confirmer |
| PPAG | Phobie, panique, anxiété généralisée | 🔍 | ⚠️ | — | #35 | |
| SCQ | Cognitions sociales | 🔍 | ⚠️ | — | #39 | |
| GAD-SBQ | Comportements sécurisants du TAG | 🔍 | ⚠️ | — | #40 | |
| CAT | Assertivité de Chalvin | 🔍 | ⚠️ | — | #41 | |
| EDQ | Dépendance affective | 🔍 | ⚠️ | — | #42 | |
| COPSOQ | Risques psychosociaux | 🔍 | ⚠️ | — | #51 | libre non commercial — usage commercial à vérifier |
| SPRS | Cotation de la phobie sociale | 🔍 | ⚠️ | — | #55 | |
| QAP | Attitudes face aux problèmes | 🔍 | ⚠️ | — | #56 | |
| CST | Stress de Cungi | 🔍 | ⚠️ | — | #60 | |
| RIASEC | Intérêts professionnels | 🔍 | ⚠️ | — | #62 | modèle libre, version des items à vérifier |
| ASA-27 | Anxiété de séparation adulte | 🔍 | ⚠️ | — | #63 | |
| FSS | Échelle des peurs | 🔍 | ⚠️ | — | #64 | |
| IAT | Addiction à Internet | 🔍 | ⚠️ | — | #71 | Young/Stoelting — licence à vérifier |
| ISI | Sévérité de l'insomnie | 🔍 | ⚠️ | — | Non dispo | motif sommeil = trou Mentaal → opportunité |
| PSQI | Qualité de sommeil de Pittsburgh | 🔍 | ⚠️ | — | Non dispo | idem ISI |
| AQ | Quotient du spectre de l'autisme | ⬜ | ✅ | 🟡 B | #4 | 50 items, recode binaire + 5 subscores |
| RAADS-R | Autisme / Asperger de Ritvo | ⬜ | ✅ | 🟡 B | #6 | 80 items — lourd |
| CAT-Q | Camouflage autistique | ⬜ | ✅ | 🟡 B | #9 | |
| EQ | Quotient empathique | ⬜ | ✅ | 🟡 B | #11 | recode + reverse |
| PID-5 | Personnalité DSM-5 | ⬜ | ✅ APA | — | #17 | 220 items (ou brève 25) — volume énorme |
| RAS | Affirmation de soi de Rathus | ⬜ | ✅ | 🟡 B | #21 | reverse + offset |
| SNAP-IV | TDAH enfant | ⬜ | ✅ | 🟡 B | #23 | public enfant |
| MDQ | Troubles de l'humeur | ⬜ | ✅ | 🟡 B | #30 | criteriaCheck + oui/non |
| SCARED | Troubles anxieux enfant | ⬜ | ✅ | 🟡 B | #34 | public enfant |
| PCL-S | État de stress post-traumatique | ⬜ | ✅ | — | #36 | redondant avec PCL-5 |
| ASSQ | Dépistage TSA enfant | ⬜ | ✅ | 🟡 B | #38 | public enfant |
| FMPS | Perfectionnisme de Frost | ⬜ | ✅ | 🟡 B | #45 | subscores |
| BAT-G | Burnout (version générale) | ⬜ | ✅ | 🟡 B | #48 | alternative libre au MBI |
| IES-R | Impact des événements | ⬜ | ✅ | 🟡 B | #49 | 3 subscores |
| SVS | Valeurs de Schwartz | ⬜ | ✅ | — | #50 | centrage ipsatif = calcul spécifique |
| EAT-26 | Attitudes alimentaires | ⬜ | ✅ | 🟡 B | #52 | recode asymétrique + seuil |
| ADRS | Dépression pour adolescents | ⬜ | ✅ | — | #57 | public ado |
| WW-II | Pourquoi s'inquiéter ? | ⬜ | ✅ | 🟡 B | #58 | subscores |
| BAT-W | Burnout (version travail) | ⬜ | ✅ | 🟡 B | #61 | |
| BSQ | Sensations corporelles | ⬜ | ✅ | 🟢 A | #65 | Likert + somme |
| FQ | Peurs de Marks & Mathews | ⬜ | ✅ | 🟡 B | #67 | subscores |
| PVQ-RR | Valeurs par portraits | ⬜ | ✅ | — | #68 | ipsatif, usage niche |
| CRIES-13 | Stress post-traumatique enfant | ⬜ | ✅ | 🟡 B | #69 | public enfant |
| EDS-R | Dépendance à l'exercice | ⬜ | ✅ | 🟡 B | #73 | criteria + subscores |
| THI | Handicap pour acouphènes | ⬜ | ✅ | 🟢 A | #74 | hors psycho (ORL) |
| WHO-5 | Bien-être (OMS) | ⬜ | ✅ | — | Absent | idéal suivi longitudinal — angle différenciation |
| CDI | Distorsions cognitives | 🚫 | ⚠️ | — | #1 | outil maison Mentaal (≠ CDI Pearson) |
| YSQ-L3 | Schémas de Young (long) | 🚫 | 💰 | — | #5 | payant |
| YSQ-S3 | Schémas de Young (court) | 🚫 | 💰 | — | #12 | payant |
| SCID-II-PQ | Dépistage troubles de personnalité | 🚫 | 💰 | — | #22 | SCID/APA |
| ASTA-20 | Anxiété d'état et de trait | 🚫 | ⚠️ | — | #27 | outil maison Mentaal, proche STAI (payante) — alt. : STICSA |
| SDQ | Forces et difficultés | 🚫 | ⚠️ | — | #29 | licence requise pour usage électronique/commercial |
| MBI | Burnout de Maslach | 🚫 | 💰 | — | #31 | Mind Garden — alternative libre : BAT |
| TOMQ-36 | Théorie de l'esprit | 🚫 | ⚠️ | — | #43 | outil maison Mentaal |
| MSQ | Questionnaire sur le sommeil | 🚫 | ⚠️ | — | #46 | outil maison Mentaal — le vrai motif sommeil passe par ISI/PSQI |
| EDI-2 | Troubles alimentaires | 🚫 | 💰 | — | #47 | Pearson — alternative libre : EAT-26 |
| QPC-L | Première consultation (long) | 🚫 | ⚠️ | — | #54 | outil maison Mentaal |
| QPC-S | Première consultation (court) | 🚫 | ⚠️ | — | #72 | outil maison Mentaal |

_Maintenance : à chaque échelle mergée → 🔵 ; recette manuelle passée → ✅ ;
mettre à jour le tableau de bord. Les candidates hors catalogue Mentaal
(cluster enfant/ado, réserve votée…) sont dans la partie 2 — les remonter ici
quand elles entrent en file._

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
| 7 | **PDSS** | 62 | ✅ Shear | 7 | Trouble panique | Court, complète la suite anxiété. |
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
