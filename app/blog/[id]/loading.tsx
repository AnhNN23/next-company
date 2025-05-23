import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-12">
      <Skeleton className="h-8 w-32 mb-6" />

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Skeleton className="h-[300px] md:h-[400px] w-full rounded-lg mb-8" />

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>

          <Skeleton className="h-10 w-3/4 mb-6" />

          <div className="flex flex-wrap gap-2 mb-8">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
          </div>

          <Skeleton className="h-px w-full my-10" />

          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-80 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
      </div>

      <Skeleton className="h-48 w-full rounded-lg mt-16" />
    </div>
  )
}
