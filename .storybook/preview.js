import { withActions } from "@storybook/addon-actions";
import { withKnobs } from '@storybook/addon-knobs';

export const parameters = {
  backgrounds: {
    default: 'default',
    values: [
      {
        name: 'default',
        value: 'rgba(96, 146, 93, 1)',
      },
      {
        name: 'dark',
        value: 'rgba(32, 32, 32, 1',
      },
      {
        name: 'light',
        value: 'rgba(255, 255, 255, 1)',
      },
    ],
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  decorators: [withKnobs, withActions]
}