# Test spec — GAD-7

<!--
Voir _TEMPLATE.md pour les règles projet (sourcing, copyright, FR-only,
hiérarchie versions, comparaison Mentaal).
-->

---

## 1. Métadonnées produit

| Champ | Valeur |
|-------|--------|
| **Nom court** | GAD-7 |
| **Nom complet (FR)** | GAD-7 |
| **Nom complet (langue originale)** | Generalized Anxiety Disorder 7-item scale |
| **Thème principal** | Anxiété généralisée |
| **Sous-thèmes / tags** | anxiété, trouble anxieux généralisé, dépistage TAG |
| **Nombre d'items** | 7 items scorés |
| **Durée estimée de passation** | 1–3 min |
| **Public cible** | Adultes (≥ 18 ans). Utilisable chez l'adolescent en pratique courante mais sans validation FR adolescente formelle (cf. Todorović et al. 2023 qui a abouti à une variante GAD-6 plutôt qu'à une validation du GAD-7). |
| **Mode d'administration** | auto |
| **Note sur le mode d'administration** | Échelle d'auto-évaluation conçue pour passation en soins primaires, validée pour passation papier, en ligne ou en entretien. |
| **Description praticien (bibliothèque)** | Échelle d'auto-évaluation de 7 items pour mesurer la sévérité des symptômes d'anxiété sur les 2 dernières semaines. Instrument de référence en dépistage et suivi du trouble anxieux généralisé. |
| **Description patient (portail)** | AUCUNE — règle projet : le portail patient ne comporte pas de description de l'échelle. Seule la consigne officielle (section 4) est affichée. |

---

## 2. Sources et traçabilité

### Source primaire

- **Type** : document officiel de l'éditeur-distributeur (Pfizer Inc.), version "French for France"
- **Référence complète** : *GAD-7, French for France*. Développé par les Dr Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke et leurs collègues grâce à une allocation d'études de Pfizer Inc. Distribué officiellement via les traductions approuvées du programme Center-TBI (consortium européen de recherche).
- **URL** : https://www.center-tbi.eu/files/approved-translations/French/FRENCH_GAD7.pdf
- **Date de consultation** : 28/04/2026

### Source de cross-check

- **Type** : publication de validation française peer-reviewed
- **Référence complète** : Micoulaud-Franchi, J.-A., Lagarde, S., Barkate, G., Dufournet, B., Besancon, C., Trébuchon-Da Fonseca, A., Gavaret, M., Bartolomei, F., Bonini, F., & McGonigal, A. (2016). *Rapid detection of generalized anxiety disorder and major depression in epilepsy: Validation of the GAD-7 as a complementary tool to the NDDI-E in a French sample*. Epilepsy & Behavior, 57(Pt A), 211–216. https://doi.org/10.1016/j.yebeh.2016.02.015
- **URL** : https://pubmed.ncbi.nlm.nih.gov/26994447/
- **Date de consultation** : 28/04/2026

### Divergences constatées entre sources

**Coexistence de deux versions FR distribuées par Pfizer**, identifiable au niveau de la consigne et de plusieurs items :

| Élément | Version "French for France" (Pfizer / Center-TBI) — **retenue** | Version "française canadienne" (UMontréal, CMF Granby, RecoMédicales) — non retenue |
|---|---|---|
| Période évaluée | "2 dernières semaines" | "14 derniers jours" |
| Verbe consigne | "gêné(e)" | "dérangé(e)" |
| Modalité de fréquence n°2 | "Plus de la moitié du temps" | "Plus de la moitié des jours" |
| Item 1 | "Un sentiment de nervosité…" | "Sentiment de nervosité…" |
| Item 2 | "Une incapacité à arrêter de s'inquiéter ou à contrôler ses inquiétudes" | "Incapable d'arrêter de vous inquiéter ou de contrôler vos inquiétudes" |
| Item 3 | "Une inquiétude excessive à propos de différentes choses" | "Inquiétudes excessives à propos de tout et de rien" |
| Item 5 | "Une agitation telle qu'il est difficile à tenir en place" | "Agitation telle qu'il est difficile de rester tranquille" |
| Item 6 | "Une tendance à être facilement contrarié(e) ou irritable" | "Devenir facilement contrarié(e) ou irritable" |
| Item 7 | "Un sentiment de peur comme si quelque chose de terrible risquait de se produire" | "Avoir peur que quelque chose d'épouvantable puisse arriver" |
| Mention copyright | "Développé par les Dr…" (formulation identique au PHQ-9 French for France) | "Mis au point par les Drs…" |

**Décision Melya** : retenir la version **"French for France"** par cohérence stricte avec la version PHQ-9 déjà retenue dans Melya (même éditeur, même formulation de mention copyright, même structure de période "2 dernières semaines / gêné(e)"). Mélanger les deux versions dans l'app produirait une incohérence visible pour le praticien qui passe les deux échelles à un même patient.

**Note importante sur le contenu Mentaal** : la fiche `mentaal.fr/tests/gad-7` reprend la consigne "deux dernières semaines" mais ne donne pas le détail des libellés d'items (page client-side, contenu non extractable). Pas exploitable comme référence comparative.

### Version française retenue

- **Traducteur(s)** : traduction officielle Pfizer (traducteurs non nommés publiquement dans le PDF)
- **Année de la traduction** : non datée publiquement (la version est en circulation au moins depuis le déploiement du programme Center-TBI, projet européen lancé en 2014)
- **Publication de validation française** : Micoulaud-Franchi et al. (2016) — étude de validation conduite en France (CHU de Bordeaux, APHM Marseille) sur population clinique (épilepsie). Première et principale étude de validation française du GAD-7 en milieu clinique français. Propriétés psychométriques satisfaisantes ; cut-off optimal de 7/21 dans la population spécifique étudiée (PWE), mais les auteurs reconnaissent les seuils standards Spitzer 2006 comme référence dans la population générale.
- **Justification du choix** : version "French for France" retenue pour cohérence avec le PHQ-9 Melya. Validation Micoulaud-Franchi 2016 retenue comme référence de validation française authentique (auteurs français, contexte clinique français).

---

## 3. Statut copyright et licence

| Champ | Valeur |
|-------|--------|
| **Statut** | libre |
| **Détenteur des droits** | Historiquement Pfizer Inc. (allocation d'études initiale) / auteurs (Spitzer, Williams, Kroenke, Löwe). Pfizer a placé le GAD-7 en libre accès en 2010, sans restriction de copyright ni frais. |
| **Mention obligatoire à afficher** | *« Développé par les Dr Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke et leurs collègues grâce à une allocation d'études de Pfizer Inc. »* |
| **Emplacement de la mention (règle projet)** | Côté patient : sur l'**écran de fin de passation** (écran de remerciement après soumission), en texte gris discret, une seule fois. Pas pendant les écrans d'items ni en pied persistant. — Côté praticien : visible dans la **fiche du questionnaire** (page de détail de l'échelle dans la bibliothèque), comme information de traçabilité de la source utilisée. |
| **Restrictions d'usage commercial** | Aucune — la mention Pfizer indique explicitement que *« La reproduction, la traduction, l'affichage ou la distribution de ce document sont autorisés »*. Annonce publique Pfizer 2010 confirmant l'absence de toute restriction de copyright. |
| **Décision Melya** | go |

---

## 4. Structure de l'échelle

### Consigne officielle (affichée au patient avant les items)

> *« Au cours des 2 dernières semaines, selon quelle fréquence avez-vous été gêné(e) par les problèmes suivants ? »*

**Source de la consigne** : version officielle Pfizer "French for France" (source primaire, section 2). Formulation strictement parallèle à celle du PHQ-9 "French for France" déjà utilisée dans Melya.

### Comportement UX de la consigne

| Champ | Valeur |
| --- | --- |
| **Persistance** | persistante |
| **Emplacement** | en-tête au-dessus du bloc d'items, visible sur chaque écran de passation |
| **Justification** | N/A (valeur par défaut) |
| **Cas particuliers** | Aucun |

### Dimensions de cotation

**Dimension unique — Fréquence**

- Plage : 0 à 3
- Modalités :
  - `0` — Jamais
  - `1` — Plusieurs jours
  - `2` — Plus de la moitié du temps
  - `3` — Presque tous les jours

---

## 5. Items

### Variante A — Items à modalités de réponse uniformes

| # | Item |
|---|------|
| 1 | Un sentiment de nervosité, d'anxiété ou de tension |
| 2 | Une incapacité à arrêter de s'inquiéter ou à contrôler ses inquiétudes |
| 3 | Une inquiétude excessive à propos de différentes choses |
| 4 | Des difficultés à se détendre |
| 5 | Une agitation telle qu'il est difficile à tenir en place |
| 6 | Une tendance à être facilement contrarié(e) ou irritable |
| 7 | Un sentiment de peur comme si quelque chose de terrible risquait de se produire |

### Note sur l'absence d'item d'impact fonctionnel

**Le GAD-7, contrairement au PHQ-9, ne comporte PAS de question finale d'impact fonctionnel** dans la version officielle Pfizer "French for France" (vérifié sur le PDF Center-TBI). Cette différence est importante :

- Le PHQ-9 inclut une 10ème question non scorée sur l'impact dans la vie quotidienne.
- Le GAD-7 distribué en standalone par Pfizer s'arrête après l'item 7.
- Lorsque le PHQ-9 et le GAD-7 sont distribués ensemble dans certains formulaires combinés (cf. Pfizer "PHQ-9 and GAD-7 Form"), la question d'impact apparaît UNE SEULE FOIS, à la fin du PHQ-9, et porte sur l'ensemble des problèmes cochés.

**Conséquence pour Melya** : pas de question d'impact fonctionnel à intégrer au GAD-7. La question présente sur le PHQ-9 Melya reste propre au PHQ-9. Cela rectifie une erreur de la spec précédente qui laissait entendre que le GAD-7 "comporte une question finale sur l'impact dans la vie quotidienne".

---

## 6. Algorithme de scoring

### Calcul du score total

**Score total = somme des 7 items.**

**Plage du score total** : 0 à 21

### Subscores calculés

Aucun subscore officiel n'est défini pour le GAD-7. Le score total est la métrique clinique de référence. La structure factorielle a fait l'objet de discussions (Johnson et al. 2019 : structure unidimensionnelle confirmée en CFA après respécification, distinction items somatiques / cognitifs proposée dans certaines études), mais aucune décomposition en subscores n'est utilisée en pratique clinique standard.

**Source de la définition des subscores** : Sans objet (pas de subscores).

### Inversions d'items

Aucune. Tous les items sont cotés dans le même sens (score élevé = symptôme plus fréquent).

### Gestion des réponses manquantes

Refus de la passation incomplète. Les 7 items sont tous requis ; pas d'imputation par défaut. Cohérent avec la règle projet et avec la pratique de la version PHQ-9 Melya.

À noter pour information : la version québécoise du GAD-7 (CISSS Chaudière-Appalaches) propose un score ajusté en cas de < 3 items manquants sur 7 (formule : score × 7 / nombre d'items remplis), avec invalidation totale si ≥ 3 items manquants. **Cette logique n'est pas retenue par Melya** — le passage par voie numérique permet de garantir la complétude en bloquant la soumission en cas d'item manquant.

---

## 7. Seuils d'interprétation

| Score | Interprétation |
|-------|----------------|
| 0–4   | Minimale |
| 5–9   | Légère |
| 10–14 | Modérée |
| 15–21 | Sévère |

**Source des seuils** :

| Champ | Valeur |
| --- | --- |
| **Référence académique** | Spitzer, R. L., Kroenke, K., Williams, J. B. W., & Löwe, B. (2006). *A brief measure for assessing generalized anxiety disorder: The GAD-7*. Archives of Internal Medicine, 166(10), 1092–1097. |
| **URL directe vérifiable** | https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/410326 (DOI: 10.1001/archinte.166.10.1092) |
| **Date de consultation** | 28/04/2026 |
| **Niveau de consensus** | référence universelle |

**Remarques sur les seuils** :

- Les seuils 5 / 10 / 15 sont les valeurs publiées dans la publication originale Spitzer 2006 et reprises par toutes les sources de référence (Pfizer, NICE, MDCalc, RecoMédicales, Micoulaud-Franchi 2016, Dartmouth-Hitchcock, etc.).
- Le seuil de 10 correspond au seuil clinique de suspicion de TAG dans la publication originale (sensibilité 89 %, spécificité 82 %). Information à laisser au jugement du praticien — pas d'alerte technique côté app.
- En population clinique spécifique (épilepsie), Micoulaud-Franchi 2016 propose un cut-off optimal de 7 (sensibilité 96 %, spécificité 76 %), et certaines études en oncologie suggèrent un seuil ≥ 8 (Marrakech 2024). **Ces seuils alternatifs ne sont pas retenus par Melya** : on s'en tient aux seuils standards Spitzer 2006 par cohérence avec la pratique courante TCC en cabinet libéral.

---

## 8. Alertes cliniques

Aucune alerte spécifique. Le score total seul détermine la sévérité.

À la différence du PHQ-9 (item 9 = idéation suicidaire), aucun item du GAD-7 ne déclenche d'alerte autonome.

---

## 9. Cas de test unitaires

### 1. Cas limites (min/max)

| # | Réponses | Score | Sévérité |
|---|----------|-------|----------|
| T1 | `[0,0,0,0,0,0,0]` | 0 | Minimale |
| T2 | `[3,3,3,3,3,3,3]` | 21 | Sévère |

### 2. Transitions de seuil

Chaque borne testée des deux côtés.

| # | Score visé | Exemple de réponses | Sévérité attendue |
|---|------------|---------------------|-------------------|
| T3 | 4 | `[1,1,1,1,0,0,0]` | Minimale |
| T4 | 5 | `[1,1,1,1,1,0,0]` | Légère |
| T5 | 9 | `[2,2,2,1,1,1,0]` (somme = 9) | Légère |
| T6 | 10 | `[2,2,2,2,1,1,0]` (somme = 10) | Modérée |
| T7 | 14 | `[3,3,2,2,2,2,0]` (somme = 14) | Modérée |
| T8 | 15 | `[3,3,3,2,2,2,0]` (somme = 15) | Sévère |

### 3. Cas typiques (sanity check)

| # | Réponses | Score | Sévérité |
|---|----------|-------|----------|
| T9 | `[2,2,1,2,1,1,1]` | 10 | Modérée |
| T10 | `[1,1,1,1,0,1,0]` | 5 | Légère |

### 4. Cas spécifiques à l'échelle

Sans objet — pas d'inversion, pas d'alerte, pas de subscore, pas de cotation multi-dimensions.

### 5. Entrées invalides

| # | Cas | Comportement attendu |
|---|-----|----------------------|
| T11 | Valeur hors borne : item 1 = 4 | Erreur de validation, pas de score calculé |
| T12 | Valeur négative : item 1 = -1 | Erreur de validation |
| T13 | Réponse manquante : item 3 = `null` ou absent | Erreur de validation — les 7 items sont requis |
| T14 | Valeur non numérique : item 1 = `"oui"` | Erreur de validation |
| T15 | Tableau de 6 réponses au lieu de 7 | Erreur de validation |
| T16 | Tableau de 8 réponses | Erreur de validation |

---

## 10. Points à valider avec Renata

1. **Libellés des 7 items** — confirmer que les libellés "French for France" repris verbatim ci-dessus conviennent à sa pratique clinique en cabinet français. Point d'attention particulier sur l'item 3 *"Une inquiétude excessive à propos de différentes choses"* (vs. "tout et de rien" de la version canadienne) : la formulation "French for France" est plus neutre cliniquement. La bascule vers "French for France" elle-même n'est pas en débat — c'est une règle projet (cible primaire France).
2. **Libellés de sévérité** — valider les 4 libellés *Minimale / Légère / Modérée / Sévère*. Termes standards de la littérature française, mais une confirmation est utile.
3. **Absence de question d'impact fonctionnel** — confirmer l'analyse : le GAD-7 standalone Pfizer ne contient pas la question d'impact présente sur le PHQ-9. Cela rectifie une affirmation incorrecte de la spec précédente. Confirmer qu'aucune question d'impact spécifique au GAD-7 ne doit être ajoutée par Melya.
4. **Seuils Spitzer 2006 vs. seuil Micoulaud-Franchi 2016** — confirmer le choix des seuils standards Spitzer (5 / 10 / 15) plutôt que le seuil de 7 proposé par la validation française en population épileptique. Position Melya : seuils standards Spitzer, plus largement diffusés et alignés sur la pratique courante.
5. **Gestion des réponses manquantes** — confirmer le refus de passation incomplète (pas d'imputation), à l'identique du PHQ-9.

---

## 11. Contrat technique pour Adrien

### Signature de la fonction de scoring

```typescript
scoreGad7(réponses: number[]) → {
  scoreTotal: number,
  sévérité: "Minimale" | "Légère" | "Modérée" | "Sévère"
}
```

### Contrat d'erreur

- Erreurs de validation levées avec un **message explicite** (pas un score à 0 silencieux).
- Toute entrée invalide (cf. section 9.5) doit produire une erreur typée, pas un crash non géré.
- Les 7 items sont tous requis. Pas d'imputation par défaut.

### Clés de réponse attendues

Entrée : tableau de 7 nombres (un par item, dans l'ordre des items 1 à 7), chacun dans la plage [0, 3].

### Notes d'implémentation

- Plage de cotation 0-3 (cohérente avec PHQ-9, PCL-5, mais différente de RSES qui est en 1-4).
- Pas de question d'impact fonctionnel à gérer (à la différence du PHQ-9). La fonction de scoring couvre la totalité de la passation côté logique.
- Aucun drapeau d'alerte à retourner (à la différence de `alerteSuicide` du PHQ-9).
- Possibilité de partager la logique de validation d'entrée avec celle du PHQ-9 (mêmes contraintes : N items, plage 0-3, refus si manquant).

---

## 12. Historique des modifications

| Date | Auteur | Modification |
|------|--------|--------------|
| 28/04/2026 | Cascade (avec Claude) | Migration vers le template canonique Melya. Application de trois règles projet actées ce jour : (1) nom complet (FR) = libellé exact du PDF source primaire (ici "GAD-7", pas de traduction inventée) ; (2) hiérarchie des versions FR retenues : France > Suisse > Belgique > Canada ; (3) emplacement standard de la mention copyright obligatoire — côté patient sur l'écran de fin de passation (post-soumission), côté praticien dans la fiche du questionnaire en bibliothèque (traçabilité). Le pied de page persistant a été écarté au profit d'une mention unique en fin de passation, jugée plus adaptée à un format mobile-first où le pied n'est pas regardé. Bascule de la version "française canadienne" (UMontréal) vers la version "French for France" Pfizer (Center-TBI), conforme à la règle 2 et cohérente avec le PHQ-9 Melya. Ajout de Micoulaud-Franchi 2016 comme source de validation française. Correction d'une affirmation incorrecte de la spec précédente concernant l'existence d'une question d'impact fonctionnel sur le GAD-7 (le GAD-7 standalone Pfizer n'en contient pas). Documentation explicite des divergences entre les deux versions FR distribuées par Pfizer. Ajout des cas de test T9-T10 (sanity check), suppression de la mention d'alerte clinique non applicable. |
| 21/04/2026 | Cascade | Création initiale de la spec GAD-7 (version pré-template, ancrée sur Spitzer 2006 + version française canadienne UMontréal). |
