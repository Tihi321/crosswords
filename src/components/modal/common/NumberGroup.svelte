<script lang="ts">
  import InputGroup from "./InputGroup.svelte";

  export let title: string;
  export let value: number;
  export let buttons: boolean = true;
  export let useMax: boolean = true;
  export let min: number = 10;
  export let max: number = 60;

  $: maxMinDiff = max - min;

  const onInput = (event) => {
    value = Number(event.target.value);
  };

  const add = (number: number) => {
    const addedNumber = value + number;
    if (addedNumber <= max || !useMax) {
      value = addedNumber;
    }
  };

  const sub = (number: number) => {
    const subedNumber = value - number;
    if (subedNumber >= min) {
      value = subedNumber;
    }
  };
</script>

<InputGroup {title}>
  <div class="inputs">
    <input
      class="input"
      type="number"
      {value}
      on:input={onInput}
      {min}
      max={useMax ? max : undefined}
    />
    {#if buttons}
      <button class="button" disabled={maxMinDiff < 5} on:click={() => sub(5)}>-5</button>
      <button class="button" on:click={() => sub(1)}>-1</button>
      <button class="button" on:click={() => add(1)}>+1</button>
      <button class="button" disabled={maxMinDiff < 5} on:click={() => add(5)}>+5</button>
    {/if}
  </div>
</InputGroup>

<style lang="scss">
  @import "src/styles/all";

  .input {
    flex: 1;
    padding: 5px;
    border-radius: 5px;
  }

  .button {
    @include contrast-button("small");
    margin-left: 10px;
  }

  .inputs {
    width: 100%;
    display: flex;
    align-items: center;
  }
</style>
