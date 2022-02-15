<script lang="ts">
  import InputGroup from "./InputGroup.svelte";
  import { Toggle } from "ts-components-library";

  export let title: string;
  export let value: string;
  export let toggle: boolean;

  const onInput = (event) => {
    value = event.detail.value;
  };

  const onToggle = (event) => {
    toggle = event.detail.value;
  };
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
