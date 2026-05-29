import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!

  const { data: profiles } = await supabase
    .from('profiles')
    .select('username, created_at')

  const profileRoutes: MetadataRoute.Sitemap = (profiles ?? []).map((p) => ({
    url: `${appUrl}/${p.username}`,
    lastModified: new Date(p.created_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: appUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...profileRoutes,
  ]
}