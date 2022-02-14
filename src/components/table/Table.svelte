<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { TWordInputData, TCrosswordTable, TLettersInfo } from "../../types";
  import { ECrosswordInfo, EModals } from "../../constants";
  import { addCharInfo } from "../../utils";
  import { useModals } from "../../hooks";

  const { openModal } = useModals();

  import Empty from "./Empty.svelte";
  import Letter from "./Letter.svelte";
  import Details from "./Details.svelte";
  import BasicContainer from "./BasicContainer.svelte";

  export let tableData: TCrosswordTable;
  export let lettersState: TLettersInfo = {};
  export let wordsUsed: boolean = false;
  export let gameSuccess: boolean = false;

  $: {
    if (wordsUsed && !gameSuccess) {
      openModal(EModals.Retry);
    }
  }

  $: {
    if (gameSuccess) {
      openModal(EModals.Victory);
    }
  }

  $: tableDataWithShow = addCharInfo(tableData, lettersState) as TCrosswordTable;

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
      {#each tableRow as { left, char, shownChar, top, leftEnd, topEnd, show, success, included }, itemIndex}
        {#if char === ECrosswordInfo.EmptySpace}
          <BasicContainer><Empty /></BasicContainer>
        {:else}
          <Details left={left && left} top={top && top} {leftEnd} {topEnd}
            ><Letter
              on:input={(event) => onInput({ value: event.detail.value, rowIndex, itemIndex })}
              {success}
              secondary={included}
              {show}
              letter={shownChar}
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
