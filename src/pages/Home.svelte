<script lang="ts">
  import Crossword from "../components/crossword/Crossword.svelte";
  import Menu from "../components/menu/Menu.svelte";
  import { useGame } from "../hooks";

  const { game } = useGame();
</script>

{#if $game.started}
  <Crossword />
{:else}
  <Menu />
{/if}
