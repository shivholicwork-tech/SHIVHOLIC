"use client";

import * as React from "react";
import { Search, Filter, TrendingUp, TrendingDown, Download, X } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DataTable, type Column } from "@/components/shared/data-table";
import { mockKeywords, type MockKeyword } from "@/lib/mock-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function KeywordsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showFilters, setShowFilters] = React.useState(false);
  const [intentFilter, setIntentFilter] = React.useState<string>("all");
  const [kdFilter, setKdFilter] = React.useState<string>("all");
  const [view, setView] = React.useState<"table" | "clusters">("table");

  const filteredKeywords = React.useMemo(() => {
    let result = mockKeywords;

    if (searchQuery) {
      result = result.filter((kw) =>
        kw.keyword.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (intentFilter !== "all") {
      result = result.filter((kw) => kw.intent === intentFilter);
    }

    if (kdFilter !== "all") {
      switch (kdFilter) {
        case "easy":
          result = result.filter((kw) => kw.kd <= 30);
          break;
        case "medium":
          result = result.filter((kw) => kw.kd > 30 && kw.kd <= 60);
          break;
        case "hard":
          result = result.filter((kw) => kw.kd > 60);
          break;
      }
    }

    return result;
  }, [searchQuery, intentFilter, kdFilter]);

  const clusters = React.useMemo(() => {
    const grouped: Record<string, MockKeyword[]> = {};
    filteredKeywords.forEach((kw) => {
      const cluster = kw.cluster || "Uncategorized";
      if (!grouped[cluster]) grouped[cluster] = [];
      grouped[cluster].push(kw);
    });
    return grouped;
  }, [filteredKeywords]);

  const totalVolume = filteredKeywords.reduce((sum, kw) => sum + kw.volume, 0);
  const avgKd = filteredKeywords.length
    ? Math.round(filteredKeywords.reduce((sum, kw) => sum + kw.kd, 0) / filteredKeywords.length)
    : 0;

  const handleExportCsv = () => {
    const headers = "Keyword,Volume,KD,CPC,Intent,Trend\n";
    const rows = filteredKeywords
      .map((kw) => `"${kw.keyword}",${kw.volume},${kw.kd},${kw.cpc},"${kw.intent}","${kw.trend}"`)
      .join("\n");
    const csv = headers + rows;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "keywords-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const columns: Column<MockKeyword>[] = [
    { key: "keyword", header: "Keyword", sortable: true },
    {
      key: "volume",
      header: "Volume",
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{item.volume.toLocaleString()}</span>
          <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${Math.min((item.volume / 20000) * 100, 100)}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      key: "kd",
      header: "KD",
      sortable: true,
      render: (item) => (
        <Badge
          variant={item.kd > 60 ? "destructive" : item.kd > 30 ? "secondary" : "default"}
        >
          {item.kd}%
        </Badge>
      ),
    },
    {
      key: "cpc",
      header: "CPC",
      sortable: true,
      render: (item) => <span>${item.cpc.toFixed(2)}</span>,
    },
    {
      key: "intent",
      header: "Intent",
      render: (item) => {
        const colorMap: Record<string, string> = {
          Informational: "bg-blue-500/10 text-blue-600 border-blue-500/20",
          Commercial: "bg-purple-500/10 text-purple-600 border-purple-500/20",
          Transactional: "bg-green-500/10 text-green-600 border-green-500/20",
          Navigational: "bg-orange-500/10 text-orange-600 border-orange-500/20",
        };
        return (
          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${colorMap[item.intent] || ""}`}>
            {item.intent}
          </span>
        );
      },
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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Keyword Explorer"
        description="Research and discover keyword opportunities for your content strategy."
        action={
          <Button className="gap-2" onClick={handleExportCsv}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        }
      />

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter a keyword or topic..."
                className="pl-9"
              />
            </div>
            <Button
              variant={showFilters ? "secondary" : "outline"}
              className="gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="flex gap-3 mt-4 pt-4 border-t flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Intent:</span>
                <Select value={intentFilter} onValueChange={setIntentFilter}>
                  <SelectTrigger className="w-[140px] h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Intents</SelectItem>
                    <SelectItem value="Informational">Informational</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Transactional">Transactional</SelectItem>
                    <SelectItem value="Navigational">Navigational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Difficulty:</span>
                <Select value={kdFilter} onValueChange={setKdFilter}>
                  <SelectTrigger className="w-[120px] h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="easy">Easy (0-30)</SelectItem>
                    <SelectItem value="medium">Medium (31-60)</SelectItem>
                    <SelectItem value="hard">Hard (61+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(intentFilter !== "all" || kdFilter !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 h-8 text-xs"
                  onClick={() => {
                    setIntentFilter("all");
                    setKdFilter("all");
                  }}
                >
                  <X className="h-3 w-3" />
                  Clear
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{filteredKeywords.length}</p>
            <p className="text-xs text-muted-foreground">Keywords Found</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{totalVolume.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Volume</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{avgKd}%</p>
            <p className="text-xs text-muted-foreground">Avg. KD</p>
          </CardContent>
        </Card>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        <Button
          variant={view === "table" ? "default" : "outline"}
          size="sm"
          onClick={() => setView("table")}
        >
          Table View
        </Button>
        <Button
          variant={view === "clusters" ? "default" : "outline"}
          size="sm"
          onClick={() => setView("clusters")}
        >
          Cluster View
        </Button>
      </div>

      {/* Content */}
      {view === "table" ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Keyword Results</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable columns={columns} data={filteredKeywords} />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {Object.entries(clusters).map(([clusterName, keywords]) => (
            <Card key={clusterName}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{clusterName}</CardTitle>
                  <Badge variant="outline">{keywords.length} keywords</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((kw) => (
                    <div
                      key={kw.id}
                      className="flex items-center gap-2 rounded-lg border px-3 py-1.5"
                    >
                      <span className="text-sm">{kw.keyword}</span>
                      <Badge variant="secondary" className="text-xs">
                        {kw.volume.toLocaleString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
