<script lang="ts">
  import { useAvoidElementEvent } from "../../../hooks";
  const slotName = "backdrop-slot";
  const { onEventCallback } = useAvoidElementEvent({
    datasetName: "backdrop",
    slotName,
    dispatchEventName: "close",
  });
</script>

<div class="backdrop" on:click={onEventCallback}>
  <span data-backdrop={slotName}>
    <slot />
  </span>
</div>

<style lang="scss">
  @import "src/styles/all";
  .backdrop {
    @extend %flex-centered;
    width: 100%;
    height: 100%;
  }
</style>
