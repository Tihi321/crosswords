<script lang="ts">
  import BasicContainer from "./BasicContainer.svelte";

  export let left: number = undefined;
  export let top: number = undefined;

  export let leftEnd: number = undefined;
  export let topEnd: number = undefined;
</script>

<div class="container">
  <BasicContainer class="details">
    {#if top}
      <div class="detail top">
        {top}
      </div>
    {/if}
    <div class="content" class:left-end={leftEnd} class:top-end={topEnd}>
      <slot />
    </div>
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
  }

  .content {
    &.top-end {
      filter: drop-shadow(1px 0px 0px black);
    }
    &.left-end {
      filter: drop-shadow(0px 1px 0px black);
    }

    &.left-end.top-end {
      filter: drop-shadow(1px 0px 0px black) drop-shadow(0px 1px 0px black);
    }
  }

  .detail {
    position: absolute;
    z-index: 1;
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
    top: 50%;
    left: -10px;
    transform: translateY(-70%);
  }

  .top {
    top: -10px;
    left: 50%;
    transform: translateX(-60%);
  }
</style>
