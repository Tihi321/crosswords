<script lang="ts">
  import { ECrosswordInfo, type TCrosswordTable } from "../../utils";

  import Empty from "./Empty.svelte";
  import Letter from "./Letter.svelte";
  import Details from "./Details.svelte";
  import BasicContainer from "./BasicContainer.svelte";

  export let tableData: TCrosswordTable;

</script>

<div class="table">
  {#each tableData as tableRow}
    <div class="row">
      {#each tableRow as cellData}
        {#if cellData.char === ECrosswordInfo.EmptySpace}
          <BasicContainer><Empty transparent /></BasicContainer>
        {:else}
          <Details
            left={cellData.left && cellData.left.index && cellData.left.index}
            top={cellData.top && cellData.top.index && cellData.top.index}
            leftEnd={cellData.leftEnd}
            topEnd={cellData.topEnd}><Letter letter={cellData.char} /></Details
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
