"use client";

import * as React from "react";
import {
  Plus,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading,
  Loader2,
  Sparkles,
  Check,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ScoreRing } from "@/components/shared/score-ring";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { mockContents, mockNlpTerms } from "@/lib/mock-data";

export default function ContentPage() {
  const [editorContent, setEditorContent] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [seoScore, setSeoScore] = React.useState(0);
  const editorRef = React.useRef<HTMLDivElement>(null);

  const wordCount = editorContent
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  const charCount = editorContent.length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Calculate live SEO score based on content
  React.useEffect(() => {
    if (wordCount === 0) {
      setSeoScore(0);
      return;
    }
    let score = 20; // base
    if (wordCount > 300) score += 15;
    if (wordCount > 800) score += 15;
    if (wordCount > 1500) score += 10;

    // Check NLP terms
    const usedTerms = mockNlpTerms.filter((t) =>
      editorContent.toLowerCase().includes(t.term.toLowerCase())
    ).length;
    score += usedTerms * 5;

    setSeoScore(Math.min(score, 100));
  }, [editorContent, wordCount]);

  const nlpTermsUsed = mockNlpTerms.map((t) => ({
    ...t,
    used: editorContent.toLowerCase().includes(t.term.toLowerCase()),
  }));

  const keywordDensity =
    wordCount > 0
      ? ((editorContent.toLowerCase().split("seo").length - 1) / wordCount) * 100
      : 0;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated = mockContents[0].content;
      setEditorContent(generated);
      if (editorRef.current) {
        editorRef.current.innerText = generated;
      }
      setIsGenerating(false);
    }, 2000);
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      setEditorContent(editorRef.current.innerText || "");
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

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
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => execCommand("bold")}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => execCommand("italic")}
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => execCommand("formatBlock", "h2")}
              >
                <Heading className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => execCommand("insertUnorderedList")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => execCommand("insertOrderedList")}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button
                variant="secondary"
                size="sm"
                className="gap-1"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Sparkles className="h-3 w-3" />
                )}
                {isGenerating ? "Generating..." : "Generate with AI"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div
              ref={editorRef}
              contentEditable
              onInput={handleEditorInput}
              className="min-h-[400px] outline-none text-base leading-relaxed prose prose-sm dark:prose-invert max-w-none p-2"
              suppressContentEditableWarning
              data-placeholder="Start writing your content here or use AI to generate..."
            />
            <div className="flex items-center justify-between mt-4 pt-4 border-t text-xs text-muted-foreground">
              <span>{wordCount} words</span>
              <span>{charCount} characters</span>
              <span>{readingTime} min read</span>
            </div>
          </CardContent>
        </Card>

        {/* SEO Score Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">SEO Score</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ScoreRing score={seoScore} label="Score" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Keyword Density</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Target: &quot;SEO&quot;</span>
                <span className="font-medium">{keywordDensity.toFixed(1)}%</span>
              </div>
              <Progress value={Math.min(keywordDensity * 33, 100)} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Ideal range: 1-3%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">NLP Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {nlpTermsUsed.map((item) => (
                  <Badge
                    key={item.term}
                    variant={item.used ? "default" : "outline"}
                    className="text-xs gap-1"
                  >
                    {item.used && <Check className="h-2.5 w-2.5" />}
                    {item.term}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                {nlpTermsUsed.filter((t) => t.used).length}/{nlpTermsUsed.length} terms used
              </p>
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
                <span className="font-medium">{wordCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reading Time</span>
                <span className="font-medium">{readingTime} min</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {wordCount < 300 && (
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-1.5 shrink-0" />
                    Add more content (min 300 words recommended)
                  </li>
                )}
                {keywordDensity < 1 && wordCount > 0 && (
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-1.5 shrink-0" />
                    Include your target keyword more naturally
                  </li>
                )}
                {nlpTermsUsed.filter((t) => !t.used).length > 5 && (
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-1.5 shrink-0" />
                    Use more NLP terms to improve topical relevance
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  Add internal links to related pages
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  Include at least one image with alt text
                </li>
              </ul>
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
            {mockContents.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.date} - {item.wordCount} words
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      item.status === "Published"
                        ? "default"
                        : item.status === "Optimizing"
                          ? "secondary"
                          : "outline"
                    }
                  >
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
