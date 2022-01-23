module.exports = {
  "stories": [
    "../src/components/**/*.stories.mdx",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx|svelte)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-knobs",
    "@storybook/addon-svelte-csf"
  ],
  "framework": "@storybook/svelte",
  "svelteOptions": {
    "preprocess": require("../svelte.config.js").preprocess
  }
}