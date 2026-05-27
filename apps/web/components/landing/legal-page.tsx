import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export function LegalPage({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-gelica text-3xl sm:text-4xl font-normal text-foreground">
            {title}
          </h1>
          {updatedAt && (
            <p className="mt-2 text-sm font-body text-muted-foreground">
              Dernière mise à jour : {updatedAt}
            </p>
          )}
          <div className="mt-10 space-y-10 font-body text-foreground leading-relaxed">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="font-body text-xl sm:text-2xl font-semibold text-foreground">
        {title}
      </h2>
      <div className="space-y-3 text-muted-foreground">{children}</div>
    </section>
  );
}
