<div class={`container ${$$props.class}`}>
  <slot />
</div>

<style lang="scss">
  @import "src/styles/all";

  .container {
    background-clip: content-box;
    padding: 0 2px 2px 0;
  }
</style>
