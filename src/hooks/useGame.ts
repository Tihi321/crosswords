import { game } from "../store/game";

export const useGame = () => {
  const setGameStart = () => {
    game.update((state) => ({
      ...state,
      started: true,
    }));
  };

  const setGameEnd = () => {
    game.update((state) => ({
      ...state,
      retries: 0,
      started: false,
    }));
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
