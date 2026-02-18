import { Files, Interfaces } from "doodle-icons";

const features = [
  {
    icon: Files.FileText,
    title: "Envoi en 2-3 clics",
    description:
      "Sélectionnez un questionnaire, entrez l'email du patient, envoyez. C'est tout.",
  },
  {
    icon: Interfaces.Calculator,
    title: "Scoring automatique",
    description:
      "Plus de calculs manuels. Les scores et interprétations sont générés instantanément.",
  },
  {
    icon: Interfaces.Analytics,
    title: "Historique longitudinal",
    description:
      "Visualisez l'évolution de vos patients au fil des passations successives.",
  },
  {
    icon: Interfaces.Phone,
    title: "Interface patient mobile",
    description:
      "Vos patients répondent facilement depuis leur smartphone ou tablette.",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Gagnez du temps sur chaque évaluation
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Fini les PDF imprimés, la cotation manuelle et les archives papier.
          Melya digitalise tout le processus.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-background rounded-lg p-6 border"
            >
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
