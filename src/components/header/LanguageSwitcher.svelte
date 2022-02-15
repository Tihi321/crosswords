<script lang="ts">
  import { t } from "svelte-i18n";
  import { Dropdown } from "ts-components-library";

  import { ELanguages } from "../../constants";
  import { getLocalizedEndpoint } from "../../utils";
  import { useTranslations, useDevSettings, useApiWords } from "../../hooks";

  const { setCroatian, setEnglish, locale } = useTranslations();
  const { devSettings } = useDevSettings();
  const { fetchApiVocabularyWords } = useApiWords();

  $: selectedItem = {
    id: $locale,
    value: $locale === ELanguages.Croatian ? $t("languages.croatian") : $t("languages.english"),
  };

  const languageItems = [
    {
      id: ELanguages.Croatian,
      value: $t("languages.croatian"),
    },
    {
      id: ELanguages.English,
      value: $t("languages.english"),
    },
  ];

  const onChange = (event) => {
    const item = event.detail;
    if (item.id === ELanguages.Croatian) {
      setCroatian();
    } else {
      setEnglish();
    }
    if (!$devSettings.useCustomEndpoint) {
      fetchApiVocabularyWords(getLocalizedEndpoint(item.id));
    }
  };
</script>

<div class="language-switcher">
  <Dropdown selected={selectedItem} items={languageItems} on:change={onChange} />
</div>

<style lang="scss">
  @import "src/styles/all";
  .language-switcher {
    width: 120px;
  }
</style>
