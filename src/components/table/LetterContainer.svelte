<div>
  <slot />
</div>

<style lang="scss">
  @import "src/styles/all";

  div {
    @extend %square-size;
    font-family: $font-family;
    background-color: $crossword-bg-color;
    border: 1px solid $dark-color;
    user-select: text;
    text-align: center;
    text-transform: uppercase;
    vertical-align: middle;
  }
</style>
