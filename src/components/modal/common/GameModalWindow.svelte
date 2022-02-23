<script lang="ts">
  import { t } from "svelte-i18n";
  import ModalWindow from "../common/ModalWindow.svelte";

  export let title: string;
  export let transparent: boolean = false;

  const toggleBackdrop = () => {
    transparent = !transparent;
  };
</script>

<span class="game-window">
  <ModalWindow on:close={toggleBackdrop} {title} closeTitle={$t("modal.labels.reveal")}>
    <div class="container">
      <slot />
    </div>
  </ModalWindow>
</span>

<style lang="scss">
  @import "src/styles/all";

  .container {
    display: flex;
    flex-direction: column;
  }

  .game-window {
    :global(.window) {
      max-width: $game-modal-width;
    }
  }
</style>
