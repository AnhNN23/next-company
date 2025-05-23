import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-12">
      <Skeleton className="h-8 w-32 mb-6" />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <Skeleton className="h-10 w-3/4 mb-4" />
            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-40" />
            </div>
          </div>

          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>

        <div className="space-y-6">
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  )
}
