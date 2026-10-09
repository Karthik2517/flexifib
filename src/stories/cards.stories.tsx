import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CardGrid, InfoCard, RowList } from "@/components/patterns/cards"
import { CtaBand, NotePanel } from "@/components/patterns/callouts"
import { Checklist } from "@/components/patterns/checklist"
import { Pathway } from "@/components/patterns/pathway"
import { ProductCard } from "@/components/patterns/product-card"
import { ProgrammeCard } from "@/components/patterns/programme-card"
import { StatusBadge } from "@/components/patterns/status-badge"
import { products } from "@/content/products"
import { developmentPathway, programmes } from "@/content/programmes"
import { verifiedToday, workingTowards } from "@/content/sustainability"

const meta = { title: "Patterns/Cards & content", parameters: { layout: "padded" } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge>Available now</StatusBadge>
      <StatusBadge>In development</StatusBadge>
      <StatusBadge tone="warm">Future programme</StatusBadge>
      <div className="bg-surface-inverse p-3"><StatusBadge tone="inverse">B2B development</StatusBadge></div>
    </div>
  ),
}

export const ProductCards: Story = {
  render: () => (
    <ul className="grid max-w-5xl gap-5 sm:grid-cols-3">
      {products.map((product) => <ProductCard key={product.slug} product={product} />)}
    </ul>
  ),
}

export const ProgrammeCards: Story = {
  render: () => (
    <ul className="grid max-w-5xl gap-5 sm:grid-cols-3">
      {programmes.map((programme) => <ProgrammeCard key={programme.slug} programme={programme} />)}
    </ul>
  ),
}

export const InfoCards: Story = {
  render: () => (
    <CardGrid columns={4}>
      <InfoCard title="Retailers">Stock selected products and future proprietary lines.</InfoCard>
      <InfoCard title="Manufacturers">Material processing, tooling, prototyping and scale-up.</InfoCard>
      <InfoCard title="A much longer card title that wraps onto two lines">Short.</InfoCard>
      <InfoCard title="Large" size="large">Large title variant.</InfoCard>
    </CardGrid>
  ),
}

export const PathwaySteps: Story = { render: () => <Pathway steps={developmentPathway} /> }
export const PathwayNumerals: Story = { render: () => <Pathway variant="numeral" steps={developmentPathway} /> }

export const Rows: Story = {
  render: () => (
    <RowList
      numbered
      rows={[
        { title: "Exact product identity", description: "Supplier, model and country of manufacture are confirmed." },
        { title: "Materials verified", description: "Handle, bristles and packaging are accurately described." },
      ]}
    />
  ),
}

export const Checklists: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-10 sm:grid-cols-2">
      <Checklist items={verifiedToday} />
      <Checklist items={workingTowards} variant="open" />
    </div>
  ),
}

export const Callouts: Story = {
  render: () => (
    <div className="flex max-w-4xl flex-col gap-6">
      <NotePanel eyebrow="Current status" title="Future product programme">
        No price, stock, performance claims or launch date.
      </NotePanel>
      <CtaBand eyebrow="Follow the development" title="Interested in EcoBrush?" description="Register for development updates." />
    </div>
  ),
}
