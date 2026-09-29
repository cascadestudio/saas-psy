# Test spec — PDSS (Questionnaire d'appréciation des symptômes du trouble panique)

---

## 1. Métadonnées produit

| Champ | Valeur |
| :---- | :---- |
| **Nom court** | PDSS |
| **Nom complet (FR)** | Questionnaire d'appréciation des symptômes du trouble panique (titre du PDF MSSS, §2) |
| **Nom complet (langue originale)** | Panic Disorder Severity Scale — Self-Report (PDSS-SR). Version auto-questionnaire (Houck et al., 2002) de la PDSS hétéro-évaluée de Shear et al. (1997). |
| **Thème principal** | Trouble panique |
| **Sous-thèmes / tags** | attaques de panique, anxiété anticipatoire, évitement, agoraphobie |
| **Nombre d'items** | 7 |
| **Durée estimée de passation** | ~5 min (estimation produit — non précisé dans les sources ; items et réponses longs) |
| **Public cible** | Adultes (population de validation de Roberge et al. 2022 ; public adulte du PQPTM) |
| **Mode d'administration** | Auto-passation |
| **Note sur le mode d'administration** | La PDSS d'origine (Shear 1997) est un entretien coté par le clinicien. Melya porte la version **auto-questionnaire** (PDSS-SR), la seule compatible avec le flux de passation patient. Le PDF source (MSSS) est bien rédigé à la première personne pour le patient (« J'ai dû apporter… »). |
| **Description praticien (bibliothèque)** | Auto-questionnaire de 7 items évaluant la sévérité du trouble panique au cours de la dernière semaine : fréquence et détresse des attaques, anxiété anticipatoire, évitement des situations et des sensations physiques, retentissement professionnel et social. |
| **Description patient (portail)** | AUCUNE — règle projet : le portail patient ne comporte pas de description de l'échelle. |

---

## 2. Sources et traçabilité

### Source primaire (consigne et items)

- **Type** : institutionnel — ministère de la Santé du Québec (MSSS), outil du Programme québécois pour les troubles mentaux (PQPTM)
- **Référence complète** : Ministère de la Santé et des Services sociaux du Québec. *Questionnaire d'appréciation des symptômes du trouble panique — PDSS*. Formulaire de dossier clinique CN0000 (2019-XX), 4 pages, octobre 2019. Mention en pied de page : « Panic Disorder Severity Scale – PDSS © 1997 Katherine Shear ».
- **URL** : [https://www.gmfulevis.com/clients/CISSSCA/Sous-Sites/GMF-U/Arret_de_travail/Form-questionnaire_PDSS.pdf](https://www.gmfulevis.com/clients/CISSSCA/Sous-Sites/GMF-U/Arret_de_travail/Form-questionnaire_PDSS.pdf) (copie diffusée par le GMF-U de Lévis, CISSS de Chaudière-Appalaches)
- **Date de consultation** : 29/09/2026
- **Fichier de portage** : `docs/scales/pdss/PDSS_GMFU-Levis.pdf`
- **Provenance** : logo « Santé et Services sociaux Québec » en en-tête ; métadonnées du PDF : auteur « Ministère de la Santé et des Services sociaux », créé le 15/10/2019. Le guide de pratique PQPTM du MSSS (*Troubles mentaux fréquents : repérage et trajectoires de services*, 2019, annexe 2) désigne la « version française du questionnaire Panic Disorder Severity Scale » comme outil de suivi du trouble panique ([PDF](https://qualaxia.org/wp-content/uploads/msss_2019_pqptm_guide-troubles-mentaux-frequents.pdf), consulté le 29/09/2026). Le même questionnaire est référencé par le CISSS de l'Outaouais (portail clinique hors ligne au 29/09/2026).
- **Limite** : le numéro de formulaire « CN0000 (2019-XX) » est un gabarit non finalisé ; le traducteur n'est pas nommé.

### Exception de sourcing — autorité unique justifiée

Aucune deuxième source indépendante reproduisant les items en français n'a été trouvée (recherche du 29/09/2026). La source MSSS est retenue seule, au titre d'**autorité institutionnelle** — même logique que la HAS pour le FTND ou le Cn2r pour la PDEQ :

- elle émane du ministère de la Santé du Québec, qui en fait l'outil officiel de suivi du trouble panique dans son programme provincial (guide PQPTM 2019, annexe 2) ;
- elle est diffusée telle quelle par plusieurs établissements du réseau (CISSS de Chaudière-Appalaches, CISSS de l'Outaouais) ;
- la seule autre version française connue (Roberge et al., 2022) n'est pas publiée.

**Cross-check a posteriori** : la version validée de Roberge et al. est demandée à l'équipe de Sherbrooke (arbitrage du 29/09/2026). À réception, comparaison item par item ; tout écart remonte en §10.

### Source consultée et écartée

- **Référence** : Flavier M. *Place et évolution des thérapies cognitivo-comportementales dans le trouble panique. Revue de la littérature.* Thèse de doctorat en médecine (psychiatrie), Université de Bordeaux, 2017, n° 3103.
- **URL** : [https://dumas.ccsd.cnrs.fr/dumas-01624835/document](https://dumas.ccsd.cnrs.fr/dumas-01624835/document)
- **Date de consultation** : 29/09/2026
- **Fichier** : `docs/scales/pdss/PDSS_These-Bordeaux-2017.pdf`
- **Motif d'exclusion** : ne reproduit pas les items (description de la PDSS en un paragraphe, section « outils psychométriques », et tableau C des annexes, qui la classe en hétéro-questionnaire). Ses seuils (≤ 5, ≥ 10, rémission ≤ 7) portent sur la version clinicien (Shear 2001). Sa référence « Roberge et al., 2003 » est la validation franco-canadienne de la PAS, pas de la PDSS.

### Source des seuils

- **Type** : publication peer-reviewed (validation de la version française de la PDSS-SR)
- **Référence complète** : Roberge P, Marx P, Couture J, Carrier N, Benoît A, Provencher MD, Antony MM, Norton PJ. French adaptation and validation of the Panic Disorder Severity Scale—self-report. *BMC Psychiatry*. 2022;22:434. doi:10.1186/s12888-022-03989-x
- **URL** : [https://pmc.ncbi.nlm.nih.gov/articles/PMC9235095/](https://pmc.ncbi.nlm.nih.gov/articles/PMC9235095/)
- **Date de consultation** : 29/09/2026
- **Contenu utile** : période de référence « la dernière semaine », items cotés 0 à 4, seuil optimal de diagnostic probable **9** (sensibilité 78,8 %, spécificité 70,4 %). Les items français ne sont **pas** reproduits (« The French-version of the questionnaire is available on request »).

### Divergences constatées entre sources

1. **Seuil** : Roberge et al. publient **9** dans l'article complet (*BMC Psychiatry* 2022) et **10** dans un résumé de congrès antérieur (Roberge P, Provencher M, Norton P et al., *Eur Psychiatry* 2022;65(S1):S388-S389, doi:10.1192/j.eurpsy.2022.982 — [PMC9565306](https://pmc.ncbi.nlm.nih.gov/articles/PMC9565306/)). L'article complet, relu par les pairs et postérieur, est retenu (§7).
2. **Identité des traductions** : on ne sait pas si la version MSSS (2019) est celle que Roberge et al. ont validée (2022). À lever via le cross-check ou la demande à Sherbrooke.

### Écarts de portage (PDF → app)

Consignés en §10 (« Écarts à la source primaire »).

### Version française retenue

- **Traducteur(s)** : non identifié (formulaire MSSS).
- **Année de la traduction** : 2019 (date du formulaire MSSS).
- **Publication de validation française** : Roberge et al., *BMC Psychiatry* 2022 (version franco-canadienne de la PDSS-SR) — correspondance avec le texte MSSS non établie (§2, divergence 2).
- **Justification du choix** : aucune version de France n'a été trouvée (recherche du 29/09/2026). La hiérarchie France > Suisse > Belgique > Québec laisse donc le Québec ; parmi les versions québécoises, le formulaire MSSS est la seule complète et accessible, et il émane de l'autorité de santé provinciale. La version Roberge 2022 n'est disponible que sur demande.

### Comparaison Mentaal

Au 29/09/2026, la PDSS est « Bientôt disponible » chez Mentaal ([page](https://mentaal.fr/tests/pdss)) : 7 questions annoncées, aucune version française, source, mention de copyright ni seuil indiqués. Pas de parcours patient à comparer.

---

## 3. Statut copyright et licence

| Champ | Valeur |
| :---- | :---- |
| **Statut** | zone grise — ✉️ contact auteur à faire |
| **Détenteur des droits** | M. Katherine Shear (instrument original, © 1997). Mise en forme française : MSSS Québec (2019). |
| **Phrase de licence** | « The PDSS is copyrighted to Dr Katherine Shear who has given permission for the scale to be used by clinicians in their practice and researchers in non-industry settings. For other uses of the scale Katherine Shear should be contacted. » — [goodmedicine.org.uk](https://www.goodmedicine.org.uk/goodknowledge/panic-ocd-depersonalization-information-assessment/), consulté le 29/09/2026. Source secondaire. CamCOPS fait le même constat et ne distribue pas le texte de l'échelle ([doc](https://camcops.readthedocs.io/en/stable/tasks/pdss.html)). |
| **Éditeur commercial identifié** | Non. |
| **Mention obligatoire à afficher** | « Panic Disorder Severity Scale – PDSS © 1997 Katherine Shear — version française : ministère de la Santé et des Services sociaux du Québec, 2019 » (première partie verbatim du pied de page du PDF MSSS). |
| **Restrictions d'usage commercial** | Non couvert : la permission vise les cliniciens dans leur pratique et la recherche hors industrie. Un SaaS payant relève des « other uses ». |
| **Décision Melya** | go sous réserve — arbitrage du 29/09/2026 : on implémente et on lance sans attendre ; Shear sera contactée avec les autres auteurs flaggés ✉️ dans `SUIVI_ECHELLES.md`. |

### Suivi des démarches externes

- **Motif** : usage commercial non couvert par la permission de Shear.
- **Contact en cours** : demande de la version française à P. Roberge (Sherbrooke) — issue Linear MEL-339, à envoyer par Clément. Contact Shear : campagne groupée des auteurs ✉️, à planifier.
- **Prochaine action** : écrire à K. Shear (Columbia University) ; en parallèle, demander la version française de Roberge et al. à l'Université de Sherbrooke (§2). Emails relus par Clément avant envoi.
- **Date de dernière mise à jour du suivi** : 29/09/2026

---

## 4. Structure de l'échelle

### Consigne officielle (affichée au patient avant les items)

> _« Plusieurs des questions qui suivent font référence à des attaques de panique et à des attaques subcliniques. Dans le présent questionnaire, l'attaque de panique correspond à un accès soudain de peur ou de malaise s'accompagnant d'au moins quatre symptômes de la liste ci-dessous. Pour répondre au critère de l'accès soudain, les symptômes doivent atteindre leur point culminant en dix minutes ou moins. Les épisodes qui ressemblent à une attaque de panique, mais comportent moins de quatre symptômes de la liste ci-dessous sont appelés des attaques subcliniques._
>
> _Voici la liste dans laquelle doivent figurer les symptômes :_
> - _Battements de cœur rapides ou forts_
> - _Transpiration_
> - _Tremblements_
> - _Essoufflement_
> - _Sensation d'étranglement_
> - _Douleur ou gêne thoraciques_
> - _Nausée_
> - _Étourdissement ou vertige_
> - _Sentiment d'irréalité_
> - _Engourdissement ou fourmillement_
> - _Frissons ou bouffées de chaleur_
> - _Peur de perdre le contrôle de soi ou de devenir fou_
> - _Peur de mourir_
>
> _1. Utilisez les échelles décrites à chaque item._
> _2. Répondez à chacun des items en choisissant la réponse qui correspond le mieux à votre situation. »_

**Source de la consigne** : PDF MSSS, page 1, bloc précédant l'item 1 (écarts consignés en §10).

### Comportement UX de la consigne

| Champ | Valeur |
| :---- | :---- |
| **Persistance** | `page_de_garde_seule` |
| **Emplacement** | Écran d'intro, trois paragraphes ; les symptômes en liste à puces, les deux consignes numérotées sur deux lignes. |
| **Justification** | En `formType: "options"`, aucune consigne n'est rappelée au-dessus des items. La consigne est trop longue pour être persistante, et chaque item porte déjà sa propre échelle de réponse (« Utilisez les échelles décrites à chaque item »). |
| **Cas particuliers** | L'écran d'intro ne savait afficher que des paragraphes (`\n\n`). Évolution associée : composant `ScaleInstructions`, utilisé pour l'intro patient, l'aperçu praticien et le bloc consigne des résultats — un simple `\n` passe à la ligne, une ligne en `- ` devient une puce. Aucune échelle existante n'utilisait de `\n` simple ni de ligne en `- ` (vérifié le 29/09/2026). |

### Affichage du titre côté portail patient

| Champ | Valeur |
| :---- | :---- |
| **Élément(s) affiché(s) en titre sur le PDF source primaire** | « QUESTIONNAIRE D'APPRÉCIATION DES SYMPTÔMES DU TROUBLE PANIQUE » puis « PDSS » |
| **Référence PDF** | `PDSS_GMFU-Levis.pdf`, page 1, en-tête |
| **Sous-titre à afficher dans l'app (`patientIntroSubtitle`)** | non défini → fallback sur `label` = « Questionnaire d'appréciation des symptômes du trouble panique » |
| **Divergence avec le PDF** | Casse normale au lieu des capitales du PDF (mise en forme). |

### Dimensions de cotation

**Dimension 1 — Sévérité du trouble panique**

- Plage : 0 à 4 par item
- Modalités : propres à chaque item (voir §5). Pour tous les items, 0 = absence, 4 = sévérité extrême ; les libellés 1 à 3 commencent le plus souvent par « Léger » / « Modéré » / « Grave ».

---

## 5. Items

*Variante B : chaque item a ses propres libellés de réponse. Formulations reprises du PDF MSSS, dans l'ordre de la source (0 → 4). La source n'a pas d'intitulé court par item : l'app n'affiche que la question (`title`), sans `prompt`.*

**Item 1**

> Combien d'attaques de panique et d'attaques subcliniques avez-vous eues au cours de la semaine?

| Valeur | Libellé |
| :---- | :---- |
| 0 | Aucune attaque de panique ou attaque subclinique |
| 1 | Léger : Aucune attaque de panique complète et pas plus d'une attaque subclinique par jour |
| 2 | Modéré : Une ou deux attaques de panique complètes et/ou plusieurs attaques subcliniques par jour |
| 3 | Grave : Plus de deux attaques de panique complètes, mais pas plus d'une par jour en moyenne |
| 4 | Extrême : Attaques de panique complètes plus d'une fois par jour, la plupart des jours |

**Item 2**

> Si vous avez eu des attaques de panique au cours de la dernière semaine, quelle est l'intensité de la détresse (état de malaise et de peur) que vous avez ressentie pendant qu'elles se produisaient? (Si vous avez eu plus d'une attaque de panique, veuillez indiquer leur intensité moyenne. Si vous n'avez eu aucune attaque de panique, mais avez eu des attaques subcliniques, veuillez fournir une réponse au sujet de vos attaques subcliniques.)

| Valeur | Libellé |
| :---- | :---- |
| 0 | Aucune détresse, ou encore aucune attaque de panique ou attaque subclinique au cours de la dernière semaine |
| 1 | Légère détresse (pas trop intense) |
| 2 | Détresse modérée (intense, mais gérable) |
| 3 | Détresse grave (très intense) |
| 4 | Détresse extrême (pendant toutes les attaques) |

**Item 3**

> Au cours de la dernière semaine, à quel point vous êtes-vous inquiété au sujet du moment où surviendrait votre prochaine attaque de panique ou de vos craintes liées aux attaques (par exemple, les attaques pourraient signifier que vous avez un problème de santé physique ou mentale ou vous causer une humiliation sur le plan social)?

| Valeur | Libellé |
| :---- | :---- |
| 0 | Pas du tout |
| 1 | Parfois ou seulement un peu |
| 2 | Souvent ou modérément |
| 3 | Très souvent ou de façon très perturbante |
| 4 | Presque continuellement et de façon invalidante |

**Item 4**

> Au cours de la dernière semaine, avez-vous évité ou craint (vous vous sentiez mal à l'aise ou aviez envie d'éviter une situation ou de partir) certains endroits ou certaines situations (par exemple, les transports en commun, les salles de cinéma, les foules, les tunnels ou les ponts, les centres commerciaux, vous retrouver seul) parce que vous aviez peur d'avoir une attaque de panique? Y a-t-il d'autres situations que vous auriez évitées ou craintes, pour la même raison, si elles étaient survenues au cours de la semaine? Si vous répondez oui à l'une de ces questions, veuillez indiquer l'intensité de vos craintes et de vos évitements au cours de la dernière semaine.

| Valeur | Libellé |
| :---- | :---- |
| 0 | Aucune crainte ou évitement. |
| 1 | Léger : Crainte et/ou évitement occasionnels, mais j'ai généralement pu faire face à la situation ou la supporter. Je n'ai eu à apporter aucun ou seulement peu de changements à mon mode de vie pour cette raison. |
| 2 | Modéré : Crainte et/ou évitement notables, mais gérables. J'ai évité certaines situations, mais je pouvais y faire face en compagnie d'une autre personne. J'ai dû apporter certains changements à mon mode de vie pour cette raison, mais cela n'a pas nui à mon fonctionnement en général. |
| 3 | Grave : Évitement important. J'ai dû apporter des changements importants à mon mode de vie pour éviter des situations. Par conséquent, j'ai eu de la difficulté à accomplir mes activités quotidiennes. |
| 4 | Extrême : Volonté d'éviter des situations et/ou crainte envahissantes et invalidantes. J'ai dû modifier mon mode de vie en profondeur, si bien que j'ai été incapable d'accomplir des tâches importantes. |

**Item 5**

> Au cours de la dernière semaine, avez-vous évité ou craint (vous vous sentiez mal à l'aise, aviez envie d'éviter la situation ou d'y mettre fin) des activités (par exemple, faire de l'exercice physique, avoir des relations sexuelles, prendre une douche ou un bain chaud, boire du café, regarder un film d'action ou d'horreur) parce qu'elles causent des sensations physiques semblables à celles que vous ressentez lors d'une attaque de panique ou parce que vous aviez peur qu'elles déclenchent une attaque de panique? Y a-t-il d'autres activités que vous auriez évitées ou craintes pour la même raison si l'occasion s'était présentée au cours de la semaine? Si vous répondez oui à l'une de ces questions, veuillez indiquer l'intensité des craintes et de l'évitement de ces activités au cours de la dernière semaine.

| Valeur | Libellé |
| :---- | :---- |
| 0 | Aucune crainte ou évitement des activités en raison de sensations physiques perturbantes. |
| 1 | Léger : Crainte et/ou évitement occasionnels, mais j'ai généralement pu faire face à la situation ou supporter les activités provoquant des sensations physiques en ne ressentant qu'une légère détresse. Je n'ai eu à apporter que peu de changements à mon mode de vie pour cette raison. |
| 2 | Modéré : Évitement notable, mais gérable. J'ai dû apporter quelques changements à mon mode de vie, mais cela n'a pas nui à mon fonctionnement en général. |
| 3 | Grave : Évitement important. J'ai dû apporter des changements importants à mon mode de vie, ou ceci a nui à mon fonctionnement en général. |
| 4 | Extrême : Évitement envahissant et invalidant. J'ai dû modifier mon mode de vie en profondeur, si bien que j'ai été incapable d'accomplir des tâches ou des activités importantes. |

**Item 6**

> Au cours de la dernière semaine, dans quelle mesure les symptômes mentionnés précédemment, dans leur ensemble (attaques de panique et attaques subcliniques, inquiétude au sujet des attaques, crainte de situations et d'activités en lien avec les attaques), ont-ils nui à votre capacité de travailler ou de vous acquitter de vos responsabilités à la maison? (Si vos responsabilités au travail ou à la maison ont été moins importantes que d'habitude au cours de la dernière semaine, veuillez estimer dans quelle mesure les symptômes vous auraient nui si vous aviez dû assumer vos responsabilités habituelles.)

| Valeur | Libellé |
| :---- | :---- |
| 0 | Aucune : Les symptômes n'ont pas nui à mon travail ou à mes responsabilités à la maison. |
| 1 | Légère : Les symptômes ont légèrement nui à mon travail ou à mes responsabilités à la maison, mais j'ai pu accomplir presque toutes les tâches que j'aurais accomplies si je n'avais pas eu ces problèmes. *(« à » ajouté, coquille — §10)* |
| 2 | Modérée : Les symptômes ont nui de façon notable à mon travail ou à mes responsabilités à la maison, mais j'ai réussi à accomplir les tâches nécessaires. |
| 3 | Grave : Les symptômes ont nui de façon importante à mon travail ou à mes responsabilités à la maison; j'ai été incapable d'accomplir plusieurs tâches importantes à cause de ces problèmes. |
| 4 | Extrême : Les symptômes ont été extrêmement invalidants, si bien que je n'ai été en mesure d'accomplir pratiquement aucune tâche relative à mon travail ou à mes responsabilités à la maison. |

**Item 7**

> Au cours de la dernière semaine, dans quelle mesure les attaques de panique, les attaques subcliniques, l'inquiétude au sujet des attaques et la crainte de situations et d'activités ont-elles perturbé votre vie sociale? (Si vous n'avez pas eu beaucoup d'occasions de socialiser au cours de la dernière semaine, veuillez estimer dans quelle mesure votre vie sociale aurait été perturbée si les occasions s'étaient présentées.)

| Valeur | Libellé |
| :---- | :---- |
| 0 | Aucune : Pas de perturbation. |
| 1 | Légère : Les symptômes ont occasionné une légère perturbation de mes activités sociales, mais j'ai pu faire presque toutes les activités auxquelles je me serais adonné si je n'avais pas eu ces problèmes. |
| 2 | Modérée : Les symptômes ont occasionné une perturbation notable de mes activités sociales, mais j'ai pu faire la plupart de mes activités en faisant un effort. |
| 3 | Grave : Les symptômes ont occasionné une perturbation importante de mes activités sociales; j'ai été incapable de faire de nombreuses activités comportant des interactions sociales à cause de ces problèmes. |
| 4 | Extrême : Les symptômes ont été extrêmement invalidants, si bien que je n'ai été en mesure de m'adonner à presque aucune activité sociale. |

---

## 6. Algorithme de scoring

### Calcul du score total

Somme des valeurs des 7 items.

**Plage du score total** : 0 à 28

### Subscores calculés

Sans objet (pas de subscores). Roberge et al. (2022) rapportent une structure à deux facteurs, sans proposer de sous-scores cliniques.

### Inversions d'items

Sans objet — aucun item inversé.

### Gestion des réponses manquantes

Passation incomplète refusée : les 7 items sont obligatoires, aucune imputation. Conforme au PDF MSSS : « Lorsqu'une réponse ou plus sont manquantes, le score du questionnaire ne peut pas être utilisé. »

---

## 7. Seuils d'interprétation

*Arbitrage du 29/09/2026 (Adrien) : seuil ≥ 9 de l'article complet, deux bandes. Libellés à confirmer (§10).*

| Score | Interprétation |
| :---- | :---- |
| 0 – 8 | En dessous du seuil de dépistage |
| 9 – 28 | Trouble panique probable |

**Source des seuils** :

| Champ | Valeur |
| :---- | :---- |
| **Référence académique** | Roberge P, Marx P, Couture J, et al. French adaptation and validation of the Panic Disorder Severity Scale—self-report. *BMC Psychiatry*. 2022;22:434. |
| **URL directe vérifiable** | [https://pmc.ncbi.nlm.nih.gov/articles/PMC9235095/](https://pmc.ncbi.nlm.nih.gov/articles/PMC9235095/) |
| **Date de consultation** | 29/09/2026 |
| **Niveau de consensus** | propre à la version FR (franco-canadienne) |

**Remarques sur les seuils** :

- C'est un seuil de **dépistage** (« optimal threshold for probable diagnosis », sensibilité 78,8 %, spécificité 70,4 %), pas une gradation de sévérité. Aucune source ne propose de bandes léger / modéré / sévère pour la PDSS-SR en français.
- Les bandes de Furukawa et al. (2009) portent sur la PDSS **hétéro-évaluée** en anglais : non transposées (les seuils voyagent mal d'une version et d'une langue à l'autre).
- Le résumé de congrès de la même équipe donnait 10 (§2, divergence 1) ; l'article complet le remplace.
- Les libellés sont une formulation Melya : aucune source française ne libelle les bandes.

---

## 8. Alertes cliniques

Aucune alerte spécifique. Aucun item ne porte sur l'idéation suicidaire, l'automutilation ou les violences.

---

## 9. Cas de test unitaires

*Les réponses sont exprimées en **valeurs** (0 à 4), dans l'ordre des items 1 à 7.*

### 1. Cas limites (min/max)

| # | Réponses | Score | Interprétation |
| :---- | :---- | :---- | :---- |
| T1 | [0,0,0,0,0,0,0] | 0 | En dessous du seuil de dépistage |
| T2 | [4,4,4,4,4,4,4] | 28 | Trouble panique probable |

### 2. Transitions de seuil

| # | Réponses | Score | Interprétation |
| :---- | :---- | :---- | :---- |
| T3 | [2,2,1,1,1,1,0] | 8 | En dessous du seuil de dépistage |
| T4 | [2,2,1,1,1,1,1] | 9 | Trouble panique probable |

### 3. Cas typiques (sanity check)

| # | Réponses | Score | Interprétation |
| :---- | :---- | :---- | :---- |
| T5 | [2,3,3,2,1,2,1] (une ou deux attaques/jour ; détresse grave ; inquiétude très fréquente ; évitement modéré des lieux ; évitement léger des sensations ; retentissement modéré au travail, léger en société) | 14 | Trouble panique probable |
| T6 | [1,1,1,0,0,0,0] (attaques subcliniques rares, peu de retentissement) | 3 | En dessous du seuil de dépistage |

### 4. Cas spécifiques à l'échelle

| # | Cas | Attendu |
| :---- | :---- | :---- |
| T7 | Ordre d'affichage des réponses | Pour chacun des 7 items, les options sont déclarées dans l'ordre 0, 1, 2, 3, 4 (ordre du PDF). |
| T8 | Un seul item au maximum (item 3) : [0,0,4,0,0,0,0] | Score 4, « En dessous du seuil de dépistage » |

### 5. Entrées invalides

*Comportement actuel commun à toutes les échelles (précédent FTND, arbitrage du 24/09/2026) : pas de validation spécifique PDSS.* Le parcours patient n'avance qu'après une réponse à chaque item et ne propose que les options de §5 : les cas ci-dessous ne sont pas atteignables par l'interface. Côté serveur, les scorers ne valident pas encore les entrées (une valeur manquante compte pour 0) — chantier transverse.

| # | Cas | Comportement actuel |
| :---- | :---- | :---- |
| T9 | Valeur hors borne (ex. 5) | Impossible via l'UI (options fermées). |
| T10 | Valeur négative | Impossible via l'UI. |
| T11 | Réponse manquante | Impossible via l'UI (réponse requise pour avancer). |
| T12 | Valeur non numérique | Impossible via l'UI. |
| T13 | Moins de 7 réponses | Impossible via l'UI. |
| T14 | Plus de 7 réponses | Impossible via l'UI. |

Les cas T1 à T8 sont automatisés dans `apps/api/src/scoring/scorers/pdss.spec.ts` (`cd apps/api && npx jest pdss`).

---

## 10. Choix et arbitrages méthodologiques

### Écarts à la source primaire

| Élément | Source primaire | Texte retenu | Origine du texte retenu | Justification |
| --- | --- | --- | --- | --- |
| Consigne | « en cochant la case qui correspond le mieux à votre situation » | « en choisissant la réponse qui correspond le mieux à votre situation » | Adaptation Melya | Adaptation du support : on répond en touchant un bouton, pas en cochant une case (même choix que pour la PDEQ). |
| Consigne, liste des symptômes | 13 symptômes précédés de cases à cocher, sur deux colonnes | Liste à puces, un symptôme par ligne, dans l'ordre de lecture du formulaire (colonne de gauche puis de droite) | Adaptation Melya | Adaptation du support : ces cases ne sont pas cotées, elles servent de repère. Les libellés sont repris mot pour mot. |
| Consigne et item 1 | Passages en gras (définitions de l'attaque de panique et des attaques subcliniques, début de l'item 1) | Texte sans gras | Adaptation Melya | Adaptation du support : l'écran n'affiche pas de mise en forme. |
| Réponses | Chaque réponse précédée de sa cotation (« 0 », « 1 »…) | Réponse sans sa cotation | Adaptation Melya | Adaptation du support : la cotation est portée par le bouton, comme pour toutes les échelles du catalogue. |
| Item 6, réponse 1 | « à mon travail ou à mes responsabilités la maison » | « à mon travail ou à mes responsabilités à la maison » | Correction | Coquille : préposition manquante. L'expression est complète dans les quatre autres réponses de l'item. Pas de source secondaire publiée pour reprendre le passage. |

Conservé tel quel, par fidélité à la source : la typographie québécoise (pas d'espace avant « ? » et « ; »), le masculin générique (« inquiété », « seul », « adonné »), et « au cours de la semaine » à l'item 1, là où les autres items disent « au cours de la dernière semaine ».

### Autres arbitrages

| Sujet | Choix retenu | Justification |
| --- | --- | --- |
| Version de l'échelle | Version auto-questionnaire (PDSS-SR) | La PDSS d'origine est un entretien coté par le clinicien ; seule la version auto-questionnaire convient à une passation en ligne par le patient. |
| Version française | Formulaire du ministère de la Santé et des Services sociaux du Québec (2019), source unique | Aucune version de France n'existe. Le formulaire du ministère est l'outil officiel du programme québécois pour les troubles mentaux ; la seule autre version française (Roberge et al., 2022) n'est pas publiée. Elle a été demandée pour vérification. |
| Seuil | ≥ 9 | Validation de la version française (Roberge et al., 2022, article complet) : seuil optimal de diagnostic probable, sensibilité 78,8 %, spécificité 70,4 %. Le résumé de congrès antérieur de la même équipe indiquait 10 ; l'article complet le remplace. Les bandes de sévérité publiées pour la version clinicien (Furukawa et al., 2009) ne sont pas transposées. |
| Libellés des bandes | « Trouble panique probable » (9 à 28) / « En dessous du seuil de dépistage » (0 à 8) | Bande haute : traduction du terme de la source (« probable diagnosis »). Bande basse : formulation Melya, aucune source ne libellant cette bande. Il s'agit d'un seuil de dépistage, pas d'une gradation de sévérité. |
| Réponses manquantes | Passation incomplète refusée, pas d'imputation | Règle commune à toutes les échelles, conforme au formulaire source (« lorsqu'une réponse ou plus sont manquantes, le score du questionnaire ne peut pas être utilisé »). |
| Droits | Mise en ligne sous réserve | La Dre Shear autorise l'usage par les cliniciens dans leur pratique ; l'usage au sein d'un service payant reste à lui demander (§3). |
| Taille des questions | Taille de texte réduite pour toute l'échelle | Les questions vont jusqu'à 814 caractères, quatre fois plus que le reste du catalogue ; la taille habituelle obligeait à faire défiler chaque question. |

### Questions ouvertes

1. Libellé de la bande basse : garder « En dessous du seuil de dépistage » (recommandé : dit exactement ce que mesure le seuil), ou suivre le précédent de la PDEQ, où la bande basse est la négation du terme de la source (« Trouble panique non probable ») ?
2. Si la version validée de Roberge et al. diffère du formulaire du ministère : basculer sur la version validée (recommandé), ou garder le formulaire du ministère ?

---

## 11. Contrat technique pour Adrien

*Implémenté le 29/09/2026 : réutilisation des briques existantes (patron FTND), plus deux évolutions d'affichage — consigne en liste à puces (§4) et taille de question réduite pour les questions longues.*

### Fichiers

- Données : `packages/core/src/scales/index.ts`, entrée `id: "pdss"` (`formType: "options"`, `domain: "anxiete"`, catégorie « Trouble panique »).
- Scorer : `apps/api/src/scoring/scorers/pdss.ts` (`scorePdss`, somme + lookup des `ranges`), inscrit dans `scoring.service.ts` sous la clé `pdss`.
- Tests : `apps/api/src/scoring/scorers/pdss.spec.ts` (cas §9 T1–T8).
- UI : `apps/web/components/scale/ScaleInstructions.tsx` (paragraphes, retours à la ligne, puces en `- `), branché dans `IntroScreen.tsx`, `ScalePreview.tsx` et `ConsigneBlock.tsx`.

### Signature de la fonction de scoring

```
scorePdss(scale: Scale, responses: Record<string, unknown>) → ScoreResult {
  totalScore: number,        // 0 à 28
  maxScore: 28,
  interpretation: "En dessous du seuil de dépistage" | "Trouble panique probable",
  severityIndex, severityRangeCount,
}
```

### Contrat d'erreur

Pas de validation spécifique (cf. §9.5) : comportement commun à toutes les échelles.

### Clés de réponse attendues

`option_0` à `option_6` (items 1 à 7 de §5), chacune dans {0, 1, 2, 3, 4}.

### Notes d'implémentation

- **Titre** : `acronym: "PDSS"`, `label: "Questionnaire d'appréciation des symptômes du trouble panique"`, `patientIntroSubtitle` non défini.
- **Pas d'intitulé court** : chaque item n'a qu'un `title` = la question verbatim, sans `prompt`.
- **Consigne** : `instructions` = texte de §4, paragraphes séparés par `\n\n`, symptômes en lignes `- …`, consignes numérotées séparées par `\n`. Pas de `persistentInstructions` (non utilisé en `options`).
- **`copyrightAttribution`** : texte de §3 « Mention obligatoire à afficher ».
- **`higherIsBetter: false`**.
- **Taille des questions** : items de 95 à 814 caractères → la passation bascule en taille de question réduite (`LONG_QUESTION_THRESHOLD` = 250 dans `SessionRunner.tsx`), sur toute l'échelle.

---

## 12. Historique des modifications

| Date | Auteur | Modification |
| :---- | :---- | :---- |
| 29/09/2026 | Adrien (avec Claude) | Création. Instruction des droits (© Shear, usage commercial non couvert → go sous réserve, flag ✉️). Choix de la PDSS-SR (auto-questionnaire). Source primaire : formulaire MSSS/PQPTM 2019 (seule VF complète accessible, aucune version de France). Seuil ≥ 9 (Roberge 2022), deux bandes. |
| 29/09/2026 | Adrien (avec Claude) | Cross-check : la thèse de Bordeaux 2017 ne reproduit pas les items → écartée. Source MSSS retenue seule (exception autorité institutionnelle) ; version Roberge 2022 demandée à Sherbrooke pour cross-check a posteriori. |
| 29/09/2026 | Adrien (avec Claude) | Implémentation E5 : données `packages/core`, scorer patron FTND, tests §9 automatisés (Jest, hors CI). Évolutions UI associées : composant `ScaleInstructions` (retours à la ligne et puces dans les consignes), taille de question réduite au-delà de 250 caractères, retour instantané en haut de page à chaque question. Recette à confirmer. |
| 29/09/2026 | Adrien (avec Claude) | Alignement sur le nouveau template (règles 5 à 7, §10 « Choix et arbitrages méthodologiques ») : écarts déplacés de §2 vers §10, arbitrages consignés, deux questions ouvertes (libellé de la bande basse, bascule éventuelle sur la version Roberge). Plus de validation clinique externe : questions tranchées par Clément. |

---

## 13. Échelles connexes à prioriser

Source : guide PQPTM du MSSS (2019), annexe 2, tableau des questionnaires de monitorage chez l'adulte.

- **PHQ-9**, **GAD-7** — déjà au catalogue. Recommandés par le PQPTM en complément de la PDSS pour tout trouble panique. Complément.
- **WSAS** (Work and Social Adjustment Scale, Mundt et al., 2002) — 5 items, retentissement fonctionnel. Recommandé par le PQPTM pour tous les troubles mentaux fréquents. Complément, à instruire.
- **MIA** (Mobility Inventory for Agoraphobia, Chambless et al., 1985) — ajouté par le PQPTM quand le trouble panique s'accompagne d'agoraphobie. Complément, à instruire.
