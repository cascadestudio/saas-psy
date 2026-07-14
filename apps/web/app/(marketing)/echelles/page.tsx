import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { scales } from "@melya/core";

import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { questionCount } from "@/app/utils/utils";
import { scaleSlug } from "@/lib/scale-slug";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Échelles psychométriques en ligne | Melya",
  description:
    "PHQ-9, GAD-7, LSAS, PCL-5, Y-BOCS, RSES : envoyez vos échelles à vos patients, recevez les résultats cotés automatiquement. Hébergement HDS en France.",
  alternates: { canonical: "https://www.melya.app/echelles" },
};

export default function ScalesIndexPage() {
  return (
    <>
      <Navbar />
      <main className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-title text-4xl md:text-5xl">
            Les échelles disponibles sur Melya
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Chaque échelle est passée en ligne par le patient, cotée
            automatiquement et suivie dans le temps. Aucune ressaisie, aucun
            calcul manuel.
          </p>

          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {scales.map((scale) => (
              <li key={scale.id}>
                <Link
                  href={`/echelles/${scaleSlug(scale)}`}
                  className="flex h-full gap-4 rounded-2xl border p-5 transition-colors hover:bg-surface-brand-bg"
                >
                  <div
                    className="flex aspect-square h-12 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: scale.color }}
                  >
                    <Image
                      src={scale.icon}
                      alt=""
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-medium">
                      {scale.acronym}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {scale.category}
                      </span>
                    </h2>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {scale.description}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {questionCount(scale)} items · {scale.estimatedTime}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
