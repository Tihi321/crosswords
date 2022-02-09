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
      <div class="descrition">{description}-{name}</div>
    </li>
  {/each}
</ul>

<style lang="scss">
  @import "src/styles/all";
  .info {
    padding: 10px;
    background-color: $details-bg-color;
    border-radius: 10px;
    color: $text-color;
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
