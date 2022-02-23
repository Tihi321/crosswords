<script lang="ts">
  import { t } from "svelte-i18n";
  import { copyToClipboard } from "../../../utils";
  import GameModalWindow from "../common/GameModalWindow.svelte";

  import { EModals, EGameDifficulty, ETableSize } from "../../../constants";
  import { getIsCustomGame } from "../../../selectors";
  import {
    useApiWords,
    useDevSettings,
    useGame,
    useVictoryModal,
    useModals,
    useGameSettings,
    useSettings,
    useCrosswordGame,
  } from "../../../hooks";
  import StarIcon from "../../icons/StarIcon.svelte";
  import RestartIcon from "../../icons/RestartIcon.svelte";
  import ShareIcon from "../../icons/ShareIcon.svelte";

  export let transparent: boolean = false;

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

      default:
        break;
    }
  };

  const { apiWords } = useApiWords();
  const { devSettings } = useDevSettings();
  const { game, resetGame } = useGame();
  const { getSettingsData, getNumberOfRetriesNumber } = useVictoryModal();
  const { closeModal } = useModals();
  const { gameSettings } = useGameSettings();
  const { settings } = useSettings();
  const { generateNewCrosswordData } = useCrosswordGame();

  $: numberRetries = getNumberOfRetriesNumber($game);
  $: settingsData = getSettingsData($devSettings);

  $: isCustomGame = getIsCustomGame($settings, $devSettings);

  const resetGameCallback = () => {
    resetGame();
    generateNewCrosswordData({
      wordsState: $apiWords,
      settingsState: $settings,
      gameSettingsState: $gameSettings,
      devSettingsState: $devSettings,
    });
    closeModal(EModals.Victory);
  };

  const shareStats = () => {
    const message = `${$t("modal.victory.title")} 🖊 ${$t("title")} 🖊 ${numberRetries} 🖊`;
    const suffix = isCustomGame
      ? `W ${settingsData.wordLimit} C ${settingsData.numberOfColumns} R ${settingsData.numberOfRows}`
      : `D ${getTranslation($gameSettings.difficulty)} S ${getTranslation($gameSettings.size)}`;
    copyToClipboard(`✌ ${message} ${suffix} ✌`);
  };
</script>

<GameModalWindow title={$t("modal.victory.title")} bind:transparent>
  <div class="description">
    <div class="star">
      <StarIcon />
    </div>
    <div class="message">
      <div class="repeats">
        {$t("modal.victory.labels.retires")}
        {numberRetries}
      </div>
      <div class="stats">
        <div class="stats-title">{$t("modal.victory.labels.stats")}:</div>
        {#if isCustomGame}
          <div class="stats-item">
            {$t("modal.victory.stats.rows")} - {settingsData.numberOfRows}
          </div>
          <div class="stats-item">
            {$t("modal.victory.stats.columns")} - {settingsData.numberOfColumns}
          </div>
          <div class="stats-item">
            {$t("modal.victory.stats.words_size")} - {settingsData.wordLimit}
          </div>
        {:else}
          <div class="stats-item">
            {$t("modal.victory.stats.difficulty")} - {getTranslation($gameSettings.difficulty)}
          </div>
          <div class="stats-item">
            {$t("modal.victory.stats.size")} - {getTranslation($gameSettings.size)}
          </div>
        {/if}
      </div>
    </div>
    <div class="buttons">
      <button class="btn share" on:click={shareStats}>
        <ShareIcon />
        <div class="btn-text">{$t("modal.victory.button.share")}</div>
      </button>
      <button class="btn restart" on:click={resetGameCallback}>
        <RestartIcon />
        <div class="btn-text">{$t("modal.victory.button.restart")}</div>
      </button>
    </div>
  </div>
</GameModalWindow>

<style lang="scss">
  @import "src/styles/all";
  .description {
    @extend %flex-centered;
    flex-direction: column;
    padding: 30px;
    flex: 1;
  }

  .star {
    @extend %flex-centered;
    flex: 2;

    animation: delayspin 5s infinite;

    :global(.star-icon) {
      transform: scale(1.5);
    }
  }

  .repeats {
    text-align: center;
    padding-bottom: 10px;
  }

  .stats {
    width: 100%;
  }

  .stats-title {
    font-weight: bold;
    padding-bottom: 10px;
  }

  .message {
    flex: 2;
    width: 100%;
    margin: 20px 0;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex: 1;
  }

  .btn {
    color: $button-color;
    font-size: $normal-font-size;
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  .btn-text {
    margin-left: 10px;
  }

  .share {
    &:hover {
      :global(.share-icon) {
        animation: bounce 0.5s;
      }
    }
  }

  .restart {
    &:hover {
      :global(.restart-icon) {
        animation: spin 0.5s;
      }
    }
  }
</style>
