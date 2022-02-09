<script lang="ts">
  import get from "lodash/get";
  import { useModals, useSettings } from "../../hooks";
  import { EModals } from "../../constants";

  const { closeModal } = useModals();
  const { settings, setEndpoint } = useSettings();

  let endpoint: string;

  settings.subscribe((value) => {
    endpoint = get(value, ["endpoint"]);
  });

  function closeApiModal() {
    closeModal(EModals.Api);
  }

  function onSetEndpoint() {
    setEndpoint(endpoint);
  }

  function onInput(event) {
    endpoint = event.target.value as string;
  }
</script>

<div class="api-modal">
  api modal
  <input class="input" value={endpoint} on:input={onInput} />
  <button on:click={onSetEndpoint}>Set endpoint</button>
  <button on:click={closeApiModal}>Close modal</button>
</div>

<style lang="scss">
  @import "src/styles/all";
  .api-modal {
    width: 200px;
  }
</style>
