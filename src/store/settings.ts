import { Endpoints } from "../constants/endpoints";
import { writable } from 'svelte/store';

export const settings = writable({
  endpoint: Endpoints.Words as string,
  numberOfRows: 15,
  numberOfColumns: 25,
  wordLimit: 800,
  skipHorizontal: 2,
  skipVertical: 3,
});