import get from "lodash/get";
import { isSlotPresent } from "../utils";
import type { IIsSlotPresent } from "../types"

interface TAvoidElementProps extends IIsSlotPresent {
  callback: Function;
}

export const useAvoidElementCallback = ({datasetName, slotName, callback}: TAvoidElementProps) => {

  const onEventCallback = (event) => {
    if (!isSlotPresent({
      elements: get(event, ["path"]),
      datasetName,
      slotName
    })) {
      callback();
    }
  }

  return {
    onEventCallback
  }
}