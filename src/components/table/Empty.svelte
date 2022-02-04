<script lang="ts">
  export let transparent: boolean = false;
  $: color = transparent ? "transparent" : "rgba(32, 32, 32, 1)";
</script>

<div style="--empty-color: {color}" />

<style lang="scss">
  @import "src/styles/all";

  div {
    @extend %square-size;
    background-color: var(--empty-color);
  }
</style>
