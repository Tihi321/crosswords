<script lang="ts">
  import { onMount } from "svelte";
  import { generateSelector } from "tsl-utils";
  import { ECrosswordInfo, generateCrosswordsTable, type TCrosswordTable } from "../../utils";

  import { getRandomNameWords, getRandomizedWordsData, getCrosswordTableData } from "../../selectors";
  import type { TCrosswordStore } from "../../types";

  import { useApiWords, useCrossWords } from "../../hooks";
  import type { TWordArray } from "../../types";
  import Empty from "../table/Empty.svelte";
  import Letter from "../table/Letter.svelte";

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
    addCrosswordTable(
      generateCrosswordsTable({
        words: wordsData,
        names: namesWordsData,
      })
    );
  });
</script>

<div class="table">
  {#each tableDataArray as tableRow}
    <div class="row">
      {#each tableRow as cellData}
        {#if cellData.char === ECrosswordInfo.EmptySpace}
          <Empty />
        {:else}
          <Letter letter={cellData.char} />
        {/if}
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  @import "src/styles/all";
  .table {
    background-color: $crossword-bg-color;
    box-shadow: 2px 2px 2px 0 $crossword-shadow-color;
    padding: 2px;
  }

  .row {
    width: 100%;
    display: flex;
  }
</style>
