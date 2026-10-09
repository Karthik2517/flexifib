import Image, { type StaticImageData } from "next/image"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Split hero used at the top of every public page.
 * The image is the LCP element on most routes, so it is preloaded and never lazy.
 */
export function PageHero({
  eyebrow,
  badge,
  title,
  subtitle,
  description,
  image,
  imageAlt,
  imagePosition = "center",
  tone = "warm",
  size = "default",
  children,
}: {
  eyebrow?: string
  badge?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  description?: ReactNode
  image?: StaticImageData
  imageAlt?: string
  imagePosition?: string
  tone?: "warm" | "inverse"
  size?: "default" | "large"
  children?: ReactNode
}) {
  const inverse = tone === "inverse"

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        inverse ? "bg-surface-inverse text-text-inverse" : "bg-surface-warm"
      )}
    >
      <div
        className={cn(
          "grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)]",
          !image && "lg:grid-cols-1"
        )}
      >
        <div
          className={cn(
            "flex flex-col justify-center py-12 sm:py-16",
            size === "large" ? "lg:min-h-[34rem] lg:py-20" : "lg:min-h-[26rem] lg:py-16",
            "pr-(--gutter) pl-(--gutter) lg:pl-[max(var(--gutter),calc((100vw-var(--container-page))/2))] lg:pr-12"
          )}
        >
          <div className="max-w-2xl">
            {badge && <div className="mb-4">{badge}</div>}
            {eyebrow && (
              <p
                className={cn(
                  "eyebrow mb-4",
                  inverse ? "text-text-accent-inverse" : "text-text-brand"
                )}
              >
                {eyebrow}
              </p>
            )}
            <h1
              className={cn(
                size === "large" ? "text-display" : "text-title",
                inverse && "text-text-inverse"
              )}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={cn(
                  "mt-3 font-heading text-subheading font-semibold",
                  inverse ? "text-text-inverse" : "text-text-brand"
                )}
              >
                {subtitle}
              </p>
            )}
            {description && (
              <div
                className={cn(
                  "mt-5 max-w-xl text-lead",
                  inverse ? "text-text-inverse-muted" : "text-text-muted"
                )}
              >
                {description}
              </div>
            )}
            {children && <div className="mt-8">{children}</div>}
          </div>
        </div>

        {image && (
          <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:min-h-full">
            <Image
              src={image}
              alt={imageAlt ?? ""}
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              style={{ objectPosition: imagePosition }}
            />
          </div>
        )}
      </div>
    </section>
  )
}
