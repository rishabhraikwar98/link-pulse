import { Skeleton } from '@/components/ui/skeleton'

export default function AnalyticsLoading() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-9 w-48" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-48 w-full rounded-xl" />
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    </div>
  )
}