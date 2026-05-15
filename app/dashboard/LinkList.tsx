'use client'
import { useTransition, useState } from 'react'
import { toggleLink, deleteLink } from './actions'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'

type Link = {
  id: string
  title: string
  url: string
  is_active: boolean
  sort_order: number
}

function LinkRow({ link }: { link: Link }) {
  const [isPending, startTransition] = useTransition()

  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center gap-3 py-3 border-b last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{link.title}</p>
        <p className="text-xs text-muted-foreground truncate">{link.url}</p>
      </div>
      <Badge variant={link.is_active ? 'default' : 'secondary'}>
        {link.is_active ? 'Active' : 'Hidden'}
      </Badge>
      <Button
        variant="outline"
        size="sm"
        disabled={isPending}
        onClick={() => startTransition(() => toggleLink(link.id, !link.is_active))}
      >
        {link.is_active ? 'Hide' : 'Show'}
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={isPending}
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete link</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete "{link.title}"? This action cannot be undone.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={() => {
                setOpen(false)
                startTransition(() => deleteLink(link.id))
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function LinkList({ links }: { links: Link[] }) {
  if (links.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        No links yet — add your first one above.
      </p>
    )
  }

  return (
    <Card>
      <CardContent className="pt-4 pb-2">
        {links.map((link) => <LinkRow key={link.id} link={link} />)}
      </CardContent>
    </Card>
  )
}