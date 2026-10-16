import { Interfaces, Files } from "doodle-icons";
import { scales } from "@/app/scalesData";
import { questionCount } from "@/app/utils/utils";
import ScalePreview from "./ScalePreview";
import { ScaleSendButton } from "./ScaleSendButton";
import { ScaleTile } from "@/components/scale/ScaleTile";

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
      {/* Header : tuile de l'échelle + CTA */}
      <div className="sticky top-14 md:top-0 z-10 bg-background pt-2">
        {/* Même largeur que le contenu (container) pour aligner le CTA à droite. */}
        <div className="container mx-auto px-4">
          <ScaleTile
            domain={scale.domain}
            acronym={scale.acronym}
            acronymAs="h1"
            subtitle={scale.label}
            className="h-[80px] rounded-2xl px-6 py-0"
            subtitleClassName="mt-1.5 truncate text-base"
            aside={<ScaleSendButton scaleId={id} />}
          />
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
        <h2 className="text-lg font-sans font-semibold mb-4">
          Aperçu de l'échelle
        </h2>
        <div className="bg-muted-foreground/5 rounded-2xl p-6 mb-6">
          <ScalePreview scale={scale} />
        </div>

        {/* Cotations & interprétations */}
        {scale.scoring && (
          <>
            <h2 className="text-lg font-sans font-semibold mb-4">
              Cotations & interprétations
            </h2>
            <div className="bg-muted-foreground/5 rounded-2xl p-6 mb-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-2">Méthode de cotation</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {scale.scoring.method}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-3">Interprétation des scores</h3>
                <div className="space-y-2">
                  {scale.scoring.ranges.map((range, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-muted-foreground/5 rounded-lg px-4 py-2.5"
                    >
                      <span className="text-sm font-medium">
                        {range.interpretation}
                      </span>
                      <span className="text-xs text-muted-foreground bg-muted-foreground/10 px-3 py-1 rounded-full">
                        {range.min} – {range.max}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Mention copyright */}
        {scale.copyrightAttribution && (
          <p className="text-xs text-muted-foreground/80 leading-relaxed mt-6 pt-4 border-t">
            {scale.copyrightAttribution}
          </p>
        )}
      </div>
    </div>
  );
}
