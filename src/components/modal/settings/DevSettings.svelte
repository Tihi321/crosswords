<script lang="ts">
  import { t } from "svelte-i18n";
  import { useDevSettings } from "../../../hooks";
  import TextGroup from "../common/TextGroup.svelte";
  import NumberGroup from "../common/NumberGroup.svelte";
  import TitleToggle from "../common/TitleToggle.svelte";

  const { devSettings } = useDevSettings();
</script>

<div>
  <TitleToggle
    bind:toggle={$devSettings.enable}
    title={$t("modal.settings.sub_modals.dev_settings.labels.enable_dev_setting")}
  />
  <div class="items" class:disabled={!$devSettings.enable}>
    <NumberGroup
      title={$t("modal.settings.sub_modals.dev_settings.labels.skip_columns")}
      min={0}
      max={4}
      bind:value={$devSettings.skipVertical}
    />
    <NumberGroup
      title={$t("modal.settings.sub_modals.dev_settings.labels.skip_rows")}
      min={0}
      max={4}
      bind:value={$devSettings.skipHorizontal}
    />
    <NumberGroup
      title={$t("modal.settings.sub_modals.dev_settings.labels.number_of_columns")}
      min={10}
      max={40}
      bind:value={$devSettings.numberOfColumns}
    />
    <NumberGroup
      title={$t("modal.settings.sub_modals.dev_settings.labels.number_of_rows")}
      min={10}
      max={40}
      bind:value={$devSettings.numberOfRows}
    />
    <NumberGroup
      title={$t("modal.settings.sub_modals.dev_settings.labels.word_limit")}
      min={10}
      buttons={false}
      useMax={false}
      bind:value={$devSettings.wordLimit}
    />
    <TextGroup
      title={$t("modal.settings.sub_modals.dev_settings.labels.custom_endpoint")}
      bind:value={$devSettings.endpoint}
      bind:toggle={$devSettings.useCustomEndpoint}
    />
  </div>
</div>

<style lang="scss">
  @import "src/styles/all";
  .items {
    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
</style>
