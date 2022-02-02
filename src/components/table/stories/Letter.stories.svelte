<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Letter from "../Letter.svelte";

  let letter = "h";
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title="Table/Letter"
  component={Letter}
  argTypes={{
    show: { defaultValue: false, control: "boolean" },
    success: { defaultValue: false, control: "boolean" },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <Letter
    {letter}
    on:change={(event) => {
      letter = event.detail.value;
    }}
    {...args}
  />
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story name="Default" />

<Story
  name="Visible"
  args={{
    show: true,
  }}
/>
