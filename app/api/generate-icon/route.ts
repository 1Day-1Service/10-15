import { NextRequest, NextResponse } from 'next/server'
import { generateIconWithReplicate } from '@/lib/ai/replicate-client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, style = 'minimalist', provider = 'replicate' } = body

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Valid prompt is required' },
        { status: 400 }
      )
    }

    // Rate limiting check (simple implementation)
    // In production, use a proper rate limiting solution

    let imageBase64: string

    if (provider === 'replicate') {
      imageBase64 = await generateIconWithReplicate(prompt, style)
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


