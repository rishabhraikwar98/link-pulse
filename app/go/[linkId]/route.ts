import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ linkId: string }> }

export async function GET(request: NextRequest, { params }: Params) {
  const { linkId } = await params
  const supabase = await createClient()

  const { data: link } = await supabase
    .from('links')
    .select('url, is_active')
    .eq('id', linkId)
    .single()

  if (!link || !link.is_active) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const userAgent = request.headers.get('user-agent') ?? ''
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(userAgent)
  const country = request.headers.get('x-vercel-ip-country')
  const referrer = request.headers.get('referer') ?? null

  await supabase.from('clicks').insert({
    link_id: linkId,
    device_type: isMobile ? 'mobile' : 'desktop',
    country,
    referrer,
  })

  return NextResponse.redirect(link.url, { status: 302 })
}