/**
 * Mirrors the structure of the patients list page so the layout doesn't
 * shift when data arrives.
 */
export function PatientsListSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6 animate-pulse">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-9 w-40 bg-zinc-200 rounded" />
        <div className="h-8 w-36 bg-zinc-200 rounded-md" />
      </div>

      <div className="flex gap-2 mb-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-7 w-24 bg-zinc-200 rounded-full" />
        ))}
      </div>

      <div className="rounded-xl bg-muted-foreground/5 p-4">
        <div className="rounded-lg overflow-hidden space-y-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 p-3"
            >
              <div className="h-4 w-48 bg-zinc-200 rounded" />
              <div className="h-8 w-8 bg-zinc-200 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
