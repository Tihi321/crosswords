import { game } from "../store/game";

export const useGame = () => {

  const setGameStart = () => {
    game.update((state) => ({
      ...state,
      started: true
    }));
  };

  const setGameEnd = () => {
    game.update((state) => ({
      ...state,
      started: false
    }));
  };

  return {
    startGame: setGameStart,
    endGame: setGameEnd,
    game
  }
}