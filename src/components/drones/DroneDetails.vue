<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Download, Fullscreen } from 'lucide-vue-next'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@/components/ui/table'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { downloadImage } from '@/lib/utils'

interface DroneDetails {
  id: string
  name: string
  taskCount: number
  imagesCaptured: number
  tasks: {
    id: string
    name: string
    images: {
      id: string
      etag: string
      path: string
    }[]
  }[]
}

const droneDetails = ref<DroneDetails>()
const isLoading = ref(true)

const router = useRouter()

const tasksWithImages = computed(() =>
  droneDetails.value?.tasks.filter((task) => task.images.length > 0)
)

const breadcrumbThumb = inject<{ value: string }>('breadcrumbThumb')
const route = useRoute()

const API_URL = import.meta.env['VITE_API_URL']

async function fetchDroneDetails() {
  try {
    const response = await fetch(`${import.meta.env['VITE_API_URL']}/drones/${route.params.id}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    return {}
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  droneDetails.value = await fetchDroneDetails()
  if (droneDetails.value?.name) breadcrumbThumb!.value = droneDetails.value.name
})

onUnmounted(() => {
  breadcrumbThumb!.value = ''
})
</script>

<template>
  <main class="flex max-w-screen-xl flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div>
      <h1 class="text-lg font-semibold md:text-2xl">
        Drone: <span>{{ droneDetails && droneDetails.name }}</span>
      </h1>
      <p class="mt-1.5 text-muted-foreground">
        Drone ID: <span>{{ droneDetails && droneDetails.id }}</span>
      </p>
    </div>
    <div class="ml-0 min-w-96 px-0">
      <Skeleton v-if="isLoading" class="h-40 w-full rounded-md opacity-40" />
      <div class="grid grid-cols-2 gap-4" v-else-if="droneDetails">
        <div>
          <div class="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader class="pb-2">
                <CardDescription>Assigned Tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <CardTitle class="text-2xl">{{ droneDetails.taskCount }}</CardTitle>
              </CardContent>
            </Card>
            <Card>
              <CardHeader class="pb-2">
                <CardDescription>Images Captured</CardDescription>
              </CardHeader>
              <CardContent>
                <CardTitle class="text-2xl">{{ droneDetails.imagesCaptured }}</CardTitle>
              </CardContent>
            </Card>
          </div>
          <Card class="mt-4">
            <CardHeader class="flex flex-row items-center">
              <div class="grid gap-2">
                <CardTitle class="text-xl">Assigned Tasks</CardTitle>
                <CardDescription>
                  <span>{{ droneDetails.taskCount }}</span> tasks assigned
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table class="rounded-md" v-if="droneDetails.tasks.length > 0">
                <TableHeader>
                  <TableRow>
                    <TableHead class="w-[100px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Images</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow
                    v-for="task in droneDetails.tasks"
                    :key="task.id"
                    class="cursor-pointer"
                    @click="task.id && router.push(`/tasks/${task.id}`)"
                  >
                    <TableCell>{{ task.id }}</TableCell>
                    <TableCell>{{ task.name }}</TableCell>
                    <TableCell>{{ task.images.length }}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p v-else class="my-6 text-center text-sm text-muted-foreground">
                This drone has no assigned tasks.
              </p>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader class="flex flex-row items-center">
              <div class="grid gap-2">
                <CardTitle class="text-xl">Images Captured</CardTitle>
                <CardDescription>
                  <span>{{ droneDetails.imagesCaptured }}</span> images captured
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <template v-if="tasksWithImages?.length && tasksWithImages?.length > 0">
                <Card v-for="task in tasksWithImages" :key="task.id">
                  <CardHeader>
                    <CardDescription>
                      <span>{{ task.images.length }}</span> images related to task:
                    </CardDescription>
                    <CardTitle class="text-lg">{{ task.name }}</CardTitle>
                  </CardHeader>
                  <CardContent class="flex flex-wrap gap-4">
                    <div v-for="image in task.images" :key="image.id">
                      <Sheet>
                        <SheetTrigger class="relative">
                          <div
                            class="absolute inset-0 flex items-center justify-center rounded-md opacity-0 backdrop-brightness-50 transition-opacity hover:opacity-100"
                          >
                            <Fullscreen class="size-6 text-white" />
                          </div>
                          <img
                            class="size-28 rounded-md"
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
                  </CardContent>
                </Card>
              </template>
              <p v-else class="my-6 text-center text-sm text-muted-foreground">
                This drone has not captured any images yet.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </main>
</template>
