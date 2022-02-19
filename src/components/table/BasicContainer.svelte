<div class={`container ${$$props.class}`}>
  <slot />
</div>

<style lang="scss">
  @import "src/styles/all";

  .container {
    background-clip: content-box;
  }
</style>
