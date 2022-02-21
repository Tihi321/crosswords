import { game } from "../store/game";
import { useCrossWord } from "./useCrossWord";

export const useGame = () => {
  const { resetCrossWord } = useCrossWord();
  const setGameStart = () => {
    game.update((state) => ({
      ...state,
      started: true,
    }));
  };

  const setGameEnd = () => {
    resetCrossWord();
    game.set({ retries: 0, started: false });
  };

  const addGameRetry = () => {
    game.update((state) => ({
      ...state,
      retries: state.retries + 1,
    }));
  };

  return {
    addGameRetry,
    startGame: setGameStart,
    endGame: setGameEnd,
    game,
  };
};
