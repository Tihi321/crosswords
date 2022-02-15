<script lang="ts">
  import { t } from "svelte-i18n";
  import { copyToClipboard } from "../../../utils";
  import Backdrop from "../common/Backdrop.svelte";

  import { useApiWords, useDevSettings, useGame, useVictoryModal } from "../../../hooks";
  import StarIcon from "../../icons/StarIcon.svelte";
  import RestartIcon from "../../icons/RestartIcon.svelte";
  import ShareIcon from "../../icons/ShareIcon.svelte";

  export let transparent: boolean = false;

  const { apiWords } = useApiWords();
  const { devSettings } = useDevSettings();
  const { game } = useGame();
  const { resetGame, getIsLargeVictory, getSettingsData, getNumberOfRetriesNumber } =
    useVictoryModal();

  $: numberRetries = getNumberOfRetriesNumber($game);
  $: settingsData = getSettingsData($devSettings);
  $: isLargeSizeCrossword = getIsLargeVictory($devSettings);

  const resetGameCallback = () => {
    resetGame($apiWords, $devSettings);
  };

  const shareStats = () => {
    const message = `✌ ${$t(
      isLargeSizeCrossword ? "victory.large_title" : "victory.title"
    )} 🖊 ${$t("title")} 🖊 W ${settingsData.wordLimit} C ${settingsData.numberOfColumns} R ${
      settingsData.numberOfRows
    } ✌`;
    copyToClipboard(message);
  };

  const toggleBackdrop = () => {
    transparent = !transparent;
  };
</script>

<Backdrop on:click={toggleBackdrop}>
  <div class="victory">
    <h2 class="title">{$t(isLargeSizeCrossword ? "victory.large_title" : "victory.title")}</h2>
    <div class="description">
      <div class="star">
        <StarIcon />
      </div>
      <p class="message">
        Retries {numberRetries}
        {$t("victory.intro")}
        {$t(isLargeSizeCrossword ? "victory.large_size" : "victory.size")}
        {settingsData.numberOfRows}
        {$t("victory.rows")}
        {settingsData.numberOfColumns}
        {$t("victory.columns")}
        {settingsData.wordLimit}
        {$t("victory.words_pool")}
      </p>
      <div class="buttons">
        <button class="btn share" on:click={shareStats}>
          <ShareIcon />
          <div class="btn-text">{$t("game.share")}</div>
        </button>
        <button class="btn restart" on:click={resetGameCallback}>
          <RestartIcon />
          <div class="btn-text">{$t("game.restart")}</div>
        </button>
      </div>
    </div>
  </div>
</Backdrop>

<style lang="scss">
  @import "src/styles/all";

  .victory {
    background-color: $victory-bg-color;
    display: flex;
    flex-direction: column;
    min-height: 500px;
    max-width: 400px;
    border-radius: 5px;
    filter: $shadow-color-filter;
  }

  .title {
    margin: 0;
    text-align: center;
    background: $victory-title-bg-color;
    color: $victory-title-color;
    padding: 15px 5px;
    border-radius: 5px 5px 0 0;
  }

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
