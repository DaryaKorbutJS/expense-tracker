import type { Meta, StoryFn } from '@storybook/react';
import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    docs: {
      description: {
        component: 'Displays a spinner animation to indicate a loading state.',
      },
    },
  },
};

export default meta;

const Template: StoryFn<typeof Loader> = () => <Loader />;

export const Default = Template.bind({});
Default.storyName = 'Default Loader';
Default.parameters = {
  docs: {
    storyDescription: 'The default spinning loader with accessible status role and label.',
  },
};
