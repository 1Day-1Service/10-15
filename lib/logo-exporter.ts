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
  filename: string
): Promise<void> {
  const element = document.getElementById(elementId)
  
  if (!element) {
    throw new Error('Canvas element not found')
  }

  try {
    const dataUrl = await toSvg(element, {
      backgroundColor: '#ffffff',
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
      }
    })

    // Download
    const link = document.createElement('a')
    link.download = `${filename}.svg`
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error('SVG Export failed:', error)
    throw new Error('SVG 다운로드에 실패했습니다.')
  }
}


