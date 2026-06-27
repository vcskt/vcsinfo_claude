# VCS Info — Monorepo Tech Consultancy Website

Nx monorepo para o site institucional/tech da **VCS Info**, consultoria especializada em Protheus (TOTVS) e Angular.

## Stack (Decidido)

- **Monorepo**: Nx v23+
- **Frontend**: Angular 19+ standalone + SSR (Angular Universal) + Tailwind CSS + Transloco (i18n PT/EN/ES)
- **Backend**: NestJS + TypeScript
- **Database**: PostgreSQL na Neon (serverless driver)
- **Auth**: Passport.js (local + Google OAuth) + JWT (httpOnly cookies)
- **Email**: Resend
- **Hosting**: Cloudflare Pages (frontend) + Node runtime (backend)
- **ORM**: Prisma @prisma/adapter-neon (serverless)
- **Segurança**: Helmet, CORS, rate limiting, CSRF protection, argon2 hashing

## Estrutura do Projeto

```
vcsinfo/
├── apps/
│   ├── web/              # Angular 19 SSR + Tailwind + Transloco
│   ├── web-e2e/          # E2E tests (Playwright)
│   ├── api/              # NestJS API
│   ├── api-e2e/          # API tests
│   └── prisma/           # Database schema + migrations
├── libs/
│   └── shared/           # DTOs, types, constants
├── .env.example          # Environment template
├── .env.local            # Local env (git-ignored)
├── tailwind.config.js    # Tailwind config (shared)
├── postcss.config.js     # PostCSS config
├── tsconfig.base.json    # Base TypeScript config
├── nx.json              # Nx workspace config
└── package.json         # Root dependencies
```

## Setup Local

### 1. Prerequisites

- Node.js 20+ (22.17.1 tested)
- npm 10+
- Git

### 2. Clone and Install

```bash
cd vcsinfo
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env.local
```

**Required vars:**
- `DATABASE_URL` — Neon PostgreSQL connection string
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — from Google Cloud Console
- `RESEND_API_KEY` — from Resend.io
- `JWT_SECRET` / `JWT_REFRESH_SECRET` — generate with: `openssl rand -base64 32`

### 4. Database Setup

```bash
npm run prisma:migrate:dev
npm run prisma:seed
```

## Development

```bash
# Terminal 1: NestJS API (port 3000)
npm run dev:api

# Terminal 2: Angular web (port 4200)
npm run dev:web
```

## Fases de Implementação

- **[x] Fase 0**: Monorepo setup, Tailwind, Transloco, Prisma
- **[ ] Fase 1**: Design system, hero landing
- **[ ] Fase 2**: Public content, SEO, leads
- **[ ] Fase 3**: Auth (signup/login, Google OAuth)
- **[ ] Fase 4**: Client portal + admin panel (PO-UI)
- **[ ] Fase 5**: Polish + Cloudflare deploy

## Build & Deploy

```bash
npm run build:api
npm run build:web
```

For Cloudflare Pages and Node runtime deployment, see docs above.

---

**Status**: Phase 0 (Setup) ✅
