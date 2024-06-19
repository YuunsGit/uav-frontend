<script setup lang="ts">
import { ref, computed, type Component } from 'vue'
import SideBar from '@/components/Sidebar.vue'
import DashBoard from '@/components/Dashboard.vue'
import Drones from '@/components/Drones.vue'
import Tasks from '@/components/Tasks.vue'
import NotFound from '@/components/NotFound.vue'

const routes: { [key: string]: Component } = {
  '/drones': Drones,
  '/tasks': Tasks
}

const notFound = ref(false)
const currentPath = ref(window.location.pathname)

if (window.location.pathname === '/') window.location.href = '/drones'
if (!routes[window.location.pathname]) notFound.value = true

window.addEventListener('navigate', () => {
  currentPath.value = window.location.pathname
})

const currentView = computed(() => {
  return routes[currentPath.value]
})
</script>

<template>
  <NotFound v-if="notFound" />
  <div v-else class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <SideBar />
    <DashBoard :tab="currentView" />
  </div>
</template>
