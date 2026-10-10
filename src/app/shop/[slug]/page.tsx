import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Lock } from "lucide-react"
import { AddToBasket } from "@/components/cart/add-to-basket"
import { Container, Section, SectionHeader } from "@/components/layout/section"
import { ButtonLink } from "@/components/patterns/button-link"
import { CardGrid, InfoCard } from "@/components/patterns/cards"
import { NotePanel } from "@/components/patterns/callouts"
import { StatusBadge } from "@/components/patterns/status-badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatPrice, getProduct, productTitle, products, shipping } from "@/content/products"
import { site } from "@/content/site"

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata(props: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await props.params
  const product = getProduct(slug)
  if (!product) return {}
  const title = productTitle(product)
  return {
    title,
    description: product.summary,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: { title, description: product.summary, images: [product.image.src] },
  }
}

export default async function ProductPage(props: PageProps<"/shop/[slug]">) {
  const { slug } = await props.params
  const product = getProduct(slug)
  if (!product) notFound()

  const title = productTitle(product)
  const tabs = [
    {
      value: "description",
      label: "Description",
      body: product.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>),
    },
    { value: "materials", label: "Materials", body: <p>{product.materials}</p> },
    { value: "origin", label: "Origin", body: <p>{product.origin}</p> },
    { value: "care", label: "Care", body: <p>{product.care}</p> },
    {
      value: "delivery",
      label: "Delivery",
      body: (
        <>
          <p>
            We currently deliver to UK addresses. Standard delivery is{" "}
            {formatPrice(shipping.standardRate)}, and free on orders of{" "}
            {formatPrice(shipping.freeThreshold)} or more. Orders usually arrive within{" "}
            {shipping.minDays}–{shipping.maxDays} working days.
          </p>
          <p>
            <Link href="/help/shipping" className="font-semibold text-text-brand underline underline-offset-3">
              Shipping &amp; delivery details
            </Link>
          </p>
        </>
      ),
    },
    {
      value: "returns",
      label: "Returns",
      body: (
        <>
          <p>
            You can cancel your order or return unused items in their original packaging
            within 14 days of delivery. For hygiene reasons, opened toothbrushes can only be
            returned if they are faulty.
          </p>
          <p>
            <Link href="/help/returns" className="font-semibold text-text-brand underline underline-offset-3">
              Returns &amp; refunds policy
            </Link>
          </p>
        </>
      ),
    },
  ]

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: title,
      description: product.summary,
      image: `${site.url}${product.image.src}`,
      sku: product.slug,
      brand: { "@type": "Brand", name: site.name },
      offers: {
        "@type": "Offer",
        url: `${site.url}/shop/${product.slug}`,
        priceCurrency: "GBP",
        price: (product.price / 100).toFixed(2),
        availability: product.inStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        seller: { "@type": "Organization", name: site.company.legalName },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Shop", item: `${site.url}/shop` },
        { "@type": "ListItem", position: 2, name: title, item: `${site.url}/shop/${product.slug}` },
      ],
    },
  ]

  return (
    <>
      <Container className="pt-6 sm:pt-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/shop" />}>Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/shop" />}>Launch Collection</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Container>

      <Container className="grid gap-8 py-6 sm:py-8 md:grid-cols-2 md:gap-10 lg:gap-14 lg:py-10">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-surface-sunken md:sticky md:top-24 md:self-start">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            preload
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <StatusBadge>Launch Collection · Externally manufactured</StatusBadge>
          <h1 className="mt-4 text-title">
            {product.name}
            <span className="block text-subheading text-text-body">{product.variant}</span>
          </h1>
          <p className="mt-4 text-2xl font-semibold text-foreground tabular-nums">
            {formatPrice(product.price)}
          </p>
          <p className="mt-4 text-lead text-text-muted">{product.description[0]}</p>

          <NotePanel eyebrow="Important product disclosure" as="aside" className="mt-6 p-5 sm:p-5">
            This Launch Collection product is manufactured by an external production partner
            and selected and retailed by {site.company.legalName}. It is separate from
            FlexiFib’s proprietary EcoBrush, which is currently in development.
          </NotePanel>

          <div className="mt-8">
            <AddToBasket product={product} />
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs text-text-muted">
            <Lock aria-hidden="true" className="size-3.5" />
            Secure hosted checkout by Stripe · UK delivery {shipping.minDays}–
            {shipping.maxDays} working days
          </p>
        </div>
      </Container>

      <Section className="pt-6! sm:pt-10!" aria-label="Product details">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-14">
          <Tabs defaultValue="description" className="min-w-0 gap-6">
            {/* Scrolls sideways on narrow screens; the edge fade hints there is more. */}
            <div className="-mx-(--gutter) overflow-x-auto px-(--gutter) [scrollbar-width:none] max-sm:[mask-image:linear-gradient(to_right,#000_85%,transparent)]">
              <TabsList
                variant="line"
                className="h-auto! w-full min-w-max justify-start gap-0 border-b border-border p-0"
              >
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="h-12 flex-none px-3 text-sm font-semibold sm:px-4 after:bottom-[-1px]! data-active:text-text-brand"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                keepMounted
                className="max-w-prose space-y-4 text-[0.9375rem] leading-relaxed text-text-body data-hidden:hidden"
              >
                <h2 className="sr-only">{tab.label}</h2>
                {tab.body}
              </TabsContent>
            ))}
          </Tabs>

          <aside
            aria-labelledby="key-info"
            data-card="" className="h-fit rounded-xl border border-border bg-surface-raised p-6 shadow-(--shadow-card)"
          >
            <h2 id="key-info" className="eyebrow text-text-brand">
              Key information
            </h2>
            <dl className="mt-4 divide-y divide-border text-sm">
              {product.attributes.map((attribute) => (
                <div key={attribute.label} className="grid grid-cols-2 gap-4 py-3">
                  <dt className="font-semibold text-foreground">{attribute.label}</dt>
                  <dd className={attribute.value ? "text-text-body" : "text-text-muted italic"}>
                    {attribute.value ?? "Awaiting supplier confirmation"}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Section>

      <Section className="pt-0!" aria-labelledby="reviews">
        <NotePanel eyebrow="Reviews" title={<span id="reviews">No reviews yet</span>}>
          We only publish genuine reviews from verified customers of this exact product.
          Reviews will appear here once customers have shared their experience.
        </NotePanel>
      </Section>

      <Section className="pt-0!" aria-labelledby="relation">
        <SectionHeader
          id="relation"
          title="How this relates to FlexiFib’s innovation"
          description="The Launch Collection is a commercial validation route — not our proprietary invention. What we learn from customer feedback, returns and product use informs future product development, while EcoBrush remains a separate programme."
        />
        <CardGrid columns={3}>
          <InfoCard title="Launch Collection">Sourced, verified and available today.</InfoCard>
          <InfoCard title="EcoBrush">FlexiFib’s own oral-care programme, in development.</InfoCard>
          <InfoCard title="Customer insight">Feedback from today shapes tomorrow’s products.</InfoCard>
        </CardGrid>
        <ButtonLink href="/products/ecobrush" variant="outline" className="mt-8">
          Discover EcoBrush R&amp;D
        </ButtonLink>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
