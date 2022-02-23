<script lang="ts">
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

<div class="info">
  <Accordion open={true}>
    <ul class="content">
      {#each wordsDetails as { index, description, success }}
        <li class="row">
          <div class="index" class:success>{index}</div>
          <div class="description">{description}</div>
        </li>
      {/each}
    </ul>
  </Accordion>
</div>

<style lang="scss">
  @import "src/styles/all";

  .info {
    border: 1px solid $details-border-color;
  }
  .content {
    --grid-layout-gap: 10px;
    --grid-column-count: 4;
    --grid-item--min-width: 150px;

    --gap-count: calc(var(--grid-column-count) - 1);
    --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
    --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

    font-size: $small-font-size;
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr)
    );
    grid-gap: var(--grid-layout-gap);
  }

  .row {
    display: flex;
    align-items: center;
    padding: 5px 0;
    cursor: default;
  }

  .index {
    @extend %flex-centered;
    cursor: default;
    margin-right: 10px;
    width: 35px;
    height: 35px;
    font-weight: bold;
    border: 1px solid $details-index-border-color;
  }

  .description {
    width: 100%;
  }

  .success {
    background-color: $details-success-bg-color;
  }
</style>
