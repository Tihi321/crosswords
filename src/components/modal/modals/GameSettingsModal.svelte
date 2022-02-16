<script lang="ts">
  import { t } from "svelte-i18n";
  import map from "lodash/map";
  import { useModals, useGameSettings } from "../../../hooks";
  import { EModals, EGameDifficulty, ETableSize, EZoomLevel } from "../../../constants";
  import ModalWindow from "../common/ModalWindow.svelte";
  import ButtonGroup from "../common/ButtonGroup.svelte";

  const { gameSettings } = useGameSettings();
  const { closeModal } = useModals();

  const getTranslation = (value) => {
    switch (value) {
      case EGameDifficulty.Easy:
        return $t("game_settings.difficulty.easy");
      case EGameDifficulty.Normal:
        return $t("game_settings.difficulty.normal");
      case EGameDifficulty.Hard:
        return $t("game_settings.difficulty.hard");
      case ETableSize.Small:
        return $t("game_settings.size.small");
      case ETableSize.Medium:
        return $t("game_settings.size.medium");
      case ETableSize.Big:
        return $t("game_settings.size.big");
      case EZoomLevel.Normal:
        return $t("game_settings.zoom.normal");
      case EZoomLevel.Large:
        return $t("game_settings.zoom.large");

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
    const item = event.detail;
    $gameSettings.difficulty = item.id;
  };

  const onZoomChange = (event) => {
    const item = event.detail;
    $gameSettings.zoom = item.id;
  };

  const onSizeChange = (event) => {
    const item = event.detail;
    $gameSettings.size = item.id;
  };

  function closeSettingsModal() {
    closeModal(EModals.GameSettings);
  }
</script>

<ModalWindow title={$t("modal.title.game_settings")} on:close={closeSettingsModal}>
  <div class="title">{$t("game_settings.title.difficulty")}</div>
  <ButtonGroup
    selected={selectedDifficultyItem}
    items={difficultyItems}
    on:change={onDifficultyChange}
  />
  <div class="title">{$t("game_settings.title.size")}</div>
  <ButtonGroup selected={selectedSizeItem} items={sizeItems} on:change={onSizeChange} />
  <div class="title">{$t("game_settings.title.zoom")}</div>
  <ButtonGroup selected={selectedZoomItem} items={zoomItems} on:change={onZoomChange} />
</ModalWindow>

<style lang="scss">
  @import "src/styles/all";
  .title {
    font-size: $default-font-size;
    color: $button-color;
    margin: 0 0 5px 0;
    font-weight: normal;
  }
</style>
