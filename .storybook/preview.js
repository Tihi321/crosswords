import { withActions } from "@storybook/addon-actions";
import { withKnobs } from '@storybook/addon-knobs';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  decorators: [withKnobs, withActions]
}