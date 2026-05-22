export enum AgentType {
  KEYWORD_RESEARCHER = 'KEYWORD_RESEARCHER',
  CONTENT_WRITER = 'CONTENT_WRITER',
  CONTENT_OPTIMIZER = 'CONTENT_OPTIMIZER',
  TECHNICAL_AUDITOR = 'TECHNICAL_AUDITOR',
  BACKLINK_ANALYZER = 'BACKLINK_ANALYZER',
  RANK_TRACKER = 'RANK_TRACKER',
  COMPETITOR_ANALYZER = 'COMPETITOR_ANALYZER',
  TOPICAL_MAP_BUILDER = 'TOPICAL_MAP_BUILDER',
  SCHEMA_GENERATOR = 'SCHEMA_GENERATOR',
  META_OPTIMIZER = 'META_OPTIMIZER',
  INTERNAL_LINKER = 'INTERNAL_LINKER',
  CONTENT_PLANNER = 'CONTENT_PLANNER',
  SITE_CRAWLER = 'SITE_CRAWLER',
  REPORT_GENERATOR = 'REPORT_GENERATOR',
  CONTENT_REFRESHER = 'CONTENT_REFRESHER',
  LOCAL_SEO_OPTIMIZER = 'LOCAL_SEO_OPTIMIZER',
}

export enum AiTaskStatus {
  QUEUED = 'QUEUED',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export interface IAiTask {
  id: string;
  projectId: string;
  agentType: AgentType;
  status: AiTaskStatus;
  input: Record<string, unknown>;
  output: Record<string, unknown> | null;
  error: string | null;
  startedAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
}

export interface IAgentConfig {
  type: AgentType;
  name: string;
  description: string;
  requiredInputs: string[];
  outputFormat: string;
}

export const AGENT_CONFIGS: IAgentConfig[] = [
  {
    type: AgentType.KEYWORD_RESEARCHER,
    name: 'Keyword Researcher',
    description: 'Discovers and analyzes keywords with search volume, difficulty, and intent',
    requiredInputs: ['seedKeywords', 'targetMarket'],
    outputFormat: 'keywords',
  },
  {
    type: AgentType.CONTENT_WRITER,
    name: 'Content Writer',
    description: 'Generates SEO-optimized content based on keyword targets and outlines',
    requiredInputs: ['targetKeyword', 'contentBrief'],
    outputFormat: 'content',
  },
  {
    type: AgentType.CONTENT_OPTIMIZER,
    name: 'Content Optimizer',
    description: 'Analyzes and optimizes existing content for better search performance',
    requiredInputs: ['contentId', 'targetKeywords'],
    outputFormat: 'optimizationSuggestions',
  },
  {
    type: AgentType.TECHNICAL_AUDITOR,
    name: 'Technical Auditor',
    description: 'Performs comprehensive technical SEO audits',
    requiredInputs: ['projectId'],
    outputFormat: 'auditReport',
  },
  {
    type: AgentType.BACKLINK_ANALYZER,
    name: 'Backlink Analyzer',
    description: 'Analyzes backlink profiles and identifies opportunities',
    requiredInputs: ['domain'],
    outputFormat: 'backlinkReport',
  },
  {
    type: AgentType.RANK_TRACKER,
    name: 'Rank Tracker',
    description: 'Tracks keyword rankings over time',
    requiredInputs: ['keywords', 'domain'],
    outputFormat: 'rankings',
  },
  {
    type: AgentType.COMPETITOR_ANALYZER,
    name: 'Competitor Analyzer',
    description: 'Analyzes competitor SEO strategies and identifies gaps',
    requiredInputs: ['competitorDomains'],
    outputFormat: 'competitorReport',
  },
  {
    type: AgentType.TOPICAL_MAP_BUILDER,
    name: 'Topical Map Builder',
    description: 'Creates topic clusters and content hierarchies',
    requiredInputs: ['mainTopic', 'depth'],
    outputFormat: 'topicalMap',
  },
  {
    type: AgentType.SCHEMA_GENERATOR,
    name: 'Schema Generator',
    description: 'Generates structured data markup for pages',
    requiredInputs: ['pageUrl', 'contentType'],
    outputFormat: 'schemaMarkup',
  },
  {
    type: AgentType.META_OPTIMIZER,
    name: 'Meta Optimizer',
    description: 'Optimizes meta titles and descriptions for CTR',
    requiredInputs: ['pages'],
    outputFormat: 'metaSuggestions',
  },
  {
    type: AgentType.INTERNAL_LINKER,
    name: 'Internal Linker',
    description: 'Suggests internal linking opportunities between pages',
    requiredInputs: ['projectId'],
    outputFormat: 'linkSuggestions',
  },
  {
    type: AgentType.CONTENT_PLANNER,
    name: 'Content Planner',
    description: 'Creates content calendars and editorial plans',
    requiredInputs: ['topicalMapId', 'frequency'],
    outputFormat: 'contentPlan',
  },
  {
    type: AgentType.SITE_CRAWLER,
    name: 'Site Crawler',
    description: 'Crawls websites to discover pages and extract data',
    requiredInputs: ['domain', 'maxPages'],
    outputFormat: 'crawlData',
  },
  {
    type: AgentType.REPORT_GENERATOR,
    name: 'Report Generator',
    description: 'Generates comprehensive SEO reports and dashboards',
    requiredInputs: ['projectId', 'reportType'],
    outputFormat: 'report',
  },
  {
    type: AgentType.CONTENT_REFRESHER,
    name: 'Content Refresher',
    description: 'Identifies and updates stale content for freshness signals',
    requiredInputs: ['contentIds'],
    outputFormat: 'refreshSuggestions',
  },
  {
    type: AgentType.LOCAL_SEO_OPTIMIZER,
    name: 'Local SEO Optimizer',
    description: 'Optimizes for local search visibility and Google Business Profile',
    requiredInputs: ['businessInfo', 'targetLocations'],
    outputFormat: 'localSeoReport',
  },
];
