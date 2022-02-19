<script lang="ts">
  import { Toggle } from "ts-components-library";

  export let title: string;
  export let toggle: boolean;

  const onToggle = (event) => {
    toggle = event.detail.value;
  };
</script>

<div class="container">
  {title}
  <Toggle value={toggle} on:change={onToggle} />
</div>

<style lang="scss">
  @import "src/styles/all";

  .container {
    display: flex;
    justify-content: space-between;
  }
</style>
