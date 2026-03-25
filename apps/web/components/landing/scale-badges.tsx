"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollAnimation } from "./use-scroll-animation";

const scales = [
  {
    id: "inventaire-de-depression-de-beck",
    acronym: "BDI",
    label: "Inventaire de Dépression de Beck",
    icon: "/images/scales/bdi.svg",
    color: "#CBCADB",
  },
  {
    id: "echelle-d-anxiete-sociale-de-liebowitz",
    acronym: "LSAS",
    label: "Échelle d'anxiété sociale de Liebowitz",
    icon: "/images/scales/lsas.svg",
    color: "#6A9BCC",
  },
  {
    id: "traumatismes-pcl5",
    acronym: "PCL-5",
    label: "Liste de Vérification du TSPT",
    icon: "/images/scales/pcl-5.svg",
    color: "#C46686",
  },
  {
    id: "stai-anxiete-generalisee",
    acronym: "STAI",
    label: "Inventaire d'Anxiété État-Trait",
    icon: "/images/scales/stai.svg",
    color: "#6A9BCC",
  },
  {
    id: "index-symptomes-ybocs",
    acronym: "Y-BOCS",
    label: "Index des Symptômes Obsessionnels-Compulsifs",
    icon: "/images/scales/y-bocs.svg",
    color: "#BCD1CA",
  },
];

function ScaleBadge({ scale }: { scale: (typeof scales)[number] }) {
  return (
    <div
      className="flex-shrink-0 flex overflow-hidden"
      style={{
        borderRadius: 20,
        aspectRatio: "340 / 120",
        width: "clamp(280px, 22vw, 340px)",
      }}
    >
      <div
        className="flex items-center justify-center flex-shrink-0 p-5"
        style={{
          backgroundColor: scale.color,
          aspectRatio: "1 / 1",
          height: "100%",
        }}
      >
        <Image
          src={scale.icon}
          alt={scale.acronym}
          width={56}
          height={56}
          className="w-3/5 h-3/5 object-contain"
        />
      </div>
      <div
        className="flex flex-col justify-center px-4 flex-1 min-w-0"
        style={{ backgroundColor: `${scale.color}80` }}
      >
        <p className="font-heading font-bold text-black leading-tight text-[clamp(1.25rem,1.8vw,1.75rem)]">
          {scale.acronym}
        </p>
        <p className="font-body text-black/80 leading-snug mt-0.5 text-[clamp(0.65rem,0.85vw,0.8rem)]">
          {scale.label}
        </p>
      </div>
    </div>
  );
}

export function ScaleBadges() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-12 md:py-16">
      <div ref={ref} className={`scroll-animate ${isVisible ? "visible" : ""}`}>
        {/* Marquee - full viewport width, no max-width constraint */}
        <div className="overflow-hidden w-full">
          <div className="animate-marquee flex gap-6 w-max">
            {/* Render scales twice for seamless loop */}
            {[...scales, ...scales].map((scale, i) => (
              <Link key={`${scale.acronym}-${i}`} href={`/scale/description/${scale.id}`}>
                <ScaleBadge scale={scale} />
              </Link>
            ))}
          </div>
        </div>

        <p className="text-center text-muted-foreground font-body mt-6 text-sm md:text-base px-4">
          Accédez aux échelles psychométriques les plus utilisées, validées
          scientifiquement
        </p>

        <div className="text-center mt-4">
          <Link
            href="/echelles"
            className="inline-flex items-center gap-2 text-sm font-medium font-body text-brand-orange border border-brand-orange/30 rounded-full px-5 py-2 hover:bg-brand-orange/5 transition-colors"
          >
            Voir toutes les échelles
          </Link>
        </div>
      </div>
    </section>
  );
}
