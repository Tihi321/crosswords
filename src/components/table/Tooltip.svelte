<script lang="ts">
  import { Tooltip } from "ts-components-library";

  export let show: boolean = true;
</script>

{#if show}
  <Tooltip hideArrow placement="Bottom">
    <span slot="tooltip">
      <slot name="tooltip" />
    </span>
    <slot />
  </Tooltip>
{:else}
  <slot />
{/if}
