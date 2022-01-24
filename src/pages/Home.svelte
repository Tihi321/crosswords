<script lang="ts">
  import Crossword from "../components/crossword/Crossword.svelte";

  import { useGame } from "../hooks";

  let pageName = "Crosswords";

  const { startGame, endGame, game } = useGame();

  let gameStarted: boolean;

  game.subscribe((value) => {
    gameStarted = value.started;
  });

  const switchGame = () => {
    if (gameStarted) {
      endGame();
    } else {
      startGame();
    }
  };
</script>

<main>
  <button on:click={switchGame}>{gameStarted ? "End Game" : "New Game"}</button>
  <h1>{pageName}!</h1>
  {#if gameStarted}
    <Crossword />
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>
