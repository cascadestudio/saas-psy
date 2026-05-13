/**
 * Mirrors the structure of the dashboard page so the layout doesn't
 * shift when data arrives.
 */
export function DashboardSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6 animate-pulse">
      {/* Greeting */}
      <div className="mb-8">
        <div className="h-10 w-72 bg-zinc-200 rounded" />
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mb-10">
        <div className="h-10 w-48 bg-zinc-200 rounded-md" />
        <div className="h-10 w-44 bg-zinc-200 rounded-md" />
      </div>

      <div className="space-y-10">
        {[0, 1].map((section) => (
          <section key={section}>
            <div className="h-6 w-56 bg-zinc-200 rounded mb-3" />
            <div className="flex flex-col">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                >
                  <div className="h-10 w-10 rounded-md bg-zinc-200 shrink-0" />
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="h-4 w-24 bg-zinc-200 rounded" />
                    <div className="h-3 w-40 bg-zinc-200 rounded" />
                  </div>
                  <div className="h-5 w-24 bg-zinc-200 rounded-full shrink-0" />
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="h-4 w-40 bg-zinc-200 rounded" />
      </div>
    </div>
  );
}
