import { writable } from 'svelte/store';

export const apiWords = writable({
  words: [],
  names: [],
  lastnames: []
});
export const crossWords = writable({});