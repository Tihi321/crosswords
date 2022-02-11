<script lang="ts">
  import { onMount } from "svelte";
  import Home from "./pages/Home.svelte";
  import Modals from "./components/modal/Modals.svelte";
  import ThemeContainer from "./components/common/ThemeContainer.svelte";
  import Header from "./components/header/Header.svelte";
  import { useApiWords, useTheme, useLocalStorage, useSettings, useTranslations } from "./hooks";
  import type { TThemeStore } from "./types";
  import { EThemes } from "./constants";
  import { getLocalizedEndpoint } from "./utils";

  const { setEndpoint } = useSettings();
  const { locale, setLocale } = useTranslations();
  const { fetchApiVocabularyWords } = useApiWords();
  const { setLightTheme, setDarkTheme, theme } = useTheme();
  const { getLocalTheme, getLocalEndpoint, getLocalUseCustomEndpoint, getLocalLanguage } =
    useLocalStorage();

  let themeState: EThemes;

  theme.subscribe((value: TThemeStore) => {
    themeState = value.theme;
  });

  let language: string;

  locale.subscribe((lang) => {
    language = lang;
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

    const localLanguage = getLocalLanguage();

    if (localLanguage) {
      setLocale(localLanguage);
    }

    const correctLanguage = localLanguage || language;

    const localEndpoint = getLocalEndpoint();
    const localUseCustomEndpoint = getLocalUseCustomEndpoint();

    setEndpoint({
      endpoint: localEndpoint,
      useCustomEndpoint: localUseCustomEndpoint,
    });

    if (localEndpoint && localUseCustomEndpoint) {
      fetchApiVocabularyWords(localEndpoint);
    } else {
      fetchApiVocabularyWords(getLocalizedEndpoint(correctLanguage));
    }
  });
</script>

<ThemeContainer theme={themeState}>
  <main>
    <Modals />
    <Header />
    <Home />
  </main>
</ThemeContainer>

<style lang="scss">
  @import "src/styles/all";

  main {
    min-height: 100vh;
    background-color: $app-bg-color;
    display: grid;
    grid-template-rows: min-content 1fr;
  }
</style>
