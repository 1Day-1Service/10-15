"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2, FileImage, FileType } from "lucide-react"
import { exportLogoAsPNG, exportLogoAsSVG } from "@/lib/logo-exporter"
import { LogoConfig } from "@/types/logo"

interface DownloadButtonProps {
  config: LogoConfig
}

export function DownloadButton({ config }: DownloadButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  async function handleDownloadPNG(resolution: number) {
    setIsExporting(true)
    try {
      const filename = config.primaryText.replace(/\s+/g, '-').toLowerCase() || 'logo'
      await exportLogoAsPNG('logo-canvas', filename, resolution)
    } catch (error) {
      alert('PNG 다운로드 실패: ' + (error instanceof Error ? error.message : '알 수 없는 오류'))
    } finally {
      setIsExporting(false)
    }
  }

  async function handleDownloadSVG() {
    setIsExporting(true)
    try {
      const filename = config.primaryText.replace(/\s+/g, '-').toLowerCase() || 'logo'
      await exportLogoAsSVG('logo-canvas', filename)
    } catch (error) {
      alert('SVG 다운로드 실패: ' + (error instanceof Error ? error.message : '알 수 없는 오류'))
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* PNG 다운로드 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <FileImage className="w-4 h-4" />
          PNG 다운로드
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => handleDownloadPNG(512)}
            disabled={isExporting}
            variant="outline"
            size="sm"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            512x512
          </Button>
          
          <Button
            onClick={() => handleDownloadPNG(1024)}
            disabled={isExporting}
            variant="outline"
            size="sm"
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

      {/* SVG 다운로드 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <FileType className="w-4 h-4" />
          SVG 다운로드 (벡터)
        </div>
        <Button
          onClick={handleDownloadSVG}
          disabled={isExporting}
          className="w-full"
          size="sm"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          SVG로 다운로드
        </Button>
      </div>
    </div>
  )
}


