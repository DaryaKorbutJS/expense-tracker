import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    buttonType: {
      control: 'select',
      options: ['primary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    shape: {
      control: 'select',
      options: ['default', 'round'],
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Button',
    buttonType: 'primary',
    size: 'large',
    shape: 'default',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    buttonType: 'primary',
    children: 'Primary Button',
  },
};

export const Ghost: Story = {
  args: {
    buttonType: 'ghost',
    children: 'Ghost Button',
  },
};

export const Link: Story = {
  args: {
    buttonType: 'link',
    children: 'Link Button',
  },
};

export const SmallRound: Story = {
  args: {
    buttonType: 'primary',
    size: 'small',
    shape: 'round',
    children: '-',
  },
};

export const Disabled: Story = {
  args: {
    buttonType: 'primary',
    disabled: true,
    children: 'Disabled',
  },
};
