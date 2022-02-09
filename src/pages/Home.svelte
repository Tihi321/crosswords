<script lang="ts">
  import Crossword from "../components/crossword/Crossword.svelte";
  import Menu from "../components/menu/Menu.svelte";
  import { useGame } from "../hooks";

  const { endGame, game } = useGame();

  let gameStarted: boolean;

  game.subscribe((value) => {
    gameStarted = value.started;
  });
</script>

<div class="home">
  {#if gameStarted}
    <div class="crosswords">
      <button on:click={endGame}>{"End Game and back to menu"}</button>
      <div class="table">
        <Crossword />
      </div>
    </div>
  {:else}
    <div class="menu">
      <Menu />
    </div>
  {/if}
</div>

<style>
  .table {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
