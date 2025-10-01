# 로고 생성기 - 기획안 (AI 통합)
**프로젝트명:** AI-Powered Logo Generator  
**개발 기간:** 1일 (8-10시간)  
**날짜:** 2025-10-01

---

## 📋 프로젝트 개요

사용자가 텍스트, 아이콘, 색상을 조합하여 간단한 로고를 만들 수 있는 웹 애플리케이션입니다.  
**🤖 AI 기능**: Gemini 2.5 Flash를 활용하여 텍스트 프롬프트로 커스텀 아이콘/로고를 생성할 수 있습니다.  
복잡한 디자인 도구 없이도 빠르게 심플하고 독창적인 로고를 생성하고 다운로드할 수 있습니다.

---

## 🎯 핵심 기능 (MVP)

### 1. 로고 편집 영역
- **텍스트 입력**
  - 회사명/브랜드명 입력 (최대 20자)
  - 서브 텍스트(슬로건) 입력 옵션 (최대 30자)
  
- **아이콘 선택**
  - **방법 1**: 사전 정의된 아이콘 10-15개 제공 (Lucide React)
  - **방법 2**: 🤖 AI 생성 (신규!)
    - 프롬프트 입력: "minimalist coffee cup icon", "tech startup logo" 등
    - Gemini 2.5 Flash로 이미지 생성
    - 생성된 이미지를 캔버스에 통합
    - 배경 제거 옵션 (투명 PNG)
  - 카테고리: Tech, Food, Fashion, Health, Education

- **스타일 커스터마이징**
  - 배경색 선택 (6가지 프리셋 + 커스텀)
  - 텍스트 색상 선택 (6가지 프리셋 + 커스텀)
  - 아이콘 색상 선택
  - 레이아웃 선택 (3가지)
    1. 아이콘 좌측 + 텍스트 우측
    2. 아이콘 상단 + 텍스트 하단
    3. 텍스트만 (아이콘 없음)

### 2. 실시간 미리보기
- 캔버스 영역에서 실시간으로 로고 확인
- 반응형으로 다양한 크기 미리보기 (작게/중간/크게)

### 3. 다운로드 기능
- PNG 형식으로 다운로드
- 해상도 선택: 512x512, 1024x1024
- 투명 배경 옵션

### 4. 저장 및 불러오기 (선택사항)
- LocalStorage에 최근 작업 저장 (최대 3개)
- 빠른 불러오기 기능

---

## 🎨 UI/UX 설계

### 레이아웃 구조
```
┌───────────────────────────────────────────────┐
│         Header (로고 + 제목)                   │
├──────────────┬────────────────────────────────┤
│              │                                │
│   편집 패널   │    캔버스 (미리보기)             │
│   (좌측)     │       (우측)                   │
│              │                                │
│  - 텍스트     │    ┌──────────────┐           │
│              │    │              │           │
│  - 아이콘     │    │   로고 영역    │           │
│    ├ 기본     │    │              │           │
│    └ 🤖 AI   │    └──────────────┘           │
│      [생성]   │                                │
│              │    크기 미리보기                │
│  - 색상      │    🔲 🔳 🔲                   │
│  - 레이아웃   │                                │
│              │    ⚡ AI 생성 상태              │
│  [다운로드]   │    [로딩 중... 30%]            │
│  [초기화]     │                                │
└──────────────┴────────────────────────────────┘
```

### 색상 팔레트
- **Primary**: Indigo (#6366F1)
- **배경 프리셋**:
  - White (#FFFFFF)
  - Black (#000000)
  - Gradient Blue-Purple
  - Gradient Pink-Orange
  - Navy (#1E293B)
  - Mint (#10B981)

### 반응형 디자인
- **Desktop (1024px+)**: 좌우 분할 레이아웃
- **Tablet (768px)**: 좌우 분할 유지, 패널 축소
- **Mobile (~640px)**: 상하 레이아웃, 편집 패널 탭 형태

---

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI + Radix UI
  - Button, Input, Select, Slider, Tabs, Textarea
  - Dialog, Popover (색상 선택기)
  - Progress (AI 생성 진행률)
- **Icons**: Lucide React
- **Canvas/Export**: html-to-image 라이브러리

### AI/Backend
- **AI Provider 옵션**:
  - **Gemini 2.5 Flash** (Google AI) - 추천!
    - `@google/generative-ai` SDK
    - 이미지 생성 via Imagen 3
    - 빠른 응답 속도 (5-10초)
    - 무료 티어: 15 RPM (분당 요청)
  - **Grok** (xAI) - 대안
    - REST API 호출
    - 창의적인 이미지 생성
- **API Route**: Next.js API Routes (`app/api/generate-icon/route.ts`)
- **환경 변수**: `.env.local`

### 상태 관리
- React useState/useReducer (간단한 로컬 상태)
- LocalStorage API (저장 기능)
- AI 생성 상태 관리 (로딩, 에러, 성공)

---

## 📁 프로젝트 구조

```
2025-10-01-logo-generator/
├── app/
│   ├── api/
│   │   └── generate-icon/
│   │       └── route.ts        # AI 이미지 생성 API
│   ├── layout.tsx              # 루트 레이아웃
│   ├── page.tsx                # 메인 페이지
│   └── globals.css             # 전역 스타일
├── components/
│   ├── logo-generator/
│   │   ├── canvas.tsx          # 로고 미리보기 캔버스
│   │   ├── editor-panel.tsx    # 편집 패널 (좌측)
│   │   ├── text-editor.tsx     # 텍스트 입력 섹션
│   │   ├── icon-selector.tsx   # 아이콘 선택 그리드
│   │   ├── ai-icon-generator.tsx # 🤖 AI 아이콘 생성기 (신규!)
│   │   ├── color-picker.tsx    # 색상 선택기
│   │   ├── layout-selector.tsx # 레이아웃 선택
│   │   └── download-button.tsx # 다운로드 버튼
│   └── ui/                     # Shadcn UI 컴포넌트
├── lib/
│   ├── ai/
│   │   ├── gemini-client.ts    # Gemini API 클라이언트
│   │   └── grok-client.ts      # Grok API 클라이언트 (옵션)
│   ├── logo-config.ts          # 아이콘, 색상 프리셋 설정
│   ├── logo-exporter.ts        # PNG 내보내기 로직
│   └── utils.ts                # 유틸리티 함수
├── types/
│   └── logo.ts                 # 로고 인터페이스 정의
├── public/
│   ├── generated/              # AI 생성 이미지 임시 저장
│   └── favicon.ico
├── .env.local                  # API 키 (gitignore)
├── .env.example                # 환경 변수 예시
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

## 🔧 데이터 구조

### LogoConfig Interface
```typescript
interface LogoConfig {
  // 텍스트
  primaryText: string;
  secondaryText?: string;
  
  // 아이콘
  iconType: 'preset' | 'ai-generated'; // 🆕
  selectedIcon: string | null; // Lucide 아이콘 이름
  aiGeneratedIcon?: string; // 🆕 AI 생성 이미지 URL/base64
  
  // 색상
  backgroundColor: string;
  textColor: string;
  iconColor: string;
  
  // 레이아웃
  layout: 'horizontal' | 'vertical' | 'text-only';
  
  // 크기/스타일
  fontSize: {
    primary: number;
    secondary: number;
  };
  iconSize: number;
  spacing: number;
}

// 🆕 AI 생성 요청/응답
interface AIGenerationRequest {
  prompt: string;
  style?: 'minimalist' | 'detailed' | 'abstract';
  provider: 'gemini' | 'grok';
}

interface AIGenerationResponse {
  success: boolean;
  imageUrl?: string;
  imageBase64?: string;
  error?: string;
}
```

---

## 📅 개발 일정 (8-10시간)

### Phase 1: 프로젝트 설정 (1시간)
- [x] Next.js 프로젝트 초기화
- [ ] Shadcn UI 설치 및 설정
- [ ] 환경 변수 설정 (.env.local)
- [ ] AI SDK 설치 (@google/generative-ai)
- [ ] 기본 레이아웃 구조 생성
- [ ] 타입 정의 (AI 포함)

### Phase 2: 기본 UI 구현 (2.5시간)
- [ ] 편집 패널 컴포넌트 (1.5시간)
  - 텍스트 입력 폼
  - 아이콘 선택 탭 (기본 / AI)
  - 색상 선택기
  - 레이아웃 선택
- [ ] 캔버스 컴포넌트 (1시간)
  - 로고 렌더링
  - 실시간 업데이트
  - 반응형 미리보기

### Phase 3: 🤖 AI 기능 구현 (2.5시간) - 신규!
- [ ] Gemini API 클라이언트 (0.5시간)
  - API 키 설정
  - 이미지 생성 함수
- [ ] API Route 구현 (0.5시간)
  - `/api/generate-icon` 엔드포인트
  - 에러 핸들링
- [ ] AI 아이콘 생성기 UI (1시간)
  - 프롬프트 입력 폼
  - 생성 버튼
  - 로딩 상태 (Progress)
  - 결과 미리보기
- [ ] 생성된 이미지 통합 (0.5시간)
  - 캔버스에 표시
  - 색상 필터 적용

### Phase 4: 핵심 기능 구현 (1.5시간)
- [ ] 상태 관리 (0.5시간)
  - AI 생성 상태 포함
- [ ] 로고 생성 로직 (0.5시간)
- [ ] PNG 다운로드 기능 (0.5시간)

### Phase 5: 스타일링 & 반응형 (1시간)
- [ ] Tailwind 스타일 적용
- [ ] 모바일 반응형 조정
- [ ] 애니메이션 추가 (로딩 효과)

### Phase 6: 테스트 & 최적화 (1시간)
- [ ] AI 생성 테스트 (다양한 프롬프트)
- [ ] 에러 케이스 처리
- [ ] 성능 최적화 (이미지 캐싱)
- [ ] 버그 수정
- [ ] README 작성 (API 키 설정 가이드)

---

## ✨ 추가 기능 (시간 여유시)

1. **🤖 AI 스타일 프리셋** (30분)
   - "미니멀리스트", "일러스트", "3D 아이콘" 스타일 선택
   - 프롬프트 자동 생성 도우미

2. **배경 제거** (30분)
   - AI 생성 이미지의 배경 자동 제거
   - remove.bg API 또는 클라이언트 사이드 처리

3. **프리셋 템플릿** (30분)
   - 3-5개 미리 만들어진 로고 스타일
   - 원클릭으로 적용

4. **폰트 선택** (30분)
   - 구글 폰트 3-4개 선택 옵션

5. **그라디언트 배경** (20분)
   - 더 다양한 그라디언트 프리셋

6. **복사하기 기능** (15분)
   - 클립보드에 이미지 복사

7. **히스토리** (30분)
   - 작업 내역 저장/불러오기 (AI 생성 이미지 포함)

8. **배치 생성** (45분)
   - 한 번에 4개 변형 생성
   - 가장 마음에 드는 것 선택

---

## 🎯 성공 지표

1. ✅ 사용자가 3분 안에 로고를 만들고 다운로드할 수 있다
2. ✅ AI 생성이 10초 이내에 완료된다
3. ✅ 모든 기기에서 정상 작동한다 (반응형)
4. ✅ 생성된 로고가 깨끗하고 고품질이다 (1024px)
5. ✅ UI가 직관적이고 사용하기 쉽다
6. ✅ AI 생성 실패 시 적절한 에러 메시지 표시

---

## 🚀 시작하기

### 1. 프로젝트 초기 설정

```powershell
# 프로젝트 생성
npx create-next-app@latest 2025-10-01-logo-generator --typescript --tailwind --app

# 디렉토리 이동
cd 2025-10-01-logo-generator

# Shadcn UI 초기화
npx shadcn-ui@latest init

# 필요한 컴포넌트 설치
npx shadcn-ui@latest add button input label select slider tabs dialog popover textarea progress

# 추가 패키지 설치
npm install lucide-react html-to-image @google/generative-ai
```

### 2. 환경 변수 설정

`.env.local` 파일 생성:

```env
# Gemini API 키 (추천)
GOOGLE_AI_API_KEY=your_gemini_api_key_here

# Grok API 키 (선택사항)
GROK_API_KEY=your_grok_api_key_here

# AI Provider 선택 (gemini 또는 grok)
AI_PROVIDER=gemini
```

**API 키 발급 방법:**

- **Gemini**: [Google AI Studio](https://makersuite.google.com/app/apikey)에서 무료 발급
- **Grok**: [xAI Console](https://console.x.ai/)에서 발급 (대기자 명단)

### 3. `.env.example` 파일 생성

```powershell
# .env.example 파일 생성 (Git에 포함)
@"
GOOGLE_AI_API_KEY=your_api_key_here
GROK_API_KEY=your_api_key_here
AI_PROVIDER=gemini
"@ | Out-File -FilePath .env.example -Encoding UTF8
```

### 4. 개발 서버 실행

```powershell
npm run dev
```

브라우저에서 http://localhost:3000 접속

---

## 📝 참고 사항

### 학습 포인트
- Canvas API / html-to-image 활용
- 복잡한 상태 관리 (AI 비동기 처리)
- 실시간 UI 업데이트
- 파일 다운로드 처리
- **🤖 AI API 통합** (Gemini/Grok)
- Next.js API Routes 활용
- 비동기 이미지 생성 처리
- 에러 핸들링 및 로딩 상태 관리

### 주의사항
- 너무 많은 기능을 추가하지 말 것 (범위 관리)
- 성능 최적화 (디바운싱, 이미지 캐싱)
- 브라우저 호환성 확인
- **API 키 보안** (절대 클라이언트 노출 금지)
- **API 사용량 제한** 고려 (Gemini: 15 RPM)
- AI 생성 시간 최적화 (프롬프트 엔지니어링)

### AI 프롬프트 팁
좋은 결과를 위한 프롬프트 작성법:
```
✅ "minimalist coffee cup icon, simple line art, transparent background"
✅ "modern tech startup logo, geometric shapes, blue and purple"
✅ "cute cat mascot logo, cartoon style, friendly"

❌ "logo" (너무 모호함)
❌ "make it professional" (구체적이지 않음)
```

### API 비용 (참고)
- **Gemini 2.5 Flash**: 무료 티어 (15 RPM, 1,500 RPD)
- **Grok**: 가격 정책 확인 필요

---

## 🎨 예상 결과물 미리보기

```
사용자 플로우:
1. "테크 스타트업 로고를 만들고 싶어요" 💭
2. 텍스트 입력: "TechFlow"
3. AI 프롬프트: "futuristic tech icon, minimalist"
4. [AI 생성 중...] ⏳
5. 생성된 아이콘 표시 ✨
6. 색상/레이아웃 조정
7. PNG 다운로드! 🎉
```

---

**🚀 준비 완료! AI가 통합된 로고 생성기를 만들어봅시다!**

다음 단계:
1. ✅ 기획안 완성
2. ⏭️ 개발 시작
3. 🎯 8-10시간 안에 완성

**바로 개발을 시작하시겠습니까?** 
제가 전체 프로젝트를 세팅하고 AI 통합까지 구현해드릴 수 있습니다! 💪

