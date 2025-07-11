import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CustomDatePicker } from './DatePicker';

const meta: Meta<typeof CustomDatePicker> = {
  title: 'Components/DatePicker',
  component: CustomDatePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A custom date picker with calendar popup. Fully controlled from the parent using `value` and `onChange` props.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Selected date in YYYY-MM-DD format',
    },
    onChange: {
      action: 'date changed',
      description: 'Callback triggered with the new date string',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CustomDatePicker>;

export const Playground: Story = {
  render: (args) => {
    const [date, setDate] = useState(args.value || '2023-08-18');

    return (
      <div style={{ padding: 16 }}>
        <CustomDatePicker
          {...args}
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
            args.onChange?.(newDate);
          }}
        />
        <p style={{ marginTop: 16 }}>Selected date: {date}</p>
      </div>
    );
  },
  args: {
    value: '2023-08-18',
  },
};
