import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Loader2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

const meta = {
  title: "UI/Button",
  component: Button,
  args: { children: "Shop Launch Collection" },
  argTypes: {
    variant: { control: "select", options: ["default", "outline", "inverse", "secondary", "ghost", "destructive", "link"] },
    size: { control: "select", options: ["sm", "default", "lg", "icon", "icon-sm"] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const Outline: Story = { args: { variant: "outline", children: "Discover our innovation" } }
export const Inverse: Story = {
  args: { variant: "inverse", children: "Start a conversation" },
  decorators: [(Story) => <div className="bg-surface-inverse p-6"><Story /></div>],
}
export const WithIcon: Story = {
  args: { children: <><ShoppingBag /> Add to basket</> },
}
export const Loading: Story = {
  args: { disabled: true, children: <><Loader2 className="animate-spin" /> Connecting to secure checkout…</> },
}
export const Disabled: Story = { args: { disabled: true } }
export const LongText: Story = {
  args: { children: "A deliberately long button label to test wrapping behaviour" },
}
export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sm">Small</Button>
      <Button {...args}>Default</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
}
