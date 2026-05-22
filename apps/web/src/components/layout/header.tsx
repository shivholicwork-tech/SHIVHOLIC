"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Bell, User, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { MobileSidebar } from "./mobile-sidebar";

export function Header() {
  const { setTheme, theme } = useTheme();
  const [commandOpen, setCommandOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-xl px-4 lg:px-6">
        <MobileSidebar />

        {/* Search / Command Palette Trigger */}
        <button
          onClick={() => setCommandOpen(true)}
          className="hidden md:flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors w-64"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Search...</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </button>

        <div className="ml-auto flex items-center gap-2">
          {/* Project Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden sm:flex gap-1">
                <span className="max-w-[100px] truncate">My Project</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Projects</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>My Project</DropdownMenuItem>
              <DropdownMenuItem>Client Website</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Create new project</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">User</p>
                  <p className="text-xs text-muted-foreground">user@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Command Palette */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem>Dashboard</CommandItem>
            <CommandItem>SEO Audit</CommandItem>
            <CommandItem>Keywords</CommandItem>
            <CommandItem>Content Writer</CommandItem>
            <CommandItem>AI Chat</CommandItem>
            <CommandItem>Topical Maps</CommandItem>
            <CommandItem>Rank Tracker</CommandItem>
            <CommandItem>Backlinks</CommandItem>
            <CommandItem>Technical SEO</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Actions">
            <CommandItem>New Project</CommandItem>
            <CommandItem>Start Audit</CommandItem>
            <CommandItem>Research Keywords</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
