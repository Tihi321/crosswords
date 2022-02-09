<script lang="ts">
  import get from "lodash/get";
  import { Router, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Modals from "./components/modal/modals.svelte";

  import Header from "./components/header/Header.svelte";
  import { Routes } from "./constants/enums";
  import { useApiWords, useTheme, useLocalStorage, useSettings } from "./hooks";
  import type { TThemeStore } from "./types";
  import { EThemes } from "./constants";
  export let url = ""; //This property is necessary declare to avoid ignore the Router

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
  <Router {url}>
    <Header />
    <Route path={Routes.About} component={About} />
    <Route path={Routes.Home}><Home /></Route>
  </Router>
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
      --header-color: #{$header-color};
    }

    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: $app-bg-color;
  }
</style>
