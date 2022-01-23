<script lang="ts">
  export let name: string;
  export let active: boolean;
</script>

<button class:active class="link" on:click>{name}</button>

<style lang="scss">
  .link {
    background: none;
    border: none;
    font-weight: 700;
    font-size: 18px;
    cursor: pointer;
    color: #2a2a57;
  }

  .active {
    box-shadow: 0 5px 0 0 #2a2a57;
  }
</style>
