import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Ghost } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <Ghost className="w-12 h-12 text-muted-foreground" />
      <div>
        <p className="text-xl font-medium">Page not found</p>
        <p className="text-sm text-muted-foreground mt-2">
          This profile doesn't exist or the link has been removed.
        </p>
      </div>
      <Button asChild variant="outline">
        <Link href="/">Go home</Link>
      </Button>
    </div>
  )
}