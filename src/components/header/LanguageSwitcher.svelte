<script lang="ts">
  import get from "lodash/get";
  import { t } from "svelte-i18n";
  import { Dropdown } from "ts-components-library";

  import { ELanguages } from "../../constants";
  import { getLocalizedEndpoint } from "../../utils";
  import { useTranslations, useSettings, useApiWords } from "../../hooks";

  const { setCroatian, setEnglish, locale } = useTranslations();
  const { settings } = useSettings();
  const { fetchApiVocabularyWords } = useApiWords();

  let language: string;

  locale.subscribe((lang) => {
    language = lang;
  });

  $: selectedItem = {
    id: language,
    value: language === ELanguages.Croatian ? $t("languages.croatian") : $t("languages.english"),
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

  let useLocalEndpoint: boolean;

  settings.subscribe((data) => {
    useLocalEndpoint = get(data, ["useCustomEndpoint"]);
  });

  const onChange = (event) => {
    const item = event.detail;
    if (item.id === ELanguages.Croatian) {
      setCroatian();
    } else {
      setEnglish();
    }
    if (!useLocalEndpoint) {
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
