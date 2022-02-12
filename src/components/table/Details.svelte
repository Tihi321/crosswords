<script lang="ts">
  import BasicContainer from "./BasicContainer.svelte";
  import Tooltip from "../tooltip/Tooltip.svelte";
  import type { TCrosswordWord } from "../../types";
  import { ETooltipPlacement } from "../../constants";

  export let left: TCrosswordWord = undefined;
  export let top: TCrosswordWord = undefined;

  export let leftEnd: boolean = undefined;
  export let topEnd: boolean = undefined;

  $: leftIndex = left && left.index;
  $: topIndex = top && top.index;
</script>

<div class="container" class:top-detail={Boolean(top)} class:left-detail={Boolean(left)}>
  <BasicContainer class="details">
    {#if topIndex}
      <Tooltip hideArrow placement={ETooltipPlacement.Bottom}>
        <span slot="tooltip">
          {top.detail}
        </span>
        <div class="detail top">
          {topIndex}
        </div>
      </Tooltip>
    {/if}
    <div class="content" class:left-end={leftEnd} class:top-end={topEnd}>
      <slot />
    </div>
    {#if leftIndex}
      <Tooltip hideArrow placement={ETooltipPlacement.Bottom}>
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

      &:hover {
        background-color: $crossword-details-effects-color;
      }
    }

    :global(.tooltip-container) {
      position: static;
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
  }

  .detail {
    position: absolute;
    z-index: 1;
    font-size: $detail-font-size;
    background-color: $crossword-details-bg-color;
    color: $crossword-details-color;
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
