# Test spec — ASRS-V1.1, test de dépistage en 6 questions

<!--
Voir _TEMPLATE.md pour les règles projet.
Fiche rédigée et implémentée par Claude en autonomie (lot du 11/10/2026).
Arbitrages et niveaux de confiance en §10, pour relecture par Clément.
Issue Linear MEL-319 (attribuée à Adrien) : commentaire posé avant de commencer.
-->

---

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | ASRS-V1.1 (id technique `asrs`) — dépistage en 6 questions uniquement |
| **Nom complet (FR)** | Test de dépistage et d'auto-évaluation des troubles déficitaires de l'attention avec hyperactivité de l'adulte V1.1 (titre de couverture) ; formulaire : « Test de dépistage avec échelle d'auto-évaluation V1.1 (ASRS-V1.1) » |
| **Nom complet (langue originale)** | Adult ADHD Self-Report Scale v1.1 — 6-Question Screener (partie A de l'échelle en 18 questions) |
| **Thème principal** | TDAH de l'adulte |
| **Sous-thèmes / tags** | TDAH, inattention, hyperactivité, dépistage, adulte |
| **Nombre d'items** | 6 |
| **Durée estimée de passation** | 2 min (le PDF indique « moins de 5 minutes » pour le dépistage) |
| **Public cible** | Adultes de 18 ans et plus (PDF : « destiné aux personnes âgées de 18 ans et plus ») |
| **Mode d'administration** | auto |
| **Description praticien (bibliothèque)** | Test de dépistage de 6 questions repérant des symptômes pouvant correspondre à un TDAH chez l'adulte, au cours des 6 derniers mois. |
| **Description patient (portail)** | AUCUNE — règle projet. |

---

## 2. Sources et traçabilité

### Source primaire

- **Type** : version française officielle « patient facing » diffusée par le détenteur des droits (NYU Langone, Technology Opportunities & Ventures).
- **Référence** : *ASRS v1.1 6-Question Screener, French Translation (Patient Facing)*, fichier `6Q_French_final.pdf` (89 Ko), 3 pages : couverture, formulaire avec cases grisées et règle de cotation, page praticien.
- **Page** : https://license.tov.med.nyu.edu/product/asrs6Qscreener (téléchargement via l'API du portail, identifiant de fichier 5370)
- **Copie historique** : https://www.hcp.med.harvard.edu/ncs/ftpdir/adhd/6Q_French_final.pdf (serveur Harvard hors service le 11/10/2026, erreur 20)
- **Fichier de portage** : `docs/scales/asrs/ASRS_6Q_French_NYU.pdf`
- **Date de consultation** : 11/10/2026

### Exception de sourcing — autorité unique justifiée

Version française approuvée et diffusée par le détenteur (NYU / Harvard, conçue avec l'OMS), qui interdit toute modification hors passage au format électronique. Aucune seconde source ne peut faire autorité sur ce texte.

### Publication de validation

- Kessler, R.C., Adler, L., Ames, M., et al. (2005). The World Health Organization Adult ADHD Self-Report Scale (ASRS): a short screening scale for use in the general population. *Psychological Medicine*, 35(2), 245-256.
- Version française : Caci, H., et al. (2014), prévalence et validation en population française (référence relevée, texte non lu).

### Comparaison Mentaal

Mentaal (`/send/asrs`, n°3 de son catalogue, catégorie « TDAH ») propose **les 18 questions** dans une **autre traduction** (« À quelle fréquence avez vous de la difficulté à finaliser un projet, une fois que le gros du travail a été effectué ? » ; réponse « Parfois » au lieu de « Quelquefois »), avec un score de partie A (0-3 « Pas de symptômes » / 4-6 « Symptômes présents »), un total « symptômes présents » sur 18 et trois sous-échelles. Le 18 items est soumis à licence NYU (cf. §3). Passation de comparaison : §10, « Recette ».

---

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | ✅ libre, y compris commercial — « The screener is freely available for clinical and non-clinical use, including commercial use, but does require attribution. This is an evidence-based tool, and as such no other modifications, other than creating electronic versions, are permitted. » (NYU, 11/10/2026) |
| **Détenteur des droits** | © New York University and the President and Fellows of Harvard College (Adler & Kessler) |
| **Mention obligatoire à afficher** | « Le test de dépistage ASRS-V1.1 (6 questions) est un sous-ensemble de l'échelle d'auto-évaluation ASRS-V1.1 (18 questions). © New York University and the President and Fellows of Harvard College. Créé par Lenard Adler (NYU) et Ronald Kessler (Harvard), avec l'Organisation mondiale de la santé. Version française officielle. » (traduction de la citation demandée par NYU) |
| **Restrictions** | Aucune modification hors version électronique ; pas d'outil diagnostique autonome (« diagnosis or prescription should never been made solely on the basis of a score ») |
| **Échelle en 18 questions** | 🔒 licence NYU (MEL-351) — non portée |
| **Décision Melya** | go (6 questions) |

---

## 4. Structure de l'échelle

### Consigne officielle

> _« Choisissez la réponse qui décrit le mieux ce que vous avez ressenti et comment vous vous êtes comporté au cours des 6 derniers mois. »_

**Source** : formulaire, encadré de consigne ; « Cochez la case » → « Choisissez la réponse », phrase « Veuillez remettre le questionnaire rempli à votre médecin… » retirée (§10).

### Comportement UX de la consigne

| Champ | Valeur |
| --- | --- |
| **Persistance** | `persistante` — « Au cours des 6 derniers mois : » |
| **Emplacement** | Écran d'intro (consigne) ; rappel au-dessus de chaque item |
| **Justification** | Extrait de la consigne (période de référence), présente au-dessus des 6 questions sur le papier ; précédent CUDIT-R (« Votre consommation au cours des 6 derniers mois : ») |
| **Cas particuliers** | Le paragraphe de présentation (« Souffrez-vous de troubles déficitaires… ») n'est pas repris (§10) |

### Affichage du titre côté portail patient

| Champ | Valeur |
| --- | --- |
| **Élément(s) affiché(s) en titre sur le PDF source primaire** | `nom complet + acronyme` (« Test de dépistage avec échelle d'auto-évaluation V1.1 (ASRS-V1.1) ») |
| **Sous-titre à afficher dans l'app (`patientIntroSubtitle`)** | « Test de dépistage avec échelle d'auto-évaluation V1.1 » |
| **Divergence avec le PDF** | Aucune |

### Dimensions de cotation

`0` Jamais · `1` Rarement · `2` Quelquefois · `3` Souvent · `4` Très souvent (en-têtes de colonnes du formulaire ; les valeurs numériques sont internes, le formulaire n'en affiche pas).

---

## 5. Items

| # | Item | Zone grisée à partir de |
| --- | --- | --- |
| 1 | A quelle fréquence vous arrive-t-il d'avoir des difficultés à finaliser les derniers détails d'un projet une fois que les parties les plus stimulantes ont été faites ? | Quelquefois |
| 2 | A quelle fréquence vous arrive-t-il d'avoir des difficultés à mettre les choses en ordre lorsque vous devez faire quelque chose qui demande de l'organisation ? | Quelquefois |
| 3 | A quelle fréquence vous arrive-t-il d'avoir des difficultés à vous rappeler vos rendez-vous ou vos obligations ? | Quelquefois |
| 4 | Quand vous devez faire quelque chose qui demande beaucoup de réflexion, à quelle fréquence vous arrive-t-il d'éviter de le faire ou de le remettre à plus tard ? | Souvent |
| 5 | A quelle fréquence vous arrive-t-il de remuer ou de tortiller les mains ou les pieds lorsque vous devez rester assis pendant une période prolongée ? | Souvent |
| 6 | A quelle fréquence vous arrive-t-il de vous sentir excessivement actif et contraint de faire quelque chose, comme si vous étiez entraîné malgré vous par un moteur ? | Souvent |

Zones grisées vérifiées visuellement sur le rendu de la page 2 du PDF (11/10/2026).

---

## 6. Algorithme de scoring

Formulaire : « Additionnez le nombre de cases très ombrées que vous avez cochées. » Le score est donc le **nombre de réponses dans la zone grisée** : questions 1-3 si réponse ≥ Quelquefois (2), questions 4-6 si réponse ≥ Souvent (3). **Plage : 0-6.** Pas de somme des valeurs 0-4 (cf. §10). Passation incomplète refusée (règle projet).

---

## 7. Seuils d'interprétation

| Score | Interprétation |
| --- | --- |
| 0–3 | Dépistage négatif : moins de 4 réponses dans la zone grisée |
| 4–6 | Symptômes pouvant correspondre à ceux d'un TDAH de l'adulte : évaluation clinique recommandée |

**Source** : « Quatre (4) cases cochées ou plus indiquent que les symptômes que vous présentez peuvent correspondre à ceux des troubles déficitaires de l'attention avec hyperactivité de l'adulte. Vous devriez en parler avec votre médecin et demander une évaluation. »

---

## 8. Alertes cliniques

Aucune.

---

## 9. Cas de test unitaires

*Calculs vérifiés en Python le 11/10/2026, rejoués par `apps/api/src/scoring/scorers/asrs.spec.ts` (7/7).*

| # | Réponses (0-4, questions 1 à 6) | Score | Niveau |
| --- | --- | --- | --- |
| T1 | 0,0,0,0,0,0 | 0 | Négatif |
| T2 | 1,1,1,2,2,2 (juste sous chaque zone grisée) | 0 | Négatif |
| T3 | 2,2,2,3,3,3 (premier niveau de chaque zone grisée) | 6 | Positif |
| T4 | 2,2,2,2,2,2 (questions 4-6 hors zone à « Quelquefois ») | 3 | Négatif |
| T5 | 2,2,2,3,0,0 | 4 | Positif |
| T6 | 4,4,4,4,4,4 | 6 | Positif |

---

## 10. Choix et arbitrages méthodologiques

*Tranchés par Claude (11/10/2026), à relire par Clément. Confiance : haute / moyenne / basse.*

La licence n'autorise « aucune modification, sauf la création de versions électroniques » : seuls les ajustements imposés par le passage à l'écran sont faits ; le texte des questions est strictement verbatim, y compris la typographie.

### Écarts à la source primaire

| Élément | Source primaire | Texte retenu | Origine | Justification | Confiance |
| --- | --- | --- | --- | --- | --- |
| Consigne, verbe | « Cochez la case qui décrit le mieux… » | « Choisissez la réponse qui décrit le mieux… » | Adaptation Melya | Version électronique (autorisée par la licence) ; précédents PDEQ, PDI | haute |
| Consigne, 2e phrase | « Veuillez remettre le questionnaire rempli à votre médecin ou un autre professionnel lors de votre prochain rendez-vous afin d'en discuter les résultats. » | Retirée | — | Les réponses sont transmises automatiquement au praticien ; la phrase décrit le support papier | moyenne |
| Présentation et règle de cotation | Paragraphes « Souffrez-vous de troubles… », « Additionnez le nombre de cases très ombrées… » | Non affichés au patient ; règle portée par le scorer et la page praticien | — | Règle projet (pas de texte explicatif ni de résultat côté patient) | moyenne |
| Cases grisées | Visibles par le patient (auto-cotation) | Non visibles | — | Le score est calculé côté praticien ; afficher les zones orienterait les réponses | moyenne |
| « A quelle fréquence » | Majuscule non accentuée | Conservée | Source primaire | Interdiction de modifier ; usage typographique toléré (contrairement au précédent ADRS, sans clause de non-modification) | moyenne |
| « comporté » | Sans « (e) » | Conservé | Source primaire | Même raison | moyenne |

### Autres arbitrages

| Sujet | Choix retenu | Justification | Confiance |
| --- | --- | --- | --- |
| Périmètre | 6 questions (partie A) seulement | Seul le dépistage est libre pour un usage commercial ; le 18 items est sous licence NYU (MEL-351) | haute |
| Cotation | Comptage des cases grisées (0-6), pas la somme 0-24 | Règle du formulaire officiel ; la somme 0-24 (seuil 14 ou 12 selon les études) est une variante de recherche absente de la source | haute |
| Libellés des bandes | Reprennent la phrase de la source, au conditionnel (« pouvant correspondre ») | Fidélité à la source ; outil non diagnostique | haute |
| Traduction | Version française NYU (pas celle de Mentaal) | Seule version française approuvée par le détenteur | haute |
| Nouveau domaine | `neurodeveloppement`, libellé « Neurodéveloppement », teinte saumon `#F0A883` | Famille DSM-5 « Troubles neurodéveloppementaux », domaine validé par Clément (MEL-348) ; teinte déjà prévue par la maquette `scale-cards.html` (« Neuro-développement », `--c-salmon`) | haute |
| Catégorie | « TDAH de l'adulte » | Trouble + public (le TDAH de l'enfant relève d'autres outils) | moyenne |
| Acronyme | « ASRS-V1.1 » | Graphie du formulaire | haute |
| Durée | « 2 minutes » | Source : « moins de 5 minutes » ; 6 questions | moyenne |

### Questions ouvertes

1. Faut-il afficher, côté praticien, la somme 0-24 en complément ? Recommandation : non (hors source).

### Recette

À compléter après déploiement sur staging.

---

## 11. Contrat technique

- Entrée `asrs` dans `packages/core/src/scales/index.ts` : `single-scale`, clés `intensity_0` … `intensity_5`, valeurs 0-4, `persistentInstructions`, `patientIntroSubtitle`, bandes 0-3 / 4-6, `maxScore` 6, domaine `neurodeveloppement` (ajouté à `ScaleDomain`).
- `apps/web/lib/scale-appearance.ts` : teinte `salmon`, domaine ajouté en fin de `DOMAIN_ORDER`.
- Scorer `apps/api/src/scoring/scorers/asrs.ts` (comptage par seuil propre à chaque question), enregistré sous `asrs`. Tests `asrs.spec.ts`.

---

## 12. Historique des modifications

| Date | Auteur | Modification |
| --- | --- | --- |
| 11/10/2026 | Claude (lot autonome) | Création de la fiche et implémentation : version française NYU du dépistage en 6 questions, cotation par cases grisées (≥ 4), nouveau domaine Neurodéveloppement. Tests 7/7. |
