<script lang="ts">
  import includes from "lodash/includes";
  import map from "lodash/map";
  import { createEventDispatcher } from "svelte";
  import type { TWordInputData, TCrosswordTable } from "../../types";
  import { ECrosswordInfo } from "../../constants";
  import { addShowToTableRowItemLetters } from "../../utils";

  import Empty from "./Empty.svelte";
  import Letter from "./Letter.svelte";
  import Details from "./Details.svelte";
  import BasicContainer from "./BasicContainer.svelte";

  export let tableData: TCrosswordTable;
  export let successIndexes: Array<Array<number>> = [];

  $: tableDataWithShow = addShowToTableRowItemLetters(tableData, successIndexes) as TCrosswordTable;

  const dispatch = createEventDispatcher();

  const onInput = ({ value, rowIndex, itemIndex }: TWordInputData) => {
    dispatch("input", {
      value,
      rowIndex,
      itemIndex,
    });
  };
</script>

<div class="table">
  {#each tableDataWithShow as tableRow, rowIndex}
    <div class="row">
      {#each tableRow as { left, char, top, leftEnd, topEnd, show }, itemIndex}
        {#if char === ECrosswordInfo.EmptySpace}
          <BasicContainer><Empty /></BasicContainer>
        {:else}
          <Details left={left && left} top={top && top} {leftEnd} {topEnd}
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
    padding: 2px;
  }

  .row {
    display: flex;
  }
</style>
