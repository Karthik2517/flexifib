import Link from "next/link"
import { Container } from "@/components/layout/section"
import { ButtonLink } from "@/components/patterns/button-link"

export default function NotFound() {
  return (
    <Container className="section-y flex min-h-[60vh] flex-col items-start justify-center">
      <p className="eyebrow text-text-accent">Error 404</p>
      <h1 className="mt-3 text-title">We can’t find that page.</h1>
      <p className="mt-4 max-w-xl text-lead text-text-muted">
        It may have moved, or the link may be out of date. Here are some useful places to go
        next.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Go to the homepage</ButtonLink>
        <ButtonLink href="/shop" variant="outline">
          Shop the Launch Collection
        </ButtonLink>
      </div>
      <p className="mt-8 text-sm text-text-muted">
        Still stuck?{" "}
        <Link href="/contact" className="font-semibold text-text-brand underline underline-offset-3">
          Contact us
        </Link>
        .
      </p>
    </Container>
  )
}
