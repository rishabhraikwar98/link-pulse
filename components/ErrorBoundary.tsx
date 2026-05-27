'use client'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw } from 'lucide-react'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <AlertTriangle className="w-8 h-8 text-muted-foreground" />
      <div>
        <p className="font-medium">Something went wrong</p>
        <p className="text-sm text-muted-foreground mt-1">
          {error.message ?? 'An unexpected error occurred.'}
        </p>
      </div>
      <Button variant="outline" size="sm" onClick={reset}>
        <RefreshCw className="w-4 h-4 mr-2" />
        Try again
      </Button>
    </div>
  )
}