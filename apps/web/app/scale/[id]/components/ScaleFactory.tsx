import { ScaleProps } from "@/app/types";
import BaseScale from "./BaseScale";
import DualScaleForm from "./scalesList/DualScaleForm";
import SingleScaleForm from "./scalesList/SingleScaleForm";
import OptionsScaleForm from "./scalesList/BDIForm";

export default function ScaleFactory(props: ScaleProps) {
  const { scale } = props;

  if (!scale) {
    return <BaseScale {...props} />;
  }

  switch (scale.id) {
    case "echelle-d-anxiete-sociale-de-liebowitz":
      return <DualScaleForm {...props} />;

    case "traumatismes-pcl5":
      return <SingleScaleForm {...props} />;

    case "index-symptomes-ybocs":
      return <OptionsScaleForm {...props} />;

    case "test-scale":
      return <SingleScaleForm {...props} />;

    default:
      return <BaseScale {...props} />;
  }
}
