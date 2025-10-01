"use client"

import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { LogoConfig } from "@/types/logo"
import { FONT_OPTIONS } from "@/lib/logo-config"

interface FontSelectorProps {
  config: LogoConfig
  onChange: (config: Partial<LogoConfig>) => void
}

export function FontSelector({ config, onChange }: FontSelectorProps) {
  const selectedFont = FONT_OPTIONS.find(font => font.value === config.fontFamily)

  return (
    <div className="space-y-4">
      <Label>폰트 선택</Label>
      
      {/* 드롭다운 선택기 */}
      <Select
        value={config.fontFamily}
        onChange={(e) => onChange({ fontFamily: e.target.value })}
      >
        {FONT_OPTIONS.map((font) => (
          <option key={font.value} value={font.value}>
            {font.name} ({font.category})
          </option>
        ))}
      </Select>

      {/* 선택된 폰트 미리보기 */}
      {selectedFont && (
        <div className="p-4 border rounded-md bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              미리보기: {selectedFont.name}
            </span>
            <span className="text-xs text-muted-foreground bg-white px-2 py-1 rounded">
              {selectedFont.category}
            </span>
          </div>
          
          {/* 폰트 미리보기 */}
          <div 
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: selectedFont.value }}
          >
            {config.primaryText || 'Your Brand'}
          </div>
          
          {config.secondaryText && (
            <div 
              className="text-base text-muted-foreground"
              style={{ fontFamily: selectedFont.value }}
            >
              {config.secondaryText}
            </div>
          )}
          
          {/* 샘플 텍스트 */}
          <div 
            className="text-sm text-muted-foreground mt-3 pt-3 border-t"
            style={{ fontFamily: selectedFont.value }}
          >
            The quick brown fox jumps over the lazy dog
          </div>
        </div>
      )}
    </div>
  )
}
