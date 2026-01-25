<template>
  <div class="w-full min-h-screen bg-gray-50 py-10">
    <!-- 탭 메뉴 -->
    <div class="flex gap-4 mb-10 w-full max-w-3xl mx-auto">
      <button
        v-for="(tab, i) in tabs"
        :key="i"
        @click="selectedTab = i"
        :class="[
          'flex-1 py-3 rounded-lg font-bold text-lg transition',
          selectedTab === i
            ? 'bg-indigo-600 text-white shadow'
            : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- 내용 영역 -->
    <div class="max-h-[70vh] overflow-y-auto w-full max-w-3xl bg-white rounded-xl shadow px-8 py-10 mx-auto">
      <!-- 1. 무료 법률 상담 -->
      <div v-if="selectedTab === 0">
        <h2 class="text-2xl font-bold text-blue-700 mb-4">무료 법률 상담</h2>
        <!-- 대한법률구조공단 -->
        <div class="mb-6">
          <span class="font-bold text-indigo-700">대한법률구조공단 상담</span>
          <div class="text-sm text-gray-700 mt-1 mb-2">
            <b>대상:</b> 누구나(특히 경제적 취약계층)<br>
            <b>상담방식:</b> 전화(국번없이 132), 온라인, 방문
          </div>
          <div class="bg-indigo-50 rounded-lg p-3 mb-2">
            <div class="font-semibold text-indigo-700 mb-1">상담 신청 방법</div>
            <ol class="list-decimal ml-5 text-gray-700 space-y-1">
              <li>대표전화 <b>132</b>로 상담 요청 <span class="text-xs text-gray-500 ml-2">(평일 09:00~18:00)</span></li>
              <li>또는 <a href="https://www.klac.or.kr/" target="_blank" class="text-indigo-500 underline hover:text-indigo-700">홈페이지</a>에서 온라인 상담 신청</li>
              <li>가까운 <b>법률구조공단 지부/출장소</b> 방문 후 대면 상담 가능</li>
              <li>상담 후 필요하면 소송구조/변호 지원까지 연계</li>
            </ol>
            <div class="mt-2 text-xs text-gray-500">
              ※ 경제적 취약계층(기초생활수급자 등)은 소송까지 무료 지원 가능
            </div>
          </div>
        </div>
    
        <!-- 특별상담(청소년 등) -->
        <div>
          <span class="font-bold text-indigo-700">특별상담(청소년/여성/노인 등)</span>
          <div class="text-sm text-gray-700 mt-1 mb-2">
            <b>대상:</b> 학교폭력, 가정폭력, 성범죄 등<br>
            <b>기관:</b> 여성가족부, 청소년상담복지센터 등
          </div>
          <div class="bg-indigo-50 rounded-lg p-3 mb-2">
            <div class="font-semibold text-indigo-700 mb-1">상담 신청 방법</div>
            <ol class="list-decimal ml-5 text-gray-700 space-y-1">
              <li>여성 긴급전화 <b>1366</b>, 청소년 전화 <b>1388</b> 등으로 즉시 상담</li>
              <li>관련 기관 홈페이지(여성가족부, 청소년상담복지센터)에서 온라인 상담 신청</li>
              <li>필요시 전문 상담사/변호사 연계 지원</li>
            </ol>
            <div class="mt-2 text-xs text-gray-500">
              ※ 각 기관별 상담시간·방식 확인 필요
            </div>
          </div>
        </div>
      </div>

      <!-- 2. 국가 지원 변호사 -->
      <div v-else-if="selectedTab === 1">
        <h2 class="text-2xl font-bold text-blue-700 mb-4">국가 지원 변호사</h2>
        <div class="mb-6">
          <span class="font-bold text-indigo-700">국선변호인</span>
          <div class="text-sm text-gray-700 mt-1 mb-2">
            <b>대상:</b> 형사사건 피고인<br>
            <b>특징:</b> 법원이 선정, 수임료 국가 부담, 본인 비용 無
          </div>
          <div class="bg-indigo-50 rounded-lg p-3 mb-2">
            <div class="font-semibold text-indigo-700 mb-1">신청 방법</div>
            <ol class="list-decimal ml-5 text-gray-700 space-y-1">
              <li>재판 관할 <b>법원 민원실(접수과/형사과)</b> 방문</li>
              <li><b>국선변호인 선정신청서</b> 작성 및 제출<br>

              </li>
              <li>신분증, (있으면) 경제적 사정 증빙자료 첨부</li>
              <li>법원 심사 후 선정 → 변호사 지정 (본인 비용 없음)</li>
            </ol>
            <div class="mt-2 text-xs text-gray-500">
              ※ 구속 중인 경우 교도소 담당 직원에게 요청해도 가능
            </div>
          </div>
        </div>
      </div>

      <!-- 3. 법률구조/구제 -->
      <div v-else-if="selectedTab === 2">
        <h2 class="text-2xl font-bold text-blue-700 mb-4">법률구조/구제</h2>
    
        <!-- 노동자 권리구제 -->
        <div class="mb-6">
          <span class="font-bold text-indigo-700">노동자 권리구제</span>
          <div class="text-sm text-gray-700 mt-1 mb-2">
            <b>대상:</b> 임금체불, 부당해고 등<br>
            <b>기관:</b> 고용노동부, 근로복지공단 등
          </div>
          <div class="bg-indigo-50 rounded-lg p-3 mb-2">
            <div class="font-semibold text-indigo-700 mb-1">권리구제 신청 방법</div>
            <ol class="list-decimal ml-5 text-gray-700 space-y-1">
              <li>고용노동부 <b>임금체불 상담센터 1350</b> 전화</li>
              <li><a href="https://www.moel.go.kr/" target="_blank" class="text-indigo-500 underline hover:text-indigo-700">홈페이지</a>에서 온라인 신고</li>
              <li>상담/신고 후 사건 접수 → 구제·조정 절차 진행</li>
            </ol>
          </div>
        </div>
        <!-- 기타 구제제도 -->
        <div>
          <span class="font-bold text-indigo-700">기타 구제제도</span>
          <div class="text-sm text-gray-700 mt-1 mb-2">
            <b>가사, 상속, 소비자 등 생활분쟁</b>에 법률구조공단, 소비자원 등 다양한 기관이 지원
          </div>
          <div class="bg-indigo-50 rounded-lg p-3 mb-2">
            <div class="font-semibold text-indigo-700 mb-1">신청 방법</div>
            <ol class="list-decimal ml-5 text-gray-700 space-y-1">
              <li><a href="https://www.klac.or.kr/" target="_blank" class="text-indigo-500 underline hover:text-indigo-700">법률구조공단 홈페이지</a> 또는 <a href="https://www.kca.go.kr/" target="_blank" class="text-indigo-500 underline hover:text-indigo-700">소비자원</a> 등 해당 기관에서 온라인/전화/방문 접수</li>
              <li>상담 후 절차 안내, 필요시 소송구조·조정 연계</li>
            </ol>
          </div>
        </div>
      </div>

      <!-- 4. 취약계층 지원 -->
      <div v-else-if="selectedTab === 3">
        <h2 class="text-2xl font-bold text-blue-700 mb-4">취약계층 지원</h2>
        <!-- 저소득층 지원 -->
        <div class="mb-6">
          <span class="font-bold text-indigo-700">저소득층 지원</span>
          <div class="text-sm text-gray-700 mt-1 mb-2">
            <b>대상:</b> 기초생활수급자, 차상위계층 등<br>
            <b>주요 기관:</b> 대한법률구조공단, 지자체 등
          </div>
          <div class="bg-indigo-50 rounded-lg p-3 mb-2">
            <div class="font-semibold text-indigo-700 mb-1">지원 신청 방법</div>
            <ol class="list-decimal ml-5 text-gray-700 space-y-1">
              <li><a href="https://www.klac.or.kr/" target="_blank" class="text-indigo-500 underline hover:text-indigo-700">홈페이지</a> 또는 인근 지부 방문</li>
              <li>수급자증명서 등 <b>자격서류</b> 지참</li>
              <li>상담 및 지원 범위 안내(무료 법률상담/소송 가능)</li>
            </ol>
          </div>
        </div>
        <!-- 외국인 지원 -->
        <div class="mb-6">
          <span class="font-bold text-indigo-700">외국인 지원</span>
          <div class="text-sm text-gray-700 mt-1 mb-2">
            <b>대상:</b> 국내 거주 외국인<br>
            <b>기관:</b> 대한법률구조공단, 이주민센터 등
          </div>
          <div class="bg-indigo-50 rounded-lg p-3 mb-2">
            <div class="font-semibold text-indigo-700 mb-1">지원 신청 방법</div>
            <ol class="list-decimal ml-5 text-gray-700 space-y-1">
              <li><a href="https://www.klac.or.kr/" target="_blank" class="text-indigo-500 underline hover:text-indigo-700">법률구조공단 홈페이지</a>의 외국인 상담 서비스</li>
              <li>다국어 통역·상담 가능, 필요시 소송 지원 연계</li>
            </ol>
          </div>
        </div>
        <!-- 피해자 지원 -->
        <div>
          <span class="font-bold text-indigo-700">피해자 지원</span>
          <div class="text-sm text-gray-700 mt-1 mb-2">
            <b>대상:</b> 범죄, 폭력, 학대 피해자 등<br>
            <b>주요 기관:</b> 범죄피해자지원센터, 법률구조공단 등
          </div>
          <div class="bg-indigo-50 rounded-lg p-3 mb-2">
            <div class="font-semibold text-indigo-700 mb-1">지원 신청 방법</div>
            <ol class="list-decimal ml-5 text-gray-700 space-y-1">
              <li><a href="https://www.spo.go.kr/site/spo/main.do" target="_blank" class="text-indigo-500 underline hover:text-indigo-800 font-bold">검찰청 범죄피해자지원센터</a> 등에서 온라인/방문 신청</li>
              <li>필요시 심리상담, 법률상담, 보호 지원 등 연계</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tabs = [
  { label: '무료 법률 상담' },
  { label: '국가 지원 변호사' },
  { label: '법률구조/구제' },
  { label: '취약계층 지원' }
]
const selectedTab = ref(0)
</script>
