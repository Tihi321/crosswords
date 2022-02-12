<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Arrow from "../icons/Arrow.svelte";
  import { useAvoidElementCallback } from "../../hooks";
  import { ETooltipPlacement, ETooltipTrigger } from "../../constants";
  const slotName = "tooltip-slot";

  let visible: boolean = false;
  export let trigger: ETooltipTrigger = ETooltipTrigger.Hover;
  export let placement: ETooltipPlacement = ETooltipPlacement.Bottom;
  export let hideArrow: boolean = false;

  const { onEventCallback } = useAvoidElementCallback({
    datasetName: "tooltip",
    slotName,
    callback: () => {
      if (open) {
        visible = false;
      }
    },
  });

  const onTriggerClick = () => {
    if (trigger === ETooltipTrigger.Click) {
      visible = !visible;
    }
  };
  const onMouseEnter = () => {
    if (trigger === ETooltipTrigger.Hover) {
      visible = true;
    }
  };
  const onMouseLeave = () => {
    if (trigger === ETooltipTrigger.Hover) {
      visible = false;
    }
  };

  onMount(() => {
    if (trigger === ETooltipTrigger.Click) {
      document.addEventListener("mousedown", onEventCallback);
    }
  });

  onDestroy(() => {
    if (trigger === ETooltipTrigger.Click) {
      document.removeEventListener("click", onEventCallback);
    }
  });
</script>

<div
  class="tooltip-container"
  class:visible
  data-dropdown={slotName}
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}
  on:click={onTriggerClick}
>
  <slot />
  {#if visible}
    <div
      class="tooltip"
      class:top={placement === ETooltipPlacement.Top}
      class:bottom={placement === ETooltipPlacement.Bottom}
      class:left={placement === ETooltipPlacement.Left}
      class:right={placement === ETooltipPlacement.Right}
      class:hide-arrow={hideArrow}
    >
      <slot name="tooltip" />
      {#if !hideArrow}
        <div
          class="arrow-container"
          class:top={placement === ETooltipPlacement.Top}
          class:bottom={placement === ETooltipPlacement.Bottom}
          class:left={placement === ETooltipPlacement.Left}
          class:right={placement === ETooltipPlacement.Right}
        >
          <Arrow />
        </div>
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  @import "src/styles/all";

  .tooltip-container {
    cursor: pointer;
    position: relative;
    display: block;
  }

  .tooltip {
    position: absolute;
    z-index: 999;
    top: initial;
    left: initial;
    right: initial;
    bottom: initial;
    background-color: $tooltip-bg-color;
    color: $tooltip-color;
    filter: drop-shadow(0 0 2px $tooltip-filter-color);
    border-radius: 3px;
    opacity: 0.9;
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    padding: 8px;
    max-width: 600px;
    width: max-content;

    &.left {
      top: 50%;
      right: 100%;
      transform: translate(-12px, -50%);

      &.hide-arrow {
        transform: translate(-4px, -50%);
      }
    }

    &.right {
      top: 50%;
      left: 100%;
      transform: translate(12px, -50%);

      &.hide-arrow {
        transform: translate(4px, -50%);
      }
    }

    &.bottom {
      top: 100%;
      left: 50%;
      transform: translate(-50%, 12px);

      &.hide-arrow {
        transform: translate(-50%, 4px);
      }
    }

    &.top {
      bottom: 100%;
      left: 50%;
      transform: translate(-50%, -12px);

      &.hide-arrow {
        transform: translate(-50%, -4px);
      }
    }
  }

  .arrow-container {
    cursor: pointer;
    position: absolute;

    &.right {
      bottom: calc(50% - 2px);
      left: -10px;
      transform: rotate(150deg) translate(0%, -50%);
    }

    &.left {
      bottom: calc(50% - 2px);
      right: -10px;
      transform: rotate(210deg) translate(0%, -50%);
    }

    &.bottom {
      top: -10px;
      left: 50%;
      transform: rotate(0) translate(-50%, 0);
    }

    &.top {
      bottom: -10px;
      left: 50%;
      transform: rotate(180deg) translate(50%, 0);
    }

    :global(.arrow-icon-path) {
      fill: $tooltip-bg-color;
    }
  }
</style>
