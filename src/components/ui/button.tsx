import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow,translate,scale] duration-(--duration-micro) ease-out-quart outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring active:not-aria-[haspopup]:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-invalid:border-destructive data-loading:cursor-progress [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:-translate-y-px hover:bg-(--action-primary-hover) hover:shadow-[0_10px_24px_-12px_rgb(23_56_44/0.55)] active:translate-y-0",
        outline:
          "border-(--border-strong) bg-surface-raised text-text-brand hover:bg-surface-tint aria-expanded:bg-surface-tint",
        inverse:
          "bg-surface-raised text-text-brand hover:bg-sand-100",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-sage-200 aria-expanded:bg-sage-200",
        ghost:
          "text-text-brand hover:bg-surface-tint aria-expanded:bg-surface-tint",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "h-auto! px-0! text-text-brand underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-11 gap-2 px-5 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        sm: "h-9 gap-1.5 px-3.5 text-[0.8125rem] has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        lg: "h-12 gap-2 px-6 text-[0.9375rem] has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        icon: "size-11",
        "icon-sm": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
