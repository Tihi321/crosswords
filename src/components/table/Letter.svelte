<script lang="ts">
  import LetterContainer from "./LetterContainer.svelte";
  import { createEventDispatcher } from "svelte";
  export let letter: string;
  export let show: boolean = false;
  export let success: boolean = false;
  export let secondary: boolean = false;

  const dispatch = createEventDispatcher();

  const onInput = (event: any) => {
    dispatch("input", {
      value: event.target.value as string,
    });
  };
</script>

<LetterContainer>
  {#if show}
    <div class="letter" class:success class:secondary>
      {letter}
    </div>
  {:else}
    <input class="input letter" on:input={onInput} maxlength={1} />
  {/if}
</LetterContainer>

<style lang="scss">
  @import "src/styles/all";

  .letter {
    font-size: $medium-font-size;
    background-color: $crossword-bg-color;
    color: $crossword-text-color;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    cursor: default;
  }

  .secondary {
    background-color: $crossword-bg-secondary-color;
  }

  .success {
    background-color: $crossword-bg-success-color;
  }

  .input {
    @extend %square-size;
    outline: 0;
    border: 0;
    padding: 0;
    text-align: center;
    background: none;
    cursor: pointer;

    &:focus {
      box-shadow: inset 0 0 0 2px $crossword-input-border-color;
    }
  }
</style>
