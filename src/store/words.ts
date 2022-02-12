import { writable } from 'svelte/store';

export const apiWords = writable({
  words: []
});
export const crossWord = writable({
  table: [],
  details: [],
  inputs: {},
  words: {},
});