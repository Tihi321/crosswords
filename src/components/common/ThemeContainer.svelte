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
    }
  }

  .styles {
    &.light-theme {
      --primary-color: #{$primary-color};
      --secondary-color: #{$secondary-color};
      --tertiary-color: #{$tertiary-color};
      --success-color: #{$success-color};
      --fill-color: #{$fill-color};
      --text-color: #{$text-color};
      --crossword-color: #{$crossword-color};
      --shadow-color: #{$shadow-color};
      --backdrop-color: #{$backdrop-color};
      --modal-window-color: #{$modal-window-color};
      --header-color: #{$header-color};
    }
    &.dark-theme {
      --primary-color: #{$primary-color};
      --secondary-color: #{$secondary-color};
      --tertiary-color: #{$tertiary-color};
      --success-color: #{$success-color};
      --fill-color: #{$fill-color};
      --text-color: #{$text-color};
      --crossword-color: #{$crossword-color};
      --shadow-color: #{$shadow-color};
      --backdrop-color: #{$backdrop-color};
      --modal-window-color: #{$modal-window-color};
      --header-color: #{$header-color};
    }
  }
</style>
