<script lang="ts">
  import get from "lodash/get";
  import shuffle from "lodash/shuffle";
  import { generateCrosswordsArray } from "../../utils";

  import { useApiWords, useCrowwWords } from "../../hooks";

  const { apiWords } = useApiWords();
  const { setCrossWords, crossWords } = useCrowwWords();

  let wordsData: Array<string>;
  let namesData: Array<string>;
  let lastNamesData: Array<string>;
  let selectedWords: Array<string>;

  apiWords.subscribe((value) => {
    wordsData = get(value, ["words"], []);
    namesData = get(value, ["names"], []);
    lastNamesData = get(value, ["lastnames"], []);
  });

  crossWords.subscribe((value) => {
    selectedWords = get(value, ["selectedWords"], []);
  });

  const generateWordsArray = () => {
    setCrossWords(generateCrosswordsArray(shuffle(wordsData)));
  };

  const randomizeWordsArray = () => {
    console.log(shuffle(selectedWords));
  };
</script>

<button on:click={generateWordsArray}>Logic</button>
<button on:click={randomizeWordsArray}>Randomize</button>
