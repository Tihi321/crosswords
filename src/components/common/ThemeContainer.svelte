<script lang="ts">
  import { EThemes, EZoomLevel } from "../../constants";
  export let theme: EThemes = EThemes.Light;
  export let zoom: EZoomLevel = EZoomLevel.Normal;
</script>

<div
  class="styles"
  class:light-theme={theme === EThemes.Light}
  class:dark-theme={theme === EThemes.Dark}
  class:zoom-normal={zoom === EZoomLevel.Normal}
  class:zoom-large={zoom === EZoomLevel.Large}
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
    @include add-map-modifiers($theme-colors, shared, color);

    @include add-modifier(ts-simple-input-font-family, $font-family, null);
    @include add-modifier(ts-accordion-bottom-border, $details-accordion-header-border, null);

    &.zoom-normal {
      @include add-map-modifiers(map-get-strict($size-variables, crossword), normal, size);
    }

    &.zoom-large {
      @include add-map-modifiers(map-get-strict($size-variables, crossword), large, size);
    }

    &.light-theme {
      @include add-map-modifiers($theme-colors, light, color);
    }
    &.dark-theme {
      @include add-map-modifiers($theme-colors, dark, color);
    }

    @include add-map-modifiers(map-get-strict($theme-colors, libraries), ts-components, color);
  }
</style>
