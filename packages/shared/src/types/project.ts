export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  ARCHIVED = 'ARCHIVED',
}

export enum CrawlStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum ContentStatus {
  DRAFT = 'DRAFT',
  GENERATING = 'GENERATING',
  REVIEW = 'REVIEW',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum AuditStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum IssueSeverity {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  INFO = 'INFO',
}

export interface IProject {
  id: string;
  name: string;
  domain: string;
  teamId: string;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICrawl {
  id: string;
  projectId: string;
  status: CrawlStatus;
  pagesFound: number;
  pagesCrawled: number;
  startedAt: Date;
  completedAt: Date | null;
}

export interface IPage {
  id: string;
  projectId: string;
  crawlId: string;
  url: string;
  title: string | null;
  metaDescription: string | null;
  statusCode: number;
  contentHash: string | null;
}

export interface IKeyword {
  id: string;
  projectId: string;
  keyword: string;
  searchVolume: number | null;
  difficulty: number | null;
  clusterId: string | null;
}

export interface IKeywordCluster {
  id: string;
  projectId: string;
  name: string;
  primaryKeywordId: string | null;
}

export interface IContent {
  id: string;
  projectId: string;
  title: string;
  body: string;
  status: ContentStatus;
  targetKeywordId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITopicalMap {
  id: string;
  projectId: string;
  name: string;
  createdAt: Date;
}

export interface ITopicalMapNode {
  id: string;
  topicalMapId: string;
  parentId: string | null;
  title: string;
  type: string;
}

export interface IBacklink {
  id: string;
  projectId: string;
  sourceUrl: string;
  targetUrl: string;
  anchorText: string | null;
  domainAuthority: number | null;
  firstSeenAt: Date;
  lastSeenAt: Date;
}

export interface IRanking {
  id: string;
  keywordId: string;
  position: number;
  url: string;
  checkedAt: Date;
}

export interface IReport {
  id: string;
  projectId: string;
  type: string;
  data: Record<string, unknown>;
  createdAt: Date;
}

export interface IAudit {
  id: string;
  projectId: string;
  status: AuditStatus;
  score: number | null;
  startedAt: Date;
  completedAt: Date | null;
}

export interface IAuditIssue {
  id: string;
  auditId: string;
  pageId: string | null;
  type: string;
  severity: IssueSeverity;
  message: string;
  recommendation: string | null;
}
