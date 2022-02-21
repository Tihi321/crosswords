<script lang="ts">
  import LetterContainer from "./LetterContainer.svelte";
  import { createEventDispatcher } from "svelte";
  export let letter: string;
  export let show: boolean = false;
  export let focus: boolean = false;
  export let success: boolean = false;
  export let secondary: boolean = false;

  const dispatch = createEventDispatcher();

  let inputRef;

  $: {
    if (focus && inputRef) {
      inputRef.focus();
    }
  }

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
    <input class="input letter" on:input={onInput} maxlength={1} bind:this={inputRef} />
  {/if}
</LetterContainer>

<style lang="scss">
  @import "src/styles/all";

  .letter {
    @extend %square-size;
    font-size: $medium-font-size;
    background-color: $crossword-bg-color;
    color: $crossword-text-color;
    text-transform: uppercase;
    cursor: default;
  }

  .secondary {
    background-color: $crossword-bg-secondary-color;
  }

  .success {
    background-color: $crossword-bg-success-color;
  }

  .input {
    outline: 0;
    border: 0;
    padding: 0;
    text-align: center;
    background: none;
    cursor: pointer;
  }
</style>
