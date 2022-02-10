<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import InputGroup from "./InputGroup.svelte";

  export let title: string;
  export let value: string;

  const dispatch = createEventDispatcher();

  function onInput(event) {
    dispatch("input", event.target.value);
  }
</script>

<InputGroup {title}>
  <input class="input" {value} on:input={onInput} />
</InputGroup>

<style lang="scss">
  @import "src/styles/all";

  .input {
    width: 100%;
    padding: 5px;
    border-radius: 5px;
  }
</style>
