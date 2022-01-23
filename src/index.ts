import "./styles/core.scss";

import App from './App.svelte'
import { domReady, addOnHistoryChangeEvent } from "tsl-utils";
import { Events } from "./constants";

domReady(() => {
  const appElement = document.querySelector('.app');
  addOnHistoryChangeEvent(Events.HistoryChanged, appElement);

  new App({
    target: appElement
  });
});