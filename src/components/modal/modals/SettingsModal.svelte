<script lang="ts">
  import { useModals, useSettings } from "../../../hooks";
  import { EModals } from "../../../constants";
  import type { TSettingsStore } from "../../../types";
  import ModalWindow from "../common/ModalWindow.svelte";
  import TextGroup from "../common/TextGroup.svelte";
  import NumberGroup from "../common/NumberGroup.svelte";

  const { closeModal } = useModals();
  const { settings, setState } = useSettings();

  let settingsState: TSettingsStore;

  settings.subscribe((state: TSettingsStore) => {
    settingsState = state;
  });

  function updateSetting(key, value) {
    settingsState = {
      ...settingsState,
      [key]: value,
    };
  }

  function closeSettingsModal() {
    closeModal(EModals.Settings);
  }

  function setStoreState() {
    setState(settingsState);
  }
</script>

<ModalWindow title="Settings" on:close={closeSettingsModal}>
  <NumberGroup
    title="Skip columns when generating table"
    min={0}
    max={4}
    value={settingsState.skipVertical}
    on:input={(event) => updateSetting("skipVertical", event.detail)}
  />
  <NumberGroup
    title="Skip rows when generating table"
    min={0}
    max={4}
    value={settingsState.skipHorizontal}
    on:input={(event) => updateSetting("skipHorizontal", event.detail)}
  />
  <NumberGroup
    title="Set number of columns"
    min={10}
    max={40}
    value={settingsState.numberOfColumns}
    on:input={(event) => updateSetting("numberOfColumns", event.detail)}
  />
  <NumberGroup
    title="Set number of rows"
    min={10}
    max={40}
    value={settingsState.numberOfRows}
    on:input={(event) => updateSetting("numberOfRows", event.detail)}
  />
  <NumberGroup
    title="Set word limits"
    min={10}
    buttons={false}
    useMax={false}
    value={settingsState.wordLimit}
    on:input={(event) => updateSetting("wordLimit", event.detail)}
  />
  <TextGroup
    title="Set custom endpoint"
    value={settingsState.endpoint}
    on:input={(event) => updateSetting("endpoint", event.detail)}
  />
  <button class="set-button" on:click={setStoreState}>Set</button>
</ModalWindow>

<style lang="scss">
  @import "src/styles/all";

  .set-button {
    @include contrast-button("small");
    width: 100%;
  }
</style>
