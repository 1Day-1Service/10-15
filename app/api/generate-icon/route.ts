import { NextRequest, NextResponse } from 'next/server'
import { generateIconWithHuggingFace } from '@/lib/ai/huggingface-client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, style = 'minimalist' } = body

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Valid prompt is required' },
        { status: 400 }
      )
    }

    const imageBase64 = await generateIconWithHuggingFace(prompt, style)

    return NextResponse.json({
      success: true,
      imageBase64,
    })
  } catch (error) {
    console.error('AI generation error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}


