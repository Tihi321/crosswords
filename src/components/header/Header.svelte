<script lang="ts">
  import Logo from "../common/Logo.svelte";
  import CogIcon from "../icons/CogIcon.svelte";
  import { useGame, useModals } from "../../hooks";
  import { EModals } from "../../constants";

  const { game } = useGame();
  const { openModal } = useModals();

  const openGameModal = () => {
    openModal(EModals.Game);
  };
</script>

<header class="header">
  <div class="container">
    <div class="logo"><Logo /></div>
    {#if $game.started}
      <button class="game-modal-button" on:click={openGameModal}><CogIcon /></button>
    {/if}
  </div>
</header>

<style lang="scss">
  @import "src/styles/all";
  .header {
    height: auto;
  }

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .game-modal-button {
    @extend %flex-centered;
    width: 40px;
    height: 40px;
    transition: transform 0.2s ease;

    &:hover {
      transform: rotate(180deg);
    }
  }
  .logo {
    max-width: 50px;
  }
</style>
