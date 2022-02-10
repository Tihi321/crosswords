<script lang="ts">
  import isEmpty from "lodash/isEmpty";
  import includes from "lodash/includes";
  import get from "lodash/get";
  import { useModals } from "../../hooks";
  import { EModals } from "../../constants";
  import ApiModal from "./modals/ApiModal.svelte";

  const { modals } = useModals();

  let activeModals: string[] = [];

  modals.subscribe((state) => {
    activeModals = get(state, ["active"]);
  });

  $: anyModalActive = !isEmpty(activeModals);
  $: activeApiModal = includes(activeModals, EModals.Api);
</script>

<div class="modals" class:active={anyModalActive}>
  {#if activeApiModal}
    <ApiModal />
  {/if}
</div>

<style lang="scss">
  @import "src/styles/all";
  .modals {
    @extend %absolute-centered;
    width: 100%;
    display: block;
    background-color: $modal-bg-color;
    pointer-events: none;
    transition: 0.25s opacity ease;
    opacity: 0;

    &.active {
      opacity: 1;
      pointer-events: all;
    }
  }
</style>
