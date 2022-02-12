import map from "lodash/map";
import some from "lodash/some";
import isEqual from "lodash/isEqual";
import get from "lodash/get";

import type { IIsSlotPresent } from "../types";

export const isSlotPresent = ({elements, slotName, datasetName}: IIsSlotPresent): boolean => {
  const datasets = map(elements, (element: Element) => get(element, ["dataset"]));

  return some(datasets, (dataset: any) => isEqual(get(dataset, [datasetName]), slotName));
}