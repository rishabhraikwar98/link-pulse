import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AddLinkForm from './AddLinkForm'
import LinkList from './LinkList'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) redirect('/login')

  const userId = data.claims.sub

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, username')
    .eq('id', userId)
    .single()

  if (!profile) redirect('/onboarding')

  const { data: links } = await supabase
    .from('links')
    .select('id, title, url, is_active, sort_order')
    .eq('profile_id', profile.id)
    .order('sort_order', { ascending: true })

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Your links</h1>
        <a
          href={`/${profile.username}`}
          target="_blank"
          className="text-sm text-muted-foreground hover:underline"
        >
          View profile ↗
        </a>
      </div>

      <AddLinkForm />
      <LinkList links={links ?? []} />
    </div>
  )
}