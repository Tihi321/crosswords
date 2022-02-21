<script lang="ts">
  import { onMount } from "svelte";
  import isEmpty from "lodash/isEmpty";
  import Home from "./pages/Home.svelte";
  import Modals from "./components/modal/Modals.svelte";
  import ThemeContainer from "./components/common/ThemeContainer.svelte";
  import Container from "./components/common/Container.svelte";
  import Header from "./components/header/Header.svelte";
  import { useApiWords, useLocalSettings } from "./hooks";
  import { getLocalizedEndpoint } from "./utils";

  const { fetchApiVocabularyWords } = useApiWords();
  const { theme, setLocalStorageState, gameSettings, devSettings } = useLocalSettings();

  onMount(() => {
    setLocalStorageState();
    if (!$devSettings.useCustomEndpoint || !isEmpty($devSettings.endpoint)) {
      fetchApiVocabularyWords(getLocalizedEndpoint($gameSettings.wordsLanguage));
    } else {
      fetchApiVocabularyWords($devSettings.endpoint);
    }
  });
</script>

<ThemeContainer theme={$theme.theme} zoom={$gameSettings.zoom}>
  <main>
    <Modals />
    <Container>
      <div class="content">
        <Header />
        <Home />
      </div>
    </Container>
  </main>
</ThemeContainer>

<style lang="scss">
  @import "src/styles/all";

  main {
    color: $font-color;
    background-color: $bg-color;
  }

  .content {
    display: grid;
    grid-template-rows: min-content 1fr;
    grid-gap: 50px;
    height: 100%;
  }
</style>
