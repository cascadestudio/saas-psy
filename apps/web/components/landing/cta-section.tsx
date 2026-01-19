import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Prêt à simplifier vos évaluations ?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Créez votre compte gratuitement et commencez à utiliser Melya avec
          jusqu&apos;à 5 patients. Aucune carte bancaire requise.
        </p>
        <Button asChild size="lg">
          <Link href="/dashboard">Commencer gratuitement</Link>
        </Button>
        <p className="text-sm text-muted-foreground mt-4">
          5 patients inclus · Toutes les fonctionnalités
        </p>
      </div>
    </section>
  );
}
