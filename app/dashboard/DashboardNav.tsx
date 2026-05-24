'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dashboard', label: 'Links' },
  { href: '/dashboard/analytics', label: 'Analytics' },
  { href: '/dashboard/settings', label: 'Settings' },
]

export default function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-1 mb-8 bg-secondary p-1 rounded-lg w-fit">
      {links.map(({ href, label}) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${isActive
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }
            `}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}