<script lang="ts">
  import { t } from "svelte-i18n";
  import { EThemes } from "../../constants";
  import { useTheme } from "../../hooks";

  const { theme, switchTheme } = useTheme();
</script>

<button class="theme-switcher" on:click={switchTheme}
  >{$t($theme.theme === EThemes.Light ? "theme.light" : "theme.dark")}</button
>

<style lang="scss">
  @import "src/styles/all";
  .theme-switcher {
    @include contrast-button("small");
    margin-left: 15px;
    color: $theme-btn-color;
    background-color: $theme-btn-bg-color;
    padding: 10px 15px;
    border-radius: 5px;
  }
</style>
