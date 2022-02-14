<script lang="ts">
  import isEmpty from "lodash/isEmpty";
  import includes from "lodash/includes";
  import get from "lodash/get";
  import { useModals } from "../../hooks";
  import { EModals } from "../../constants";
  import SettingsModal from "./modals/SettingsModal.svelte";
  import AboutModal from "./modals/AboutModal.svelte";
  import VictoryModal from "./modals/VictoryModal.svelte";
  import RetryModal from "./modals/RetryModal.svelte";

  const { modals } = useModals();

  let activeModals: string[] = [];

  modals.subscribe((state) => {
    activeModals = get(state, ["active"]);
  });

  $: anyModalActive = !isEmpty(activeModals);
  $: activeSettingsModal = includes(activeModals, EModals.Settings);
  $: activeAboutModal = includes(activeModals, EModals.About);
  $: activeVictoryModal = includes(activeModals, EModals.Victory);
  $: activeRetryModal = includes(activeModals, EModals.Retry);
</script>

<div class="modals" class:active={anyModalActive}>
  {#if activeRetryModal}
    <RetryModal />
  {/if}
  {#if activeVictoryModal}
    <VictoryModal />
  {/if}
  {#if activeSettingsModal}
    <SettingsModal />
  {/if}
  {#if activeAboutModal}
    <AboutModal />
  {/if}
</div>

<style lang="scss">
  @import "src/styles/all";
  .modals {
    @extend %absolute-centered;
    width: 100%;
    z-index: 1;
    display: block;
    background-color: $modal-backdrop-bg-color;
    pointer-events: none;
    transition: 0.25s opacity ease;
    opacity: 0;

    &.active {
      opacity: 1;
      pointer-events: all;
    }
  }
</style>
