<script lang="ts">
  import { t } from "svelte-i18n";
  import map from "lodash/map";
  import { useGameSettings } from "../../../hooks";
  import { EGameDifficulty, ETableSize, EZoomLevel } from "../../../constants";
  import ButtonGroup from "../common/ButtonGroup.svelte";
  import TitleToggle from "../common/TitleToggle.svelte";

  const { gameSettings, settings } = useGameSettings();

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
      case EZoomLevel.Normal:
        return $t("modal.settings.sub_modals.game_settings.zoom.normal");
      case EZoomLevel.Large:
        return $t("modal.settings.sub_modals.game_settings.zoom.large");

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

  $: selectedZoomItem = {
    id: $gameSettings.zoom,
    value: getTranslation($gameSettings.zoom),
  };

  const difficultyItems = map(Object.values(EGameDifficulty), (key) => ({
    id: key,
    value: getTranslation(key),
  }));

  const sizeItems = map(Object.values(ETableSize), (key) => ({
    id: key,
    value: getTranslation(key),
  }));

  const zoomItems = map(Object.values(EZoomLevel), (key) => ({
    id: key,
    value: getTranslation(key),
  }));

  const onDifficultyChange = (event) => {
    $gameSettings.difficulty = event.detail.id;
  };

  const onZoomChange = (event) => {
    $gameSettings.zoom = event.detail.id;
  };

  const onSizeChange = (event) => {
    $gameSettings.size = event.detail.id;
  };
</script>

<div>
  <div class="option-group">
    <div class="title">{$t("modal.settings.sub_modals.game_settings.labels.difficulty")}</div>
    <ButtonGroup
      selected={selectedDifficultyItem}
      items={difficultyItems}
      on:change={onDifficultyChange}
    />
  </div>
  <div class="option-group">
    <div class="title">{$t("modal.settings.sub_modals.game_settings.labels.size")}</div>
    <ButtonGroup selected={selectedSizeItem} items={sizeItems} on:change={onSizeChange} />
  </div>
  <div class="option-group">
    <div class="title">{$t("modal.settings.sub_modals.game_settings.labels.zoom")}</div>
    <ButtonGroup selected={selectedZoomItem} items={zoomItems} on:change={onZoomChange} />
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
  .title {
    font-size: $default-font-size;
    color: $button-color;
    margin: 0 0 5px 0;
    font-weight: normal;
  }
</style>
