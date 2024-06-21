<script setup lang="ts">
import { computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Home } from 'lucide-vue-next'

const breadcrumbThumb = inject<{ value: string }>('breadcrumbThumb')

const route = useRoute()

const routes = computed(() => {
  let pathArray = route.path.split('/')
  pathArray.shift()
  pathArray = pathArray.filter((path) => isNaN(Number(path)))

  return pathArray.map((path, index) => {
    return {
      name: path,
      path: '/' + pathArray.slice(0, index + 1).join('/')
    }
  })
})
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <Home class="size-4" />
        Dashboard
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem v-for="(route, index) in routes" :key="index">
        <BreadcrumbLink>
          <RouterLink :to="route.path">{{
            route.name.charAt(0).toUpperCase() + route.name.slice(1)
          }}</RouterLink>
        </BreadcrumbLink>
        <BreadcrumbSeparator v-if="index < routes.length - 1" />
      </BreadcrumbItem>
      <BreadcrumbSeparator v-if="breadcrumbThumb" />
      <BreadcrumbItem v-if="breadcrumbThumb">
        {{ breadcrumbThumb }}
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
