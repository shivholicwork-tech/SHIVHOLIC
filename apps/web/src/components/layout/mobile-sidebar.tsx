"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Zap } from "lucide-react";
import {
  LayoutDashboard,
  MessageSquare,
  Search,
  FileText,
  Map,
  TrendingUp,
  Link2,
  Settings,
  CreditCard,
  Bug,
  Radar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const navGroups = [
  {
    label: "Main",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "AI Chat", href: "/chat", icon: MessageSquare },
    ],
  },
  {
    label: "SEO Tools",
    items: [
      { title: "Audit", href: "/audit", icon: Radar },
      { title: "Keywords", href: "/keywords", icon: Search },
      { title: "Content Writer", href: "/content", icon: FileText },
      { title: "Topical Maps", href: "/topical-maps", icon: Map },
      { title: "Rank Tracker", href: "/rank-tracker", icon: TrendingUp },
      { title: "Backlinks", href: "/backlinks", icon: Link2 },
      { title: "Technical SEO", href: "/technical-seo", icon: Bug },
    ],
  },
  {
    label: "Settings",
    items: [
      { title: "Settings", href: "/settings", icon: Settings },
      { title: "Billing", href: "/billing", icon: CreditCard },
    ],
  },
];

export function MobileSidebar() {
  const pathname = usePathname();
  const { isMobileOpen, setMobileOpen } = useSidebarStore();

  return (
    <Sheet open={isMobileOpen} onOpenChange={setMobileOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">AI SEO</span>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-65px)]">
          <nav className="flex flex-col gap-1 p-4">
            {navGroups.map((group) => (
              <div key={group.label} className="mb-4">
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.label}
                </p>
                <Separator className="mb-2" />
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent/50",
                        isActive && "bg-primary/10 text-primary"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4", isActive && "text-primary")} />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
