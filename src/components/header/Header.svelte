<script lang="ts">
  import Logo from "../common/Logo.svelte";
  import InfoIcon from "../icons/InfoIcon.svelte";
  import CogIcon from "../icons/CogIcon.svelte";
  import { useGame, useModals } from "../../hooks";
  import { EModals } from "../../constants";

  const { game } = useGame();
  const { openModal } = useModals();

  const openGameModal = () => {
    openModal(EModals.Game);
  };

  const openInfoModal = () => {
    openModal(EModals.Info);
  };
</script>

<header class="header">
  <div class="container">
    <div class="logo"><Logo /></div>
    <div class="buttons">
      {#if $game.started}
        <button class="icon-button" on:click={openGameModal}><CogIcon /></button>
      {/if}
      <button class="icon-button" on:click={openInfoModal}><InfoIcon /></button>
    </div>
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

  .buttons {
    @extend %flex-centered;
  }
  .icon-button {
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
