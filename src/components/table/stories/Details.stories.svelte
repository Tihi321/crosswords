<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Details from "../Details.svelte";
  import Letter from "../Letter.svelte";
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title="Table/Details"
  component={Details}
  argTypes={{
    top: { defaultValue: true, control: "boolean" },
    topEnd: { defaultValue: true, control: "boolean" },
    left: { defaultValue: true, control: "boolean" },
    leftEnd: { defaultValue: true, control: "boolean" },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <div class="container">
    <Details top={args.top && 1} left={args.left && 2}>
      <Letter letter="h" show={true} />
    </Details>
  </div>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story name="Default" />

<style lang="scss">
  @import "src/styles/all";

  .container {
    display: inline-block;
    margin: 10px;
  }
</style>
