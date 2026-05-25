'use client'
import { useState, useTransition } from 'react'
import { saveTheme } from './actions'
import { PRESETS, DEFAULT_THEME, type Theme } from '@/lib/types/theme'
import { Button } from '@/components/ui/button'

export default function ThemeEditor({ initial }: { initial: Theme }) {
  const [theme, setTheme] = useState<Theme>(initial)
  const [saved, setSaved] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleSelect(t: Theme) {
    setTheme(t)
    setSaved(false)
  }

  function handleSave() {
    startTransition(async () => {
      await saveTheme(theme)
      setSaved(true)
    })
  }

  return (
    <div className="space-y-8">

      {/* Preset grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {PRESETS.map((p) => {
          const isSelected = theme.bg === p.theme.bg && theme.buttonBg === p.theme.buttonBg
          return (
            <button
              key={p.name}
              onClick={() => handleSelect(p.theme)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                isSelected
                  ? 'border-foreground'
                  : 'border-transparent hover:border-muted-foreground/30'
              }`}
            >
              {/* Mini preview */}
              <div
                className="w-full h-14 rounded-lg flex flex-col items-center justify-center gap-1 px-2"
                style={{ background: p.theme.bg }}
              >
                <div
                  className={`w-full h-4 text-[9px] flex items-center justify-center ${p.theme.buttonRadius}`}
                  style={{ background: p.theme.buttonBg, color: p.theme.buttonText }}
                >
                  Link
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{p.name}</span>
            </button>
          )
        })}
      </div>

      {/* Live preview */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Preview</p>
        <div
          className="rounded-xl border p-6 flex flex-col items-center gap-3"
          style={{ background: theme.bg }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium"
            style={{ background: theme.buttonBg, color: theme.buttonText }}
          >
            J
          </div>
          <p className={`text-sm font-medium ${theme.fontFamily}`} style={{ color: theme.buttonBg }}>
            Jane Smith
          </p>
          {['My Website', 'Twitter / X', 'GitHub'].map((label) => (
            <div
              key={label}
              className={`w-full py-2.5 text-center text-sm font-medium ${theme.buttonRadius} ${theme.fontFamily}`}
              style={{ background: theme.buttonBg, color: theme.buttonText }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={isPending}>
          {isPending ? 'Saving…' : 'Save theme'}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => { setTheme(DEFAULT_THEME); setSaved(false) }}>
          Reset
        </Button>
        {saved && <span className="text-sm text-green-600">Saved!</span>}
      </div>

    </div>
  )
}