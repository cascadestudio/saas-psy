import Link from "next/link";
import { Arrow, Interfaces, Files } from "doodle-icons";
import { Button } from "@/components/ui/button";
import { scales } from "@/app/scalesData";
import { questionCount, getExampleQuestions } from "@/app/utils/utils";
import { FavoriteButtonWrapper } from "./FavoriteButtonWrapper";
import { ScalePreviewModal } from "./ScalePreviewModal";

export default async function ScaleDescriptionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scale = scales.find((s) => s.id === id);

  if (!scale) {
    return (
      <div className="container mx-auto px-4 py-6">
        Échelle non trouvée
      </div>
    );
  }

  const exampleQuestions = getExampleQuestions(scale);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <Button asChild variant="ghost" size="icon" className="-ml-2">
          <Link href="/echelles">
            <Arrow.ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="font-normal text-3xl flex-1">{scale.title}</h1>
        <FavoriteButtonWrapper scaleId={id} />
      </div>

      {/* Subline */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 pl-10">
        <span>{scale.category}</span>
        <span className="flex items-center gap-1.5">
          <Files.FileText className="h-3.5 w-3.5" />
          {questionCount(scale)} questions
        </span>
        <span className="flex items-center gap-1.5">
          <Interfaces.Clock className="h-3.5 w-3.5" />
          {scale.estimatedTime}
        </span>
      </div>

      <div className="space-y-4">
        {/* Description */}
        <div>
          <h2 className="text-lg font-sans font-semibold mb-3">Description</h2>
          <div className="bg-muted-foreground/5 rounded-lg p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {scale.longDescription}
            </p>
          </div>
        </div>

        {/* Exemples de questions */}
        {exampleQuestions.length > 0 && (
          <div>
            <h2 className="text-lg font-sans font-semibold mb-3">
              Exemples de questions
            </h2>
            <div className="bg-muted-foreground/5 rounded-lg overflow-hidden">
              {exampleQuestions.map((question: string, index: number) => (
                <p
                  key={index}
                  className="text-sm text-muted-foreground p-4 border-t border-border/50 first:border-t-0"
                >
                  {question}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <ScalePreviewModal scale={scale} />
          <Button asChild>
            <Link href={`/send-scale?scaleId=${id}`}>
              <Interfaces.Send className="mr-2 h-4 w-4" />
              Envoyer au patient
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
