<script lang="ts">
  import ModalWindow from "../common/ModalWindow.svelte";

  export let title: string;
  export let transparent: boolean = false;

  const toggleBackdrop = () => {
    transparent = !transparent;
  };
</script>

<ModalWindow on:close={toggleBackdrop} {title} showClose={false}>
  <div class="container">
    <slot />
  </div>
</ModalWindow>

<style lang="scss">
  @import "src/styles/all";

  .container {
    display: flex;
    flex-direction: column;
    background-color: $game-modal-bg-color;
    max-width: $game-modal-content-width;
    border-radius: 5px;
  }
</style>
