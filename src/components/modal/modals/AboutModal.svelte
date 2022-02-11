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
  <div class="center">
    <ul>
      <li>
        <span class="label">{$t("about.author")}</span>
        : Tihomir Selak
      </li>
      <li>
        <span class="label">{$t("about.license")}</span>
        : MIT
      </li>
      <li>
        <span class="label">{$t("about.repository")}</span>
        : <a href="https://github.com/Tihi321/crosswords" target="_blank">Github</a>
      </li>
    </ul>
  </div>
</ModalWindow>

<style lang="scss">
  @import "src/styles/all";

  .center {
    @extend %flex-centered;
    height: 100%;
    font-size: $default-font-size;
    color: $button-color;
    font-weight: normal;
  }

  .label {
    font-weight: bold;
  }
</style>
