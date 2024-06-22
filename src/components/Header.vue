<script setup lang="ts">
import MobileSidebar from '@/components/MobileSidebar.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import ThemeSwitch from '@/components/ThemeSwitch.vue'
</script>

<template>
  <header
    class="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6"
  >
    <MobileSidebar />
    <Breadcrumb />
    <ThemeSwitch />
  </header>
</template>
