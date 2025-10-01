"use client"

import { Label } from "@/components/ui/label"
import { LogoConfig } from "@/types/logo"
import { cn } from "@/lib/utils"

interface LayoutSelectorProps {
  config: LogoConfig
  onChange: (config: Partial<LogoConfig>) => void
}

const LAYOUTS = [
  { value: 'horizontal' as const, label: '가로 배치', icon: '→' },
  { value: 'vertical' as const, label: '세로 배치', icon: '↓' },
  { value: 'text-only' as const, label: '텍스트만', icon: 'T' },
]

export function LayoutSelector({ config, onChange }: LayoutSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>레이아웃</Label>
      <div className="grid grid-cols-3 gap-2">
        {LAYOUTS.map((layout) => (
          <button
            key={layout.value}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-md border-2 transition-all hover:bg-accent",
              config.layout === layout.value
                ? "border-primary bg-accent"
                : "border-gray-300"
            )}
            onClick={() => onChange({ layout: layout.value })}
          >
            <span className="text-2xl">{layout.icon}</span>
            <span className="text-xs">{layout.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}


