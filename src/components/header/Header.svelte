<script lang="ts">
  import Logo from "./Logo.svelte";
  import Container from "../common/Container.svelte";
  import { useGame } from "../../hooks";
  import type { EThemes } from "../../constants";
  import type { TThemeStore } from "../../types";
  import { useTheme } from "../../hooks";

  const { endGame, game } = useGame();
  const { theme, switchTheme } = useTheme();

  let themeState: EThemes;
  let gameStarted: boolean;

  game.subscribe((value) => {
    gameStarted = value.started;
  });

  theme.subscribe((value: TThemeStore) => {
    themeState = value.theme;
  });
</script>

<header class="header">
  <Container>
    <div class="container">
      <button on:click={endGame} class="logo"><Logo /></button>
      <div>
        {#if gameStarted}
          <button on:click={endGame} class="end-game-button">Back to menu</button>
        {/if}
        <button class="theme-switcher" on:click={switchTheme}>{themeState}</button>
      </div>
    </div>
  </Container>
</header>

<style lang="scss">
  @import "src/styles/all";
  .header {
    height: 100px;
    background: $header-bg-color;
  }

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .logo {
    cursor: pointer;
    background: none;
    border: none;
    max-width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .theme-switcher {
    @include contrast-button("small");
    margin-left: 10px;
  }
</style>
