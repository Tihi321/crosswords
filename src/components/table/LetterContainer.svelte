<div>
  <slot />
</div>

<style lang="scss">
  @import "src/styles/all";

  div {
    @extend %square-size;
    box-shadow: 0 0 0 1px $crossword-letter-border-color;
    user-select: text;
    text-align: center;
    text-transform: uppercase;
    vertical-align: middle;
  }
</style>
