<script lang="ts">
  import get from "lodash/get";
  import { t } from "svelte-i18n";
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

  let useLocalEndpoint: boolean;

  settings.subscribe((data) => {
    useLocalEndpoint = get(data, ["useCustomEndpoint"]);
  });

  function onChange(event) {
    if (event.target.value === ELanguages.Croatian) {
      setCroatian();
    } else {
      setEnglish();
    }

    if (!useLocalEndpoint) {
      fetchApiVocabularyWords(getLocalizedEndpoint(event.target.value));
    }
  }
</script>

<select name="languages" on:change={onChange}>
  <option value={ELanguages.Croatian} selected={language === ELanguages.Croatian}
    >{$t("languages.croatian")}</option
  >
  <option value={ELanguages.English} selected={language !== ELanguages.Croatian}
    >{$t("languages.english")}</option
  >
</select>
