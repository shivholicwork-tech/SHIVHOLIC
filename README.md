# AI SEO Agent SaaS Platform

A comprehensive AI-powered SEO analysis and optimization platform built as a modern SaaS application. Leverage artificial intelligence to analyze websites, generate content strategies, track keyword rankings, and automate SEO workflows.

## Screenshots

> Screenshots coming soon - the application is under active development.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, TailwindCSS, Radix UI, Zustand, React Query |
| Backend | NestJS 10, Passport.js, BullMQ |
| Database | PostgreSQL 15, Prisma ORM |
| Cache/Queue | Redis 7 |
| AI | OpenAI GPT-4 |
| Payments | Stripe |
| Monorepo | Turborepo, pnpm workspaces |
| Language | TypeScript 5 |

## Features

- **AI-Powered SEO Analysis** - Automated website audits using GPT-4
- **Keyword Research & Tracking** - Discover and monitor keyword rankings
- **Content Optimization** - AI-generated suggestions for content improvement
- **Technical SEO Audits** - Crawl and analyze site health
- **Competitor Analysis** - Track and compare against competitors
- **Backlink Monitoring** - Monitor your backlink profile
- **Automated Reports** - Scheduled PDF/email reports
- **Multi-tenant Architecture** - Manage multiple projects/clients
- **Role-Based Access Control** - Team collaboration with permissions
- **Subscription Management** - Stripe-powered billing with usage limits
- **Real-time Dashboards** - Live metrics and progress tracking
- **Background Job Processing** - BullMQ-powered async task execution

## Prerequisites

- **Node.js** >= 22
- **pnpm** >= 9
- **PostgreSQL** >= 15
- **Redis** >= 7

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/shivholicwork-tech/SHIVHOLIC.git
cd SHIVHOLIC
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your actual values (see [Environment Variables](#environment-variables) below).

### 4. Generate Prisma client

```bash
pnpm --filter @ai-seo/database prisma generate
```

### 5. Run database migrations

```bash
pnpm --filter @ai-seo/database prisma migrate dev
```

### 6. Start development

```bash
pnpm dev
```

The application will be available at:
- **Frontend:** http://localhost:3000
- **API:** http://localhost:3001
- **API Docs (Swagger):** http://localhost:3001/api/docs

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT access tokens | Yes | - |
| `JWT_REFRESH_SECRET` | Secret key for JWT refresh tokens | Yes | - |
| `OPENAI_API_KEY` | OpenAI API key for AI features | Yes | - |
| `STRIPE_SECRET_KEY` | Stripe secret key for payments | Yes | - |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Yes | - |
| `NEXTAUTH_SECRET` | NextAuth.js secret for session encryption | Yes | - |
| `NEXTAUTH_URL` | Base URL of the frontend app | Yes | `http://localhost:3000` |
| `REDIS_URL` | Redis connection URL | Yes | `redis://localhost:6379` |
| `REDIS_HOST` | Redis host | No | `localhost` |
| `REDIS_PORT` | Redis port | No | `6379` |
| `NEXT_PUBLIC_API_URL` | Public API URL (accessible from browser) | Yes | `http://localhost:3001/api` |

## Deployment

### Docker Deployment

The easiest way to deploy the full stack:

```bash
# Create your .env file with production values
cp .env.example .env

# Start all services
docker compose up -d

# Run database migrations
docker compose exec api npx prisma migrate deploy
```

This starts PostgreSQL, Redis, the NestJS API, and the Next.js frontend with proper networking and health checks.

To rebuild after code changes:

```bash
docker compose up -d --build
```

### Vercel Deployment (Frontend)

The frontend is optimized for Vercel deployment:

1. Import the repository in [Vercel](https://vercel.com)
2. Set the root directory to the project root
3. Vercel will automatically detect the monorepo configuration from `vercel.json`
4. Add all required environment variables in the Vercel dashboard
5. Deploy

The API backend should be deployed separately (Railway, Render, or any Docker-capable host).

### Railway Deployment

1. Create a new project on [Railway](https://railway.app)
2. Add a PostgreSQL database service
3. Add a Redis service
4. Deploy the API:
   - Connect your GitHub repo
   - Set the Dockerfile path to `apps/api/Dockerfile`
   - Add environment variables
5. Deploy the frontend:
   - Connect the same repo as another service
   - Set the Dockerfile path to `apps/web/Dockerfile`
   - Add environment variables

### Render Deployment

Use the included `render.yaml` blueprint for one-click deployment:

1. Go to [Render](https://render.com)
2. Click "New" then "Blueprint"
3. Connect your GitHub repository
4. Render will detect the `render.yaml` and create all services automatically
5. Fill in the required environment variables (OpenAI key, Stripe keys)

## Project Structure

```
SHIVHOLIC/
├── apps/
│   ├── api/                 # NestJS backend API
│   │   ├── src/
│   │   │   ├── auth/        # Authentication module (JWT, Passport)
│   │   │   ├── users/       # User management
│   │   │   ├── projects/    # SEO projects
│   │   │   ├── keywords/    # Keyword tracking
│   │   │   ├── audits/      # SEO audits
│   │   │   ├── ai-agents/   # AI agent orchestration
│   │   │   ├── billing/     # Stripe subscription management
│   │   │   └── common/      # Shared guards, decorators, pipes
│   │   ├── Dockerfile
│   │   └── package.json
│   └── web/                 # Next.js frontend
│       ├── src/
│       │   ├── app/         # Next.js App Router pages
│       │   ├── components/  # React components (UI + features)
│       │   ├── lib/         # Utilities, API client, hooks
│       │   └── stores/      # Zustand state management
│       ├── Dockerfile
│       └── package.json
├── packages/
│   ├── database/            # Prisma schema and client
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── package.json
│   └── shared/              # Shared TypeScript types and utilities
│       ├── src/
│       └── package.json
├── .github/
│   └── workflows/
│       ├── ci.yml           # CI pipeline (lint, build, test)
│       └── deploy.yml       # Docker build and push
├── docker-compose.yml       # Full stack local/production deployment
├── Dockerfile               # Multi-stage monorepo build
├── vercel.json              # Vercel deployment config
├── render.yaml              # Render.com blueprint
├── turbo.json               # Turborepo configuration
├── pnpm-workspace.yaml      # pnpm workspace config
└── package.json             # Root package.json
```

## Available Scripts

Run from the project root:

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all packages and apps |
| `pnpm lint` | Lint all packages and apps |
| `pnpm test` | Run all tests |
| `pnpm format` | Format code with Prettier |

### App-specific scripts

```bash
# API only
pnpm --filter @ai-seo/api dev
pnpm --filter @ai-seo/api build
pnpm --filter @ai-seo/api test

# Web only
pnpm --filter @ai-seo/web dev
pnpm --filter @ai-seo/web build

# Database
pnpm --filter @ai-seo/database prisma generate
pnpm --filter @ai-seo/database prisma migrate dev
pnpm --filter @ai-seo/database prisma studio
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style (Prettier + ESLint configured)
- Write tests for new features
- Use conventional commit messages (`feat:`, `fix:`, `chore:`, `docs:`)
- Ensure all checks pass before requesting review

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
