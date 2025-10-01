"use client"

import { useRef } from "react"
import { LogoConfig } from "@/types/logo"
import * as Icons from "lucide-react"
import { cn } from "@/lib/utils"

interface CanvasProps {
  config: LogoConfig
}

export function Canvas({ config }: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)

  const IconComponent = config.selectedIcon
    ? (Icons[config.selectedIcon as keyof typeof Icons] as React.ComponentType<{ 
        className?: string
        style?: React.CSSProperties 
      }>)
    : null

  const renderIcon = () => {
    if (config.iconType === 'ai-generated' && config.aiGeneratedIcon) {
      return (
        <img
          src={config.aiGeneratedIcon}
          alt="AI Generated Icon"
          style={{
            width: config.iconSize,
            height: config.iconSize,
          }}
          className="object-contain"
        />
      )
    }

    if (config.iconType === 'preset' && IconComponent) {
      return (
        <IconComponent
          style={{
            width: config.iconSize,
            height: config.iconSize,
            color: config.iconColor,
          }}
        />
      )
    }

    return null
  }

  const layoutClass = {
    horizontal: 'flex-row items-center',
    vertical: 'flex-col items-center',
    'text-only': 'flex-col items-center',
  }[config.layout]

  return (
    <div className="space-y-4">
      {/* Main Canvas */}
      <div
        ref={canvasRef}
        id="logo-canvas"
        className={cn(
          "flex justify-center min-h-[400px] rounded-lg shadow-lg p-8",
          layoutClass
        )}
        style={{
          backgroundColor: config.backgroundColor,
          gap: config.spacing,
        }}
      >
        {config.layout !== 'text-only' && renderIcon()}

        <div className="flex flex-col items-center gap-2">
          {config.primaryText && (
            <h1
              style={{
                fontSize: config.fontSize.primary,
                color: config.textColor,
                fontWeight: 'bold',
                margin: 0,
                fontFamily: config.fontFamily,
              }}
            >
              {config.primaryText}
            </h1>
          )}

          {config.secondaryText && (
            <p
              style={{
                fontSize: config.fontSize.secondary,
                color: config.textColor,
                margin: 0,
                fontFamily: config.fontFamily,
              }}
            >
              {config.secondaryText}
            </p>
          )}
        </div>
      </div>

      {/* Size Previews */}
      <div className="flex justify-center gap-4">
        {[0.5, 0.75, 1].map((scale) => (
          <div
            key={scale}
            className="border rounded-md p-2 bg-gray-50"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center',
            }}
          >
            <div
              className={cn("flex", layoutClass)}
              style={{
                backgroundColor: config.backgroundColor,
                gap: config.spacing * scale,
                padding: 8,
              }}
            >
              {config.layout !== 'text-only' && (
                <div style={{ 
                  width: config.iconSize * scale, 
                  height: config.iconSize * scale 
                }}>
                  {renderIcon()}
                </div>
              )}
              <div className="flex flex-col items-center">
                <span
                  style={{
                    fontSize: config.fontSize.primary * scale,
                    color: config.textColor,
                    fontWeight: 'bold',
                    fontFamily: config.fontFamily,
                  }}
                >
                  {config.primaryText}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { type CanvasProps }


