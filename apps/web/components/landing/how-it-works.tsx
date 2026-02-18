const steps = [
  {
    number: "1",
    title: "Sélectionnez une échelle",
    description:
      "Choisissez parmi notre bibliothèque de questionnaires validés (BDI, STAI, Liebowitz...).",
  },
  {
    number: "2",
    title: "Envoyez au patient",
    description:
      "Le patient reçoit un lien par email et répond au questionnaire à son rythme.",
  },
  {
    number: "3",
    title: "Recevez les résultats",
    description:
      "Score calculé automatiquement, interprétation claire, historique accessible.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Comment ça marche
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Un processus simple en trois étapes pour vous faire gagner du temps.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-border -translate-x-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
