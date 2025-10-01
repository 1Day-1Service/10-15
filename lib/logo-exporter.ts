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
    textColor, 
    iconColor,
    iconType,
    selectedIcon,
    aiGeneratedIcon,
    layout,
    fontSize,
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
    } else if (selectedIcon) {
      svgElements += generateLucideIcon(selectedIcon, iconX, centerY, iconSize, iconColor)
    }
    
    // 텍스트
    svgElements += `<text x="${textX}" y="${centerY - 5}" font-family="${cleanFontFamily}" font-size="${fontSize.primary}" fill="${textColor}" text-anchor="start" dominant-baseline="middle">${primaryText}</text>`
    if (secondaryText) {
      svgElements += `<text x="${textX}" y="${centerY + fontSize.primary/2 + spacing}" font-family="${cleanFontFamily}" font-size="${fontSize.secondary}" fill="${textColor}" text-anchor="start" dominant-baseline="middle">${secondaryText}</text>`
    }
  } else if (layout === 'vertical') {
    // 세로 배치
    const iconY = centerY - 40
    const textY = centerY + 20
    
    // 아이콘
    if (aiGeneratedIcon) {
      svgElements += `<image x="${centerX - iconSize/2}" y="${iconY - iconSize/2}" width="${iconSize}" height="${iconSize}" href="${aiGeneratedIcon}" />`
    } else if (selectedIcon) {
      svgElements += generateLucideIcon(selectedIcon, centerX, iconY, iconSize, iconColor)
    }
    
    // 텍스트
    svgElements += `<text x="${centerX}" y="${textY}" font-family="${cleanFontFamily}" font-size="${fontSize.primary}" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${primaryText}</text>`
    if (secondaryText) {
      svgElements += `<text x="${centerX}" y="${textY + fontSize.primary/2 + spacing}" font-family="${cleanFontFamily}" font-size="${fontSize.secondary}" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${secondaryText}</text>`
    }
  } else {
    // 텍스트만
    svgElements += `<text x="${centerX}" y="${centerY - 10}" font-family="${cleanFontFamily}" font-size="${fontSize.primary}" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${primaryText}</text>`
    if (secondaryText) {
      svgElements += `<text x="${centerX}" y="${centerY + fontSize.primary/2 + spacing}" font-family="${cleanFontFamily}" font-size="${fontSize.secondary}" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${secondaryText}</text>`
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${backgroundColor}"/>
  ${svgElements}
</svg>`
}

function generateLucideIcon(iconName: string, x: number, y: number, size: number, color: string): string {
  // Lucide 아이콘 이름을 소문자로 변환 (Rocket -> rocket)
  const iconKey = iconName.toLowerCase()
  
  // 주요 Lucide 아이콘들을 SVG path로 변환
  const iconPaths: { [key: string]: string } = {
    'rocket': 'M4.5 16.5c-1.5 1.5-3 3-3 3s1.5-1.5 3-3 3-3 3-3-1.5 1.5-3 3zM15 7l-4 4 2.5 2.5L17 10l-2-3zM9 11L7 9l3-2 4 4-2.5 2.5L9 11z',
    'zap': 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    'code': 'M16 18l6-6-6-6M8 6l-6 6 6 6',
    'coffee': 'M17 8h1a4 4 0 1 1 0 8h-1V8zM3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z M6 2v2 M10 2v2 M14 2v2',
    'shoppingbag': 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0',
    'heart': 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
    'bookopen': 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z',
    'palette': 'M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-.56 2.5-1.25 0-.34-.13-.65-.35-.88-.22-.23-.35-.54-.35-.87 0-.69.56-1.25 1.25-1.25H16c3.31 0 6-2.69 6-6 0-5.51-4.49-10-10-10zM7.5 14c-.83 0-1.5-.67-1.5-1.5S6.67 11 7.5 11s1.5.67 1.5 1.5S8.33 14 7.5 14zM10 9.5C10 8.67 9.33 8 8.5 8S7 8.67 7 9.5 7.67 11 8.5 11 10 10.33 10 9.5zM15.5 8c-.83 0-1.5.67-1.5 1.5S14.67 11 15.5 11 17 10.33 17 9.5 16.33 8 15.5 8zM16.5 14c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
    'music': 'M9 18V5l12-2v13M9 9l12-2',
    'camera': 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    'sparkles': 'M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z',
    'lightbulb': 'M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4'
  }

  const pathData = iconPaths[iconKey] || iconPaths['rocket'] // 기본값을 rocket으로
  const scale = size / 24 // Lucide 아이콘은 24x24 기준
  
  return `<g transform="translate(${x - size/2}, ${y - size/2}) scale(${scale})">
    <path d="${pathData}" stroke="${color}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`
}


