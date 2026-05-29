import { createClient } from '@/lib/supabase/server'
import QRCode from './QRCode'

export const metadata = {
  title: 'QR Code',
  description: 'View and share your profile QR code',
}

export default async function QRPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const userId = data!.claims!.sub

  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', userId)
    .single()
  
  const profileUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${profile?.username}`

  return (
    <div className="max-w-sm mx-auto py-8 flex flex-col items-center gap-6">
      <div>
        <h2 className="text-lg font-medium text-center">Your QR code</h2>
        <p className="text-sm text-muted-foreground text-center mt-1">
          Share this so anyone can scan and visit your profile.
        </p>
      </div>
      <QRCode url={profileUrl} username={profile?.username} />
    </div>
  )
}