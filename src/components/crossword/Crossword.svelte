<script lang="ts">
  import get from "lodash/get";
  import { generateSelector } from "tsl-utils";
  import { generateCrosswordsTable } from "../../utils";

  import { getRandomNameWords, getRandomizedWordsData } from "../../selectors";

  import { useApiWords, useCrossWords } from "../../hooks";
  import type { TWordArray } from "../../types";

  const { apiWords } = useApiWords();
  const { addCrosswordTable, crossWord } = useCrossWords();

  let apiWordsState: any;
  let crossWordState: any;

  apiWords.subscribe((value) => {
    apiWordsState = value;
  });

  crossWord.subscribe((value) => {
    crossWordState = value;
  });

  $: stateSelector = generateSelector(apiWordsState);

  $: wordsData = getRandomizedWordsData(stateSelector) as TWordArray;
  $: namesWordsData = getRandomNameWords(stateSelector) as TWordArray;

  $: {
    console.log("crossWordState", crossWordState);
  }

  const generateWordsArray = () => {
    addCrosswordTable(
      generateCrosswordsTable({
        words: wordsData,
        names: namesWordsData,
      })
    );
  };
</script>

<button on:click={generateWordsArray}>Logic</button>
