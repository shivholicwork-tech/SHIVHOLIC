"use client";

import * as React from "react";
import { Search, AlertTriangle, CheckCircle, Info, AlertOctagon } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ScoreRing } from "@/components/shared/score-ring";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const recentAudits = [
  { url: "example.com", score: 78, issues: 12, date: "2024-01-15" },
  { url: "mysite.org", score: 92, issues: 3, date: "2024-01-14" },
  { url: "blog.test.com", score: 65, issues: 28, date: "2024-01-13" },
];

const issues = {
  critical: [
    { title: "Missing meta descriptions", pages: 8 },
    { title: "Broken internal links", pages: 3 },
  ],
  warnings: [
    { title: "Images without alt text", pages: 15 },
    { title: "Thin content pages", pages: 5 },
    { title: "Slow page load speed", pages: 7 },
  ],
  passed: [
    { title: "Valid SSL certificate", pages: 0 },
    { title: "Mobile responsive", pages: 0 },
    { title: "Valid robots.txt", pages: 0 },
  ],
  info: [
    { title: "Pages using structured data", pages: 12 },
    { title: "External links found", pages: 45 },
  ],
};

export default function AuditPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="SEO Audit"
        description="Analyze your website for SEO issues and opportunities."
        action={
          <Button className="gap-2">
            <Search className="h-4 w-4" />
            New Audit
          </Button>
        }
      />

      {/* URL Input */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-3">
            <Input
              placeholder="Enter URL to audit (e.g., https://example.com)"
              className="flex-1"
            />
            <Button>Start Audit</Button>
          </div>
        </CardContent>
      </Card>

      {/* Score and Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="flex items-center justify-center p-6">
          <ScoreRing score={78} label="Overall" size={140} />
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Recent Audits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAudits.map((audit) => (
                <div
                  key={audit.url}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{audit.url}</p>
                    <p className="text-xs text-muted-foreground">{audit.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={audit.score >= 80 ? "default" : "secondary"}>
                      Score: {audit.score}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {audit.issues} issues
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Issues Tabs */}
      <Tabs defaultValue="critical">
        <TabsList>
          <TabsTrigger value="critical" className="gap-1">
            <AlertOctagon className="h-3 w-3" />
            Critical ({issues.critical.length})
          </TabsTrigger>
          <TabsTrigger value="warnings" className="gap-1">
            <AlertTriangle className="h-3 w-3" />
            Warnings ({issues.warnings.length})
          </TabsTrigger>
          <TabsTrigger value="passed" className="gap-1">
            <CheckCircle className="h-3 w-3" />
            Passed ({issues.passed.length})
          </TabsTrigger>
          <TabsTrigger value="info" className="gap-1">
            <Info className="h-3 w-3" />
            Info ({issues.info.length})
          </TabsTrigger>
        </TabsList>
        {Object.entries(issues).map(([key, items]) => (
          <TabsContent key={key} value={key}>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {items.map((issue) => (
                    <div
                      key={issue.title}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <span className="text-sm">{issue.title}</span>
                      {issue.pages > 0 && (
                        <Badge variant="outline">{issue.pages} pages</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
