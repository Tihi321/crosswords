<script lang="ts">
  import { t } from "svelte-i18n";
  import Logo from "./Logo.svelte";
  import Container from "../common/Container.svelte";
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
  <Container>
    <div class="container">
      <button on:click={endGame} class="logo"><Logo /></button>
      <div>
        {#if gameStarted}
          <button on:click={endGame} class="end-game-button">{$t("header.back_to_menu")}</button>
        {:else}
          <LanguageSwitcher />
        {/if}
        <ThemeSwitcher />
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
</style>
