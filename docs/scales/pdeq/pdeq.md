# Test spec — PDEQ (Questionnaire sur les expériences de dissociation péritraumatique)

<!--
Voir _TEMPLATE.md pour les règles projet (sourcing, copyright, FR-only,
hiérarchie versions, comparaison Mentaal).
-->

---

## 1. Métadonnées produit

| Champ | Valeur |
|-------|--------|
| **Nom court** | PDEQ |
| **Nom complet (FR)** | Questionnaire sur les expériences de dissociation péritraumatique |
| **Nom complet (langue originale)** | Peritraumatic Dissociative Experiences Questionnaire (PDEQ) |
| **Thème principal** | Traumatismes |
| **Sous-thèmes / tags** | dissociation, péritraumatique, TSPT, facteur de risque |
| **Nombre d'items** | 10 items scorés |
| **Durée estimée de passation** | 5 min |
| **Public cible** | Adultes exposés à un événement potentiellement traumatique. |
| **Mode d'administration** | auto (version auto-questionnaire validée par Birmes et al.) |
| **Note sur le mode d'administration** | Se réfère à un événement précis : « durant l'événement et immédiatement après ». |
| **Description praticien (bibliothèque)** | Questionnaire de 10 items évaluant la dissociation vécue pendant un événement traumatogène — facteur de risque de TSPT. |
| **Description patient (portail)** | AUCUNE — règle projet. |

---

## 2. Sources et traçabilité

### Source primaire (version FR retenue)

- **Type** : fiche officielle du **Centre national de ressources et de résilience (Cn2r)** — questionnaire complet + fiche descriptive (cotation, étalonnage).
- **Référence** : *Questionnaire sur les expériences de dissociation péritraumatique (PDEQ)*, mise en page Cn2r.
- **URL** : https://cn2r.fr/wp-content/uploads/2025/04/PDEQ_Cn2r.pdf
- **Fichier de portage** : `docs/scales/pdeq/PDEQ_Cn2r.pdf`
- **Date de consultation** : 16/07/2026

### Source secondaire

- **Type** : version française diffusée par une institution française — URPS Médecins Libéraux Provence-Alpes-Côte d'Azur.
- **Référence** : *Réactions Dissociatives Péritraumatiques (PDEQ)* — « Traduit et adapté par Alain Brunet et Christiane Routhier (1999) avec l'autorisation des auteurs ». Alain Brunet est co-auteur de la validation française (Birmes et al., 2005).
- **URL** : https://www.urps-ml-paca.org/wp-content/uploads/2021/11/PDEQ-Fr.pdf
- **Fichier de portage** : `docs/scales/pdeq/PDEQ_URPS-ML-PACA_Brunet-Routhier-1999.pdf`
- **Date de consultation** : 29/09/2026

Même traduction que la fiche Cn2r, sans ses coquilles. Pas de seuil (le seuil ≥ 15 vient de la fiche descriptive Cn2r).

### Sources consultées, non retenues

- **INSPQ** (Québec), *Boîte à outils pour la surveillance post-sinistre* : variante québécoise retravaillée (« comme en « pilotage automatique » », « était changée », « en regardant un film », « déformée »). Hiérarchie France d'abord ; « comme en » atténue l'item 2 par rapport à l'original (« I found myself on "automatic pilot" »). Texte relu via un outil de lecture, à confirmer à l'œil avant citation publique.
- **TCC Montréal** : nombreuses coquilles (« retrouvée(e) », « avaientt », « monde propre corps », « la spectatrice »).
- **Birmes et al. (2005)**, article de validation : non accessible (Cambridge Core, accès restreint).

### Instrument original

- Marmar, C.R., Weiss, D.S., & Metzler, T.J. (1997). *The Peritraumatic Dissociative Experiences Questionnaire.* In Wilson & Marmar (Eds.), Assessing psychological trauma and PTSD (p. 412-428). Guilford Press. **©1997.**
- Validation française : Birmes, P., Brunet, A., Benoit, M., et al. (2005). *Validation of the PDEQ self-report version in two samples of French-speaking individuals exposed to trauma.* European Psychiatry, 20(2), 145-151.

### Divergences constatées entre sources

| Élément | Cn2r (primaire) | URPS, Brunet & Routhier 1999 (secondaire) |
|---|---|---|
| Consigne | « en cochant… », « après.bSi… cochez « pas du tout vrai » » | « en entourant… », « après. Si… encerclez "Pas du tout vrai" » |
| Item 2 | “pilote automatique” – | "pilote automatique" - |
| Item 4 | « dans un rêve ou au cinéma » | « dans un rêve, ou au cinéma » |
| Item 5 | « au dessus… l'observait » (coquilles) | « au-dessus… l'observais » |
| Items 9-10 | « confus(e); », « désorienté(e); » | « confus(e) ; », « désorienté(e) ; » |

Items 1, 3, 6, 7, 8 et libellés de réponse identiques (aux tirets près).

---

## 3. Statut copyright et licence

| Champ | Valeur |
|-------|--------|
| **Statut** | libre pour usage clinique avec attribution (instrument de recherche diffusé publiquement par le Cn2r) |
| **Détenteur des droits** | Marmar, Weiss & Metzler ©1997 ; traduction Brunet & Routhier (1999), avec l'autorisation des auteurs ; validation Birmes et al. (2005). |
| **Mention obligatoire à afficher** | *« PDEQ — Marmar, Weiss & Metzler (1997) ©1997. Traduction française : Brunet & Routhier (1999), avec l'autorisation des auteurs. Validation française : Birmes et al. (2005), European Psychiatry. Mise en page : Centre national de ressources et de résilience (Cn2r). »* |
| **Restrictions d'usage** | Le copyright ©1997 est affiché sur le document Cn2r lui-même, qui le diffuse librement à visée clinique. ⚠️ À recocher pour l'usage commercial (plateforme payante). |
| **Décision Melya** | go (sous réserve recoche usage commercial) |

---

## 4. Structure de l'échelle

### Consigne officielle

> *« Veuillez répondre aux énoncés suivants en choisissant la réponse qui décrit le mieux vos expériences et réactions durant l'événement et immédiatement après. Si une question ne s'applique pas à votre expérience, répondez « pas du tout vrai ». »*

### Comportement UX de la consigne

| Champ | Valeur |
| --- | --- |
| **Persistance** | persistante — rappel court : « Durant l'événement et immédiatement après : » |
| **Justification** | Extrait mot pour mot de la consigne source. Sur le papier, la consigne reste visible au-dessus des 10 items (une seule page) ; à l'écran, un item à la fois, elle disparaît dès le premier. Le rappel reproduit cette présence (cf. §10). |

### Dimensions de cotation

Likert unique 1-5 : Pas du tout vrai / Un peu vrai / Plutôt vrai / Très vrai / Extrêmement vrai.

⚠️ **Cotation débutant à 1** — score minimal théorique = 10 (pas 0).

---

## 5. Items

Items de la fiche Cn2r, mot pour mot, sauf les corrections consignées en §10 (items 5, 9, 10). Pas d'items inversés, pas de sous-scores. Réponses : 1 Pas du tout vrai · 2 Un peu vrai · 3 Plutôt vrai · 4 Très vrai · 5 Extrêmement vrai.

| # | Item |
|---|------|
| 1 | Il y a eu des moments où j'ai perdu le fil de ce qui se passait – j'étais complètement déconnecté(e) ou, d'une certaine façon, j'ai senti que je ne faisais pas partie de ce qui se passait. |
| 2 | Je me suis retrouvé(e) sur le “pilote automatique” – je me suis mis(e) à faire des choses que, je l'ai réalisé plus tard, je n'avais pas activement décidé de faire. |
| 3 | Ma perception du temps a changé – les choses avaient l'air de se dérouler au ralenti. |
| 4 | Ce qui se passait me semblait irréel, comme si j'étais dans un rêve ou au cinéma, ou en train de jouer un rôle. |
| 5 | C'est comme si j'étais le (ou la) spectateur(trice) de ce qui m'arrivait, comme si je flottais au-dessus de la scène et l'observais de l'extérieur. |
| 6 | Il y a eu des moments où la perception que j'avais de mon corps était distordue ou changée. Je me sentais déconnecté(e) de mon propre corps, ou bien il me semblait plus grand ou plus petit que d'habitude. |
| 7 | J'avais l'impression que les choses qui arrivaient aux autres m'arrivaient à moi aussi – comme par exemple être en danger alors que je ne l'étais pas. |
| 8 | J'ai été surpris(e) de constater après coup que plusieurs choses s'étaient produites sans que je m'en rende compte, des choses que j'aurais habituellement remarquées. |
| 9 | J'étais confus(e) ; c'est-à-dire que par moment j'avais de la difficulté à comprendre ce qui se passait vraiment. |
| 10 | J'étais désorienté(e) ; c'est-à-dire que par moment j'étais incertain(e) de l'endroit où je me trouvais, ou de l'heure qu'il était. |

---

## 6. Algorithme de scoring

Somme simple des 10 items (1-5). **Plage : 10-50.** Réponses incomplètes refusées.

---

## 7. Seuils d'interprétation

| Score | Interprétation |
|-------|----------------|
| 10–14 | Dissociation péritraumatique non significative |
| 15–50 | Dissociation péritraumatique significative |

**Source des seuils** : fiche descriptive Cn2r — « Un score total ≥ 15 permet le dépistage de dissociation péritraumatique significative ».

---

## 8. Alertes cliniques

Aucune.

---

## 9. Cas de test unitaires

| # | Réponses | Score | Niveau |
|---|----------|-------|--------|
| T1 | Tous = 1 | 10 | Non significative |
| T2 | 14 (ex. 2,2,2,2,1,1,1,1,1,1) | 14 | Non significative |
| T3 | 15 (ex. 2,2,2,2,2,1,1,1,1,1) | 15 | Significative |
| T4 | Tous = 5 | 50 | Significative |

Vérifiés dans le script de recette (40/40 PASS, 16/07/2026). Rejoués par `apps/api/src/scoring/scorers/pdeq.spec.ts` (5/5, 29/09/2026).

---

## 10. Choix et arbitrages méthodologiques

Règle suivie : les textes affichés au patient reprennent mot pour mot la fiche du Cn2r. On ne s'en écarte qu'en cas de faute ou pour adapter le support papier à l'écran ; le texte corrigé est alors celui de la version URPS-ML PACA (Brunet & Routhier, 1999), jamais une formulation propre à Melya.

### Écarts à la source primaire

| Élément | Source primaire (Cn2r) | Texte retenu | Origine du texte retenu | Justification |
| --- | --- | --- | --- | --- |
| Consigne, coupure | « …immédiatement après.bSi une question… » | Deux phrases : « …immédiatement après. » / « Si une question… » | URPS-ML PACA | Artefact de mise en page du PDF Cn2r. |
| Consigne, verbes | « en cochant le choix de réponse », « cochez « pas du tout vrai » » | « en choisissant la réponse », « répondez « pas du tout vrai » » | Adaptation Melya | Adaptation du support : toutes les sources parlent du papier (cocher, entourer, encercler) ; à l'écran, on choisit une réponse. Seul écart sans source, et sans effet sur le sens. |
| Item 5 | « au dessus de la scène et l'observait » | « au-dessus de la scène et l'observais » | URPS-ML PACA | Coquilles (trait d'union, conjugaison à la 1re personne). |
| Items 9, 10 | « confus(e); », « désorienté(e); » | « confus(e) ; », « désorienté(e) ; » | URPS-ML PACA | Typographie française. |

### Autres arbitrages

| Sujet | Choix retenu | Justification |
| --- | --- | --- |
| Rappel au-dessus des items | « Durant l'événement et immédiatement après : » | Extrait mot pour mot de la consigne source ; reproduit la présence de la consigne au-dessus des items sur la page papier (cf. §4). Validé par Clément le 29/09/2026. |
| Item 2, guillemets | “pilote automatique”, comme le Cn2r | Guillemets français « » écartés : aucune source ne les utilise. |
| Variante INSPQ (Québec) | Non retenue | Hiérarchie France d'abord ; « comme en « pilotage automatique » » atténue l'item par rapport à l'original ; autres écarts (items 3, 4, 6) sans justification. |
| Seuil | ≥ 15 | Fiche descriptive Cn2r : « Un score total ≥ 15 permet le dépistage de dissociation péritraumatique significative ». |
| Libellés des bandes | « Dissociation péritraumatique significative » / « non significative » | Terme de la source ; la bande basse en est la négation. |
| Mention de la traduction | Brunet & Routhier (1999) pour la traduction, Birmes et al. (2005) pour la validation | La version URPS crédite les traducteurs d'origine ; le Cn2r n'indique que la validation. |
| Réponses manquantes | Passation incomplète refusée, pas d'imputation | Règle projet commune à toutes les échelles. |

### Questions ouvertes

1. **Usage commercial du ©1997 Marmar** — recocher les droits.

---

## 11. Contrat technique

- `formType: "single-scale"`, clés `intensity_0 … intensity_9`, échelle 1-5.
- Scorer `apps/api/src/scoring/scorers/pdeq.ts`, id `pdeq` dans `ScoringService`.
- Domaine : `trauma` (la couleur de la tuile en dérive, cf. `apps/web/lib/scale-appearance.ts`).

---

## 12. Historique des modifications

| Date | Auteur | Modification |
|------|--------|--------------|
| 16/07/2026 | Adrien (avec Claude) | Création : entrée `Scale`, scorer somme 10-50 (seuil ≥ 15), icône placeholder, spec. Items verbatim fiche Cn2r (2 coquilles source corrigées, documentées §2). |
| 29/09/2026 | Clément (avec Claude) | §10 réécrite en « Choix et arbitrages méthodologiques » : fin de la validation clinique externe, les arbitrages sont tranchés par l'équipe. Points ouverts reformulés en décisions d'équipe, avec la règle « on n'invente rien » (écarts à la source repris de la source secondaire). |
| 29/09/2026 | Clément (avec Claude) | **Recette.** Source secondaire ajoutée (URPS-ML PACA, Brunet & Routhier 1999) : elle confirme les corrections de l'item 5, de la consigne et des items 9-10. Item 2 aligné sur le Cn2r (guillemets “ ”). Rappel au-dessus des items conservé (extrait de la consigne). Mention copyright complétée (Brunet & Routhier 1999). Items listés en §5, tests automatisés (5/5). Recette manuelle passée par Clément : échelle validée (✅). |
