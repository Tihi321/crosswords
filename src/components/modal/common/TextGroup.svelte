<script lang="ts">
  import { Input } from "ts-components-library";
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
    <div class="input">
      <Input {value} on:change={onInput} border={true} />
    </div>
    <Toggle value={toggle} on:change={onToggle} />
  </div>
</InputGroup>

<style lang="scss">
  @import "src/styles/all";

  .container {
    display: flex;
    align-items: center;
  }
  .input {
    padding: 5px;
    width: 100%;
    margin-right: 5px;
  }
</style>
