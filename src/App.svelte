<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import Api from "./pages/Api.svelte";
  import Header from "./components/header/Header.svelte";
  import { Routes } from "./constants/enums";
  export let url = ""; //This property is necessary declare to avoid ignore the Router
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
