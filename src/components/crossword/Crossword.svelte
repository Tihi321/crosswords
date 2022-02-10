<script lang="ts">
  import { onMount } from "svelte";
  import { generateSelector } from "tsl-utils";
  import { generateCrosswordsTable } from "../../utils";

  import { getRandomizedWordsData, getSettingOptions } from "../../selectors";
  import type {
    TCrosswordStore,
    TWordInputData,
    TSettingsStore,
    TSettingOptions,
  } from "../../types";

  import { useApiWords, useCrossWord, useSettings } from "../../hooks";
  import type { TWordArray } from "../../types";
  import Table from "../table/Table.svelte";
  import Info from "./Info.svelte";

  const { apiWords } = useApiWords();
  const { settings } = useSettings();
  const {
    addCrosswordTable,
    addCrosswordDetails,
    crossWord,
    updateCrosswordInput,
    addCrosswordWords,
    generateTableData,
  } = useCrossWord();

  let settingsState: TSettingsStore;
  let apiWordsState: any;
  let crosswordState: TCrosswordStore;

  apiWords.subscribe((value) => {
    apiWordsState = value;
  });

  settings.subscribe((value: TSettingsStore) => {
    settingsState = value;
  });

  crossWord.subscribe((value: TCrosswordStore) => {
    crosswordState = value;
  });

  $: wordsStateSelector = generateSelector(apiWordsState);
  $: settingsStateSelector = generateSelector(settingsState);
  $: wordsData = getRandomizedWordsData(wordsStateSelector) as TWordArray;
  $: settingsData = getSettingOptions(settingsStateSelector) as TSettingOptions;

  $: data = generateTableData(crosswordState);

  onMount(() => {
    const { table, details, words } = generateCrosswordsTable({
      words: wordsData,
      settings: settingsData,
    });

    addCrosswordWords(words);
    addCrosswordDetails(details);
    addCrosswordTable(table);
  });

  function onInput(event: any) {
    updateCrosswordInput(event.detail as TWordInputData);
  }
</script>

<div class="container">
  <div class="table">
    <Table
      rowIndexes={data.successRowIndex}
      columnIndexes={data.successColumnIndex}
      tableData={data.tableData}
      on:input={onInput}
    />
  </div>
  <div class="info">
    <Info details={data.wordDetails} successNames={data.successWordsNames} />
  </div>
</div>

<style lang="scss">
  @import "src/styles/all";
  .container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .table {
    margin-bottom: 20px;
  }

  .info {
    max-width: 900px;
  }
</style>
