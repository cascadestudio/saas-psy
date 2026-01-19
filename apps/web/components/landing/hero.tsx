import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Simplifiez vos évaluations
          <br />
          <span className="text-primary">psychométriques</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Envoyez des questionnaires en quelques clics, obtenez des scores
          automatiques et suivez l&apos;évolution de vos patients dans le temps.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/dashboard">Commencer maintenant</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/echelles">Découvrir les échelles</Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Gratuit jusqu&apos;à 5 patients
        </p>
      </div>
    </section>
  );
}
