<template>
  <div class="h-screen overflow-y-auto">
    <div class="flex flex-col items-center justify-center p-10 bg-gradient-to-br from-white to-indigo-50 text-center min-h-screen">
      <h1 class="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
        법률 상담을 <span class="text-indigo-600">더 빠르고 정확하게</span>
      </h1>
      <p class="text-lg text-gray-700 max-w-3xl mb-10">
        정보통신망법 특화 AI 챗봇, ICNA와 함께 간편하게 법령과 판례를 찾아보세요.
      </p>
      <NuxtLink to="/chat" class="px-8 py-4 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition text-lg">
        챗봇 시작하기 →
      </NuxtLink>
    </div>

    <!-- 주요 기능 소개 -->
    <div class="px-8 mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
      <div class="bg-white rounded-xl shadow p-6">
        <h3 class="text-xl font-semibold text-indigo-600 mb-2">빠른 법령 검색</h3>
        <p class="text-gray-600">
          ICNA는 수시로 개정되는 정보통신망법 및 사이버 범죄 관련 법률을 자동으로 반영하여 최신 법률 정보를 실시간으로 제공합니다.
          복잡한 용어 없이 누구나 쉽게 이해할 수 있게 설명해주며, 실생활에 바로 적용할 수 있도록 돕습니다.
        </p>
      </div>
      <div class="bg-white rounded-xl shadow p-6">
        <h3 class="text-xl font-semibold text-indigo-600 mb-2">판례 열람 지원</h3>
        <p class="text-gray-600">
          사이버 명예훼손, 개인정보 유출, 불법 정보 게시 등 이슈 중심의 실제 판례를 안내합니다.
          최근 사회적 논란과 연관된 판례도 쉽게 풀어 설명하여 이해를 도와드립니다.
        </p>
      </div>
      <div class="bg-white rounded-xl shadow p-6">
        <h3 class="text-xl font-semibold text-indigo-600 mb-2">질문 기반 상담</h3>
        <p class="text-gray-600">
          사용자의 질문에 대해 유사 판례와 법령을 바탕으로 신뢰도 높은 답변을 제공합니다.
          비전문가도 이해할 수 있도록 법률 용어를 쉽게 풀어 상담하며, 언제 어디서나 무료로 이용 가능합니다.
        </p>
      </div>
    </div>

    <!-- 개발환경 섹션 -->
    <div class="mt-32 w-full max-w-6xl mx-auto px-8 text-left">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">⚙️ 개발 환경</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div class="flex flex-col items-center">
          <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nuxtjs/nuxtjs-original.svg" class="w-12 h-12 mb-2" alt="Nuxt" />
          <span class="text-sm text-gray-700">Nuxt 3</span>
        </div>
        <div class="flex flex-col items-center">
          <img src="https://gdsc-university-of-seoul.github.io/assets/images/post-Tailwind-CSS/Tailwind-icon.png" class="w-12 h-12 mb-2" alt="Tailwind" />
          <span class="text-sm text-gray-700">Tailwind CSS</span>
        </div>
        <div class="flex flex-col items-center">
          <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" class="w-12 h-12 mb-2" alt="Node.js" />
          <span class="text-sm text-gray-700">Node.js</span>
        </div>
        <div class="flex flex-col items-center">
          <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" class="w-12 h-12 mb-2" alt="MongoDB" />
          <span class="text-sm text-gray-700">MongoDB</span>
        </div>
      </div>
    </div>

    <!-- 팀 소개 섹션 -->
    <div class="mt-32 w-full max-w-6xl mx-auto px-8 text-left pb-40">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">👨‍💻 개발팀 소개</h2>
      <p class="text-gray-700 mb-6">ICNA 프로젝트는 협성대학교 소프트웨어공학과 졸업작품 4조의 작품입니다.</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-xl shadow p-4">
          <h3 class="text-lg font-semibold text-indigo-700">정희성</h3>
          <p class="text-sm text-gray-600">백엔드 & 프론트<br />Express, Nuxt 3, UI/UX 구성</p>
        </div>
        <div class="bg-white rounded-xl shadow p-4">
          <h3 class="text-lg font-semibold text-indigo-700">박소현</h3>
          <p class="text-sm text-gray-600">AI 튜닝 담당, API 설계 담당<br />HyperClova, MongoDB</p>
        </div>
        <div class="bg-white rounded-xl shadow p-4">
          <h3 class="text-lg font-semibold text-indigo-700">박성아</h3>
          <p class="text-sm text-gray-600">테스트 및 데이터 검수<br />판례 수집, 데이터셋 작성, 시나리오 QA</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Home landing content only
</script>