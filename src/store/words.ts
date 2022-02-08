import { writable } from 'svelte/store';

export const apiWords = writable({
  words: [],
  names: [],
  lastnames: []
});
export const crossWord = writable({
  table: [],
  details: [],
  inputs: {},
  words: {},
});