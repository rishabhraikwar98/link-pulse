import { Skeleton } from '@/components/ui/skeleton'

export default function QRLoading() {
  return (
    <div className="max-w-sm mx-auto flex flex-col items-center gap-6">
      <div className="space-y-2 text-center">
        <Skeleton className="h-6 w-32 mx-auto" />
        <Skeleton className="h-4 w-56 mx-auto" />
      </div>
      <Skeleton className="w-52 h-52 rounded-xl" />
      <Skeleton className="h-9 w-36" />
    </div>
  )
}