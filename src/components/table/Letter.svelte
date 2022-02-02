<script lang="ts">
  import LetterContainer from "./LetterContainer.svelte";
  import { createEventDispatcher } from "svelte";
  export let letter: string;
  export let show: boolean = true;
  export let success: boolean = false;

  const dispatch = createEventDispatcher();

  function onInput(event: any) {
    dispatch("change", {
      value: event.target.value,
    });
  }
</script>

<LetterContainer>
  {#if show}
    <div class="letter" class:success>
      {letter}
    </div>
  {:else}
    <input class="letter" on:input={onInput} maxlength={1} />
  {/if}
</LetterContainer>

<style lang="scss">
  @import "src/styles/all";

  .letter {
    font-family: $font-family;
    font-size: $crossword-font-size;
    text-transform: uppercase;
    height: 100%;
    cursor: default;
  }

  .success {
    background-color: $crossword-bg-success-color;
  }

  input {
    @extend %square-size;
    outline: 0;
    border: 0;
    padding: 0;
    text-align: center;
    background: none;

    &:focus {
      box-shadow: inset 0 0 0 2px $crossword-input-border-color;
    }
  }
</style>
