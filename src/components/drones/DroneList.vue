<script setup lang="ts">
import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useVueTable
} from '@tanstack/vue-table'
import { onMounted, ref } from 'vue'
import { valueUpdater } from '@/lib/utils'
import type { Drone } from '@/components/drones/columns'
import { columns } from '@/components/drones/columns'
import { Search } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import DataTable from '@/components/DataTable.vue'

const droneList = ref<Drone[]>([])
const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const isLoading = ref(true)

const table = useVueTable({
  get data() {
    return droneList.value
  },
  get columns() {
    return columns
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    }
  }
})

async function fetchDrones(): Promise<Drone[]> {
  try {
    const response = await fetch(`${import.meta.env['VITE_API_URL']}/drones`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    return []
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  droneList.value = await fetchDrones()
})
</script>

<template>
  <main class="flex max-w-screen-xl flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="flex gap-6">
      <h1 class="text-lg font-semibold md:text-2xl">Drones</h1>
      <div v-if="droneList" class="flex w-full">
        <form class="relative ml-auto md:w-2/3 lg:w-1/3">
          <Search aria-hidden="true" class="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search drones"
            class="w-full appearance-none bg-muted/40 pl-8 shadow-none"
            :model-value="table.getColumn('name')?.getFilterValue() as string"
            @update:model-value="table.getColumn('name')?.setFilterValue($event)"
          />
        </form>
      </div>
    </div>
    <div
      v-if="droneList.length <= 0 && !isLoading"
      class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
    >
      <div class="flex flex-col items-center gap-1 text-center">
        <h3 class="text-2xl font-bold tracking-tight">You have no drones</h3>
        <p class="text-sm text-muted-foreground">There are no drones available in the system.</p>
      </div>
    </div>
    <div v-else class="ml-0 min-w-96 px-0">
      <Skeleton v-if="isLoading" class="h-40 w-full rounded-md opacity-40" />
      <DataTable v-else path="drones" :table="table" />
    </div>
  </main>
</template>
