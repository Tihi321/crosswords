<script lang="ts">
  import { t } from "svelte-i18n";
  import { useModals, useDevSettings } from "../../../hooks";
  import { EModals } from "../../../constants";
  import ModalWindow from "../common/ModalWindow.svelte";
  import TextGroup from "../common/TextGroup.svelte";
  import NumberGroup from "../common/NumberGroup.svelte";

  const { closeModal } = useModals();
  const { devSettings } = useDevSettings();

  function closeSettingsModal() {
    closeModal(EModals.DevSettings);
  }
</script>

<ModalWindow title={$t("modal.title.dev_settings")} on:close={closeSettingsModal}>
  <NumberGroup
    title={$t("modal.labels.skip_columns")}
    min={0}
    max={4}
    bind:value={$devSettings.skipVertical}
  />
  <NumberGroup
    title={$t("modal.labels.skip_rows")}
    min={0}
    max={4}
    bind:value={$devSettings.skipHorizontal}
  />
  <NumberGroup
    title={$t("modal.labels.number_of_columns")}
    min={10}
    max={40}
    bind:value={$devSettings.numberOfColumns}
  />
  <NumberGroup
    title={$t("modal.labels.number_of_rows")}
    min={10}
    max={40}
    bind:value={$devSettings.numberOfRows}
  />
  <NumberGroup
    title={$t("modal.labels.word_limit")}
    min={10}
    buttons={false}
    useMax={false}
    bind:value={$devSettings.wordLimit}
  />
  <TextGroup
    title={$t("modal.labels.custom_engpoint")}
    bind:value={$devSettings.endpoint}
    bind:toggle={$devSettings.useCustomEndpoint}
  />
</ModalWindow>
