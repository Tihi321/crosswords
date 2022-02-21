<script lang="ts">
  import { t } from "svelte-i18n";
  import map from "lodash/map";
  import { useGameSettings } from "../../../hooks";
  import { EZoomLevel } from "../../../constants";
  import OptionTitle from "../common/OptionTitle.svelte";
  import ButtonGroup from "../common/ButtonGroup.svelte";

  const { gameSettings } = useGameSettings();

  const getTranslation = (value) => {
    switch (value) {
      case EZoomLevel.Normal:
        return $t("modal.settings.sub_modals.game_settings.zoom.normal");
      case EZoomLevel.Large:
        return $t("modal.settings.sub_modals.game_settings.zoom.large");

      default:
        break;
    }
  };

  $: selectedZoomItem = {
    id: $gameSettings.zoom,
    value: getTranslation($gameSettings.zoom),
  };

  const zoomItems = map(Object.values(EZoomLevel), (key) => ({
    id: key,
    value: getTranslation(key),
  }));

  const onZoomChange = (event) => {
    $gameSettings.zoom = event.detail.id;
  };
</script>

<div>
  <div class="option-group">
    <OptionTitle title={$t("modal.settings.sub_modals.game_settings.labels.zoom")} />
    <ButtonGroup selected={selectedZoomItem} items={zoomItems} on:change={onZoomChange} />
  </div>
</div>

<style lang="scss">
  @import "src/styles/all";
  .option-group {
    margin-bottom: 20px;
  }
</style>
