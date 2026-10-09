import type { Metadata } from "next"
import { Suspense } from "react"
import { CheckCircle2, CircleAlert, Leaf } from "lucide-react"
import { OrderComplete } from "@/components/cart/order-complete"
import { Container } from "@/components/layout/section"
import { ButtonLink } from "@/components/patterns/button-link"
import { Skeleton } from "@/components/ui/skeleton"
import { formatPrice } from "@/content/products"
import { inboxes } from "@/content/site"
import { getStripe } from "@/lib/stripe"

export const metadata: Metadata = {
  title: "Order confirmation",
  robots: { index: false, follow: false },
}

export default function CheckoutSuccessPage(props: PageProps<"/checkout/success">) {
  return (
    <Container className="section-y flex justify-center">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-surface-raised p-7 text-center shadow-(--shadow-card) sm:p-10">
        <Suspense fallback={<ConfirmationSkeleton />}>
          <Confirmation searchParams={props.searchParams} />
        </Suspense>
      </div>
    </Container>
  )
}

function ConfirmationSkeleton() {
  return (
    <div aria-busy="true" aria-label="Confirming your payment" className="flex flex-col items-center">
      <Skeleton className="size-14 rounded-full" />
      <Skeleton className="mt-6 h-5 w-36" />
      <Skeleton className="mt-4 h-9 w-72 max-w-full" />
      <Skeleton className="mt-4 h-16 w-full" />
      <Skeleton className="mt-8 h-11 w-48" />
    </div>
  )
}

async function Confirmation({
  searchParams,
}: {
  searchParams: PageProps<"/checkout/success">["searchParams"]
}) {
  const params = await searchParams
  const sessionId = typeof params.session_id === "string" ? params.session_id : null
  const stripe = getStripe()

  let session: Awaited<ReturnType<NonNullable<typeof stripe>["checkout"]["sessions"]["retrieve"]>> | null = null
  if (sessionId && stripe && /^cs_[A-Za-z0-9_]+$/.test(sessionId)) {
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId)
    } catch (error) {
      console.error("[checkout] Could not retrieve session", error)
    }
  }

  if (!session || session.payment_status !== "paid") {
    return (
      <div className="flex flex-col items-center">
        <CircleAlert aria-hidden="true" className="size-14 text-text-accent" strokeWidth={1.5} />
        <h1 className="mt-6 text-heading">We couldn’t confirm this payment</h1>
        <p className="mt-4 text-text-muted">
          If you’ve just paid, your order is safe — confirmation can take a moment. Your basket
          hasn’t been cleared. If you were charged and need help, email{" "}
          <a href={`mailto:${inboxes.orders}`} className="font-semibold text-text-brand underline underline-offset-3">
            {inboxes.orders}
          </a>
          .
        </p>
        <ButtonLink href="/shop" className="mt-8">
          Return to the shop
        </ButtonLink>
      </div>
    )
  }

  const total = session.amount_total ?? 0
  const reference = session.id.slice(-10).toUpperCase()

  return (
    <div className="flex flex-col items-center">
      <OrderComplete sessionId={session.id} total={total} />
      <CheckCircle2 aria-hidden="true" className="size-14 text-text-brand" strokeWidth={1.5} />
      <p className="eyebrow mt-6 text-text-brand">Payment successful</p>
      <h1 className="mt-3 text-heading">Thank you for your order</h1>
      <p className="mt-4 text-text-muted">
        We’ve received your payment of{" "}
        <strong className="text-ink-900 tabular-nums">{formatPrice(total)}</strong>
        {session.customer_details?.email && (
          <>
            {" "}
            and will send updates to <strong className="text-ink-900">{session.customer_details.email}</strong>
          </>
        )}
        .
      </p>
      <dl className="mt-6 rounded-lg bg-surface-warm px-5 py-3 text-sm">
        <dt className="inline text-text-muted">Order reference: </dt>
        <dd className="inline font-mono font-semibold text-ink-900">{reference}</dd>
      </dl>
      <div className="mt-8 flex w-full gap-3 rounded-xl bg-surface-tint p-5 text-left">
        <Leaf aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-text-brand" />
        <p className="text-sm text-ink-700">
          Your order supports FlexiFib’s work on better everyday materials. Questions about
          your order? Email{" "}
          <a href={`mailto:${inboxes.orders}`} className="font-semibold underline underline-offset-3">
            {inboxes.orders}
          </a>{" "}
          with your reference.
        </p>
      </div>
      <ButtonLink href="/shop" variant="outline" className="mt-8">
        Continue shopping
      </ButtonLink>
    </div>
  )
}
