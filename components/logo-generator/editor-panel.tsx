"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TextEditor } from "./text-editor"
import { IconSelector } from "./icon-selector"
import { AIIconGenerator } from "./ai-icon-generator"
import { ColorPicker } from "./color-picker"
import { LayoutSelector } from "./layout-selector"
import { SizeControls } from "./size-controls"
import { FontSelector } from "./font-selector"
import { DownloadButton } from "./download-button"
import { Button } from "@/components/ui/button"
import { LogoConfig } from "@/types/logo"
import { RotateCcw } from "lucide-react"
import { DEFAULT_LOGO_CONFIG } from "@/lib/logo-config"

interface EditorPanelProps {
  config: LogoConfig
  onChange: (config: Partial<LogoConfig>) => void
  onReset: () => void
}

export function EditorPanel({ config, onChange, onReset }: EditorPanelProps) {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">로고 편집</h2>
        
        {/* Text Editor */}
        <TextEditor config={config} onChange={onChange} />
        
        {/* Icon Selection Tabs */}
        <div className="pt-4 border-t">
          <Tabs value={config.iconType} onValueChange={(value) => onChange({ iconType: value as 'preset' | 'ai-generated' })}>
            <TabsList className="w-full">
              <TabsTrigger value="preset" className="flex-1">
                기본 아이콘
              </TabsTrigger>
              <TabsTrigger value="ai-generated" className="flex-1">
                🤖 AI 생성
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="preset">
              <IconSelector config={config} onChange={onChange} />
            </TabsContent>
            
            <TabsContent value="ai-generated">
              <AIIconGenerator config={config} onChange={onChange} />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Color Picker */}
        <div className="pt-4 border-t">
          <ColorPicker config={config} onChange={onChange} />
        </div>
        
        {/* Layout Selector */}
        <div className="pt-4 border-t">
          <LayoutSelector config={config} onChange={onChange} />
        </div>
        
        {/* Size Controls */}
        <div className="pt-4 border-t">
          <SizeControls config={config} onChange={onChange} />
        </div>
        
        {/* Font Selector */}
        <div className="pt-4 border-t">
          <FontSelector config={config} onChange={onChange} />
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2 pt-4 border-t">
        <DownloadButton config={config} />
        
        <Button
          onClick={onReset}
          variant="outline"
          className="w-full"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          초기화
        </Button>
      </div>
    </div>
  )
}


