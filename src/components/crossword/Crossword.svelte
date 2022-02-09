<script lang="ts">
  import { onMount } from "svelte";
  import { generateSelector } from "tsl-utils";
  import { generateCrosswordsTable, getCrosswordData, type TCrosswordTable } from "../../utils";

  import { getRandomizedWordsData, getCrosswordTableData, getCrosswordTableDetails, getCrosswordTableInputs, getCrosswordTableWords } from "../../selectors";
  import type { TCrosswordStore, TDetails, TWordInputData, TWordInputs, TWordsInfo } from "../../types";

  import { useApiWords, useCrossWords } from "../../hooks";
  import type { TWordArray } from "../../types";
  import Table from "../table/Table.svelte";
  import Info from "./Info.svelte";

  const { apiWords } = useApiWords();
  const { addCrosswordTable, addCrosswordDetails, crossWord, updateCrosswordInput, addCrosswordWords } = useCrossWords();

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
  $: wordsDetailsArray = getCrosswordTableDetails(crosswordStateSelector) as TDetails;
  $: inputsState = getCrosswordTableInputs(crosswordStateSelector) as TWordInputs;
  $: wordsInfo = getCrosswordTableWords(crosswordStateSelector) as TWordsInfo;

  $: data = getCrosswordData({
    tableData: tableDataArray,
    wordDetails: wordsDetailsArray,
    inputsState: inputsState,
    wordsInfo: wordsInfo
  });

  onMount(() => {
    const { table, details, words } = generateCrosswordsTable({
        words: wordsData
      });

    addCrosswordWords(words);
    addCrosswordDetails(details);
    addCrosswordTable(table);
  });

  function onInput(event : any) {
    updateCrosswordInput(event.detail as TWordInputData);
  }
</script>

<div class="container">
  <Table
    rowIndexes={data.successRowIndex}
    columnIndexes={data.successColumnIndex}
    tableData={data.tableData}
    on:input={onInput}
  />
  <div class="info">
    <Info details={data.wordDetails} successNames={data.successWordsNames} />
  </div>
</div>

<style lang="scss">
  @import "src/styles/all";
  .container {
    padding-top: 20px;
    display: flex;
  }

  .info {
    padding-left: 50px;
  }
</style>
