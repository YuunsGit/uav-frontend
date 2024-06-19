<script setup lang="ts">
import { ListTodo, Plane, PlaneTakeoff } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <div class="bg-muted/40 hidden border-r md:block">
    <div class="flex h-full max-h-screen flex-col gap-2">
      <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <a href="/" class="flex items-center gap-2 font-semibold">
          <PlaneTakeoff class="h-6 w-6" />
          <span class="">UAV Monitoring</span>
        </a>
      </div>
      <div class="flex-1">
        <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
          <a
            href="/drones"
            class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
          >
            <Plane class="h-4 w-4" />
            Drones
          </a>
          <a
            href="/tasks"
            class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
          >
            <ListTodo class="h-4 w-4" />
            Tasks
            <Badge
              aria-label="Task count"
              class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
            >
              32
            </Badge>
          </a>
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
