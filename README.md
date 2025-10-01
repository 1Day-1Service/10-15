# 🤖 AI Logo Generator

AI로 커스텀 로고를 생성하는 웹 애플리케이션입니다. Hugging Face FLUX를 활용하여 텍스트 프롬프트로 독창적인 아이콘을 만들 수 있습니다. **완전 무료!**

## ✨ 주요 기능

- **텍스트 편집**: 브랜드명과 슬로건 입력
- **아이콘 선택**: 
  - 15개 사전 정의 아이콘
  - 🤖 AI 생성 커스텀 아이콘
- **색상 커스터마이징**: 배경, 텍스트, 아이콘 색상 변경
- **레이아웃 선택**: 가로/세로/텍스트만
- **실시간 미리보기**: 3가지 크기로 확인
- **PNG 다운로드**: 512x512 또는 1024x1024

## 🛠 기술 스택

- **Frontend**: Next.js 14 (App Router), TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **AI**: Hugging Face (FLUX Schnell) - 완전 무료!
- **Icons**: Lucide React
- **Export**: html-to-image

## 🚀 시작하기

### 1. 설치

```powershell
# 패키지 설치
npm install

# 또는
yarn install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 API 키를 입력하세요:

```env
HUGGINGFACE_API_TOKEN=your_huggingface_token_here
```

**API 키 발급 (완전 무료!):**
1. [Hugging Face](https://huggingface.co)에 가입 (GitHub 로그인 가능)
2. [Access Tokens](https://huggingface.co/settings/tokens) 페이지 이동
3. **"New token"** 클릭 → Read 권한 선택
4. 토큰 복사 (hf_로 시작)
5. **완전 무료! 크레딧 걱정 없음**

### 3. 개발 서버 실행

```powershell
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어보세요!

## 📖 사용 방법

1. **텍스트 입력**: 브랜드명과 슬로건을 입력하세요
2. **아이콘 선택**:
   - `기본 아이콘` 탭: 사전 정의된 아이콘 선택
   - `AI 생성` 탭: 프롬프트 입력 후 AI로 생성
3. **색상 조정**: 원하는 색상 조합 선택
4. **레이아웃 선택**: 아이콘과 텍스트 배치 결정
5. **다운로드**: 원하는 해상도로 PNG 다운로드

## 🎨 AI 프롬프트 팁

좋은 결과를 위한 프롬프트 작성법:

```
✅ "minimalist coffee cup icon, simple line art, transparent background"
✅ "modern tech startup logo, geometric shapes, blue and purple"
✅ "cute cat mascot logo, cartoon style, friendly"

❌ "logo" (너무 모호함)
❌ "make it professional" (구체적이지 않음)
```

## 🔒 보안 주의사항

- `.env.local` 파일은 절대 Git에 커밋하지 마세요
- API 키는 서버 사이드에서만 사용됩니다 (클라이언트 노출 안됨)

## 📝 API 사용량 및 비용

- **Hugging Face Inference API**:
  - ✅ **완전 무료!**
  - ✅ 무제한 사용 (Rate limit 있음)
  - ✅ 크레딧 결제 불필요
  - 생성 시간: 10-20초 (첫 로딩 시 더 걸릴 수 있음)

## 🐛 문제 해결

### AI 생성이 실패할 때

1. `.env.local`에 `HUGGINGFACE_API_TOKEN`이 올바르게 설정되어 있는지 확인
2. 토큰이 `hf_`로 시작하는지 확인
3. 처음 생성 시 모델 로딩에 20-30초 소요될 수 있음 (기다려주세요)
4. 503 에러 시: 모델 로딩 중이므로 1-2분 후 다시 시도
5. 서버를 재시작해보세요 (환경 변수 변경 시)

### 이미지 다운로드가 안 될 때

- 브라우저의 팝업 차단을 해제하세요
- 다른 브라우저에서 시도해보세요

## 🔮 향후 계획

- [x] 실제 AI 이미지 생성 (Hugging Face FLUX - 완전 무료!)
- [ ] 배경 제거 기능
- [ ] 폰트 선택 옵션
- [ ] 로고 히스토리 저장
- [ ] 배치 생성 (한 번에 4개 변형)
- [ ] SVG 다운로드 지원
- [ ] 스타일 프리셋 (미니멀, 3D, 일러스트 등)

## 📄 라이선스

MIT License

## 🙏 감사의 말

- [Hugging Face](https://huggingface.co/) - 무료 AI 이미지 생성
- [FLUX](https://blackforestlabs.ai/) - 고품질 AI 모델
- [Shadcn UI](https://ui.shadcn.com/) - 아름다운 컴포넌트
- [Lucide](https://lucide.dev/) - 아이콘
- [Next.js](https://nextjs.org/) - 프레임워크

---

**1Day 1Service - Day 1** 🚀  
Made with ❤️ and AI


