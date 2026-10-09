export const site = {
  name: "FlexiFib",
  tagline: "Better materials for everyday life.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.flexifib.com",
  description:
    "FlexiFib is a Scotland-based company developing next-generation hemp-based materials for everyday products, while offering a carefully selected Launch Collection today.",
  announcement: ["Scotland-based", "Purpose-led", "Better materials for everyday life"],
  company: {
    legalName: "FLEXIFIB ECO LTD",
    number: "SC849031",
    jurisdiction: "Scotland, United Kingdom",
    /**
     * Must match the current Companies House record exactly before launch.
     * While null, pages state that the address is available on Companies House.
     */
    registeredOffice: null as string | null,
    companiesHouseUrl:
      "https://find-and-update.company-information.service.gov.uk/company/SC849031",
  },
} as const

export const inboxes = {
  general: "hello@flexifib.com",
  support: "support@flexifib.com",
  orders: "orders@flexifib.com",
  partnerships: "partnerships@flexifib.com",
  wholesale: "wholesale@flexifib.com",
  press: "press@flexifib.com",
  research: "research@flexifib.com",
  careers: "careers@flexifib.com",
} as const

export type Inbox = keyof typeof inboxes

export type NavItem = { label: string; href: string }

export const primaryNav: NavItem[] = [
  { label: "Shop", href: "/shop" },
  { label: "Innovation", href: "/innovation" },
  { label: "Our Products", href: "/products" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Our Story", href: "/our-story" },
  { label: "For Business", href: "/business" },
  { label: "Insights", href: "/insights" },
]

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Shop", href: "/shop" },
      { label: "Innovation", href: "/innovation" },
      { label: "EcoBrush", href: "/products/ecobrush" },
      { label: "HempSoft", href: "/products/hempsoft" },
      { label: "FlexiPack", href: "/products/flexipack" },
      { label: "Sustainability", href: "/sustainability" },
    ],
  },
  {
    title: "Business",
    links: [
      { label: "For Business", href: "/business" },
      { label: "Partnerships", href: "/business#enquiry" },
      { label: "Careers", href: "/careers" },
      { label: "Our Story", href: "/our-story" },
      { label: "Insights", href: "/insights" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Shipping", href: "/help/shipping" },
      { label: "Returns", href: "/help/returns" },
      { label: "FAQ", href: "/help/faq" },
      { label: "Product safety", href: "/help/product-safety" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Cookies", href: "/legal/cookies" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Accessibility", href: "/legal/accessibility" },
      { label: "Recruitment privacy", href: "/legal/recruitment-privacy" },
      { label: "Company information", href: "/legal/company" },
    ],
  },
]
