import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/landing/legal-page";

export const metadata: Metadata = {
  title: "Sécurité — Melya",
  description:
    "Hébergement HDS en France, chiffrement AES-256-GCM des données sensibles, conformité RGPD. Les engagements de sécurité de Melya pour les données de santé.",
  alternates: { canonical: "https://melya.app/securite" },
};

export default function SecuritePage() {
  return (
    <LegalPage title="Sécurité" updatedAt="27 mai 2026">
      <LegalSection title="Hébergement certifié HDS, en France">
        <p>
          Melya est hébergé exclusivement en France sur l'infrastructure
          Scaleway, certifiée{" "}
          <strong>Hébergeur de Données de Santé (HDS)</strong> v2.0 au titre des
          activités #1 à #4 prévues par l'article R1111-9 du Code de la santé
          publique.
        </p>
        <p>
          Aucune donnée patient ne sort du territoire français. Les datacenters
          utilisés sont situés en Île-de-France (Vitry-sur-Seine et
          Saint-Ouen-l'Aumône).
        </p>
      </LegalSection>

      <LegalSection title="Chiffrement des données">
        <p>
          Les champs sensibles (identité patient, réponses aux échelles,
          commentaires cliniques) sont chiffrés au repos en{" "}
          <strong>AES-256-GCM</strong> via un middleware Prisma, avec une clé
          gérée séparément de la base de données. Les communications sont
          chiffrées en transit (TLS 1.3).
        </p>
        <p>
          Conséquence concrète : même en cas d'accès non autorisé à la base, les
          données cliniques restent illisibles sans la clé. L'équipe Melya n'a
          pas accès aux données cliniques de vos patients.
        </p>
      </LegalSection>

      <LegalSection title="Cloisonnement des comptes">
        <p>
          Chaque praticien·ne n'accède qu'à ses propres patient·e·s et sessions.
          Aucun·e autre utilisateur·rice de Melya ne peut consulter vos
          dossiers.
        </p>
      </LegalSection>

      <LegalSection title="Sauvegardes">
        <p>
          La base PostgreSQL est sauvegardée chaque jour. Les sauvegardes sont
          chiffrées avant transfert et stockées sur un site distant
          (Hetzner Storage Box, UE) via SFTP. Les restaurations sont testées
          régulièrement dans le cadre du Plan de Continuité d'Activité (PCA).
        </p>
      </LegalSection>

      <LegalSection title="Journalisation et audit">
        <p>
          Toutes les actions sensibles (accès aux dossiers, envois d'échelles,
          modifications) sont consignées dans un journal d'audit horodaté,
          conservé conformément à la réglementation applicable aux données de
          santé.
        </p>
      </LegalSection>

      <LegalSection title="Notification d'incident">
        <p>
          En cas de violation de données à caractère personnel, Melya s'engage à
          en informer les praticien·ne·s concerné·e·s sans délai injustifié et à
          procéder à la notification auprès de la CNIL dans le délai de 72
          heures prévu par le RGPD.
        </p>
      </LegalSection>

      <LegalSection title="Signaler une vulnérabilité">
        <p>
          Si vous pensez avoir identifié une faille de sécurité, écrivez-nous à{" "}
          <a
            href="mailto:clement@melya.app"
            className="text-brand-orange hover:underline"
          >
            clement@melya.app
          </a>
          . Nous accusons réception sous 48h ouvrées.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
