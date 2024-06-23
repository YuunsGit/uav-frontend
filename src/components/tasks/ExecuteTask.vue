<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { CircleCheckBig } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import { ref } from 'vue'
import { makeFetch } from '@/lib/utils'

const props = defineProps<{
  taskId: string
  fetchTaskDetails: () => Promise<void>
}>()

const isOpen = ref(false)

function onSubmit() {
  makeFetch(`/tasks/${props.taskId}/execute`, {
    request: {
      method: 'POST'
    }
  })
    .then(() => {
      props.fetchTaskDetails()
      toast({
        title: 'Success!',
        description: 'Task executed successfully.'
      })
    })
    .catch((error) => {
      console.error('Failed to add task: ', error)
    })
}
</script>

<template>
  <AlertDialog v-model:open="isOpen">
    <AlertDialogTrigger as-child>
      <Button> <CircleCheckBig class="mr-1.5 inline size-4" /> Execute Task </Button>
    </AlertDialogTrigger>
    <AlertDialogContent class="gap-6">
      <AlertDialogHeader>
        <AlertDialogTitle> Are you sure you want to execute this task? </AlertDialogTitle>
        <AlertDialogDescription class="text-muted-foreground">
          This action will execute the task and capture images by the associated drone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel as-child>
          <Button variant="outline"> Cancel </Button>
        </AlertDialogCancel>
        <Button @click.prevent="onSubmit"> Execute </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
