<script lang="ts">
  export let title: string;
</script>

<div class="group">
  <h3 class="group-title">{title}</h3>
  <div class="inputs">
    <div class="content">
      <slot />
    </div>
  </div>
</div>

<style lang="scss">
  @import "src/styles/all";
  .group {
    padding: 10px 0;
  }

  .group-title {
    font-size: $default-font-size;
    color: $button-color;
    margin: 0 0 5px 0;
    font-weight: normal;
  }
  .inputs {
    display: flex;
  }

  .content {
    flex: 1;
  }
</style>
