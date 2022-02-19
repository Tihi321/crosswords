<script lang="ts">
  import { t } from "svelte-i18n";
</script>

<ul class="about">
  <li>
    <span class="label">{$t("modal.settings.sub_modals.about.labels.author")}</span>
    : Tihomir Selak
  </li>
  <li>
    <span class="label">{$t("modal.settings.sub_modals.about.labels.license")}</span>
    : MIT
  </li>
  <li>
    <span class="label">{$t("modal.settings.sub_modals.about.labels.repository")}</span>
    : <a href="https://github.com/Tihi321/crosswords" target="_blank">Github</a>
  </li>
  <li>
    <span class="label">e-mail</span>
    : <a href="mailto:tknox.dr@gmail.com" target="_blank">tknox.dr@gmail.com</a>
  </li>
</ul>

<style lang="scss">
  @import "src/styles/all";

  .about {
    margin: 0;
    font-size: $default-font-size;
    color: $button-color;
    font-weight: normal;
  }

  .label {
    font-weight: bold;
  }
</style>
