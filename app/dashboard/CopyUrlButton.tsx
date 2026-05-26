'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Clipboard,Check } from 'lucide-react';

export default function CopyUrlButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button  variant={copied ? "ghost" : "outline"} size="default" className='cursor-pointer text-sm' onClick={handleCopy}>
      {copied ? <Check size={14} /> : <Clipboard size={14} />}
      <span className = "hidden md:block">{copied ? 'Copied!' : 'Copy link'}</span>
    </Button>
  )
}