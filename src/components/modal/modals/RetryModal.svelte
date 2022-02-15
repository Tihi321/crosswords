<script lang="ts">
  import { t } from "svelte-i18n";
  import { useRetryModal, useCrossWord, useGame } from "../../../hooks";
  import RestartIcon from "../../icons/RestartIcon.svelte";
  import Backdrop from "../common/Backdrop.svelte";
  import { generateSelector } from "tsl-utils";
  import { getNumberOfRetries } from "../../../selectors";

  const { crossWord } = useCrossWord();
  const { game } = useGame();
  const { resetTable } = useRetryModal();

  export let transparent: boolean = false;

  $: gameStateSelector = generateSelector($game);
  $: numberRetries = getNumberOfRetries(gameStateSelector) as number;

  const resetTableData = () => {
    resetTable($crossWord);
  };

  const toggleBackdrop = () => {
    transparent = !transparent;
  };
</script>

<Backdrop on:click={toggleBackdrop}>
  <div class="victory">
    <h2 class="title">{$t("retry.title")}</h2>
    <div class="description">
      <div class="buttons">
        Retries {numberRetries}
        <button class="btn restart" on:click={resetTableData}>
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

  .restart {
    &:hover {
      :global(.restart-icon) {
        animation: spin 0.5s;
      }
    }
  }
</style>
