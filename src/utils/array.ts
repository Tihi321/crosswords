import random from "lodash/random";
import { rangeEach } from "tsl-utils";

export const getRandomArrayIndex = <T>(array: Array<T>): number => random(array.length - 1);

export const getArrayItemAndRemove = <T>(
  array: Array<T>,
  index: number
): {
  item: T;
  items: Array<T>;
} => ({
  item: array[index],
  items: [...array.slice(0, index - 1), ...array.slice(index, array.length)],
});

export const getRandomArrayItemAndRemove = <T>(array: Array<T>) =>
  getArrayItemAndRemove(array, getRandomArrayIndex(array));

export const getRandomRangeItemsAndRemove = <T>(array: Array<T>, range: number = 5) => {
  let randomItems: Array<T> = [];
  let filteredItems: Array<T> = array;

  rangeEach(range, () => {
    const { item, items } = getRandomArrayItemAndRemove(filteredItems);

    randomItems = [...randomItems, item];
    filteredItems = items;
  });

  return {
    randomItems,
    filteredItems,
  };
};
