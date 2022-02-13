<script lang="ts">
  import { t } from "svelte-i18n";
  import map from "lodash/map";
  import includes from "lodash/includes";
  import sortBy from "lodash/sortBy";
  import { Accordion } from "ts-components-library";

  import type { TDetails, TDetail } from "../../types";

  export let details: TDetails = {};
  export let successNames: string[] = [];
  $: sortedDetails = sortBy(details, (detail: TDetail) => detail.index) as TDetail[];
  $: wordsDetails = map(sortedDetails, (details: TDetail) => ({
    ...details,
    success: includes(successNames, details.name),
  })) as TDetail[];
</script>

<Accordion open={true}>
  <span slot="title">
    {$t("game.details_title")}
  </span>
  <ul class="info">
    {#each wordsDetails as { index, description, success, name }}
      <li class="row">
        <div class="index" class:success>{index}</div>
        <div class="description">{description} ({name.length})</div>
      </li>
    {/each}
  </ul>
</Accordion>

<style lang="scss">
  @import "src/styles/all";
  .info {
    border-radius: 10px;
    margin: 0;
    font-size: 14px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .row {
    display: flex;
    align-items: center;
    padding: 5px 0;
  }

  .index {
    @extend %flex-centered;
    border-radius: 50%;
    margin-right: 10px;
    width: 35px;
    height: 35px;
    font-weight: bold;
    border: 1px solid $details-border-color;
  }

  .description {
    width: 100%;
  }

  .success {
    background-color: $details-success-bg-color;
  }
</style>
