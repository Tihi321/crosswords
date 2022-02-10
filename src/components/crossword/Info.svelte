<script lang="ts">
  import map from "lodash/map";
  import includes from "lodash/includes";
  import sortBy from "lodash/sortBy";
  import type { TDetails, TDetail } from "src/types";

  export let details: TDetails = {};
  export let successNames: string[] = [];
  $: sortedDetails = sortBy(details, (detail: TDetail) => detail.index) as TDetail[];
  $: wordsDetails = map(sortedDetails, (details: TDetail) => ({
    ...details,
    success: includes(successNames, details.name),
  })) as TDetail[];
</script>

<ul class="info">
  {#each wordsDetails as { index, description, success, name }}
    <li class="row">
      <div class="index" class:success>{index}</div>
      <div class="descrition">{description}-{name}-({name.length})</div>
    </li>
  {/each}
</ul>

<style lang="scss">
  @import "src/styles/all";
  .info {
    background-color: $details-bg-color;
    color: $text-color;
    padding: 10px;
    border-radius: 10px;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .row {
    display: flex;
    align-items: center;
  }

  .index {
    @extend %flex-centered;
    background-color: $details-index-color;
    border-radius: 50%;
    margin-right: 10px;
    width: 35px;
    height: 35px;
    font-weight: bold;
  }

  .success {
    background-color: $details-success-bg-color;
  }
</style>
