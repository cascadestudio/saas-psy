# Contrat HDS Scaleway - Cascade

> Référence : 022026-f7074b60-7b4c-4d38-b234-5b2c9e112ebe
> Version : 3.1 (Février 2026)

## Parties

| Partie    | Entité        | Représentant     | Rôle                   |
| --------- | ------------- | ---------------- | ---------------------- |
| Client    | CASCADE (GIE) | Clément Lapasset | Contrôleur des comptes |
| Hébergeur | Scaleway SAS  | Damien Lucas     | Directeur Général      |

**Adresse CASCADE** : 8 Rue Armand Carrel, 13004 Marseille
**RCS** : 991 777 087 (Marseille)

**Contact référent** : Adrien Lapasset - adrien@cascadestudio.fr - 06 89 56 67 89

---

## Service commandé

| Service | Référence | Quantité | Localisation                                     |
| ------- | --------- | -------- | ------------------------------------------------ |
| Dedibox | Start-9-M | 1        | DC2/DC3 Vitry-sur-Seine, DC5 Saint-Ouen l'Aumône |

### Services éligibles HDS

- **Bare Metal** : Dedibox (Start, Pro, Core, Store, GPU), Elastic Metal
- **Instance** : Development, Shared/Dedicated General Purpose, Specialized, GPU
- **Storage** : Object Storage (Multi-AZ Standard, One Zone-IA), Block Storage
- **Network** : Virtual Private Cloud (VPC)

> ⚠️ **Glacier n'est PAS éligible HDS**

---

## Localisation des données

**France uniquement** - Datacenters autorisés :

- DC2 (Val de Marne - Vitry-sur-Seine)
- DC3 (Val de Marne - Vitry-sur-Seine)
- DC4 (Paris) - Object Storage uniquement
- DC5 (Val d'Oise - Saint-Ouen l'Aumône)

---

## Certifications

### Scaleway

- Certification HDS v2.0 (Avril 2024)
- Activités couvertes : #1 à #4 selon R1111-9 du Code de la Santé Publique

### OpCore (Prestataire Colocation)

- Certification HDS pour activité #1 (sites physiques)

---

## SLA - Engagements de niveau de service

### Dedibox Start

| Métrique                | Engagement          |
| ----------------------- | ------------------- |
| Disponibilité mensuelle | 99,90%              |
| GTI (Business)          | 2h (heures ouvrées) |
| GTI (Entreprise)        | 1h (heures ouvrées) |

### Compensations

| Disponibilité        | Crédit |
| -------------------- | ------ |
| 99,0% ≤ TDM < 99,90% | 10%    |
| 95,0% ≤ TDM < 99,0%  | 25%    |
| TDM < 95,0%          | 50%    |

---

## Responsabilités Client (CASCADE)

### Obligatoire

- [ ] **Chiffrement des données** au repos et en transit
- [ ] **Sauvegardes** régulières, déportées et testées
- [ ] **Plan de continuité d'activité** (PCA/PRA)
- [ ] **Effacement sécurisé** des données en fin de contrat (conforme PGSSI-S)
- [ ] **Maintenance OS** : mises à jour, correctifs de sécurité
- [ ] **Gestion des accès** : IAM, principe du moindre privilège
- [ ] **Journalisation** des accès et événements

### Interdit

- ❌ Modifier BIOS, BMC, firmware
- ❌ Overclocking ou modification de configuration bas niveau
- ❌ Modifier configuration RAID hors console Scaleway
- ❌ Utiliser Glacier pour données de santé
- ❌ Transférer données hors France

---

## Responsabilités Scaleway

- Infrastructure physique certifiée HDS
- Maintien en condition opérationnelle
- Effacement sécurisé des disques en fin de service
- Destruction physique des disques défectueux
- Notification des violations de données
- Pas d'accès aux données client

---

## Sous-traitants

| Sous-traitant | Localisation | Rôle                   |
| ------------- | ------------ | ---------------------- |
| OpCore        | France (EU)  | Colocation datacenters |
| Loxy          | France       | Recyclage DEEE         |
| Confia        | France       | Recyclage DEEE         |

---

## Conformité réglementaire

- **RGPD** : Données hébergées en France/EEE uniquement
- **Code de la Santé Publique** : Articles L1111-8, R1111-9, R1111-11
- **PGSSI-S** : Politique Générale de Sécurité des Systèmes d'Information de Santé
- **SecNumCloud 3.2** : Scaleway qualifié, aucun risque d'accès non autorisé

---

## Procédures importantes

### En cas de violation de données

1. Scaleway notifie CASCADE dans les meilleurs délais
2. CASCADE notifie la CNIL sous 72h si nécessaire
3. Documentation de l'incident

### Fin de contrat / Réversibilité

1. Récupérer toutes les données avant résiliation
2. Effacer les données conformément à la PGSSI-S
3. Données supprimées sous 10 jours max après résiliation

### Audit

- Rapports d'audit HDS disponibles sur demande (30j de préavis)
- Consultation sur site uniquement
- Tests d'intrusion interdits sans accord préalable

---

## Contacts Scaleway

| Fonction            | Contact                                               |
| ------------------- | ----------------------------------------------------- |
| Référent commercial | Elif Kaya - hds-contact@scaleway.com - 06 44 60 84 97 |
| DPO                 | dpo@iliad.fr                                          |
| Privacy             | privacy@scaleway.com                                  |
| Sécurité            | security@scaleway.com                                 |

---

## Références documentaires

- [Documentation Scaleway](https://www.scaleway.com/en/docs/)
- [Sécurité & Résilience](https://www.scaleway.com/en/security-and-resilience/)
- [Trust Center](https://www.scaleway.com/en/trust-center/)
- [Liste sous-traitants](https://www.scaleway.com/en/subprocessorlist/)
- [PGSSI-S](https://esante.gouv.fr/produits-services/pgssi-s/corpus-documentaire)
