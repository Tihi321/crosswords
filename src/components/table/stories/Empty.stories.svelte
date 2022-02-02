<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Empty from "../Empty.svelte";
</script>

<Meta title="Table/Empty" component={Empty} />

<Template let:args>
  <Empty />
</Template>

<Story name="Default" />
