"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { exportLogoAsPNG } from "@/lib/logo-exporter"
import { LogoConfig } from "@/types/logo"

interface DownloadButtonProps {
  config: LogoConfig
}

export function DownloadButton({ config }: DownloadButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  async function handleDownload(resolution: number) {
    setIsExporting(true)
    try {
      const filename = config.primaryText.replace(/\s+/g, '-').toLowerCase() || 'logo'
      await exportLogoAsPNG('logo-canvas', filename, resolution)
    } catch (error) {
      alert('다운로드 실패: ' + (error instanceof Error ? error.message : '알 수 없는 오류'))
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => handleDownload(512)}
          disabled={isExporting}
          variant="outline"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          512x512
        </Button>
        
        <Button
          onClick={() => handleDownload(1024)}
          disabled={isExporting}
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          1024x1024
        </Button>
      </div>
    </div>
  )
}


