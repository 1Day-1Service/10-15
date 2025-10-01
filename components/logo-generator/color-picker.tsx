"use client"

import { Label } from "@/components/ui/label"
import { LogoConfig } from "@/types/logo"
import { COLOR_PRESETS } from "@/lib/logo-config"
import { cn } from "@/lib/utils"

interface ColorPickerProps {
  config: LogoConfig
  onChange: (config: Partial<LogoConfig>) => void
}

export function ColorPicker({ config, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-6">
      {/* Background Color */}
      <div className="space-y-2">
        <Label>배경색</Label>
        <div className="grid grid-cols-5 gap-2">
          {COLOR_PRESETS.map((color) => (
            <button
              key={color.value}
              className={cn(
                "h-10 w-10 rounded-md border-2 transition-all hover:scale-110",
                config.backgroundColor === color.value
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-gray-300"
              )}
              style={{ backgroundColor: color.value }}
              onClick={() => onChange({ backgroundColor: color.value })}
              title={color.name}
            />
          ))}
        </div>
        <input
          type="color"
          value={config.backgroundColor}
          onChange={(e) => onChange({ backgroundColor: e.target.value })}
          className="w-full h-10 rounded-md cursor-pointer"
        />
      </div>

      {/* Text Color */}
      <div className="space-y-2">
        <Label>텍스트 색상</Label>
        <div className="grid grid-cols-5 gap-2">
          {COLOR_PRESETS.map((color) => (
            <button
              key={color.value}
              className={cn(
                "h-10 w-10 rounded-md border-2 transition-all hover:scale-110",
                config.textColor === color.value
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-gray-300"
              )}
              style={{ backgroundColor: color.value }}
              onClick={() => onChange({ textColor: color.value })}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Icon Color */}
      <div className="space-y-2">
        <Label>아이콘 색상</Label>
        <div className="grid grid-cols-5 gap-2">
          {COLOR_PRESETS.map((color) => (
            <button
              key={color.value}
              className={cn(
                "h-10 w-10 rounded-md border-2 transition-all hover:scale-110",
                config.iconColor === color.value
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-gray-300"
              )}
              style={{ backgroundColor: color.value }}
              onClick={() => onChange({ iconColor: color.value })}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  )
}


