<template>
  <!-- assets 폴더에 kakao-login.png 라는 로그인 버튼 이미지를 두었다고 가정 -->
  <img
    src="~/assets/img/kakao_login_medium_narrow.png"
    alt="카카오 로그인"
    class="cursor-pointer"
    @click="redirectToKakao"
  />
</template>

<script setup lang="ts">
// 카카오 인증 URL 전체
const kakaoAuthUrl = 'https://kauth.kakao.com/oauth/authorize' +
  '?response_type=code' +
  '&client_id=369995c7c89ced66a987eebc8577e2ea' +
  '&redirect_uri=http://localhost:5050/auth/kakao/callback'

function redirectToKakao() {
  // 외부 페이지로 이동
  window.location.href = kakaoAuthUrl
}
</script>
<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>