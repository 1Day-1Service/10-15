"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogoConfig } from "@/types/logo"

interface TextEditorProps {
  config: LogoConfig
  onChange: (config: Partial<LogoConfig>) => void
}

export function TextEditor({ config, onChange }: TextEditorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="primary-text">브랜드명</Label>
        <Input
          id="primary-text"
          value={config.primaryText}
          onChange={(e) => onChange({ primaryText: e.target.value })}
          placeholder="Your Brand"
          maxLength={20}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="secondary-text">슬로건 (선택사항)</Label>
        <Input
          id="secondary-text"
          value={config.secondaryText || ''}
          onChange={(e) => onChange({ secondaryText: e.target.value })}
          placeholder="Your tagline"
          maxLength={30}
        />
      </div>
    </div>
  )
}


