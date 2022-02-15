<script lang="ts">
  import { t } from "svelte-i18n";
  import { Dropdown } from "ts-components-library";
  import { useModals, useGameSettings } from "../../../hooks";
  import { EModals, EGameDifficulty } from "../../../constants";
  import ModalWindow from "../common/ModalWindow.svelte";

  const { gameSettings } = useGameSettings();
  const { closeModal } = useModals();

  const getTranslation = (value) => {
    switch (value) {
      case EGameDifficulty.Easy:
        return $t("difficulty.easy");
      case EGameDifficulty.Normal:
        return $t("difficulty.normal");
      case EGameDifficulty.Hard:
        return $t("difficulty.hard");

      default:
        break;
    }
  };

  $: selectedItem = {
    id: $gameSettings.difficulty,
    value: getTranslation($gameSettings.difficulty),
  };

  const items = [
    {
      id: EGameDifficulty.Easy,
      value: $t("difficulty.easy"),
    },
    {
      id: EGameDifficulty.Normal,
      value: $t("difficulty.normal"),
    },
    {
      id: EGameDifficulty.Hard,
      value: $t("difficulty.hard"),
    },
  ];

  const onChange = (event) => {
    const item = event.detail;

    console.log("item", item);
    $gameSettings.difficulty = item.id;
  };

  function closeSettingsModal() {
    closeModal(EModals.GameSettings);
  }
</script>

<ModalWindow title={$t("modal.title.game_settings")} on:close={closeSettingsModal}>
  <div>{$t("difficulty.title")}</div>
  <Dropdown selected={selectedItem} {items} on:change={onChange} />

  <div>
    <div>Features:</div>
    <div>1. Veličina tablice - mala, srednja, velika</div>
    <div>2. Veličina kockica - zoom level, velika, regularna veličina</div>
  </div>
</ModalWindow>
