"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { LogoConfig, AIGenerationState } from "@/types/logo"
import { Sparkles, Loader2 } from "lucide-react"
import { AI_PROMPT_EXAMPLES } from "@/lib/logo-config"

interface AIIconGeneratorProps {
  config: LogoConfig
  onChange: (config: Partial<LogoConfig>) => void
}

export function AIIconGenerator({ config, onChange }: AIIconGeneratorProps) {
  const [prompt, setPrompt] = useState("")
  const [aiState, setAiState] = useState<AIGenerationState>({
    isGenerating: false,
    progress: 0,
    error: null,
    result: null,
  })

  async function handleGenerate() {
    if (!prompt.trim()) {
      alert("프롬프트를 입력해주세요!")
      return
    }

    setAiState({
      isGenerating: true,
      progress: 10,
      error: null,
      result: null,
    })

    try {
      // Progress simulation
      const progressInterval = setInterval(() => {
        setAiState((prev) => ({
          ...prev,
          progress: Math.min(prev.progress + 15, 90),
        }))
      }, 500)

      const response = await fetch('/api/generate-icon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          style: 'minimalist',
        }),
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        throw new Error('AI 생성 실패')
      }

      const data = await response.json()

      if (data.success && data.imageBase64) {
        setAiState({
          isGenerating: false,
          progress: 100,
          error: null,
          result: data.imageBase64,
        })

        onChange({
          iconType: 'ai-generated',
          aiGeneratedIcon: data.imageBase64,
        })
      } else {
        throw new Error(data.error || '이미지 생성 실패')
      }
    } catch (error) {
      setAiState({
        isGenerating: false,
        progress: 0,
        error: error instanceof Error ? error.message : '알 수 없는 오류',
        result: null,
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="ai-prompt">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            AI 프롬프트
          </span>
        </Label>
        <Textarea
          id="ai-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="minimalist tech icon, blue and purple, transparent background"
          rows={3}
          disabled={aiState.isGenerating}
        />
      </div>

      {/* Example Prompts */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">예시 프롬프트:</Label>
        <div className="space-y-1">
          {AI_PROMPT_EXAMPLES.slice(0, 3).map((example, index) => (
            <button
              key={index}
              className="w-full text-left text-xs p-2 rounded bg-muted hover:bg-muted/80 transition-colors"
              onClick={() => setPrompt(example)}
              disabled={aiState.isGenerating}
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={aiState.isGenerating || !prompt.trim()}
        className="w-full"
      >
        {aiState.isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            생성 중...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            AI로 생성하기
          </>
        )}
      </Button>

      {/* Progress */}
      {aiState.isGenerating && (
        <div className="space-y-2">
          <Progress value={aiState.progress} />
          <p className="text-xs text-center text-muted-foreground">
            {aiState.progress}% 완료
          </p>
        </div>
      )}

      {/* Error */}
      {aiState.error && (
        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
          ❌ {aiState.error}
        </div>
      )}

      {/* Success */}
      {aiState.result && (
        <div className="p-3 rounded-md bg-green-50 text-green-700 text-sm">
          ✅ 아이콘이 생성되었습니다!
        </div>
      )}

      {/* Preview AI Generated Icon */}
      {config.iconType === 'ai-generated' && config.aiGeneratedIcon && (
        <div className="space-y-2">
          <Label>생성된 아이콘</Label>
          <div className="border rounded-md p-4 bg-white flex items-center justify-center">
            <img
              src={config.aiGeneratedIcon}
              alt="AI Generated Icon"
              className="max-w-[100px] max-h-[100px] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}


