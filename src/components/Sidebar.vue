<script setup lang="ts">
import { ListTodo, Plane, PlaneTakeoff } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="hidden border-r bg-muted/40 md:block">
    <div class="flex h-full max-h-screen flex-col gap-2">
      <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <RouterLink to="/" class="flex items-center gap-2 font-semibold">
          <PlaneTakeoff class="size-6" />
          <span class="pl-1">UAV Monitoring</span>
        </RouterLink>
      </div>
      <div class="flex-1">
        <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
          <RouterLink
            to="/drones"
            active-class="bg-muted text-primary"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Plane class="size-4" />
            Drones
          </RouterLink>
          <RouterLink
            to="/tasks"
            active-class="bg-muted text-primary"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <ListTodo class="size-4" />
            Tasks
          </RouterLink>
        </nav>
      </div>
      <div class="mt-auto p-4">
        <Card>
          <CardHeader class="p-2 pt-0 md:p-4">
            <CardTitle>Switch theme</CardTitle>
            <CardDescription>
              Unlock all features and get unlimited access to our support team.
            </CardDescription>
          </CardHeader>
          <CardContent class="p-2 pt-0 md:p-4 md:pt-0">
            <Button size="sm" class="w-full"> Upgrade </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
