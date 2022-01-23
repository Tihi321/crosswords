<script lang="ts">
  import { Endpoints } from "../constants";

  import { onMount } from "svelte";
  let pageName = "Home Page";

  let words: Array<string> = [];

  onMount(() => {
    fetch(Endpoints.General)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        words = res.data.strings;
      });
  });
</script>

<main>
  <h1>{pageName}!</h1>
  {#each words as word, i}
    <li>
      {i + 1}: {word}
    </li>
  {/each}
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
