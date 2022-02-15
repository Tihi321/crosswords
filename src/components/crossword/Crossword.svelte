<script lang="ts">
  import { onMount } from "svelte";
  import type { TWordInputData } from "../../types";

  import { useApiWords, useCrossWord, useSettings, useCrosswordGame } from "../../hooks";
  import Table from "../table/Table.svelte";
  import Info from "./Info.svelte";

  const { apiWords } = useApiWords();
  const { settings } = useSettings();
  const { generateNewCrosswordData, getTableData } = useCrosswordGame();
  const { crossWord, updateCrosswordInput } = useCrossWord();

  $: crosswordData = getTableData($crossWord);

  onMount(() => {
    generateNewCrosswordData($apiWords, $settings);
  });

  const onInput = (event: any) => {
    updateCrosswordInput(event.detail as TWordInputData);
  };
</script>

<div class="table-container">
  <div class="table">
    <Table
      wordsUsed={crosswordData.allWordsUsed}
      gameSuccess={crosswordData.allWordsSuccess}
      lettersState={crosswordData.lettersState}
      tableData={crosswordData.tableData}
      on:input={onInput}
    />
  </div>
  <div class="info">
    <Info details={crosswordData.wordDetails} successNames={crosswordData.successWordsNames} />
  </div>
</div>

<style lang="scss">
  @import "src/styles/all";

  .table-container {
    height: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 50px;
  }

  .table {
    margin-bottom: 20px;
  }

  .info {
    flex: 1;
    max-width: 1024px;
  }
</style>
