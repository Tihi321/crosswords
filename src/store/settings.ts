import { Endpoints } from "../constants/endpoints";
import { writable } from 'svelte/store';

export const settings = writable({
  endpoint: Endpoints.Words as string
});