import { QuestionnaireProps } from "./BaseQuestionnaire";
import BaseQuestionnaire from "./BaseQuestionnaire";
import EchelleDanxieteDeLiebowitch from "./EchelleDanxieteDeLiebowitch";

export default function QuestionnaireFactory(props: QuestionnaireProps) {
  const {
    questionnaire,
    psychologistEmail,
    patientFirstname,
    patientLastname,
  } = props;

  if (!questionnaire) {
    return <BaseQuestionnaire {...props} />;
  }

  // Choose the appropriate questionnaire component based on ID or title
  switch (questionnaire.id) {
    case "echelle-d-anxiete-sociale-de-liebowitz": // Échelle d'anxiété sociale de Liebowitz
      return <EchelleDanxieteDeLiebowitch {...props} />;

    // Add more cases for other questionnaire types
    // case 2: // Inventaire de Dépression de Beck (BDI)
    //   return <InventaireDepressionBeck {...props} />;

    default:
      return <BaseQuestionnaire {...props} />;
  }
}
