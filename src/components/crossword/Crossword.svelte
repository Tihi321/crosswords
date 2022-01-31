<script lang="ts">
  import get from "lodash/get";
  import { generateSelector } from "tsl-utils";
  import { generateCrosswordsArray } from "../../utils";

  import { getRandomPeopleNames, getRandomizedWordsData } from "../../selectors";

  import { useApiWords, useCrossWords } from "../../hooks";
  import type { TPeopleNamesInfo, TWordApi } from "../../types";

  const { apiWords } = useApiWords();
  const { setCrossWords, crossWords } = useCrossWords();

  let state: any;
  let selectedWords: Array<string>;

  apiWords.subscribe((value) => {
    state = value;
  });

  crossWords.subscribe((value) => {
    selectedWords = get(value, ["selectedWords"], []);
  });

  $: stateSelector = generateSelector(state);

  $: wordsData = getRandomizedWordsData(stateSelector) as TWordApi;
  $: fullPeopleNames = getRandomPeopleNames(stateSelector) as TPeopleNamesInfo;

  const generateWordsArray = () => {
    setCrossWords(
      generateCrosswordsArray({
        words: wordsData,
        names: fullPeopleNames,
      })
    );
  };

  const generatePeopleNames = () => {
    console.log(fullPeopleNames);
  };
</script>

<button on:click={generateWordsArray}>Logic</button>
<button on:click={generatePeopleNames}>Randomize</button>
