<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Dropdown from "../Dropdown.svelte";
  import ThemeContainer from "../../common/ThemeContainer.svelte";
  import { EThemes } from "../../../constants";

  const items = [
    {
      id: "1",
      value: "Test1",
    },
    {
      id: "2",
      value: "Test2",
    },
    {
      id: "3",
      value: "Test3",
    },
  ];

  let selected = undefined;
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title="Select/Dropdown"
  component={Dropdown}
  argTypes={{
    theme: {
      defaultValue: EThemes.Light,
      options: Object.values(EThemes),
      control: { type: "radio" },
    },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <ThemeContainer theme={args.theme}>
    <div class="container">
      <Dropdown
        {selected}
        {items}
        on:change={(item) => {
          selected = item.detail;
        }}>Test</Dropdown
      >
    </div>
  </ThemeContainer>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story name="Default" />

<style lang="scss">
  @import "src/styles/all";

  .container {
    margin: 10px;
  }
</style>
