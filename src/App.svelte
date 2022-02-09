<script lang="ts">
  import get from "lodash/get";
  import { Router, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import Home from "./pages/Home.svelte";
  import Api from "./pages/Api.svelte";

  import Header from "./components/header/Header.svelte";
  import { Routes } from "./constants/enums";
  import { Endpoints } from "./constants/endpoints";
  import { useApiWords, useTheme, useLocalStorage } from "./hooks";
  import type { TThemeStore } from "./types";
  import { EThemes } from "./constants";
  export let url = ""; //This property is necessary declare to avoid ignore the Router

  const { addApiVocaularyWords } = useApiWords();
  const { setLightTheme, setDarkTheme, theme } = useTheme();
  const { getLocalTheme } = useLocalStorage();

  let themeState: EThemes;

  theme.subscribe((value: TThemeStore) => {
    themeState = value.theme;
  });

  onMount(() => {
    const localStorageTheme = getLocalTheme();

    if (localStorageTheme) {
      if (localStorageTheme === EThemes.Light) {
        setLightTheme();
      } else {
        setDarkTheme();
      }
    }

    fetch(Endpoints.Words)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        addApiVocaularyWords(get(res, ["data"]));
      });
  });
</script>

<main
  class:light-theme={themeState === EThemes.Light}
  class:dark-theme={themeState === EThemes.Dark}
>
  <Router {url}>
    <Header />
    <Route path={Routes.Api} component={Api} />
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
      --header-color: #{$header-color};
    }

    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: $app-bg-color;
  }
</style>
