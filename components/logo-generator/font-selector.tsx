"use client"

import { Label } from "@/components/ui/label"
import { LogoConfig } from "@/types/logo"
import { FONT_OPTIONS } from "@/lib/logo-config"
import { cn } from "@/lib/utils"

interface FontSelectorProps {
  config: LogoConfig
  onChange: (config: Partial<LogoConfig>) => void
}

export function FontSelector({ config, onChange }: FontSelectorProps) {
  return (
    <div className="space-y-4">
      <Label>폰트 선택</Label>
      
      <div className="grid grid-cols-1 gap-3">
        {FONT_OPTIONS.map((font) => (
          <button
            key={font.value}
            className={cn(
              "flex flex-col items-start p-3 rounded-md border-2 transition-all hover:bg-accent text-left",
              config.fontFamily === font.value
                ? "border-primary bg-accent"
                : "border-gray-300"
            )}
            onClick={() => onChange({ fontFamily: font.value })}
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-medium text-sm">{font.name}</span>
              <span className="text-xs text-muted-foreground">{font.category}</span>
            </div>
            
            {/* 폰트 미리보기 */}
            <div 
              className="mt-2 text-lg"
              style={{ fontFamily: font.value }}
            >
              {config.primaryText || 'Your Brand'}
            </div>
            
            {config.secondaryText && (
              <div 
                className="text-sm text-muted-foreground mt-1"
                style={{ fontFamily: font.value }}
              >
                {config.secondaryText}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
