# Maintenance de suppression des données (PGSSI-S / RGPD)

## Contexte

Lorsqu'un patient ou praticien exerce son droit à l'effacement (RGPD Art. 17), les données sont supprimées via `DELETE` SQL dans une transaction. Cependant, PostgreSQL ne libère pas immédiatement l'espace disque : les lignes supprimées deviennent des "dead tuples" qui restent physiquement sur le disque jusqu'au prochain `VACUUM`.

## Pourquoi pas de VACUUM FULL par requête ?

`VACUUM FULL` requiert un verrou **ACCESS EXCLUSIVE** sur toute la table, ce qui bloque toutes les lectures et écritures pendant l'opération. L'exécuter à chaque suppression impacterait la disponibilité de l'application.

## Stratégie

### 1. Chiffrement (défense principale)

Les données sensibles (noms, réponses, scores, interprétations) sont chiffrées en AES-256-GCM au niveau applicatif. Même si des dead tuples persistent avant le VACUUM, ils ne contiennent que du texte chiffré, non récupérable sans la clé de chiffrement.

### 2. Autovacuum PostgreSQL (automatique)

PostgreSQL exécute automatiquement `VACUUM` (non-FULL) via autovacuum. Cela marque l'espace des dead tuples comme réutilisable pour de nouvelles données, mais ne le rend pas au système de fichiers.

### 3. VACUUM FULL périodique (maintenance planifiée)

Exécuter un `VACUUM FULL` hebdomadaire pendant une fenêtre de maintenance (faible trafic) :

```bash
# Exemple : dimanche 3h du matin
psql -U melya_migrations -d melya -c "VACUUM FULL sessions;"
psql -U melya_migrations -d melya -c "VACUUM FULL patients;"
psql -U melya_migrations -d melya -c "VACUUM FULL users;"
```

Ce script peut être ajouté comme cron job sur le serveur Dedibox.

## Résumé

| Mécanisme | Fréquence | Impact | Objectif |
|-----------|-----------|--------|----------|
| Chiffrement AES-256-GCM | Permanent | Aucun | Données illisibles sans clé |
| Autovacuum PostgreSQL | Automatique | Aucun | Réutilisation d'espace |
| VACUUM FULL | Hebdomadaire | Lock table temporaire | Libération d'espace disque |
