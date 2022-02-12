<script lang="ts">
  import { t } from "svelte-i18n";
  import { EModals } from "../../constants";
  import { useGame, useModals } from "../../hooks";

  const { startGame } = useGame();
  const { openModal } = useModals();

  const openSettingsModal = () => {
    openModal(EModals.Settings);
  };

  const openAboutModal = () => {
    openModal(EModals.About);
  };
</script>

<div class="centered">
  <div class="logo">{$t("title")}</div>
  <ul class="menu">
    <li class="menu-item">
      <button class="contrast-button" on:click={startGame}>{$t("main_menu.title")}</button>
    </li>
    <li class="menu-item">
      <button class="contrast-button" on:click={openSettingsModal}
        >{$t("main_menu.settings")}</button
      >
    </li>
    <li class="menu-item">
      <button class="contrast-button" on:click={openAboutModal}>{$t("main_menu.about")}</button>
    </li>
    <li class="menu-item">
      <a class="link" href={"/design"} target="_blank">Storybook</a>
    </li>
  </ul>
</div>

<style lang="scss">
  @import "src/styles/all";

  .centered {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .logo {
    @extend %flex-centered;
    padding: 50px;
    font-size: 50px;
    font-weight: bold;
    border: 5px solid $font-color;
    justify-self: flex-start;
  }

  .link {
    color: $button-color;
  }

  .menu {
    padding-top: 30px;
    text-align: center;
  }

  .menu-item {
    margin-bottom: 10px;
  }

  .contrast-button {
    @include contrast-button("big");
  }
</style>
