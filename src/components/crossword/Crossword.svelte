<script lang="ts">
  import { onMount } from "svelte";
  import { generateSelector } from "tsl-utils";
  import { generateCrosswordsTable, type TCrosswordTable, type TDetail } from "../../utils";

  import { getRandomizedWordsData, getCrosswordTableData, getCrosswordTableDetails } from "../../selectors";
  import type { TCrosswordStore } from "../../types";

  import { useApiWords, useCrossWords } from "../../hooks";
  import type { TWordArray } from "../../types";
  import Table from "../table/Table.svelte";

  const { apiWords } = useApiWords();
  const { addCrosswordTable, addCrosswordDetails, crossWord } = useCrossWords();

  let apiWordsState: any;
  let crosswordState: TCrosswordStore;

  apiWords.subscribe((value) => {
    apiWordsState = value;
  });

  crossWord.subscribe((value: TCrosswordStore) => {
    crosswordState = value;
  });

  $: wordsStateSelector = generateSelector(apiWordsState);
  $: crosswordStateSelector = generateSelector(crosswordState);

  $: wordsData = getRandomizedWordsData(wordsStateSelector) as TWordArray;
  $: tableDataArray = getCrosswordTableData(crosswordStateSelector) as TCrosswordTable;
  $: wordsDetailsArray = getCrosswordTableDetails(crosswordStateSelector) as TDetail[];

  onMount(() => {
    const { table, details } = generateCrosswordsTable({
        words: wordsData
      });

    addCrosswordDetails(details);
    addCrosswordTable(table);
  });
</script>

<div class="container">
  <Table tableData={tableDataArray} />
  <ul class="info">
    {#each wordsDetailsArray as infoRow}
      <li class="row">
        {infoRow.index}: {infoRow.description}
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  @import "src/styles/all";
  .container {
    padding-top: 20px;
  }
</style>
