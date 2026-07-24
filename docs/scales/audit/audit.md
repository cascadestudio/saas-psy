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
| **Note sur le mode d'administration** | Période de référence = 12 derniers mois. Dans la source auditscreen.org, le préfixe « Dans les douze derniers mois, » figure **sur les items 4 à 8** (items 1-3, 9-10 sans préfixe ; 9-10 portent le temporel dans les options). ⚠️ Notre version a **retiré** ce préfixe des items 4-8 au profit de la consigne + en-tête persistant — cf. comparaison Mentaal (§2) et §10 pt 5. |
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

### Divergences constatées entre sources

- **Libellés retenus = version OMS auditscreen.org** (source primaire). L'OFDT reformule légèrement (« À quelle fréquence consommez-vous de l'alcool ? ») ; sur le fond, items et cotations identiques.
- ⚠️ **Le flyer Addict'AIDE** (`docs/scales/audit/AUDIT_addictaide.pdf`) **contient des erreurs** et a été **écarté** pour les libellés : item 2 saute la modalité « 9 » (« 7 ou 8 » au lieu de « 7 à 9 ») ; libellés de fréquence des items 3-8 incohérents (« Moins d'1 fois/semaine = 1 » puis « 1 fois/mois = 2 »). Conservé seulement comme repère de seuils (identiques à la SFA).

### Version française retenue

- **Traducteur(s) / validation** : version OMS francophone (auditscreen.org) ; validation psychométrique française Gache et al. (2005).
- **Seuils** : Société Française d'Alcoologie (2015), via OFDT.

### Comparaison navigateur avec Mentaal — recette du 24/07/2026 (Clément + Claude, INTERROMPUE)

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
| **Restrictions d'usage** | Usage clinique / dépistage libre avec attribution OMS. ⚠️ **À recocher** : Melya étant un service payant, confirmer que l'usage OMS « non lucratif » couvre bien la diffusion via une plateforme commerciale (l'instrument reste gratuit pour l'utilisateur final). |
| **Décision Melya** | go (sous réserve de la recoche « usage commercial » ci-dessus). |

---

## 4. Structure de l'échelle

### Consigne officielle (affichée au patient avant les items)

> *« Ce questionnaire porte sur votre consommation d'alcool au cours des douze derniers mois. Veillez à ce que vos réponses reflètent bien cette période, et pas seulement les dernières semaines. Un « verre standard » correspond à la quantité d'alcool servie dans un bar (environ 10 g d'alcool pur) : un ballon de vin, un demi de bière, une dose de spiritueux. »*

**Source de la consigne** : reformulation de la consigne auditscreen.org (« interroge votre consommation d'alcool des douze derniers mois… ») + définition du **verre standard** ajoutée (nécessaire à l'item 2, absente du PDF paysage mais standard OMS = 10 g). Le rappel « verre standard » est un **ajout produit Melya** — à valider.

### Comportement UX de la consigne

| Champ | Valeur |
| --- | --- |
| **Persistance** | persistante — rappel court `persistentInstructions` : « Au cours des douze derniers mois : » |
| **Emplacement** | en-tête au-dessus de l'item |
| **Justification** | Ancre la période de référence (12 mois), point clé de cotation de l'AUDIT. |

### Dimensions de cotation (`formType: "options"`)

Réponses **hétérogènes par item** (comme Y-BOCS) → chaque item porte ses propres modalités.

- **Items 1** : fréquence de consommation (Jamais … 4 fois ou plus par semaine), 0-4.
- **Item 2** : quantité par occasion (Un ou deux … Dix ou plus), 0-4.
- **Items 3 à 8** : fréquence (Jamais / Moins d'une fois par mois / Une fois par mois / Une fois par semaine / Chaque jour ou presque), 0-4.
- **Items 9 et 10** : Non (0) / Oui, mais pas au cours de l'année écoulée (2) / Oui, au cours de l'année écoulée (4).

⚠️ **Items 9-10 non linéaires** : cotés 0, 2, 4 (pas de 1 ni 3).

---

## 5. Items

| # | Intitulé court (eyebrow) | Question | Modalités |
|---|--------------------------|----------|-----------|
| 1 | Fréquence de consommation | Combien de fois vous arrive-t-il de consommer de l'alcool ? | 0-4 (fréquence conso) |
| 2 | Quantité par occasion | Combien de verres standards buvez-vous au cours d'une journée ordinaire où vous buvez de l'alcool ? | 0-4 (quantité) |
| 3 | Consommations importantes | Au cours d'une même occasion, combien de fois vous arrive-t-il de boire six verres standards ou plus ? | 0-4 (fréquence) |
| 4 | Perte de contrôle | Combien de fois avez-vous observé que vous n'étiez plus capable de vous arrêter de boire après avoir commencé ? | 0-4 (fréquence) |
| 5 | Obligations non remplies | Combien de fois le fait d'avoir bu de l'alcool vous a-t-il empêché de faire ce qu'on attendait normalement de vous ? | 0-4 (fréquence) |
| 6 | Consommation matinale | Combien de fois, après une période de forte consommation, avez-vous dû boire de l'alcool dès le matin pour vous remettre en forme ? | 0-4 (fréquence) |
| 7 | Culpabilité | Combien de fois avez-vous eu un sentiment de culpabilité ou de regret après avoir bu ? | 0-4 (fréquence) |
| 8 | Trous de mémoire | Combien de fois avez-vous été incapable de vous souvenir de ce qui s'était passé la nuit précédente parce que vous aviez bu ? | 0-4 (fréquence) |
| 9 | Blessures | Vous êtes-vous blessé ou avez-vous blessé quelqu'un parce que vous aviez bu ? | 0 / 2 / 4 |
| 10 | Inquiétude de l'entourage | Un parent, un ami, un médecin ou un autre professionnel de santé s'est-il déjà préoccupé de votre consommation d'alcool et vous a-t-il conseillé de la diminuer ? | 0 / 2 / 4 |

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
| 0–5 | Consommation à faible risque |
| 6–12 | Mésusage d'alcool probable (seuil ≥ 6 femme / ≥ 7 homme) |
| 13–40 | Dépendance à l'alcool probable |

**Source des seuils** : Société Française d'Alcoologie (2015), via OFDT — *mésusage* si score ≥ 7 (homme) ou ≥ 6 (femme) ; *dépendance probable* si score > 12.

⚠️ **Limite du modèle — seuils sexe-spécifiques.** Le modèle `ScaleRange` porte une **bande numérique unique** sans paramètre sexe, et l'app ne dispose pas du sexe du patient au moment du scoring. Décisions prises :

- Onset du mésusage fixé au **seuil le plus sensible (≥ 6)** pour ne pas sous-détecter les femmes. Conséquence : un homme scorant 6 est étiqueté « mésusage » alors que le seuil SFA homme est 7 (sur-détection légère, jugée plus sûre qu'une sous-détection, et relue par le praticien).
- Le libellé de la bande rappelle explicitement « ≥ 6 femme / ≥ 7 homme ».
- **À valider** (section 10). Alternative : passer aux **zones OMS internationales** sexe-neutres (0-7 / 8-15 / 16-19 / 20-40 : faible risque / à risque / nocive / dépendance) si le·la référent·e préfère un découpage indépendant du sexe.

---

## 8. Alertes cliniques

Aucune alerte item-niveau pour l'instant. (Piste à discuter : score ≥ 13 = orientation addictologie ; non implémenté, pas d'`alerts` défini.)

---

## 9. Cas de test unitaires

| # | Réponses | Score | Niveau |
|---|----------|-------|--------|
| T1 | Tous les items = 0 | 0 | Consommation à faible risque |
| T2 | Items 1-8 = 1, items 9-10 = 0 | 8 | Mésusage d'alcool probable |
| T3 | Items 1-8 = 4, items 9-10 = 4 | 40 | Dépendance à l'alcool probable |
| T4 | Item 1 = 4, item 2 = 1, reste = 0 | 5 | Consommation à faible risque |

### Transitions de seuil

| # | Score | Niveau attendu |
|---|-------|----------------|
| T5 | 5 | Consommation à faible risque |
| T6 | 6 | Mésusage d'alcool probable |
| T7 | 12 | Mésusage d'alcool probable |
| T8 | 13 | Dépendance à l'alcool probable |

### Entrées invalides

| # | Cas | Comportement attendu |
|---|-----|----------------------|
| T9 | Valeur hors modalités (item 9 = 1 ou 3) | Erreur de validation |
| T10 | Réponse manquante | Erreur de validation — 10 items requis |

---

## 10. Points à valider avec le·la psychologue référent·e

1. **Seuils sexe-spécifiques** — valider le rendu sexe-neutre (onset mésusage à ≥ 6) OU basculer vers les zones OMS internationales (8/16/20). Décision de fond.
2. **Libellés de niveaux** — *Consommation à faible risque / Mésusage d'alcool probable / Dépendance à l'alcool probable*.
3. **Consigne** — valider l'ajout de la définition du « verre standard » (~10 g), absente du PDF paysage mais nécessaire à l'item 2.
4. **Copyright usage commercial** — confirmer que la licence OMS « usage non lucratif » couvre la diffusion via Melya (service payant).
5. **Préfixe temporel des items 4-8 (décision de fond, issue de la comparaison Mentaal §2)** — la source primaire auditscreen.org préfixe les items **4 à 8** par « Dans les douze derniers mois, » (Mentaal le conserve). Notre version l'a **retiré** au profit de la consigne + en-tête persistant « Au cours des douze derniers mois : ». Trancher :
   - (a) **Restaurer le préfixe par item** → fidélité verbatim à notre source, aligné Mentaal ; ou
   - (b) **Garder notre approche** (consigne + en-tête) — **MAIS d'abord vérifier en recette que l'en-tête persistant s'affiche réellement sur chaque item 4-8** ; sinon ces items perdent leur ancre temporelle, seul vrai manque de notre côté.
6. **Retouches vs verbatim source** — décider si l'on conserve nos corrections (item 5 « vous a-t-il » au lieu de « vous -a-t-il » ; item 6 « dû » au lieu de « du » ; item 10 reformulé en inversion) qui améliorent le français mais dévient du verbatim OMS, ou si l'on revient au verbatim source.
7. **Option items 9-10 (valeur 4)** — normaliser le libellé : nous « Oui, au cours de l'année écoulée » vs source « oui au cours de l'année dernière » vs Mentaal « Oui, au cours de l'année ». Cosmétique, mais à figer.
8. **Interprétation Mentaal** — si accès à un compte praticien Mentaal, comparer leurs bandes de score aux nôtres (SFA 2015). Non fait (score masqué au patient).

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
- Icône : `apps/web/public/images/scales/audit.svg` — ⚠️ **placeholder** (copie de `gad-7.svg`) à remplacer par un doodle « Addictions » dédié.
- Couleur catégorie « Addictions » : `#A97BA5` / `#D6BDD3` (nouvelle catégorie, non présente auparavant).

---

## 12. Historique des modifications

| Date | Auteur | Modification |
|------|--------|--------------|
| 15/07/2026 | Adrien (avec Claude) | Création de l'échelle AUDIT : entrée `Scale` dans `packages/core` (`formType: "options"`, 10 items), scorer `audit.ts` (somme 0-40) + enregistrement, icône placeholder, spec. Items FR issus de la version OMS officielle (auditscreen.org), cross-checkés OFDT/SFA. Seuils SFA 2015 rendus en 3 bandes sexe-neutres (onset ≥ 6) — sexe-spécificité à valider. Flyer Addict'AIDE écarté (erreurs de libellés). Nouvelle catégorie « Addictions ». |
| 24/07/2026 | Clément (avec Claude) | **Recette comparative navigateur vs Mentaal (INTERROMPUE, à reprendre).** Parcours patient Mentaal déroulé en entier, comparé item par item à notre version + à la source auditscreen.org. Constat : Mentaal ≈ reprise verbatim de auditscreen.org (imperfections comprises) ; notre version = même source éditée. Ajout du tableau de comparaison en §2. Principal écart à trancher : **préfixe « Dans les douze derniers mois » sur items 4-8** (présent source + Mentaal, retiré chez nous → §10 pt 5). Nos libellés d'items **confirmés conformes** à la source primaire (le doute sur l'attribution est levé). Nouveaux points 5-8 en §10. Scoring non comparé (score masqué au patient des deux côtés). |
