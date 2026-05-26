import { createClient } from '@/lib/supabase/server'
import { format, subDays } from 'date-fns'

export async function getAnalytics(
  profileId: string,
  range: '7' | '30' | 'all' = '30'
) {
  const supabase = await createClient()

  const { data: links } = await supabase
    .from('links')
    .select('id, title')
    .eq('profile_id', profileId)

  if (!links || links.length === 0) {
    return { totalClicks: 0, clicksByDay: [], topLinks: [], mobilePct: 0 }
  }

  const linkIds = links.map((l) => l.id)
  const linkMap = Object.fromEntries(links.map((l) => [l.id, l.title]))

  let query = supabase
    .from('clicks')
    .select('clicked_at, device_type, link_id')
    .in('link_id', linkIds)

  if (range !== 'all') {
    const since = subDays(new Date(), parseInt(range)).toISOString()
    query = query.gte('clicked_at', since)
  }

  const { data: clicks } = await query

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
      const title = linkMap[c.link_id] ?? 'Unknown'
      acc[title] = (acc[title] ?? 0) + 1
      return acc
    }, {})
  )
    .map(([title, clicks]) => ({ title, clicks }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5)

  const mobileCount = safeClicks.filter((c) => c.device_type === 'mobile').length
  const mobilePct =
    totalClicks === 0 ? 0 : Math.round((mobileCount / totalClicks) * 100)

  return { totalClicks, clicksByDay, topLinks, mobilePct }
}