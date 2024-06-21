import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Ref } from 'vue'
import type { Updater } from '@tanstack/vue-table'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value = typeof updaterOrValue === 'function' ? updaterOrValue(ref.value) : updaterOrValue
}

export function downloadImage(imageId: string) {
  const link = document.createElement('a')
  link.href = `${import.meta.env['VITE_API_URL']}/images/${imageId}`
  link.download = `image-${imageId}`
  link.click()
}
