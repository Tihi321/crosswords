<script lang="ts">
  import OptionTitle from "./OptionTitle.svelte";
  export let title: string;
</script>

<div class="group">
  <OptionTitle {title} />
  <div class="inputs">
    <div class="content">
      <slot />
    </div>
  </div>
</div>

<style lang="scss">
  @import "src/styles/all";
  .group {
    padding: 10px 0;
  }
  .inputs {
    display: flex;
  }

  .content {
    flex: 1;
  }
</style>
