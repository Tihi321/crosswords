<script lang="ts">
  import { onMount } from "svelte";
  import { generateSelector } from "tsl-utils";
  import { ECrosswordInfo, generateCrosswordsTable, type TCrosswordTable, ECrosswordType } from "../../utils";

  import { getRandomNameWords, getRandomizedWordsData, getCrosswordTableData } from "../../selectors";
  import type { TCrosswordStore } from "../../types";

  import { useApiWords, useCrossWords } from "../../hooks";
  import type { TWordArray } from "../../types";
  import Empty from "../table/Empty.svelte";
  import Letter from "../table/Letter.svelte";
  import Details from "../table/Details.svelte";
  import BasicContainer from "../table/BasicContainer.svelte";

  const { apiWords } = useApiWords();
  const { addCrosswordTable, crossWord } = useCrossWords();

  let apiWordsState: any;
  let crosswordState: TCrosswordStore;

  apiWords.subscribe((value) => {
    apiWordsState = value;
  });

  crossWord.subscribe((value: TCrosswordStore) => {
    crosswordState = value;
  });

  $: stateSelector = generateSelector(apiWordsState);
  $: crosswordStateSelector = generateSelector(crosswordState);

  $: wordsData = getRandomizedWordsData(stateSelector) as TWordArray;
  $: namesWordsData = getRandomNameWords(stateSelector) as TWordArray;
  $: tableDataArray = getCrosswordTableData(crosswordStateSelector) as TCrosswordTable;

  onMount(() => {
    const { table } = generateCrosswordsTable({
        words: wordsData,
        names: namesWordsData,
      });

    addCrosswordTable(table);
  });
</script>

<div class="table">
  {#each tableDataArray as tableRow}
    <div class="row">
      {#each tableRow as cellData}
        {#if cellData.char === ECrosswordInfo.EmptySpace}
          <BasicContainer><Empty transparent /></BasicContainer>
        {:else}
          <Details
            left={cellData.left && cellData.left.index && cellData.left.index}
            top={cellData.top && cellData.top.index && cellData.top.index}
            ><Letter letter={cellData.char} /></Details
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
    width: 100%;
    display: flex;
  }
</style>
