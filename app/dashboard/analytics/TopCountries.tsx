'use client'

const FLAG: Record<string, string> = {
  US: '🇺🇸', IN: '🇮🇳', GB: '🇬🇧', DE: '🇩🇪', FR: '🇫🇷',
  CA: '🇨🇦', AU: '🇦🇺', BR: '🇧🇷', JP: '🇯🇵', KR: '🇰🇷',
  NL: '🇳🇱', SG: '🇸🇬', PK: '🇵🇰', NG: '🇳🇬', MX: '🇲🇽',
}

type Props = { data: { country: string; clicks: number }[] }

export default function TopCountries({ data }: Props) {
  if (data.length === 0) {
    return <p className="text-sm text-muted-foreground">No country data yet — available after deploying to Vercel.</p>
  }

  const max = data[0].clicks

  return (
    <div className="space-y-3">
      {data.map((row) => (
        <div key={row.country}>
          <div className="flex justify-between text-sm mb-1">
            <span className="flex items-center gap-2">
              <span>{FLAG[row.country] ?? '🌐'}</span>
              <span>{row.country}</span>
            </span>
            <span className="text-muted-foreground ml-4 shrink-0">
              {row.clicks} click{row.clicks !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.round((row.clicks / max) * 100)}%`,
                background: '#6366f1',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}