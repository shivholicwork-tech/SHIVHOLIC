"use client";

import * as React from "react";
import { Link2, ExternalLink, Filter } from "lucide-react";
import {
  BarChart,
  Bar,
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

interface BacklinkData {
  url: string;
  da: number;
  anchor: string;
  status: string;
  type: string;
  [key: string]: unknown;
}

const backlinkData: BacklinkData[] = [
  { url: "techblog.com/article", da: 72, anchor: "seo tools", status: "Active", type: "DoFollow" },
  { url: "marketing.io/guide", da: 65, anchor: "keyword research", status: "Active", type: "DoFollow" },
  { url: "blog.example.com", da: 45, anchor: "check here", status: "Active", type: "NoFollow" },
  { url: "news.site.org/post", da: 82, anchor: "ai seo platform", status: "Active", type: "DoFollow" },
  { url: "forum.dev.com/thread", da: 38, anchor: "great tool", status: "Lost", type: "DoFollow" },
  { url: "review.app/tools", da: 55, anchor: "best seo", status: "Active", type: "DoFollow" },
];

const chartData = [
  { month: "Aug", backlinks: 12 },
  { month: "Sep", backlinks: 18 },
  { month: "Oct", backlinks: 15 },
  { month: "Nov", backlinks: 22 },
  { month: "Dec", backlinks: 28 },
  { month: "Jan", backlinks: 35 },
];

const columns: Column<BacklinkData>[] = [
  {
    key: "url",
    header: "Source URL",
    render: (item) => (
      <div className="flex items-center gap-1 max-w-[200px]">
        <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground" />
        <span className="truncate text-sm">{item.url as string}</span>
      </div>
    ),
  },
  {
    key: "da",
    header: "DA",
    sortable: true,
    render: (item) => <span className="font-medium">{item.da}</span>,
  },
  { key: "anchor", header: "Anchor Text" },
  {
    key: "status",
    header: "Status",
    render: (item) => (
      <Badge variant={item.status === "Active" ? "default" : "destructive"}>
        {item.status as string}
      </Badge>
    ),
  },
  {
    key: "type",
    header: "Type",
    render: (item) => (
      <Badge variant={item.type === "DoFollow" ? "default" : "outline"}>
        {item.type as string}
      </Badge>
    ),
  },
];

export default function BacklinksPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Backlinks"
        description="Monitor your backlink profile and discover new link opportunities."
        action={
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Backlinks"
          value={130}
          icon={Link2}
          trend={{ value: 18, positive: true }}
        />
        <StatCard
          title="Referring Domains"
          value={45}
          icon={ExternalLink}
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="DoFollow Links"
          value="82%"
          icon={Link2}
          trend={{ value: 5, positive: true }}
        />
      </div>

      {/* Backlink Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Backlink Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar dataKey="backlinks" fill="hsl(243, 75%, 59%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Backlinks Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Backlinks</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable columns={columns} data={backlinkData} />
        </CardContent>
      </Card>
    </div>
  );
}
