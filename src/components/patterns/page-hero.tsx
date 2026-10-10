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
  // Square or portrait photos keep their shape so the subject is never cropped;
  // wide photos stretch across the hero.
  const squareish = image ? image.width / image.height < 1.3 : false

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
          inverse ? "bg-(--hero-glow-inverse)" : "bg-(--hero-glow)"
        )}
      />
      <div
        className={cn(
          // Copy and visual sit side by side from tablet width up; the copy column
          // gets a larger share on narrower screens so headlines don't over-wrap.
          "relative grid md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)]",
          !image && !aside && "md:grid-cols-1! lg:grid-cols-1! xl:grid-cols-1!"
        )}
      >
        <div
          className={cn(
            "relative z-10 flex flex-col justify-center py-12 sm:py-16",
            // Phones: the copy tucks up into the photo's faded lower edge.
            image && "max-md:-mt-8 max-md:pt-0 sm:max-md:-mt-12",
            size === "large"
              ? "md:min-h-[30rem] lg:min-h-[34rem] lg:py-20"
              : "md:min-h-[24rem] lg:min-h-[26rem] lg:py-16",
            "pr-(--gutter) pl-(--gutter) md:pr-8 md:pl-[max(var(--gutter),calc((100vw-var(--container-page))/2))] lg:pr-12"
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
            className="hero-in flex items-center px-(--gutter) pb-12 md:py-12 md:pr-[max(var(--gutter),calc((100vw-var(--container-page))/2))] md:pl-0"
          >
            {aside}
          </div>
        )}

        {image && (
          // The photo dissolves into the hero background instead of sitting in its own
          // panel. Phones: it leads the hero, full width, fading out at the bottom into
          // the copy. Tablet up: it runs behind the copy column, fading in from the left.
          <div
            className={cn(
              "hero-blend relative overflow-hidden max-md:order-first md:absolute md:inset-y-0 md:right-0",
              squareish
                ? "hero-blend-square aspect-square sm:mx-auto sm:w-full sm:max-w-[32rem] md:mx-0 md:aspect-auto md:w-[44%] lg:aspect-square lg:w-auto lg:max-w-[58%]"
                : "aspect-[4/3] sm:aspect-[16/9] md:aspect-auto md:w-[50%] lg:w-[64%]",
              inverse && "hero-blend-inverse"
            )}
          >
            {/* Oversized so the parallax drift never exposes an edge. */}
            <div className="hero-parallax absolute inset-x-0 -top-[9%] -bottom-[9%]">
              <Image
                src={image}
                alt={imageAlt ?? ""}
                fill
                preload
                placeholder="blur"
                sizes={
                  squareish
                    ? "(min-width: 768px) 50vw, (min-width: 640px) 34rem, 100vw"
                    : "(min-width: 1024px) 64vw, (min-width: 768px) 50vw, 100vw"
                }
                className="hero-media object-cover"
                style={{ objectPosition: imagePosition }}
              />
            </div>
            {/* Dark theme: tints pale areas of the photo so its fade reads as the page
                colour rather than a grey band. */}
            {!inverse && <div aria-hidden="true" className="hero-tint-dark absolute inset-0 hidden" />}
            {inverse && (
              // Tints pale areas of the photo so they fade into the dark hero, not grey.
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-surface-inverse/80 via-surface-inverse/25 to-transparent md:bg-linear-to-r md:from-surface-inverse md:via-surface-inverse/45"
              />
            )}
          </div>
        )}
      </div>
    </section>
  )
}
