import type { Meta, StoryObj } from '@storybook/react';
import { InputLabel } from './InputLabel';

const meta: Meta<typeof InputLabel> = {
  title: 'Components/InputLabel',
  component: InputLabel,
  tags: ['autodocs'],
  argTypes: {
    htmlFor: { control: 'text' },
    required: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Label',
    htmlFor: 'input-id',
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof InputLabel>;

export const Default: Story = {
  args: {
    children: 'Label',
    htmlFor: 'input-id',
  },
};

export const Required: Story = {
  args: {
    children: 'Required Label',
    htmlFor: 'input-id',
    required: true,
  },
};
