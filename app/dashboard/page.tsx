import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data  } = await supabase.auth.getClaims()

  if (!data?.claims) redirect('/login')

  return (
    <div className="p-8">
      <h1 className="text-2xl font-medium">Dashboard</h1>
      <p className="text-muted-foreground mt-2">Signed in as {data?.claims?.email}</p>
    </div>
  )
}