<script lang="ts">
  import includes from "lodash/includes";
  import map from "lodash/map";
  import { createEventDispatcher } from "svelte";
  import { ECrosswordInfo, type TCrosswordTable, type TCrosswordItems, type TCrosswordItem } from "../../utils";
  import type { TWordInputData } from "../../types";

  import Empty from "./Empty.svelte";
  import Letter from "./Letter.svelte";
  import Details from "./Details.svelte";
  import BasicContainer from "./BasicContainer.svelte";
  
  export let tableData: TCrosswordTable;
  export let rowIndexes: number[] = [];
  export let columnIndexes: number[] = [];

  $: tableDataWithShow = map(tableData, (rowData: TCrosswordItems, rowIndex: number) => map(rowData, (itemData: TCrosswordItem, itemIndex: number) => ({
    ...itemData,
    show: includes(rowIndexes, rowIndex) && includes(columnIndexes, itemIndex)
  }))) as TCrosswordTable
  
  const dispatch = createEventDispatcher();
  
  function onInput({value, rowIndex, itemIndex} : TWordInputData) {
    dispatch("input", {
      value,
      rowIndex,
      itemIndex
    });
  }

</script>

<div class="table">
  {#each tableDataWithShow as tableRow, rowIndex}
    <div class="row">
      {#each tableRow as { left, char, top, leftEnd, topEnd, show }, itemIndex}
        {#if char === ECrosswordInfo.EmptySpace}
          <BasicContainer><Empty transparent /></BasicContainer>
        {:else}
          <Details
            left={left && left.index && left.index}
            top={top && top.index && top.index}
            {leftEnd}
            {topEnd}
            ><Letter
              on:input={(event) => onInput({ value: event.detail.value, rowIndex, itemIndex })}
              success={show}
              {show}
              letter={char}
            /></Details
          >
        {/if}
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  @import "src/styles/all";
  .table {
    filter: $crossword-divider-filter;
    padding: 2px;
  }

  .row {
    display: flex;
  }
</style>
