# Test spec — CRIES-13 (Échelle révisée pour mesurer l'impact des événements sur les enfants)

<!--
Voir _TEMPLATE.md. Fiche rédigée et implémentée par Claude (mission n°3, 11/10/2026).
Arbitrages et confiance en §10 ; reste à faire avant prod en §13.
-->

---

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | CRIES-13 (id `cries-13`) |
| **Nom complet (FR)** | Échelle révisée pour mesurer l'impact des événements sur les enfants (titre de la version française de la Children and War Foundation, accents rétablis) |
| **Nom complet (langue originale)** | Children's Revised Impact of Event Scale (CRIES-13) |
| **Thème principal** | Traumatismes (enfant) |
| **Nombre d'items** | 13 |
| **Durée** | 5-10 min (fiche Cn2r) |
| **Public cible** | Enfants à partir de 8 ans (fiche Cn2r) |
| **Mode d'administration** | auto (l'enfant répond ; tutoiement) |
| **Description praticien** | Questionnaire de 13 items mesurant l'impact d'un événement traumatique chez l'enfant à partir de 8 ans, au cours des sept derniers jours. |
| **Description patient** | AUCUNE — règle projet. |

---

## 2. Sources et traçabilité

### Source primaire

- Fiche Cn2r (Centre national de ressources et de résilience) : questionnaire + fiche descriptive (cotation, facteurs, seuil). https://cn2r.fr/wp-content/uploads/2025/04/CRIES_13_Cn2r.pdf — `CRIES-13_Cn2r.pdf` — 11/10/2026.

### Source secondaire

- Children and War Foundation, version française (« Echèlle Revisée Pour Mesurer l'Impact Des Evénements Sur les Enfants (13) », © Children and War Foundation, 1998) : https://www.childrenandwar.org/s/cries_13_French.pdf — `CRIES-13_ChildrenAndWar_FR.pdf` — 11/10/2026. Même traduction que le Cn2r, avec davantage de coquilles (« Ici-dessous », « vecu », « ā »).

### Journal de recherche (11/10/2026)

Recherche « CRIES-13 version française Cn2r » → PDF Cn2r ; fiche INSPQ « Symptômes de stress post-traumatique » (référence) ; page « Measures » de la Children and War Foundation lue (conditions d'usage, liste des langues, PDF français). Mentaal : `/send/cries-13` (13 items, n°69).

---

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | ✉️ — « These instruments are provided free of costs » (Children and War Foundation) ; la condition « do not charge for its use » vise les auteurs de nouvelles traductions ; usage commercial d'une plateforme non mentionné |
| **Détenteur** | © Children and War Foundation, 1998 (Smith, Perrin, Dyregrov & Yule) |
| **Mention obligatoire** | « CRIES-13 — Smith, Perrin, Dyregrov & Yule (2003) © Children and War Foundation, 1998. Traduction française non validée entièrement. Mise en page : Centre national de ressources et de résilience (Cn2r). » |
| **Décision Melya** | go (règle « seule une protection explicite bloque ») |
| **PDF source en téléchargement (SEO, transparence)** | 🔗 lien seul — renvoyer vers cn2r.fr et childrenandwar.org (la fondation diffuse elle-même ses versions). |

---

## 4. Structure de l'échelle

### Consigne

> _« Ci-dessous se trouvent des commentaires émis par des gens après avoir vécu des événements stressants. Veuillez répondre à chaque question en montrant la fréquence de ces réactions pendant ces sept derniers jours. »_ (Cn2r, verbatim)

Rappel persistant : « Pendant ces sept derniers jours : » (extrait de la consigne, précédents PDEQ et PDI).

### Titre côté patient

PDF Cn2r : « Children's Revised Impact of Event Scale (CRIES (13)) » → `patientIntroSubtitle` = « Children's Revised Impact of Event Scale » (§10).

### Réponses

`0` Pas du tout · `1` Rarement · `3` Quelques fois · `5` Souvent (valeurs de la source).

---

## 5. Items

| # | Item |
| --- | --- |
| 1 | Y penses-tu même quand tu ne le veux pas ? |
| 2 | Essaies-tu de chasser l'événement de ta mémoire ? |
| 3 | As-tu des difficultés à être attentif ou à te concentrer ? |
| 4 | Ressens-tu soudainement des vagues de sentiments intenses à ce sujet ? |
| 5 | T'effraies-tu plus souvent ou te sens-tu plus nerveux qu'avant l'incident ? |
| 6 | Essaies-tu de t'éloigner de ce qui peut te rappeler l'événement ? (p. ex. des endroits ou situations) |
| 7 | Essaies-tu de ne pas en parler ? |
| 8 | T'arrive-t-il d'avoir des images de l'événement à l'esprit ? |
| 9 | Est-ce qu'il y a d'autres choses qui t'y font penser ? |
| 10 | Essaies-tu de ne pas penser à l'événement ? |
| 11 | T'irrites-tu facilement ? |
| 12 | Es-tu alerte et vigilant même s'il n'y a apparemment pas lieu de l'être ? |
| 13 | As-tu des problèmes de sommeil ? |

---

## 6. Scoring

Somme des 13 items (0/1/3/5). **Plage : 0-65.** Sous-scores (fiche Cn2r) : intrusion 1, 4, 8, 9 (0-20) ; évitement 2, 6, 7, 10 (0-20) ; hyperréactivité 3, 5, 11, 12, 13 (0-25).

## 7. Seuils

| Score | Interprétation |
| --- | --- |
| 0–29 | Sous le seuil de dépistage du TSPT (score < 30) |
| 30–65 | Dépistage positif de TSPT (score ≥ 30) |

Source : fiche Cn2r, « Score total ≥ 30 permet le dépistage de TSPT ».

## 8. Alertes cliniques

Aucune.

---

## 9. Cas de test

*Vérifiés par le générateur (Python) puis `cries-13.spec.ts` (6/6), 11/10/2026.*

| # | Réponses | Total | Sous-scores (intr./évit./hyper.) |
| --- | --- | --- | --- |
| T1 | 13 × 0 | 0 | 0/0/0 |
| T2 | 5,5,5,5,5,3,1,0,0,0,0,0,0 | 29 (sous le seuil) | 10/9/10 |
| T3 | 5,5,5,5,5,3,1,1,0,0,0,0,0 | 30 (positif) | 11/9/10 |
| T4 | 13 × 5 | 65 | 20/20/25 |
| T5 | 5,1,0,5,0,1,1,5,5,1,0,0,0 | 24 | 20/4/0 |

---

## 10. Choix et arbitrages méthodologiques

### Écarts à la source primaire

| Élément | Source primaire (Cn2r) | Texte retenu | Origine | Justification | Confiance |
| --- | --- | --- | --- | --- | --- |
| Item 9 | « Est ce qu'il y a… » | « Est-ce qu'il y a… » | Orthographe | Type 2 : trait d'union obligatoire (absent aussi de la version CW) | haute |
| Ponctuation | « ? » collé ou espacé selon les versions | Espace avant « ? » partout | Typographie | Convention des autres échelles du catalogue | haute |
| Apostrophes | Courbes | Droites | Convention du code | — | haute |

« Quelques fois » (Cn2r) conservé ; la version CW écrit « Quelquefois ». Les deux sont correctes, la source primaire tranche.

### Autres arbitrages

| Sujet | Choix retenu | Justification | Confiance |
| --- | --- | --- | --- |
| Source | Cn2r (France) plutôt que CW | Même traduction, version Cn2r plus propre et accompagnée de la fiche descriptive | haute |
| Libellé catalogue | Titre français CW, accents rétablis | Le Cn2r ne donne que le titre anglais | moyenne |
| Sous-titre patient | « Children's Revised Impact of Event Scale » | Titre du PDF Cn2r (règle `patientIntroSubtitle`) ; alternative : `null` pour ne pas afficher d'anglais à un enfant | moyenne |
| Libellés des tranches | « Sous le seuil… » / « Dépistage positif… » | Formulation de la source (dépistage, seuil 30) | moyenne |
| Domaine | Trauma, « Traumatismes » | Comme PCL-5, PDEQ, PDI | haute |
| Public enfant | Rangée dans Trauma (règle validée) | Badge « Public » à venir (MEL-356) | haute |

### Recette

**Staging (11/10/2026, Claude)** — patient « Patient Test » : **conforme** (5 jeux sur 5). Le dernier jeu a été saisi par le parcours patient complet dans l'interface ; les autres ont été soumis par l'endpoint du portail patient (`POST /sessions/patient/:id/submit`, le même que l'interface), puis tous relus côté praticien (total, interprétation, sous-scores).

| Jeu | Réponses | Attendu | Obtenu |
| --- | --- | --- | --- |
| T1 min | 0,0,0,0,0,0,0,0,0,0,0,0,0 | 0 ; sous-scores 0 / 0 / 0 | 0, « Sous le seuil de dépistage du TSPT (score < 30) » ; sous-scores 0 / 0 / 0 |
| T2 juste sous le seuil | 5,5,5,5,5,3,1,0,0,0,0,0,0 | 29 ; sous-scores 10 / 9 / 10 | 29, « Sous le seuil de dépistage du TSPT (score < 30) » ; sous-scores 10 / 9 / 10 |
| T3 seuil | 5,5,5,5,5,3,1,1,0,0,0,0,0 | 30 ; sous-scores 11 / 9 / 10 | 30, « Dépistage positif de TSPT (score ≥ 30) » ; sous-scores 11 / 9 / 10 |
| T4 max | 5,5,5,5,5,5,5,5,5,5,5,5,5 | 65 ; sous-scores 20 / 20 / 25 | 65, « Dépistage positif de TSPT (score ≥ 30) » ; sous-scores 20 / 20 / 25 |
| T5 une valeur par sous-échelle (parcours patient) | 5,1,0,5,0,1,1,5,5,1,0,0,0 | 24 ; sous-scores 20 / 4 / 0 | 24, « Sous le seuil de dépistage du TSPT (score < 30) » ; sous-scores 20 / 4 / 0 |

Consigne et rappel « Pendant ces sept derniers jours : », libellés 0/1/3/5, graduation 30, mention « Seuil de la fiche descriptive Cn2r », 3 sous-scores (/20, /20, /25), 13 items et copyright Children and War / Cn2r : conformes.

**Mentaal** (même jeu T5) : total 24/65 identique. **Écarts Mentaal** : libellés « Pas du tout / Rarement / Parfois / Très souvent » (source Cn2r : « Quelques fois / Souvent ») ; sous-scores 11 / 7 / 6 contre 20 / 4 / 0 chez Melya. Melya applique le découpage de la fiche Cn2r archivée (intrusion 1, 4, 8, 9 ; évitement 2, 6, 7, 10 ; hyperréactivité 3, 5, 11, 12, 13) ; Mentaal ne fait pas autorité, et son découpage n'a pas pu être rattaché à une source.

---

## 11. Contrat technique

Entrée `cries-13` (`single-scale`, valeurs 0/1/3/5, `persistentInstructions`, `patientIntroSubtitle`, 2 bandes, `thresholdsSource`) ; scorer `cries-13.ts` (somme + 3 sous-scores) ; tests `cries-13.spec.ts`.

## 12. Historique

| Date | Auteur | Modification |
| --- | --- | --- |
| 11/10/2026 | Claude (mission n°3) | Création et implémentation (Cn2r + Children and War Foundation), tests 6/6. |

---

## 13. Reste à faire avant prod

- [ ] **Arbitrage à valider** : sous-titre patient en anglais (titre du PDF) ou `null`.
- [ ] **Vigilance** : traduction « non validée entièrement » (Cn2r) — à mentionner aux praticiens ?
- [ ] **Droits** : confirmer auprès de la Children and War Foundation que l'usage dans une plateforme payante est admis (la clause « do not charge for its use » vise les traducteurs) — MEL-351, non bloquant.
- [ ] **Vigilance UX** : passation par un enfant de 8 ans et plus (lisibilité, tutoiement) ; badge « Public » (MEL-356).
