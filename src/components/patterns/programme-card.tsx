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
    <li className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface-raised shadow-(--shadow-card) transition-[box-shadow,transform] duration-(--duration-popover) ease-out-quart has-[a:hover]:-translate-y-0.5 has-[a:hover]:shadow-(--shadow-card-hover)">
      <div className="relative aspect-[16/9] overflow-hidden bg-sand-200">
        <Image
          src={programme.image}
          alt={programme.imageAlt}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-(--duration-large) ease-out-quart group-has-[a:hover]:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <StatusBadge>{programme.statusDetail}</StatusBadge>
        <Heading className="mt-3 text-subheading">{programme.name}</Heading>
        <p className="mt-1 text-sm font-semibold text-ink-900">{programme.tagline}</p>
        {showSummary && (
          <p className="mt-2 text-sm leading-relaxed text-text-muted">{programme.summary}</p>
        )}
        {showCta && (
          <div className="mt-auto pt-5">
            <Link
              href={programme.href}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                // Stretch the link over the whole card for a generous hit area
                "after:absolute after:inset-0 after:content-['']"
              )}
            >
              {programme.cta}
            </Link>
          </div>
        )}
      </div>
    </li>
  )
}
