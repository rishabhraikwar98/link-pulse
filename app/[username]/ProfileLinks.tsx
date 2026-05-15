'use client'
import { createClient } from '@/lib/supabase/client'
import { detectLinkType, getLinkIcon, getLinkColor } from '@/lib/linkIcons'

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
      {links.map((link) => {
        const linkType = detectLinkType(link.url)
        const IconComponent = getLinkIcon(linkType)
        const iconColor = getLinkColor(linkType)

        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => recordClick(link.id)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-4 text-sm font-medium
                       transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <IconComponent className={`h-5 w-5 ${iconColor}`} />
            <span>{link.title}</span>
          </a>
        )
      })}
    </div>
  )
}