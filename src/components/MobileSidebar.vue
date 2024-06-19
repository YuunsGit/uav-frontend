<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { CircleUser, ListTodo, Menu, Plane, PlaneTakeoff, Search } from 'lucide-vue-next'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <header class="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
    <Sheet>
      <SheetTrigger as-child>
        <Button variant="outline" size="icon" class="shrink-0 md:hidden">
          <Menu class="h-5 w-5" />
          <span class="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" class="flex flex-col">
        <nav class="grid gap-2 text-lg font-medium">
          <a href="#" class="flex items-center gap-2 border-b pb-6 text-lg font-semibold">
            <PlaneTakeoff class="h-6 w-6" />
            <span class="sr-only">UAV Monitoring</span>
          </a>
          <a
            href="/drones"
            class="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
          >
            <Plane class="h-5 w-5" />
            Drones
          </a>
          <a
            href="/tasks"
            class="bg-muted text-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
          >
            <ListTodo class="h-5 w-5" />
            Tasks
            <Badge
              aria-label="Task count"
              class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
            >
              32
            </Badge>
          </a>
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
    <div class="w-full flex-1">
      <form>
        <div class="relative">
          <Search class="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search drones"
            class="bg-background w-full appearance-none pl-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </div>
      </form>
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="secondary" size="icon" class="rounded-full">
          <CircleUser class="h-5 w-5" />
          <span class="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
</template>
