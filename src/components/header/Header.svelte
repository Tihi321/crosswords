<script lang="ts">
  import { navigate } from "svelte-routing";
  import Logo from "./Logo.svelte";
  import MenuItem from "./MenuItem.svelte";
  import Container from "../common/Container.svelte";
  import { onMount, onDestroy } from "svelte";
  import { Events, Routes } from "../../constants";
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
        <li>
          <MenuItem active={path === Routes.Home} on:click={viewHome} name="Home" />
        </li>
        <li>
          <MenuItem active={path === Routes.Api} on:click={viewApi} name="Api" />
        </li>
        <li>
          <a class="link" href={"/design"}>Storybook</a>
        </li>
      </ul>
    </div>
  </Container>
</header>

<style lang="scss">
  @import "src/styles/all";
  header {
    height: 100px;
    background: $header-bg-color;

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
      font-size: $menu-font-size;
      font-weight: 700;
      display: inline-block;
      color: $menu-color;
      cursor: pointer;
      margin-left: 5px;
      text-decoration: none;
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
