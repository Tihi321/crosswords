<script lang="ts">
  import { EThemes } from "../../constants";
  export let theme: EThemes = EThemes.Light;
</script>

<div
  class="styles"
  class:light-theme={theme === EThemes.Light}
  class:dark-theme={theme === EThemes.Dark}
>
  <slot />
</div>

<style lang="scss">
  @import "src/styles/all";
  :global {
    body {
      @extend %default-body;
    }

    ul {
      @extend %reset-list;
    }

    button {
      @extend %reset-button;
    }

    a {
      @extend %reset-link;
      color: $link-color;
    }
  }

  .styles {
    @include add-custom-variables($theme-colors, shared, color);
    &.light-theme {
      @include add-custom-variables($theme-colors, light, color);
    }
    &.dark-theme {
      @include add-custom-variables($theme-colors, dark, color);
    }
  }
</style>
