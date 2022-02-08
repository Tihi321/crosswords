<script lang="ts">
  import type { THistoryChangeArguments } from "tsl-utils";
  import { navigate } from "svelte-routing";
  import { onMount, onDestroy } from "svelte";
  import Logo from "./Logo.svelte";
  import MenuItem from "./MenuItem.svelte";
  import Container from "../common/Container.svelte";

  import { EThemes, Events, Routes } from "../../constants";
  import type { TThemeStore } from "../../types";
  import { useTheme } from "../../hooks";

  let appElement: HTMLElement;

  let path: string = window.location.pathname;
  let themeState: EThemes;

  const { theme, switchTheme } = useTheme();

  theme.subscribe((value: TThemeStore) => {
    themeState = value.theme;
  });

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

<header class="header">
  <Container>
    <div class="container">
      <button on:click={viewHome} class="logo"><Logo /></button>
      <div class="menu">
        <ul class="links">
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
        <button class="theme-switcher" on:click={switchTheme}>{themeState}</button>
      </div>
    </div>
  </Container>
</header>

<style lang="scss">
  @import "src/styles/all";
  .header {
    height: 100px;
    background: $header-bg-color;
  }

  .container {
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

  .links {
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

  .menu {
    display: flex;
    align-items: center;
  }

  .theme-switcher {
    margin-left: 10px;
  }

  @media (min-width: 480px) {
    .container {
      justify-content: space-between;

      .logo {
        max-width: 150px;
      }

      .links {
        width: auto;
      }
    }
  }
</style>
