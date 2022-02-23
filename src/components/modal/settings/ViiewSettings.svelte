<script lang="ts">
  import { t } from "svelte-i18n";
  import map from "lodash/map";
  import { Options } from "ts-components-library";
  import { useGameSettings, useTranslations, useTheme } from "../../../hooks";
  import { EZoomLevel, ELanguages, EThemes } from "../../../constants";
  import OptionTitle from "../common/OptionTitle.svelte";

  const { gameSettings } = useGameSettings();
  const { locale } = useTranslations();
  const { theme } = useTheme();

  const getTranslation = (value) => {
    switch (value) {
      case EZoomLevel.Normal:
        return $t("modal.settings.sub_modals.view_settings.zoom.normal");
      case EZoomLevel.Large:
        return $t("modal.settings.sub_modals.view_settings.zoom.large");
      case ELanguages.Croatian:
        return $t("modal.settings.sub_modals.view_settings.languages.croatian");
      case ELanguages.English:
        return $t("modal.settings.sub_modals.view_settings.languages.english");
      case EThemes.Light:
        return $t("modal.settings.sub_modals.view_settings.theme.light");
      case EThemes.Dark:
        return $t("modal.settings.sub_modals.view_settings.theme.dark");

      default:
        break;
    }
  };

  $: selectedZoomItem = {
    id: $gameSettings.zoom,
    value: getTranslation($gameSettings.zoom),
  };

  $: selectedLanguage = {
    id: $locale,
    value: getTranslation($locale),
  };

  $: selectedTheme = {
    id: $theme,
    value: getTranslation($theme),
  };

  const zoomItems = map(Object.values(EZoomLevel), (key) => ({
    id: key,
    value: getTranslation(key),
  }));

  const languageItems = map(Object.values(ELanguages), (key) => ({
    id: key,
    value: getTranslation(key),
  }));

  const themeItems = map(Object.values(EThemes), (key) => ({
    id: key,
    value: getTranslation(key),
  }));

  const onZoomChange = (event) => {
    $gameSettings.zoom = event.detail.id;
  };

  const onThemeChange = (event) => {
    $theme = event.detail.id;
  };

  const onLanguageChange = (event) => {
    $locale = event.detail.id;
  };
</script>

<div>
  <div class="option-group">
    <OptionTitle title={$t("modal.settings.sub_modals.view_settings.labels.language")} />
    <Options selected={selectedLanguage} items={languageItems} on:change={onLanguageChange} />
  </div>
  <div class="option-group">
    <OptionTitle title={$t("modal.settings.sub_modals.view_settings.labels.theme")} />
    <Options selected={selectedTheme} items={themeItems} on:change={onThemeChange} />
  </div>
  <div class="option-group">
    <OptionTitle title={$t("modal.settings.sub_modals.view_settings.labels.zoom")} />
    <Options selected={selectedZoomItem} items={zoomItems} on:change={onZoomChange} />
  </div>
</div>

<style lang="scss">
  @import "src/styles/all";
  .option-group {
    margin-bottom: 20px;
  }
</style>
