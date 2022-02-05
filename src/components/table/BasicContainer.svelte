<div class={`container ${$$props.class}`}>
  <slot />
</div>

<style lang="scss">
  @import "src/styles/all";

  .container {
    height: 100%;
    background-clip: content-box;
    width: 100%;
    display: flex;
    padding: 0 2px 4px 0;
    margin: 0 2px 4px 0;
  }
</style>
