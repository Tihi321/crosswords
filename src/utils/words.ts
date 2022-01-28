import includes from "lodash/includes";

type TWordObject = {
  string: string;
  chars: string[];
  matches: any;
}

export const generateWordObject = (word: string): TWordObject => ({
  string: word,
  chars: word.split(""),
  matches: {},
})

export const addMatches = (wordsArray: TWordObject[]): TWordObject[] => {
  let returnArray = [];

  for(var i = 0; i < wordsArray.length; i++){
    const wordItem = {...wordsArray[i]};

    for(var j = 0; j < wordItem.chars.length; j++){
      const charItem = wordItem.chars[j];
  
      for(var k = 0; k < wordsArray.length; k++){
        const innerWordItem = wordsArray[k];
        const defaultTotalMatches = wordItem.matches[charItem] || [];
  
        if (wordItem.string !== innerWordItem.string) {
          if (!includes(defaultTotalMatches, innerWordItem.string)) {
            wordItem.matches = {
              ...wordItem.matches,
              [charItem]: charItem === innerWordItem.chars[0] ? [...defaultTotalMatches, innerWordItem.string] : defaultTotalMatches
            };
          }
        }
      }
    }
    returnArray = [...returnArray, wordItem];
  }

  return returnArray;
}