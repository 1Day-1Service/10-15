export const PRESET_ICONS = [
  { name: 'Rocket', category: 'tech' },
  { name: 'Zap', category: 'tech' },
  { name: 'Code', category: 'tech' },
  { name: 'Coffee', category: 'food' },
  { name: 'ShoppingBag', category: 'fashion' },
  { name: 'Heart', category: 'health' },
  { name: 'BookOpen', category: 'education' },
  { name: 'Palette', category: 'design' },
  { name: 'Music', category: 'entertainment' },
  { name: 'Camera', category: 'media' },
  { name: 'Sparkles', category: 'design' },
  { name: 'Lightbulb', category: 'idea' },
] as const

export const COLOR_PRESETS = [
  { name: 'White', value: '#FFFFFF' },
  { name: 'Black', value: '#000000' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Purple', value: '#A855F7' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Green', value: '#10B981' },
  { name: 'Yellow', value: '#F59E0B' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Navy', value: '#1E293B' },
] as const

export const GRADIENT_PRESETS = [
  { 
    name: 'Blue-Purple', 
    value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
  },
  { 
    name: 'Pink-Orange', 
    value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' 
  },
  { 
    name: 'Green-Blue', 
    value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' 
  },
] as const

export const AI_PROMPT_EXAMPLES = [
  "minimalist coffee cup icon, simple line art, transparent background",
  "modern tech startup logo, geometric shapes, blue and purple",
  "cute cat mascot logo, cartoon style, friendly",
  "abstract mountain logo, clean lines, professional",
  "futuristic AI brain icon, glowing effect, tech style",
] as const

export const DEFAULT_LOGO_CONFIG = {
  primaryText: 'Your Brand',
  secondaryText: '',
  iconType: 'preset' as const,
  selectedIcon: 'Rocket',
  aiGeneratedIcon: undefined,
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  iconColor: '#6366F1',
  layout: 'horizontal' as const,
  fontSize: {
    primary: 48,
    secondary: 24,
  },
  iconSize: 64,
  spacing: 16,
}

// 크기 프리셋
export const SIZE_PRESETS = [
  { name: '작게', primary: 32, secondary: 16, icon: 48, spacing: 12 },
  { name: '보통', primary: 48, secondary: 24, icon: 64, spacing: 16 },
  { name: '크게', primary: 64, secondary: 32, icon: 80, spacing: 20 },
  { name: '매우 크게', primary: 80, secondary: 40, icon: 96, spacing: 24 },
] as const


