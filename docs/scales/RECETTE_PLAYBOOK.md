# Playbook recette d'une échelle (Claude)

Quand l'utilisateur upload un PDF d'échelle (ex : RSES, LSAS), suis ces étapes
pour porter le contenu dans le code et la passation patient. Ce doc complète
`_TEMPLATE.md` (spec) — il décrit le **workflow d'implémentation**, pas le format
de spec.

## 1. Source de vérité

- **Spec clinique** : `docs/scales/{scale-id}.md` (déjà en place pour RSES, LSAS, …).
  À mettre à jour si le PDF apporte du nouveau (consignes, items, seuils).
- **Données runtime** : `packages/core/src/scales/index.ts` — un objet `Scale`
  par échelle. C'est ce que l'API et la passation lisent.

Toujours faire le diff PDF ↔ `index.ts` avant de toucher au code. Ne rien
inventer ; demander à l'utilisateur si une formulation prête à interprétation
(différence FR-France / Suisse / Belgique, seuil non chiffré, items absents).

## 2. Champs à renseigner dans `Scale`

Voir `packages/core/src/scales/index.ts` (interface `Scale`). Points sensibles :

- `id`, `acronym`, `label`, `title`, `description`, `longDescription`
- `formType` : `"single-scale"` | `"options"` | `"dual-scale"` (cf. existants)
  - `single-scale` : items texte simple + une échelle de Likert commune (PHQ-9, GAD-7, PCL-5, RSES)
  - `options` : chaque item a son propre jeu de réponses (Y-BOCS)
  - `dual-scale` : chaque item répondu deux fois — anxiété + évitement (LSAS)
- `instructions` : consigne d'écran d'intro (paragraphes séparés par `\n\n`)
- `persistentInstructions` (optionnel) : consigne courte rappelée au-dessus de
  chaque item pendant la passation (PCL-5 par ex.)
- `sectionIntros` (optionnel) : sections internes. Format
  `{ startIndex, text, description? }`. Si `description` est rempli, un
  **écran de transition plein écran** s'affiche avant l'item `startIndex`
  (cf. Y-BOCS Compulsions).
- `scoring.ranges` : `[{ min, max, interpretation }]`. Les `interpretation`
  s'affichent sous le score et dans la liste des seuils.
- `higherIsBetter` : oriente la palette de couleurs sévérité.
- `copyrightAttribution` : obligatoire, affiché côté patient + praticien.
- `followUpItem` (optionnel) : item bonus non scoré (ex : item 9 PHQ-9).

## 3. UI passation — comportements automatiques

Une fois la donnée correcte, la passation hérite automatiquement de :

- **Progress bar + compteur "Question X/Y"** sur toutes les échelles
  (`SessionRunner.tsx` → `ProgressBar.tsx`). Pas d'option pour cacher.
- **Écran d'intro** (`IntroScreen.tsx`) : icône, label, instructions paragraphées,
  nombre d'items, durée estimée.
- **Écran de transition de section** (`SectionTransitionScreen.tsx`) : déclenché
  par toute `SectionIntro` avec `description` non vide et `startIndex > 0`.
- **Gauge résultat** (`ScoreArcGauge.tsx`) : ticks numériques aux seuils sur
  l'arc + liste `≥ X — interpretation` sous le score, automatique dès
  `ranges.length >= 2`.

⚠️ Ne **pas** ré-introduire d'option pour masquer la progress bar / les seuils.
Convention : c'est uniforme sur toutes les échelles.

## 4. API / DB

L'API lit les scales via `getScaleById()` dans `apps/api/src/sessions/sessions.service.ts`.
Si tu ajoutes un champ optionnel à l'interface `Scale`, vérifie qu'il est bien
relayé là-bas + dans le type côté `apps/web/app/session/[sessionId]/page.tsx`
(le `scale: { … }` interface).

## 5. Scoring

Si l'échelle a un scorer dédié (sous-scores, transformations), c'est dans
`apps/api/src/scoring/scorers/{scale}.ts`. Inscrire dans `ScoringModule`
si nouveau fichier. Sinon le scoring générique `sum + range lookup` suffit.

## 6. Recette manuelle (toujours faire)

1. Reload la page de session (la modif `packages/core` est hot-reloadée par le web ;
   redémarrer l'API si elle est lancée).
2. Parcourir TOUT le flow patient : intro → chaque item → transition(s) →
   review → soumission → résultats.
3. Vérifier orthographe / accord en genre (rituels → compulsions a déjà créé
   plusieurs accords à corriger : `interrompus` → `interrompues`, etc.).
4. Vérifier la gauge : seuils corrects, interprétations cohérentes,
   pas de chevauchement.
5. Si UI cassée, capture d'écran demandée à l'utilisateur — pas de devinette.

## 7. Demander avant d'agir

- Toute formulation absente du PDF mais nécessaire (ex : phrase d'intro courte
  pour le bandeau, écran de transition).
- Tout choix de seuil non explicite dans le PDF.
- Toute substitution lexicale (ex : "rituels" → "compulsions" sur Y-BOCS) :
  lister les occurrences et faire valider une à une.

## 8. À ne PAS faire

- Ne pas modifier `packages/core/src/scales/index.ts` sans avoir le PDF / spec
  ouverts à côté.
- Ne pas créer de fichier de doc parallèle (CHANGELOG, NOTES…) pour une recette
  d'échelle. Le fichier `docs/scales/{scale-id}.md` est la trace.
- Ne pas pousser de commit sans demande explicite.
