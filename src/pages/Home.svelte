<script lang="ts">
  import { onMount } from "svelte";
  import Crossword from "../components/crossword/Crossword.svelte";
  import Menu from "../components/menu/Menu.svelte";
  import { useGame, useLocalSettings } from "../hooks";

  const { game } = useGame();
  const { setLocalSettings } = useLocalSettings();

  onMount(() => {
    setLocalSettings();
  });
</script>

{#if $game.started}
  <Crossword />
{:else}
  <Menu />
{/if}
