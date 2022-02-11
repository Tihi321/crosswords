<script lang="ts">
  import { t } from "svelte-i18n";
  import { EThemes } from "../../constants";
  import type { TThemeStore } from "../../types";
  import { useTheme } from "../../hooks";

  const { theme, switchTheme } = useTheme();

  let themeState: EThemes;

  theme.subscribe((value: TThemeStore) => {
    themeState = value.theme;
  });
</script>

<button class="theme-switcher" on:click={switchTheme}
  >{$t(themeState === EThemes.Light ? "theme.light" : "theme.dark")}</button
>

<style lang="scss">
  @import "src/styles/all";
  .theme-switcher {
    @include contrast-button("small");
    margin-left: 10px;
  }
</style>
