import { writable } from "svelte/store";

import { EThemes } from "../constants";

export const theme = writable(EThemes.Light);
