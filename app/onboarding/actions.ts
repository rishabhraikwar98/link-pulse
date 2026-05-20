'use server'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const usernameSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be 30 characters or less')
    .regex(
      /^[a-z0-9-]+$/,
      'Username can only contain lowercase letters, numbers, and hyphens'
    ),
  display_name: z.string().min(1, 'Display name is required').max(50),
})

export type OnboardingState = {
  error?: string
  fieldErrors?: { username?: string[]; display_name?: string[] }
}

export async function completeOnboarding(
  _prevState: OnboardingState,
  formData: FormData
): Promise<OnboardingState> {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) return { error: 'Not authenticated' }

  const parsed = usernameSchema.safeParse({
    username: formData.get('username'),
    display_name: formData.get('display_name'),
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const { username, display_name } = parsed.data

  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .single()

  if (existing) {
    return { fieldErrors: { username: ['That username is already taken'] } }
  }

  const { error } = await supabase.from('profiles').insert({
    id: data.claims.sub,
    username,
    display_name,
  })

  if (error) return { error: 'Something went wrong. Please try again.' }

  redirect('/dashboard')
}