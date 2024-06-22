<script setup lang="ts">
import SideBar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
import { provide, ref } from 'vue'
import { Toaster } from '@/components/ui/toast'

const breadcrumbThumb = ref('')
provide('breadcrumbThumb', breadcrumbThumb)
</script>

<template>
  <div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
    <SideBar />
    <div class="flex flex-col">
      <Header />
      <RouterView />
    </div>
  </div>
  <Toaster />
</template>
