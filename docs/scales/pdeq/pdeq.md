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

### Exception de sourcing — autorité unique justifiée

Le Cn2r est le centre national de référence français sur le psychotraumatisme ;
sa fiche reproduit le questionnaire validé (items Birmes et al. 2005) **et** la
cotation/étalonnage. Une source institutionnelle unique faisant autorité suffit
(même logique que Pfizer pour PHQ-9/GAD-7).

### Instrument original

- Marmar, C.R., Weiss, D.S., & Metzler, T.J. (1997). *The Peritraumatic Dissociative Experiences Questionnaire.* In Wilson & Marmar (Eds.), Assessing psychological trauma and PTSD (p. 412-428). Guilford Press. **©1997.**
- Validation française : Birmes, P., Brunet, A., Benoit, M., et al. (2005). *Validation of the PDEQ self-report version in two samples of French-speaking individuals exposed to trauma.* European Psychiatry, 20(2), 145-151.

### Divergences constatées entre sources

- PDF Cn2r, consigne : artefact de mise en page « après.bSi » lu comme « après. Si ».
- PDF Cn2r, item 5 : « je flottais au dessus de la scène et l'**observait** » — coquille de conjugaison corrigée en « l'**observais** » (1ʳᵉ personne, cohérente avec le reste de l'item) ; « au dessus » normalisé en « au-dessus ».
- « en cochant le choix de réponse » adapté en « en choisissant la réponse » (passation numérique, boutons).

---

## 3. Statut copyright et licence

| Champ | Valeur |
|-------|--------|
| **Statut** | libre pour usage clinique avec attribution (instrument de recherche diffusé publiquement par le Cn2r) |
| **Détenteur des droits** | Marmar, Weiss & Metzler ©1997 ; traduction Birmes et al. (2005). |
| **Mention obligatoire à afficher** | *« PDEQ — Marmar, Weiss & Metzler (1997) ©1997. Traduction française et validation : Birmes et al. (2005), European Psychiatry. Mise en page : Centre national de ressources et de résilience (Cn2r). »* |
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
| **Justification** | Ancre le référentiel temporel péritraumatique, spécifique à cette échelle. |

### Dimensions de cotation

Likert unique 1-5 : Pas du tout vrai / Un peu vrai / Plutôt vrai / Très vrai / Extrêmement vrai.

⚠️ **Cotation débutant à 1** — score minimal théorique = 10 (pas 0).

---

## 5. Items

10 items portés verbatim depuis le PDF Cn2r (corrections listées en §2). Pas d'items inversés, pas de sous-scores.

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

Vérifiés dans le script de recette (40/40 PASS, 16/07/2026).

---

## 10. Points à valider avec le·la psychologue référent·e

1. Corrections de coquilles source (item 5 « l'observais », consigne).
2. Libellés des deux bandes (« non significative » / « significative »).
3. Usage commercial du ©1997 Marmar (recoche droits).

---

## 11. Contrat technique

- `formType: "single-scale"`, clés `intensity_0 … intensity_9`, échelle 1-5.
- Scorer `apps/api/src/scoring/scorers/pdeq.ts`, id `pdeq` dans `ScoringService`.
- Icône : `pdeq.svg` — ⚠️ placeholder (copie de `pcl-5.svg`, catégorie Traumatismes).

---

## 12. Historique des modifications

| Date | Auteur | Modification |
|------|--------|--------------|
| 16/07/2026 | Adrien (avec Claude) | Création : entrée `Scale`, scorer somme 10-50 (seuil ≥ 15), icône placeholder, spec. Items verbatim fiche Cn2r (2 coquilles source corrigées, documentées §2). |
