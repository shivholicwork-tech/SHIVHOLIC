"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  AlertTriangle,
  CheckCircle,
  Info,
  AlertOctagon,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Globe,
  Loader2,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ScoreRing } from "@/components/shared/score-ring";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockAuditResult, mockRecentAudits, type MockAuditIssue } from "@/lib/mock-data";

type AuditPhase = "idle" | "crawling" | "analyzing" | "scoring" | "done";

const phaseLabels: Record<AuditPhase, string> = {
  idle: "Ready",
  crawling: "Crawling pages...",
  analyzing: "Analyzing SEO factors...",
  scoring: "Calculating scores...",
  done: "Audit Complete",
};

const phaseProgress: Record<AuditPhase, number> = {
  idle: 0,
  crawling: 25,
  analyzing: 55,
  scoring: 85,
  done: 100,
};

function IssueCard({ issue }: { issue: MockAuditIssue }) {
  const [expanded, setExpanded] = React.useState(false);

  const severityConfig = {
    critical: { color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
    warning: { color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
    passed: { color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
    info: { color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  };

  const config = severityConfig[issue.severity];

  return (
    <div className={`rounded-lg border p-3 ${config.border} transition-colors`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-3">
          {expanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-sm font-medium">{issue.title}</span>
        </div>
        <div className="flex items-center gap-2">
          {issue.pages > 0 && (
            <Badge variant="outline" className="text-xs">
              {issue.pages} pages
            </Badge>
          )}
        </div>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 ml-7 space-y-2 text-sm">
              <p className="text-muted-foreground">{issue.description}</p>
              <div className="flex items-center gap-2 text-xs">
                <Globe className="h-3 w-3" />
                <span className="text-muted-foreground">{issue.affectedUrl}</span>
              </div>
              <div className={`${config.bg} rounded-md p-2.5 mt-2`}>
                <p className="text-xs font-medium mb-1">Recommendation:</p>
                <p className="text-xs text-muted-foreground">{issue.recommendation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AuditPage() {
  const [url, setUrl] = React.useState("");
  const [phase, setPhase] = React.useState<AuditPhase>("idle");
  const [showResults, setShowResults] = React.useState(true);
  const [urlError, setUrlError] = React.useState("");

  const validateUrl = (value: string): boolean => {
    if (!value.trim()) {
      setUrlError("Please enter a URL");
      return false;
    }
    // Basic domain validation
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
    if (!urlPattern.test(value.trim())) {
      setUrlError("Please enter a valid domain (e.g., example.com)");
      return false;
    }
    setUrlError("");
    return true;
  };

  const handleStartAudit = () => {
    if (!validateUrl(url)) return;

    setShowResults(false);
    setPhase("crawling");

    setTimeout(() => setPhase("analyzing"), 1200);
    setTimeout(() => setPhase("scoring"), 2400);
    setTimeout(() => {
      setPhase("done");
      setShowResults(true);
    }, 3600);
  };

  const issues = mockAuditResult.issues;
  const criticalIssues = issues.filter((i) => i.severity === "critical");
  const warningIssues = issues.filter((i) => i.severity === "warning");
  const passedIssues = issues.filter((i) => i.severity === "passed");
  const infoIssues = issues.filter((i) => i.severity === "info");

  return (
    <div className="space-y-6">
      <PageHeader
        title="SEO Audit"
        description="Analyze your website for SEO issues and opportunities."
        action={
          <Button className="gap-2" variant="outline" onClick={() => { setPhase("idle"); setShowResults(true); }}>
            <RefreshCw className="h-4 w-4" />
            Reset
          </Button>
        }
      />

      {/* URL Input */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (urlError) setUrlError("");
                }}
                placeholder="Enter URL to audit (e.g., example.com)"
                className={urlError ? "border-red-500" : ""}
              />
              {urlError && (
                <p className="text-xs text-red-500 mt-1">{urlError}</p>
              )}
            </div>
            <Button
              onClick={handleStartAudit}
              disabled={phase !== "idle" && phase !== "done"}
              className="gap-2"
            >
              {phase !== "idle" && phase !== "done" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              Start Audit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress Stepper */}
      {phase !== "idle" && phase !== "done" && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{phaseLabels[phase]}</span>
                <span className="text-muted-foreground">{phaseProgress[phase]}%</span>
              </div>
              <Progress value={phaseProgress[phase]} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                {(["crawling", "analyzing", "scoring", "done"] as AuditPhase[]).map((step) => (
                  <span
                    key={step}
                    className={
                      phaseProgress[phase] >= phaseProgress[step]
                        ? "text-primary font-medium"
                        : ""
                    }
                  >
                    {step === "done" ? "Complete" : step.charAt(0).toUpperCase() + step.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      {showResults && (
        <>
          {/* Score and Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="flex items-center justify-center p-6">
              <ScoreRing score={mockAuditResult.score} label="Overall" size={140} />
            </Card>
            <Card className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Performance</p>
                <ScoreRing score={mockAuditResult.categories.performance} label="" size={80} />
              </div>
            </Card>
            <Card className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">SEO</p>
                <ScoreRing score={mockAuditResult.categories.seo} label="" size={80} />
              </div>
            </Card>
            <Card className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Best Practices</p>
                <ScoreRing score={mockAuditResult.categories.bestPractices} label="" size={80} />
              </div>
            </Card>
          </div>

          {/* Recent Audits */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Audits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRecentAudits.map((audit) => (
                  <div
                    key={audit.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{audit.url}</p>
                        <p className="text-xs text-muted-foreground">{audit.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={audit.score >= 80 ? "default" : "secondary"}>
                        Score: {audit.score}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {audit.issues.length} issues
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Issues Tabs */}
          <Tabs defaultValue="critical">
            <TabsList>
              <TabsTrigger value="critical" className="gap-1">
                <AlertOctagon className="h-3 w-3" />
                Critical ({criticalIssues.length})
              </TabsTrigger>
              <TabsTrigger value="warnings" className="gap-1">
                <AlertTriangle className="h-3 w-3" />
                Warnings ({warningIssues.length})
              </TabsTrigger>
              <TabsTrigger value="passed" className="gap-1">
                <CheckCircle className="h-3 w-3" />
                Passed ({passedIssues.length})
              </TabsTrigger>
              <TabsTrigger value="info" className="gap-1">
                <Info className="h-3 w-3" />
                Info ({infoIssues.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="critical">
              <Card>
                <CardContent className="p-4 space-y-2">
                  {criticalIssues.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="warnings">
              <Card>
                <CardContent className="p-4 space-y-2">
                  {warningIssues.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="passed">
              <Card>
                <CardContent className="p-4 space-y-2">
                  {passedIssues.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="info">
              <Card>
                <CardContent className="p-4 space-y-2">
                  {infoIssues.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
