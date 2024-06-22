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
import { makeFetch, valueUpdater } from '@/lib/utils'
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

onMounted(async () => {
  droneList.value = await makeFetch('/drones', { loadingState: isLoading })
})
</script>

<template>
  <main class="flex max-w-screen-xl flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div v-if="isLoading" class="animate-fade-in">
      <div class="flex justify-between">
        <Skeleton class="h-10 w-48 rounded-md" />
        <Skeleton class="h-10 w-56 rounded-md" />
      </div>
      <Skeleton class="mt-6 h-40 rounded-md" />
    </div>
    <template v-else-if="droneList && droneList.length">
      <div class="flex gap-6">
        <h1 class="text-lg font-semibold md:text-2xl">Drones</h1>
        <div class="flex w-full">
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
      <div class="ml-0 min-w-96 px-0">
        <DataTable path="drones" :table="table" />
      </div>
    </template>
    <div
      v-else
      class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
    >
      <div class="flex flex-col items-center gap-1 text-center">
        <h3 class="text-2xl font-bold tracking-tight">You have no drones</h3>
        <p class="text-sm text-muted-foreground">There are no drones available in the system.</p>
      </div>
    </div>
  </main>
</template>
