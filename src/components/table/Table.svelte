<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type {
    TWordInputData,
    TCrosswordTable,
    TLettersInfo,
    TCrosswordItem,
    TFocusChar,
  } from "../../types";
  import { ECrosswordInfo, EModals } from "../../constants";
  import { addCharInfo, checkIfInputExist } from "../../utils";
  import { useModals, useGameSettings } from "../../hooks";
  import { isNotHardDifficulty } from "../../selectors";

  const { openModal } = useModals();
  const { gameSettings } = useGameSettings();

  import Empty from "./Empty.svelte";
  import Letter from "./Letter.svelte";
  import Details from "./Details.svelte";
  import BasicContainer from "./BasicContainer.svelte";

  export let tableData: TCrosswordTable;
  export let lettersState: TLettersInfo = {};
  export let wordsUsed: boolean = false;
  export let gameSuccess: boolean = false;

  let focusedItem: TFocusChar = {
    rowIndex: 0,
    itemIndex: 0,
  };

  $: showWordsDetails = isNotHardDifficulty($gameSettings);

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

  $: tableDataWithShow = addCharInfo(tableData, lettersState, focusedItem) as TCrosswordTable;

  const dispatch = createEventDispatcher();

  const setFocus = (rowIndex, itemIndex) => {
    const nextLeftItem =
      tableData[rowIndex] && checkIfInputExist(tableData[rowIndex][itemIndex + 1]);

    if (nextLeftItem) {
      focusedItem = {
        rowIndex,
        itemIndex: itemIndex + 1,
      };
    } else {
      const nextBottomItem =
        tableData[rowIndex + 1] && checkIfInputExist(tableData[rowIndex + 1][itemIndex]);

      if (nextBottomItem) {
        focusedItem = {
          rowIndex: rowIndex + 1,
          itemIndex: itemIndex,
        };
      }
    }
  };

  const onInput = ({ value, rowIndex, itemIndex }: TWordInputData) => {
    setFocus(rowIndex, itemIndex);
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
      {#each tableRow as { left, char, shownChar, top, leftEnd, topEnd, show, success, included, focus }, itemIndex}
        {#if char === ECrosswordInfo.EmptySpace}
          <BasicContainer><Empty /></BasicContainer>
        {:else}
          <Details
            showDetails={showWordsDetails}
            left={left && left}
            top={top && top}
            {leftEnd}
            {topEnd}
            ><Letter
              on:input={(event) => onInput({ value: event.detail.value, rowIndex, itemIndex })}
              {success}
              {focus}
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
    padding: $table-padding;
  }

  .row {
    display: flex;
  }
</style>
