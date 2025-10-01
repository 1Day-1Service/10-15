# 🆓 Hugging Face API 설정 가이드 (완전 무료!)

**완전 무료**로 AI 이미지 생성을 위한 Hugging Face API 설정 방법입니다.

## ✨ 왜 Hugging Face?

- ✅ **완전 무료** (크레딧 결제 불필요)
- ✅ **무제한 사용** (Rate limit만 있음)
- ✅ **고품질** (FLUX, Stable Diffusion 등)
- ✅ **간단한 설정** (5분이면 완료)

---

## 1️⃣ Hugging Face 계정 생성

### 방법 1: GitHub로 가입 (추천)
1. [https://huggingface.co](https://huggingface.co) 접속
2. **"Sign Up"** 클릭
3. **"Sign up with GitHub"** 선택
4. GitHub 인증 허용

### 방법 2: 이메일로 가입
1. [https://huggingface.co/join](https://huggingface.co/join) 접속
2. 이메일 주소 입력
3. 인증 이메일 확인

---

## 2️⃣ Access Token 생성

1. 로그인 후 우측 상단 **프로필 아이콘** 클릭
2. **Settings** 선택
3. 왼쪽 메뉴에서 **Access Tokens** 클릭
   - 또는 직접 이동: [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

4. **"New token"** 버튼 클릭

5. 토큰 설정:
   - **Name**: `logo-generator` (원하는 이름)
   - **Role**: **Read** 선택 (Write는 불필요)
   
6. **Generate token** 클릭

7. **생성된 토큰 복사** ⚠️ (한 번만 표시됩니다!)
   - 토큰 형식: `hf_xxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## 3️⃣ 환경 변수 설정

### 로컬 개발 환경

프로젝트 루트에 `.env.local` 파일 생성:

```env
HUGGINGFACE_API_TOKEN=hf_여기에_복사한_토큰_붙여넣기
```

### Vercel 배포 환경

1. Vercel 대시보드 → 프로젝트 선택
2. **Settings** 탭
3. **Environment Variables** 메뉴
4. **Add New** 클릭
5. 다음 정보 입력:
   - **Name**: `HUGGINGFACE_API_TOKEN`
   - **Value**: `hf_여기에_복사한_토큰`
   - **Environment**: Production, Preview, Development (모두 선택)
6. **Save**
7. **Redeploy** (재배포 필수!)

---

## 4️⃣ 서버 재시작

환경 변수를 추가한 후 개발 서버를 재시작하세요:

```powershell
# Ctrl+C로 서버 중지
npm run dev
```

---

## 5️⃣ 테스트

1. 브라우저에서 http://localhost:3000 접속
2. "AI 생성" 탭 클릭
3. 프롬프트 입력:
   ```
   minimalist coffee cup logo, simple, clean
   ```
4. "AI로 생성하기" 클릭
5. **처음에는 모델 로딩에 20-30초 소요됩니다** (기다려주세요!)
6. 이후에는 10-15초 내에 생성됩니다 ✨

---

## 💡 사용 팁

### 첫 번째 생성이 느린 이유
- Hugging Face는 모델을 **Cold Start** 방식으로 로드합니다
- 처음 요청 시 모델을 메모리에 로드하는 시간이 필요 (20-30초)
- 이후 요청은 훨씬 빠릅니다 (10-15초)

### 503 에러가 발생하면?
```
Model is currently loading
```
- 모델이 아직 로딩 중입니다
- **1-2분 후 다시 시도**하면 됩니다
- 자동으로 Stable Diffusion으로 대체됩니다

### Rate Limit
- 분당 약 60-100 요청 가능
- 일반 사용에는 충분합니다
- 제한에 도달하면 1분 후 다시 시도

---

## 🎨 프롬프트 작성 팁

**좋은 프롬프트:**
```
minimalist coffee cup logo, simple line art, clean
modern tech startup icon, geometric, blue
cute cat mascot, cartoon style, friendly
mountain logo, abstract, minimalist
```

**피해야 할 프롬프트:**
```
❌ logo (너무 모호함)
❌ make it professional (구체적이지 않음)
❌ 한글 프롬프트 (영어 사용 권장)
```

---

## ❓ 자주 묻는 질문

**Q: 정말 완전 무료인가요?**
A: ✅ 네! 크레딧 결제가 전혀 필요 없습니다.

**Q: 얼마나 사용할 수 있나요?**
A: Rate limit 내에서 무제한 사용 가능합니다.

**Q: 토큰을 잃어버렸어요!**
A: 새로 만들면 됩니다. 기존 토큰 삭제 후 재생성하세요.

**Q: 생성 속도가 느려요**
A: 
- 첫 생성: 20-30초 (모델 로딩)
- 이후 생성: 10-15초
- Replicate보다는 느리지만 **무료**입니다!

**Q: 품질이 괜찮나요?**
A: ✅ 네! FLUX 모델을 사용하므로 고품질입니다.

---

## 🚀 빠른 시작 (PowerShell)

```powershell
# 1. Hugging Face 토큰 발급
# → https://huggingface.co/settings/tokens

# 2. .env.local 파일 생성
@"
HUGGINGFACE_API_TOKEN=hf_여기에_토큰_붙여넣기
"@ | Out-File -FilePath .env.local -Encoding UTF8

# 3. 서버 재시작
npm run dev

# 4. http://localhost:3000 접속 후 테스트!
```

---

## 🎉 완료!

이제 **완전 무료**로 AI 로고를 생성할 수 있습니다!

문제가 있으면 에러 메시지를 확인하거나 이슈를 남겨주세요. 📝

