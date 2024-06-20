<script setup lang="ts" generic="TData, TValue">
import {
  type ColumnFiltersState,
  FlexRender,
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
import { ChevronDown, ChevronUp, Search } from 'lucide-vue-next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'

const droneList = ref<Drone[]>([])
const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])

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
    console.error('There was a problem with the fetch operation:', error)
    return []
  }
}

onMounted(async () => {
  droneList.value = await fetchDrones()
})
</script>

<template>
  <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="flex items-center gap-6">
      <h1 class="text-lg font-semibold md:text-2xl">Drones</h1>
      <div v-if="droneList" class="flex w-full">
        <form class="relative ml-auto w-full md:w-2/3 lg:w-1/3">
          <Search aria-hidden="true" class="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search drones"
            class="w-full appearance-none bg-background pl-8 shadow-none"
            :model-value="table.getColumn('name')?.getFilterValue() as string"
            @update:model-value="table.getColumn('name')?.setFilterValue($event)"
          />
        </form>
      </div>
    </div>
    <div
      v-if="!droneList"
      class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
    >
      <div class="flex flex-col items-center gap-1 text-center">
        <h3 class="text-2xl font-bold tracking-tight">You have no drones</h3>
        <p class="text-sm text-muted-foreground">There are no drones available in the system.</p>
      </div>
    </div>
    <div v-else class="container px-0">
      <div class="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
              <TableHead v-for="header in headerGroup.headers" :key="header.id">
                <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
                <div
                  v-if="header.column.getCanSort()"
                  class="ml-1 inline-block size-4 align-middle"
                >
                  <component
                    class="size-4"
                    :is="
                      { asc: ChevronUp, desc: ChevronDown }[header.column.getIsSorted() as string]
                    "
                  />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-if="table.getRowModel().rows?.length">
              <TableRow
                v-for="row in table.getRowModel().rows"
                :key="row.id"
                :data-state="row.getIsSelected() ? 'selected' : undefined"
              >
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                </TableCell>
              </TableRow>
            </template>
            <template v-else>
              <TableRow>
                <TableCell :colspan="columns.length" class="h-24 text-center">
                  No drones.
                </TableCell>
              </TableRow>
            </template>
          </TableBody>
        </Table>
      </div>
    </div>
  </main>
</template>
