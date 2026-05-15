'use client'
import { createClient } from '@/lib/supabase/client'

type Link = { id: string; title: string; url: string }

function getDeviceType(): string {
  return /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
}

async function recordClick(linkId: string) {
  const supabase = createClient()
  await supabase.from('clicks').insert({
    link_id: linkId,
    device_type: getDeviceType(),
    referrer: document.referrer || null,
  })
}

export default function ProfileLinks({ links }: { links: Link[] }) {
  if (links.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        No links yet.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => recordClick(link.id)}
          className="w-full rounded-xl border px-5 py-4 text-center text-sm font-medium
                     transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          {link.title}
        </a>
      ))}
    </div>
  )
}