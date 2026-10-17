import type { StaticImageData } from "next/image"
import bambooToothbrushes from "@/assets/images/bamboo-toothbrushes.webp"
import tissue from "@/assets/images/tissue.webp"
import packaging from "@/assets/images/packaging.webp"

export type Status =
  | "available"
  | "in-development"
  | "future"
  | "b2b"
  | "concept"

export const statusLabels: Record<Status, string> = {
  available: "Available now",
  "in-development": "In development",
  future: "Future programme",
  b2b: "B2B development",
  concept: "Concept",
}

export type Programme = {
  slug: "ecobrush" | "hempsoft" | "flexipack"
  name: string
  status: Status
  /** Longer label used on cards, e.g. "Flagship innovation · In development" */
  statusDetail: string
  tagline: string
  summary: string
  image: StaticImageData
  imageAlt: string
  /** CSS object-position keeping the subject in frame when cropped to a wide card */
  imagePosition?: string
  href: string
  cta: string
}

export const programmes: Programme[] = [
  {
    slug: "ecobrush",
    name: "EcoBrush",
    status: "in-development",
    statusDetail: "Flagship innovation · In development",
    tagline: "Next-generation oral care",
    summary:
      "A toothbrush platform exploring hemp-based materials, product longevity and reduced material replacement.",
    image: bambooToothbrushes,
    imageAlt: "Three bamboo toothbrushes standing in a ceramic cup",
    imagePosition: "50% 25%",
    href: "/products/ecobrush",
    cta: "Explore EcoBrush",
  },
  {
    slug: "hempsoft",
    name: "HempSoft",
    status: "future",
    statusDetail: "Future product programme",
    tagline: "Hemp-based tissue innovation",
    summary:
      "Exploring how hemp fibres could support practical next-generation tissue and household paper products.",
    image: tissue,
    imageAlt: "Concept image of a tissue box and paper roll",
    href: "/products/hempsoft",
    cta: "Discover HempSoft",
  },
  {
    slug: "flexipack",
    name: "FlexiPack",
    status: "b2b",
    statusDetail: "B2B development",
    tagline: "Next-generation packaging",
    summary:
      "Exploring hemp-based biocomposites and fibre solutions for future packaging applications.",
    image: packaging,
    imageAlt: "Concept image of moulded fibre packaging and a kraft pouch",
    href: "/products/flexipack",
    cta: "Discover FlexiPack",
  },
]

export function getProgramme(slug: Programme["slug"]) {
  const programme = programmes.find((p) => p.slug === slug)
  if (!programme) throw new Error(`Unknown programme: ${slug}`)
  return programme
}

/** Shared five-stage pathway shown on Home and Innovation. */
export const developmentPathway = [
  {
    title: "Hemp fibre",
    description: "Characterise raw fibre and match it to an intended application.",
  },
  {
    title: "Material development",
    description: "Develop compatible material systems and processing routes.",
  },
  {
    title: "Prototype",
    description: "Translate material behaviour into practical product geometry.",
  },
  {
    title: "Testing",
    description: "Validate performance, safety, durability and end-of-life evidence.",
  },
  {
    title: "Manufacturing",
    description: "Plan IP protection, manufacturing partners and commercial scale-up.",
  },
]
