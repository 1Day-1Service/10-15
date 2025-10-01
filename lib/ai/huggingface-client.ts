const apiKey = process.env.HUGGINGFACE_API_TOKEN

if (!apiKey) {
  console.warn("HUGGINGFACE_API_TOKEN is not set. AI generation will fail.")
}

export async function generateIconWithHuggingFace(
  prompt: string,
  style: string = 'minimalist'
): Promise<string> {
  if (!apiKey) {
    throw new Error("Hugging Face API is not configured. Please set HUGGINGFACE_API_TOKEN in .env.local")
  }

  try {
    // FLUX Schnell 또는 Stable Diffusion 사용
    const enhancedPrompt = `${prompt}, ${style} style, logo design, icon, clean, professional, simple, vector art, white background, high quality`

    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: enhancedPrompt,
          parameters: {
            num_inference_steps: 4, // Schnell은 4 스텝으로 빠름
            guidance_scale: 0,
          }
        }),
      }
    )

    if (!response.ok) {
      // 모델이 로딩 중일 경우 재시도
      const errorText = await response.text()
      
      if (response.status === 503) {
        // 모델 로딩 중 - 대체 모델 사용
        return await generateWithStableDiffusion(enhancedPrompt)
      }
      
      throw new Error(`Hugging Face API error: ${response.status} ${errorText}`)
    }

    const blob = await response.blob()
    const arrayBuffer = await blob.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    
    return `data:image/png;base64,${base64}`
  } catch (error) {
    console.error("Hugging Face API error:", error)
    throw new Error("AI 이미지 생성 실패: " + (error instanceof Error ? error.message : "알 수 없는 오류"))
  }
}

// 대체 모델: Stable Diffusion (더 안정적)
async function generateWithStableDiffusion(prompt: string): Promise<string> {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          negative_prompt: "ugly, blurry, low quality, distorted, photo, realistic, complex background",
        }
      }),
    }
  )

  if (!response.ok) {
    throw new Error(`Stable Diffusion API error: ${response.status}`)
  }

  const blob = await response.blob()
  const arrayBuffer = await blob.arrayBuffer()
  const base64 = Buffer.from(arrayBuffer).toString('base64')
  
  return `data:image/png;base64,${base64}`
}

