import { writable } from 'svelte/store';

export const settings = writable({
  endpoint: "",
  useCustomEndpoint: false,
  numberOfRows: 15,
  numberOfColumns: 25,
  wordLimit: 800,
  skipHorizontal: 2,
  skipVertical: 3,
});