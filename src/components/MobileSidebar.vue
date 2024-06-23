<script setup lang="ts">
import { ListTodo, Menu, Plane, PlaneTakeoff } from 'lucide-vue-next'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline" size="icon" class="shrink-0 md:hidden">
        <Menu class="size-5" />
        <span class="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" class="flex flex-col">
      <nav class="grid gap-2 text-lg font-medium">
        <RouterLink to="/" class="flex items-center gap-2 border-b pb-6 text-lg font-semibold">
          <PlaneTakeoff class="size-6" />
          <span class="sr-only">UAV Monitoring</span>
        </RouterLink>
        <RouterLink
          to="/drones"
          class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <Plane class="size-5" />
          Drones
        </RouterLink>
        <RouterLink
          to="/tasks"
          class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <ListTodo class="size-5" />
          Tasks
        </RouterLink>
      </nav>
      <div class="mt-auto p-4 text-sm text-muted-foreground">
        <p>UAV Monitoring App</p>
        <p>
          by
          <a
            class="font-semibold"
            href="https://yunusemre.dev/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Yunus Emre Kepenek
          </a>
        </p>
      </div>
    </SheetContent>
  </Sheet>
</template>
