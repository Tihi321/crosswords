<script lang="ts">
  import get from "lodash/get";
  import { Router, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import Api from "./pages/Api.svelte";
  import Header from "./components/header/Header.svelte";
  import { Routes } from "./constants/enums";
  import { onMount } from "svelte";
  import { Endpoints } from "./constants/endpoints";
  import { useApiWords } from "./hooks";
  export let url = ""; //This property is necessary declare to avoid ignore the Router

  const { addApiVocaularyWords, addApiNamesWords, addApiLastNamesWords } = useApiWords();

  onMount(() => {
    fetch(Endpoints.Words)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        addApiVocaularyWords(get(res, ["data"]));
      });

    fetch(Endpoints.FirstNames)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        addApiNamesWords(get(res, ["data"]));
      });

    fetch(Endpoints.LastNames)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        addApiLastNamesWords(get(res, ["data"]));
      });
  });
</script>

<main>
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
  }

  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
