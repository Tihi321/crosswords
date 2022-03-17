<script lang="ts">
  import { t } from "svelte-i18n";
  import InfoIcon from "../icons/InfoIcon.svelte";
  import CogIcon from "../icons/CogIcon.svelte";
  import ColoredButton from "../common/ColoredButton.svelte";
  import {
    useGame,
    useModals,
    useApiWords,
    useDevSettings,
    useGameSettings,
    useSettings,
    useCrosswordGame,
  } from "../../hooks";
  import { EModals } from "../../constants";

  const { game, startGame } = useGame();
  const { openModal } = useModals();
  const { endGame, resetGame } = useGame();
  const { apiWords } = useApiWords();
  const { devSettings } = useDevSettings();
  const { gameSettings } = useGameSettings();
  const { settings } = useSettings();
  const { generateNewCrosswordData } = useCrosswordGame();

  const openSettingsModal = () => {
    if ($game.started) {
      openModal(EModals.Game);
    } else {
      openModal(EModals.Settings);
    }
  };

  const openInfoModal = () => {
    openModal(EModals.Info);
  };

  function resetGameCallback() {
    resetGame();
    generateNewCrosswordData({
      wordsState: $apiWords,
      settingsState: $settings,
      gameSettingsState: $gameSettings,
      devSettingsState: $devSettings,
    });
  }
</script>

<header class="header">
  <div class="container">
    <button class="icon-button" on:click={openSettingsModal}><CogIcon /></button>
    <ul class="menu">
      {#if !$game.started}
        <li class="menu-item">
          <button class="start-button" on:click={startGame} on:click
            >{$t("game_menu.start_game")}</button
          >
        </li>
      {:else}
        <li class="menu-item">
          <ColoredButton
            type="warn"
            on:click={resetGameCallback}
            title={$t("game_menu.restart_game")}
          />
        </li>
        <li class="menu-item">
          <ColoredButton type="failure" on:click={endGame} title={$t("game_menu.end_game")} />
        </li>
      {/if}
    </ul>
    <button class="icon-button" on:click={openInfoModal}><InfoIcon /></button>
  </div>
</header>

<style lang="scss">
  @import "src/styles/all";
  .header {
    height: auto;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .icon-button {
    @extend %flex-centered;
    width: 40px;
    height: 40px;
    transition: transform 0.2s ease;

    &:hover {
      transform: rotate(180deg);
    }
  }
  .logo {
    max-width: 50px;
  }

  .menu {
    display: flex;
    align-items: center;
    margin: 0;
  }

  .start-button {
    @extend %round-button;
    color: $button-color;
    border: 2px solid $button-color;
  }

  .menu-item:nth-child(odd) {
    margin-right: 10px;
  }
</style>
