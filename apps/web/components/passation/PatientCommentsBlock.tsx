import { Interfaces } from "doodle-icons";

export function PatientCommentsBlock({ comments }: { comments: string }) {
  return (
    <div>
      <h2 className="text-lg font-sans font-semibold mb-3">
        Commentaire du patient
      </h2>
      <div className="bg-muted-foreground/5 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <Interfaces.Message className="h-5 w-5 shrink-0 mt-0.5 text-muted-foreground" />
          <p className="text-sm leading-relaxed whitespace-pre-line">
            {comments}
          </p>
        </div>
      </div>
    </div>
  );
}
