<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import InputGroup from "./InputGroup.svelte";
  import Toggle from "../../common/Toggle.svelte";

  export let title: string;
  export let value: string;
  export let toggle: boolean;

  const dispatch = createEventDispatcher();

  function onInput(event) {
    dispatch("input", event.target.value);
  }

  function onToggle(event) {
    dispatch("toggle", event.detail.value);
  }
</script>

<InputGroup {title}>
  <div class="container">
    <input class="input" {value} on:input={onInput} />
    <Toggle value={toggle} on:change={onToggle} />
  </div>
</InputGroup>

<style lang="scss">
  @import "src/styles/all";

  .container {
    display: flex;
  }
  .input {
    flex: 1;
    padding: 5px;
    border-radius: 5px;
    margin-right: 5px;
  }
</style>
