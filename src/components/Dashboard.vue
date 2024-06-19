<script setup lang="ts">
import { type Component } from 'vue'
import MobileSideBar from '@/components/MobileSideBar.vue'

defineProps<{
  tab: Component
}>()
</script>

<template>
  <div class="flex flex-col">
    <MobileSideBar />
    <component :is="tab" />
    <!--    <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">Drones</h1>
      </div>
      <div
        class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      >
        <div class="flex flex-col items-center gap-1 text-center">
          <h3 class="text-2xl font-bold tracking-tight">You have no drones</h3>
          <p class="text-muted-foreground text-sm">
            You can start selling as soon as you add a product.
          </p>
          <Button class="mt-4"> Add Product </Button>
        </div>
      </div>
    </main>-->
  </div>
</template>
