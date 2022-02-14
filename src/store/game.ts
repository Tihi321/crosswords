import { writable } from "svelte/store";

export const game = writable({
  started: false,
  retries: 0,
});
