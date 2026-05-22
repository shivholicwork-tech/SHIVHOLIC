"use client";

import * as React from "react";
import { Map, Plus, FolderTree } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const maps = [
  {
    name: "SaaS Marketing",
    topics: 24,
    articles: 18,
    coverage: "75%",
    status: "In Progress",
  },
  {
    name: "Technical SEO Guide",
    topics: 15,
    articles: 15,
    coverage: "100%",
    status: "Complete",
  },
  {
    name: "E-commerce SEO",
    topics: 32,
    articles: 8,
    coverage: "25%",
    status: "In Progress",
  },
];

const topicList = [
  "What is SaaS Marketing",
  "SaaS Growth Strategies",
  "Content Marketing for SaaS",
  "SaaS SEO Best Practices",
  "SaaS Email Marketing",
  "SaaS Customer Retention",
];

export default function TopicalMapsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Topical Maps"
        description="Build comprehensive topic clusters to establish topical authority."
        action={
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Map
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Maps List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your Topical Maps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {maps.map((map) => (
                  <div
                    key={map.name}
                    className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <FolderTree className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{map.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {map.topics} topics / {map.articles} articles
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">{map.coverage}</span>
                      <Badge variant={map.status === "Complete" ? "default" : "secondary"}>
                        {map.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Visual Map Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Map Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-64 items-center justify-center rounded-lg border border-dashed bg-muted/30">
                <div className="text-center">
                  <Map className="mx-auto h-10 w-10 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Select a map to view its visualization
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Topic Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {topicList.map((topic) => (
                  <div
                    key={topic}
                    className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {topic}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
