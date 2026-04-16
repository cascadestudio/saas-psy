import Link from "next/link";
import Image from "next/image";
import { Interfaces, Files } from "doodle-icons";
import { Button } from "@/components/ui/button";
import { scales } from "@/app/scalesData";
import { questionCount } from "@/app/utils/utils";
import ScalePreview from "./ScalePreview";

export default async function ScaleDescriptionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scale = scales.find((s) => s.id === id);

  if (!scale) {
    return (
      <div className="container mx-auto px-4 py-6">Échelle non trouvée</div>
    );
  }

  return (
    <div>
      {/* Header fullwidth 2 couleurs + CTA */}
      <div className="sticky top-0 z-10 p-1">
        <div className="flex h-[80px]">
          <div
            className="flex items-center justify-center flex-shrink-0 aspect-square h-full rounded-l-2xl"
            style={{ backgroundColor: scale.color }}
          >
            <Image
              src={scale.icon}
              alt={scale.acronym}
              width={48}
              height={48}
              className="w-10 h-10 object-contain"
            />
          </div>
          <div
            className="flex items-center justify-between px-6 flex-1 min-w-0 rounded-r-2xl"
            style={{ backgroundColor: scale.colorLight }}
          >
            <div className="min-w-0">
              <h1 className="font-heading font-bold text-black leading-tight text-2xl">
                {scale.acronym}
              </h1>
              <p className="font-body text-black/80 leading-snug mt-0.5 text-base truncate">
                {scale.label}
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="flex-shrink-0 ml-4 rounded-full text-base px-8"
            >
              <Link href={`/send-scale?scaleId=${id}`}>Envoyer au patient</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Carte description */}
      <div className="container mx-auto px-4 pt-6">
        <div className="bg-muted-foreground/5 rounded-2xl p-6 space-y-6 mb-6">
          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Interfaces.Bookmark
                className="h-4 w-4 flex-shrink-0"
                fill="currentColor"
              />
              {scale.category}
            </span>
            <span className="inline-flex items-center gap-2">
              <Files.FileText
                className="h-4 w-4 flex-shrink-0"
                fill="currentColor"
              />
              {questionCount(scale)} questions
            </span>
            <span className="inline-flex items-center gap-2">
              <Interfaces.Clock
                className="h-4 w-4 flex-shrink-0"
                fill="currentColor"
              />
              {scale.estimatedTime}
            </span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {scale.longDescription}
          </p>
        </div>

        {/* Carte aperçu */}
        <div className="bg-muted-foreground/5 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-sans font-semibold mb-4">
            Aperçu de l'échelle
          </h2>
          <div className="bg-background rounded-lg p-4">
            <ScalePreview scale={scale} />
          </div>
        </div>
      </div>
    </div>
  );
}
