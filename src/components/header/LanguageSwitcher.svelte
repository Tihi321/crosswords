<script lang="ts">
  import { onMount } from "svelte";
  import { t } from "svelte-i18n";
  import { ELanguages } from "../../constants";
  import { useTranslations, useLocalStorage } from "../../hooks";

  const { setCroatian, setEnglish, locale, setLocale } = useTranslations();
  const { getLocalLanguage } = useLocalStorage();

  let language: string;

  locale.subscribe((lang) => {
    language = lang;
  });

  function onChange(event) {
    if (event.target.value === ELanguages.Croatian) {
      setCroatian();
    } else {
      setEnglish();
    }
  }

  onMount(() => {
    const localLanguage = getLocalLanguage();

    if (localLanguage) {
      setLocale(localLanguage);
    }
  });
</script>

<select name="languages" on:change={onChange}>
  <option value={ELanguages.Croatian} selected={language === ELanguages.Croatian}
    >{$t("languages.croatian")}</option
  >
  <option value={ELanguages.English} selected={language !== ELanguages.Croatian}
    >{$t("languages.english")}</option
  >
</select>
