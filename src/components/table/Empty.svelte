<script lang="ts">
  export let transparent: boolean = false;
</script>

<div class:transparent />

<style lang="scss">
  @import "src/styles/all";

  div {
    @extend %square-size;
    background-color: $crossword-empty-bg-color;

    &.transparent {
      background-color: transparent;
    }
  }
</style>
