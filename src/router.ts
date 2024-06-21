import { createRouter, createWebHistory } from 'vue-router'
import DroneList from '@/components/drones/DroneList.vue'
import DroneDetails from '@/components/drones/DroneDetails.vue'
import TaskList from '@/components/tasks/TaskList.vue'
import TaskDetails from '@/components/tasks/TaskDetails.vue'

const routes = [
  { path: '/', redirect: '/drones' },
  { path: '/drones', component: DroneList },
  { path: '/tasks', component: TaskList },
  { path: '/drones/:id', component: DroneDetails, props: true },
  { path: '/tasks/:id', component: TaskDetails, props: true },
  { path: '/:notFound', redirect: '/drones' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
