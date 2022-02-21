<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import type { TSelectedItem, TSelectedItems } from "../../../types";

  export let items: TSelectedItems;
  export let selected: TSelectedItem;

  const svelteDispatch = createEventDispatcher();

  const onChange = (item: TSelectedItem) => {
    if (!selected || selected.id !== item.id) {
      svelteDispatch("change", item);
    }
  };
</script>

<ul class="select">
  {#each items as item}
    <li on:click={() => onChange(item)} class="option" class:selected={item.id === selected.id}>
      {item.value}
    </li>
  {/each}
</ul>

<style lang="scss">
  @import "src/styles/all";

  .select {
    display: flex;
    align-items: center;
    margin: 0;
    margin-left: -10px;
  }

  .option {
    @include contrast-button("small");
    cursor: pointer;
    text-align: center;
    padding: 5px 8px;
    border-radius: 5px;
    flex: 1;
    border: 1px solid;
    margin-left: 10px;
  }

  .selected {
    color: $active-btn-color;
    background-color: $active-btn-bg-color;
    border: 1px solid $active-btn-bg-color;
  }
</style>
