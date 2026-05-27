import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/landing/legal-page";

export const metadata: Metadata = {
  title: "Mentions légales — Melya",
  description: "Informations légales de l'éditeur de Melya.",
  alternates: { canonical: "https://melya.app/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales" updatedAt="27 mai 2026">
      <LegalSection title="Éditeur">
        <p>
          Le site melya.app est édité par <strong>CASCADE</strong>, Groupement
          d'Intérêt Économique (GIE).
        </p>
        <ul className="list-none space-y-1">
          <li>Siège social : 8 rue Armand Carrel, 13004 Marseille</li>
          <li>RCS Marseille : 991 777 087</li>
          <li>
            Contact :{" "}
            <a
              href="mailto:clement@melya.app"
              className="text-brand-orange hover:underline"
            >
              clement@melya.app
            </a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Directeur de la publication">
        <p>Clément Lapasset.</p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <p>
          <strong>Scaleway SAS</strong> — 8 rue de la Ville l'Évêque, 75008
          Paris, France. Hébergeur certifié{" "}
          <strong>Données de Santé (HDS)</strong> v2.0. Datacenters situés en
          France (Île-de-France).
        </p>
        <p>
          Diffusion de l'interface web : <strong>Vercel Inc.</strong>, 440 N
          Barranca Ave #4133, Covina, CA 91723, États-Unis (aucune donnée de
          santé n'y transite ni n'y est stockée).
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          L'ensemble du site (textes, graphismes, logos, code) est la propriété
          de CASCADE ou de ses partenaires et est protégé par le droit d'auteur
          et le droit des marques. Toute reproduction ou représentation, totale
          ou partielle, sans autorisation préalable est interdite.
        </p>
        <p>
          Les échelles psychométriques proposées sur Melya sont utilisées soit
          parce qu'elles relèvent du domaine public, soit dans le cadre des
          autorisations accordées par leurs ayants droit. Les droits afférents
          restent la propriété de leurs auteurs et éditeurs respectifs.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité">
        <p>
          Melya est un outil au service des praticien·ne·s ; il ne se substitue
          pas au jugement clinique. Les scores et interprétations fournis sont
          des aides à la décision et ne constituent pas un diagnostic.
        </p>
      </LegalSection>

      <LegalSection title="Droit applicable">
        <p>
          Les présentes mentions sont soumises au droit français. Tout litige
          relève de la compétence des tribunaux de Marseille.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
