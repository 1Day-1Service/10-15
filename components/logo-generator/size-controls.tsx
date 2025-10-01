"use client"

import { Label } from "@/components/ui/label"
import { LogoConfig } from "@/types/logo"
import { Slider } from "@/components/ui/slider"
import { SizePresets } from "./size-presets"

interface SizeControlsProps {
  config: LogoConfig
  onChange: (config: Partial<LogoConfig>) => void
}

export function SizeControls({ config, onChange }: SizeControlsProps) {
  return (
    <div className="space-y-4">
      {/* Size Presets */}
      <SizePresets config={config} onChange={onChange} />
      {/* Primary Text Size */}
      <div className="space-y-2">
        <Label>브랜드명 크기</Label>
        <div className="px-2">
          <Slider
            value={[config.fontSize.primary]}
            onValueChange={([value]) => 
              onChange({ 
                fontSize: { 
                  ...config.fontSize, 
                  primary: value 
                } 
              })
            }
            min={24}
            max={80}
            step={2}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>24px</span>
            <span className="font-medium">{config.fontSize.primary}px</span>
            <span>80px</span>
          </div>
        </div>
      </div>

      {/* Secondary Text Size */}
      {config.secondaryText && (
        <div className="space-y-2">
          <Label>슬로건 크기</Label>
          <div className="px-2">
            <Slider
              value={[config.fontSize.secondary]}
              onValueChange={([value]) => 
                onChange({ 
                  fontSize: { 
                    ...config.fontSize, 
                    secondary: value 
                  } 
                })
              }
              min={12}
              max={40}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>12px</span>
              <span className="font-medium">{config.fontSize.secondary}px</span>
              <span>40px</span>
            </div>
          </div>
        </div>
      )}

      {/* Icon Size */}
      {config.layout !== 'text-only' && (
        <div className="space-y-2">
          <Label>아이콘 크기</Label>
          <div className="px-2">
            <Slider
              value={[config.iconSize]}
              onValueChange={([value]) => onChange({ iconSize: value })}
              min={32}
              max={120}
              step={4}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>32px</span>
              <span className="font-medium">{config.iconSize}px</span>
              <span>120px</span>
            </div>
          </div>
        </div>
      )}

      {/* Spacing */}
      <div className="space-y-2">
        <Label>요소 간격</Label>
        <div className="px-2">
          <Slider
            value={[config.spacing]}
            onValueChange={([value]) => onChange({ spacing: value })}
            min={8}
            max={48}
            step={2}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>8px</span>
            <span className="font-medium">{config.spacing}px</span>
            <span>48px</span>
          </div>
        </div>
      </div>
    </div>
  )
}
