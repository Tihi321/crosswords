import { game } from "../store/game";
import { useCrossWord } from "./useCrossWord";

export const useGame = () => {
  const { set, update } = game;
  const { resetCrossWord } = useCrossWord();
  const setGameStart = () => {
    update((state) => ({
      ...state,
      started: true,
    }));
  };

  const setGameEnd = () => {
    resetCrossWord();
    set({ retries: 0, started: false });
  };

  const resetGame = () => {
    resetCrossWord();
    update((state) => ({
      ...state,
      retries: 0,
    }));
  };

  const addGameRetry = () => {
    update((state) => ({
      ...state,
      retries: state.retries + 1,
    }));
  };

  return {
    addGameRetry,
    startGame: setGameStart,
    endGame: setGameEnd,
    resetGame,
    game,
  };
};
