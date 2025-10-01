export interface LogoConfig {
  // 텍스트
  primaryText: string
  secondaryText?: string
  
  // 아이콘
  iconType: 'preset' | 'ai-generated'
  selectedIcon: string | null // Lucide 아이콘 이름
  aiGeneratedIcon?: string // AI 생성 이미지 URL/base64
  
  // 색상
  backgroundColor: string
  textColor: string
  iconColor: string
  
  // 레이아웃
  layout: 'horizontal' | 'vertical' | 'text-only'
  
  // 크기/스타일
  fontSize: {
    primary: number
    secondary: number
  }
  iconSize: number
  spacing: number
  fontFamily: string
}

export interface AIGenerationRequest {
  prompt: string
  style?: 'minimalist' | 'detailed' | 'abstract'
  provider: 'replicate'
}

export interface AIGenerationResponse {
  success: boolean
  imageUrl?: string
  imageBase64?: string
  error?: string
}

export interface AIGenerationState {
  isGenerating: boolean
  progress: number
  error: string | null
  result: string | null
}


