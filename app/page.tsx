import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, BarChart2, Palette, QrCode, Lock, GripVertical, Zap } from 'lucide-react'

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-black text-white antialiased">

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-white/8 bg-black/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-semibold tracking-tight text-base bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
            LinkPulse
          </span>
          <nav className="flex items-center gap-6">
            <a href="#features" className="text-sm text-white/40 hover:text-white transition-colors hidden sm:block">Features</a>
            <a href="#how" className="text-sm text-white/40 hover:text-white transition-colors hidden sm:block">How it works</a>
            <Button asChild size="sm" variant="outline" className="text-foreground hover:text-muted-foreground rounded-full px-5">
              <Link href="/login">Get started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative max-w-5xl mx-auto px-6 pt-28 pb-24 text-center overflow-hidden">

        {/* glow blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-175 h-100 rounded-full bg-white/3 blur-3xl" />
          <div className="absolute top-10 left-1/4 w-75 h-75 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute top-10 right-1/4 w-75 h-75 rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        <div className="relative">
          <Badge className="mb-8 bg-white/5 text-white/50 border border-white/10 hover:bg-white/5 text-xs tracking-widest uppercase px-4 py-1.5 rounded-full">
            Free · No credit card needed
          </Badge>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
            <span className="bg-linear-to-b from-white to-white/70 bg-clip-text text-transparent">
              One link for
            </span>
            <br />
            <span className="bg-linear-to-r from-indigo-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
              everything you share.
            </span>
          </h1>

          <p className="text-lg text-white/40 max-w-lg mx-auto mb-10 leading-relaxed font-light">
            A beautiful link-in-bio page with real analytics, custom themes, and a QR code — live in under two minutes.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button asChild size="lg" variant="outline" className="text-foreground hover:text-muted-foreground rounded-full px-8 font-medium">
              <Link href="/login">
                Create your page
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-white/50 hover:text-white hover:bg-white/5 rounded-full px-8">
              <a href="#features">See features</a>
            </Button>
          </div>
        </div>

        {/* HERO MOCKUP */}
        <div className="relative mt-20 flex justify-center">
          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black to-transparent z-10 pointer-events-none" />
          <div className="w-64 rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm p-6 flex flex-col items-center gap-3 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-linear-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-xl font-bold text-white shadow-lg">
              J
            </div>
            <div className="text-center">
              <p className="font-medium text-sm text-white">Jane Smith</p>
              <p className="text-xs text-white/40 mt-0.5">Designer & maker</p>
            </div>
            <div className="w-full flex flex-col gap-2 mt-1">
              {['Portfolio', 'Twitter / X', 'GitHub', 'Newsletter'].map((l, i) => (
                <div
                  key={l}
                  className="w-full py-2.5 rounded-lg text-center text-xs font-medium transition-colors"
                  style={{
                    background: i === 0 ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.05)',
                    border: i === 0 ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.06)',
                    color: i === 0 ? 'rgb(165,180,252)' : 'rgba(255,255,255,0.6)',
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-white/8">
        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { num: '50K+', label: 'active users' },
            { num: '1M+', label: 'links shared' },
            { num: '99.9%', label: 'uptime' },
            { num: '150+', label: 'countries' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold bg-linear-to-b from-white to-white/50 bg-clip-text text-transparent tracking-tight">
                {s.num}
              </p>
              <p className="text-xs text-white/30 mt-1.5 tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-5xl mx-auto px-6 py-28" id="features">
        <div className="text-center mb-16">
          <p className="text-xs font-medium tracking-widest uppercase text-white/25 mb-4">Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">
            Everything you need.
          </h2>
          <p className="text-white/35 mt-4 max-w-sm mx-auto text-sm leading-relaxed">
            No bloat. Just the tools that matter for sharing your work and knowing your audience.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8">
          {[
            { icon: Zap, title: 'Magic link auth', desc: 'Sign in with just your email. No passwords, ever.', grad: 'from-yellow-400 to-orange-400' },
            { icon: Palette, title: 'Custom themes', desc: '12 minimal presets with fonts, colors, and button shapes.', grad: 'from-pink-400 to-rose-400' },
            { icon: BarChart2, title: 'Click analytics', desc: 'Track country, device, referrer, and filter by date range.', grad: 'from-blue-400 to-indigo-400' },
            { icon: GripVertical, title: 'Drag to reorder', desc: 'Rearrange links with smooth drag-and-drop. Saves instantly.', grad: 'from-teal-400 to-cyan-400' },
            { icon: QrCode, title: 'QR code', desc: 'Generate and download a PNG QR code for print or slides.', grad: 'from-violet-400 to-purple-400' },
            { icon: Lock, title: 'Row-level security', desc: 'Supabase RLS on every query. Your data belongs to you.', grad: 'from-green-400 to-emerald-400' },
          ].map(({ icon: Icon, title, desc, grad }) => (
            <div
              key={title}
              className="bg-black p-7 group hover:bg-white/2 transition-colors"
            >
              <div className={`w-8 h-8 rounded-lg bg-linear-to-br ${grad} flex items-center justify-center mb-5 opacity-80 group-hover:opacity-100 transition-opacity`}>
                <Icon className="w-4 h-4 text-black" />
              </div>
              <p className="font-medium text-sm text-white/80 mb-2">{title}</p>
              <p className="text-xs text-white/30 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-white/8" id="how">
        <div className="max-w-5xl mx-auto px-6 py-28">
          <div className="text-center mb-16">
            <p className="text-xs font-medium tracking-widest uppercase text-white/25 mb-4">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">
              Up in three steps.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8">
            {[
              { n: '01', title: 'Sign in', desc: 'Enter your email and click the magic link we send you. No passwords ever.' },
              { n: '02', title: 'Claim your username', desc: 'Pick a username — your profile is live at linkpulse.app/you instantly.' },
              { n: '03', title: 'Share everywhere', desc: 'Add your links, pick a theme, and share your page wherever you like.' },
            ].map((s) => (
              <div key={s.n} className="bg-black p-8 hover:bg-white/2 transition-colors">
                <p className="text-5xl font-bold text-white/60 tracking-tighter mb-6 leading-none">{s.n}</p>
                <p className="font-medium text-sm text-white/80 mb-2">{s.title}</p>
                <p className="text-xs text-white/30 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="relative rounded-2xl border border-white/10 bg-white/2 overflow-hidden text-center px-8 py-20">
          {/* glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-50 bg-indigo-500/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-100 h-37.5 bg-violet-500/10 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              <span className="bg-linear-to-b from-white to-white/70 bg-clip-text text-transparent">
                Your page is one
              </span>
              <br />
              <span className="bg-linear-to-r from-indigo-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
                click away.
              </span>
            </h2>
            <p className="text-white/35 mb-10 text-sm">Free to use. No credit card. Takes less than 2 minutes.</p>
            <Button asChild size="lg" variant="outline" className="text-foreground hover:text-muted-foreground rounded-full px-10 font-medium">
              <Link href="/login">
                Create your LinkPulse
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/8">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-semibold text-sm text-white/50">LinkPulse</span>
          <p className="text-xs text-white/20">© {new Date().getFullYear()} LinkPulse. All rights reserved.</p>
          <a href="https://github.com/itsrishabh98" target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 hover:text-white transition-colors" aria-label="View GitHub">GitHub</a>
        </div>
      </footer>

    </div>
  )
}