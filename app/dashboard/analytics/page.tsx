import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getAnalytics } from '@/lib/analytics'
import ClicksChart from './ClicksChart'
import TopLinks from './TopLinks'
import Link from 'next/link'

type Props = { searchParams: Promise<{ range?: string }> }

export default async function AnalyticsPage({ searchParams }: Props) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single()
  if (!profile) redirect('/onboarding')

  const { range } = await searchParams
  const validRange = range === '7' || range === 'all' ? range : '30'

  const { totalClicks, clicksByDay, topLinks, mobilePct } = await getAnalytics(
    profile.id,
    validRange
  )

  return (
    <div className="space-y-8">

      {/* Header + range selector */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Analytics</h1>
        <div className="flex gap-1 bg-secondary p-1 rounded-lg">
          {[
            ['7', '7 days'],
            ['30', '30 days'],
            ['all', 'All time'],
          ].map(([val, label]) => (
            <Link
              key={val}
              href={`/dashboard/analytics?range=${val}`}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                validRange === val
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-secondary rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Total clicks</p>
          <p className="text-2xl font-medium">{totalClicks}</p>
        </div>
        <div className="bg-secondary rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Mobile traffic</p>
          <p className="text-2xl font-medium">{mobilePct}%</p>
        </div>
        <div className="bg-secondary rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Top links tracked</p>
          <p className="text-2xl font-medium">{topLinks.length}</p>
        </div>
      </div>

      {/* Clicks over time */}
      <div>
        <p className="text-sm font-medium mb-4">Clicks over time</p>
        <ClicksChart data={clicksByDay} />
      </div>

      {/* Top links */}
      <div>
        <p className="text-sm font-medium mb-4">Top links</p>
        <TopLinks data={topLinks} />
      </div>

    </div>
  )
}