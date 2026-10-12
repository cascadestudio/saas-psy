# Repasse « regard neuf » — 12/10/2026 (mission n°3, étape 3)

Contrôle indépendant de **toutes les échelles implémentées** (36 au 12/10/2026, ✅ comprises), en deux couches, par des agents neufs sans le contexte de l'implémentation.

## Méthode

1. **Double saisie à l'aveugle** : 34 échelles (SPIN exclue, aucune source archivée). Six agents ont lu **uniquement les sources archivées**, sans fiche ni code. Ils ont extrait consigne, items, modalités, inversions, sous-échelles, seuils et mentions, au format JSON (`double-saisie/*.json`). Un script compare ensuite ces extractions à l'entrée `packages/core` et aux scorers : voir `double-saisie-comparaison.md`.
   - **Résultat** : aucun écart de texte, de modalité, d'inversion ou de bande **non consigné**. Chaque écart renvoie à un arbitrage écrit au §10 de la fiche (adaptations papier → écran, coquilles corrigées, choix de version, seuils pris dans une autre source que le formulaire).
2. **Relecture méthodologique critique** : quatre agents ont lu les fiches (§10 d'abord), les sources, l'entrée et le scorer.
   - Échelles 🔵 : `relecture-R1…R3`.
   - Échelles ✅, en contrôle léger : `relecture-R4`.
   - Bilan : **11 erreurs**, **56 points à revoir** et **49 suggestions** signalés.

## Corrections faites le 12/10/2026 (code + fiches, recette ciblée sur staging)

| Échelle | Correction | Origine |
| --- | --- | --- |
| **CAT-Q** | Seuil de 100 **supprimé** : les auteurs écrivent « there are no threshold or cutoff scores on the CAT-Q » (Hannon, Hull et al., 2026, archivé) ; bande unique « Pas de seuil… » | R2 (erreur) |
| **Y-BOCS** ✅ | Item 1, niveau 2 : « survenue très fréquente » → « survenue fréquente » (doublon du niveau 3) — **à revalider** | R4 (erreur) |
| **CST** | Bandes 11-19 / 20-30 / 31-45 / 46-66 (une seule convention) ; 1re modalité « Non pas du tout » (2 sources sur 3) ; 3e source archivée | R3 |
| **SCARED** | Item 26 repris de la version parent (« que je ne connais pas bien ») au lieu d'une correction Melya | R2 |
| **ASRS** | Citation d'attribution exigée par NYU affichée verbatim ; page de licence archivée | R1 |
| **PDI** | « Domaine public (INSPQ) » retiré de la mention (non étayé par les sources archivées) | R1 |
| **CAST** | « Recommandé par la HAS » retiré (la HAS diffuse l'ancienne version oui/non) | R1 |
| **BAT-W / BAT-G** | Coquille « Version version » ; « sans emploi » → « ne travaillant pas » | R3 (erreur) |
| **DERS** | Sous-titre patient repris de la source | R3 |
| **QPA (ATQ)** | Sigle « QPA » et suppression du sous-titre anglais (absents des sources) ; apostrophes harmonisées | R3 |
| **PSI-II, QAP, QEC** | Droits harmonisés en ✅ (même phrase de licence que le QCS-TAG sur la page du laboratoire Dugas) | R1 |

## Ce qui reste à Clément

Tous les autres constats, rangés par échelle et par type (relecture, arbitrage à valider, vigilance, droits, à revalider sur ✅), sont repris dans le **dossier de recette interactif** et au §13 des fiches.

Les points majeurs sur les échelles ✅ (**à revalider**) :
- **PSWQ** : bandes sans source, et rappel ajouté.
- **ÉII** : rappel ajouté ; rattachement de l'item 25.
- **QIA** : consigne et aide rédigées par Melya.
- **SPIN** : aucune source archivée, traduction Melya.
- **Y-BOCS** : « rituels » / « compulsions », et tranches non sourcées.
- **AUDIT** : un seuil unique 6-12 pour les deux sexes.
- **LSAS** : grille à 6 niveaux présentée comme « validée ».
- **PCL-5** : consigne fusionnée.

Règles communes issues de la repasse : `REDACTION_PLAYBOOK.md` §10 bis (matrice de cohérence).

## Recette ciblée des corrections (staging, 12/10/2026, Claude)

| Échelle | Jeu | Attendu | Obtenu |
| --- | --- | --- | --- |
| CST | total 19 | Niveau de stress très bas | conforme |
| CST | total 20 | Niveau de stress bas | conforme |
| CST | total 30 | Niveau de stress bas | conforme |
| CST | total 31 | Niveau de stress élevé | conforme |
| CAT-Q | total 100 | Pas de seuil clinique fourni par les auteurs. | conforme |

Affichage vérifié sur les pages résultat praticien : CST « 1 — Non pas du tout » et graduations 20 / 31 / 46 ; ASRS, citation NYU verbatim en tête de la mention ; PDI, mention sans « Domaine public ». DERS et QPA (ajoutées en mission 3) : 9 jeux sur 9 conformes, parcours patient complet, page résultat conforme ; Mentaal DERS identique.
