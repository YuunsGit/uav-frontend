import { createRouter, createWebHistory } from 'vue-router'
import Drones from '@/components/drones/Drones.vue'
import Tasks from '@/components/Tasks.vue'

const routes = [
  { path: '/', redirect: '/drones' },
  { path: '/drones', component: Drones },
  { path: '/tasks', component: Tasks },
  { path: '/:notFound', redirect: '/drones' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
