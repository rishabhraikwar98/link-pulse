'use client'
import { useTransition, useRef } from 'react'
import { addLink } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

export default function AddLinkForm() {
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await addLink(formData)
      formRef.current?.reset()
    })
  }

  return (
    <Card>
      <CardContent>
        <form ref={formRef} action={handleSubmit} className="flex gap-2 flex-col sm:flex-row ">
          <Input name="title"  placeholder="Label (e.g. My Blog)" required />
          <Input name="url" type="url" placeholder="https://example.com" required />
          <Button type="submit" disabled={isPending} className="shrink-0">
            {isPending ? 'Adding…' : 'Add link'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}