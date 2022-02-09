<script lang="ts">
  import isEmpty from "lodash/isEmpty";
  import includes from "lodash/includes";
  import get from "lodash/get";
  import { useModals } from "../../hooks";
  import { EModals } from "../../constants";
  import ApiModal from "./ApiModal.svelte";

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
    display: none;
    background-color: $modal-bg-color;

    &.active {
      @extend %flex-centered;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
    }
  }
</style>
