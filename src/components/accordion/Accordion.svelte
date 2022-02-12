<script lang="ts">
  import Chevron from "../icons/Chevron.svelte";
  export let open: boolean = false;

  const onClick = () => {
    open = !open;
  };
</script>

<div class="container">
  <div class="header" on:click={onClick}>
    <div class="icon-container">
      <div class="icon" class:open>
        <Chevron />
      </div>
    </div>
    <div class="title">
      <slot name="title" />
    </div>
  </div>
  <div class="content" class:open>
    <slot />
  </div>
</div>

<style lang="scss">
  @import "src/styles/all";

  .container {
    overflow: hidden;
    color: $accordion-color;
  }

  .header {
    padding: 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-bottom: 2px solid $accordion-border-color;
    background: $accordion-bg-color;
  }

  .title {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }

  .content {
    padding: 0 36px;
    opacity: 0;
    max-height: 0;
    transition: all 0.3s ease;
    background-color: $accordion-content-bg-color;
    color: $accordion-content-color;

    &.open {
      padding: 8px 36px;
      max-height: 9999px;
      opacity: 1;
    }
  }

  .icon-container {
    padding-right: 10px;
  }

  .icon {
    transition: transform 0.2s ease;
    transform: rotate(180deg);

    &.open {
      transform: rotate(0);
    }

    :global(.arrow-icon-path) {
      fill: $accordion-icon-color;
    }
  }
</style>
