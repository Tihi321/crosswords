<script lang="ts">
  import { EModals } from "../../constants";
  import { useGame, useModals } from "../../hooks";

  const { startGame } = useGame();
  const { openModal } = useModals();

  function openApiModal() {
    openModal(EModals.Api);
  }
</script>

<div>
  <ul>
    <li>
      <button on:click={startGame}>New Game</button>
    </li>
    <li>
      <button on:click={openApiModal}>Open Api modal</button>
    </li>
    <li>
      <a class="link" href={"/design"}>Storybook</a>
    </li>
  </ul>
</div>

<style lang="scss">
  @import "src/styles/all";

  div {
    font-size: $crossword-font-size;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    cursor: default;
  }
</style>
