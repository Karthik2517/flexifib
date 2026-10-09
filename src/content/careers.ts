/**
 * Careers content. Only add a vacancy when a genuine, approved role exists —
 * the page states clearly when there are none.
 */

export type Vacancy = {
  slug: string
  title: string
  area: string
  /** e.g. "Full-time, permanent" or "6-month contract" */
  type: string
  /** e.g. "Edinburgh · hybrid (2 days on site)" */
  location: string
  /** Publish a salary or range wherever appropriate */
  salary: string | null
  summary: string
  closingDate: string | null
}

export const vacancies: Vacancy[] = []

export const reasonsToJoin = [
  {
    title: "Build from an early stage",
    description: "Contribute while the company, products and operating model are still being shaped.",
  },
  {
    title: "Purpose and performance",
    description: "Work on sustainability challenges without losing sight of quality, usability or commercial reality.",
  },
  {
    title: "Cross-disciplinary work",
    description: "Materials, product design, manufacturing, ecommerce and partnerships intersect across the business.",
  },
  {
    title: "UK innovation ambition",
    description: "Help a company aiming to build R&D, supply-chain and future manufacturing capability in the UK.",
  },
]

export const contributionAreas = [
  {
    value: "materials-rd",
    label: "Materials & R&D",
    description: "Natural-fibre composites, material science, testing and validation.",
  },
  {
    value: "product-development",
    label: "Product Development",
    description: "Requirements, prototyping, design for manufacture and user validation.",
  },
  {
    value: "packaging-manufacturing",
    label: "Packaging & Manufacturing",
    description: "Process development, supplier qualification, tooling and scale-up.",
  },
  {
    value: "ecommerce-growth",
    label: "Ecommerce & Growth",
    description: "Digital commerce, content, CRM, customer acquisition and conversion.",
  },
  {
    value: "operations-supply-chain",
    label: "Operations & Supply Chain",
    description: "Sourcing, quality, fulfilment, inventory and supplier management.",
  },
  {
    value: "partnerships-commercial",
    label: "Partnerships & Commercial",
    description: "Retail, hospitality, distribution, research and strategic business development.",
  },
] as const

export const recruitmentSteps = [
  {
    title: "Application review",
    description: "We assess relevance against a genuine role or future requirement.",
  },
  {
    title: "Introductory conversation",
    description: "A short discussion about experience, motivation and mutual fit.",
  },
  {
    title: "Role or technical discussion",
    description: "Where appropriate, we discuss practical experience, a case study or technical depth.",
  },
  {
    title: "Decision & next steps",
    description: "Clear communication on the outcome, terms and start process.",
  },
]

export const recruitmentPrinciples = [
  "We advertise only genuine roles.",
  "We state location and remote-working expectations clearly.",
  "We describe the employment or contract type accurately.",
  "We publish a salary or range wherever appropriate.",
  "We avoid discriminatory language and unnecessary requirements.",
  "We protect applicant data and keep it only for a defined period.",
]
