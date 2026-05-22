"use client";

import * as React from "react";
import { Search, Filter, TrendingUp, TrendingDown } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DataTable, type Column } from "@/components/shared/data-table";

interface KeywordData {
  keyword: string;
  volume: number;
  kd: number;
  cpc: string;
  intent: string;
  trend: string;
  [key: string]: unknown;
}

const keywordData: KeywordData[] = [
  { keyword: "seo tools", volume: 12000, kd: 72, cpc: "$4.50", intent: "Commercial", trend: "up" },
  { keyword: "keyword research", volume: 8500, kd: 65, cpc: "$3.20", intent: "Informational", trend: "up" },
  { keyword: "backlink checker", volume: 6200, kd: 58, cpc: "$5.80", intent: "Commercial", trend: "stable" },
  { keyword: "site audit tool", volume: 4100, kd: 45, cpc: "$6.10", intent: "Commercial", trend: "up" },
  { keyword: "content optimization", volume: 3800, kd: 52, cpc: "$2.90", intent: "Informational", trend: "down" },
  { keyword: "rank tracking software", volume: 2900, kd: 68, cpc: "$7.20", intent: "Transactional", trend: "up" },
];

const columns: Column<KeywordData>[] = [
  { key: "keyword", header: "Keyword", sortable: true },
  {
    key: "volume",
    header: "Volume",
    sortable: true,
    render: (item) => <span className="font-medium">{item.volume.toLocaleString()}</span>,
  },
  {
    key: "kd",
    header: "KD",
    sortable: true,
    render: (item) => (
      <Badge variant={item.kd > 60 ? "destructive" : item.kd > 30 ? "secondary" : "default"}>
        {item.kd}%
      </Badge>
    ),
  },
  { key: "cpc", header: "CPC", sortable: true },
  {
    key: "intent",
    header: "Intent",
    render: (item) => <Badge variant="outline">{item.intent as string}</Badge>,
  },
  {
    key: "trend",
    header: "Trend",
    render: (item) =>
      item.trend === "up" ? (
        <TrendingUp className="h-4 w-4 text-green-500" />
      ) : item.trend === "down" ? (
        <TrendingDown className="h-4 w-4 text-red-500" />
      ) : (
        <span className="text-xs text-muted-foreground">Stable</span>
      ),
  },
];

export default function KeywordsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Keyword Explorer"
        description="Research and discover keyword opportunities for your content strategy."
        action={
          <Button className="gap-2">
            <Search className="h-4 w-4" />
            Research Keywords
          </Button>
        }
      />

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Enter a keyword or topic..." className="pl-9" />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">6</p>
            <p className="text-xs text-muted-foreground">Keywords Found</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">37,500</p>
            <p className="text-xs text-muted-foreground">Total Volume</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">60%</p>
            <p className="text-xs text-muted-foreground">Avg. KD</p>
          </CardContent>
        </Card>
      </div>

      {/* Keyword Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Keyword Results</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable columns={columns} data={keywordData} />
        </CardContent>
      </Card>
    </div>
  );
}
