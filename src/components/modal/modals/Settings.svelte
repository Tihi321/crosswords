<script lang="ts">
  import { t } from "svelte-i18n";
  import { useModals, useSettings } from "../../../hooks";
  import { EModals, ESettingsModalRoutes } from "../../../constants";
  import ModalWindow from "../common/ModalWindow.svelte";
  import GameSettings from "../settings/GameSettings.svelte";
  import DevSettings from "../settings/DevSettings.svelte";
  import About from "../settings/About.svelte";

  const { closeModal } = useModals();
  const { settings } = useSettings();

  function closeSettingsModal() {
    closeModal(EModals.Settings);
  }
</script>

<ModalWindow title={$t("modal.settings.title")} on:close={closeSettingsModal}>
  <div class="container">
    <ul class="menu">
      <li
        class:selected={$settings.settingsRoute === ESettingsModalRoutes.GameSettings}
        class="menu-item"
        on:click={() => ($settings.settingsRoute = ESettingsModalRoutes.GameSettings)}
      >
        {$t("modal.settings.menu.game_settings")}
      </li>
      {#if $settings.devSettings}
        <li
          class:selected={$settings.settingsRoute === ESettingsModalRoutes.DevSettings}
          class="menu-item"
          on:click={() => ($settings.settingsRoute = ESettingsModalRoutes.DevSettings)}
        >
          {$t("modal.settings.menu.dev_settings")}
        </li>
      {/if}
      <li
        class:selected={$settings.settingsRoute === ESettingsModalRoutes.About}
        class="menu-item"
        on:click={() => ($settings.settingsRoute = ESettingsModalRoutes.About)}
      >
        {$t("modal.settings.menu.about")}
      </li>
    </ul>
    <div class="content">
      {#if $settings.settingsRoute === ESettingsModalRoutes.GameSettings}
        <GameSettings />
      {/if}
      {#if $settings.settingsRoute === ESettingsModalRoutes.DevSettings}
        <DevSettings />
      {/if}
      {#if $settings.settingsRoute === ESettingsModalRoutes.About}
        <About />
      {/if}
    </div>
  </div>
</ModalWindow>

<style lang="scss">
  @import "src/styles/all";
  .container {
    display: flex;
    width: $settings-modal-container-width;
  }

  .content {
    flex: 1;
    padding: 20px;
    height: $settings-modal-content-height;
    overflow: auto;
  }

  .menu {
    margin: 0;
    background-color: $settings-modal-menu-bg-color;
    min-width: 120px;
  }

  .menu-item {
    padding: 10px;
    cursor: pointer;
    border-left: 5px solid transparent;

    &.selected {
      background-color: $settings-modal-menu-item-selected-bg-color;
      border-left-color: $settings-modal-menu-item-selected-border-color;
    }
  }
</style>
