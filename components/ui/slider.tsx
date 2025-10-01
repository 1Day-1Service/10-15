"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number[]
  onValueChange: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, value, onValueChange, min = 0, max = 100, step = 1, disabled = false, ...props }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false)
    const sliderRef = React.useRef<HTMLDivElement>(null)

    const percentage = ((value[0] - min) / (max - min)) * 100

    const updateValue = React.useCallback((clientX: number) => {
      if (!sliderRef.current) return

      const rect = sliderRef.current.getBoundingClientRect()
      const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      const newValue = min + percentage * (max - min)
      const steppedValue = Math.round(newValue / step) * step
      
      onValueChange([Math.max(min, Math.min(max, steppedValue))])
    }, [min, max, step, onValueChange])

    const handleMouseDown = React.useCallback((event: React.MouseEvent) => {
      if (disabled) return
      
      setIsDragging(true)
      updateValue(event.clientX)
      
      const handleMouseMove = (e: MouseEvent) => {
        updateValue(e.clientX)
      }
      
      const handleMouseUp = () => {
        setIsDragging(false)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
      
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }, [disabled, updateValue])

    const handleTouchStart = React.useCallback((event: React.TouchEvent) => {
      if (disabled) return
      
      setIsDragging(true)
      updateValue(event.touches[0].clientX)
      
      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault()
        updateValue(e.touches[0].clientX)
      }
      
      const handleTouchEnd = () => {
        setIsDragging(false)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
      
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
    }, [disabled, updateValue])

    const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
      if (disabled) return
      
      let newValue = value[0]
      
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          newValue = Math.max(min, value[0] - step)
          break
        case 'ArrowRight':
        case 'ArrowUp':
          newValue = Math.min(max, value[0] + step)
          break
        case 'Home':
          newValue = min
          break
        case 'End':
          newValue = max
          break
        default:
          return
      }
      
      event.preventDefault()
      onValueChange([newValue])
    }, [disabled, value, min, max, step, onValueChange])

    return (
      <div
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
      >
        <div 
          ref={sliderRef}
          className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary cursor-pointer"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div 
            className="absolute h-full bg-primary transition-all duration-75"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div 
          className={cn(
            "absolute block h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md transition-all duration-75 cursor-grab active:cursor-grabbing",
            isDragging && "scale-110 shadow-lg",
            disabled && "cursor-not-allowed opacity-50"
          )}
          style={{ left: `calc(${percentage}% - 10px)` }}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value[0]}
          aria-disabled={disabled}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
