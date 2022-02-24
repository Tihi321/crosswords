<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Details from "../Details.svelte";
  import Letter from "../Letter.svelte";
  import ThemeContainer from "../../common/ThemeContainer.svelte";

  const word = {
    name: "Word",
    detail: "Word sample",
    index: 1,
    endIndex: 6,
  };
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title="Table/Details"
  component={Details}
  argTypes={{
    show: { defaultValue: false, control: "boolean" },
    top: { defaultValue: false, control: "boolean" },
    topEnd: { defaultValue: false, control: "boolean" },
    left: { defaultValue: true, control: "boolean" },
    leftEnd: { defaultValue: false, control: "boolean" },
    showFocusSide: { defaultValue: false, control: "boolean" },
    focusSide: {
      defaultValue: "Left",
      options: ["Top", "Left"],
      control: { type: "radio" },
    },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <ThemeContainer>
    <div class="container">
      <Details
        top={args.top && word}
        left={args.left && word}
        leftEnd={args.leftEnd}
        topEnd={args.topEnd}
        focusSide={args.showFocusSide && args.focusSide}
      >
        <Letter letter="h" show={args.show} />
      </Details>
    </div>
  </ThemeContainer>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story name="Default" />

<style lang="scss">
  @import "src/styles/all";

  .container {
    display: flex;
    justify-content: center;
    position: relative;
    margin: 20px;
  }
</style>
