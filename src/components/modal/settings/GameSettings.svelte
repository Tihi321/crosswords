<script lang="ts">
  import { t } from "svelte-i18n";
  import { Options } from "ts-components-library";
  import map from "lodash/map";
  import { getLocalizedEndpoint } from "../../../utils";
  import { useGameSettings, useDevSettings, useApiWords } from "../../../hooks";
  import { EGameDifficulty, ETableSize, EWordsLanguages } from "../../../constants";
  import OptionTitle from "../common/OptionTitle.svelte";
  import TitleToggle from "../common/TitleToggle.svelte";

  const { gameSettings, settings } = useGameSettings();
  const { devSettings } = useDevSettings();
  const { fetchApiVocabularyWords } = useApiWords();

  const getTranslation = (value) => {
    switch (value) {
      case EGameDifficulty.Easy:
        return $t("modal.settings.sub_modals.game_settings.difficulty.easy");
      case EGameDifficulty.Normal:
        return $t("modal.settings.sub_modals.game_settings.difficulty.normal");
      case EGameDifficulty.Hard:
        return $t("modal.settings.sub_modals.game_settings.difficulty.hard");
      case ETableSize.Small:
        return $t("modal.settings.sub_modals.game_settings.size.small");
      case ETableSize.Medium:
        return $t("modal.settings.sub_modals.game_settings.size.medium");
      case ETableSize.Big:
        return $t("modal.settings.sub_modals.game_settings.size.big");
      case EWordsLanguages.Croatian:
        return $t("modal.settings.sub_modals.game_settings.languages.croatian");
      case EWordsLanguages.English:
        return $t("modal.settings.sub_modals.game_settings.languages.english");

      default:
        break;
    }
  };

  $: selectedDifficultyItem = {
    id: $gameSettings.difficulty,
    value: getTranslation($gameSettings.difficulty),
  };

  $: selectedSizeItem = {
    id: $gameSettings.size,
    value: getTranslation($gameSettings.size),
  };

  $: selectedAPILanguageItem = {
    id: $gameSettings.wordsLanguage,
    value: getTranslation($gameSettings.wordsLanguage),
  };

  const languageAPIItems = [
    {
      id: EWordsLanguages.Croatian,
      value: $t("modal.settings.sub_modals.game_settings.languages.croatian"),
    },
    {
      id: EWordsLanguages.English,
      value: $t("modal.settings.sub_modals.game_settings.languages.english"),
    },
  ];

  const difficultyItems = map(Object.values(EGameDifficulty), (key) => ({
    id: key,
    value: getTranslation(key),
  }));

  const sizeItems = map(Object.values(ETableSize), (key) => ({
    id: key,
    value: getTranslation(key),
  }));

  const onDifficultyChange = (event) => {
    $gameSettings.difficulty = event.detail.id;
  };

  const onSizeChange = (event) => {
    $gameSettings.size = event.detail.id;
  };

  const onLanguageAPIChange = (event) => {
    $gameSettings.wordsLanguage = event.detail.id;

    if (!$devSettings.useCustomEndpoint) {
      fetchApiVocabularyWords(getLocalizedEndpoint(event.detail.id));
    }
  };
</script>

<div>
  <div class="option-group">
    <OptionTitle title={$t("modal.settings.sub_modals.game_settings.labels.difficulty")} />
    <Options
      selected={selectedDifficultyItem}
      items={difficultyItems}
      on:change={onDifficultyChange}
    />
  </div>
  <div class="option-group">
    <OptionTitle title={$t("modal.settings.sub_modals.game_settings.labels.size")} />
    <Options selected={selectedSizeItem} items={sizeItems} on:change={onSizeChange} />
  </div>
  <div class="option-group">
    <OptionTitle title={$t("modal.settings.sub_modals.game_settings.labels.words_language")} />
    <Options
      selected={selectedAPILanguageItem}
      items={languageAPIItems}
      on:change={onLanguageAPIChange}
    />
  </div>
  <div class="option-group">
    <TitleToggle
      bind:toggle={$settings.devSettings}
      title={$t("modal.settings.sub_modals.game_settings.labels.dev_settings")}
    />
  </div>
</div>

<style lang="scss">
  @import "src/styles/all";
  .option-group {
    margin-bottom: 20px;
  }
</style>
