// Mock data for all pages - provides realistic SEO data for demo purposes

export interface MockKeyword {
  id: string;
  keyword: string;
  volume: number;
  kd: number;
  cpc: number;
  intent: "Informational" | "Commercial" | "Transactional" | "Navigational";
  trend: "up" | "down" | "stable";
  position?: number;
  cluster?: string;
  [key: string]: unknown;
}

export interface MockAuditIssue {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "warning" | "passed" | "info";
  affectedUrl: string;
  recommendation: string;
  pages: number;
}

export interface MockAuditResult {
  id: string;
  url: string;
  score: number;
  date: string;
  issues: MockAuditIssue[];
  categories: {
    performance: number;
    seo: number;
    accessibility: number;
    bestPractices: number;
  };
}

export interface MockContent {
  id: string;
  title: string;
  content: string;
  score: number;
  status: "Published" | "Draft" | "Optimizing";
  date: string;
  wordCount: number;
  readability: string;
  keywordDensity: number;
}

export interface MockMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface MockConversation {
  id: string;
  title: string;
  lastMessage: string;
  date: string;
  messages: MockMessage[];
}

export interface MockBacklink {
  id: string;
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  domainAuthority: number;
  status: "active" | "lost" | "new";
  date: string;
}

export interface MockRanking {
  id: string;
  keyword: string;
  position: number;
  previousPosition: number;
  url: string;
  change: number;
  searchVolume: number;
}

// Keywords Mock Data
export const mockKeywords: MockKeyword[] = [
  { id: "kw-1", keyword: "seo tools 2024", volume: 18100, kd: 72, cpc: 4.5, intent: "Commercial", trend: "up", cluster: "SEO Tools" },
  { id: "kw-2", keyword: "keyword research guide", volume: 12400, kd: 55, cpc: 3.2, intent: "Informational", trend: "up", cluster: "Keyword Research" },
  { id: "kw-3", keyword: "backlink checker free", volume: 9800, kd: 62, cpc: 5.8, intent: "Commercial", trend: "stable", cluster: "Backlinks" },
  { id: "kw-4", keyword: "site audit tool", volume: 7200, kd: 45, cpc: 6.1, intent: "Commercial", trend: "up", cluster: "SEO Tools" },
  { id: "kw-5", keyword: "content optimization tips", volume: 5600, kd: 38, cpc: 2.9, intent: "Informational", trend: "down", cluster: "Content" },
  { id: "kw-6", keyword: "rank tracking software", volume: 4800, kd: 68, cpc: 7.2, intent: "Transactional", trend: "up", cluster: "SEO Tools" },
  { id: "kw-7", keyword: "technical seo checklist", volume: 6300, kd: 42, cpc: 3.8, intent: "Informational", trend: "up", cluster: "Technical SEO" },
  { id: "kw-8", keyword: "local seo optimization", volume: 8900, kd: 51, cpc: 4.1, intent: "Informational", trend: "stable", cluster: "Local SEO" },
  { id: "kw-9", keyword: "best seo agency", volume: 3200, kd: 78, cpc: 12.5, intent: "Transactional", trend: "up", cluster: "Services" },
  { id: "kw-10", keyword: "google search console tutorial", volume: 11200, kd: 35, cpc: 1.8, intent: "Informational", trend: "up", cluster: "Tools" },
  { id: "kw-11", keyword: "on-page seo factors", volume: 7800, kd: 48, cpc: 3.5, intent: "Informational", trend: "stable", cluster: "On-Page SEO" },
  { id: "kw-12", keyword: "link building strategies", volume: 6500, kd: 63, cpc: 5.2, intent: "Informational", trend: "up", cluster: "Backlinks" },
  { id: "kw-13", keyword: "seo competitor analysis", volume: 4100, kd: 55, cpc: 4.8, intent: "Commercial", trend: "up", cluster: "Analysis" },
  { id: "kw-14", keyword: "website speed optimization", volume: 9200, kd: 44, cpc: 3.6, intent: "Informational", trend: "up", cluster: "Technical SEO" },
  { id: "kw-15", keyword: "meta description generator", volume: 5400, kd: 32, cpc: 2.1, intent: "Navigational", trend: "stable", cluster: "Tools" },
  { id: "kw-16", keyword: "schema markup guide", volume: 4700, kd: 39, cpc: 2.8, intent: "Informational", trend: "up", cluster: "Technical SEO" },
  { id: "kw-17", keyword: "buy seo services", volume: 2800, kd: 82, cpc: 15.3, intent: "Transactional", trend: "stable", cluster: "Services" },
  { id: "kw-18", keyword: "ahrefs alternative", volume: 6100, kd: 71, cpc: 8.9, intent: "Commercial", trend: "up", cluster: "SEO Tools" },
  { id: "kw-19", keyword: "seo reporting template", volume: 3900, kd: 28, cpc: 2.4, intent: "Informational", trend: "down", cluster: "Reporting" },
  { id: "kw-20", keyword: "core web vitals fix", volume: 7600, kd: 46, cpc: 3.3, intent: "Informational", trend: "up", cluster: "Technical SEO" },
  { id: "kw-21", keyword: "ecommerce seo strategy", volume: 5200, kd: 57, cpc: 5.6, intent: "Informational", trend: "up", cluster: "E-commerce" },
  { id: "kw-22", keyword: "youtube seo tips", volume: 14500, kd: 41, cpc: 2.0, intent: "Informational", trend: "up", cluster: "Video SEO" },
  { id: "kw-23", keyword: "mobile seo best practices", volume: 3600, kd: 36, cpc: 2.7, intent: "Informational", trend: "stable", cluster: "Mobile" },
  { id: "kw-24", keyword: "seo audit services", volume: 2100, kd: 75, cpc: 11.2, intent: "Transactional", trend: "up", cluster: "Services" },
];

// Audit Mock Data
export const mockAuditIssues: MockAuditIssue[] = [
  {
    id: "issue-1",
    title: "Missing meta descriptions",
    description: "Several pages are missing meta descriptions, which can hurt CTR in search results.",
    severity: "critical",
    affectedUrl: "/blog/seo-guide",
    recommendation: "Add unique meta descriptions (150-160 characters) to each page describing its content.",
    pages: 8,
  },
  {
    id: "issue-2",
    title: "Broken internal links",
    description: "Found links pointing to pages that return 404 errors.",
    severity: "critical",
    affectedUrl: "/services/old-page",
    recommendation: "Fix or remove broken links. Set up 301 redirects for moved content.",
    pages: 3,
  },
  {
    id: "issue-3",
    title: "Duplicate title tags",
    description: "Multiple pages share the same title tag, causing confusion for search engines.",
    severity: "critical",
    affectedUrl: "/products/item-1",
    recommendation: "Create unique, descriptive title tags for each page (50-60 characters).",
    pages: 5,
  },
  {
    id: "issue-4",
    title: "Images without alt text",
    description: "Images missing alt attributes reduce accessibility and SEO value.",
    severity: "warning",
    affectedUrl: "/blog/images",
    recommendation: "Add descriptive alt text to all images. Include target keywords where relevant.",
    pages: 15,
  },
  {
    id: "issue-5",
    title: "Thin content pages",
    description: "Pages with very little content may be seen as low-quality by search engines.",
    severity: "warning",
    affectedUrl: "/category/page-3",
    recommendation: "Expand thin pages to at least 300 words or consolidate with related pages.",
    pages: 5,
  },
  {
    id: "issue-6",
    title: "Slow page load speed",
    description: "Several pages take more than 3 seconds to load, impacting user experience and rankings.",
    severity: "warning",
    affectedUrl: "/homepage",
    recommendation: "Optimize images, enable caching, minify CSS/JS, and consider a CDN.",
    pages: 7,
  },
  {
    id: "issue-7",
    title: "Missing H1 tags",
    description: "Some pages lack H1 heading tags, which help search engines understand page structure.",
    severity: "warning",
    affectedUrl: "/about",
    recommendation: "Add a single, descriptive H1 tag to each page containing the primary keyword.",
    pages: 4,
  },
  {
    id: "issue-8",
    title: "Valid SSL certificate",
    description: "Your site uses HTTPS with a valid SSL certificate.",
    severity: "passed",
    affectedUrl: "/",
    recommendation: "No action needed. SSL is properly configured.",
    pages: 0,
  },
  {
    id: "issue-9",
    title: "Mobile responsive design",
    description: "Your site passes mobile-friendly tests across all pages.",
    severity: "passed",
    affectedUrl: "/",
    recommendation: "No action needed. Site is mobile-friendly.",
    pages: 0,
  },
  {
    id: "issue-10",
    title: "Valid robots.txt",
    description: "Your robots.txt file is properly configured and accessible.",
    severity: "passed",
    affectedUrl: "/robots.txt",
    recommendation: "No action needed. Robots.txt is valid.",
    pages: 0,
  },
  {
    id: "issue-11",
    title: "XML Sitemap present",
    description: "A valid XML sitemap is available and submitted to search engines.",
    severity: "passed",
    affectedUrl: "/sitemap.xml",
    recommendation: "No action needed. Sitemap is properly configured.",
    pages: 0,
  },
  {
    id: "issue-12",
    title: "Pages using structured data",
    description: "Several pages implement Schema.org structured data markup.",
    severity: "info",
    affectedUrl: "/products",
    recommendation: "Consider adding structured data to more pages for rich snippets.",
    pages: 12,
  },
  {
    id: "issue-13",
    title: "External links found",
    description: "Your site has outbound links to various external domains.",
    severity: "info",
    affectedUrl: "/blog",
    recommendation: "Review external links periodically to ensure they point to relevant, trustworthy sites.",
    pages: 45,
  },
];

export const mockAuditResult: MockAuditResult = {
  id: "audit-1",
  url: "example.com",
  score: 78,
  date: "2024-01-15",
  issues: mockAuditIssues,
  categories: {
    performance: 82,
    seo: 75,
    accessibility: 88,
    bestPractices: 71,
  },
};

export const mockRecentAudits: MockAuditResult[] = [
  { id: "audit-1", url: "example.com", score: 78, date: "2024-01-15", issues: mockAuditIssues, categories: { performance: 82, seo: 75, accessibility: 88, bestPractices: 71 } },
  { id: "audit-2", url: "mysite.org", score: 92, date: "2024-01-14", issues: [], categories: { performance: 94, seo: 91, accessibility: 95, bestPractices: 89 } },
  { id: "audit-3", url: "blog.test.com", score: 65, date: "2024-01-13", issues: [], categories: { performance: 58, seo: 67, accessibility: 72, bestPractices: 63 } },
];

// Content Mock Data
export const mockContents: MockContent[] = [
  {
    id: "content-1",
    title: "10 Best SEO Tools for 2024: Complete Guide",
    content: `Search engine optimization (SEO) is the backbone of any successful digital marketing strategy. In 2024, having the right SEO tools can make the difference between ranking on page one and being invisible to your target audience.

Whether you're a seasoned SEO professional or just getting started with organic search, this comprehensive guide covers the top tools that will help you improve your rankings, drive more traffic, and outperform your competitors.

## 1. AI SEO Platform

Our top pick for 2024 is the AI SEO Platform, which combines 16 specialized AI agents to handle everything from keyword research to content optimization. The platform uses advanced natural language processing to analyze search intent and generate SEO-optimized content.

## 2. Google Search Console

A free tool from Google that provides essential data about your site's search performance. Track impressions, clicks, and average position for your keywords. The URL Inspection tool helps identify indexing issues.

## 3. Ahrefs

Known for its extensive backlink database and competitive analysis features. Ahrefs offers site auditing, keyword research, and rank tracking capabilities that make it indispensable for SEO professionals.`,
    score: 92,
    status: "Published",
    date: "2024-01-15",
    wordCount: 1847,
    readability: "8th Grade",
    keywordDensity: 2.4,
  },
  {
    id: "content-2",
    title: "How to Do Keyword Research: A Beginner's Guide",
    content: "Keyword research is the process of finding and analyzing search terms...",
    score: 88,
    status: "Draft",
    date: "2024-01-14",
    wordCount: 1523,
    readability: "7th Grade",
    keywordDensity: 1.8,
  },
  {
    id: "content-3",
    title: "Technical SEO Checklist for 2024",
    content: "Technical SEO ensures search engines can crawl and index your site effectively...",
    score: 76,
    status: "Draft",
    date: "2024-01-13",
    wordCount: 2105,
    readability: "9th Grade",
    keywordDensity: 1.5,
  },
  {
    id: "content-4",
    title: "Link Building Strategies That Work",
    content: "Building high-quality backlinks remains one of the most effective...",
    score: 81,
    status: "Optimizing",
    date: "2024-01-12",
    wordCount: 1680,
    readability: "8th Grade",
    keywordDensity: 2.1,
  },
];

export const mockNlpTerms = [
  { term: "search engine optimization", used: true },
  { term: "keyword research", used: true },
  { term: "backlinks", used: false },
  { term: "meta description", used: false },
  { term: "organic traffic", used: true },
  { term: "SERP features", used: false },
  { term: "content optimization", used: true },
  { term: "technical SEO", used: false },
  { term: "link building", used: true },
  { term: "search intent", used: true },
];

// Chat Mock Data
export const mockConversations: MockConversation[] = [
  {
    id: "conv-1",
    title: "Keyword Research for ML Blog",
    lastMessage: "Would you like me to analyze any of these further?",
    date: "2024-01-15",
    messages: [
      {
        id: "msg-1",
        role: "assistant",
        content: "Hello! I'm your AI SEO assistant. I can help you with keyword research, content optimization, technical SEO analysis, and more. What would you like to work on today?",
        timestamp: "2024-01-15T10:00:00Z",
      },
      {
        id: "msg-2",
        role: "user",
        content: "Can you help me find keywords for a blog about machine learning?",
        timestamp: "2024-01-15T10:01:00Z",
      },
      {
        id: "msg-3",
        role: "assistant",
        content: `I'd be happy to help with keyword research for machine learning content! Here are some high-potential keywords:

1. **"machine learning tutorial"** - 18,000 monthly searches, KD: 45
2. **"what is machine learning"** - 33,000 monthly searches, KD: 38
3. **"machine learning algorithms"** - 12,000 monthly searches, KD: 52
4. **"machine learning vs deep learning"** - 8,000 monthly searches, KD: 35
5. **"machine learning python"** - 22,000 monthly searches, KD: 48

These keywords have a good balance of search volume and competition. The informational intent keywords (1, 2, 4) are great for blog posts, while "machine learning python" could work well for a tutorial series.

Would you like me to analyze any of these further or suggest content angles?`,
        timestamp: "2024-01-15T10:01:30Z",
      },
    ],
  },
  {
    id: "conv-2",
    title: "Site Audit Follow-up",
    lastMessage: "Here are the priority fixes for your site...",
    date: "2024-01-14",
    messages: [
      {
        id: "msg-4",
        role: "user",
        content: "I just ran a site audit and got a score of 72. What should I fix first?",
        timestamp: "2024-01-14T14:00:00Z",
      },
      {
        id: "msg-5",
        role: "assistant",
        content: `Based on a score of 72, here are the priority fixes I recommend:

**Critical (Fix Immediately):**
1. Fix broken internal links - these create a poor user experience and waste crawl budget
2. Add missing meta descriptions - these directly impact CTR in search results
3. Resolve duplicate title tags - search engines need unique signals per page

**High Priority:**
4. Optimize page load speed - aim for under 2.5 seconds LCP
5. Add alt text to images - improves accessibility and image search visibility

**Medium Priority:**
6. Expand thin content pages - aim for 300+ words minimum
7. Fix redirect chains - simplify to direct 301 redirects

Would you like me to help create a detailed action plan for any of these?`,
        timestamp: "2024-01-14T14:01:00Z",
      },
    ],
  },
  {
    id: "conv-3",
    title: "Content Strategy Discussion",
    lastMessage: "Based on your niche, I recommend starting with...",
    date: "2024-01-13",
    messages: [
      {
        id: "msg-6",
        role: "user",
        content: "Help me create a content strategy for my SaaS startup",
        timestamp: "2024-01-13T09:00:00Z",
      },
      {
        id: "msg-7",
        role: "assistant",
        content: `I'd love to help with your content strategy! For a SaaS startup, here is my recommended approach:

**Phase 1: Foundation (Month 1-2)**
- Create cornerstone content for your main product categories
- Build out comparison pages (your product vs competitors)
- Write "how-to" guides solving problems your product addresses

**Phase 2: Growth (Month 3-4)**
- Launch a blog targeting informational keywords in your niche
- Create case studies from early customers
- Build topical authority with content clusters

**Phase 3: Scale (Month 5+)**
- Guest posting and digital PR for backlinks
- Video content and multimedia optimization
- Community building and user-generated content

Based on your niche, I recommend starting with the comparison and how-to content, as these typically convert at higher rates for SaaS businesses. Would you like me to research specific keywords for any of these content types?`,
        timestamp: "2024-01-13T09:01:00Z",
      },
    ],
  },
];

export const mockSuggestedPrompts = [
  "Find keyword opportunities for my niche",
  "Analyze my competitor's top pages",
  "Help me optimize this article for SEO",
  "Create a topical map for my website",
  "Suggest internal linking opportunities",
  "Check my site's technical SEO issues",
  "Generate content ideas for my blog",
  "Help improve my meta descriptions",
];

// Backlinks Mock Data
export const mockBacklinks: MockBacklink[] = [
  { id: "bl-1", sourceUrl: "techcrunch.com/article/best-tools", targetUrl: "/", anchorText: "AI SEO Platform", domainAuthority: 93, status: "active", date: "2024-01-10" },
  { id: "bl-2", sourceUrl: "moz.com/blog/seo-roundup", targetUrl: "/features", anchorText: "advanced SEO tools", domainAuthority: 91, status: "active", date: "2024-01-08" },
  { id: "bl-3", sourceUrl: "searchenginejournal.com/reviews", targetUrl: "/pricing", anchorText: "affordable SEO", domainAuthority: 88, status: "new", date: "2024-01-15" },
  { id: "bl-4", sourceUrl: "hubspot.com/marketing-tools", targetUrl: "/blog", anchorText: "content optimization", domainAuthority: 92, status: "active", date: "2023-12-20" },
  { id: "bl-5", sourceUrl: "neilpatel.com/tools-list", targetUrl: "/", anchorText: "click here", domainAuthority: 89, status: "lost", date: "2023-11-15" },
];

// Rankings Mock Data
export const mockRankings: MockRanking[] = [
  { id: "rk-1", keyword: "seo tools", position: 5, previousPosition: 8, url: "/", change: 3, searchVolume: 12000 },
  { id: "rk-2", keyword: "keyword research tool", position: 3, previousPosition: 4, url: "/features/keywords", change: 1, searchVolume: 8500 },
  { id: "rk-3", keyword: "site audit", position: 12, previousPosition: 15, url: "/features/audit", change: 3, searchVolume: 6200 },
  { id: "rk-4", keyword: "content optimization", position: 7, previousPosition: 6, url: "/features/content", change: -1, searchVolume: 4100 },
  { id: "rk-5", keyword: "ai seo", position: 2, previousPosition: 5, url: "/", change: 3, searchVolume: 3800 },
  { id: "rk-6", keyword: "rank tracker", position: 18, previousPosition: 22, url: "/features/rank-tracker", change: 4, searchVolume: 5500 },
  { id: "rk-7", keyword: "backlink checker", position: 9, previousPosition: 11, url: "/features/backlinks", change: 2, searchVolume: 7200 },
  { id: "rk-8", keyword: "technical seo tool", position: 6, previousPosition: 9, url: "/features/technical", change: 3, searchVolume: 3400 },
];
