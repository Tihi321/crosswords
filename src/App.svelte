<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import Api from "./pages/Api.svelte";
  import Header from "./components/header/Header.svelte";
  import { Routes } from "./constants/enums";
  import { onMount } from "svelte";
  import { Endpoints } from "./constants/endpoints";
  import { useWords } from "./hooks";
  export let url = ""; //This property is necessary declare to avoid ignore the Router

  const { setWords } = useWords();

  onMount(() => {
    fetch(Endpoints.Random)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setWords(res);
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

<style>
  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
