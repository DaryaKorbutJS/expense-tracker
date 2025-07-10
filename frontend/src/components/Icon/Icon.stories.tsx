import type { Meta, StoryObj } from "@storybook/react";
import { Icon, IconProps } from "./Icon";

const ICON_OPTIONS = [
  "bell",
  "bank",
  "transport",
  "hobby",
  "mobile",
  "otherPayments",
  "debts",
  "utility",
  "onlineShopping",
  "restaurants",
] as const;

type IconOption = (typeof ICON_OPTIONS)[number];

const meta: Meta<IconProps> = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Icon** is a reusable SVG component that supports different sizes, colors and accessibility labels.

\`\`\`tsx
import { Icon } from '@/components/Icon';

<Icon iconName="bell" size={24} color="#ef4444" ariaLabel="Notification" />
\`\`\`

Use the **Playground** story below to experiment with props, or see **All Icons** for a reference grid of every available asset.`,
      },
    },
  },
  args: {
    iconName: "bell" as IconOption,
    size: 24,
    color: "#000",
  },
  argTypes: {
    iconName: {
      control: { type: "select" },
      options: ICON_OPTIONS,
    },
    size: { control: { type: "number", min: 8, max: 128, step: 1 } },
    color: { control: "color" },
  },
};

export default meta;

export const Playground: StoryObj<IconProps> = {};

export const Sizes: StoryObj<IconProps> = {
  name: "Sizes",
  render: (args) => (
    <div style={{ display: "flex", gap: 16 }}>
      <Icon {...args} size={12} />
      <Icon {...args} size={24} />
      <Icon {...args} size={48} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Compare how the icon scales with sizes 12 px, 24 px and 48 px.",
      },
    },
  },
};

export const Colors: StoryObj<IconProps> = {
  name: "Colors",
  render: (args) => (
    <div style={{ display: "flex", gap: 16 }}>
      <Icon {...args} color="#ef4444" />
      <Icon {...args} color="#3b82f6" />
      <Icon {...args} color="#10b981" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Examples with Tailwind's Rose 500, Blue 500 and Emerald 500 colors.",
      },
    },
  },
};

export const AllIcons: StoryObj<IconProps> = {
  name: "All Icons",
  render: () => (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      {ICON_OPTIONS.map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 80,
          }}
        >
          <Icon iconName={name as IconOption} size={24} />
          <span style={{ fontSize: 12 }}>{name}</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Quick visual reference of every available icon.",
      },
    },
  },
};
