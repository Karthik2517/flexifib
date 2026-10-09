"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

export default function CookiePreferences({
  initialAnalytics,
  onSave,
  onOpenChange,
}: {
  initialAnalytics: boolean
  onSave: (analytics: boolean) => void
  onOpenChange: (open: boolean) => void
}) {
  const [analytics, setAnalytics] = useState(initialAnalytics)

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="gap-6 p-6 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-subheading text-text-brand">
            Cookie preferences
          </DialogTitle>
          <DialogDescription>
            Choose which optional cookies you allow. You can change this at any time from
            the “Cookie settings” link in the footer.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <label className="flex items-start justify-between gap-6 rounded-lg border border-border p-4">
            <span>
              <span className="block font-semibold">Essential</span>
              <span className="mt-1 block text-sm text-text-muted">
                Needed for the basket, checkout and remembering this choice. Always on.
              </span>
            </span>
            <Switch checked disabled />
          </label>
          <label className="flex cursor-pointer items-start justify-between gap-6 rounded-lg border border-border p-4">
            <span>
              <span className="block font-semibold">Analytics</span>
              <span className="mt-1 block text-sm text-text-muted">
                Google Analytics, used to measure visits and page performance. Off unless
                you turn it on.
              </span>
            </span>
            <Switch checked={analytics} onCheckedChange={(checked) => setAnalytics(checked)} />
          </label>
        </div>

        <DialogFooter className="mx-0 mb-0 rounded-none border-0 bg-transparent p-0">
          <Button variant="outline" onClick={() => onSave(false)}>
            Reject optional
          </Button>
          <Button onClick={() => onSave(analytics)}>Save preferences</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
