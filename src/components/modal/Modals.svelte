<script lang="ts">
  import isEmpty from "lodash/isEmpty";
  import includes from "lodash/includes";
  import get from "lodash/get";
  import { useModals } from "../../hooks";
  import { EModals } from "../../constants";
  import Settings from "./modals/Settings.svelte";
  import VictoryModal from "./modals/VictoryModal.svelte";
  import RetryModal from "./modals/RetryModal.svelte";

  const { modals } = useModals();

  let activeModals: string[] = [];
  let transparent: boolean = false;

  modals.subscribe((state) => {
    activeModals = get(state, ["active"]);
  });

  $: anyModalActive = !isEmpty(activeModals);
  $: activeSettingsModal = includes(activeModals, EModals.Settings);
  $: activeVictoryModal = includes(activeModals, EModals.Victory);
  $: activeRetryModal = includes(activeModals, EModals.Retry);
</script>

<div class="modals" class:active={anyModalActive} class:transparent>
  {#if activeRetryModal}
    <RetryModal bind:transparent />
  {/if}
  {#if activeVictoryModal}
    <VictoryModal bind:transparent />
  {/if}
  {#if activeSettingsModal}
    <Settings />
  {/if}
</div>

<style lang="scss">
  @import "src/styles/all";
  .modals {
    @extend %absolute-centered;
    background-color: $backdrop-bg-color;
    display: block;
    width: 100%;
    z-index: 1;
    pointer-events: none;
    transition: 0.25s opacity ease;
    opacity: 0;

    &.active {
      opacity: 1;
      pointer-events: all;
    }

    &.transparent {
      opacity: 0;
    }
  }
</style>
