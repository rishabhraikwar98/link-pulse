'use client'
import { useActionState } from 'react'
import { completeOnboarding, type OnboardingState } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

const initialState: OnboardingState = {}

export default function OnboardingPage() {
  const [state, formAction, pending] = useActionState(
    completeOnboarding,
    initialState
  )

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Set up your profile</CardTitle>
          <CardDescription>
            Choose a username — this will be your public link page URL.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-5">

            <div className="space-y-1.5">
              <Label htmlFor="display_name">Display name</Label>
              <Input
                id="display_name"
                name="display_name"
                placeholder="Jane Smith"
                required
              />
              {state.fieldErrors?.display_name && (
                <p className="text-sm text-destructive">
                  {state.fieldErrors.display_name[0]}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  linkpulse.app/
                </span>
                <Input
                  id="username"
                  name="username"
                  placeholder="jane-smith"
                  className="flex-1"
                  required
                />
              </div>
              {state.fieldErrors?.username && (
                <p className="text-sm text-destructive">
                  {state.fieldErrors.username[0]}
                </p>
              )}
            </div>

            {state.error && (
              <p className="text-sm text-destructive">{state.error}</p>
            )}

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? 'Claiming username…' : 'Continue to dashboard'}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}