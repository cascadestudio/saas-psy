# Test spec — AUDIT (Test de repérage des troubles liés à l'usage de l'alcool)

<!--
Voir _TEMPLATE.md pour les règles projet (sourcing, copyright, FR-only,
hiérarchie versions, comparaison Mentaal).
-->

---

## 1. Métadonnées produit

| Champ | Valeur |
|-------|--------|
| **Nom court** | AUDIT |
| **Nom complet (FR)** | Test de repérage des troubles liés à l'usage de l'alcool |
| **Nom complet (langue originale)** | Alcohol Use Disorders Identification Test (AUDIT) |
| **Thème principal** | Addictions |
| **Sous-thèmes / tags** | alcool, mésusage, dépendance, repérage, consommation |
| **Nombre d'items** | 10 items scorés |
| **Durée estimée de passation** | 2–3 min |
| **Public cible** | Adultes (≥ 18 ans). |
| **Mode d'administration** | auto (à l'origine administrable en auto ou hétéro ; ici auto-passation patient) |
| **Note sur le mode d'administration** | Période de référence = 12 derniers mois : annoncée dans la consigne et rappelée par le préfixe « Dans les douze derniers mois, » sur les items 4 à 8, comme dans la source primaire. |
| **Description praticien (bibliothèque)** | Questionnaire de 10 items de l'OMS repérant une consommation d'alcool à risque, nocive ou une dépendance sur les 12 derniers mois. |
| **Description patient (portail)** | AUCUNE — règle projet : le portail patient ne comporte pas de description de l'échelle. Seule la consigne officielle (section 4) est affichée. |

---

## 2. Sources et traçabilité

### Source primaire (libellés des items — version FR OMS)

- **Type** : traduction française officielle diffusée par le dépositaire international de l'AUDIT.
- **Référence** : *A.U.D.I.T. (Alcohol Use Disorders Identification Test)* — version française, auditscreen.org (site officiel de diffusion de l'AUDIT).
- **URL** : https://auditscreen.org/cmsb/uploads/audit-french.pdf
- **Fichier de portage** : `docs/scales/audit/AUDIT_auditscreen_official.pdf`
- **Date de consultation** : 15/07/2026

### Source de cross-check (items + seuils — France)

- **Type** : institutionnel FR — Observatoire français des drogues et des tendances addictives (OFDT), reprenant la cotation de la **Société Française d'Alcoologie (2015)**.
- **Référence** : *Questionnaire AUDIT — Repérage des consommations problématiques*, OFDT (fiche datée 28/02/2019), seuils SFA 2015.
- **URL** : https://www.ofdt.fr/sites/ofdt/files/2024-06/audit_vf_28-02-19.pdf
- **Fichier de portage** : `docs/scales/audit/AUDIT_OFDT.pdf`
- **Date de consultation** : 15/07/2026

### Instrument original

- Saunders, J. B., Aasland, O. G., Babor, T. F., de la Fuente, J. R., & Grant, M. (1993). *Development of the Alcohol Use Disorders Identification Test (AUDIT): WHO Collaborative Project on Early Detection of Persons with Harmful Alcohol Consumption — II.* Addiction, 88(6), 791–804.
- Validation française : Gache, P., Michaud, P., Landry, U., et al. (2005). *The AUDIT as a screening tool for excessive drinking in primary care: reliability and validity of a French version.* Alcohol Clin Exp Res, 29(11), 2001–2007.

### Sources complémentaires (arbitrage des écarts)

- **Original anglais — questionnaire** : *AUDIT questionnaire*, auditscreen.org. URL : https://auditscreen.org/~auditscreen/cmsb/uploads/audit-english-version-new_001.pdf — fichier `docs/scales/audit/AUDIT_auditscreen_english.pdf` — consulté le 29/09/2026.
- **Original anglais — manuel OMS** : Babor, T. F., Higgins-Biddle, J. C., Saunders, J. B., & Monteiro, M. G. (2001). *AUDIT — The Alcohol Use Disorders Identification Test: Guidelines for Use in Primary Care* (2e éd.). OMS, WHO/MSD/MSB/01.6a. URL : https://www.paho.org/sites/default/files/Auditmanual_ENG.pdf — fichier `docs/scales/audit/AUDIT_manuel_OMS_Babor_2001.pdf` — consulté le 29/09/2026.
- **Version suisse** : grille AUDIT publiée dans la *Revue Médicale Suisse* (capture d'écran fournie par Clément le 29/09/2026). Référence complète de l'article [À SOURCER]. Consultée comme troisième avis uniquement : version suisse (hiérarchie France > Suisse) et plusieurs défauts (cf. ci-dessous).

- **Version française de Michaud & Lécallier (2003)** : Michaud, P., & Lécallier, D. (2003). *Risque alcool chez les plus âgés. Difficultés liées au repérage.* Gérontologie et société, 26(105), 89-99. DOI : 10.3917/gs.105.0089. URL : https://shs.cairn.info/revue-gerontologie-et-societe1-2003-2-page-89?lang=fr — tableau 3 « L'audit » — consulté le 29/09/2026. Philippe Michaud est co-auteur de la validation française (Gache et al., 2005). PDF conservé hors du dépôt public (article diffusé par Cairn sous conditions d'utilisation).
  - Même lignée de traduction que la version OMS FR (« cette unité de temps », « culpabilité ou de regret », « la nuit précédente »), retravaillée : « à quelle fréquence » au lieu de « combien de fois », coquilles des items 5 et 6 corrigées, réponses des items 9-10 en « douze derniers mois ».
  - La consigne reprend celle de l'OMS FR et ajoute : « Ce questionnaire cherche à évaluer le risque attaché à la consommation d'alcool. », « Si vous ne prenez jamais d'alcool, ne répondez qu'à la première question. » et « Un verre standard = 10 g d'alcool pur. »
  - ⚠️ Item 10 : « un parent » a disparu (« Est-ce qu'un ami ou un médecin… ») et le « et » erroné de l'OMS FR est conservé.

### Divergences constatées entre sources

Les cotations sont identiques partout (items 1-8 : 0-4 ; items 9-10 : 0/2/4). Les libellés diffèrent sur presque tous les items.

| Élément | OMS FR (primaire) | OFDT (secondaire) | RevMed (Suisse) | Original anglais |
|---|---|---|---|---|
| Consigne | Au patient : « Ce questionnaire interroge votre consommation d'alcool des douze derniers mois… » | Au clinicien (hétéro-passation) : « Les dix questions qui suivent doivent être de préférence posées sans reformulation… » | — (non visible) | Manuel : consigne au patient à adapter localement |
| Préfixe items 4-8 | « Dans les douze derniers mois, » | « Au cours de l'année écoulée, » | « Au cours de l'année écoulée, » | « During the past year, » |
| Item 1 | « Combien de fois vous arrive-t-il de consommer de l'alcool ? » | « À quelle fréquence consommez-vous de l'alcool ? » | « Combien de boissons contenant de l'alcool consommez-vous ? » (⚠️ question en quantité, réponses en fréquence) | « How often do you have a drink containing alcohol? » |
| Item 2 | « verres standards […] journée ordinaire » ; réponses en lettres | « verre d'alcool […] jour typique » ; réponses en chiffres | « verres contenant de l'alcool » ; ⚠️ « 7 ou 9 » | « standard drinks » ; « 7 to 9 » |
| Item 5 | ⚠️ coquilles « l'alcool, vous -a-t-il » | « vous a-t-il empêché de faire ce qui était normalement attendu de vous » | « votre consommation d'alcool vous a-t-elle empêché » | « failed to do what was normally expected of you » |
| Item 6 | ⚠️ « avez-vous du boire » ; « vous remettre en forme » | « dû » ; « vous sentir en forme » | « dû boire un verre » ; ⚠️ « d'une soirée bien arrosée » (sens restreint) | « after a heavy drinking session » |
| Item 7 | « culpabilité ou de regret » | « culpabilité ou des remords » | « culpabilité ou des remords » | « guilt or remorse » |
| Item 8 | « vous souvenir de […] la nuit précédente » | « vous rappeler […] la soirée précédente » | « la veille » ; ⚠️ « trop bu » | « the night before » |
| Item 9 | Identique dans les trois versions FR | | | |
| **Item 10** | « …s'est déjà préoccupé […] **et** vous a conseillé de la diminuer ? » | « …s'est-il inquiété […] **ou** a-t-il suggéré que vous la réduisiez ? » | « …**et** vous a conseillé de la diminuer ? » | « been concerned about your drinking **or** suggested you cut down? » |
| Dernière réponse items 3-8 | « chaque jour ou presque » | « Tous les jours ou presque » | « Chaque jour ou presque » | « Daily or almost daily » |
| Items 9-10, réponse 2 | « oui mais pas dans l'année passée » | « Oui, mais pas au cours de l'année écoulée » | « Oui, mais pas dans les douze derniers mois » | « Yes, but not in the past year » |
| Items 9-10, réponse 4 | ⚠️ « oui au cours de l'année dernière » (ambigu : année civile précédente) | « Oui, au cours de l'année » | « Oui, au cours des douze derniers mois » | « Yes, during the past year » |
| Seuils | Aucun | SFA 2015 : mésusage ≥ 7 H / ≥ 6 F ; dépendance > 12 | — (non visible) | ≥ 8 à risque ; dépendance ≥ 13 F / ≥ 15 H |

- ⚠️ **Le flyer Addict'AIDE** (`docs/scales/audit/AUDIT_addictaide.pdf`) **contient des erreurs** et a été **écarté** : item 2 « 7 ou 8 » au lieu de « 7 à 9 » ; libellés de fréquence des items 3-8 incohérents.
- Les écarts retenus, et leur justification, sont consignés en §10.

### Version française retenue

- **Traducteur(s) / validation** : version OMS francophone (auditscreen.org) ; validation psychométrique française Gache et al. (2005).
- **Seuils** : Société Française d'Alcoologie (2015), via OFDT.

### Comparaison navigateur avec Mentaal — recette du 24/07/2026 (Clément + Claude)

*Constats d'origine conservés tels quels. Les décisions prises depuis (29/09/2026) sont en §10 ; elles tranchent notamment le préfixe des items 4-8 (rétabli) et les libellés des items 9-10.*

Parcours patient Mentaal déroulé **intégralement** (lien `mentaal.fr/a/…`, intro + 10 items + écran de fin), comparé item par item à notre version `packages/core` **et** à la source primaire `AUDIT_auditscreen_official.pdf`.

**Constat central : Mentaal est une reprise quasi *verbatim* de la source auditscreen.org (imperfections comprises) ; notre version est la *même source, légèrement éditée*.** La plupart des « écarts » nous/Mentaal viennent donc de **nos retouches volontaires**, pas d'une divergence de source.

| Élément | Nous | Mentaal | Source auditscreen.org | Verdict |
|---|---|---|---|---|
| Formulation items 1-3, 9 | idem source | idem source | — | ✅ identiques et conformes |
| **Préfixe « Dans les douze derniers mois, » (items 4-8)** | **Absent** (porté en consigne + en-tête persistant) | **Présent** sur 4-8 | **Présent** sur 4-8 | ⚠️ **Nous dévions de notre propre source primaire** ; Mentaal est fidèle. → décision §10 pt 5 |
| « verres standards » (items 2-3) | présent **+ définition** (~10 g) en consigne | présent, **sans définition** | présent, sans définition | ✅ Notre ajout est un plus produit (la source ne définit pas non plus) |
| Item 5 « vous -a-t-il » / item 6 « du boire » | **corrigé** (« vous a-t-il » / « dû ») | tel quel | **tel quel** (imperfections DANS le PDF source) | ℹ️ PAS des fautes Mentaal : c'est la source. Nous avons nettoyé → amélioration mais déviation verbatim |
| Dernière option (items 3-8) | « Chaque jour ou presque » (constant) | « Chaque jour » sauf Q5 « Tous les jours » | « chaque jour ou presque » | ✅ **Nous = source ET constant** ; Mentaal a une incohérence (Q5) |
| Item 10 (formulation) | inversion « Un parent… s'est-il… vous a-t-il conseillé » | « Est-ce qu'un parent… s'est déjà préoccupé… et vous a conseillé » | idem Mentaal | ↩️ Mentaal = source ; nous avons reformulé. Cosmétique |
| Items 9-10, option valeur 4 | « Oui, au cours de l'année **écoulée** » | « Oui, au cours de l'année » | « oui au cours de l'année **dernière** » | ⚠️ Les 3 diffèrent, aucun exact. Cosmétique, à normaliser (§10 pt 7) |
| Item 2, option val. 3 | « Sept à neuf » (7-9 ✓) | « 7, 8 ou 9 » (7-9 ✓) | « sept à neuf » | ✅ Les deux corrects (l'erreur « 7 ou 8 » n'existe que dans le flyer Addict'AIDE, écarté) |
| Intro / consigne | consigne dédiée (12 mois + verre standard) | intro générique « chaleureuse » (ni cadre 12 mois, ni verre standard) | note « 12 derniers mois » en tête ; pas de def. verre standard | ✅ Notre consigne est plus complète et plus fidèle au cadre temporel |
| Score affiché au patient | non (écran « Merci ») | non (« Vous avez terminé ») | — | = équivalent. Interprétation Mentaal **non comparable** (réservée praticien, non visible côté patient) |

**Rectification d'une lecture initiale** : à l'écran, les « fautes » Mentaal (« vous -a-t-il », « du boire ») et son item 10 « Est-ce qu'un… » ressemblaient à des défauts de leur côté. La lecture du PDF source a montré que **c'est la source qui est ainsi** — Mentaal l'a reprise fidèlement, et c'est **notre** version qui a édité la source.

**Ce qui joue en notre faveur** : définition du verre standard (manque réel chez Mentaal, qui parle de « verres standards » sans les définir), dernière option constante ET conforme source, consigne temporelle explicite, français corrigé.
**Ce qui joue en faveur de Mentaal** : fidélité au verbatim source, notamment le **préfixe temporel des items 4-8** que nous avons retiré.

**Scoring** : nos seuils (0-5 / 6-12 / 13-40 ; mésusage ≥ 6, dépendance > 12) restent conformes SFA 2015 (OFDT). **Non comparés à Mentaal** : score masqué au patient des deux côtés. → si accès à un compte praticien Mentaal, comparer leurs bandes d'interprétation.

---

## 3. Statut copyright et licence

| Champ | Valeur |
|-------|--------|
| **Statut** | libre — l'OMS autorise la reproduction et l'usage de l'AUDIT sans frais pour un usage non lucratif, avec attribution. |
| **Détenteur des droits** | Organisation mondiale de la Santé (OMS). |
| **Mention obligatoire à afficher** | *« AUDIT (Alcohol Use Disorders Identification Test) — Organisation mondiale de la Santé ; Saunders, Aasland, Babor, de la Fuente & Grant (1993). Version française validée : Gache et al. (2005). Seuils : Société Française d'Alcoologie (2015). »* |
| **Emplacement de la mention (règle projet)** | Côté patient : écran de fin de passation (post-soumission), texte gris discret, une fois. Côté praticien : fiche du questionnaire en bibliothèque. |
| **Restrictions d'usage** | Usage clinique / dépistage libre avec attribution OMS. ⚠️ **À recocher** : Melya étant un service payant, confirmer que l'usage OMS « non lucratif » couvre bien la diffusion via une plateforme commerciale (l'instrument reste gratuit pour l'utilisateur final). Le manuel OMS (Babor 2001) exclut « use in conjunction with commercial purposes » pour le document lui-même. |
| **Décision Melya** | go (sous réserve de la recoche « usage commercial » ci-dessus). |

---

## 4. Structure de l'échelle

### Consigne officielle (affichée au patient avant les items)

> *« Ce questionnaire interroge votre consommation d'alcool des douze derniers mois. Attention à ce que vos réponses reflètent cette unité de temps et pas seulement les dernières semaines. Un verre standard = 10 g d'alcool pur. »*

**Source de la consigne** : auditscreen.org, version française, en-tête du PDF — mot pour mot. Dernière phrase (définition du verre standard) : Michaud & Lécallier (2003), tableau 3, mot pour mot — cf. §10.

### Comportement UX de la consigne

| Champ | Valeur |
| --- | --- |
| **Persistance** | page_de_garde_seule — pas de rappel au-dessus des items |
| **Emplacement** | écran d'introduction de la passation |
| **Justification** | La source ne comporte pas de rappel persistant : le cadre temporel est porté par le préfixe « Dans les douze derniers mois, » des items 4 à 8, comme dans la source. |

### Dimensions de cotation (`formType: "options"`)

Réponses **hétérogènes par item** (comme Y-BOCS) → chaque item porte ses propres modalités.

- **Items 1** : fréquence de consommation (Jamais … 4 fois ou plus par semaine), 0-4.
- **Item 2** : quantité par occasion (Un ou deux … Dix ou plus), 0-4.
- **Items 3 à 8** : fréquence (Jamais / Moins d'une fois par mois / Une fois par mois / Une fois par semaine / Chaque jour ou presque), 0-4.
- **Items 9 et 10** : Non (0) / Oui, mais pas au cours de l'année écoulée (2) / Oui, au cours de l'année (4) — libellés OFDT, cf. §10.

⚠️ **Items 9-10 non linéaires** : cotés 0, 2, 4 (pas de 1 ni 3).

---

## 5. Items

*Aucun intitulé court (eyebrow) : la source primaire n'en a pas. L'app affiche la question seule (arbitrage du 24/09/2026).*

| # | Question | Modalités |
|---|----------|-----------|
| 1 | Combien de fois vous arrive-t-il de consommer de l'alcool ? | 0-4 (fréquence conso) |
| 2 | Combien de verres standards buvez-vous au cours d'une journée ordinaire où vous buvez de l'alcool ? | 0-4 (quantité) |
| 3 | Au cours d'une même occasion, combien de fois vous arrive-t-il de boire six verres standards ou plus ? | 0-4 (fréquence) |
| 4 | Dans les douze derniers mois, combien de fois avez-vous observé que vous n'étiez plus capable de vous arrêter de boire après avoir commencé ? | 0-4 (fréquence) |
| 5 | Dans les douze derniers mois, combien de fois le fait d'avoir bu de l'alcool vous a-t-il empêché de faire ce qu'on attendait normalement de vous ? | 0-4 (fréquence) |
| 6 | Dans les douze derniers mois, combien de fois, après une période de forte consommation, avez-vous dû boire de l'alcool dès le matin pour vous remettre en forme ? | 0-4 (fréquence) |
| 7 | Dans les douze derniers mois, combien de fois avez-vous eu un sentiment de culpabilité ou de regret après avoir bu ? | 0-4 (fréquence) |
| 8 | Dans les douze derniers mois, combien de fois avez-vous été incapable de vous souvenir de ce qui s'était passé la nuit précédente parce que vous aviez bu ? | 0-4 (fréquence) |
| 9 | Vous êtes-vous blessé ou avez-vous blessé quelqu'un parce que vous aviez bu ? | 0 / 2 / 4 |
| 10 | Un parent, un ami, un médecin ou autre soignant s'est-il inquiété de votre consommation d'alcool ou a-t-il suggéré que vous la réduisiez ? | 0 / 2 / 4 |

Items 1-9 : source primaire (OMS FR), corrections typographiques des items 5 et 6 exceptées. Item 10 : OFDT. Détail et justification en §10.

---

## 6. Algorithme de scoring

### Calcul du score total

1. **Additionner** les 10 items tels que cotés (aucune inversion, aucune transformation).
2. Items 1-8 : 0-4 ; items 9-10 : 0, 2 ou 4.

**Plage du score total** : 0 à 40.

### Gestion des réponses manquantes

Refus de la passation incomplète. Les 10 items sont requis ; pas d'imputation.

---

## 7. Seuils d'interprétation

| Score | Interprétation |
|-------|----------------|
| 0–5 | Non évocateur d'un mésusage actuel d'alcool |
| 6–12 | Évocateur d'un mésusage actuel d'alcool |
| 13–40 | En faveur d'une dépendance à l'alcool |

**Source des seuils** : Société Française d'Alcoologie (2015), via OFDT — « Un score supérieur ou égal à 7 chez l'homme et à 6 chez la femme est évocateur d'un mésusage actuel d'alcool » ; « Un score supérieur à 12 chez l'homme et chez la femme serait en faveur d'une dépendance à l'alcool ».

**Seuil sexe-spécifique** : l'app ne connaît pas le sexe du patient. La tranche de mésusage commence à 6 (seuil femme OFDT). Sur l'infographie, le repère de cette tranche affiche les deux seuils (« 6 F / 7 H »), et une note en petit sous la jauge rappelle les seuils OFDT complets : « Seuils OFDT (Société Française d'Alcoologie, 2015) : mésusage dès 6 chez la femme (F) et dès 7 chez l'homme (H), dépendance au-delà de 12. » Chez un homme, un score de 6 reste donc sous le seuil. Cf. §10.

---

## 8. Alertes cliniques

Aucune alerte item-niveau pour l'instant. (Piste à discuter : score ≥ 13 = orientation addictologie ; non implémenté, pas d'`alerts` défini.)

---

## 9. Cas de test unitaires

| # | Réponses | Score | Niveau |
|---|----------|-------|--------|
| T1 | Tous les items = 0 | 0 | Non évocateur d'un mésusage actuel d'alcool |
| T2 | Items 1-8 = 1, items 9-10 = 0 | 8 | Évocateur d'un mésusage actuel d'alcool |
| T3 | Items 1-8 = 4, items 9-10 = 4 | 40 | En faveur d'une dépendance à l'alcool |
| T4 | Item 1 = 4, item 2 = 1, reste = 0 | 5 | Non évocateur d'un mésusage actuel d'alcool |

### Transitions de seuil

| # | Score | Niveau attendu |
|---|-------|----------------|
| T5 | 5 | Non évocateur d'un mésusage actuel d'alcool |
| T6 | 6 | Évocateur d'un mésusage actuel d'alcool |
| T7 | 7 | Évocateur d'un mésusage actuel d'alcool |
| T8 | 12 | Évocateur d'un mésusage actuel d'alcool |
| T9 | 13 | En faveur d'une dépendance à l'alcool |

### Entrées invalides

| # | Cas | Comportement attendu |
|---|-----|----------------------|
| T10 | Valeur hors modalités (item 9 = 1 ou 3) | Erreur de validation |
| T11 | Réponse manquante | Erreur de validation — 10 items requis |

---

## 10. Choix et arbitrages méthodologiques

Règle suivie : les textes affichés au patient reprennent mot pour mot la version française de l'OMS (auditscreen.org). On ne s'en écarte qu'en cas d'erreur de sens, de faute ou d'ambiguïté avérée, et le texte de remplacement est alors celui de l'OFDT, jamais une formulation propre à Melya. Seule exception : la définition du verre standard, recommandée par le manuel OMS et reprise d'une version française publiée (Michaud & Lécallier, 2003), faute de texte dans l'OFDT.

### Écarts à la source primaire

| Élément | Source primaire (OMS FR) | Texte retenu | Origine du texte retenu | Justification |
| --- | --- | --- | --- | --- |
| Item 10 | « Est-ce qu'un parent, un ami, un médecin ou un autre professionnel de santé s'est déjà préoccupé de votre consommation d'alcool et vous a conseillé de la diminuer ? » | « Un parent, un ami, un médecin ou autre soignant s'est-il inquiété de votre consommation d'alcool ou a-t-il suggéré que vous la réduisiez ? » | OFDT, question entière | Erreur de traduction qui change le sens et le score : l'original anglais (questionnaire auditscreen.org et manuel OMS 2001) dit « concerned about your drinking **or** suggested you cut down ». Avec « et », un patient dont l'entourage s'est seulement inquiété répond « Non » et perd jusqu'à 4 points. La question OFDT est reprise en entier : remplacer le seul « et » produirait une phrase qui n'existe dans aucune source. |
| Items 9-10, réponse cotée 4 | « oui au cours de l'année dernière » | « Oui, au cours de l'année » | OFDT | « L'année dernière » se lit couramment comme l'année civile précédente, alors que l'instrument vise les 12 derniers mois (« during the past year »). |
| Items 9-10, réponse cotée 2 | « oui mais pas dans l'année passée » | « Oui, mais pas au cours de l'année écoulée » | OFDT | Cohérence avec la réponse cotée 4 : les deux réponses viennent du même texte. |
| Item 5 | « …le fait d'avoir bu de l'alcool, vous -a-t-il empêché… de vous? » | « …le fait d'avoir bu de l'alcool vous a-t-il empêché… de vous ? » | OFDT (passage identique) | Coquilles du PDF source. Seul le passage fautif est corrigé : le reste de l'item suit la source primaire. |
| Item 6 | « avez-vous du boire » | « avez-vous dû boire » | OFDT (passage identique) | Faute d'orthographe du PDF source. |
| Consigne, dernière phrase | Aucune définition du verre standard | « Un verre standard = 10 g d'alcool pur. » | Michaud & Lécallier (2003), tableau 3 | Le manuel OMS demande de définir le verre standard pour le patient (« Patient instructions should also clarify the meaning of a standard drink ») ; indispensable pour répondre aux items 2 et 3. Ni l'OMS FR ni l'OFDT n'en donnent de texte ; celui-ci vient d'une version française publiée par un co-auteur de la validation française. 10 g = verre standard français ; six verres = 60 g, le seuil visé par l'item 3. |
| Libellés de réponse | En minuscules, sans virgule (« jamais », « oui mais pas… ») | Majuscule initiale, virgule (« Jamais », « Oui, mais pas… ») | OFDT | Typographie seule, sens inchangé. |

### Autres arbitrages

| Sujet | Choix retenu | Justification |
| --- | --- | --- |
| Préfixe « Dans les douze derniers mois, » (items 4-8) | Conservé, comme dans la source | Présent dans la source primaire, l'OFDT, la version suisse et l'original anglais. Il avait été retiré dans une première version au profit d'un rappel affiché au-dessus des items ; ce rappel, absent de la source, est supprimé. |
| Consigne | Consigne OMS mot pour mot | La première version reformulait la consigne sans raison ; retour au texte source. |
| Version Michaud & Lécallier (2003) | Retenue uniquement pour la définition du verre standard | Item 10 incomplet (« un parent » absent) et « et » erroné ; règle de saut (« ne répondez qu'à la première question ») contraire au manuel OMS, qui renvoie aux items 9-10 ; phrase d'objectif sans apport pour la mesure. Confirme par ailleurs nos corrections des items 5 et 6. |
| Seuils d'interprétation | SFA 2015 via OFDT : mésusage ≥ 7 chez l'homme, ≥ 6 chez la femme ; dépendance > 12 | Référence institutionnelle française. Les seuils internationaux de l'OMS (≥ 8 ; dépendance ≥ 13 F / ≥ 15 H) ne sont pas retenus : version FR-France privilégiée. |
| Seuil sexe-spécifique | Trois tranches OFDT (0-5 / 6-12 / 13-40), mésusage dès 6 ; note sous la jauge : seuils OFDT complets (6 femme, 7 homme, dépendance > 12) | L'app ne connaît pas le sexe du patient. Une première version isolait le score de 6 dans une tranche dédiée (« chez la femme »), mais l'infographie devenait illisible (repères 6 et 7 superposés). On retient donc le seuil femme, le plus sensible, et la note rappelle au praticien que chez l'homme le seuil est 7. |
| Libellés des niveaux | « Évocateur d'un mésusage actuel d'alcool » ; « En faveur d'une dépendance à l'alcool » | Termes de l'OFDT. |
| Libellé sous le seuil | « Non évocateur d'un mésusage actuel d'alcool » | L'OFDT ne nomme pas cette tranche. Libellé construit par négation du texte OFDT, sans terme ajouté ; l'ancien « Consommation à faible risque » est abandonné (non sourcé). |
| Questions sautées | Aucune : les 10 items sont toujours posés | La source française ne prévoit pas de saut. Le manuel OMS permet, en passation informatisée, de passer directement aux items 9-10 si l'item 1 = « Jamais » ; non retenu à ce stade. |
| Réponses manquantes | Passation incomplète refusée, pas d'imputation | Règle projet commune à toutes les échelles. |
| Version suisse (RevMed) | Consultée, non retenue comme source | Version suisse (hiérarchie France > Suisse) et défauts relevés : item 1 incohérent, « 7 ou 9 » à l'item 2, sens restreint à l'item 6, jugement ajouté à l'item 8. |

### Questions ouvertes

1. **Copyright usage commercial** — confirmer auprès de l'OMS que la diffusion via un service payant est couverte (cf. §3).
2. **Référence de la version RevMed** — compléter la référence de l'article (auteurs, année, URL) et archiver le PDF.

---

## 11. Contrat technique

### Signature de scoring

```typescript
scoreAudit(scale, responses) → {
  totalScore: number,        // 0–40
  maxScore: 40,
  interpretation: string,
  severityIndex: number,
  severityRangeCount: 3
}
```

### Notes d'implémentation

- `formType: "options"`, clés de réponse `option_0 … option_9`.
- Somme simple, aucune inversion. Scorer `apps/api/src/scoring/scorers/audit.ts`, enregistré sous l'id `audit` dans `ScoringService`.
- Items 9-10 : modalités 0/2/4 (non contiguës) — portées dans les `options` de l'item.
- Pas de `persistentInstructions` (rappel au-dessus des items) : retiré le 29/09/2026, absent de la source.
- 3 bandes dans `scoring.ranges` (0-5 / 6-12 / 13-40) ; `thresholdLabel: "6 F\n7 H"` sur la bande 6-12 (repère à deux lignes sur la jauge) ; `scoring.thresholdsSource` porte la note des seuils OFDT affichée sous la jauge de résultat praticien.
- Domaine : `addictions` (la couleur de la tuile en dérive, cf. `apps/web/lib/scale-appearance.ts`).

---

## 12. Historique des modifications

| Date | Auteur | Modification |
|------|--------|--------------|
| 15/07/2026 | Adrien (avec Claude) | Création de l'échelle AUDIT : entrée `Scale` dans `packages/core` (`formType: "options"`, 10 items), scorer `audit.ts` (somme 0-40) + enregistrement, icône placeholder, spec. Items FR issus de la version OMS officielle (auditscreen.org), cross-checkés OFDT/SFA. Seuils SFA 2015 rendus en 3 bandes sexe-neutres (onset ≥ 6) — sexe-spécificité à valider. Flyer Addict'AIDE écarté (erreurs de libellés). Nouvelle catégorie « Addictions ». |
| 24/07/2026 | Clément (avec Claude) | **Recette comparative navigateur vs Mentaal (INTERROMPUE, à reprendre).** Parcours patient Mentaal déroulé en entier, comparé item par item à notre version + à la source auditscreen.org. Constat : Mentaal ≈ reprise verbatim de auditscreen.org (imperfections comprises) ; notre version = même source éditée. Ajout du tableau de comparaison en §2. Principal écart à trancher : **préfixe « Dans les douze derniers mois » sur items 4-8** (présent source + Mentaal, retiré chez nous → §10 pt 5). Nos libellés d'items **confirmés conformes** à la source primaire (le doute sur l'attribution est levé). Nouveaux points 5-8 en §10. Scoring non comparé (score masqué au patient des deux côtés). |
| 24/09/2026 | Clément (avec Claude) | Intitulés courts (eyebrows) retirés des 10 items : absents de la source primaire auditscreen.org. Chaque item n'a plus qu'un `title` = la question ; texte des questions inchangé. |
| 29/09/2026 | Clément (avec Claude) | **Alignement sur les sources.** Comparaison OMS FR / OFDT / RevMed / original anglais (§2). Règle : OMS FR mot pour mot, écarts repris de l'OFDT uniquement (§10). Préfixe « Dans les douze derniers mois, » rétabli sur les items 4-8 ; rappel persistant supprimé ; consigne OMS mot pour mot ; définition du verre standard retirée ; item 10 remplacé par la version OFDT (« ou » de l'original anglais) ; réponses des items 9-10 alignées sur l'OFDT. Seuils SFA/OFDT appliqués exactement, avec bande dédiée au score de 6 (femme) ; libellés de niveaux OFDT. §10 réécrite en choix et arbitrages méthodologiques. Sources anglaises archivées. |
| 29/09/2026 | Clément (avec Claude) | Ajout de la définition du verre standard en fin de consigne (« Un verre standard = 10 g d'alcool pur. »), reprise mot pour mot de Michaud & Lécallier (2003), version française publiée par un co-auteur de la validation française. Source ajoutée en §2, exception consignée en §10. |
| 29/09/2026 | Clément (avec Claude) | Infographie de résultat simplifiée : 3 tranches OFDT (0-5 / 6-12 / 13-40) au lieu de 4 ; la tranche d'un point (score 6, « chez la femme ») est supprimée. Note en petit sous la jauge : seuils OFDT complets (6 femme, 7 homme, dépendance > 12). |
| 29/09/2026 | Clément (avec Claude) | Infographie : le repère du mésusage affiche les deux seuils OFDT (« 6 F / 7 H ») ; note des seuils déplacée sous le libellé d'interprétation (elle le chevauchait). |
| 29/09/2026 | Clément | Recette manuelle passée : échelle validée (✅). |
