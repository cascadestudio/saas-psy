# Test spec — ECAB (Échelle cognitive d'attachement aux benzodiazépines)

<!-- Fiche rédigée et implémentée par Claude (mission n°3, 11/10/2026). Arbitrages en §10, reste à faire en §13. -->

---

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | ECAB (id `ecab`) |
| **Nom complet (FR)** | Échelle cognitive d'attachement aux benzodiazépines |
| **Langue originale** | Instrument français (Pélissolo & Naja, 1996) |
| **Thème** | Addictions (benzodiazépines et apparentés) |
| **Items** | 10, vrai/faux, item 10 inversé |
| **Durée** | 2 min (estimation Melya) |
| **Public** | Adultes consommateurs de BZD (validation : 52 patients psychiatriques ; fiche HAS ciblant le patient âgé) |
| **Mode** | auto |
| **Description praticien** | Questionnaire de 10 items vrai/faux évaluant l'attachement du patient à son traitement par benzodiazépine ou médicament apparenté. |

---

## 2. Sources et traçabilité

- **Source primaire** : fiche « Échelle ECAB » de la recommandation HAS « Modalités d'arrêt des benzodiazépines et médicaments apparentés chez le patient âgé » (octobre 2007, « validé par le Collège de la Haute Autorité de Santé », © HAS 2007), diffusée par l'OMéDIT Grand Est (ARS) : https://www.omedit-grand-est.ars.sante.fr/media/16968/download — `ECAB_HAS-2007_via-OMEDIT-Grand-Est.pdf` — 11/10/2026.
- **Source secondaire** : argumentaire HAS 2007, §2.4 (validation, seuil, référence 26) : https://has-sante.fr/upload/docs/application/pdf/arret_des_bzd_-_argumentaire.pdf — `HAS_2007_arret-BZD_argumentaire.pdf`.
- **Publication originale** : Pélissolo A, Naja WJ. Évaluation de la dépendance aux BZD à l'aide d'une échelle cognitive. *Synapse* 1996;131:37-40 (non consultée).
- **Journal de recherche** : recherche « ECAB échelle cognitive d'attachement aux benzodiazépines » → fiche OMéDIT/HAS, page HAS « Benzodiazépines : programmer l'arrêt » (2015), argumentaire HAS 2007. Absent de Mentaal.

---

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | ✉️ — fiche publique de la HAS (© HAS 2007), instrument de recherche français sans phrase de licence |
| **Mention obligatoire** | « ECAB — Pélissolo & Naja (1996), Synapse, 131, 37-40. Fiche « Modalités d'arrêt des benzodiazépines et médicaments apparentés chez le patient âgé », © Haute Autorité de santé – 2007. » |
| **Décision Melya** | go |
| **PDF source en téléchargement (SEO, transparence)** | 🔗 lien seul — renvoyer vers la HAS / l'OMéDIT. |

---

## 4. Structure

### Consigne (adaptée, §10)

> _« Les questions ci-dessous concernent certaines idées que vous pouvez avoir sur les médicaments tranquillisants et/ou somnifères que vous prenez. Si une proposition correspond à ce que vous pensez, choisissez « vrai » ; choisissez « faux » dans le cas contraire. Il est indispensable de répondre à toutes les propositions avec une seule réponse « vrai » ou « faux », même si vous n'êtes pas très sûr(e) de votre réponse. »_

Rappel persistant : 1re phrase de la consigne, mot pour mot. Sous-titre patient : « Échelle cognitive d'attachement aux benzodiazépines » (titre du PDF). Réponses : `1` Vrai · `0` Faux (ordre de la source).

---

## 5. Items

| # | Item | Point pour |
| --- | --- | --- |
| 1 | Où que j'aille, j'ai besoin d'avoir ce médicament avec moi | Vrai |
| 2 | Ce médicament est pour moi comme une drogue | Vrai |
| 3 | Je pense souvent que je ne pourrai jamais arrêter ce médicament | Vrai |
| 4 | J'évite de dire à mes proches que je prends ce médicament | Vrai |
| 5 | J'ai l'impression de prendre beaucoup trop de ce médicament | Vrai |
| 6 | J'ai parfois peur à l'idée de manquer de ce médicament | Vrai |
| 7 | Lorsque j'arrête ce médicament, je me sens très malade | Vrai |
| 8 | Je prends ce médicament parce que je ne peux plus m'en passer | Vrai |
| 9 | Je prends ce médicament parce que je vais mal quand j'arrête | Vrai |
| 10 | Je ne prends ce médicament que lorsque j'en ressens le besoin | **Faux** |

---

## 6-7. Scoring et seuil

Somme 0-10 (item 10 inversé). **≥ 6 : en faveur d'une dépendance** (« Un score ≥ 6 permet de différencier les patients dépendants des patients non dépendants avec une sensibilité de 94 % et une spécificité de 81 % »). Bandes : 0-5 « Sous le seuil de dépendance (score < 6) » ; 6-10 « Score en faveur d'une dépendance aux benzodiazépines (score ≥ 6) ».

## 8. Alertes

Aucune.

---

## 9. Cas de test (`ecab.spec.ts`, 6/6, vérifiés en Python)

| # | Réponses (1 = vrai) | Score |
| --- | --- | --- |
| T1 | tout faux sauf item 10 vrai | 0 |
| T2 | tout faux | 1 (item 10) |
| T3 | 1,1,1,1,1,0,0,0,0,1 | 5 |
| T4 | 1,1,1,1,1,0,0,0,0,0 | 6 (seuil) |
| T5 | tout vrai sauf item 10 faux | 10 |

---

## 10. Choix et arbitrages méthodologiques

| Élément / sujet | Choix | Justification | Confiance |
| --- | --- | --- | --- |
| Consigne, « cochez la case « vrai » / « faux » » | « choisissez « vrai » / « faux » » | Type 1, support papier → écran (précédents PDEQ, PDI, QCS-TAG) | moyenne |
| Champ « Nom du médicament concerné : … » | Non repris | Champ libre hors cotation ; pas de réponse libre dans le composant (mécanisme nouveau). Les items disent « ce médicament » : le praticien précise le médicament de vive voix | moyenne |
| Items sans point final | Conservés ainsi | Verbatim (points de conduite de la mise en page supprimés) | haute |
| Libellés des bandes | « Sous le seuil… » / « Score en faveur d'une dépendance… » | Formulation de la source (différencier dépendants / non dépendants) | moyenne |
| Public | Adultes (pas seulement âgés) | Validation en psychiatrie générale ; la fiche HAS 2007 vise le patient âgé, la page HAS 2015 l'étend | moyenne |
| Domaine | Addictions | Dépendance médicamenteuse | haute |

### Recette

**Staging (11/10/2026, Claude)** — patient « Patient Test » : **conforme** (5 jeux sur 5). Le dernier jeu a été saisi par le parcours patient complet dans l'interface ; les autres ont été soumis par l'endpoint du portail patient (`POST /sessions/patient/:id/submit`, le même que l'interface), puis tous relus côté praticien (total, interprétation, sous-scores).

| Jeu | Réponses | Attendu | Obtenu |
| --- | --- | --- | --- |
| T1 min (tout faux sauf item 10 vrai) | 0,0,0,0,0,0,0,0,0,1 | 0 | 0, « Sous le seuil de dépendance (score < 6) » |
| T2 tout faux | 0,0,0,0,0,0,0,0,0,0 | 1 | 1, « Sous le seuil de dépendance (score < 6) » |
| T3 juste sous le seuil | 1,1,1,1,1,0,0,0,0,1 | 5 | 5, « Sous le seuil de dépendance (score < 6) » |
| T4 seuil | 1,1,1,1,1,0,0,0,0,0 | 6 | 6, « Score en faveur d'une dépendance aux benzodiazépines (score ≥ 6) » |
| T5 max (tout vrai sauf item 10 faux) (parcours patient) | 1,1,1,1,1,1,1,1,1,0 | 10 | 10, « Score en faveur d'une dépendance aux benzodiazépines (score ≥ 6) » |

Consigne en 3 paragraphes, Vrai/Faux, graduation 6, mention « Seuil de la fiche HAS (2007) », 10 items, item 10 inversé (T1 et T5) et copyright HAS : conformes.

**Mentaal** : ECAB absente de leur catalogue.

---

## 11. Contrat technique

Entrée `ecab` (`single-scale`, Vrai 1 / Faux 0, `reverseItems: [10]`), scorer `ecab.ts` (somme avec inversion de l'item 10), tests `ecab.spec.ts`.

## 12. Historique

| Date | Auteur | Modification |
| --- | --- | --- |
| 11/10/2026 | Claude (mission n°3) | Création et implémentation (fiche HAS 2007), tests 6/6. |

---

## 13. Reste à faire avant prod

- [ ] **Arbitrage à valider** : champ « Nom du médicament concerné » non repris.
- [ ] **Relecture** : consigne adaptée (« choisissez » au lieu de « cochez la case »).
- [ ] **Action documentaire (optionnelle)** : article Pélissolo & Naja 1996 (Synapse) pour recouper les items.
