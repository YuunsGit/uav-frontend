<script setup lang="ts" generic="TData">
import { columns } from '@/components/drones/columns'
import { FlexRender, type Table as TableType } from '@tanstack/vue-table'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useRouter } from 'vue-router'

defineProps<{
  table: TableType<TData>
  path: string
}>()

const router = useRouter()
</script>

<template>
  <div class="rounded-md border">
    <Table>
      <TableHeader class="bg-muted/40">
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
            <div v-if="header.column.getCanSort()" class="ml-1 inline-block size-4 align-middle">
              <component
                class="size-4"
                :is="{ asc: ChevronUp, desc: ChevronDown }[header.column.getIsSorted() as string]"
              />
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            class="cursor-pointer"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
            @click="
              (row.original as any)?.id && router.push(`/${path}/${(row.original as any).id}`)
            "
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-4 text-center"> No result. </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
