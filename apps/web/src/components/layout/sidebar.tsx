"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronLeft,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
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

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggle } = useSidebarStore();

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 70 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative hidden h-screen flex-col border-r bg-card/50 backdrop-blur-xl lg:flex"
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-lg font-bold gradient-text overflow-hidden whitespace-nowrap"
              >
                AI SEO
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-1">
            {navGroups.map((group) => (
              <div key={group.label} className="mb-4">
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {group.label}
                    </motion.p>
                  )}
                </AnimatePresence>
                {isCollapsed && <Separator className="mb-2" />}
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const linkContent = (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent/50",
                        isActive &&
                          "bg-primary/10 text-primary shadow-sm",
                        isCollapsed && "justify-center px-2"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-4 w-4 shrink-0",
                          isActive && "text-primary"
                        )}
                      />
                      <AnimatePresence>
                        {!isCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="overflow-hidden whitespace-nowrap"
                          >
                            {item.title}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {isActive && !isCollapsed && (
                        <motion.div
                          layoutId="active-indicator"
                          className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                        />
                      )}
                    </Link>
                  );

                  if (isCollapsed) {
                    return (
                      <Tooltip key={item.href}>
                        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                        <TooltipContent side="right">{item.title}</TooltipContent>
                      </Tooltip>
                    );
                  }

                  return <React.Fragment key={item.href}>{linkContent}</React.Fragment>;
                })}
              </div>
            ))}
          </nav>
        </ScrollArea>

        {/* Collapse Button */}
        <div className="border-t p-3">
          <button
            onClick={toggle}
            className="flex w-full items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.div>
          </button>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}
