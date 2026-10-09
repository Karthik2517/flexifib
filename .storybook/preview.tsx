import type { Preview } from "@storybook/nextjs-vite"
import { MotionProvider } from "../src/components/cart/motion-provider"
import "../src/app/globals.css"

const preview: Preview = {
  parameters: {
    layout: "padded",
    backgrounds: { disable: true },
    controls: { expanded: true },
    // Fail the a11y panel (and test runs) on WCAG violations, not just warn.
    a11y: { test: "error" },
    viewport: {
      options: {
        mobile: { name: "Mobile 375", styles: { width: "375px", height: "740px" } },
        tablet: { name: "Tablet 768", styles: { width: "768px", height: "1024px" } },
        desktop: { name: "Desktop 1440", styles: { width: "1440px", height: "900px" } },
      },
    },
  },
  decorators: [
    (Story) => (
      <MotionProvider>
        <div className="bg-background font-sans text-foreground">
          <Story />
        </div>
      </MotionProvider>
    ),
  ],
}

export default preview
