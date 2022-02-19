<script lang="ts">
  import Backdrop from "../common/Backdrop.svelte";

  export let title: string;
  export let transparent: boolean = false;

  const toggleBackdrop = () => {
    transparent = !transparent;
  };
</script>

<Backdrop on:click={toggleBackdrop}>
  <div class="container">
    <h2 class="title">{title}</h2>
    <slot />
  </div>
</Backdrop>

<style lang="scss">
  @import "src/styles/all";

  .container {
    display: flex;
    flex-direction: column;
    background-color: $game-modal-bg-color;
    height: $game-modal-window-height;
    width: $game-modal-window-width;
    border-radius: 5px;
    filter: $shadow-color-filter;
  }

  .title {
    margin: 0;
    text-align: center;
    background: $game-modal-title-bg-color;
    color: $game-modal-title-color;
    padding: 15px 5px;
    border-radius: 5px 5px 0 0;
  }
</style>
