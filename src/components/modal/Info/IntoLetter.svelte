<script lang="ts">
  import Details from "../../table/Details.svelte";
  import Letter from "../../table/Letter.svelte";

  export let success = false;
  export let secondary = false;
  export let top = false;
  export let end = false;
  export let show = false;

  const word = {
    name: "Start",
    detail: "Start",
    index: 1,
    endIndex: 6,
  };
</script>

<div class="container">
  <Details
    left={!top && !end && !show && word}
    top={top && !end && !show && word}
    leftEnd={!top && !show && end}
    topEnd={top && !show && end}
    showDetails={false}
  >
    <Letter letter="S" {show} {success} {secondary} />
  </Details>
</div>

<style lang="scss">
  .container {
    display: inline-block;
  }
</style>
