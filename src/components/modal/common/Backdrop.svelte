<script lang="ts">
  import { useBackdrop } from "../../../hooks";
  const { onClose, slotName } = useBackdrop();
</script>

<div class="backdrop" on:click={onClose}>
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
