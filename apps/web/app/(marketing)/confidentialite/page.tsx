import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/landing/legal-page";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Melya",
  description:
    "Comment Melya collecte, traite et protège vos données et celles de vos patient·e·s. Conformité RGPD et HDS.",
  alternates: { canonical: "https://melya.app/confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <LegalPage title="Politique de confidentialité" updatedAt="27 mai 2026">
      <LegalSection title="Responsable de traitement">
        <p>
          L'éditeur de Melya, <strong>CASCADE (GIE)</strong>, dont le siège est
          situé 8 rue Armand Carrel, 13004 Marseille (RCS Marseille 991 777
          087), est responsable du traitement des données du compte praticien
          (inscription, facturation, support).
        </p>
        <p>
          Pour les <strong>données de santé des patient·e·s</strong> traitées
          via Melya, le·la praticien·ne utilisateur·rice est responsable de
          traitement ; Melya agit en tant que <strong>sous-traitant</strong> au
          sens de l'article 28 du RGPD.
        </p>
      </LegalSection>

      <LegalSection title="Données collectées">
        <p>
          <strong>Compte praticien</strong> : nom, prénom, email, mot de passe
          (haché), informations professionnelles, préférences.
        </p>
        <p>
          <strong>Dossiers patient</strong> : identité (chiffrée), email pour
          l'envoi d'échelles, sessions de passation, réponses aux
          questionnaires, scores et interprétations, commentaires cliniques.
        </p>
        <p>
          <strong>Données techniques</strong> : logs d'audit (horodatage,
          action, utilisateur), logs serveur nécessaires à la sécurité et à la
          maintenance.
        </p>
      </LegalSection>

      <LegalSection title="Finalités et bases légales">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Fournir le service (gestion de compte, envoi et cotation
            d'échelles) — exécution du contrat.
          </li>
          <li>
            Traiter les données de santé pour le suivi clinique — mission
            d'intérêt public dans le domaine de la santé (art. 9.2.h RGPD), sous
            la responsabilité du·de la praticien·ne soumis·e au secret
            professionnel.
          </li>
          <li>
            Assurer la sécurité du service et tracer les accès — obligation
            légale et intérêt légitime.
          </li>
          <li>
            Communications de service (onboarding, sécurité, évolutions
            produit) — intérêt légitime ; communications marketing : consentement
            (désinscription possible à tout moment).
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Durées de conservation">
        <p>
          Les données patient sont conservées tant que le·la praticien·ne
          maintient le dossier actif. À la suppression d'un dossier ou à la
          clôture du compte, les données sont effacées dans un délai de 30
          jours, hors obligations légales (par exemple journal d'audit conservé
          pendant la durée réglementaire applicable aux données de santé).
        </p>
      </LegalSection>

      <LegalSection title="Destinataires et sous-traitants">
        <p>
          Vos données ne sont jamais vendues ni cédées à des tiers. Melya
          s'appuie sur les sous-traitants suivants, tous situés en UE :
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Scaleway</strong> (France) — hébergement HDS et base de
            données.
          </li>
          <li>
            <strong>Resend</strong> — envoi des emails transactionnels.
          </li>
          <li>
            <strong>Vercel</strong> — diffusion de l'interface web (aucune
            donnée de santé n'y transite ni n'y est stockée).
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Transferts hors UE">
        <p>
          Aucun transfert de données de santé hors de l'Union européenne n'est
          réalisé.
        </p>
      </LegalSection>

      <LegalSection title="Sécurité">
        <p>
          Chiffrement AES-256-GCM des données sensibles au repos, TLS 1.3 en
          transit, sauvegardes chiffrées, journalisation des accès, principe du
          moindre privilège. Voir la page{" "}
          <a href="/securite" className="text-brand-orange hover:underline">
            Sécurité
          </a>{" "}
          pour le détail.
        </p>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Conformément au RGPD, vous disposez d'un droit d'accès, de
          rectification, d'effacement, de limitation, d'opposition et de
          portabilité sur vos données. Les patient·e·s exercent ces droits
          auprès de leur praticien·ne (responsable de traitement). Les
          praticien·ne·s peuvent les exercer en écrivant à{" "}
          <a
            href="mailto:clement@melya.app"
            className="text-brand-orange hover:underline"
          >
            clement@melya.app
          </a>
          .
        </p>
        <p>
          Vous pouvez également introduire une réclamation auprès de la{" "}
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-orange hover:underline"
          >
            CNIL
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Melya n'utilise pas de cookies publicitaires ni de traceurs tiers.
          Seuls les cookies strictement nécessaires au fonctionnement du service
          (authentification, session) sont déposés.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Pour toute question relative à la protection des données :{" "}
          <a
            href="mailto:clement@melya.app"
            className="text-brand-orange hover:underline"
          >
            clement@melya.app
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
