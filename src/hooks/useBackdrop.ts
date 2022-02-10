import map from "lodash/map";
import some from "lodash/some";
import isEqual from "lodash/isEqual";
import get from "lodash/get";
import { createEventDispatcher } from "svelte";
const slotName = "backdrop-slot";

const isSlotPresent = (elements: Element[]): boolean => {
  const datasets = map(elements, (element: Element) => get(element, ["dataset"]));

  return some(datasets, (dataset: any) => isEqual(get(dataset, ["backdrop"]), slotName));
}

export const useBackdrop = () => {
  const dispatch = createEventDispatcher();

  const onClose = (event) => {
    if (!isSlotPresent(get(event, ["path"]))) {
      dispatch("close");
    }
  }

  return {
    onClose,
    slotName
  }
}