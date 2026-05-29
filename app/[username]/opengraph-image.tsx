import { ImageResponse } from 'next/og'
import { createClient } from '@/lib/supabase/server'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = { params: Promise<{ username: string }> }

export default async function OGImage({ params }: Props) {
  const { username } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, bio, avatar_url')
    .eq('username', username)
    .single()

  const name = profile?.display_name ?? username
  const bio = profile?.bio ?? 'Check out my links'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
          gap: 24,
          padding: '80px',
        }}
      >
        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            width={120}
            height={120}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: '#18181b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: 52,
              fontWeight: 500,
            }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <p style={{ fontSize: 56, fontWeight: 500, color: '#111827', margin: 0 }}>
            {name}
          </p>
          <p style={{ fontSize: 28, color: '#6b7280', margin: 0, textAlign: 'center' }}>
            {bio}
          </p>
          <p style={{ fontSize: 22, color: '#9ca3af', margin: 0, marginTop: 8 }}>
            linkpulse.app/{username}
          </p>
        </div>
      </div>
    ),
    { ...size }
  )
}