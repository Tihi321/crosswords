<script lang="ts">
  import { t } from "svelte-i18n";
  import { useModals } from "../../../hooks";
  import { EModals } from "../../../constants";
  import ModalWindow from "../common/ModalWindow.svelte";
  import ViiewSettings from "../settings/ViiewSettings.svelte";

  const { closeModal } = useModals();

  function closeSettingsModal() {
    closeModal(EModals.Game);
  }
</script>

<ModalWindow title={$t("modal.settings.title")} on:close={closeSettingsModal}>
  <div class="container">
    <ViiewSettings />
  </div>
</ModalWindow>

<style lang="scss">
  @import "src/styles/all";
  .container {
    padding: 20px 50px;
  }
</style>
