"use client";

import * as React from "react";
import { FileText, Plus, Bold, Italic, List, Heading } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ScoreRing } from "@/components/shared/score-ring";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const contentHistory = [
  { title: "10 Best SEO Tools for 2024", score: 92, status: "Published", date: "2024-01-15" },
  { title: "How to Do Keyword Research", score: 88, status: "Draft", date: "2024-01-14" },
  { title: "Technical SEO Checklist", score: 76, status: "Draft", date: "2024-01-13" },
];

const nlpTerms = [
  { term: "search engine optimization", used: true },
  { term: "keyword research", used: true },
  { term: "backlinks", used: false },
  { term: "meta description", used: false },
  { term: "organic traffic", used: true },
  { term: "SERP features", used: false },
];

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Content Writer"
        description="Create SEO-optimized content with AI assistance."
        action={
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Article
          </Button>
        }
      />

      {/* Editor Layout */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Editor Panel */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Heading className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <List className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button variant="secondary" size="sm" className="gap-1">
                <FileText className="h-3 w-3" />
                AI Generate
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Start writing your content here or use AI to generate..."
              className="min-h-[400px] resize-none border-0 focus-visible:ring-0 text-base"
            />
          </CardContent>
        </Card>

        {/* SEO Score Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">SEO Score</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ScoreRing score={76} label="Score" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">NLP Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {nlpTerms.map((item) => (
                  <Badge
                    key={item.term}
                    variant={item.used ? "default" : "outline"}
                    className="text-xs"
                  >
                    {item.term}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Readability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Grade Level</span>
                <span className="font-medium">8th Grade</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Word Count</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reading Time</span>
                <span className="font-medium">0 min</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Content History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {contentHistory.map((item) => (
              <div key={item.title} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={item.status === "Published" ? "default" : "secondary"}>
                    {item.status}
                  </Badge>
                  <span className="text-sm font-medium">{item.score}/100</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
