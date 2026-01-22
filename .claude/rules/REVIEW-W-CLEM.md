## Meeting Overview

- Objet : Ajouter un bouton CTA "Envoyer une échelle" + corrections UX liées à l'envoi d'échelles, gestion patients, interface questionnaire et export PDF. Contexte : discussion technique et produit pour stabiliser le parcours d'envoi et améliorer l'ergonomie avant finition design.
- Participants : Clément
- Date & durée : 2026-01-22, \~13 minutes (11:32:25–11:45:50)
- Hashtags : #EnvoyerUneÉchelle #BugsPatients #UX_questionnaire

---

## Key Discussion Points

- Ajouter un bouton "Envoyer une échelle" accessible depuis le dashboard pour lancer l'envoi direct sur un patient. 
- Parcours attendu : cliquer sur le bouton → choisir patient → dérouler étapes d'envoi (flux direct si patient existant). 
- Bug détecté : création de patient en double / problème de persistence de branche qui a supprimé le flux précédent. 01:23–01:42, 
- Besoin d’un état initial/étape préalable quand il n’y a aucun patient (on doit guider l'utilisateur). 02:18–02:49
- Gestion des échelles multiples et du rendu des statuts (complété / en cours) dans les résultats ; résultats doivent refléter automatiquement les statuts. 05:56–06:54
- Refondre l'interface du questionnaire pour la rendre plus moderne/mobil-first (une question par écran évoquée). 06:08–06:23
- Export PDF ne fonctionne / à corriger. 07:22–07:37
- Archiver un patient : bouton mal placé et risque d'abus ; proposer bouton de modification (modal / slide-in) avec option d'archivage et limites d'archivage à discuter. 07:46–09:08
- Prioriser la solidité de l'app et les features de base avant de finaliser le design et les assets (logos, captures d'écran). 11:02–11:33

---

## Decisions Made

- Créer un CTA "Envoyer une échelle" sur le dashboard avec flux direct d'envoi vers un patient.
- Implémenter une étape initiale pour les comptes sans patients afin de guider l'utilisateur.
- Corriger le bug de création/duplication de patient avant déploiement du nouveau flux.
- Refondre l'UI du questionnaire (mobile-first, une question par écran envisagée).
- Réparer l'export PDF.
- Ajouter un bouton "Modifier" ouvrant un modal/slide pour modifier infos patient et archiver (archivage repositionné, règles à définir).
- Prioriser stabilité et features core avant travail graphique final et captures d'écran marketing.

---

## Action Items

| Task | Owner | Due / Timeline |
| --- | --- | --- |
| Ajouter le bouton CTA "Envoyer une échelle" sur le dashboard et définir le flux d'envoi direct | Clément |  |
| Implémenter l'écran/étape préalable pour comptes sans patient | Clément |  |
| Corriger le bug de création de patient en double / problème de persistence de branche | Clément |  |
| Ajouter modal/slide "Modifier patient" avec option d'archivage et revoir emplacement du bouton d'archivage | Clément |  |
| Refondre l'interface questionnaire (mobile-first, question par écran) | Clément |  |
| Réparer l'export PDF et vérifier génération/export | Clément |  |
| Définir règles de gestion d'archivage (limites, comportement) | Clément |  |
| Prioriser et stabiliser les features core puis préparer captures d'écran / assets | Clément |  |

---

## Key Sections

### Bouton "Envoyer une échelle" — 

Discussion sur l'ajout du CTA sur le dashboard et le flux attendu (choix patient → envoi direct).

### Flux initial et cas sans patient — 

Besoin d'une étape préalable si aucun patient n'existe pour guider l'utilisateur.

### Bug création patient / branches —  & 

Problème identifié de version/branche ayant supprimé le flux ; duplication / incohérences des patients.

### Échelles multiples & statuts — 

Cas d'envoi de plusieurs questionnaires, affichage automatique des statuts et impact sur résultats.

### UI Questionnaire — 

Refonte souhaitée pour ressembler à une app mobile moderne (1 réponse par écran).

### Export PDF — 

Export PDF actuellement défaillant; à corriger.

### Gestion patients : modification & archivage — 

Repositionner l'archivage, ajouter bouton modifier ouvrant un modal, définir limites d'archivage.

### Priorisation produit & assets — 

Accorder priorité à la stabilité et aux features de base avant d'investir dans le design final et captures.

---

## Additional Context

- Plusieurs éléments évoquent de l'historique lié aux branches Git / versions qui a pu provoquer la perte de certains flux — vérifier log/merges.
- Pensée produit : éviter d'ajouter trop de complexité design tant que la base n'est pas stable.