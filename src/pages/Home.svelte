<script lang="ts">
  import Crossword from "../components/crossword/Crossword.svelte";
  import Home from "../components/home/Home.svelte";
  import { useGame } from "../hooks";

  const { game } = useGame();
</script>

{#if $game.started}
  <Crossword />
{:else}
  <Home />
{/if}
