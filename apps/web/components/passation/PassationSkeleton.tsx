/**
 * Mirrors the structure of the passation results page so the layout doesn't
 * shift when data arrives.
 */
export function PassationSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6 animate-pulse">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4">
        <div className="h-4 w-16 bg-zinc-200 rounded" />
        <div className="h-4 w-1 bg-zinc-200 rounded" />
        <div className="h-4 w-24 bg-zinc-200 rounded" />
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-[72px] w-[72px] rounded-md bg-zinc-200 shrink-0" />
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-8 w-40 bg-zinc-200 rounded" />
              <div className="h-5 w-20 bg-zinc-200 rounded-full" />
            </div>
            <div className="h-3 w-32 bg-zinc-200 rounded" />
          </div>
        </div>
        <div className="h-9 w-44 bg-zinc-200 rounded-md" />
      </div>

      <div className="space-y-6">
        {/* Score & interprétation card */}
        <div>
          <div className="h-5 w-48 bg-zinc-200 rounded mb-3" />
          <div className="border rounded-lg p-6 space-y-6">
            <div className="space-y-2">
              <div className="h-4 w-36 bg-zinc-200 rounded" />
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-zinc-200" />
                <div className="h-8 w-64 bg-zinc-200 rounded" />
              </div>
            </div>
            <div className="h-5 w-32 bg-zinc-200 rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[0, 1].map((i) => (
                <div key={i} className="border rounded-md p-3 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div className="h-4 w-24 bg-zinc-200 rounded" />
                    <div className="h-4 w-12 bg-zinc-200 rounded" />
                  </div>
                  <div className="h-1.5 w-full bg-zinc-200 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Réponses du patient */}
        <div>
          <div className="h-5 w-44 bg-zinc-200 rounded mb-3" />
          <div className="border rounded-lg divide-y">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2 flex-1">
                  <div className="h-3 w-6 bg-zinc-200 rounded" />
                  <div className="h-3 w-2/3 bg-zinc-200 rounded" />
                </div>
                <div className="h-6 w-24 bg-zinc-200 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Historique longitudinal */}
        <div>
          <div className="h-5 w-48 bg-zinc-200 rounded mb-3" />
          <ol className="relative border-l-2 border-zinc-200 ml-3 space-y-6 py-2">
            {[0, 1].map((i) => (
              <li key={i} className="relative pl-6">
                <span className="absolute -left-[7px] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full ring-4 ring-background bg-zinc-200" />
                <div className="flex items-start justify-between gap-4 p-3">
                  <div className="space-y-2 min-w-0">
                    <div className="h-4 w-48 bg-zinc-200 rounded" />
                    <div className="h-3 w-32 bg-zinc-200 rounded" />
                  </div>
                  <div className="h-7 w-16 bg-zinc-200 rounded shrink-0" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
