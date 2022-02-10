<script lang="ts">
  export let transparent: boolean = false;
</script>

<div class:transparent />

<style lang="scss">
  @import "src/styles/all";

  div {
    @extend %square-size;
    background-color: $crossword-empty-bg-color;

    &:hover {
      filter: drop-shadow(0px 0px 1px $crossword-details-color);
    }

    &.transparent {
      background-color: transparent;
      box-shadow: 0 0 0 1px $crossword-empty-bg-color;
      opacity: 0.4;
    }
  }
</style>
