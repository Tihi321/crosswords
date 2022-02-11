import { domReady } from "tsl-utils";
import "./styles/core.scss";

import App from './App.svelte'

import { registerTranslations } from "./i18n";

registerTranslations();

domReady(() => {
  const appElement = document.querySelector('.app');

  new App({
    target: appElement
  });
});