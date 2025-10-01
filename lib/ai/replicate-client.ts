import Replicate from "replicate"

const apiKey = process.env.REPLICATE_API_TOKEN

if (!apiKey) {
  console.warn("REPLICATE_API_TOKEN is not set. AI generation will fail.")
}

const replicate = apiKey ? new Replicate({ auth: apiKey }) : null

export async function generateIconWithReplicate(
  prompt: string,
  style: string = 'minimalist'
): Promise<string> {
  if (!replicate) {
    throw new Error("Replicate API is not configured. Please set REPLICATE_API_TOKEN in .env.local")
  }

  try {
    // FLUX Schnell 모델 사용 (빠르고 고품질)
    // 또는 SDXL 사용 가능
    const enhancedPrompt = `${prompt}, ${style} style, logo design, icon, clean, professional, transparent background, vector art, high quality`

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: enhancedPrompt,
          num_outputs: 1,
          aspect_ratio: "1:1",
          output_format: "png",
          output_quality: 90,
        }
      }
    ) as string[]

    if (!output || output.length === 0) {
      throw new Error("No image generated")
    }

    // 이미지 URL을 base64로 변환
    const imageUrl = output[0]
    const response = await fetch(imageUrl)
    const arrayBuffer = await response.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    
    return `data:image/png;base64,${base64}`
  } catch (error) {
    console.error("Replicate API error:", error)
    throw new Error("AI 이미지 생성 실패: " + (error instanceof Error ? error.message : "알 수 없는 오류"))
  }
}

// SDXL 모델 사용 (대안)
export async function generateIconWithSDXL(
  prompt: string,
  style: string = 'minimalist'
): Promise<string> {
  if (!replicate) {
    throw new Error("Replicate API is not configured")
  }

  try {
    const enhancedPrompt = `${prompt}, ${style} style, simple logo, icon design, flat design, vector style, professional, clean background`

    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: enhancedPrompt,
          negative_prompt: "ugly, blurry, low quality, distorted, complex background, photo, realistic",
          num_outputs: 1,
          width: 1024,
          height: 1024,
        }
      }
    ) as string[]

    if (!output || output.length === 0) {
      throw new Error("No image generated")
    }

    const imageUrl = output[0]
    const response = await fetch(imageUrl)
    const arrayBuffer = await response.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    
    return `data:image/png;base64,${base64}`
  } catch (error) {
    console.error("SDXL API error:", error)
    throw new Error("AI 이미지 생성 실패: " + (error instanceof Error ? error.message : "알 수 없는 오류"))
  }
}

