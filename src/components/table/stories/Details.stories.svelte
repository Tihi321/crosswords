<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Details from "../Details.svelte";
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title="Table/Details"
  component={Details}
  argTypes={{
    top: { defaultValue: true, control: "boolean" },
    left: { defaultValue: true, control: "boolean" },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <Details top={args.top && 1} left={args.left && 2} />
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story name="Default" />
