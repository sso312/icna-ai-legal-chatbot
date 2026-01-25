<template>
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">커뮤니티</h1>
      <CommunityPostForm />
      <CommunityPostList />
    </div>
  </template>
  
  <script setup lang="ts">
  import CommunityPostForm from '~/components/CommunityPostForm.vue'
  import CommunityPostList from '~/components/CommunityPostList.vue'
  </script>
  