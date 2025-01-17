<script lang="ts">
  import BasicContainer from "./BasicContainer.svelte";
  import type { TCrosswordWord, TFocusSide } from "../../types";
  import Tooltip from "./Tooltip.svelte";

  export let left: TCrosswordWord = undefined;
  export let top: TCrosswordWord = undefined;

  export let leftEnd: boolean = undefined;
  export let topEnd: boolean = undefined;

  export let focusSide: TFocusSide = undefined;
  export let showDetails: boolean = true;

  $: leftIndex = left && left.index;
  $: topIndex = top && top.index;
</script>

<div class="container" class:top-detail={Boolean(top)} class:left-detail={Boolean(left)}>
  <BasicContainer class="details">
    {#if topIndex}
      <Tooltip show={showDetails}>
        <span slot="tooltip">
          {top.detail}
        </span>
        <div class="detail top">
          {topIndex}
        </div>
      </Tooltip>
    {/if}
    <div
      class="content"
      class:left-end={leftEnd}
      class:top-end={topEnd}
      class:left-focus={focusSide === "Left"}
      class:top-focus={focusSide === "Top"}
    >
      <slot />
    </div>
    {#if leftIndex}
      <Tooltip show={showDetails}>
        <span slot="tooltip">
          {left.detail}
        </span>
        <div class="detail left">
          {leftIndex}
        </div>
      </Tooltip>
    {/if}
  </BasicContainer>
</div>

<style lang="scss">
  @import "src/styles/all";

  .container {
    :global(.details) {
      position: relative;
      cursor: default;

      &:hover {
        background-color: $crossword-details-effects-color;
      }
    }

    :global(.tooltip-container) {
      position: static !important;
    }
  }

  .content {
    &.top-end {
      box-shadow: 0 -4px 0 0 $crossword-details-effects-color inset;
    }
    &.left-end {
      box-shadow: -4px 0 0 0 $crossword-details-effects-color inset;
    }

    &.left-end.top-end {
      box-shadow: -4px -4px 0 0 $crossword-details-effects-color inset;
    }

    &.top-focus {
      box-shadow: 0 4px 0 0 $crossword-details-focus-color inset;
    }
    &.left-focus {
      box-shadow: 4px 0 0 0 $crossword-details-focus-color inset;
    }
  }

  .detail {
    position: absolute;
    z-index: 1;
    font-size: $tiny-font-size;
    background-color: $crossword-details-bg-color;
    color: $crossword-details-color;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: $detail-number-size;
    width: $detail-number-size;
    font-weight: bold;
  }

  .left {
    top: 50%;
    right: 100%;
    transform: translate($detail-half-size, -50%);
  }

  .top {
    bottom: 100%;
    right: 50%;
    transform: translate(50%, $detail-half-size);
  }
</style>
