<script lang="ts">
  import { generateCrosswordsArray } from "../../utils";

  import { useWords } from "../../hooks";

  const { words } = useWords();

  let wordsData: Array<string>;

  words.subscribe((value) => {
    wordsData = value;
  });

  const checkTheLogic = () => generateCrosswordsArray(wordsData);
</script>

<button on:click={checkTheLogic}>Logic</button>
