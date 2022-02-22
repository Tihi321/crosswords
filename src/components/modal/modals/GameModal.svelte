<script lang="ts">
  import { t } from "svelte-i18n";
  import {
    useModals,
    useGame,
    useCrosswordGame,
    useApiWords,
    useDevSettings,
    useGameSettings,
    useSettings,
  } from "../../../hooks";
  import { EModals } from "../../../constants";
  import ColoredButton from "../../common/ColoredButton.svelte";
  import ModalWindow from "../common/ModalWindow.svelte";
  import ViiewSettings from "../settings/ViiewSettings.svelte";

  const { closeModal } = useModals();
  const { endGame, resetGame } = useGame();
  const { apiWords } = useApiWords();
  const { devSettings } = useDevSettings();
  const { gameSettings } = useGameSettings();
  const { settings } = useSettings();
  const { generateNewCrosswordData } = useCrosswordGame();

  function closeSettingsModal() {
    closeModal(EModals.Game);
  }

  function endGameAndlClose() {
    endGame();
    closeSettingsModal();
  }

  function resetGameAndlClose() {
    resetGame();
    generateNewCrosswordData({
      wordsState: $apiWords,
      settingsState: $settings,
      gameSettingsState: $gameSettings,
      devSettingsState: $devSettings,
    });
    closeSettingsModal();
  }
</script>

<ModalWindow title={$t("modal.game.title")} on:close={closeSettingsModal}>
  <div class="container">
    <ViiewSettings />
    <div class="button">
      <ColoredButton
        type="warn"
        on:click={resetGameAndlClose}
        title={$t("modal.game.label.restart_game")}
      />
    </div>
    <div class="button">
      <ColoredButton
        type="failure"
        on:click={endGameAndlClose}
        title={$t("modal.game.label.end_game")}
      />
    </div>
  </div>
</ModalWindow>

<style lang="scss">
  @import "src/styles/all";
  .container {
    padding: 20px 50px;
  }

  .button {
    padding-bottom: 20px;
  }
</style>
