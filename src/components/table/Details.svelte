<script lang="ts">
  import LetterContainer from "./LetterContainer.svelte";
  export let left: number = undefined;
  export let top: number = undefined;
</script>

<LetterContainer>
  <div class="container">
    {#if top}
      <div class="top">
        {top}
      </div>
    {/if}
    {#if left}
      <div class="left">
        {left}
      </div>
    {/if}
  </div>
</LetterContainer>

<style lang="scss">
  @import "src/styles/all";

  .container {
    background: $crossword-divider-bg-color;
    height: 100%;
    position: relative;
    cursor: default;
  }

  .left {
    position: absolute;
    top: 2px;
    right: 2px;
  }

  .top {
    position: absolute;
    bottom: 2px;
    left: 2px;
  }
</style>
