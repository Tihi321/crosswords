export type TWordItem = {
  detail: string;
  name: string;
}
export type TWordArray = Array<TWordItem>

export type TWordObject = {
  detail: string;
  name: string;
  length: number;
  chars: string[];
}

export type TDetail = {
  name: string;
  index: number;
  description: string;
  success: boolean;
};

export type TDetails = {
  [key: string]: TDetail
};

export type TLettersInfo = {
  [key: string]: {
    char: string,
    success: boolean,
  }
};

export type TWordInfo = {
  wordIndex: number;
  name: string,
  letters: TLettersInfo,
  success: boolean,
  rowIndex: number[],
  columnIndex: number[],
};


export type TWordsInfo = {
  [key: string]: TWordInfo
}

export type TWordInputData = {
  value: string;
  rowIndex: number;
  itemIndex: number;
}

export type TWordInputs = {
  [key: string]: TWordInputData
}
