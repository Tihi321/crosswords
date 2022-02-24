<script lang="ts">
  import { t } from "svelte-i18n";
  import { useModals } from "../../../hooks";
  import { EModals } from "../../../constants";
  import ModalWindow from "../common/ModalWindow.svelte";
  import IntoLetter from "../Info/IntoLetter.svelte";

  const { closeModal } = useModals();

  function closeSettingsModal() {
    closeModal(EModals.Info);
  }
</script>

<ModalWindow title={$t("modal.info.title")} on:close={closeSettingsModal}>
  <div class="container">
    <p>{$t("modal.info.rules.intro")}</p>
    <p>{$t("modal.info.rules.retry")}</p>
    <hr />
    <div class="letter-postions">
      <div class="letter-container">
        <IntoLetter />
      </div>
      <div class="letter-container">
        <IntoLetter top />
      </div>
      - {$t("modal.info.rules.word_starts")}
    </div>
    <div class="letter-postions">
      <div class="letter-container">
        <IntoLetter end />
      </div>
      <div class="letter-container">
        <IntoLetter end top />
      </div>
      - {$t("modal.info.rules.word_ends")}
    </div>
    <hr />
    <div class="letter-postions">
      <div class="letter-container">
        <IntoLetter show success />
      </div>
      - {$t("modal.info.rules.letter_correct")}
    </div>
    <div class="letter-postions">
      <div class="letter-container">
        <IntoLetter show secondary />
      </div>
      - {$t("modal.info.rules.letter_incorrect_place")}
    </div>
    <div class="letter-postions">
      <div class="letter-container">
        <IntoLetter show />
      </div>
      - {$t("modal.info.rules.wrong_letter")}
    </div>
    <hr />
    <div class="letter-postions">
      <div class="letter-container">
        <IntoLetter focusSide="Left" hideNumbers />
      </div>
      <div class="letter-container">
        <IntoLetter focusSide="Top" hideNumbers />
      </div>
      - {$t("modal.info.rules.writing_side")}
    </div>
    <hr />
    <ul class="info">
      <li class="info-item">
        <span class="label">{$t("modal.info.labels.author")}:</span>
        Tihomir Selak
      </li>
      <li class="info-item">
        <span class="label">{$t("modal.info.labels.contact")}:</span>
        <a href="mailto:tknox.dr@gmail.com" target="_blank">tknox.dr@gmail.com</a>
      </li>
      <li class="info-item">
        <span class="label">{$t("modal.info.labels.license")}:</span>
        MIT
      </li>
      <li class="info-item">
        <span class="label">{$t("modal.info.labels.repository")}:</span>
        <a href="https://github.com/Tihi321/crosswords" target="_blank">Github</a>
      </li>
    </ul>
  </div>
</ModalWindow>

<style lang="scss">
  @import "src/styles/all";
  .container {
    padding: 20px 50px;
  }

  .info {
    display: flex;
    justify-content: space-between;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .letter-postions {
    margin-bottom: 10px;
  }

  .letter-container {
    display: inline-block;
    margin-right: 10px;
  }

  hr {
    opacity: 0.5;
    margin: 10px 0;
  }
</style>
