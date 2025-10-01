import { NextRequest, NextResponse } from 'next/server'
import { generateIconWithGemini } from '@/lib/ai/gemini-client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, style = 'minimalist', provider = 'gemini' } = body

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Valid prompt is required' },
        { status: 400 }
      )
    }

    // Rate limiting check (simple implementation)
    // In production, use a proper rate limiting solution

    let imageBase64: string

    if (provider === 'gemini') {
      imageBase64 = await generateIconWithGemini(prompt, style)
    } else {
      return NextResponse.json(
        { success: false, error: 'Unsupported provider' },
        { status: 400 }
      )
    }

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


