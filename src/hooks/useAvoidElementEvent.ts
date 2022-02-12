import { createEventDispatcher } from "svelte";
import type { IIsSlotPresent } from "../types"

import { useAvoidElementCallback } from "./useAvoidElementCallback";

interface TAvoidElementProps extends IIsSlotPresent {
  dispatchEventName: string;
}

export const useAvoidElementEvent = ({datasetName, slotName, dispatchEventName}: TAvoidElementProps) => {
  const dispatch = createEventDispatcher();

  const { onEventCallback } = useAvoidElementCallback({datasetName, slotName, callback: () => {
    dispatch(dispatchEventName);
  }});

  return {
    onEventCallback
  }
}