# ICNA AI 법률 챗봇 포트폴리오 추출본

이 저장소는 ICNA 팀 프로젝트에서 제가 담당한 작업을 포트폴리오 용도로 정리해 둔 추출본입니다.

## 담당 역할

백엔드 / AI 연동

- HyperClova X REST API 연동
- 법률 및 판례 데이터를 기반으로 한 AI 응답 흐름 구성
- 사용자 질문 기반 후속 질문 자동 생성
- MongoDB 기반 채팅 내역 저장 및 조회
- 백엔드 API 설계 및 데이터 흐름 관리

## 포함 범위

이 저장소에는 제가 기여한 백엔드 및 AI 연동 영역만 남겨 두었습니다.
팀 단위로 관리되던 프론트엔드 코드, 공용 프로젝트 자산, 그리고 제 기여 범위와 무관한 구현은 제외했습니다.

## 주요 기능

- `POST /api/hyperclova/ask`
- `POST /api/hyperclova/generateFollowUpQuestions`
- `POST /chat/save`
- `POST /chat/history`
- `POST /chat/search-global`
- `POST /chat-sessions/session`
- `GET /chat-sessions/sessions`
- `DELETE /chat-sessions/session/:id`
- `PUT /chat-sessions/session/:id`
- `POST /summary/generate`
- `GET /law/:category`
- `GET /case/list`
- `GET /api/qa`

## 기술 스택

- Node.js
- Express
- MongoDB / Mongoose
- Naver HyperClova X
- 판례 요약 보조 기능용 OpenAI API

## 프로젝트 구조

```text
backend/
  app.js
  middleware/
  models/
  routes/
  utils/
```

## 환경 변수

필요한 환경 변수는 `backend/.env.example` 파일에서 확인할 수 있습니다.

## 참고 사항

- 이 저장소는 팀 프로젝트 전체 저장소가 아닙니다.
- 민감한 키 값은 모두 제거했으며, 환경 변수 자리표시자로 대체했습니다.
- 포트폴리오 정리 이전의 원본 전체 프로젝트는 로컬에 별도로 백업해 두었습니다.
