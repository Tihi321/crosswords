<div>
  <slot />
</div>

<style lang="scss">
  @import "src/styles/all";

  div {
    @extend %square-size;
    background-color: $crossword-bg-color;
    user-select: text;
    text-align: center;
    text-transform: uppercase;
    vertical-align: middle;
  }
</style>
