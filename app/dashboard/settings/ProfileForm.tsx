'use client'
import { useActionState, useState, useTransition } from 'react'
import Image from 'next/image'
import { updateProfile, type ProfileState } from './actions'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type Profile = {
  username: string
  display_name: string | null
  bio: string | null
  avatar_url: string | null
}

const initialState: ProfileState = {}

export default function ProfileForm({ profile }: { profile: Profile }) {
  const [state, formAction, pending] = useActionState(updateProfile, initialState)
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url)
  const [uploading, startUpload] = useTransition()

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      alert('File must be under 2MB')
      return
    }

    startUpload(async () => {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { alert('Not signed in'); return }

      const path = `${user.id}.jpg`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, file, {
          contentType: file.type,
          upsert: true,
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        alert('Upload failed: ' + uploadError.message)
        return
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(path)

      await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id)

      setAvatarUrl(publicUrl + '?t=' + Date.now())
    })
  }

  return (
    <div className="space-y-8">

      {/* Avatar upload */}
      <div className="flex items-center gap-6">
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-secondary shrink-0">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Avatar"
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-medium text-muted-foreground">
              {(profile.display_name ?? profile.username).charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="avatar-upload" className="cursor-pointer">
            <Button variant="outline" size="sm" asChild disabled={uploading}>
              <span>{uploading ? 'Uploading…' : 'Change photo'}</span>
            </Button>
          </Label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={handleAvatarChange}
            disabled={uploading}
          />
          <p className="text-xs text-muted-foreground mt-1">JPG, PNG or WebP. Max 2MB.</p>
        </div>
      </div>

      {/* Profile fields */}
      <form action={formAction} className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="display_name">Display name</Label>
          <Input
            id="display_name"
            name="display_name"
            defaultValue={profile.display_name ?? ''}
            required
          />
          {state.fieldErrors?.display_name && (
            <p className="text-sm text-destructive">{state.fieldErrors.display_name[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            defaultValue={profile.bio ?? ''}
            placeholder="A short bio (max 160 characters)"
            maxLength={160}
            rows={3}
          />
          {state.fieldErrors?.bio && (
            <p className="text-sm text-destructive">{state.fieldErrors.bio[0]}</p>
          )}
        </div>

        {state.error && <p className="text-sm text-destructive">{state.error}</p>}
        {state.success && <p className="text-sm text-green-600">Profile updated.</p>}

        <Button type="submit" disabled={pending}>
          {pending ? 'Saving…' : 'Save changes'}
        </Button>
      </form>

    </div>
  )
}