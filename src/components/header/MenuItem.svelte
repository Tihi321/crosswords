<script lang="ts">
  export let name: string;
  export let active: boolean;
</script>

<button class:active class="link" on:click>{name}</button>

<style lang="scss">
  @import "src/styles/all";
  .link {
    background: none;
    border: none;
    font-weight: 700;
    font-size: $menu-font-size;
    color: $menu-color;
    cursor: pointer;
  }

  .active {
    box-shadow: 0 5px 0 0 $menu-color;
  }
</style>
