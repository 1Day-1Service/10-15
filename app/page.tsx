"use client"

import { useState } from "react"
import { EditorPanel } from "@/components/logo-generator/editor-panel"
import { Canvas } from "@/components/logo-generator/canvas"
import { LogoConfig } from "@/types/logo"
import { DEFAULT_LOGO_CONFIG } from "@/lib/logo-config"
import { Sparkles } from "lucide-react"

export default function HomePage() {
  const [config, setConfig] = useState<LogoConfig>(DEFAULT_LOGO_CONFIG)

  function handleConfigChange(updates: Partial<LogoConfig>) {
    setConfig((prev) => ({ ...prev, ...updates }))
  }

  function handleReset() {
    if (confirm('모든 변경사항이 초기화됩니다. 계속하시겠습니까?')) {
      setConfig(DEFAULT_LOGO_CONFIG)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">AI Logo Generator</h1>
                <p className="text-sm text-muted-foreground">
                  AI로 나만의 로고를 만들어보세요
                </p>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Powered by Hugging Face FLUX - 완전 무료!
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[400px,1fr] gap-6">
          {/* Editor Panel - Left (스크롤 가능) */}
          <aside>
            <EditorPanel
              config={config}
              onChange={handleConfigChange}
              onReset={handleReset}
            />
          </aside>

          {/* Canvas - Right (고정) */}
          <section className="lg:sticky lg:top-24 h-fit">
            <Canvas config={config} />
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            1Day 1Service - Day 1: AI Logo Generator
          </p>
          <p className="mt-2">
            Made with ❤️ using Next.js, TypeScript, Tailwind CSS, and Hugging Face AI
          </p>
        </div>
      </footer>
    </main>
  )
}


