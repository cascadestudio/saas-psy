import { cn } from "@/lib/utils";

type Block =
  | { type: "text"; lines: string[] }
  | { type: "list"; items: string[] };

/**
 * Découpe un paragraphe de consigne en blocs : les lignes qui commencent par
 * "- " forment une liste à puces, les autres restent du texte (un `\n` simple
 * passe à la ligne).
 */
function toBlocks(paragraph: string): Block[] {
  const blocks: Block[] = [];
  for (const line of paragraph.split("\n")) {
    const isItem = line.startsWith("- ");
    const last = blocks[blocks.length - 1];
    if (isItem) {
      if (last?.type === "list") last.items.push(line.slice(2));
      else blocks.push({ type: "list", items: [line.slice(2)] });
    } else if (last?.type === "text") {
      last.lines.push(line);
    } else {
      blocks.push({ type: "text", lines: [line] });
    }
  }
  return blocks;
}

interface ScaleInstructionsProps {
  /** Consigne de l'échelle : paragraphes séparés par `\n\n`, puces en "- ". */
  text: string;
  className?: string;
}

export function ScaleInstructions({ text, className }: ScaleInstructionsProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {text.split(/\n\n+/).map((paragraph, i) => (
        <div key={i} className="flex flex-col gap-1">
          {toBlocks(paragraph).map((block, j) =>
            block.type === "list" ? (
              <ul key={j} className="list-disc pl-5 space-y-0.5">
                {block.items.map((item, k) => (
                  <li key={k}>{item}</li>
                ))}
              </ul>
            ) : (
              <p key={j} className="whitespace-pre-line">
                {block.lines.join("\n")}
              </p>
            ),
          )}
        </div>
      ))}
    </div>
  );
}
