import { QuestionnaireProps } from "./BaseQuestionnaire";
import BaseQuestionnaire from "./BaseQuestionnaire";
import EchelleDanxieteDeLiebowitch from "./questionnairesList/EchelleDanxieteDeLiebowitch";
import SingleScaleQuestionnaire from "./questionnairesList/SingleScaleQuestionnaire";
import STAIQuestionnaire from "./questionnairesList/STAIQuestionnaire";

export default function QuestionnaireFactory(props: QuestionnaireProps) {
  const { questionnaire } = props;

  if (!questionnaire) {
    return <BaseQuestionnaire {...props} />;
  }

  switch (questionnaire.id) {
    case "echelle-d-anxiete-sociale-de-liebowitz":
      return <EchelleDanxieteDeLiebowitch {...props} />;

    case "inventaire-de-depression-de-beck":
      return <SingleScaleQuestionnaire {...props} />;

    case "stai-anxiete-generalisee":
      return <STAIQuestionnaire {...props} />;

    case "traumatismes-pcl5":
      return <SingleScaleQuestionnaire {...props} />;

    case "index-symptomes-ybocs":
      return <SingleScaleQuestionnaire {...props} />;

    case "test-questionnaire":
      return <SingleScaleQuestionnaire {...props} />;

    default:
      return <BaseQuestionnaire {...props} />;
  }
}
