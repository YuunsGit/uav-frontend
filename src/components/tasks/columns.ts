import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'

export interface Task {
  id: string
  name: string
  imageCount: number
  assignedTo: string
}

export const columns: ColumnDef<Task>[] = [
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
    accessorKey: 'imageCount',
    header: (header) => h('button', { onClick: () => header.column.toggleSorting() }, 'Image Count')
  },
  {
    accessorKey: 'assignedTo',
    header: (header) => h('button', { onClick: () => header.column.toggleSorting() }, 'Assigned To')
  }
]
