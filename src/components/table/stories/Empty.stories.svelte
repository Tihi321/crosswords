<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Empty from "../Empty.svelte";
  import ThemeContainer from "../../common/ThemeContainer.svelte";
</script>

<Meta title="Table/Empty" component={Empty} />

<Template let:args>
  <ThemeContainer>
    <Empty />
  </ThemeContainer>
</Template>

<Story name="Default" />
