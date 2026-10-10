import Image, { type StaticImageData } from "next/image"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Image beside text — used for "Why hemp?" style sections. */
export function MediaSplit({
  image,
  imageAlt,
  imageSide = "left",
  children,
  className,
}: {
  image: StaticImageData
  imageAlt: string
  imageSide?: "left" | "right"
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "grid items-center gap-8 md:grid-cols-2 lg:gap-16",
        className
      )}
    >
      <div
        data-reveal="image"
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-xl bg-sand-200",
          imageSide === "right" && "md:order-2"
        )}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          placeholder="blur"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div data-reveal>{children}</div>
    </div>
  )
}
