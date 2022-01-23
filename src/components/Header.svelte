<script lang="ts">
  import { navigate } from "svelte-routing";
  import Logo from "./Logo.svelte";
  import Container from "./Container.svelte";
  import { onMount, onDestroy } from "svelte";
  import { Events, Routes } from "../constants";
  import type { THistoryChangeArguments } from "tsl-utils";

  let appElement: HTMLElement;

  let path: string = window.location.pathname;

  const histryChanged = (event: CustomEvent<THistoryChangeArguments>) => {
    path = event.detail.url;
  };

  const viewHome = () => {
    navigate(Routes.Home);
  };

  const viewApi = () => {
    navigate(Routes.Api);
  };

  onMount(() => {
    appElement = document.querySelector(".app") as HTMLElement;
    appElement.addEventListener(Events.HistoryChanged, histryChanged);
  });

  onDestroy(() => {
    appElement.removeEventListener(Events.HistoryChanged, histryChanged);
  });
</script>

<header>
  <Container>
    <div class="header">
      <button on:click={viewHome} class="logo"><Logo /></button>
      <ul>
        <li class={path === Routes.Home && "active"}>
          <button class="link" on:click={viewHome}>Home</button>
        </li>
        <li class={path === Routes.Api && "active"}>
          <button class="link" on:click={viewApi}>Api</button>
        </li>
      </ul>
    </div>
  </Container>
</header>

<style lang="scss">
  header {
    height: 100px;
    background: rgba(255, 255, 255, 0.8);

    .header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .logo {
      cursor: pointer;
      background: none;
      border: none;
      max-width: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ul {
      list-style: none;
      display: flex;
      padding: 0;
      width: 100%;
      margin: 10px 0;
      justify-content: center;
    }

    .link {
      background: none;
      border: none;
      font-weight: 700;
      font-size: 18px;
      cursor: pointer;
      color: #2a2a57;
    }

    .active {
      box-shadow: 0 5px 0 0 #2a2a57;
    }
  }

  @media (min-width: 480px) {
    .header {
      justify-content: space-between;

      .logo {
        max-width: 150px;
      }

      ul {
        width: auto;
      }
    }
  }
</style>
