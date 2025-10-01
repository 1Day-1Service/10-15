"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { LogoConfig } from "@/types/logo"
import { SIZE_PRESETS } from "@/lib/logo-config"

interface SizePresetsProps {
  config: LogoConfig
  onChange: (config: Partial<LogoConfig>) => void
}

export function SizePresets({ config, onChange }: SizePresetsProps) {
  const applyPreset = (preset: typeof SIZE_PRESETS[0]) => {
    onChange({
      fontSize: {
        primary: preset.primary,
        secondary: preset.secondary,
      },
      iconSize: preset.icon,
      spacing: preset.spacing,
    })
  }

  return (
    <div className="space-y-2">
      <Label>크기 프리셋</Label>
      <div className="grid grid-cols-2 gap-2">
        {SIZE_PRESETS.map((preset) => (
          <Button
            key={preset.name}
            variant="outline"
            size="sm"
            onClick={() => applyPreset(preset)}
            className="text-xs"
          >
            {preset.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
