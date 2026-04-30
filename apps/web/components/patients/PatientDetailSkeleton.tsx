/**
 * Mirrors the structure of the patient detail page so the layout doesn't
 * shift when data arrives.
 */
export function PatientDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <div className="h-9 w-64 bg-zinc-200 rounded" />
        <div className="h-9 w-9 bg-zinc-200 rounded-md ml-auto" />
        <div className="h-10 w-44 bg-zinc-200 rounded-md" />
      </div>

      {/* Subline */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-4 w-16 bg-zinc-200 rounded" />
        <div className="h-4 w-48 bg-zinc-200 rounded" />
      </div>

      <div className="space-y-6">
        <div>
          <div className="h-5 w-56 bg-zinc-200 rounded mb-3" />
          <div className="flex flex-col gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex overflow-hidden"
                style={{ borderRadius: 12, height: 64 }}
              >
                <div
                  className="bg-zinc-200 flex-shrink-0"
                  style={{ aspectRatio: "1 / 1", height: "100%" }}
                />
                <div className="flex items-center px-4 flex-1 gap-4 bg-muted-foreground/5">
                  <div className="space-y-1.5">
                    <div className="h-4 w-20 bg-zinc-200 rounded" />
                    <div className="h-3 w-24 bg-zinc-200 rounded" />
                  </div>
                  <div className="ml-auto h-6 w-24 bg-zinc-200 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
