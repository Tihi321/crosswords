<script lang="ts">
  import { Endpoints } from "../constants";

  import { onMount } from "svelte";
  let pageName = "Home Page";

  let words: Array<string>;

  onMount(() => {
    fetch(Endpoints.General).then((res) => {
      console.log("res", res);
    });
    console.log("onMount");
  });
</script>

<main>
  <h1>{pageName}!</h1>
  <p>Welcome this is my <b>{pageName}</b></p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
