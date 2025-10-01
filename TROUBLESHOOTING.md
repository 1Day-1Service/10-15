# 🔧 문제 해결 가이드

AI 로고 생성기 사용 중 발생할 수 있는 문제들과 해결 방법입니다.

## 🚨 자주 발생하는 에러

### 1. 403 권한 에러
```
Error: This authentication method does not have sufficient permissions
```

**원인**: Fine-grained 토큰 또는 권한 부족

**해결 방법**:
1. [Hugging Face Tokens](https://huggingface.co/settings/tokens) 이동
2. 기존 토큰 삭제
3. **"New token"** → **"Read (Classic)"** 선택 ⚠️
4. `.env.local` 업데이트
5. 서버 재시작

### 2. 503 모델 로딩 에러
```
Model is currently loading
```

**원인**: 모델이 Cold Start 상태

**해결 방법**:
- 1-2분 기다린 후 다시 시도
- 자동으로 Stable Diffusion으로 대체됩니다

### 3. API 토큰 설정 에러
```
HUGGINGFACE_API_TOKEN is not set
```

**해결 방법**:
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 파일 내용:
   ```env
   HUGGINGFACE_API_TOKEN=hf_your_token_here
   ```
3. 서버 재시작 (`npm run dev`)

### 4. 생성 속도가 너무 느림

**원인**: 첫 번째 요청 시 모델 로딩

**정상 속도**:
- 첫 생성: 20-30초 (모델 로딩)
- 이후 생성: 10-15초

**개선 방법**:
- 인내심을 가지고 기다리기
- 브라우저 새로고침 하지 말기

### 5. 이미지가 생성되지 않음

**체크리스트**:
- [ ] 토큰이 `hf_`로 시작하는가?
- [ ] Classic Read 토큰인가?
- [ ] `.env.local` 파일 위치가 올바른가?
- [ ] 서버를 재시작했는가?
- [ ] 인터넷 연결이 정상인가?

## 🔍 디버깅 방법

### 1. 브라우저 콘솔 확인
1. F12 → Console 탭
2. 에러 메시지 확인
3. 네트워크 탭에서 API 요청 상태 확인

### 2. 서버 로그 확인
터미널에서 에러 메시지 확인:
```
AI generation error: Error: ...
```

### 3. 환경 변수 확인
```powershell
# PowerShell에서 확인
Get-Content .env.local
```

## 💡 성능 최적화 팁

### 1. 좋은 프롬프트 작성
```
✅ "minimalist coffee cup logo, simple line art, clean"
✅ "modern tech startup icon, geometric, blue"
❌ "logo" (너무 모호함)
❌ "한글 프롬프트" (영어 사용 권장)
```

### 2. 적절한 기대치 설정
- Hugging Face는 무료이지만 Replicate보다 느림
- 첫 생성은 항상 오래 걸림 (정상)
- Rate limit 존재 (분당 ~60 요청)

## 🆘 그래도 안 되면?

### 1. 토큰 재생성
1. 모든 기존 토큰 삭제
2. Classic Read 토큰 새로 생성
3. `.env.local` 업데이트
4. 서버 완전 재시작

### 2. 대안 API 사용
- OpenAI DALL-E 3 (유료, 고품질)
- Stable Diffusion API
- 다른 Hugging Face 모델

### 3. 이슈 리포트
GitHub Issues에 다음 정보와 함께 문제 보고:
- 에러 메시지 전문
- 사용한 프롬프트
- 브라우저 및 OS 정보
- 토큰 타입 (Classic/Fine-grained)

---

## 📞 빠른 해결 체크리스트

문제 발생 시 순서대로 확인:

1. [ ] Classic Read 토큰 사용 중인가?
2. [ ] `.env.local` 파일이 올바른 위치에 있는가?
3. [ ] 서버를 재시작했는가?
4. [ ] 20-30초 충분히 기다렸는가?
5. [ ] 브라우저 콘솔에 에러가 있는가?

**5개 모두 확인했는데도 안 되면 이슈를 남겨주세요!** 🙋‍♂️

---

**대부분의 문제는 토큰 타입(Classic vs Fine-grained) 때문입니다!**
