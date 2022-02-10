<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Backdrop from "./Backdrop.svelte";
  export let title: string;

  const dispatch = createEventDispatcher();

  function onClose() {
    dispatch("close");
  }
</script>

<Backdrop on:close={onClose}>
  <div class="window">
    <h2 class="title window-item">{title}</h2>
    <div class="content">
      <slot />
    </div>
    <button class="close-button window-item" on:click={onClose}>Close modal</button>
  </div>
</Backdrop>

<style lang="scss">
  @import "src/styles/all";
  .window {
    background-color: $modal-window-bg-color;
    min-width: 400px;
    min-height: 400px;
    max-width: 600px;
    max-height: 600px;
    border-radius: 5px;
    display: grid;
    grid-template-rows: min-content 1fr min-content;
  }
  .content {
    padding: 15px;
  }

  .window-item {
    color: $default-text-color;
    font-weight: normal;
    padding: 5px;
    text-align: center;
  }

  .title {
    background-color: $modal-window-title-bg-color;
    margin: 0;
    border-radius: 5px 5px 0 0;
  }

  .close-button {
    padding: 5px;
    width: 100%;
    border-radius: 0 0 5px 5px;
    background-color: $modal-window-close-bg-color;
  }
</style>
