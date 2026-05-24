import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getAnalytics } from '@/lib/analytics'
import ClicksChart from './ClicksChart'
import TopLinks from './TopLinks'

export default async function AnalyticsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single()
  if (!profile) redirect('/onboarding')

  const { totalClicks, clicksByDay, topLinks, mobilePct } = await getAnalytics(profile.id)

  return (
    <>
      <h1 className="text-xl font-medium">Analytics</h1>
      <p className="text-sm text-muted-foreground mb-5">Last 30 days</p>

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

      {/* Clicks per day chart */}
      <div className="my-8">
        <p className="text-sm font-medium mb-4">Clicks over time</p>
        <ClicksChart data={clicksByDay} />
      </div>

      {/* Top links */}
      <div className="my-8">
        <p className="text-sm font-medium mb-4">Top links</p>
        <TopLinks data={topLinks} />
      </div>
    </>
  )
}