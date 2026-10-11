# Test spec — HONC (Hooked on Nicotine Checklist)

<!-- Fiche rédigée et implémentée par Claude (mission n°3, 11/10/2026). Arbitrages en §10, reste à faire en §13. -->

---

## 1. Métadonnées produit

| Champ | Valeur |
| --- | --- |
| **Nom court** | HONC (id `honc`) |
| **Nom complet (FR)** | Test HONC de mise en évidence de la dépendance tabagique (titre de la source) |
| **Langue originale** | Hooked on Nicotine Checklist (DiFranza et al., 2002) |
| **Thème** | Addictions (tabac) |
| **Items** | 10, oui/non |
| **Durée** | 2 min (estimation Melya) |
| **Public** | Jeunes fumeurs selon la source (validé chez l'adolescent puis l'adulte) |
| **Mode** | auto |
| **Description praticien** | Test de 10 questions oui/non repérant la perte d'autonomie vis-à-vis du tabac, notamment chez les jeunes fumeurs. |

---

## 2. Sources et traçabilité

- **Source primaire** : La Revue du Praticien, encadré « Test HONC de mise en évidence de la dépendance tabagique » (extrait de « Tabac et adolescents »), page web : https://www.larevuedupraticien.fr/outil/test-honc-de-mise-en-evidence-de-la-dependance-tabagique — texte archivé `HONC_LaRevueDuPraticien_2026-10-11.txt` — 11/10/2026.
- **Source secondaire** : Le Quotidien du médecin, « Test de HONC » (même traduction, relevé par la recherche, non archivé).
- **Original** : DiFranza JR, Savageau JA, Fletcher K, et al. Measuring the loss of autonomy over nicotine use in adolescents: the DANDY study. *Arch Pediatr Adolesc Med* 2002;156(4):397-403.
- **Qualité de la source** : revue médicale professionnelle française ; traduction non attribuée ni validée formellement (§10).
- **Journal de recherche** : recherche « test HONC version française » → La Revue du Praticien, Le Quotidien du médecin ; versions anglaises (NCI, Stanford) pour comparaison. Absent de Mentaal.

---

## 3. Statut copyright et licence

| Champ | Valeur |
| --- | --- |
| **Statut** | ❓ — aucune phrase de licence trouvée (règle pragmatique : implémentable) |
| **Mention obligatoire** | « HONC (Hooked on Nicotine Checklist) — d'après DiFranza JR, Savageau JA, Fletcher K, et al., Arch Pediatr Adolesc Med 2002;156(4):397-403. Version française : La Revue du Praticien (« Tabac et adolescents »). » |
| **Décision Melya** | go |
| **PDF source en téléchargement (SEO, transparence)** | 🔗 lien seul — renvoyer vers la page de La Revue du Praticien. |

---

## 4. Structure

- **Consigne** : aucune dans la source → `instructions` absent (précédent ADRS). Pas de rappel persistant.
- **Titre patient** : fallback sur le libellé (titre de l'encadré).
- **Réponses** : `1` Oui · `0` Non (ordre de la source).

## 5. Items

| # | Item |
| --- | --- |
| 1 | Avez-vous déjà essayé d'arrêter de fumer sans y parvenir ? |
| 2 | Fumez-vous actuellement parce que c'est vraiment difficile d'arrêter ? |
| 3 | Pensez-vous être dépendant(e) du tabac ? |
| 4 | Avez-vous déjà eu des envies impérieuses de fumer ? |
| 5 | Avez-vous déjà eu un grand besoin d'une cigarette ? |
| 6 | Est-ce difficile de ne pas fumer aux endroits où c'est interdit, comme à l'école ? |
| 7 | Quand vous essayez d'arrêter ou quand vous n'avez pas fumé depuis un certain temps : Était-il difficile de vous concentrer ? |
| 8 | Avez-vous été plus irritable parce que vous ne pouviez pas fumer ? |
| 9 | Avez-vous senti un besoin urgent, une envie impérieuse de fumer ? |
| 10 | Vous êtes-vous senti(e) nerveux(se), incapable de rester tranquille ou angoissé(e) parce que vous ne pouviez pas fumer ? |

## 6-7. Scoring et seuils

1 point par « oui », somme 0-10. Bandes : 0 « Pas de perte d'autonomie mise en évidence (aucune réponse positive) » ; 1-6 « Perte d'autonomie liée à la consommation de tabac » ; 7-10 « Forte dépendance à la nicotine (score ≥ 7) ». Source : « Une réponse positive à un seul item suffit à indiquer une perte d'autonomie… Un score supérieur ou égal à 7 indique un niveau de forte dépendance à la nicotine. »

## 8. Alertes

Aucune.

## 9. Cas de test (`honc.spec.ts`, 6/6, vérifiés en Python)

0 → aucune ; 1 (item 10) → perte d'autonomie ; 6 → perte d'autonomie ; 7 → forte dépendance ; 10 → forte dépendance.

---

## 10. Choix et arbitrages méthodologiques

| Sujet | Choix | Justification | Confiance |
| --- | --- | --- | --- |
| Source | La Revue du Praticien | Seule version française publiée trouvée ; revue professionnelle | moyenne |
| Items 7 à 10 | Item 7 garde l'amorce « Quand vous essayez d'arrêter… : » ; items 8-10 sans amorce | Verbatim de la source. Dans l'original, l'amorce vaut pour les items 7 à 10 ; un écran par item la fait disparaître pour 8-10 (les items restent compréhensibles) | moyenne |
| Bande « 0 » | « Pas de perte d'autonomie mise en évidence » | Négation de la règle de la source | moyenne |
| Consigne | Aucune | Absente de la source (règle « aucun ajout ») | haute |
| Domaine | Addictions | — | haute |

### Recette

À compléter après déploiement sur staging.

## 11. Contrat technique

Entrée `honc` (`single-scale`, Oui 1 / Non 0, sans consigne), scorer `honc.ts` (somme), tests `honc.spec.ts`.

## 12. Historique

| Date | Auteur | Modification |
| --- | --- | --- |
| 11/10/2026 | Claude (mission n°3) | Création et implémentation (La Revue du Praticien), tests 6/6. |

---

## 13. Reste à faire avant prod

- [ ] **Arbitrage à valider** : amorce des items 7-10 laissée sur le seul item 7 (verbatim), ou affichée comme intro de section (fonction `sectionIntros` existante).
- [ ] **Vigilance** : traduction sans auteur identifié (revue professionnelle) — à confronter si une version française validée existe (pas trouvée en ligne).
- [ ] **Vigilance UX** : absence de consigne (bloc « Consigne » vide côté praticien, MEL-356).
