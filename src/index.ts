import "./styles/core.scss";

import App from './App.svelte'
import { domReady } from "tsl-utils";

domReady(() => {
  const appElement = document.querySelector('.app');

  new App({
    target: appElement
  });
});