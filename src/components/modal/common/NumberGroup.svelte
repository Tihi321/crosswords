<script lang="ts">
  import { Input } from "ts-components-library";
  import InputGroup from "./InputGroup.svelte";

  export let title: string;
  export let value: number;
  export let buttons: boolean = true;
  export let useMax: boolean = true;
  export let min: number = 10;
  export let max: number = 60;

  $: maxMinDiff = max - min;

  const onInput = (event) => {
    value = Number(event.detail.value);
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
    {#if buttons}
      <button class="button left" disabled={maxMinDiff < 5} on:click={() => sub(5)}>-5</button>
      <button class="button left" on:click={() => sub(1)}>-1</button>
    {/if}
    <div class="input">
      <Input
        {value}
        type="number"
        on:change={onInput}
        {min}
        max={useMax ? max : "inifinity"}
        border={true}
      />
    </div>
    {#if buttons}
      <button class="button right" on:click={() => add(1)}>+1</button>
      <button class="button right" disabled={maxMinDiff < 5} on:click={() => add(5)}>+5</button>
    {/if}
  </div>
</InputGroup>

<style lang="scss">
  @import "src/styles/all";

  .input {
    width: 100%;
  }

  .button {
    @include contrast-button("small");

    &.left {
      margin-right: 10px;
    }

    &.right {
      margin-left: 10px;
    }
  }

  .inputs {
    width: 100%;
    display: flex;
    align-items: center;
  }
</style>
