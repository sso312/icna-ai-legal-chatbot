# ICNA AI 법률 챗봇 백엔드 추출본

이 저장소는 아래 역할과 직접 관련된 백엔드 파일만 남기도록 정리한 버전입니다.

- HyperClova X REST API 연동
- 법률 및 판례 데이터를 기반으로 한 AI 응답 흐름 구성
- 사용자 질문 기반 후속 질문 자동 생성
- MongoDB 기반 채팅 내역 저장 및 조회
- 백엔드 API 설계 및 데이터 흐름 관리

## 남아 있는 구조

- `backend/app.js`: Express 서버 진입점
- `backend/routes/`: 채팅, 세션, 요약, HyperClova, 법률, 판례, Q&A API 라우트
- `backend/models/`: 채팅, 세션, 요약 데이터용 MongoDB 모델
- `backend/utils/`: HyperClova 요약 헬퍼와 법률/판례 데이터 적재 스크립트
- `backend/insert.js`, `backend/insert2.js`: Q&A 데이터 적재 및 정리 스크립트

## 정리된 범위

- 프론트엔드 코드는 제거됨
- 회원가입/로그인용 인증 전용 라우트와 컨트롤러는 제거됨
- 프로필 보호 라우트는 제거됨
- 생성된 `node_modules`는 제거됨
