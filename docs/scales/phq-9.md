# Test spec — PHQ-9 (Questionnaire sur la Santé du Patient – 9)

<!--
Voir _TEMPLATE.md pour les règles projet (sourcing, copyright, FR-only,
hiérarchie versions, comparaison Mentaal).
-->

---

## 1. Métadonnées produit

| Champ | Valeur |
|-------|--------|
| **Nom court** | PHQ-9 |
| **Nom complet (FR)** | Questionnaire sur la Santé du Patient – 9 |
| **Nom complet (langue originale)** | Patient Health Questionnaire-9 |
| **Thème principal** | Dépression |
| **Sous-thèmes / tags** | dépression, trouble dépressif majeur, idéation suicidaire |
| **Nombre d'items** | 9 items scorés + 1 item d'impact fonctionnel non scoré |
| **Durée estimée de passation** | 3–5 min |
| **Public cible** | Adultes (≥ 18 ans) |
| **Mode d'administration** | auto |
| **Note sur le mode d'administration** | Échelle conçue dès l'origine pour l'auto-évaluation. Conception validée pour passation en ligne, papier, téléphone ou entretien. |
| **Description praticien (bibliothèque)** | Échelle d'auto-évaluation de 9 items pour mesurer la sévérité des symptômes dépressifs sur les 2 dernières semaines. Instrument de référence en dépistage et suivi du trouble dépressif majeur. |
| **Description patient (portail)** | AUCUNE — règle projet : le portail patient ne comporte pas de description de l'échelle. Seule la consigne officielle (section 4) est affichée. |

---

## 2. Sources et traçabilité

### Source primaire

- **Type** : document officiel de l'éditeur-distributeur (Pfizer Inc.)
- **Référence complète** : *Questionnaire sur la Santé du Patient – 9 (PHQ-9), French for France*. Développé par Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke et leurs collègues, avec une allocation d'études de Pfizer Inc.
- **URL** : https://www.prevention-depression.lu/wp-content/uploads/PHQ9_French_for_France.pdf
- **Date de consultation** : 24/04/2026

### Exception de sourcing — autorité unique justifiée

Pfizer Inc. distribue la traduction française officielle "French for France" du PHQ-9. C'est l'éditeur-distributeur historique de l'instrument, qui a financé son développement original (Kroenke, Spitzer & Williams, 2001). La version "French for France" est la version de référence pour la pratique clinique en France.

Aucune autre source ne peut se prévaloir d'une autorité équivalente : les travaux de validation psychométrique en contexte francophone (Carballeira et al., 2007 en Suisse ; Arthurs et al., 2012 au Canada) utilisent des versions adaptées localement, et ne sont pas des sources normatives pour le libellé des items en français de France.

**Règle projet appliquée** : 2 sources indépendantes minimum, *sauf si une source faisant autorité incontestable suffit à elle seule*. C'est le cas ici.

### Référence de validation française (à titre documentaire)

- **Validation suisse francophone** : Carballeira, Y., Dumont, P., Borgacci, S., et al. (2007). *Criterion validity of the French version of Patient Health Questionnaire (PHQ) in a hospital department of internal medicine*. Psychology and Psychotherapy: Theory, Research and Practice, 80(Pt 1), 69-77.
- **Validation canadienne francophone / équivalence linguistique** : Arthurs, E., Steele, R. J., Hudson, M., Baron, M., & Thombs, B. D. (2012). *Are scores on English and French versions of the PHQ-9 comparable? An assessment of differential item functioning*. PLoS One, 7(12), e52028.
- **Publication originale** : Kroenke, K., Spitzer, R. L., & Williams, J. B. W. (2001). *The PHQ-9: Validity of a brief depression severity measure*. Journal of General Internal Medicine, 16(9), 606-613.

### Divergences constatées entre sources

Aucune divergence structurelle. La version officielle Pfizer "French for France" est la référence. Les versions "French for Switzerland" et "French for Belgium" existent avec quelques ajustements linguistiques mineurs mais ne sont pas retenues ici.

### Version française retenue

- **Traducteur(s)** : traduction officielle Pfizer (traducteurs non nommés publiquement dans le PDF)
- **Année de la traduction** : non datée publiquement
- **Publication de validation française** : la version "French for France" n'a pas fait l'objet d'une publication de validation psychométrique spécifique sur population française. Les validations existent en Suisse romande (Carballeira 2007) et au Canada francophone (Arthurs 2012).
- **Justification du choix** : version "French for France" retenue car éditée par Pfizer pour la France et largement utilisée en pratique clinique française.

---

## 3. Statut copyright et licence

| Champ | Valeur |
|-------|--------|
| **Statut** | libre |
| **Détenteur des droits** | Pfizer Inc. (allocation d'études initiale) / auteurs (Spitzer, Williams, Kroenke) |
| **Mention obligatoire à afficher** | *« Développé par les Dr Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke et leurs collègues grâce à une allocation d'études de Pfizer Inc. »* |
| **Restrictions d'usage commercial** | Aucune — la mention Pfizer indique explicitement que *« La reproduction, la traduction, l'affichage ou la distribution de ce document sont autorisés »*. |
| **Décision Melya** | go |

---

## 4. Structure de l'échelle

### Consigne officielle (affichée au patient avant les items)

> *« Au cours des 2 dernières semaines, selon quelle fréquence avez-vous été gêné(e) par les problèmes suivants ? »*

**Source de la consigne** : version officielle Pfizer "French for France" (source primaire, section 2).

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
| 1 | Peu d'intérêt ou de plaisir à faire les choses |
| 2 | Être triste, déprimé(e) ou désespéré(e) |
| 3 | Difficultés à s'endormir ou à rester endormi(e), ou dormir trop |
| 4 | Se sentir fatigué(e) ou manquer d'énergie |
| 5 | Avoir peu d'appétit ou manger trop |
| 6 | Avoir une mauvaise opinion de soi-même, ou avoir le sentiment d'être nul(le), ou d'avoir déçu sa famille ou s'être déçu(e) soi-même |
| 7 | Avoir du mal à se concentrer, par exemple, pour lire le journal ou regarder la télévision |
| 8 | Bouger ou parler si lentement que les autres auraient pu le remarquer. Ou au contraire, être si agité(e) que vous avez eu du mal à tenir en place par rapport à d'habitude |
| 9 | Penser qu'il vaudrait mieux mourir ou envisager de vous faire du mal d'une manière ou d'une autre |

### Item d'impact fonctionnel (non scoré)

Le PHQ-9 officiel comporte une **question finale** qui n'est pas intégrée au score mais qui est présente sur le formulaire Pfizer :

> *« Si vous avez coché au moins un des problèmes évoqués, à quel point ce(s) problème(s) a-t-il (ont-ils) rendu votre travail, vos tâches à la maison ou votre capacité à vous entendre avec les autres difficile(s) ? »*

- Modalités :
  - Pas du tout difficile(s)
  - Assez difficile(s)
  - Très difficile(s)
  - Extrêmement difficile(s)

**Traitement dans Melya** : à valider avec Renata (cf. section 10). Option par défaut recommandée : inclure cette question dans la passation (pour cohérence avec le formulaire officiel et valeur clinique qualitative), mais la flagger comme *non scorée* dans le code et ne pas l'afficher comme score dans le résultat.

---

## 6. Algorithme de scoring

### Calcul du score total

**Score total = somme des 9 items scorés.** L'item d'impact fonctionnel n'entre pas dans le calcul.

**Plage du score total** : 0 à 27

### Subscores calculés

Aucun subscore officiel n'est défini pour le PHQ-9. Le score total est la métrique clinique de référence.

**Source de la définition des subscores** : Sans objet (pas de subscores).

### Inversions d'items

Aucune. Tous les items sont cotés dans le même sens (score élevé = symptôme plus fréquent).

### Gestion des réponses manquantes

**Règle projet** : passation refusée si un item scoré (1 à 9) est manquant. Pas d'imputation par défaut. L'item d'impact fonctionnel est également obligatoire si retenu dans la passation (cf. section 10).

---

## 7. Seuils d'interprétation

| Score | Interprétation |
|-------|----------------|
| 0–4   | Minimale |
| 5–9   | Légère |
| 10–14 | Modérée |
| 15–19 | Modérément sévère |
| 20–27 | Sévère |

**Source des seuils** :

| Champ | Valeur |
| --- | --- |
| **Référence académique** | Kroenke, K., Spitzer, R. L., & Williams, J. B. W. (2001). *The PHQ-9: Validity of a brief depression severity measure*. Journal of General Internal Medicine, 16(9), 606-613. |
| **URL directe vérifiable** | https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1495268/ |
| **Date de consultation** | 24/04/2026 |
| **Niveau de consensus** | référence universelle |

**Remarques sur les seuils** : le seuil de 10 est largement utilisé comme valeur de dépistage du trouble dépressif majeur (sensibilité 88 %, spécificité 88 % selon la publication originale). Ce n'est pas une alerte technique dans le code — c'est une information d'interprétation clinique qui reste du ressort du praticien.

---

## 8. Alertes cliniques

**Règle d'alerte** : si l'item 9 (*« Penser qu'il vaudrait mieux mourir ou envisager de vous faire du mal d'une manière ou d'une autre »*) est coté ≥ 1, la fonction de scoring doit renvoyer un drapeau `alerteSuicide: true`, **indépendamment du score total**.

**Source de la règle d'alerte** :

| Champ | Valeur |
| --- | --- |
| **Référence** | Choix Melya basé sur pratique clinique courante. Le seuil ≥ 1 est aligné avec la pratique générale en outils numériques de dépistage de la dépression. |
| **URL** | Sans objet (choix interne Melya, à confirmer avec Renata) |
| **Date de consultation** | Sans objet |
| **Justification du seuil exact** | Un score ≥ 1 sur l'item 9 indique la présence d'idéation suicidaire (pas seulement sa fréquence). Toute idéation, même rare, justifie une attention clinique. Le seuil ≥ 2 manquerait des cas où le patient a coté "Plusieurs jours" — déjà cliniquement significatif. |

**Comportement côté UI** : signal visuel dédié côté praticien sur la fiche du patient (badge ou indicateur). Rien d'affiché côté patient. Détails d'implémentation à arbitrer avec Adrien.

**Rationale clinique** : l'idéation suicidaire est une urgence clinique autonome. Un score total faible (ex. score = 1 avec uniquement item 9 = 1) ne doit pas masquer ce signal. Le praticien doit pouvoir identifier instantanément les passations concernées.

---

## 9. Cas de test unitaires

### 1. Cas limites (min/max)

| # | Réponses | Score | Sévérité | Alerte suicide |
|---|----------|-------|----------|-----------------|
| T1 | `[0,0,0,0,0,0,0,0,0]` | 0 | Minimale | non |
| T2 | `[3,3,3,3,3,3,3,3,3]` | 27 | Sévère | oui |

### 2. Transitions de seuil

Les réponses sont construites pour atteindre exactement le score cible, avec item 9 = 0 (sauf si sa présence est requise par la construction arithmétique).

| # | Score visé | Exemple de réponses | Sévérité attendue | Alerte |
|---|------------|---------------------|-------------------|--------|
| T3 | 4 | `[1,1,1,1,0,0,0,0,0]` | Minimale | non |
| T4 | 5 | `[1,1,1,1,1,0,0,0,0]` | Légère | non |
| T5 | 9 | `[2,1,1,1,1,1,1,1,0]` (somme = 9) | Légère | non |
| T6 | 10 | `[2,2,2,2,2,0,0,0,0]` | Modérée | non |
| T7 | 14 | `[2,2,2,2,2,2,1,1,0]` (somme = 14) | Modérée | non |
| T8 | 15 | `[2,2,2,2,2,2,1,2,0]` (somme = 15) | Modérément sévère | non |
| T9 | 19 | `[3,3,3,2,2,2,2,2,0]` (somme = 19) | Modérément sévère | non |
| T10 | 20 | `[3,3,3,3,2,2,2,2,0]` (somme = 20) | Sévère | non |

### 3. Cas typiques (sanity check)

| # | Réponses | Score | Sévérité | Alerte |
|---|----------|-------|----------|--------|
| T11 | `[2,2,1,2,1,2,1,1,0]` | 12 | Modérée | non |
| T12 | `[1,1,2,2,1,1,1,0,0]` | 9 | Légère | non |

### 4. Cas spécifiques — alerte suicide (item 9 ≥ 1)

Vérification que l'alerte se déclenche dès item 9 ≥ 1, indépendamment du score total.

| # | Réponses | Score | Sévérité | Alerte |
|---|----------|-------|----------|--------|
| T13 | `[0,0,0,0,0,0,0,0,1]` | 1 | Minimale | **oui** |
| T14 | `[0,0,0,0,0,0,0,0,3]` | 3 | Minimale | **oui** |
| T15 | `[2,2,2,0,0,0,0,0,1]` | 7 | Légère | **oui** |
| T16 | `[3,3,3,3,3,3,3,3,3]` | 27 | Sévère | **oui** |

### 5. Entrées invalides

| # | Cas | Comportement attendu |
|---|-----|----------------------|
| T17 | Valeur hors borne : item 1 = 4 | Erreur de validation, pas de score calculé |
| T18 | Valeur négative : item 1 = -1 | Erreur de validation |
| T19 | Réponse manquante : item 5 = `null` ou absent | Erreur de validation — les 9 items sont requis |
| T20 | Valeur non numérique : item 1 = `"oui"` | Erreur de validation |
| T21 | Tableau de 8 réponses au lieu de 9 | Erreur de validation |
| T22 | Tableau de 10 réponses (confusion avec l'item d'impact) | Erreur de validation |

---

## 10. Points à valider avec Renata

1. **Libellés des 9 items** — confirmer que la formulation Pfizer "French for France" convient à sa pratique clinique française. Les libellés sont repris verbatim de la source officielle.
2. **Libellés de sévérité** — valider les 5 libellés *Minimale / Légère / Modérée / Modérément sévère / Sévère*. Ce sont les termes standards de la littérature française, mais une confirmation est utile.
3. **Item d'impact fonctionnel** — décision produit à trancher :
   - Option A : inclure dans la passation, non scoré, visible dans le résultat côté praticien à titre d'information qualitative
   - Option B : exclure totalement, ne pas afficher au patient
   - Recommandation Melya : Option A, par cohérence avec le formulaire officiel Pfizer.
4. **Règle d'alerte item 9** — valider que l'alerte se déclenche dès item 9 ≥ 1, pas à un seuil plus élevé (ex. ≥ 2). Position Melya : seuil à 1 conformément à la pratique clinique courante.
5. **Gestion des réponses manquantes** — confirmer qu'une passation incomplète doit être refusée (pas d'imputation de valeur par défaut).
6. **Affichage de l'alerte côté praticien** — forme visuelle à définir (badge rouge, icône, libellé). Discussion UX à avoir.

---

## 11. Contrat technique pour Adrien

### Signature de la fonction de scoring

```typescript
scorePhq9(réponses: number[]) → {
  scoreTotal: number,
  sévérité: "Minimale" | "Légère" | "Modérée" | "Modérément sévère" | "Sévère",
  alerteSuicide: boolean
}
```

### Contrat d'erreur

- Erreurs de validation levées avec un **message explicite** (pas un score à 0 silencieux).
- Toute entrée invalide (cf. section 9.5) doit produire une erreur typée, pas un crash non géré.
- Les 9 items scorés sont tous requis. Pas d'imputation par défaut.

### Clés de réponse attendues

Entrée : tableau de 9 nombres (un par item scoré, dans l'ordre des items 1 à 9). L'item d'impact fonctionnel, s'il est retenu dans la passation (cf. section 10 point 3), sera traité séparément et ne rentre pas dans cette fonction de scoring.

### Notes d'implémentation

- Plage de cotation 0-3 (cohérente avec GAD-7, PCL-5, mais différente de RSES qui est en 1-4).
- Item d'impact fonctionnel : à gérer en dehors du scoring, avec son propre champ dans le modèle de passation. Ne pas le mélanger avec les 9 items scorés.

---

## 12. Historique des modifications

| Date | Auteur | Modification |
|------|--------|--------------|
| 25/04/2026 | Clément (avec Claude) | Ajout des trois champs structurés "Source liée" pour traçabilité directe : subscores (sans objet), seuils (Kroenke 2001 avec URL PubMed Central), alerte item 9 (choix Melya documenté avec justification du seuil ≥ 1). |
| 24/04/2026 | Clément (avec Claude) | Création initiale du spec selon le template canonique Melya. Alignement des libellés d'items sur la version officielle Pfizer "French for France" (ajout virgule item 7). Clarification du statut de l'item d'impact fonctionnel (non scoré, à valider avec Renata). Documentation de l'exception de sourcing (autorité unique Pfizer). |
