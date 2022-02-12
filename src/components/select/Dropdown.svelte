<script lang="ts">
  import isEqual from "lodash/isEqual";
  import { onDestroy, onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import Arrow from "../icons/Arrow.svelte";
  import { useAvoidElementCallback } from "../../hooks";
  import type { TDropdownItems, TDropdownItem } from "../../types";

  const dispatch = createEventDispatcher();
  const slotName = "dropdown-slot";

  export let open: boolean = false;
  export let selected: TDropdownItem = undefined;
  export let items: TDropdownItems = [];

  const { onEventCallback } = useAvoidElementCallback({
    datasetName: "dropdown",
    slotName,
    callback: () => {
      if (open) {
        open = false;
      }
    },
  });

  const onOpen = () => {
    open = !open;
  };

  const onChange = (item: TDropdownItem) => {
    if (!selected || !isEqual(selected.id, item.id)) {
      dispatch("change", item);
    }

    open = false;
  };

  onMount(() => {
    document.addEventListener("click", onEventCallback);
  });

  onDestroy(() => {
    document.removeEventListener("click", onEventCallback);
  });
</script>

<div class="container" class:open data-dropdown={slotName}>
  <div class="title" on:click={onOpen}>
    <div class="selected">
      {#if selected}
        {selected.value}
      {:else}
        -
      {/if}
    </div>
    <div class="arrow" class:open>
      <Arrow />
    </div>
  </div>
  {#if open}
    <ul class="items">
      {#each items as item}
        <li class="item" on:click={() => onChange(item)}>
          {item.value}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss">
  @import "src/styles/all";
  .container {
    position: relative;
    color: $select-color;
    background-color: $select-bg-color;
    width: 100%;
    border: 1px solid $select-border-color;
    border-radius: 5px;

    &.open {
      z-index: 1;
    }
  }

  .title {
    font-size: 14px;
    line-height: 18px;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  .arrow {
    display: flex;
    align-items: center;
    width: 12px;
    height: 10px;
    margin-left: 8px;
    transition: transform 0.2s ease;
    &.open {
      transform: rotate(180deg);
    }

    :global(.arrow-icon-path) {
      fill: $select-icon-color;
    }
  }

  .items {
    position: absolute;
    margin: 4px 0 0 0;
    z-index: 1;
    left: 0;
    right: 0;
    max-height: 250px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    background-color: inherit;
    border-radius: inherit;
    border: 1px solid $select-border-color;
  }

  .item {
    font-size: 14px;
    line-height: 18px;
    cursor: pointer;
    padding: 10px 20px;
    text-align: left;

    &:hover {
      background-color: $select-hover-color;
    }
  }
</style>
