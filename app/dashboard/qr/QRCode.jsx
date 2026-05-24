'use client'
import { useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { FiDownload } from 'react-icons/fi'
import { Button } from '@/components/ui/button'

export default function QRCode({ url, username }) {
  const canvasRef = useRef(null)

  function handleDownload() {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = `${username}-qr.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="p-4 bg-white rounded-xl border shadow-sm">
        <QRCodeCanvas
          ref={canvasRef}
          value={url}
          size={200}
          level="H"
          marginSize={2}
          fgColor="#111827"
          bgColor="#ffffff"
        />
      </div>
      <p className="text-xs text-muted-foreground break-all text-center max-w-xs">
        {url}
      </p>
      <Button variant="outline" size="default" onClick={handleDownload}>
        <FiDownload width={16} height={16} aria-hidden="true" />
        Download PNG
      </Button>
    </div>
  )
}