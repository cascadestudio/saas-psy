# Test spec — QCS-TAG (Questionnaire sur les comportements sécurisants du TAG)

<!--
Voir _TEMPLATE.md pour les règles projet.
Fiche rédigée et implémentée par Claude en autonomie (mission n°3, 11/10/2026).
Arbitrages et niveaux de confiance en §10 ; reste à faire avant prod en §13.
-->

---

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | QCS-TAG (id technique `qcs-tag` ; « GAD-SBQ » dans le benchmark Mentaal et dans `SUIVI_ECHELLES.md`) |
| **Nom complet (FR)** | Questionnaire sur les comportements sécurisants du trouble d'anxiété généralisée (page « Outils » du laboratoire ; le PDF ne porte que le sigle) |
| **Nom complet (langue originale)** | Generalized Anxiety Disorder-Safety Behaviors Questionnaire (GAD-SBQ) ; la version française abrégée a été validée en premier |
| **Thème principal** | Anxiété généralisée |
| **Sous-thèmes / tags** | comportements sécurisants, évitement, réassurance, TAG, modèle de Dugas |
| **Nombre d'items** | 10 (aucun inversé), chacun suivi d'un exemple |
| **Durée estimée de passation** | 3-5 min (estimation Melya, §10) |
| **Public cible** | Adultes |
| **Mode d'administration** | auto |
| **Description praticien (bibliothèque)** | Questionnaire de 10 items évaluant les comportements sécurisants associés au trouble d'anxiété généralisée au cours du dernier mois. |
| **Description patient (portail)** | AUCUNE — règle projet. |

---

## 2. Sources et traçabilité

### Source primaire

- **Type** : formulaire du Laboratoire des troubles d'anxiété (UQO, dir. M. J. Dugas), 2 pages, références en pied de page.
- **Page** : https://uqo.ca/anxiete/outils (lien « QCS-TAG » → https://uqo.ca/docs/33647)
- **URL du PDF** : https://uqo.ca/sites/default/files/3dc5e4e9a68efaee3a786490c4637ffa49b48700questionnaire-sur-les-comportements-securisants-du-trouble.pdf
- **Fichier de portage** : `docs/scales/qcs-tag/QCS-TAG_UQO.pdf` (version anglaise : `GAD-SBQ_UQO_EN.pdf`)
- **Date de consultation** : 11/10/2026
- **Phrase de la page « Outils »** : « Les questionnaires suivant sont disponibles en version PDF et peuvent être téléchargés et utilisés gratuitement. Les références et instructions de pointage sont inclus. » (le PDF du QCS-TAG ne contient pourtant pas d'instructions de pointage, §10).

### Exception de sourcing — autorité unique justifiée

Formulaire diffusé par le laboratoire des auteurs ; original francophone (la version française abrégée est la version validée). Même situation que QIA, ÉII, PSI-II, QAP, QEC.

### Publication de validation

- Marcotte-Beaumier, G., Hébert, E. A., & Dugas, M. J. (2020). Le Questionnaire sur les comportements sécurisants du trouble d'anxiété généralisée (QCS-TAG) : validation auprès d'un échantillon clinique. *Revue canadienne des sciences du comportement*, 52, 324-330. **Texte intégral non consulté** (APA, abonnement).

### Journal de recherche (11/10/2026)

- Recherche web « uqo.ca … comportements sécurisants TAG » → PDF UQO trouvé ; page « Outils » du laboratoire lue (Chrome).
- Lien `uqo.ca/docs/33647` (page de téléchargement) → même PDF. Version anglaise `uqo.ca/docs/33648` lue : pas d'instructions de cotation non plus.
- Mentaal `/send/gad-sbq` (10 items, « Score total /50 ») consulté pour comparaison (§10).

---

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | ✅ — « peuvent être téléchargés et utilisés gratuitement » (laboratoire des auteurs) ; usage commercial non mentionné |
| **Détenteur des droits** | Marcotte-Beaumier, Hébert & Dugas (2020) ; Hebert & Dugas (2019) |
| **Mention obligatoire à afficher** | « QCS-TAG — Marcotte-Beaumier, Hébert & Dugas (2020), Revue canadienne des sciences du comportement, 52, 324-330 ; version originale : Hebert & Dugas (2019), Cognitive and Behavioral Practice. Laboratoire des troubles d'anxiété (UQO). » |
| **Décision Melya** | go |
| **PDF source en téléchargement (SEO, transparence)** | 🔗 lien seul — « utilisés gratuitement » ne couvre pas explicitement la rediffusion ; renvoyer vers uqo.ca/anxiete/outils. |

---

## 4. Structure de l'échelle

### Consigne officielle

> _« Les énoncés suivants présentent des comportements sécurisants rapportés par des personnes ayant un trouble d'anxiété généralisée. Veuillez indiquer jusqu'à quel point chacun de ces comportements est typique de vous au cours du dernier mois en choisissant la réponse appropriée. Il n'y a pas de bonne ou mauvaise réponse. »_

Source : PDF p. 1 ; « en encerclant le chiffre approprié (1 à 5) » remplacé par « en choisissant la réponse appropriée » (§10).

### Comportement UX de la consigne

| Champ | Valeur |
| --- | --- |
| **Persistance** | `persistante` — « Veuillez indiquer jusqu'à quel point chacun de ces comportements est typique de vous au cours du dernier mois. » (2e phrase de la consigne, sans la fin papier) |
| **Justification** | Sur le papier, la consigne et l'en-tête de l'échelle restent visibles (précédents QAP, QEC) |

### Affichage du titre côté portail patient

PDF : `acronyme seul` (« QCS-TAG ») → `patientIntroSubtitle: null`.

### Dimensions de cotation

Likert 1-5 : `1` Pas du tout typique de moi · `2` Un peu typique de moi · `3` Modérément typique de moi · `4` Plutôt typique de moi · `5` Extrêmement typique de moi (en-tête de la page 1, §10).

---

## 5. Items

| # | Item (texte affiché, exemple compris) |
| --- | --- |
| 1 | J'évite fréquemment des situations dont l'issue pourrait être négative. Ex : Éviter d'aller manger dans un nouveau restaurant |
| 2 | À répétition, je refais ou change des choses à des tâches que j'ai déjà terminées. Ex : Reprendre un projet que j'ai déjà fini et y apporter des changements. |
| 3 | Je cherche beaucoup d'information afin de me sentir rassuré(e). Ex : Vérifier les rapports de circulation afin de savoir s'il y a eu un accident sur la route qu'emprunte mon conjoint(e). |
| 4 | J'évite de m'engager totalement dans un emploi, un projet ou une relation parce que je ne suis pas certain(e) de comment ça va se passer. Ex : Refuser de m'impliquer dans un projet ambitieux au travail. |
| 5 | Je cherche constamment de la rassurance à cause de mes inquiétudes. Ex : Demander à mon (ma) conjoint(e) de me rassurer à propos de mes inquiétudes face à notre relation. |
| 6 | Je vérifie constamment pour m'assurer que j'ai bien fait une tâche ou un projet correctement. Ex : Vérifier un courriel plusieurs fois pour m'assurer que j'y ai joint le bon document. |
| 7 | Je remets souvent une prise de décision ou un comportement à cause de mes inquiétudes. Ex : Retarder un appel téléphonique à cause de mes inquiétudes. |
| 8 | J'évite constamment des situations dans lesquelles je me sens incertain(e). Ex : Éviter des fêtes où des gens que je ne connais pas sont présents. |
| 9 | Je recherche souvent des gens en particulier, des objets ou des routines dans le but de me sentir plus « certain(e) ». Ex : Me rendre seulement à une fête si un(e) tel(le) ami(e) s'y rend avec moi. |
| 10 | Je prends beaucoup de temps et d'effort pour me préparer à des situations pour lesquelles un résultat négatif peut arriver. Ex : Avant un rendez-vous chez le médecin, passer des heures à faire des recherches sur internet à propos de symptômes. |

---

## 6. Algorithme de scoring

Somme des 10 items. **Plage : 10-50.** Pas d'inversion, pas de sous-score.

## 7. Seuils d'interprétation

Aucun seuil dans la source : bande unique 10-50 « Pas de seuil clinique fourni par les auteurs. » (précédents PSI-II, QAP, QEC).

## 8. Alertes cliniques

Aucune.

---

## 9. Cas de test unitaires

*Vérifiés en Python le 11/10/2026, rejoués par `apps/api/src/scoring/scorers/qcs-tag.spec.ts` (4/4).*

| # | Réponses (items 1 à 10) | Score |
| --- | --- | --- |
| T1 | 10 × 1 | 10 |
| T2 | 10 × 5 | 50 |
| T3 | 2,3,4,1,5,2,3,4,2,3 | 29 |

---

## 10. Choix et arbitrages méthodologiques

*Tranchés par Claude (11/10/2026), à relire par Clément. Confiance : haute / moyenne / basse.*

### Écarts à la source primaire

| Élément | Source primaire | Texte retenu | Origine | Justification | Confiance |
| --- | --- | --- | --- | --- | --- |
| Consigne | « en encerclant le chiffre approprié (1 à 5) » | « en choisissant la réponse appropriée » | Adaptation Melya (précédents PDEQ, PDI) | Type 1, support papier → écran | moyenne |
| Exemples | Sous chaque item, à la ligne | À la suite de l'item, après un espace | Adaptation du support | Le titre d'item ne gère pas les retours à la ligne (composant `SingleScaleQuestion`) ; texte inchangé | moyenne |
| Item 10 | « …un résultat négatif peut arriver » (sans point) | « …peut arriver. » | Typographie | Type 2 : point final comme aux 9 autres items, nécessaire avant « Ex : » | haute |
| Exemple de l'item 1 | Sans point final | Conservé sans point | Source primaire | Aucune nécessité de corriger | haute |
| Libellés de réponse | p. 1 : Un peu / Modérément / Plutôt ; p. 2 : Peu / Assez / Très | Ceux de la page 1 pour les 10 items | Source primaire | Incohérence interne du PDF ; la page 1 introduit l'échelle (Mentaal fait le même choix) | moyenne |
| Apostrophes | Courbes | Droites | Convention du code | — | haute |

« rassurance » (item 5), « comment ça va se passer » (item 4) : québécismes conservés (précédents ÉII, PSI-II).

### Autres arbitrages

| Sujet | Choix retenu | Justification | Confiance |
| --- | --- | --- | --- |
| Cotation | Somme 10-50 | Le PDF n'a pas d'instructions de pointage malgré la mention de la page « Outils » ; la somme est l'usage de la validation (score total) et de Mentaal | moyenne |
| Seuil | Aucun | Pas de seuil dans la source | moyenne |
| Domaine | Anxiété, « Anxiété généralisée » | Modèle de Dugas, comme QIA, ÉII, PSI-II, QAP, QEC | haute |
| Durée | « 3-5 minutes » | Non sourcée ; 10 items avec exemples | basse |

### Comparaison Mentaal

Mentaal (`/send/gad-sbq`) : 10 items, mêmes libellés de réponse (page 1) ; item 2 reformulé (« Je refais ou modifie à plusieurs reprises des tâches que j'ai déjà terminées. ») ; « Score total /50 ». Passation de comparaison : §10, « Recette ».

### Recette

À compléter après déploiement sur staging.

---

## 11. Contrat technique

- Entrée `qcs-tag` dans `packages/core/src/scales/index.ts` : `single-scale`, clés `intensity_0` … `intensity_9`, 1-5, `persistentInstructions`, `patientIntroSubtitle: null`, bande unique 10-50.
- Scorer `apps/api/src/scoring/scorers/qcs-tag.ts` (somme), enregistré sous `qcs-tag`. Tests `qcs-tag.spec.ts`.

---

## 12. Historique des modifications

| Date | Auteur | Modification |
| --- | --- | --- |
| 11/10/2026 | Claude (mission n°3) | Création et implémentation : formulaire UQO, 10 items avec exemples, somme 10-50 sans seuil. Tests 4/4. |

---

## 13. Reste à faire avant prod

- [ ] **Arbitrage à valider** : libellés de réponse de la page 1 (le PDF change de libellés page 2).
- [ ] **Arbitrage à valider** : cotation en somme sans instruction écrite de la source (article de validation non consulté).
- [ ] **Relecture** : affichage des exemples à la suite de l'item (lisibilité sur mobile).
- [ ] **Action documentaire (optionnelle)** : article Marcotte-Beaumier et al. 2020 (Revue canadienne des sciences du comportement) pour confirmer la cotation et l'absence de seuil.
- [ ] **Droits** : contact groupé laboratoire Dugas (MEL-351, bloc ✉️), non bloquant.
