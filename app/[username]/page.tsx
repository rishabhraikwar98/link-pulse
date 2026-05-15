import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProfileLinks from './ProfileLinks'
import type { Metadata } from 'next'

type Props = { params: Promise<{ username: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('profiles')
    .select('display_name, bio')
    .eq('username', username)
    .single()

  if (!data) return { title: 'Not found' }
  return {
    title: data.display_name ?? username,
    description: data.bio ?? `${username}'s links`,
  }
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, username, display_name, bio, avatar_url')
    .eq('username', username)
    .single()

  if (!profile) notFound()

  const { data: links } = await supabase
    .from('links')
    .select('id, title, url')
    .eq('profile_id', profile.id)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  return (
    <main className="min-h-screen flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-md space-y-8">

        {/* Avatar */}
        <div className="flex flex-col items-center gap-3 text-center">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.display_name ?? username}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-2xl font-medium">
              {(profile.display_name ?? username).charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-xl font-medium">{profile.display_name ?? username}</h1>
            {profile.bio && (
              <p className="text-sm text-muted-foreground mt-1">{profile.bio}</p>
            )}
          </div>
        </div>

        {/* Links */}
        <ProfileLinks links={links ?? []} />
      </div>
    </main>
  )
}