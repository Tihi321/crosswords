import { writable } from "svelte/store";

import { ESettingsModalRoutes } from "../constants";

export const settings = writable({
  settingsRoute: ESettingsModalRoutes.GameSettings,
  devSettings: false,
});
