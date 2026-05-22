"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  className?: string;
}

export function StatCard({ title, value, description, icon: Icon, trend, className }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn("relative overflow-hidden", className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold">{value}</p>
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
              {trend && (
                <p
                  className={cn(
                    "text-xs font-medium",
                    trend.positive ? "text-green-500" : "text-red-500"
                  )}
                >
                  {trend.positive ? "+" : ""}{trend.value}% from last month
                </p>
              )}
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
        <div className="absolute inset-x-0 bottom-0 h-1 gradient-primary opacity-50" />
      </Card>
    </motion.div>
  );
}
