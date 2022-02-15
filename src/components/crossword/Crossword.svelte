<script lang="ts">
  import { onMount } from "svelte";
  import type { TWordInputData } from "../../types";

  import {
    useApiWords,
    useCrossWord,
    useDevSettings,
    useCrosswordGame,
    useGameSettings,
  } from "../../hooks";
  import { isEasyDifficulty } from "../../selectors";
  import Table from "../table/Table.svelte";
  import Info from "./Info.svelte";

  const { apiWords } = useApiWords();
  const { devSettings } = useDevSettings();
  const { generateNewCrosswordData, getTableData } = useCrosswordGame();
  const { crossWord, updateCrosswordInput } = useCrossWord();
  const { gameSettings } = useGameSettings();

  $: crosswordData = getTableData($crossWord);
  $: showWordsDetails = isEasyDifficulty($gameSettings);

  onMount(() => {
    generateNewCrosswordData($apiWords, $devSettings);
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

  {#if showWordsDetails}
    <div class="info">
      <Info details={crosswordData.wordDetails} successNames={crosswordData.successWordsNames} />
    </div>
  {/if}
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
