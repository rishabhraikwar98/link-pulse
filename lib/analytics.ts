import { createClient } from '@/lib/supabase/server'
import { format, subDays } from 'date-fns'

export async function getAnalytics(profileId: string) {
  const supabase = await createClient()

  const since = subDays(new Date(), 30).toISOString()

  const { data: clicks } = await supabase
    .from('clicks')
    .select('clicked_at, device_type, link_id, links(title)')
    .eq('links.profile_id', profileId)
    .gte('clicked_at', since)
    .not('link_id', 'is', null)
  const safeClicks = clicks ?? []

  const totalClicks = safeClicks.length

  const clicksByDay = Object.entries(
    safeClicks.reduce<Record<string, number>>((acc, c) => {
      const day = format(new Date(c.clicked_at), 'MMM d')
      acc[day] = (acc[day] ?? 0) + 1
      return acc
    }, {})
  )
    .map(([date, clicks]) => ({ date, clicks }))
    .slice(-14)

  const topLinks = Object.entries(
    safeClicks.reduce<Record<string, number>>((acc, c) => {
      const title = (c.links as any)?.title ?? 'Unknown'
      acc[title] = (acc[title] ?? 0) + 1
      return acc
    }, {})
  )
    .map(([title, clicks]) => ({ title, clicks }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5)

  const deviceSplit = safeClicks.reduce<Record<string, number>>(
    (acc, c) => {
      const d = c.device_type ?? 'unknown'
      acc[d] = (acc[d] ?? 0) + 1
      return acc
    },
    {}
  )

  const mobileCount = deviceSplit['mobile'] ?? 0
  const desktopCount = deviceSplit['desktop'] ?? 0
  const mobilePct =
    totalClicks === 0
      ? 0
      : Math.round((mobileCount / totalClicks) * 100)

  return { totalClicks, clicksByDay, topLinks, mobilePct }
}