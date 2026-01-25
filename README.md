# ICNA  
### Information & Communication Network Act ⚖️💬

ICNA는 **정보통신망법 및 사이버 범죄 관련 법률**을 기반으로  
사용자에게 실질적인 법률 정보를 제공하는 **AI 법률 상담 챗봇 서비스**입니다.

사용자가 겪는 사이버 범죄 및 일상적인 법률 문제를 입력하면,  
관련 법령과 유사 판례를 바탕으로 한 답변과 **후속 질문**을 제공하여  
초기 법적 대응을 돕는 것을 목표로 합니다.

---

## 📌 Project Overview

- 정보통신망법 및 사이버 범죄 특화 AI 법률 상담 서비스  
- 법령·판례 데이터 기반 AI 응답 제공  
- 상담 흐름을 확장하는 후속 질문 자동 생성  
- 사용자별 채팅 기록 저장 및 조회 기능 제공  

---

## ✨ Key Features

- HyperClova X (HCX-003) REST API 기반 AI 법률 상담  
- 법령 및 판례 데이터를 활용한 응답 생성  
- 사용자 질문에 따른 **추가 질문 자동 생성**  
- MongoDB 기반 **사용자별 채팅 이력 저장**  
- REST API 기반 백엔드 서버 구성  

---

## 👥 Team Roles

| 구분 | 역할 |
|------|------|
| **🙋‍♀️ My Role** <br/>(Backend / AI Integration) | - HyperClova X (HCX-003) REST API 연동<br/>- 법령·판례 데이터 기반 AI 응답 로직 구현<br/>- 사용자 질문에 따른 후속 질문 자동 생성 기능 구현<br/>- MongoDB 기반 채팅 기록 저장 및 조회 기능 구현<br/>- 백엔드 API 설계 및 데이터 흐름 관리 |
| **👨‍💼 Team Leader** | - 프로젝트 전체 기획 및 일정 관리<br/>- 서비스 기능 정의 및 요구사항 정리<br/>- 프론트엔드·백엔드 간 협업 조율<br/>- 프로젝트 방향성 관리 및 최종 산출물 통합 |
| **👥 Data Team Member** | - 사이버 범죄 관련 법령 및 판례 데이터 수집<br/>- 데이터 정제 및 구조화<br/>- AI 응답에 활용 가능한 형태로 데이터 요약·가공<br/>- 최신 개정 법률 및 판례 데이터 정리 |

---

## 🛠 Tech Stack

### Backend
- Node.js  
- Express.js  

### AI
- Naver HyperClova X (HCX-003) REST API  

### Database
- MongoDB  

### Frontend
- Vue.js  

---

## 📂 Repository Structure

backend/
├─ routes/
├─ controllers/
├─ services/
└─ app.js

icna_frontend_full/
└─ frontend source code


---

## 🚀 Getting Started

### Prerequisites

- Node.js  
- MongoDB (로컬 또는 원격 인스턴스 실행 필요)  
- Naver HyperClova X API Key  

---
## 🚀 Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-id/icna-ai-legal-chatbot.git
cd icna-ai-legal-chatbot
```

2️⃣ Backend Setup
```bash
cd backend
npm install
```

3️⃣ Frontend Setup
```bash
cd ../icna_frontend_full
npm install
```
---
⚙️ Environment Variables
HyperClova X API 사용을 위해 환경 변수를 설정해야 합니다.

방법 1: 환경 변수 직접 설정
```bash
export HYPERCLOVA_API_KEY=your_api_key
```
방법 2: .env 파일 사용
```bash
HYPERCLOVA_API_KEY=your_api_key
```
---
▶️ Running the Project
Backend Server
```bash
cd backend
node app.js
```
Frontend Server
```bash
cd icna_frontend_full
npm run dev
```

프론트엔드 개발 서버는 기본적으로 아래 주소에서 실행됩니다.

http://localhost:3000
