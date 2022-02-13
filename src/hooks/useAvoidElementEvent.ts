import { createEventDispatcher } from "svelte";
import { useAvoidElementCallback } from "tsl-utils";

interface TAvoidElementProps {
  dispatchEventName: string;
  datasetName: string;
  slotName: string;
  elements?: Element[];
}

export const useAvoidElementEvent = ({
  datasetName,
  slotName,
  dispatchEventName,
}: TAvoidElementProps) => {
  const dispatch = createEventDispatcher();

  const { onEventCallback } = useAvoidElementCallback({
    datasetName,
    slotName,
    callback: () => {
      dispatch(dispatchEventName);
    },
  });

  return {
    onEventCallback,
  };
};
