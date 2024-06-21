import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'

export interface Drone {
  id: string
  name: string
  taskCount: number
  imagesCaptured: number
}

export const columns: ColumnDef<Drone>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', 'ID'),
    enableSorting: false
  },
  {
    accessorKey: 'name',
    header: (header) => h('button', { onClick: () => header.column.toggleSorting() }, 'Name')
  },
  {
    accessorKey: 'taskCount',
    header: (header) => h('button', { onClick: () => header.column.toggleSorting() }, 'Task Count')
  },
  {
    accessorKey: 'imagesCaptured',
    header: (header) =>
      h('button', { onClick: () => header.column.toggleSorting() }, 'Images Captured')
  }
]
