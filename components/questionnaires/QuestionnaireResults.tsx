import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ResultsProps = {
  data: {
    questionnaireId: string;
    questionnaireTitle: string;
    patientFirstname: string;
    patientLastname: string;
    psychologistEmail: string;
    formData: Record<string, any>;
    scoreDetails?: {
      total: number;
      anxiety?: number;
      avoidance?: number;
      interpretation: string;
      maxTotal?: number;
      maxAnxiety?: number;
      maxAvoidance?: number;
    };
    comments?: string;
  };
};

export function QuestionnaireResults({ data }: ResultsProps) {
  const maxTotal = data.scoreDetails?.maxTotal || 144;
  const maxAnxiety = data.scoreDetails?.maxAnxiety || 72;
  const maxAvoidance = data.scoreDetails?.maxAvoidance || 72;

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Résultats du Questionnaire</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Patient Information */}
          <section>
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">
              Informations du Patient
            </h3>
            <div className="space-y-2">
              <p>
                <strong>Patient:</strong> {data.patientFirstname}{" "}
                {data.patientLastname}
              </p>
              <p>
                <strong>Questionnaire:</strong> {data.questionnaireTitle}
              </p>
            </div>
          </section>

          {/* Scores Section */}
          {data.scoreDetails && (
            <section>
              <h3 className="text-lg font-semibold border-b pb-2 mb-4">
                Résultats
              </h3>
              <div className="space-y-2">
                <p className="font-medium">
                  <strong>Score total:</strong> {data.scoreDetails.total}/
                  {maxTotal}
                </p>
                {data.scoreDetails.anxiety !== undefined && (
                  <p className="font-medium">
                    <strong>Score d'anxiété:</strong>{" "}
                    {data.scoreDetails.anxiety}/{maxAnxiety}
                  </p>
                )}
                {data.scoreDetails.avoidance !== undefined && (
                  <p className="font-medium">
                    <strong>Score d'évitement:</strong>{" "}
                    {data.scoreDetails.avoidance}/{maxAvoidance}
                  </p>
                )}
                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <strong>Interprétation:</strong>{" "}
                  {data.scoreDetails.interpretation}
                </div>
              </div>
            </section>
          )}

          {/* Detailed Responses */}
          <section>
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">
              Réponses Détaillées
            </h3>
            <div className="bg-slate-50 p-4 rounded-lg space-y-3">
              {Object.entries(data.formData).map(([question, answer]) => (
                <div key={question} className="space-y-1">
                  <p className="font-medium">{question}</p>
                  <p className="text-sm text-slate-600">{answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Additional Comments */}
          {data.comments && (
            <section>
              <h3 className="text-lg font-semibold border-b pb-2 mb-4">
                Commentaires Additionnels
              </h3>
              <div className="bg-slate-50 p-4 rounded-lg italic">
                {data.comments}
              </div>
            </section>
          )}
        </CardContent>
      </Card>

      <footer className="text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Cascade. Tous droits réservés.
      </footer>
    </div>
  );
}
