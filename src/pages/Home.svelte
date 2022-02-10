<script lang="ts">
  import { onMount } from "svelte";
  import Crossword from "../components/crossword/Crossword.svelte";
  import Menu from "../components/menu/Menu.svelte";
  import { useGame, useLocalSettings } from "../hooks";

  const { game } = useGame();
  const { setLocalSettings } = useLocalSettings();

  let gameStarted: boolean;

  game.subscribe((value) => {
    gameStarted = value.started;
  });

  onMount(() => {
    setLocalSettings();
  });
</script>

<div class="home" class:centered={!gameStarted}>
  {#if gameStarted}
    <Crossword />
  {:else}
    <Menu />
  {/if}
</div>

<style lang="scss">
  @import "src/styles/all";
  .home {
    flex: 1;
  }

  .centered {
    @extend %flex-centered;
  }
</style>
