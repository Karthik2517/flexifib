import { Skeleton } from "@/components/ui/skeleton"

export function AuthFormSkeleton() {
  return (
    <section className="container-page py-12 sm:py-20" aria-label="Loading account form">
      <div className="mx-auto grid max-w-4xl overflow-hidden rounded-2xl border border-border bg-surface-raised md:grid-cols-2">
        <Skeleton className="hidden min-h-[32rem] rounded-none md:block" />
        <div className="space-y-5 p-6 sm:p-10">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-56" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </section>
  )
}

export function AccountPanelSkeleton() {
  return (
    <section className="container-page py-12 sm:py-20" aria-label="Loading account">
      <div className="mx-auto max-w-md space-y-6 rounded-2xl border border-border bg-surface-raised p-6 sm:p-9">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-11 w-full" />
      </div>
    </section>
  )
}
