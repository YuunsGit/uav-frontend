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
import { Textarea } from '@/components/ui/textarea'
import { Plus, Check, ChevronsUpDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { FormItem, FormField, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { toast } from '@/components/ui/toast'
import { onMounted, ref } from 'vue'
import { cn, makeFetch } from '@/lib/utils'
import type { Drone } from '@/components/drones/columns'
import { useRouter } from 'vue-router'

const droneList = ref<Drone[]>([])
const isOpen = ref(false)

const router = useRouter()

const formSchema = toTypedSchema(
  z.object({
    title: z
      .string({
        required_error: 'Please enter a task name.'
      })
      .trim()
      .min(1)
      .max(50),
    description: z
      .string({
        required_error: 'Please enter a task description.'
      })
      .trim()
      .min(1)
      .max(300),
    drone: z.number({
      required_error: 'Please select a drone to assign.'
    })
  })
)

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit((values) => {
  makeFetch('/tasks', {
    request: {
      method: 'POST',
      body: JSON.stringify({
        name: values.title,
        description: values.description,
        drone_id: values.drone
      }),
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
    }
  })
    .then((res) => {
      router.push(`/tasks/${res.id}`)
      toast({
        title: 'Success!',
        description: 'Task added successfully.'
      })
    })
    .catch((error) => {
      console.error('Failed to add task: ', error)
    })
})

onMounted(async () => {
  droneList.value = await makeFetch('/drones')
})
</script>

<template>
  <AlertDialog v-model:open="isOpen">
    <AlertDialogTrigger as-child>
      <Button> <Plus class="mr-1.5 inline size-4" /> Add Task </Button>
    </AlertDialogTrigger>
    <AlertDialogContent class="gap-6">
      <AlertDialogHeader>
        <AlertDialogTitle>Add a new task</AlertDialogTitle>
      </AlertDialogHeader>
      <form class="flex flex-col gap-6" id="add-task" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="title">
          <FormItem>
            <FormLabel>Task Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Short task title" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Details of the task"
                class="resize-none"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="drone">
          <FormItem class="flex flex-col">
            <FormLabel>Assign Drone</FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    :class="cn('justify-between', !values.drone && 'text-muted-foreground')"
                  >
                    {{
                      values.drone
                        ? droneList.find((drone) => parseInt(drone.id) === values.drone)?.name
                        : 'Select drone'
                    }}
                    <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent align="start" class="p-0">
                <Command>
                  <CommandInput placeholder="Select drone" />
                  <CommandEmpty>No drones available.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        v-for="drone in droneList"
                        :key="drone.id"
                        :value="drone.name"
                        @select="
                          () => {
                            setFieldValue('drone', parseInt(drone.id))
                          }
                        "
                      >
                        <Check
                          :class="
                            cn(
                              'mr-2 h-4 w-4',
                              parseInt(drone.id) === values.drone ? 'opacity-100' : 'opacity-0'
                            )
                          "
                        />
                        {{ drone.name }}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        </FormField>
      </form>
      <AlertDialogFooter>
        <AlertDialogCancel as-child>
          <Button variant="outline"> Cancel </Button>
        </AlertDialogCancel>
        <Button form="add-task" type="submit"> Add Task </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
