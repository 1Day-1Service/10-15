# 🚀 Replicate API 설정 가이드

실제 AI 이미지 생성을 위해 Replicate API를 설정하는 방법입니다.

## 1️⃣ Replicate 계정 생성

1. [Replicate](https://replicate.com) 접속
2. **Sign up** 클릭
3. GitHub 계정으로 로그인 (추천) 또는 이메일로 가입

## 2️⃣ API 토큰 발급

1. 로그인 후 [API Tokens 페이지](https://replicate.com/account/api-tokens) 이동
2. **Create Token** 버튼 클릭
3. 토큰 이름 입력 (예: `logo-generator`)
4. 생성된 토큰 복사 (한 번만 표시됩니다!)

## 3️⃣ 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용 추가:

```env
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**중요**: 
- 토큰은 `r8_`로 시작합니다
- `.env.local` 파일은 Git에 커밋되지 않습니다 (이미 .gitignore에 포함)

## 4️⃣ 서버 재시작

환경 변수를 추가한 후 개발 서버를 재시작하세요:

```powershell
# Ctrl+C로 서버 중지
npm run dev
```

## 5️⃣ 테스트

1. 브라우저에서 http://localhost:3000 접속
2. "AI 생성" 탭 클릭
3. 프롬프트 입력 예시:
   ```
   minimalist coffee cup logo, simple, clean
   ```
4. "AI로 생성하기" 클릭
5. 5-10초 후 실제 AI 이미지가 생성됩니다! ✨

## 💰 무료 크레딧

- 가입 시 무료 크레딧 제공
- FLUX Schnell 모델: 이미지당 ~$0.003 (매우 저렴)
- 무료 크레딧으로 수백 장 생성 가능

## 🎨 사용 가능한 모델

현재 구현된 모델:
- **FLUX Schnell** (기본): 빠르고 고품질
- **SDXL** (대안): 안정적인 품질

## ❓ 문제 해결

### "API token is not configured" 에러
- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- 파일 이름이 정확한지 확인 (`.env.local`, 앞에 점 있음)
- 서버를 재시작했는지 확인

### 크레딧 부족
- [Billing 페이지](https://replicate.com/account/billing)에서 크레딧 확인
- 필요시 크레딧 추가 구매

### 생성 속도가 느림
- 일반적으로 5-10초 소요
- 서버가 busy할 경우 더 오래 걸릴 수 있음
- 프롬프트를 간단하게 작성해보세요

## 📚 더 알아보기

- [Replicate 공식 문서](https://replicate.com/docs)
- [FLUX 모델 페이지](https://replicate.com/black-forest-labs/flux-schnell)
- [가격 정보](https://replicate.com/pricing)

---

**이제 실제 AI 로고를 생성할 준비가 되었습니다!** 🎉

