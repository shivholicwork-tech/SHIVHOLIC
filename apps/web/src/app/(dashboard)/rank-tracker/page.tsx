"use client";

import * as React from "react";
import {
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Minus,
  Filter,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, type Column } from "@/components/shared/data-table";

interface RankData {
  keyword: string;
  position: number;
  change: number;
  volume: number;
  url: string;
  [key: string]: unknown;
}

const rankData: RankData[] = [
  { keyword: "seo platform", position: 5, change: 3, volume: 8200, url: "/features" },
  { keyword: "ai seo tool", position: 8, change: -2, volume: 5400, url: "/" },
  { keyword: "keyword research tool", position: 12, change: 5, volume: 12000, url: "/keywords" },
  { keyword: "content optimizer", position: 3, change: 1, volume: 4800, url: "/content" },
  { keyword: "rank tracker", position: 15, change: -1, volume: 9100, url: "/rank-tracker" },
  { keyword: "seo audit tool", position: 7, change: 4, volume: 6300, url: "/audit" },
];

const chartData = [
  { date: "Jan 1", position: 18 },
  { date: "Jan 8", position: 15 },
  { date: "Jan 15", position: 12 },
  { date: "Jan 22", position: 10 },
  { date: "Jan 29", position: 8 },
  { date: "Feb 5", position: 7 },
  { date: "Feb 12", position: 5 },
];

const columns: Column<RankData>[] = [
  { key: "keyword", header: "Keyword", sortable: true },
  {
    key: "position",
    header: "Position",
    sortable: true,
    render: (item) => <span className="font-bold">#{item.position}</span>,
  },
  {
    key: "change",
    header: "Change",
    sortable: true,
    render: (item) => (
      <div className="flex items-center gap-1">
        {item.change > 0 ? (
          <ArrowUp className="h-3 w-3 text-green-500" />
        ) : item.change < 0 ? (
          <ArrowDown className="h-3 w-3 text-red-500" />
        ) : (
          <Minus className="h-3 w-3 text-muted-foreground" />
        )}
        <span
          className={
            item.change > 0
              ? "text-green-500"
              : item.change < 0
              ? "text-red-500"
              : "text-muted-foreground"
          }
        >
          {Math.abs(item.change)}
        </span>
      </div>
    ),
  },
  {
    key: "volume",
    header: "Volume",
    sortable: true,
    render: (item) => item.volume.toLocaleString(),
  },
  { key: "url", header: "URL" },
];

export default function RankTrackerPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Rank Tracker"
        description="Monitor your keyword rankings and track progress over time."
        action={
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Keywords Tracked"
          value={248}
          icon={TrendingUp}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Avg. Position"
          value="8.3"
          icon={TrendingUp}
          trend={{ value: 15, positive: true }}
        />
        <StatCard
          title="Top 10 Keywords"
          value={42}
          icon={TrendingDown}
          trend={{ value: 3, positive: true }}
        />
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ranking History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis reversed className="text-xs" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="position"
                  stroke="hsl(243, 75%, 59%)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Rankings Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Keyword Rankings</CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">All Countries</Badge>
            <Badge variant="outline">Desktop</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable columns={columns} data={rankData} />
        </CardContent>
      </Card>
    </div>
  );
}
