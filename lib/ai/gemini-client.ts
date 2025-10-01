import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.GOOGLE_AI_API_KEY

if (!apiKey) {
  console.warn("GOOGLE_AI_API_KEY is not set. AI generation will fail.")
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

export async function generateIconWithGemini(
  prompt: string,
  style: string = 'minimalist'
): Promise<string> {
  if (!genAI) {
    throw new Error("Gemini API is not configured. Please set GOOGLE_AI_API_KEY in .env.local")
  }

  try {
    // Gemini 2.5 Flash는 이미지 생성을 직접 지원하지 않습니다
    // Imagen 3를 사용하려면 별도의 API가 필요합니다
    // 여기서는 placeholder로 대체합니다
    
    // 실제 구현을 위해서는:
    // 1. Google AI Studio에서 Imagen API 접근 권한 확보
    // 2. 또는 다른 이미지 생성 API 사용 (DALL-E, Stable Diffusion 등)
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })
    
    // Gemini로 프롬프트 개선
    const enhancedPromptResult = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: `You are a prompt engineer for image generation AI. 
Enhance this logo/icon prompt for better results: "${prompt}"
Style: ${style}
Requirements:
- Simple, clean, professional
- Transparent or white background
- Icon/logo suitable
- High quality, vector-like

Return only the enhanced prompt, nothing else.`
        }]
      }]
    })
    
    const enhancedPrompt = enhancedPromptResult.response.text()
    
    // 여기서 실제 이미지 생성 API를 호출해야 합니다
    // 현재는 placeholder SVG를 반환합니다
    const placeholderSvg = generatePlaceholderSvg(prompt)
    return `data:image/svg+xml;base64,${btoa(placeholderSvg)}`
    
  } catch (error) {
    console.error("Gemini API error:", error)
    throw new Error("AI 이미지 생성 실패: " + (error instanceof Error ? error.message : "알 수 없는 오류"))
  }
}

function generatePlaceholderSvg(prompt: string): string {
  // 프롬프트 기반 간단한 SVG 생성
  const colors = ['#6366F1', '#A855F7', '#EC4899', '#3B82F6', '#10B981']
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  
  return `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="white"/>
      <circle cx="100" cy="100" r="60" fill="${randomColor}" opacity="0.8"/>
      <text x="100" y="110" font-family="Arial" font-size="16" fill="white" text-anchor="middle">
        AI
      </text>
      <text x="100" y="180" font-family="Arial" font-size="12" fill="#666" text-anchor="middle">
        ${prompt.substring(0, 20)}...
      </text>
    </svg>
  `.trim()
}


