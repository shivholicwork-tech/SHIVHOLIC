"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  FolderOpen,
  Search,
  FileText,
  Activity,
  Zap,
  TrendingUp,
  Bot,
  Sparkles,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StatCard } from "@/components/shared/stat-card";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const chartData = [
  { name: "Mon", score: 72 },
  { name: "Tue", score: 75 },
  { name: "Wed", score: 78 },
  { name: "Thu", score: 74 },
  { name: "Fri", score: 82 },
  { name: "Sat", score: 85 },
  { name: "Sun", score: 88 },
];

const recentActivity = [
  { action: "Audit completed", target: "example.com", time: "2 min ago", type: "audit" },
  { action: "Keywords analyzed", target: "25 new keywords", time: "15 min ago", type: "keywords" },
  { action: "Content generated", target: "Blog post draft", time: "1 hour ago", type: "content" },
  { action: "Rank update", target: "+5 positions", time: "3 hours ago", type: "ranking" },
];

const quickActions = [
  { title: "Run Audit", description: "Analyze your site", icon: Zap },
  { title: "Research Keywords", description: "Find opportunities", icon: Search },
  { title: "Write Content", description: "AI-powered writing", icon: FileText },
  { title: "Track Rankings", description: "Monitor positions", icon: TrendingUp },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your SEO performance."
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Projects"
          value={3}
          icon={FolderOpen}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Keywords Tracked"
          value="1,247"
          icon={Search}
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Pages Audited"
          value={156}
          icon={FileText}
          trend={{ value: 23, positive: true }}
        />
        <StatCard
          title="Content Score"
          value="85/100"
          icon={Activity}
          trend={{ value: 5, positive: true }}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        {/* Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-base">SEO Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(243, 75%, 59%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(243, 75%, 59%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(243, 75%, 59%)"
                    fillOpacity={1}
                    fill="url(#scoreGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.target}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <motion.div key={action.title} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="h-auto w-full flex-col items-start gap-1 p-4 text-left"
              >
                <action.icon className="h-5 w-5 text-primary mb-1" />
                <span className="font-medium">{action.title}</span>
                <span className="text-xs text-muted-foreground">{action.description}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Agent Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Agents Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Keyword Research", status: "Ready" },
              { name: "Content Writer", status: "Ready" },
              { name: "Technical Auditor", status: "Ready" },
              { name: "Rank Tracker", status: "Active" },
            ].map((agent) => (
              <div
                key={agent.name}
                className="flex items-center gap-2 rounded-lg border p-3"
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{agent.name}</p>
                </div>
                <Badge variant={agent.status === "Active" ? "default" : "secondary"} className="text-xs">
                  {agent.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
