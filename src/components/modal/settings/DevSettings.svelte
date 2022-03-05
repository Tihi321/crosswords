<script lang="ts">
  import { t } from "svelte-i18n";
  import { Options } from "ts-components-library";
  import { useDevSettings, useGameSettings, useApiWords } from "../../../hooks";
  import { getLocalizedEndpoint } from "../../../utils";
  import TextGroup from "../common/TextGroup.svelte";
  import { EWordsLanguages } from "../../../constants";
  import NumberGroup from "../common/NumberGroup.svelte";
  import TitleToggle from "../common/TitleToggle.svelte";
  import OptionTitle from "../common/OptionTitle.svelte";

  const { devSettings } = useDevSettings();
  const { gameSettings } = useGameSettings();
  const { fetchApiVocabularyWords } = useApiWords();

  const getTranslation = (value) => {
    switch (value) {
      case EWordsLanguages.Croatian:
        return $t("modal.settings.sub_modals.game_settings.languages.croatian");
      case EWordsLanguages.English:
        return $t("modal.settings.sub_modals.game_settings.languages.english");

      default:
        break;
    }
  };

  $: selectedAPILanguageItem = {
    id: $gameSettings.wordsLanguage,
    value: getTranslation($gameSettings.wordsLanguage),
  };

  const languageAPIItems = [
    {
      id: EWordsLanguages.English,
      value: $t("modal.settings.sub_modals.game_settings.languages.english"),
    },
    {
      id: EWordsLanguages.Croatian,
      value: $t("modal.settings.sub_modals.game_settings.languages.croatian"),
    },
  ];

  const onLanguageAPIChange = (event) => {
    $gameSettings.wordsLanguage = event.detail.id;
    if (!$devSettings.useCustomEndpoint) {
      fetchApiVocabularyWords(getLocalizedEndpoint(event.detail.id));
    }
  };
</script>

<div>
  <div class="option-group">
    <OptionTitle title={$t("modal.settings.sub_modals.game_settings.labels.words_language")} />
    <Options
      selected={selectedAPILanguageItem}
      items={languageAPIItems}
      on:change={onLanguageAPIChange}
    />
  </div>
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

  .option-group {
    margin-bottom: 20px;
  }
</style>
