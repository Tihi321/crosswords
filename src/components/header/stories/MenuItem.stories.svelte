<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import MenuItem from "../MenuItem.svelte";
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title="Header/MenuItem"
  component={MenuItem}
  argTypes={{
    name: { defaultValue: "Home", control: "text" },
    onClick: { action: "onClick" },
    active: { defaultValue: false, control: "boolean" },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <MenuItem {...args} on:click={args.onClick} />
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story name="Default" />

<Story
  name="Active"
  args={{
    active: true,
  }}
/>
