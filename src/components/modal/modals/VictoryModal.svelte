<script lang="ts">
  import { t } from "svelte-i18n";
  import { generateSelector } from "tsl-utils";
  import { generateCrosswordsTable, copyToClipboard } from "../../../utils";
  import { ECrosswordSize } from "../../../constants";

  import {
    getRandomizedWordsData,
    getSettingOptions,
    getNumberOfRetries,
  } from "../../../selectors";
  import type { TSettingsStore, TSettingOptions, TWordArray, TGameStore } from "../../../types";

  import { useApiWords, useCrossWord, useSettings, useGame } from "../../../hooks";
  import StarIcon from "../../icons/StarIcon.svelte";
  import RestartIcon from "../../icons/RestartIcon.svelte";
  import ShareIcon from "../../icons/ShareIcon.svelte";

  const { apiWords } = useApiWords();
  const { settings } = useSettings();
  const { addCrosswordTable, addCrosswordDetails, addCrosswordWords, resetCrossWord } =
    useCrossWord();

  const { game } = useGame();

  let gameState: TGameStore;
  let settingsState: TSettingsStore;
  let apiWordsState: any;

  apiWords.subscribe((value) => {
    apiWordsState = value;
  });

  settings.subscribe((value: TSettingsStore) => {
    settingsState = value;
  });

  game.subscribe((value: TGameStore) => {
    gameState = value;
  });

  $: gameStateSelector = generateSelector(gameState);

  $: numberRetries = getNumberOfRetries(gameStateSelector) as number;

  $: wordsStateSelector = generateSelector(apiWordsState);
  $: settingsStateSelector = generateSelector(settingsState);
  $: wordsData = getRandomizedWordsData(wordsStateSelector) as TWordArray;
  $: settingsData = getSettingOptions(settingsStateSelector) as TSettingOptions;

  $: isLargeSizeCrossword = settingsData.crosswordSize === ECrosswordSize.Large;

  const generatenewCrossword = () => {
    const { table, details, words } = generateCrosswordsTable({
      words: wordsData,
      settings: settingsData,
    });

    addCrosswordWords(words);
    addCrosswordDetails(details);
    addCrosswordTable(table);
  };

  const resetGame = () => {
    resetCrossWord();
    generatenewCrossword();
  };

  const shareStats = () => {
    const message = `✌ ${$t(
      isLargeSizeCrossword ? "victory.large_title" : "victory.title"
    )} 🖊 ${$t("title")} 🖊 W ${settingsData.wordLimit} C ${settingsData.numberOfColumns} R ${
      settingsData.numberOfRows
    } ✌`;
    copyToClipboard(message);
  };
</script>

<div class="backdrop">
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
        <button class="btn restart" on:click={resetGame}>
          <RestartIcon />
          <div class="btn-text">{$t("game.restart")}</div>
        </button>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "src/styles/all";

  .backdrop {
    @extend %flex-centered;
    width: 100%;
    height: 100%;
  }

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
