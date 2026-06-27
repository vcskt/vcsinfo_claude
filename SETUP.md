# Setup Detalhado — VCS Info Monorepo

Instruções passo-a-passo para configurar o ambiente de desenvolvimento local e produção.

## 1️⃣ Setup Local (Desenvolvimento)

### Prerequisites

```bash
# Check versions (Node 20+ required)
node --version    # v22.17.1+
npm --version     # 10.0.0+
```

### 1.1 Install Dependencies

```bash
cd vcsinfo
npm install
```

### 1.2 Configure Environment

```bash
# Create .env.local from template
cp .env.example .env.local
```

Edit `.env.local` and fill:

```env
# Use local PostgreSQL or Neon dev database
DATABASE_URL="postgresql://user:password@localhost/vcsinfo"

# Get from Google Cloud Console
GOOGLE_CLIENT_ID="xxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="xxx"
GOOGLE_CALLBACK_URL="http://localhost:3000/api/auth/google/callback"

# Get from Resend.io
RESEND_API_KEY="re_xxx"
RESEND_FROM_EMAIL="noreply@localhost"

# Generate with: openssl rand -base64 32
JWT_SECRET="xxxxx-min-32-chars"
JWT_REFRESH_SECRET="xxxxx-min-32-chars"
```

### 1.3 Database Setup (Local PostgreSQL)

**Option A: Local PostgreSQL**

```bash
# macOS (brew)
brew install postgresql
brew services start postgresql

# Create database
createdb vcsinfo

# Run migrations
npm run prisma:migrate:dev

# Seed sample data
npm run prisma:seed

# View data in Prisma Studio
npm run prisma:studio
```

**Option B: Docker Compose** (recommended)

```bash
docker-compose up -d

npm run prisma:migrate:dev
npm run prisma:seed
```

### 1.4 Start Development Servers

**Terminal 1 — NestJS API (port 3000)**

```bash
npm run dev:api
```

Expected output:
```
[Nest] 12345 - 06/26/2026, 1:00:00 PM     LOG [NestFactory] Starting Nest application...
[Nest] 12345 - 06/26/2026, 1:00:00 PM     LOG [InstanceLoader] AppModule dependencies initialized
[Nest] 12345 - 06/26/2026, 1:00:00 PM     LOG [RoutesResolver] AppController {/api}:
```

**Terminal 2 — Angular Web (port 4200)**

```bash
npm run dev:web
```

Access: http://localhost:4200

---

## 2️⃣ Google OAuth Setup

### 2.1 Create OAuth Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Choose **Web application**
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/google/callback` (local)
   - `http://localhost:4200/callback` (Angular redirect)
   - `https://vcsinfo.com.br/api/auth/google/callback` (production)
7. Copy **Client ID** and **Client Secret** to `.env.local`

### 2.2 Test OAuth Flow

1. Start dev servers
2. Go to http://localhost:4200/login
3. Click "Entrar com Google"
4. Complete OAuth flow
5. Should redirect to client dashboard

---

## 3️⃣ Neon Database Setup (Production)

### 3.1 Create Neon Project

1. Sign up at [neon.tech](https://neon.tech)
2. Create project
3. Create database (default: `neondb`)
4. Enable **serverless driver** in project settings

### 3.2 Get Connection String

In Neon dashboard:
1. Go to **Connection string**
2. Choose **Neon serverless driver**
3. Copy connection string (includes `?sslmode=require`)

### 3.3 Update Environment

```env
DATABASE_URL="postgresql://user:password@ep-xxxxx.neon.tech/neondb?sslmode=require"
```

### 3.4 Run Migrations on Neon

```bash
# Ensure .env points to Neon
DATABASE_URL="postgres://..." npm run prisma:migrate:prod
```

---

## 4️⃣ Resend Email Setup

### 4.1 Create Resend Account

1. Go to [resend.io](https://resend.io)
2. Create account
3. Go to **API Keys** and create new key
4. Copy to `.env.local`: `RESEND_API_KEY=re_xxx`

### 4.2 Verify Domain

1. In Resend dashboard, go to **Domains**
2. Add your domain: `vcsinfo.com.br`
3. Add SPF and DKIM records to your DNS:
   ```dns
   SPF: v=spf1 include:sendingdomain.resend.dev ~all
   DKIM: (provided by Resend)
   ```
4. Wait for DNS propagation (up to 24h)

### 4.3 Test Email

```bash
# In NestJS controller or script
const response = await resend.emails.send({
  from: 'noreply@vcsinfo.com.br',
  to: 'test@example.com',
  subject: 'Test',
  html: '<h1>Hello</h1>',
});
```

---

## 5️⃣ Build & Deploy

### 5.1 Build for Production

```bash
# Build API
npm run build:api

# Build Angular with SSR
npm run build:web
```

### 5.2 Deploy to Cloudflare Pages (Frontend)

```bash
# Install Wrangler
npm install -g wrangler

# Deploy
wrangler pages deploy dist/apps/web --project-name=vcsinfo

# Or with environment
wrangler pages deploy dist/apps/web --project-name=vcsinfo --env=production
```

### 5.3 Deploy Backend (NestJS)

**Option A: Railway**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway up
```

**Option B: Render**

1. Push code to GitHub
2. Create new Web Service on [render.com](https://render.com)
3. Connect GitHub repo
4. Set build: `npm run build:api`
5. Set start: `node dist/apps/api/main.js`
6. Add env vars from `.env.example`

**Option C: Fly.io**

```bash
# Install Fly CLI
curl https://fly.io/install.sh | sh

fly auth login
fly launch --name vcsinfo-api
fly deploy
```

---

## 6️⃣ Troubleshooting

### Database Connection Error

```bash
# Check connection string
echo $DATABASE_URL

# Verify Neon serverless driver enabled
# In Neon dashboard → Project settings → Serverless driver
```

### Google OAuth Redirect URI Mismatch

```
Error: redirect_uri_mismatch
```

**Solution**: Ensure redirect URI in Google Console **exactly** matches:
- Local: `http://localhost:3000/api/auth/google/callback`
- Prod: `https://vcsinfo.com.br/api/auth/google/callback`

### Email Not Sending

```bash
# Check Resend API key
echo $RESEND_API_KEY

# Verify domain SPF/DKIM records
dig vcsinfo.com.br TXT | grep spf
```

### Prisma Migration Error

```bash
# Reset database (WARNING: data loss)
npm run prisma:migrate:reset

# Or manually in Neon console:
DROP DATABASE neondb;
CREATE DATABASE neondb;
```

---

## 🚀 Quick Start Summary

```bash
# 1. Install
npm install

# 2. Configure
cp .env.example .env.local
# Edit .env.local with your values

# 3. Database
npm run prisma:migrate:dev
npm run prisma:seed

# 4. Develop
npm run dev:api &  # Terminal 1
npm run dev:web    # Terminal 2

# 5. Access
# API: http://localhost:3000
# Web: http://localhost:4200
# Prisma Studio: npm run prisma:studio
```

---

**Next**: Proceed to Phase 1 (Design System + Hero Landing)
