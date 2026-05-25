export type Theme = {
  bg: string
  buttonBg: string
  buttonText: string
  buttonRadius: 'rounded-none' | 'rounded-md' | 'rounded-full'
  fontFamily: 'font-sans' | 'font-serif' | 'font-mono'
}

export const DEFAULT_THEME: Theme = {
  bg: '#ffffff',
  buttonBg: '#111827',
  buttonText: '#ffffff',
  buttonRadius: 'rounded-md',
  fontFamily: 'font-sans',
}

export const PRESETS: { name: string; theme: Theme }[] = [
  {
    name: 'Default',
    theme: { bg: '#ffffff', buttonBg: '#111827', buttonText: '#ffffff', buttonRadius: 'rounded-md', fontFamily: 'font-sans' },
  },
  {
    name: 'Midnight',
    theme: { bg: '#0f172a', buttonBg: '#6366f1', buttonText: '#ffffff', buttonRadius: 'rounded-md', fontFamily: 'font-sans' },
  },
  {
    name: 'Rose',
    theme: { bg: '#fff1f2', buttonBg: '#e11d48', buttonText: '#ffffff', buttonRadius: 'rounded-full', fontFamily: 'font-sans' },
  },
  {
    name: 'Forest',
    theme: { bg: '#f0fdf4', buttonBg: '#166534', buttonText: '#ffffff', buttonRadius: 'rounded-md', fontFamily: 'font-serif' },
  },
  {
    name: 'Mono',
    theme: { bg: '#fafafa', buttonBg: '#18181b', buttonText: '#ffffff', buttonRadius: 'rounded-none', fontFamily: 'font-mono' },
  },
  {
    name: 'Ocean',
    theme: { bg: '#eff6ff', buttonBg: '#1d4ed8', buttonText: '#ffffff', buttonRadius: 'rounded-md', fontFamily: 'font-sans' },
  },
  {
    name: 'Sunset',
    theme: { bg: '#fff7ed', buttonBg: '#ea580c', buttonText: '#ffffff', buttonRadius: 'rounded-full', fontFamily: 'font-sans' },
  },
  {
    name: 'Lavender',
    theme: { bg: '#f5f3ff', buttonBg: '#7c3aed', buttonText: '#ffffff', buttonRadius: 'rounded-full', fontFamily: 'font-sans' },
  },
  {
    name: 'Sand',
    theme: { bg: '#fefce8', buttonBg: '#854d0e', buttonText: '#ffffff', buttonRadius: 'rounded-md', fontFamily: 'font-serif' },
  },
  {
    name: 'Slate',
    theme: { bg: '#f8fafc', buttonBg: '#475569', buttonText: '#ffffff', buttonRadius: 'rounded-md', fontFamily: 'font-sans' },
  },
  {
    name: 'Noir',
    theme: { bg: '#09090b', buttonBg: '#ffffff', buttonText: '#09090b', buttonRadius: 'rounded-none', fontFamily: 'font-mono' },
  },
  {
    name: 'Mint',
    theme: { bg: '#f0fdfa', buttonBg: '#0f766e', buttonText: '#ffffff', buttonRadius: 'rounded-full', fontFamily: 'font-sans' },
  },
]