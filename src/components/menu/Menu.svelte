<script lang="ts">
  import { EModals } from "../../constants";
  import { useGame, useModals } from "../../hooks";

  const { startGame } = useGame();
  const { openModal } = useModals();

  function openSettingsModal() {
    openModal(EModals.Settings);
  }

  function openAboutModal() {
    openModal(EModals.About);
  }
</script>

<ul class="menu">
  <li class="menu-item">
    <button class="contrast-button" on:click={startGame}>New Game</button>
  </li>
  <li class="menu-item">
    <button class="contrast-button" on:click={openSettingsModal}>Settings</button>
  </li>
  <li class="menu-item">
    <button class="contrast-button" on:click={openAboutModal}>About</button>
  </li>
  <li class="menu-item">
    <a class="link" href={"/design"} target="_blank">Storybook</a>
  </li>
</ul>

<style lang="scss">
  @import "src/styles/all";

  .link {
    color: $button-color;
  }

  .menu {
    text-align: center;
  }

  .menu-item {
    margin-bottom: 10px;
  }

  .contrast-button {
    @include contrast-button("big");
  }
</style>
