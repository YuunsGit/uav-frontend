<script setup lang="ts">
import { ListTodo, Menu, Plane, PlaneTakeoff } from 'lucide-vue-next'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline" size="icon" class="shrink-0 md:hidden">
        <Menu class="h-5 w-5" />
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
          <Plane class="h-5 w-5" />
          Drones
        </RouterLink>
        <RouterLink
          to="/tasks"
          class="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
        >
          <ListTodo class="h-5 w-5" />
          Tasks
          <Badge
            aria-label="Task count"
            class="ml-auto flex size-6 shrink-0 items-center justify-center rounded-full"
          >
            32
          </Badge>
        </RouterLink>
      </nav>
      <div class="mt-auto">
        <Card>
          <CardHeader>
            <CardTitle>Upgrade to Pro</CardTitle>
            <CardDescription>
              Unlock all features and get unlimited access to our support team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="sm" class="w-full"> Upgrade </Button>
          </CardContent>
        </Card>
      </div>
    </SheetContent>
  </Sheet>
</template>
