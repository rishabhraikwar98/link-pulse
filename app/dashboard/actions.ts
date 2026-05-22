'use server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const linkSchema = z.object({
  title: z.string().min(1).max(100),
  url: z.url(),
})

async function getAuthenticatedProfile() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) throw new Error('Not authenticated')

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', data.claims.sub)
    .single()

  if (!profile) throw new Error('Profile not found')
  return { supabase, profile }
}

export async function addLink(formData: FormData) {
  const parsed = linkSchema.safeParse({
    title: formData.get('title'),
    url: formData.get('url'),
  })
  if (!parsed.success) return { error: 'Invalid input' }

  const { supabase, profile } = await getAuthenticatedProfile()

  const { count } = await supabase
    .from('links')
    .select('id', { count: 'exact', head: true })
    .eq('profile_id', profile.id)

  await supabase.from('links').insert({
    profile_id: profile.id,
    title: parsed.data.title,
    url: parsed.data.url,
    sort_order: count ?? 0,
  })

  revalidatePath('/dashboard')
}

export async function toggleLink(linkId: string, isActive: boolean) {
  const { supabase } = await getAuthenticatedProfile()
  await supabase
    .from('links')
    .update({ is_active: isActive })
    .eq('id', linkId)
  revalidatePath('/dashboard')
}

export async function deleteLink(linkId: string) {
  const { supabase } = await getAuthenticatedProfile()
  await supabase.from('links').delete().eq('id', linkId)
  revalidatePath('/dashboard')
}

export async function reorderLinks(orderedIds: string[]): Promise<void> {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) return

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single()
  if (!profile) return

  await Promise.all(
    orderedIds.map((id, index) =>
      supabase
        .from('links')
        .update({ sort_order: index })
        .eq('id', id)
        .eq('profile_id', profile.id)
    )
  )

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
}