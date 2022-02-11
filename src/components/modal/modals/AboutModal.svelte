<script lang="ts">
  import { t } from "svelte-i18n";
  import { useModals } from "../../../hooks";
  import { EModals } from "../../../constants";
  import ModalWindow from "../common/ModalWindow.svelte";

  const { closeModal } = useModals();

  function closeSettingsModal() {
    closeModal(EModals.About);
  }
</script>

<ModalWindow title={$t("modal.title.about")} on:close={closeSettingsModal}>
  <div class="descrition">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione corrupti sed dolorem, ex illum
    natus quia nostrum tempora. Voluptatibus consequatur culpa aliquid amet eum enim labore
    laboriosam eaque debitis provident.
  </div>
</ModalWindow>

<style lang="scss">
  @import "src/styles/all";

  .descrition {
    font-size: $default-font-size;
    color: $button-color;
    font-weight: normal;
  }
</style>
