import { toPng, toSvg } from 'html-to-image'

export async function exportLogoAsPNG(
  elementId: string,
  filename: string,
  resolution: number = 1024
): Promise<void> {
  const element = document.getElementById(elementId)
  
  if (!element) {
    throw new Error('Canvas element not found')
  }

  try {
    const dataUrl = await toPng(element, {
      quality: 1,
      pixelRatio: resolution / Math.max(element.offsetWidth, element.offsetHeight),
      backgroundColor: '#ffffff',
    })

    // Download
    const link = document.createElement('a')
    link.download = `${filename}.png`
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error('Export failed:', error)
    throw new Error('로고 다운로드에 실패했습니다.')
  }
}

export async function exportLogoAsSVG(
  elementId: string,
  filename: string,
  config: any
): Promise<void> {
  try {
    // 진짜 벡터 SVG 생성
    const svgContent = generateVectorSVG(config)
    
    // Blob으로 변환
    const blob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)

    // Download
    const link = document.createElement('a')
    link.download = `${filename}.svg`
    link.href = url
    link.click()
    
    // 메모리 정리
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('SVG Export failed:', error)
    throw new Error('SVG 다운로드에 실패했습니다.')
  }
}

function generateVectorSVG(config: any): string {
  const { 
    primaryText, 
    secondaryText, 
    backgroundColor, 
    primaryColor, 
    secondaryColor, 
    iconColor,
    iconType,
    aiGeneratedIcon,
    layout,
    textSize,
    iconSize,
    spacing,
    fontFamily
  } = config

  // SVG 크기 설정
  const width = 400
  const height = 400
  const centerX = width / 2
  const centerY = height / 2

  // 폰트 패밀리 정리 (CSS Variables 제거)
  const cleanFontFamily = fontFamily?.replace(/var\(--font-([^)]+)\)/, (match: string, fontName: string) => {
    const fontMap: { [key: string]: string } = {
      'inter': 'Inter, sans-serif',
      'roboto': 'Roboto, sans-serif',
      'poppins': 'Poppins, sans-serif',
      'montserrat': 'Montserrat, sans-serif',
      'opensans': 'Open Sans, sans-serif',
      'playfair': 'Playfair Display, serif',
      'jetbrains': 'JetBrains Mono, monospace',
      'noto': 'Noto Sans KR, sans-serif'
    }
    return fontMap[fontName] || 'Inter, sans-serif'
  }) || 'Inter, sans-serif'

  let svgElements = ''
  
  // 레이아웃에 따른 요소 배치
  if (layout === 'horizontal') {
    // 가로 배치
    const iconX = centerX - 60
    const textX = centerX + 20
    
    // 아이콘
    if (aiGeneratedIcon) {
      svgElements += `<image x="${iconX - iconSize/2}" y="${centerY - iconSize/2}" width="${iconSize}" height="${iconSize}" href="${aiGeneratedIcon}" />`
    } else if (iconType) {
      svgElements += generateLucideIcon(iconType, iconX, centerY, iconSize, iconColor)
    }
    
    // 텍스트
    svgElements += `<text x="${textX}" y="${centerY - 5}" font-family="${cleanFontFamily}" font-size="${textSize.primary}" fill="${primaryColor}" text-anchor="start" dominant-baseline="middle">${primaryText}</text>`
    if (secondaryText) {
      svgElements += `<text x="${textX}" y="${centerY + textSize.primary/2 + spacing}" font-family="${cleanFontFamily}" font-size="${textSize.secondary}" fill="${secondaryColor}" text-anchor="start" dominant-baseline="middle">${secondaryText}</text>`
    }
  } else if (layout === 'vertical') {
    // 세로 배치
    const iconY = centerY - 40
    const textY = centerY + 20
    
    // 아이콘
    if (aiGeneratedIcon) {
      svgElements += `<image x="${centerX - iconSize/2}" y="${iconY - iconSize/2}" width="${iconSize}" height="${iconSize}" href="${aiGeneratedIcon}" />`
    } else if (iconType) {
      svgElements += generateLucideIcon(iconType, centerX, iconY, iconSize, iconColor)
    }
    
    // 텍스트
    svgElements += `<text x="${centerX}" y="${textY}" font-family="${cleanFontFamily}" font-size="${textSize.primary}" fill="${primaryColor}" text-anchor="middle" dominant-baseline="middle">${primaryText}</text>`
    if (secondaryText) {
      svgElements += `<text x="${centerX}" y="${textY + textSize.primary/2 + spacing}" font-family="${cleanFontFamily}" font-size="${textSize.secondary}" fill="${secondaryColor}" text-anchor="middle" dominant-baseline="middle">${secondaryText}</text>`
    }
  } else {
    // 텍스트만
    svgElements += `<text x="${centerX}" y="${centerY - 10}" font-family="${cleanFontFamily}" font-size="${textSize.primary}" fill="${primaryColor}" text-anchor="middle" dominant-baseline="middle">${primaryText}</text>`
    if (secondaryText) {
      svgElements += `<text x="${centerX}" y="${centerY + textSize.primary/2 + spacing}" font-family="${cleanFontFamily}" font-size="${textSize.secondary}" fill="${secondaryColor}" text-anchor="middle" dominant-baseline="middle">${secondaryText}</text>`
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${backgroundColor}"/>
  ${svgElements}
</svg>`
}

function generateLucideIcon(iconType: string, x: number, y: number, size: number, color: string): string {
  // 주요 Lucide 아이콘들을 SVG path로 변환
  const iconPaths: { [key: string]: string } = {
    'coffee': 'M17 8h1a4 4 0 1 1 0 8h-1V8zM3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z M6 2v2 M10 2v2 M14 2v2',
    'heart': 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
    'star': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    'home': 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
    'user': 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    'mail': 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
    'phone': 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'
  }

  const pathData = iconPaths[iconType] || iconPaths['star']
  const scale = size / 24 // Lucide 아이콘은 24x24 기준
  
  return `<g transform="translate(${x - size/2}, ${y - size/2}) scale(${scale})">
    <path d="${pathData}" stroke="${color}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`
}


