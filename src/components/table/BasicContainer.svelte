<div class={`container ${$$props.class}`}>
  <slot />
</div>

<style lang="scss">
  @import "src/styles/all";

  .container {
    height: 100%;
    width: 100%;
    display: flex;
    padding: 0 3px 5px 0;
  }
</style>
