<script lang="ts">
  import { t } from "svelte-i18n";
  import { Tooltip, ETooltipTrigger, ETooltipPlacement } from "ts-components-library";
  import Logo from "../common/Logo.svelte";
  import ThemeSwitcher from "./ThemeSwitcher.svelte";
  import LanguageSwitcher from "./LanguageSwitcher.svelte";
  import { useGame } from "../../hooks";

  const { endGame, game } = useGame();

  let gameStarted: boolean;

  game.subscribe((value) => {
    gameStarted = value.started;
  });
</script>

<header class="header">
  <div class="container">
    <div class="logo-container">
      <div class="logo"><Logo /></div>
      <div class="title">{$t("title")}</div>
    </div>
    <div class="theme-container">
      {#if gameStarted}
        <Tooltip placement={ETooltipPlacement.Top} trigger={ETooltipTrigger.Hover}>
          <span slot="tooltip">
            <div class="tooltip">{$t("header.back_to_menu_tooltip")}</div>
          </span>
          <button on:click={endGame} class="end-game-button">{$t("header.back_to_menu")}</button>
        </Tooltip>
      {:else}
        <LanguageSwitcher />
      {/if}
      <ThemeSwitcher />
    </div>
  </div>
</header>

<style lang="scss">
  @import "src/styles/all";
  .header {
    height: auto;
  }

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .end-game-button {
    color: $font-color;
  }
  .logo-container {
    display: flex;
    align-items: baseline;
  }
  .title {
    margin-left: 10px;
    font-weight: bold;
  }

  .logo {
    max-width: 50px;
  }

  .theme-container {
    display: flex;
    align-items: end;
  }

  .tooltip {
    max-height: 10px;
  }
</style>
