<script lang="ts">
  import { t } from "svelte-i18n";
  import { copyToClipboard } from "../../../utils";
  import GameModalWindow from "../common/GameModalWindow.svelte";

  import { EModals } from "../../../constants";
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
    const message = `✌ ${$t("modal.victory.title")} 🖊 ${$t("title")} 🖊 W ${
      settingsData.wordLimit
    } C ${settingsData.numberOfColumns} R ${settingsData.numberOfRows} ✌`;
    copyToClipboard(message);
  };
</script>

<GameModalWindow title={$t("modal.victory.title")} bind:transparent>
  <div class="description">
    <div class="star">
      <StarIcon />
    </div>
    <p class="message">
      {$t("modal.victory.labels.retires")}
      {numberRetries}
      {$t("modal.victory.labels.intro")}
      {settingsData.numberOfRows}
      {$t("modal.victory.labels.rows")}
      {settingsData.numberOfColumns}
      {$t("modal.victory.labels.columns")}
      {settingsData.wordLimit}
      {$t("modal.victory.labels.words_pool")}
    </p>
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

  .message {
    flex: 2;
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
