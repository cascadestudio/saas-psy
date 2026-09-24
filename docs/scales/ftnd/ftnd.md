# Test spec — FTND (Test de Fagerström en six questions)

---

## 1. Métadonnées produit

| Champ | Valeur |
| :---- | :---- |
| **Nom court** | FTND |
| **Nom complet (FR)** | Test de Fagerström en six questions |
| **Nom complet (langue originale)** | Fagerström Test for Nicotine Dependence (FTND) — renommé *Fagerström Test for Cigarette Dependence* (FTCD) par Fagerström en 2012 (cf. §2). L'acronyme FTND reste retenu : c'est celui de l'usage clinique francophone. |
| **Thème principal** | Dépendance à la nicotine (tabagisme) |
| **Sous-thèmes / tags** | tabagisme, sevrage tabagique, dépendance physique à la nicotine |
| **Nombre d'items** | 6 |
| **Durée estimée de passation** | ~2 min (estimation produit — non précisé dans les sources) |
| **Public cible** | Adultes fumeurs de cigarettes. L'item 4 compte des cigarettes : un non-fumeur obtiendrait 0 (« Pas de dépendance »), résultat sans signification. |
| **Mode d'administration** | Auto-passation (les items s'adressent directement au répondant : « fumez-vous », « trouvez-vous ») |
| **Note sur le mode d'administration** | Sans objet. |
| **Description praticien (bibliothèque)** | Questionnaire de 6 items évaluant le degré de dépendance physique à la nicotine chez les fumeurs de cigarettes, utilisé notamment pour orienter le choix et le dosage des substituts nicotiniques. |
| **Description patient (portail)** | AUCUNE — règle projet : le portail patient ne comporte pas de description de l'échelle. |

---

## 2. Sources et traçabilité

### Source primaire

- **Type** : institutionnel FR — outil associé à une recommandation de bonne pratique
- **Référence complète** : Haute Autorité de Santé (HAS). *Test de Fagerström en six questions* — outil associé à la recommandation de bonne pratique « Arrêt de la consommation de tabac : du dépistage individuel au maintien de l'abstinence ». Service des bonnes pratiques professionnelles, octobre 2014.
- **URL** : [https://www.has-sante.fr/upload/docs/application/pdf/2014-11/outil_tests_fagerstrom.pdf](https://www.has-sante.fr/upload/docs/application/pdf/2014-11/outil_tests_fagerstrom.pdf) (page 2 ; la page 1 contient la version simplifiée en deux questions, hors périmètre)
- **Date de consultation** : 24/09/2026
- **Fichier de portage** : `docs/scales/ftnd/FTND_HAS.pdf`
- **Note** : la rédaction initiale s'appuyait sur une copie hébergée par la SPLF ([lien](https://cdn2.splf.fr/wp-content/uploads/2023/01/Outil_dependance_Fagerstrom-6questions_HAS_01-10-2014.pdf), consultée le 17/09/2026). Son texte est identique mot pour mot à la page 2 du PDF officiel HAS, qui est désormais la référence.

### Source de cross-check

- **Type** : institutionnel FR (fédération hospitalière)
- **Référence complète** : Unicancer. *Test de Fagerström (complet)* — fiche PDF, mise à jour 2024.
- **URL** : [https://unicancer.fr/wp-content/uploads/2024/08/test-fagerstrom.pdf](https://unicancer.fr/wp-content/uploads/2024/08/test-fagerstrom.pdf)
- **Date de consultation** : 17/09/2026
- **Fichier de portage** : `docs/scales/ftnd/FTND_Unicancer.pdf`

### Source complémentaire (seuils uniquement)

- **Type** : institutionnel FR (réseau addictions)
- **Référence complète** : RESPADD. *Test de Fagerström* — fiche PDF (2013), citant Heatherton TF, Kozlowski LT, Frecker RC, Fagerström KO, 1991.
- **URL** : [https://www.respadd.org/wp-content/uploads/2018/09/FagerstromRespadd.pdf](https://www.respadd.org/wp-content/uploads/2018/09/FagerstromRespadd.pdf)
- **Date de consultation** : 24/09/2026
- **Fichier de portage** : `docs/scales/ftnd/FTND_RESPADD.pdf`
- **Usage** : **traduction différente** de celle de la HAS (ex. item 1 « Combien de temps s'écoule entre votre réveil et votre première cigarette ? ») → non utilisable pour les formulations. Retenue uniquement pour documenter le découpage alternatif des seuils (§7).

### Divergences constatées entre sources

1. **Seuils d'interprétation** (divergence majeure, cf. §7) :
   - HAS : 4 catégories — 0-2 pas de dépendance ; 3-4 dépendance faible ; 5-6 dépendance moyenne ; 7-10 dépendance forte ou très forte.
   - Unicancer et RESPADD : 5 catégories — 0-2 très faible ; 3-4 faible ; 5 moyenne ; 6-7 forte ; 8-10 très forte.
2. **Item 1, formulation** : HAS « après **être réveillé(e)**, » vs Unicancer « après **vous être réveillé** » (écart mineur, sans impact sur le sens).
3. **Item 1, libellés de réponse** : HAS « 6 **-** 30 minutes », « 31 **-** 60 minutes » vs Unicancer « 6 **à** 30 minutes », « 31 **à** 60 minutes ». Libellés HAS conservés verbatim.
4. **Item 2, position de la parenthèse** : HAS « … où c'est interdit **? (ex. : cinémas, bibliothèques)** » vs Unicancer « … où c'est interdit **(par exemple cinémas, bibliothèques) ?** ». Formulation HAS conservée verbatim.
5. **Item 6, formulation** : HAS « lorsque vous êtes **malade** au point de **devoir** rester au lit » vs Unicancer « lorsque vous êtes **malades** au point de rester au lit ». « malades » est une faute d'accord côté Unicancer, pas une variante → HAS retenue.
6. **Items 3, majuscules accentuées** : HAS « À » vs Unicancer « A » (typographie).
7. **Ordre d'affichage des réponses** : **identique** dans HAS et Unicancer (cf. §5) — ordre de la source, qui n'est pas l'ordre croissant des valeurs.
8. **Acronyme FTND** : n'apparaît dans aucune des sources françaises (HAS, Unicancer, RESPADD), qui disent toutes « Test de Fagerström ». La HAS cite *Fagerström 2012*, article qui renomme le FTND en FTCD (Fagerström K. *Determinants of tobacco use and renaming the FTND to the Fagerström Test for Cigarette Dependence*. Nicotine Tob Res. 2012;14(1):75-78). Arbitrage en §4.

### Version française retenue

- **Traducteur(s)** : non identifié dans les sources (la HAS ne nomme pas le traducteur).
- **Année de la traduction** : non identifiée ; version diffusée par la HAS en octobre 2014.
- **Publication de validation française** : aucune citée par la HAS, qui renvoie aux références originales anglophones (Heatherton et coll., 1991 ; Fagerström, 2012).
- **Justification du choix** : HAS retenue comme source primaire conformément à la hiérarchie de versions FR du projet (France > Suisse > Belgique > Québec) et à son statut d'autorité de santé nationale. C'est aussi la version de référence des prescripteurs de substituts nicotiniques en France.

---

## 3. Statut copyright et licence

| Champ | Valeur |
| :---- | :---- |
| **Statut** | libre (reproduction sans autorisation) — usage commercial non mentionné |
| **Détenteur des droits** | Instrument original : Taylor and Francis Ltd. (selon NIDA CTN). Mise en forme française : © Haute Autorité de Santé – 2014. |
| **Phrase de licence** | « The FTND is copyrighted by Taylor and Francis Ltd., but may be reproduced without permission, as available from the source reference (Heatherton, et al., 1991). » — [NIDA Clinical Trials Network Library](https://ctnlibrary.org/instrument/nida-clinical-trials-network-fagerstrom-test-for-nicotine-dependence-ftnd/), consulté le 24/09/2026. Source secondaire : la phrase n'a pas été vérifiée dans l'article de 1991 (accès payant). |
| **Éditeur commercial identifié** | Non. |
| **Mention obligatoire à afficher** | « Heatherton TF, Kozlowski LT, Frecker RC, Fagerström KO, 1991 — version française : Haute Autorité de Santé, 2014 » |
| **Restrictions d'usage commercial** | Non mentionnées. |
| **Décision Melya** | go sous réserve (même position que l'AUDIT : usage commercial non explicitement couvert). |

---

## 4. Structure de l'échelle

### Consigne officielle (affichée au patient avant les items)

Aucune. Les sources HAS et Unicancer n'ont pas de consigne : elles passent directement du titre aux items. **Arbitrage (24/09/2026) : pas de consigne**, par fidélité à la HAS. La phrase du RESPADD (« Répondez à ce test pour connaître votre niveau de dépendance à la nicotine. ») est écartée : elle promet au patient son résultat et provient d'une autre traduction.

**Source de la consigne** : sans objet.

### Comportement UX de la consigne

| Champ | Valeur |
| :---- | :---- |
| **Persistance** | Sans objet — pas de consigne (`instructions` et `persistentInstructions` absents). |
| **Emplacement** | Sans objet. |
| **Justification** | Aucune consigne dans la source primaire. |
| **Cas particuliers** | Sans objet. |

### Affichage du titre côté portail patient

| Champ | Valeur |
| :---- | :---- |
| **Élément(s) affiché(s) en titre sur le PDF source primaire** | Libellé complet uniquement — « Test de Fagerström en six questions ». Aucun acronyme. |
| **Référence PDF** | `FTND_HAS.pdf`, page 2, titre principal |
| **Acronyme (`acronym`)** | `FTND` — le modèle de données impose un acronyme affiché en titre. FTND est le nom connu des cliniciens francophones (aussi retenu par Mentaal) ; FTCD (renommage 2012) est peu usité en France. |
| **Sous-titre à afficher dans l'app (`patientIntroSubtitle`)** | non défini → fallback sur `label` = « Test de Fagerström en six questions » (libellé HAS verbatim). Le « en six questions » évite la confusion avec la version HAS simplifiée en deux questions. |
| **Divergence avec le PDF** | Ajout de l'acronyme « FTND », absent du PDF, imposé par le modèle de données (arbitrage du 24/09/2026). |

### Dimensions de cotation

**Dimension 1 — Dépendance à la nicotine**

- Plage : 0 à 10
- Modalités : hétérogènes selon l'item (voir §5 — items 1 et 4 cotés 0-3, items 2, 3, 5 et 6 cotés 0-1).

---

## 5. Items

*Formulations et **ordre d'affichage des réponses** repris tels quels du PDF source primaire (HAS, page 2). La source n'a **pas d'intitulé court** par item : l'app n'en affiche aucun (pas d'eyebrow au-dessus de la question, contrairement à l'AUDIT et au CUDIT-R), arbitrage du 24/09/2026. L'ordre d'affichage n'est pas l'ordre croissant des valeurs : l'item 1 est décroissant (3 → 0), l'item 4 croissant (0 → 3), et les items oui/non affichent « Oui » (1) avant « Non » (0). Cet ordre est identique dans la source de cross-check Unicancer.*

**Item 1**

> Le matin, combien de temps après être réveillé(e), fumez-vous votre première cigarette ?

| Ordre | Libellé | Valeur |
| :---- | :---- | :---- |
| a | Dans les 5 minutes | 3 |
| b | 6 - 30 minutes | 2 |
| c | 31 - 60 minutes | 1 |
| d | Plus de 60 minutes | 0 |

**Item 2**

> Trouvez-vous qu'il est difficile de vous abstenir de fumer dans les endroits où c'est interdit ? (ex. : cinémas, bibliothèques)

| Ordre | Libellé | Valeur |
| :---- | :---- | :---- |
| a | Oui | 1 |
| b | Non | 0 |

**Item 3**

> À quelle cigarette renonceriez-vous le plus difficilement ?

| Ordre | Libellé | Valeur |
| :---- | :---- | :---- |
| a | À la première de la journée | 1 |
| b | À une autre | 0 |

**Item 4**

> Combien de cigarettes fumez-vous par jour, en moyenne ?

| Ordre | Libellé | Valeur |
| :---- | :---- | :---- |
| a | 10 ou moins | 0 |
| b | 11 à 20 | 1 |
| c | 21 à 30 | 2 |
| d | 31 ou plus | 3 |

**Item 5**

> Fumez-vous à intervalles plus rapprochés durant les premières heures de la matinée que durant le reste de la journée ?

| Ordre | Libellé | Valeur |
| :---- | :---- | :---- |
| a | Oui | 1 |
| b | Non | 0 |

**Item 6**

> Fumez-vous lorsque vous êtes malade au point de devoir rester au lit presque toute la journée ?

| Ordre | Libellé | Valeur |
| :---- | :---- | :---- |
| a | Oui | 1 |
| b | Non | 0 |

*(Formulation Unicancer légèrement différente pour cet item — voir divergences §2.)*

---

## 6. Algorithme de scoring

### Calcul du score total

Somme des valeurs des 6 items.

**Plage du score total** : 0 à 10

### Subscores calculés

Sans objet (pas de subscores).

### Inversions d'items

Sans objet — aucun item inversé. L'ordre d'affichage décroissant de certains items (§5) n'est **pas** une inversion : la valeur de chaque réponse est celle indiquée dans la source.

### Gestion des réponses manquantes

Passation incomplète refusée : les 6 items sont obligatoires, aucune imputation (règle projet par défaut ; les sources ne prévoient rien).

---

## 7. Seuils d'interprétation

*Version retenue : HAS (source primaire), arbitrage du 24/09/2026.*

| Score | Interprétation |
| :---- | :---- |
| 0 – 2 | Pas de dépendance |
| 3 – 4 | Dépendance faible |
| 5 – 6 | Dépendance moyenne |
| 7 – 10 | Dépendance forte ou très forte |

**Source des seuils** :

| Champ | Valeur |
| :---- | :---- |
| **Référence** | HAS 2014, « Interprétation selon les auteurs », avec citation de « Heatherton et coll., 1991, Fagerström 2012 » (référence complète non détaillée dans le document HAS). |
| **URL directe vérifiable** | [https://www.has-sante.fr/upload/docs/application/pdf/2014-11/outil_tests_fagerstrom.pdf](https://www.has-sante.fr/upload/docs/application/pdf/2014-11/outil_tests_fagerstrom.pdf) (page 2) |
| **Date de consultation** | 24/09/2026 |
| **Niveau de consensus** | Consensus partiel — Unicancer et RESPADD retiennent un découpage en 5 catégories (voir §2, Divergences). |

**Remarques sur les seuils** : le découpage à 5 niveaux (0-2 très faible ; 3-4 faible ; 5 moyenne ; 6-7 forte ; 8-10 très forte) est le plus répandu à l'international, mais son origine n'a pas pu être vérifiée (probablement Fagerström, Heatherton & Kozlowski, 1990, article non accessible en ligne). Le jeu HAS est retenu parce qu'il provient du même document que les items (une seule source à tracer), de l'autorité nationale, et de la recommandation que suivent les prescripteurs. Limite connue : la HAS libelle « Pas de dépendance » la bande 0-2 d'un fumeur, là où le découpage à 5 niveaux dit « très faible ».

---

## 8. Alertes cliniques

Aucune alerte spécifique identifiée dans les sources consultées. Aucun item du FTND ne déclenche de règle d'alerte indépendante du score total.

---

## 9. Cas de test unitaires

*Les réponses sont exprimées en **valeurs** (points), dans l'ordre des items 1 à 6 — pas en position d'affichage.*

### 1. Cas limites (min/max)

| # | Réponses | Score | Interprétation |
| :---- | :---- | :---- | :---- |
| T1 | [0,0,0,0,0,0] | 0 | Pas de dépendance |
| T2 | [3,1,1,3,1,1] | 10 | Dépendance forte ou très forte |

### 2. Transitions de seuil

| # | Réponses | Score | Interprétation |
| :---- | :---- | :---- | :---- |
| T3 | [2,0,0,0,0,0] | 2 | Pas de dépendance |
| T4 | [3,0,0,0,0,0] | 3 | Dépendance faible |
| T5 | [3,1,0,0,0,0] | 4 | Dépendance faible |
| T6 | [3,1,1,0,0,0] | 5 | Dépendance moyenne |
| T7 | [3,1,1,1,0,0] | 6 | Dépendance moyenne |
| T8 | [3,1,1,2,0,0] | 7 | Dépendance forte ou très forte |

### 3. Cas typiques (sanity check)

| # | Réponses | Score | Interprétation |
| :---- | :---- | :---- | :---- |
| T9 | [2,1,1,1,0,0] (6 - 30 min ; oui, difficile ; la première de la journée ; 11 à 20 cig/j ; non ; non) | 5 | Dépendance moyenne |

### 4. Cas spécifiques à l'échelle

| # | Cas | Réponses | Score | Interprétation |
| :---- | :---- | :---- | :---- | :---- |
| T10 | Barème hétérogène : l'item 4 seul au max | [0,0,0,3,0,0] | 3 | Dépendance faible |
| T11 | Ordre d'affichage ≠ valeur : 1ʳᵉ option affichée de chaque item (a) | [3,1,1,0,1,1] | 7 | Dépendance forte ou très forte |

### 5. Entrées invalides

*Arbitrage du 24/09/2026 : comportement actuel commun à toutes les échelles, pas de validation spécifique FTND.* Le parcours patient n'avance qu'après une réponse à chaque item et ne propose que les options de §5 : les cas ci-dessous ne sont pas atteignables par l'interface. Côté serveur, les scorers ne valident pas encore les entrées (une valeur manquante compte pour 0) — chantier transverse confié à Adrien, pour toutes les échelles.

| # | Cas | Comportement actuel |
| :---- | :---- | :---- |
| T12 | Valeur hors borne pour un item (ex. item 2 = 2) | Impossible via l'UI (options fermées). |
| T13 | Valeur négative | Impossible via l'UI. |
| T14 | Réponse manquante | Impossible via l'UI (réponse requise pour avancer). |
| T15 | Valeur non numérique | Impossible via l'UI. |
| T16 | Moins de 6 réponses | Impossible via l'UI. |
| T17 | Plus de 6 réponses | Impossible via l'UI. |

Les cas T1 à T11 sont automatisés dans `apps/api/src/scoring/scorers/ftnd.spec.ts` (`cd apps/api && npx jest ftnd`). Pas encore branchés en CI : les workflows GitHub ne font que déployer.

---

## 10. Points à valider avec Renata

Aucun point ouvert. Arbitrages rendus par Clément le 24/09/2026 :

| # | Question | Décision |
| :---- | :---- | :---- |
| 1 | Seuils : HAS (4 catégories) ou Unicancer/RESPADD (5 catégories) ? | HAS (§7). |
| 2 | Acronyme affiché : FTND ou FTCD ? | FTND, sous-titre = libellé HAS (§4). |
| 3 | Consigne patient ? | Aucune (§4). |
| 4 | Formulation de l'item 6 ? | HAS (§5) ; « malades » chez Unicancer est une faute d'accord. |
| 5 | Statut des droits ? | Reproduction libre, usage commercial non mentionné → go sous réserve (§3). |
| 6 | Public cible ? | Adultes fumeurs de cigarettes (§1). |
| 7 | Ordre d'affichage des réponses ? | Ordre de la source HAS (§5). |

---

## 11. Contrat technique pour Adrien

*Implémenté le 24/09/2026 en réutilisant uniquement des briques existantes (même patron que le CUDIT-R).*

### Fichiers

- Données : `packages/core/src/scales/index.ts`, entrée `id: "ftnd"` (`formType: "options"`, catégorie « Addictions »).
- Scorer : `apps/api/src/scoring/scorers/ftnd.ts` (`scoreFtnd`, somme + lookup des `ranges`), inscrit dans `scoring.service.ts` sous la clé `ftnd`.
- Tests : `apps/api/src/scoring/scorers/ftnd.spec.ts` (cas §9 T1–T11 + ordre d'affichage des options).
- Icône : `apps/web/public/images/scales/ftnd.svg` (même doodle que AUDIT et CUDIT-R).

### Signature de la fonction de scoring

```
scoreFtnd(scale: Scale, responses: Record<string, unknown>) → ScoreResult {
  totalScore: number,        // 0 à 10
  maxScore: 10,
  interpretation: "Pas de dépendance" | "Dépendance faible" | "Dépendance moyenne" | "Dépendance forte ou très forte",
  severityIndex, severityRangeCount,
}
```

### Contrat d'erreur

Pas de validation spécifique (cf. §9.5) : comportement commun à toutes les échelles.

### Clés de réponse attendues

`option_0` à `option_5` (items 1 à 6 de §5). Chaque valeur est la **valeur** de la réponse choisie, dans la plage suivante :

- Item 1 : {0, 1, 2, 3}
- Item 2 : {0, 1}
- Item 3 : {0, 1}
- Item 4 : {0, 1, 2, 3}
- Item 5 : {0, 1}
- Item 6 : {0, 1}

### Notes d'implémentation

- **Barème hétérogène** : options propres à chaque item (0-1 ou 0-3), comme l'AUDIT — pas de plage uniforme.
- **Ordre d'affichage ≠ ordre des valeurs** : les options doivent être déclarées dans l'ordre de §5 (a, b, c, d) avec leur valeur explicite. Ne pas trier par valeur ; ne pas déduire la valeur de la position.
- **Titre** : `acronym: "FTND"`, `label: "Test de Fagerström en six questions"`, `patientIntroSubtitle` non défini.
- **Pas d'intitulé court** : chaque item n'a qu'un `title` = la question HAS verbatim, sans `prompt`. L'écran affiche donc la question seule, sans eyebrow.
- **Pas de consigne** : `instructions` et `persistentInstructions` absents.
- **`copyrightAttribution`** : « Heatherton TF, Kozlowski LT, Frecker RC, Fagerström KO, 1991 — version française : Haute Autorité de Santé, 2014 ».

---

## 12. Historique des modifications

| Date | Auteur | Modification |
| :---- | :---- | :---- |
| 17/09/2026 | James (via Claude) | Création initiale du spec à partir des sources HAS (primaire, oct. 2014) et Unicancer (cross-check, 2024). Divergences de seuils et de formulation d'items identifiées et documentées ; plusieurs champs marqués [À SOURCER] faute d'information dans les deux sources consultées. |
| 24/09/2026 | Clément (avec Claude) | Relecture E4. Source primaire basculée sur le PDF officiel has-sante.fr (identique à la copie SPLF) ; PDF archivés dans `docs/scales/ftnd/` ; RESPADD ajouté comme source complémentaire pour les seuils. **Correction** : l'ordre d'affichage des réponses en §5 avait été trié par valeur croissante sans le déclarer — remis dans l'ordre de la source HAS. Divergences ajoutées (item 1 « - » vs « à », parenthèse de l'item 2). Arbitrages §10 rendus : seuils HAS, acronyme FTND, pas de consigne, droits « go sous réserve », public fumeurs de cigarettes. §9 : vecteurs de réponses ajoutés aux transitions de seuil + 2 cas spécifiques. Fiche validée E4, prête pour implémentation. |
| 24/09/2026 | Clément (avec Claude) | Implémentation E5 par réutilisation (données `packages/core`, scorer patron CUDIT-R, icône addictions, tests §9 automatisés avec Jest, hors CI). Arbitrages : aucun intitulé court par item (absent de la source HAS) — titres d'items retirés de §5 ; §9.5 et §11 alignés sur le comportement existant (pas de validation serveur spécifique). |
