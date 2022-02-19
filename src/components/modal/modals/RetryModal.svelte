<script lang="ts">
  import { t } from "svelte-i18n";
  import { useRetryModal, useCrossWord, useGame } from "../../../hooks";
  import RestartIcon from "../../icons/RestartIcon.svelte";
  import GameModalWindow from "../common/GameModalWindow.svelte";
  import { generateSelector } from "tsl-utils";
  import { getNumberOfRetries } from "../../../selectors";

  export let transparent: boolean;

  const { crossWord } = useCrossWord();
  const { game } = useGame();
  const { resetTable } = useRetryModal();

  $: gameStateSelector = generateSelector($game);
  $: numberRetries = getNumberOfRetries(gameStateSelector) as number;

  const resetTableData = () => {
    resetTable($crossWord);
  };
</script>

<GameModalWindow title={$t("modal.retry.title")} bind:transparent>
  <div class="description">
    <div class="message">
      {$t("modal.retry.labels.retires")}
      {numberRetries}
    </div>
    <button class="btn" on:click={resetTableData}>
      <RestartIcon />
      <div class="btn-text">{$t("modal.retry.button.restart")}</div>
    </button>
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

  .message {
    margin: 20px 0;
    font-weight: bold;
  }
  .btn {
    color: $button-color;
    font-size: $normal-font-size;
    font-weight: bold;
    display: flex;
    align-items: center;

    &:hover {
      :global(.restart-icon) {
        animation: spin 0.5s;
      }
    }
  }

  .btn-text {
    margin-left: 10px;
  }
</style>
