<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Download, FileQuestion, Fullscreen } from 'lucide-vue-next'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { downloadImage, makeFetch } from '@/lib/utils'
import ExecuteTask from '@/components/tasks/ExecuteTask.vue'

interface TaskDetails {
  id: string
  name: string
  description: string
  assignedTo: string
  imageCount: number
  images: {
    id: string
    etag: string
    path: string
  }[]
}

const taskDetails = ref<TaskDetails>()
const isLoading = ref(true)

const API_URL = import.meta.env['VITE_API_URL']

const breadcrumbThumb = inject<{ value: string }>('breadcrumbThumb')
const route = useRoute()

onMounted(async () => {
  taskDetails.value = await makeFetch(`/tasks/${route.params.id}`, { loadingState: isLoading })
  if (taskDetails.value?.name) breadcrumbThumb!.value = taskDetails.value.name
})

onUnmounted(() => {
  breadcrumbThumb!.value = ''
})
</script>

<template>
  <main class="flex max-w-screen-xl flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="animate-fade-in" v-if="isLoading">
      <Skeleton class="h-16 max-w-48 rounded-md" />
      <Skeleton class="mt-6 h-40 rounded-md" />
    </div>
    <template v-else-if="taskDetails">
      <div class="flex justify-between">
        <div>
          <h1 class="text-lg font-semibold md:text-2xl">
            Task: <span>{{ taskDetails && taskDetails.name }}</span>
          </h1>
          <p class="mt-1.5 text-muted-foreground">
            Task ID: <span>{{ taskDetails && taskDetails.id }}</span>
          </p>
        </div>
        <ExecuteTask :task-id="taskDetails.id" />
      </div>
      <div class="ml-0 min-w-96 space-y-4 px-0">
        <div class="grid grid-cols-4 items-start gap-4">
          <Card class="col-span-4 self-stretch lg:col-span-2">
            <CardHeader class="pb-2">
              <CardTitle class="text-xl">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">{{ taskDetails.description }}</p>
            </CardContent>
          </Card>
          <Card class="col-span-2 pb-2 lg:col-span-1">
            <CardHeader class="pb-2">
              <CardDescription>Assigned To</CardDescription>
            </CardHeader>
            <CardContent>
              <CardTitle class="text-2xl">{{ taskDetails.assignedTo }}</CardTitle>
            </CardContent>
          </Card>
          <Card class="col-span-2 pb-2 lg:col-span-1">
            <CardHeader class="pb-2">
              <CardDescription>Related Images</CardDescription>
            </CardHeader>
            <CardContent>
              <CardTitle class="text-2xl">{{ taskDetails.imageCount }}</CardTitle>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader class="flex flex-row items-center">
            <div class="grid gap-2">
              <CardTitle class="text-xl">Images</CardTitle>
              <CardDescription>
                <span>{{ taskDetails.imageCount }}</span> related images
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent class="flex flex-wrap gap-4">
            <template v-if="taskDetails.images.length > 0">
              <div v-for="image in taskDetails.images" :key="image.id">
                <Sheet>
                  <SheetTrigger class="relative">
                    <div
                      class="absolute inset-0 flex items-center justify-center rounded-md opacity-0 backdrop-brightness-50 transition-opacity hover:opacity-100"
                    >
                      <Fullscreen class="size-6 text-white" />
                    </div>
                    <img
                      class="size-32 rounded-md"
                      :src="`${API_URL}/images/${image.id}`"
                      :alt="`Image ${image.id}`"
                    />
                  </SheetTrigger>
                  <SheetContent side="right" class="flex flex-col">
                    <SheetHeader>
                      <SheetTitle> Image Preview </SheetTitle>
                    </SheetHeader>
                    <div class="grow">
                      <img
                        class="w-full rounded-md"
                        :src="`${API_URL}/images/${image.id}`"
                        :alt="`Image ${image.id}`"
                      />
                      <Table class="mt-4 rounded-md">
                        <TableBody>
                          <TableRow>
                            <TableCell class="px-0 font-medium">ID</TableCell>
                            <TableCell class="pr-0">{{ image.id }}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell class="px-0 font-medium">ETag</TableCell>
                            <TableCell class="pr-0">{{ image.etag }}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell class="px-0 font-medium">Path</TableCell>
                            <TableCell class="pr-0">{{ image.path }}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell class="px-0 font-medium">From</TableCell>
                            <TableCell class="pr-0">{{ taskDetails.assignedTo }}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <SheetFooter>
                      <SheetClose as-child>
                        <Button variant="outline"> Close </Button>
                      </SheetClose>
                      <Button @click="downloadImage(image.id)">
                        <Download class="mr-1.5 inline size-4" /> Download
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </template>
            <p v-else class="mx-auto my-6 text-sm text-muted-foreground">
              This task has not captured any images yet.
            </p>
          </CardContent>
        </Card>
      </div>
    </template>
    <template v-else>
      <div
        class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      >
        <div class="flex flex-col items-center gap-1 text-center">
          <FileQuestion class="size-12" />
          <h3 class="text-2xl font-bold tracking-tight">Task not found</h3>
          <p class="text-sm text-muted-foreground">The task you are looking for does not exist.</p>
        </div>
      </div>
    </template>
  </main>
</template>
