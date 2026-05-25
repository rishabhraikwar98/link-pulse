'use server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { Theme } from '@/lib/types/theme'

const profileSchema = z.object({
  display_name: z.string().min(1).max(50),
  bio: z.string().max(160).optional(),
})

export type ProfileState = {
  error?: string
  success?: boolean
  fieldErrors?: { display_name?: string[]; bio?: string[] }
}

export async function updateProfile(
  _prev: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) return { error: 'Not authenticated' }

  const parsed = profileSchema.safeParse({
    display_name: formData.get('display_name'),
    bio: formData.get('bio') || undefined,
  })
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }

  const { error } = await supabase
    .from('profiles')
    .update(parsed.data)
    .eq('id', user.id)

  if (error) return { error: 'Failed to update profile.' }

  revalidatePath('/dashboard/settings')
  revalidatePath('/[username]', 'page')
  return { success: true }
}

export async function saveTheme(theme: Theme): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('profiles')
    .update({ theme })
    .eq('id', user.id)

  if (error) return { error: 'Failed to save theme.' }

  revalidatePath('/dashboard/settings')
  revalidatePath('/[username]', 'page')
  return {}
}