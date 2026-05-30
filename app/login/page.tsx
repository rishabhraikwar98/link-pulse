'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })
    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white antialiased flex flex-col">

      {/* glow blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-100 h-75 bg-violet-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-75 h-75 bg-pink-500/6 rounded-full blur-3xl" />
      </div>

      {/* NAV */}
      <header className="relative z-10 px-6 h-14 flex items-center justify-between border-b border-white/8">
        <Link
          href="/"
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </Link>
        <span className="font-semibold text-sm bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
          LinkPulse
        </span>
        <div className="w-16" /> {/* spacer */}
      </header>

      {/* MAIN */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">

          {!sent ? (
            <>
              {/* header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-500/20 to-violet-500/20 border border-white/10 mb-6">
                  <Sparkles className="w-5 h-5 text-indigo-300" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight bg-linear-to-b from-white to-white/70 bg-clip-text text-transparent mb-2">
                  Welcome back
                </h1>
                <p className="text-sm text-white/35 leading-relaxed">
                  Enter your email and we'll send you<br />a magic link to sign in instantly.
                </p>
              </div>

              {/* form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-white/4 border-white/10 text-white placeholder:text-white/20 focus:border-white/25 focus:bg-white/6 rounded-xl h-12 transition-colors"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-white text-black hover:bg-white/90 rounded-xl font-medium transition-all"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      Sending…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send magic link
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>

              <p className="text-center text-xs text-white/20 mt-6">
                No password. No account setup. Just your email.
              </p>
            </>
          ) : (
            <>
              {/* sent state */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500/20 to-violet-500/20 border border-white/10 mb-6">
                  <Mail className="w-7 h-7 text-indigo-300" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight bg-linear-to-b from-white to-white/70 bg-clip-text text-transparent mb-3">
                  Check your inbox
                </h1>
                <p className="text-sm text-white/35 leading-relaxed mb-2">
                  We sent a magic link to
                </p>
                <p className="text-sm font-medium text-white/70 bg-white/5 border border-white/10 rounded-lg px-4 py-2 inline-block mb-8">
                  {email}
                </p>
                <p className="text-xs text-white/20 leading-relaxed">
                  Click the link in the email to sign in.<br />
                  It expires in 60 minutes. Check your spam if it doesn't arrive.
                </p>
                <button
                  onClick={() => { setSent(false); setEmail('') }}
                  className="mt-8 text-xs text-white/25 hover:text-white/50 transition-colors underline underline-offset-4"
                >
                  Use a different email
                </button>
              </div>
            </>
          )}

        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/8 px-6 py-5 text-center">
        <p className="text-xs text-white/15">
          © {new Date().getFullYear()} LinkPulse
        </p>
      </footer>

    </div>
  )
}