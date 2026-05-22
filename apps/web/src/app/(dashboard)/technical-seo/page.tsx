"use client";

import * as React from "react";
import { Bug, Gauge, Globe, FileCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ScoreRing } from "@/components/shared/score-ring";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const coreWebVitals = [
  { name: "LCP", value: "2.1s", score: 85, target: "< 2.5s", status: "Good" },
  { name: "FID", value: "45ms", score: 92, target: "< 100ms", status: "Good" },
  { name: "CLS", value: "0.12", score: 68, target: "< 0.1", status: "Needs Work" },
];

const technicalIssues = [
  { title: "Pages with slow load time", count: 12, severity: "High" },
  { title: "Missing canonical tags", count: 5, severity: "Medium" },
  { title: "Duplicate title tags", count: 8, severity: "Medium" },
  { title: "Pages blocked by robots.txt", count: 3, severity: "Low" },
  { title: "Missing hreflang tags", count: 2, severity: "Low" },
];

export default function TechnicalSeoPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Technical SEO"
        description="Monitor Core Web Vitals, crawl issues, and technical health of your site."
        action={
          <Button className="gap-2">
            <Bug className="h-4 w-4" />
            Run Crawl
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Pages Crawled" value={342} icon={Globe} />
        <StatCard title="Issues Found" value={30} icon={Bug} />
        <StatCard title="Health Score" value="78%" icon={Gauge} />
        <StatCard title="Sitemap Pages" value={285} icon={FileCheck} />
      </div>

      {/* Core Web Vitals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Core Web Vitals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {coreWebVitals.map((vital) => (
              <div key={vital.name} className="flex flex-col items-center text-center space-y-3">
                <ScoreRing score={vital.score} size={100} strokeWidth={6} />
                <div>
                  <p className="text-lg font-bold">{vital.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {vital.value} (target: {vital.target})
                  </p>
                  <Badge
                    variant={vital.status === "Good" ? "default" : "secondary"}
                    className="mt-1"
                  >
                    {vital.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Technical Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {technicalIssues.map((issue) => (
              <div
                key={issue.title}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      issue.severity === "High"
                        ? "bg-red-500"
                        : issue.severity === "Medium"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  />
                  <span className="text-sm">{issue.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{issue.count} pages</Badge>
                  <Badge
                    variant={
                      issue.severity === "High"
                        ? "destructive"
                        : issue.severity === "Medium"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {issue.severity}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sitemap Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sitemap Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border p-4 text-center">
              <p className="text-2xl font-bold text-green-500">285</p>
              <p className="text-xs text-muted-foreground">Indexed Pages</p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <p className="text-2xl font-bold text-yellow-500">12</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <p className="text-2xl font-bold text-red-500">3</p>
              <p className="text-xs text-muted-foreground">Errors</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
