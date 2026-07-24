# Test spec — PSWQ

<!--
Voir _TEMPLATE.md pour les règles projet (sourcing, copyright, FR-only,
hiérarchie versions, comparaison Mentaal).

Acronyme : PSWQ partout (app, landing, docs, code), aligné concurrent Mentaal
et littérature. « QIPS » n'est conservé que pour désigner spécifiquement la
traduction française validée (Gosselin et al., 2001). Id technique interne :
`qips` (clé DB/Sanity, non migrée).
-->

---

## 1. Métadonnées produit

| Champ | Valeur |
|-------|--------|
| **Nom court (acronyme public)** | PSWQ |
| **Id technique interne** | `qips` (clé DB + Sanity ; historique, non migrée) |
| **Version française validée** | QIPS (Gosselin et al., 2001) |
| **Nom complet (FR)** | Questionnaire sur les inquiétudes du Penn State |
| **Nom complet (langue originale)** | Penn State Worry Questionnaire (PSWQ) |
| **Thème principal** | Anxiété généralisée |
| **Sous-thèmes / tags** | inquiétude, worry, tendance à s'inquiéter, TAG |
| **Nombre d'items** | 16 items scorés (dont 5 inversés) |
| **Durée estimée de passation** | 5–10 min |
| **Public cible** | Adultes (≥ 18 ans). |
| **Mode d'administration** | auto |
| **Note sur le mode d'administration** | Auto-questionnaire. Mesure la tendance générale (dispositionnelle) à s'inquiéter, sans période de référence temporelle explicite. |
| **Description praticien (bibliothèque)** | Échelle d'auto-évaluation de 16 items mesurant la tendance générale, excessive et incontrôlable à s'inquiéter — symptôme central du trouble anxieux généralisé. |
| **Description patient (portail)** | AUCUNE — règle projet : le portail patient ne comporte pas de description de l'échelle. Seule la consigne officielle (section 4) est affichée. |

---

## 2. Sources et traçabilité

### Source primaire (version FR retenue)

- **Type** : traduction française officielle **validée** — QIPS de Gosselin et al.
- **Référence complète** : Gosselin, P., Dugas, M. J., Ladouceur, R., & Freeston, M. H. (2001). *Évaluation des inquiétudes : validation d'une traduction française du Penn State Worry Questionnaire*. L'Encéphale, 27(5), 475–484.
- **Fichier de portage** : `gosselin-ea-2001.pdf` (article complet) — **annexe 1** = questionnaire officiel : 16 items, consigne, échelle 1–5 « correspondant », mention de copyright. Items inversés (1, 3, 8, 10, 11) identifiés p. 477.
- **URL** : https://pubmed.ncbi.nlm.nih.gov/11760697/
- **Date de consultation** : 15/07/2026 (article récupéré et items recochés le 16/07/2026)

### Instrument original

- Meyer, T. J., Miller, M. L., Metzger, R. L., & Borkovec, T. D. (1990). *Development and validation of the Penn State Worry Questionnaire*. Behaviour Research and Therapy, 28(6), 487–495.

### Divergences constatées entre sources

- **Échelle de réponse** : l'annexe 1 de Gosselin et al. (2001) — source primaire — donne *Pas du tout / Un peu / Assez / Très / Extrêmement **correspondant***. Le formulaire de cabinet (F. Ballet) initialement utilisé pour le portage disait « caractéristique » ; les vulgarisations en ligne raccourcissent en « Pas du tout … Extrêmement ». **Retenu : « correspondant »** (verbatim de la version validée). Corrigé le 16/07/2026 — la première version de cette spec affirmait à tort que « caractéristique » était le verbatim Gosselin.
- **Items** : le formulaire Ballet divergeait de l'annexe 1 sur 5 items (1 : « je ne m'en inquiète pas » ; 11 : « je ne peux plus rien faire au sujet d'un souci » ; 12 : « un inquiet » ; 14 : « je ne peux plus m'arrêter » ; 16 : « terminés »). **Retenu : verbatim annexe 1** pour les items 1, 5, 11, 12 et 14. Seule exception : item 16, « complétés » (québécisme de la version validée) → « **terminés** », adaptation FR-France assumée (règle projet : versions FR-France privilégiées).
- **Consigne** : annexe 1 = « …chacun des énoncés suivants **correspond à vous** » (retenu), formulaire Ballet = « …vous correspond ».

### Arbitrage vs Mentaal (décidé le 16/07/2026)

Comparaison avec l'implémentation du concurrent Mentaal, tranchée avec Adrien :

| Élément | Mentaal | Melya (retenu) |
| --- | --- | --- |
| Ancres 1–5 | « caractéristique » (calque littéral de l'anglais *characteristic/typical*) | **« correspondant »** — ancre de la VF **validée** (Gosselin 2001), c'est ce libellé qui a été testé psychométriquement |
| Consigne | réécrite, plus « chaleureuse », avec « ressenti global et **récent** » | **verbatim Gosselin (option a)** — cadre trait préservé |

**Point clinique décisif** : le PSWQ est explicitement une **mesure de trait**, pas d'état — Gosselin le pose noir sur blanc (étude 2 : *« devrait être considéré comme une mesure de traits de personnalité et non comme une mesure d'état »*). La consigne Mentaal, en injectant « **récent** », requalifie une disposition durable en ressenti récent : **inexactitude clinique**, pas simple reformulation. Melya reste fidèle à l'instrument validé → argument de différenciation (fidélité à la VF validée, cf. positionnement projet).

**Décision** : ne **pas** adopter « caractéristique » ni la consigne Mentaal. On garde « correspondant » + consigne Gosselin verbatim. Sujet clos.

### Version française retenue

- **Traducteur(s)** : P. Gosselin, M. J. Dugas, R. Ladouceur, M. H. Freeston (2001).
- **Publication de validation française** : Gosselin et al. (2001), L'Encéphale — propriétés psychométriques excellentes (cohérence interne, validité convergente/divergente) sur populations clinique et non clinique francophones.

---

## 3. Statut copyright et licence

| Champ | Valeur |
|-------|--------|
| **Statut** | libre (usage clinique et recherche) |
| **Détenteur des droits** | Auteurs originaux (Meyer, Miller, Metzger, Borkovec, 1990) ; traduction Gosselin et al. (2001). |
| **Mention obligatoire à afficher** | *« Penn State Worry Questionnaire (PSWQ) — Meyer, Miller, Metzger & Borkovec, 1990. Traduction française (QIPS) © P. Gosselin, M. J. Dugas, R. Ladouceur & M. H. Freeston (2001), Université Laval — L'Encéphale, 27(5). Tous droits réservés. »* (l'annexe 1 porte « © Tous droits réservés » + Université Laval — repris tel quel) |
| **Emplacement de la mention (règle projet)** | Côté patient : écran de fin de passation (post-soumission), texte gris discret, une fois. Côté praticien : fiche du questionnaire en bibliothèque. |
| **Restrictions d'usage** | Le PSWQ est largement diffusé en accès libre pour l'usage clinique et de recherche, avec attribution. ⚠️ Nuance : la traduction QIPS est publiée avec la mention « © Tous droits réservés » (Gosselin et al., Université Laval) — diffusée librement en pratique (annexe d'article), mais le statut n'est pas une licence explicite. |
| **Décision Melya** | go |

---

## 4. Structure de l'échelle

### Consigne officielle (affichée au patient avant les items)

> *« Veuillez utiliser l'échelle ci-dessous pour exprimer jusqu'à quel point chacun des énoncés suivants correspond à vous. »*

**Source de la consigne** : annexe 1 de Gosselin et al. (2001), verbatim — hors parenthèse « (écrivez le numéro vous représentant, à l'avant de chacun des énoncés) », propre au format papier, sans objet en passation numérique.

### Comportement UX de la consigne

| Champ | Valeur |
| --- | --- |
| **Persistance** | persistante — rappel court `persistentInstructions` : « Jusqu'à quel point cet énoncé vous correspond-il ? » |
| **Emplacement** | en-tête au-dessus de l'item |
| **Justification** | La consigne complète est peu actionnable item par item ; un rappel court soutient la cotation « caractéristique ». |

### Affichage du titre côté portail patient

| Champ | Valeur |
| --- | --- |
| **Élément affiché en titre sur le formulaire source** | Nom complet français + acronyme : « Questionnaire sur les inquiétudes du Penn State (QIPS) » |
| **Sous-titre à afficher dans l'app (`patientIntroSubtitle`)** | non défini → fallback sur `label` = « Questionnaire sur les inquiétudes du Penn State ». Reproduit le formulaire source (nom complet FR affiché). |

### Dimensions de cotation

**Dimension unique — Correspondance (« correspondant »)**

- Plage : 1 à 5
- Modalités (annexe 1, verbatim) :
  - `1` — Pas du tout correspondant
  - `2` — Un peu correspondant
  - `3` — Assez correspondant
  - `4` — Très correspondant
  - `5` — Extrêmement correspondant

⚠️ **Cotation débutant à 1** (comme le RSES), pas à 0. Le score minimal théorique est 16 (et non 0).

---

## 5. Items

### Variante A — Items à modalités de réponse uniformes

| # | Item | Inversé |
|---|------|:---:|
| 1 | Si je n'ai pas assez de temps pour tout faire, je ne m'inquiète pas. | ✅ |
| 2 | Mes inquiétudes me submergent. | |
| 3 | Je n'ai pas tendance à m'inquiéter à propos des choses. | ✅ |
| 4 | Plusieurs situations m'amènent à m'inquiéter. | |
| 5 | Je sais que je ne devrais pas m'inquiéter mais je n'y peux rien. | |
| 6 | Quand je suis sous pression, je m'inquiète beaucoup. | |
| 7 | Je m'inquiète continuellement à propos de tout. | |
| 8 | Il m'est facile de me débarrasser de pensées inquiétantes. | ✅ |
| 9 | Aussitôt que j'ai fini une tâche, je commence immédiatement à m'inquiéter au sujet de toutes les autres choses que j'ai encore à faire. | |
| 10 | Je ne m'inquiète jamais. | ✅ |
| 11 | Quand je n'ai plus rien à faire au sujet d'un tracas, je ne m'en inquiète plus. | ✅ |
| 12 | J'ai été inquiet tout au long de ma vie. | |
| 13 | Je remarque que je m'inquiète pour certains sujets. | |
| 14 | Quand je commence à m'inquiéter, je ne peux pas m'arrêter. | |
| 15 | Je m'inquiète tout le temps. | |
| 16 | Je m'inquiète au sujet de mes projets jusqu'à ce qu'ils soient terminés. ⚠️ annexe 1 : « complétés » (québécisme) → adaptation FR-France | |

Items 1–15 : verbatim annexe 1 (Gosselin et al., 2001). Item 16 : seule adaptation (« complétés » → « terminés »).

---

## 6. Algorithme de scoring

### Calcul du score total

1. **Inverser** les items 1, 3, 8, 10, 11 sur l'échelle 1–5 : `valeur_recodée = 6 − valeur`.
2. **Additionner** les 16 items recodés.

**Plage du score total** : 16 à 80.

### Inversions d'items

Items **1, 3, 8, 10, 11** (formulés dans le sens « faible inquiétude »). Formule `6 − v` (1↔5, 2↔4, 3↔3).

### Note d'implémentation importante

Le scorer RSES (échelle 1–4) utilise `5 − v`. Le PSWQ est en 1–5 → formule **`6 − v`**. Scorer dédié `apps/api/src/scoring/scorers/pswq.ts` (ne pas réutiliser le scorer RSES tel quel).

### Gestion des réponses manquantes

Refus de la passation incomplète. Les 16 items sont requis ; pas d'imputation.

---

## 7. Seuils d'interprétation

| Score | Interprétation |
|-------|----------------|
| 16–39 | Inquiétude faible |
| 40–54 | Inquiétude modérée |
| 55–80 | Inquiétude élevée (évocatrice d'un TAG) |

**Source des seuils** — ⚠️ **à valider** :

- L'article de validation (Gosselin et al., 2001) ne définit **aucun seuil clinique**. Le formulaire de cabinet consulté au portage donne deux « scores théoriques » **non contigus** : *25–40 = normal* et *55–75 = TAG*, laissant des zones sans étiquette (16–24, 41–54, 76–80).
- Melya a construit une grille **contiguë en 3 niveaux** couvrant tout l'intervalle 16–80, ancrée sur ces repères : borne haute du « normal » ≈ 40, borne basse du « TAG » = 55. La bande intermédiaire 40–54 (« modérée ») est un **choix produit Melya** pour combler le vide et permettre l'affichage de la gauge.
- **À faire valider par le·la psychologue référent·e** (voir section 10). Alternative possible : n'afficher que deux zones (normal / évocateur de TAG) sans bande intermédiaire, si la·le référent·e préfère coller strictement aux repères.

### Données normatives (Gosselin et al., 2001)

| Échantillon | M | ET | n |
|-------------|-----|-----|-----|
| Non clinique (étudiants, étude 1) | 44,52 | 11,97 | 352 |
| Non clinique (étude 2, passation 1) | 46,43 | 11,35 | 95 |
| Clinique TAG (étude 3) | 62,55 | 9,06 | 75 |

Fidélité : α = 0,92 (non clinique) / 0,82 (TAG) ; test-retest 4 semaines r = 0,86.

⚠️ **Tension avec la grille Melya** : la moyenne **non clinique** (≈ 44,5) tombe dans la bande « Inquiétude modérée » (40–54). Un score « dans la moyenne de la population générale » est donc étiqueté « modéré » — libellé à rediscuter (cf. section 10).

---

## 8. Alertes cliniques

Aucune. Le score total seul détermine le niveau ; aucun item ne déclenche d'alerte autonome.

---

## 9. Cas de test unitaires

Rappel : les items 1, 3, 8, 10, 11 sont inversés (`6 − v`).

| # | Réponses | Score | Niveau |
|---|----------|-------|--------|
| T1 | Tous les items = 1 | 36 | Inquiétude faible |
| T2 | Tous les items = 5 | 60 | Inquiétude élevée |
| T3 | Tous les items = 3 | 48 | Inquiétude modérée |
| T4 | Score min réel : items normaux = 1, items inversés = 5 | 16 | Inquiétude faible |
| T5 | Score max réel : items normaux = 5, items inversés = 1 | 80 | Inquiétude élevée |

### Transitions de seuil

| # | Score | Niveau attendu |
|---|-------|----------------|
| T6 | 39 | Inquiétude faible |
| T7 | 40 | Inquiétude modérée |
| T8 | 54 | Inquiétude modérée |
| T9 | 55 | Inquiétude élevée |

### Entrées invalides

| # | Cas | Comportement attendu |
|---|-----|----------------------|
| T10 | Valeur hors borne : item 2 = 0 ou 6 | Erreur de validation |
| T11 | Réponse manquante | Erreur de validation — 16 items requis |
| T12 | Tableau de 15 ou 17 réponses | Erreur de validation |

---

## 10. Points à valider avec le·la psychologue référent·e

1. **Seuils / bandes de sévérité** — valider la grille contiguë en 3 niveaux (16–39 / 40–54 / 55–80) construite par Melya à partir des repères non contigus du formulaire de cabinet (25–40 normal, 55–75 TAG). Notamment la bande intermédiaire 40–54 (« modérée ») qui est un choix produit. Alternative : affichage en 2 zones seulement.
2. **Libellés de niveaux** — valider *Inquiétude faible / modérée / élevée*, sachant que la moyenne non clinique (≈ 44,5, Gosselin 2001) tombe dans la bande « modérée » : envisager « dans la moyenne » ou l'affichage des moyennes de référence (non clinique ≈ 45 / TAG ≈ 62) en complément.
3. **Item 16** — valider l'adaptation FR-France « terminés » (annexe 1 : « complétés », québécisme). Seul écart au verbatim de la version validée.

---

## 11. Contrat technique

### Signature de scoring

```typescript
scorePswq(scale, responses) → {
  totalScore: number,        // 16–80
  maxScore: 80,
  interpretation: string,
  severityIndex: number,
  severityRangeCount: 3
}
```

### Notes d'implémentation

- `formType: "single-scale"`, `reverseItems: [1, 3, 8, 10, 11]`, clés de réponse `intensity_0 … intensity_15`.
- Inversion sur échelle 1–5 : `6 − v` (≠ RSES qui est `5 − v`).
- Scorer `apps/api/src/scoring/scorers/pswq.ts` (fonction `scorePswq`), enregistré sous la clé `qips` (id historique de l'échelle) dans `ScoringService`.
- Icône : `apps/web/public/images/scales/pswq.svg` — ⚠️ **placeholder** (copie de `gad-7.svg`, identique à la catégorie « Anxiété généralisée ») à remplacer par un doodle dédié.

---

## 12. Historique des modifications

| Date | Auteur | Modification |
|------|--------|--------------|
| 15/07/2026 | Adrien (avec Claude) | Création de l'échelle QIPS : entrée `Scale` dans `packages/core`, scorer `qips.ts` (inversion `6 − v`) + enregistrement, icône placeholder, spec. Items FR issus de la traduction validée Gosselin et al. (2001), portés verbatim depuis un formulaire QIPS. Inversés 1/3/8/10/11, échelle 1–5 « caractéristique », score 16–80. Grille de seuils contiguë en 3 niveaux construite par Melya à partir des repères Gosselin non contigus — à valider. |
| 16/07/2026 | Adrien (avec Claude) | Arbitrage vs Mentaal tranché (§2) : on garde **« correspondant »** (ancre VF validée) et la **consigne Gosselin verbatim (option a)**. Mentaal utilise « caractéristique » (calque anglais) + une consigne réécrite qui injecte « récent » → requalifie à tort une mesure de trait en mesure d'état. Aucun changement de code (l'implémentation était déjà conforme). |
| 16/07/2026 | Adrien (avec Claude) | Bascule de l'acronyme public **QIPS → PSWQ** partout (app, landing, docs, code, noms de fichiers : `pswq.ts`/`scorePswq`, `pswq.svg`, dossier `docs/scales/pswq/`). Id technique interne conservé à `qips` (clé DB/Sanity, non migrée). « QIPS » conservé uniquement pour désigner la VF validée (Gosselin 2001). |
| 16/07/2026 | Adrien (avec Claude) | Recoche contre la source primaire (`gosselin-ea-2001.pdf`, annexe 1) : échelle de réponse corrigée « caractéristique » → « **correspondant** » (verbatim validé), items 1/5/11/12/14 alignés sur l'annexe 1, consigne alignée (« correspond à vous »), item 16 conservé en « terminés » (adaptation FR-France documentée). Mention de copyright enrichie (© Gosselin et al., Université Laval, tous droits réservés). Ajout des données normatives (non clinique ≈ 44,5 / TAG ≈ 62,6) + alerte sur le libellé de la bande 40–54. `psi-ii.pdf` (source WW-II, mal rangé ici) déplacé vers `docs/scales/ww-ii/`. |
