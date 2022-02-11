<script lang="ts">
  import { t } from "svelte-i18n";
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

<ModalWindow title={$t("modal.title.settings")} on:close={closeSettingsModal}>
  <NumberGroup
    title={$t("modal.labels.skip_columns")}
    min={0}
    max={4}
    value={settingsState.skipVertical}
    on:input={(event) => updateSetting("skipVertical", event.detail)}
  />
  <NumberGroup
    title={$t("modal.labels.skip_rows")}
    min={0}
    max={4}
    value={settingsState.skipHorizontal}
    on:input={(event) => updateSetting("skipHorizontal", event.detail)}
  />
  <NumberGroup
    title={$t("modal.labels.number_of_columns")}
    min={10}
    max={40}
    value={settingsState.numberOfColumns}
    on:input={(event) => updateSetting("numberOfColumns", event.detail)}
  />
  <NumberGroup
    title={$t("modal.labels.number_of_rows")}
    min={10}
    max={40}
    value={settingsState.numberOfRows}
    on:input={(event) => updateSetting("numberOfRows", event.detail)}
  />
  <NumberGroup
    title={$t("modal.labels.word_limit")}
    min={10}
    buttons={false}
    useMax={false}
    value={settingsState.wordLimit}
    on:input={(event) => updateSetting("wordLimit", event.detail)}
  />
  <TextGroup
    title={$t("modal.labels.custom_engpoint")}
    value={settingsState.endpoint}
    on:input={(event) => updateSetting("endpoint", event.detail)}
  />
  <button class="set-button" on:click={setStoreState}>{$t("modal.save")}</button>
</ModalWindow>

<style lang="scss">
  @import "src/styles/all";

  .set-button {
    @include contrast-button("small");
    width: 100%;
  }
</style>
