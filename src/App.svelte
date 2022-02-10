<script lang="ts">
  import get from "lodash/get";
  import { onMount } from "svelte";
  import Home from "./pages/Home.svelte";
  import Modals from "./components/modal/Modals.svelte";
  import Header from "./components/header/Header.svelte";
  import { useApiWords, useTheme, useLocalStorage, useSettings } from "./hooks";
  import type { TThemeStore } from "./types";
  import { EThemes } from "./constants";

  const { settings, setEndpoint } = useSettings();
  const { addApiVocaularyWords } = useApiWords();
  const { setLightTheme, setDarkTheme, theme } = useTheme();
  const { getLocalTheme, getLocalEndpoint } = useLocalStorage();

  let themeState: EThemes;
  let endpoint: string;

  theme.subscribe((value: TThemeStore) => {
    themeState = value.theme;
  });

  settings.subscribe((value) => {
    endpoint = get(value, ["endpoint"]);
  });

  function fetchWords(url) {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        addApiVocaularyWords(get(res, ["data"]));
      });
  }
  onMount(() => {
    const localStorageTheme = getLocalTheme();
    const localEndpoint = getLocalEndpoint();

    if (localStorageTheme) {
      if (localStorageTheme === EThemes.Light) {
        setLightTheme();
      } else {
        setDarkTheme();
      }
    }

    if (localEndpoint) {
      setEndpoint(localEndpoint);
      fetchWords(localEndpoint);
    } else {
      fetchWords(endpoint);
    }
  });
</script>

<main
  class:light-theme={themeState === EThemes.Light}
  class:dark-theme={themeState === EThemes.Dark}
>
  <Modals />
  <Header />
  <Home />
</main>

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

  main {
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

    min-height: 100vh;
    background-color: $app-bg-color;
    display: grid;
    grid-template-rows: min-content 1fr;
  }
</style>
