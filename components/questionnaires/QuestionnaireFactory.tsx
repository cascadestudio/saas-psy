import { QuestionnaireProps } from "./BaseQuestionnaire";
import BaseQuestionnaire from "./BaseQuestionnaire";
import EchelleDanxieteDeLiebowitch from "./questionnairesList/EchelleDanxieteDeLiebowitch";
import InventaireDepressionDeBeck from "./questionnairesList/InventaireDepressionDeBeck";

export default function QuestionnaireFactory(props: QuestionnaireProps) {
  const { questionnaire } = props;

  if (!questionnaire) {
    return <BaseQuestionnaire {...props} />;
  }

  // Choose the appropriate questionnaire component based on ID or title
  switch (questionnaire.id) {
    case "echelle-d-anxiete-sociale-de-liebowitz": // Échelle d'anxiété sociale de Liebowitz
      return <EchelleDanxieteDeLiebowitch {...props} />;

    case "inventaire-de-depression-de-beck":
      return <InventaireDepressionDeBeck {...props} />;

    default:
      return <BaseQuestionnaire {...props} />;
  }
}
