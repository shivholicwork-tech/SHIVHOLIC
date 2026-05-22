"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ScoreRingProps {
  score: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  label?: string;
}

export function ScoreRing({
  score,
  maxScore = 100,
  size = 120,
  strokeWidth = 8,
  className,
  label,
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min(score / maxScore, 1);
  const offset = circumference - percentage * circumference;

  const getColor = (pct: number) => {
    if (pct >= 0.8) return "text-green-500";
    if (pct >= 0.5) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          className="stroke-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn("transition-all duration-1000 ease-out stroke-current", getColor(percentage))}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold">{score}</span>
        {label && <span className="text-xs text-muted-foreground">{label}</span>}
      </div>
    </div>
  );
}
