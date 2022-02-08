<script lang="ts">
  import Crossword from "../components/crossword/Crossword.svelte";
  import { useGame } from "../hooks";

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

<div>
  <div class="header">
    <button on:click={switchGame}>{gameStarted ? "End Game" : "New Game"}</button>
  </div>
  <div class="table">
    {#if gameStarted}
      <Crossword />
    {/if}
  </div>
</div>

<style>
  .header {
    padding: 10px 0;
    text-align: center;
  }
  .table {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
