import { writable } from 'svelte/store';
import { EThemes } from "../constants";

export const theme = writable({
  theme: EThemes.Light,
});