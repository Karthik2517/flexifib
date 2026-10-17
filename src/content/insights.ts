import type { StaticImageData } from "next/image"
import ropeMacro from "@/assets/images/rope-macro.webp"
import labGlassware from "@/assets/images/lab-glassware.webp"
import packaging from "@/assets/images/packaging.webp"

export type InsightPillar =
  | "Materials"
  | "Product Development"
  | "Sustainability"
  | "Company Updates"

/**
 * Articles are listed before they are written so readers can see what is
 * coming. An article only gets a public URL once `published` is true and it
 * has passed the editorial rules on the Insights page.
 */
export type Insight = {
  slug: string
  title: string
  summary: string
  pillar: InsightPillar
  image: StaticImageData
  imageAlt: string
  published: boolean
}

export const insightPillars: { title: InsightPillar; description: string }[] = [
  {
    title: "Materials",
    description: "Hemp fibres, biocomposites and formulation concepts.",
  },
  {
    title: "Product Development",
    description: "Prototyping, testing, design and validation.",
  },
  {
    title: "Sustainability",
    description: "Claims, end of life, circularity and evidence.",
  },
  {
    title: "Company Updates",
    description: "Real milestones, partnerships and launch news.",
  },
]

export const insights: Insight[] = [
  {
    slug: "why-hemp-fibres-are-interesting",
    title: "Why hemp fibres are interesting for consumer materials",
    summary:
      "The material opportunity behind hemp — and why fibre properties alone don’t make a finished product.",
    pillar: "Materials",
    image: ropeMacro,
    imageAlt: "Close-up of coarse natural fibre cord",
    published: false,
  },
  {
    slug: "biodegradable-vs-compostable",
    title: "Biodegradable vs compostable: why the difference matters",
    summary:
      "A clear, evidence-led guide to two claims that customers are often asked to take on trust.",
    pillar: "Sustainability",
    image: packaging,
    imageAlt: "Moulded fibre food containers and a kraft pouch",
    published: false,
  },
  {
    slug: "what-product-validation-involves",
    title: "What product validation actually involves",
    summary:
      "Why prototypes, testing and real-world evidence have to come before a launch date.",
    pillar: "Product Development",
    image: labGlassware,
    imageAlt: "Laboratory shelves lined with glassware and testing equipment",
    published: false,
  },
]
