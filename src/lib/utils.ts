import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Ref } from 'vue'
import type { Updater } from '@tanstack/vue-table'
import { toast } from '@/components/ui/toast'

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

export async function makeFetch(
  endpoint: string,
  options?: {
    request?: RequestInit
    loadingState?: Ref<boolean>
  }
) {
  try {
    if (options?.loadingState) {
      options.loadingState.value = true
    }
    const res = await fetch(`${import.meta.env['VITE_API_URL']}${endpoint}`, options?.request)
    if (!res.ok) {
      let errorMessage = 'Something went wrong. Please try again.'
      switch (res.status) {
        case 400:
          errorMessage = 'Something went wrong with your request.'
          break
        case 401:
          errorMessage = "It seems you don't have access to this."
          break
        case 404:
          errorMessage = "We couldn't find what you were looking for."
          break
        case 500:
          errorMessage = "Something went wrong on our end. We're looking into it."
          break
      }
      toast({
        title: 'Oops!',
        description: errorMessage,
        variant: 'destructive'
      })
      throw new Error(errorMessage)
    }
    return await res.json()
  } catch (err) {
    toast({
      title: 'Oops!',
      description: 'Something went wrong. Please try again.',
      variant: 'destructive'
    })
    throw err
  } finally {
    if (options?.loadingState) {
      options.loadingState.value = false
    }
  }
}
