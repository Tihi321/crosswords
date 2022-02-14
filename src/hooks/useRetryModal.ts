import { EModals } from "../constants";
import { getCrosswordTableInputs, getCrosswordTableWords } from "../selectors";
import type { TWordInputs, TWordsInfo } from "../types";
import { getSuccessFilledInputState } from "../utils";
import { useCrossWord } from "./useCrossWord";
import { useGame } from "./useGame";
import { useModals } from "./useModals";

export const useRetryModal = () => {
  const { addCrosswordInputs } = useCrossWord();
  const { closeModal } = useModals();
  const { addGameRetry } = useGame();

  const closeRetryModal = () => closeModal(EModals.Retry);

  const resetTable = (crosswordStateSelector) => {
    const inputsState = getCrosswordTableInputs(crosswordStateSelector) as TWordInputs;
    const wordsInfo = getCrosswordTableWords(crosswordStateSelector) as TWordsInfo;

    const successInputState = getSuccessFilledInputState(wordsInfo, inputsState);

    addCrosswordInputs(successInputState);
    addGameRetry();
    closeRetryModal();
  };

  return {
    resetTable,
  };
};
