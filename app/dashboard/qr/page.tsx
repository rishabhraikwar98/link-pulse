import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import QRCode from './QRCode'

export default async function QRPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/onboarding')

  const profileUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${profile.username}`

  return (
    <div className="max-w-sm mx-auto py-8 flex flex-col items-center gap-6">
      <div>
        <h2 className="text-lg font-medium text-center">Your QR code</h2>
        <p className="text-sm text-muted-foreground text-center mt-1">
          Share this so anyone can scan and visit your profile.
        </p>
      </div>
      <QRCode url={profileUrl} username={profile.username} />
    </div>
  )
}