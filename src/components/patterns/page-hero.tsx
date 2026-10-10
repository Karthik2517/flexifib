import Image, { type StaticImageData } from "next/image"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Staggers the CSS entrance (`hero-in`) of each block in order. */
const step = (index: number) => ({ "--hero-i": index }) as React.CSSProperties

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
  aside,
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
  /** Non-photographic right-hand panel (e.g. an illustration card) used instead of `image` */
  aside?: ReactNode
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
      {/* Slow drifting light behind the copy — decorative, CSS only. */}
      <div
        aria-hidden="true"
        className={cn(
          "hero-glow pointer-events-none absolute -top-1/3 -left-1/4 size-[42rem] max-w-none rounded-full blur-3xl",
          inverse ? "bg-forest-600/35" : "bg-sage-200/60"
        )}
      />
      <div
        className={cn(
          "relative grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)]",
          !image && !aside && "lg:grid-cols-1"
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
            {badge && (
              <div className="hero-in mb-4" style={step(0)}>
                {badge}
              </div>
            )}
            {eyebrow && (
              <p
                style={step(0)}
                className={cn(
                  "hero-in eyebrow mb-4",
                  inverse ? "text-text-accent-inverse" : "text-text-brand"
                )}
              >
                {eyebrow}
              </p>
            )}
            <h1
              className={cn(
                "hero-title",
                size === "large" ? "text-display" : "text-title",
                inverse && "text-text-inverse"
              )}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                style={step(2)}
                className={cn(
                  "hero-in mt-3 font-heading text-subheading font-semibold",
                  inverse ? "text-text-inverse" : "text-text-brand"
                )}
              >
                {subtitle}
              </p>
            )}
            {description && (
              <div
                style={step(2)}
                className={cn(
                  "hero-in mt-5 max-w-xl text-lead",
                  inverse ? "text-text-inverse-muted" : "text-text-muted"
                )}
              >
                {description}
              </div>
            )}
            {children && (
              <div className="hero-in mt-8" style={step(3)}>
                {children}
              </div>
            )}
          </div>
        </div>

        {aside && !image && (
          <div
            style={step(3)}
            className="hero-in flex items-center px-(--gutter) pb-12 lg:py-12 lg:pr-[max(var(--gutter),calc((100vw-var(--container-page))/2))] lg:pl-0"
          >
            {aside}
          </div>
        )}

        {image && (
          <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:aspect-auto lg:min-h-full">
            {/* Oversized so the parallax drift never exposes an edge. */}
            <div className="hero-parallax absolute inset-x-0 -top-[9%] -bottom-[9%]">
              <Image
                src={image}
                alt={imageAlt ?? ""}
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="hero-media object-cover"
                style={{ objectPosition: imagePosition }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
