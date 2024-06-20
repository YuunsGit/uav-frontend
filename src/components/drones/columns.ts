import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'

export interface Drone {
  id: string
  name: string
  taskCount: number
  imagesTaken: number
}

export const columns: ColumnDef<Drone>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', 'ID'),
    enableSorting: false,
    cell: ({ row }) => h('div', { class: 'w-fit' }, row.getValue('id'))
  },
  {
    accessorKey: 'name',
    header: (header) => h('button', { onClick: () => header.column.toggleSorting() }, 'Name'),
    cell: ({ row }) => h('div', row.getValue('name'))
  },
  {
    accessorKey: 'taskCount',
    header: (header) => h('button', { onClick: () => header.column.toggleSorting() }, 'Task Count'),
    cell: ({ row }) => h('div', { class: 'max-w-20' }, row.getValue('taskCount'))
  },
  {
    accessorKey: 'imagesTaken',
    header: (header) =>
      h('button', { onClick: () => header.column.toggleSorting() }, 'Images Taken'),
    cell: ({ row }) => h('div', row.getValue('imagesTaken'))
  }
]
