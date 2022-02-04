<script lang="ts">
  import BasicContainer from "./BasicContainer.svelte";

  export let left: number = undefined;
  export let top: number = undefined;
</script>

<div class="container">
  <BasicContainer class="details">
    {#if top}
      <div class="detail top">
        {top}
      </div>
    {/if}
    <slot />
    {#if left}
      <div class="detail left">
        {left}
      </div>
    {/if}
  </BasicContainer>
</div>

<style lang="scss">
  @import "src/styles/all";

  .container :global(.details) {
    position: relative;
    background-color: $boulder-color;
    box-shadow: -1px -1px 0px 0px $crossword-shadow-color inset;
  }

  .detail {
    font-size: $detail-font-size;
    background-color: $rhino-color;
    color: $semi-light-color;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15px;
    width: 15px;
    font-weight: bold;
  }

  .left {
    position: absolute;
    top: 50%;
    left: -10px;
    transform: translateY(-70%);
  }

  .top {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-60%);
  }
</style>
