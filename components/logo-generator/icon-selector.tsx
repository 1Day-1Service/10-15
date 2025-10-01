"use client"

import { Label } from "@/components/ui/label"
import { LogoConfig } from "@/types/logo"
import { PRESET_ICONS } from "@/lib/logo-config"
import { cn } from "@/lib/utils"
import * as Icons from "lucide-react"

interface IconSelectorProps {
  config: LogoConfig
  onChange: (config: Partial<LogoConfig>) => void
}

export function IconSelector({ config, onChange }: IconSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>아이콘 선택</Label>
      <div className="grid grid-cols-4 gap-2 max-h-[300px] overflow-y-auto p-2">
        {PRESET_ICONS.map((icon) => {
          const IconComponent = Icons[icon.name as keyof typeof Icons] as React.ComponentType<{ className?: string }>
          
          return (
            <button
              key={icon.name}
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-md border-2 transition-all hover:bg-accent",
                config.selectedIcon === icon.name && config.iconType === 'preset'
                  ? "border-primary bg-accent"
                  : "border-gray-300"
              )}
              onClick={() => onChange({ 
                iconType: 'preset',
                selectedIcon: icon.name 
              })}
            >
              {IconComponent && <IconComponent className="w-6 h-6" />}
              <span className="text-[10px] text-center">{icon.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}


