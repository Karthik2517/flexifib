import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import type { Programme } from "@/content/programmes"
import { cn } from "@/lib/utils"
import { StatusBadge } from "./status-badge"

export function ProgrammeCard({
  programme,
  showSummary = true,
  showCta = true,
  headingLevel = "h3",
}: {
  programme: Programme
  showSummary?: boolean
  showCta?: boolean
  headingLevel?: "h2" | "h3"
}) {
  const Heading = headingLevel
  return (
    <li
      data-card=""
      data-interactive=""
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface-raised shadow-(--shadow-card) transition-[box-shadow,translate] duration-200 ease-out-quint has-[a:hover]:-translate-y-1 has-[a:hover]:shadow-(--shadow-card-hover)">
      <div data-card-media="" className="relative aspect-[16/9] overflow-hidden bg-surface-sunken">
        <Image
          src={programme.image}
          alt={programme.imageAlt}
          style={{ objectPosition: programme.imagePosition }}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-400 ease-out-quint group-has-[a:hover]:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <StatusBadge>{programme.statusDetail}</StatusBadge>
        <Heading className="mt-3 text-subheading">{programme.name}</Heading>
        <p className="mt-1 text-sm font-semibold text-foreground">{programme.tagline}</p>
        {showSummary && (
          <p className="mt-2 text-sm leading-relaxed text-text-muted">{programme.summary}</p>
        )}
        {showCta && (
          <div className="mt-auto pt-5">
            <Link
              href={programme.href}
              className={cn(
                "inline-flex rounded-[0.875rem] outline-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring",
                // Stretch the link over the whole card for a generous hit area; the glass is the
                // inner span so it can lift and tilt without taking the stretched ::after with it.
                "after:absolute after:inset-0 after:content-['']"
              )}
            >
              <span className={buttonVariants({ variant: "outline", size: "sm" })}>{programme.cta}</span>
            </Link>
          </div>
        )}
      </div>
    </li>
  )
}
