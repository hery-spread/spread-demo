# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Spread** - SaaS influencer marketing platform for discovering, analyzing, and managing Instagram/YouTube/TikTok influencers.

**Stack:** Next.js 15 (App Router) + React 18 + TypeScript + Tailwind CSS 4 + Supabase Cloud (planned)

**Current State:** Advanced prototype with mock data + production-ready Modash API integration layer.

## Commands

### Development
```bash
npm run dev                          # Dev server (Turbopack)
npm run build                        # Production build
npm run lint                         # ESLint check
npm run lint:fix                     # Auto-fix
npm run format                       # Prettier format
npm run lint && npm run build        # Validate before commit
```

### Supabase Cloud (Never Local)
```bash
# Generate types from Supabase schema
npx supabase gen types typescript --project-id tjxkquzguhbbqyoumdom --schema public > src/lib/types/database-generated.ts

# Migrations
supabase migration new <name>
supabase db push
```

## Architecture

### Type System (3-Tier Hierarchy)

1. **`src/lib/types/database-generated.ts`** - Auto-generated Supabase types (SOURCE OF TRUTH)
   - Never modify manually, regenerate after schema changes

2. **`src/types/index.ts`** (1,972 lines) - Application types
   - Core: `Influencer`, `InfluencerList`, `Campaign`, `UserAccount`
   - Features: `AdvancedSearchFilters`, `SharedReport`, `CampaignTracker`
   - Modash API types
   - Create composite types here by combining DB types

3. **`src/types/communication.ts`** - Email/communication types

**Rules:** No `any`/`unknown` without justification. Prefer Supabase native types (uuid, jsonb, timestamp with time zone).

### Data Flow

```
Page → Hook → Service Layer → Cache → API/Mock
```

**State:** React Context (`I18nProvider`, `CommunicationContext`) + custom hooks (no Redux/Zustand)

### Critical Structure

```
src/
├── app/               # Next.js pages (App Router)
├── components/        # 98 components
│   ├── ui/           # Base primitives (Button, Input, Table, etc.)
│   ├── search/       # 15 search filter components
│   ├── campaigns/    # 13 campaign tracking components
│   └── [feature]/    # Domain components
├── hooks/            # useSearch, useLists, useCredits, useCRM, useEmailIntegration
├── lib/
│   ├── modash/      # 2,782 lines - Modash API integration
│   │   ├── search.ts       # Search & reports (665 lines)
│   │   ├── reports.ts      # Report transformers (444 lines)
│   │   ├── cache.ts        # LFU caching (380 lines)
│   │   ├── dictionaries.ts # Lookup data (661 lines)
│   │   └── errors.ts       # Error handling (546 lines)
│   ├── i18n/        # Internationalization (fr/en/nl)
│   ├── mockData.ts  # Development mock data
│   └── utils.ts
└── types/           # TypeScript definitions
```

## Modash API Integration (`/src/lib/modash/`)

**Features:**
- Dual-mode: Auto-switches between mock (dev) and real API (prod)
- Intelligent caching: LFU eviction with priority scoring
- Automatic error fallbacks

**Cache Config:**
```
searchCache:      500 entries, 15min TTL   (0.01 credit/result)
profileCache:     200 entries, 60min TTL   (1 credit/report)
dictionaryCache:  100 entries, 24h TTL     (static data)
performanceCache: 300 entries, 30min TTL
```

**Key Functions:**
```typescript
searchInfluencers(platform, filters) → ModashSearchResponse
getEnhancedInfluencerReport(platform, userId) → InfluencerDetails
getLanguages() | getLocations() | getInterests() | getBrands()
getPerformanceData(platform, url)
searchByEmail(emails: string[])
getAudienceOverlap(platform, influencers)
```

## Multi-Platform Search

**Platforms:** Instagram (main), YouTube, TikTok

**4-Category Filter System:**

1. **Creator/Identity** (`CreatorFiltersCard.tsx`)
   - Thematic: keywords, bio, hashtags, mentions
   - Demographics: gender, age
   - Geography: country, city
   - Flags: verified, has_email, account_type

2. **Audience** (`AudienceFiltersCard.tsx`)
   - Location (weighted), demographics, interests, credibility, language

3. **Performance** (`PerformanceFiltersCard.tsx`)
   - Followers, engagement rate, views, likes/comments/shares, contactability

4. **Growth** (`GrowthSponsoringFiltersCard.tsx`)
   - Growth rates (1mo-1yr), account age, trend classification

**Search Modes:**
```
/app/search/page.tsx                    # Standard
/app/search/business-dna/page.tsx       # Website → influencer matching
/app/search/from-campaign/page.tsx      # Find similar creators
/app/ai-search/page.tsx                 # Natural language
```

## Key Features

### Credit/Quota System (`useCredits.ts`)
```typescript
unlock_report: 1 credit   // Full influencer report
search: 5 credits         // Advanced search
export_detailed: 1 credit // Detailed export
```

### Campaign Tracking
**Hierarchy:** Campaign → Folders → Creators → Content (posts/reels/stories)

**Metrics:** Content counts, engagement (likes/comments/views/ER), performance (CPM/CPC/ROI/ROAS/EMV), budget tracking

**Auto-Import:** Apify integration for scraping Instagram/TikTok content

### Sharing System (3 Types)

1. **Profile Reports** (`/app/share/[shareId]/`) - Password protection, audience visibility control
2. **Campaign Reports** (`/app/share/campaign/[shareId]/`) - **Granular metrics visibility** (hide budgets/costs/ROI selectively)
3. **List Voting** (`/app/share/list/[shareId]/`) - Collect votes (Go/No Go/Discuss), view results at `/app/lists/[id]/share-results/`

### Communication System

**Channels:** Email (primary), Phone, LinkedIn, Instagram DM (planned)

**Email Types:**
- Single: One-off emails
- Bulk: Multiple contacts with variable substitution (`{{name}}`, `{{username}}`)
- Sequential: Multi-step drip campaigns with conditional logic

**Components:**
- `CommunicationHub.tsx` - Inbox
- `ThreadViewer.tsx` - Conversations
- `UnifiedEmailModal.tsx` - Composer
- `EmailIntegrationWidget.tsx` - Gmail/Outlook OAuth (planned)

### i18n (`/src/lib/i18n/`)
```typescript
const { t } = useI18n(); // Languages: fr (default), en, nl
t('feature.component.element')
t('campaign.stats.creators', { count: 5 }) // → "5 créateurs"
```

## Development Patterns

### Adding Features
1. Define types in `/src/types/index.ts`
2. Create hook in `/src/hooks/useFeature.ts`
3. Build components in `/src/components/feature/`
4. Create page in `/src/app/feature/page.tsx`

### Filter Pattern (Consistent Across Search)
```typescript
const [filters, setFilters] = useState<AdvancedSearchFilters>({});
const updateFilter = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));
<FilterCard filters={filters} onFilterChange={updateFilter} />
```

### Naming Conventions
- **Files:** PascalCase components (`SearchFilters.tsx`), camelCase hooks/utils (`useSearch.ts`)
- **Functions:** PascalCase components, camelCase hooks, `handle`/`on` prefix for handlers
- **CSS:** Tailwind + `cn()` utility for conditional classes

### Path Aliases
```typescript
import { Button } from '@/components/ui';
import { searchInfluencers } from '@/lib/modash';
import type { Influencer } from '@/types';
```

## Cursor Rules (`.cursor/rules/`)

### `develop.mdc`
- DRY & KISS, type-first, TODO-driven
- Run `npm run lint && npm run build` after changes
- Check `/DESIGN/` before new components
- Read migrations before DB changes
- Always Supabase Cloud (never local)

### `implement.mdc`
- Follow TODO blueprints exactly
- Build never breaks: must pass lint & build
- Debug mode: 3 fix attempts before escalating
- Type hierarchy: DB types → views → forms

## Data Relationships
```
Search → Lists → Campaigns → Content
```

## Migration Path (Mock → Production)

**Current:** `/src/lib/mockData.ts` with 2,000+ profiles + Modash API fallback

**Production:**
1. Supabase: Set env vars, create schema, run migrations, generate types
2. Modash: Set `NEXT_PUBLIC_MODASH_API_KEY`, remove demo-key condition from `/src/lib/modash/search.ts:135`
3. Email: Configure OAuth, update `/src/hooks/useEmailIntegration.ts`
4. Payments: Stripe integration for credits

## Common Tasks

**Add Search Filter:**
1. Update `AdvancedSearchFilters` in `/src/types/index.ts`
2. Add to filter card in `/src/components/search/`
3. Update `transformAdvancedFiltersToModash` in `/src/lib/modash/search.ts`
4. Update `applyFilters` in `/src/lib/mockData.ts`
5. Add translations (fr/en/nl)

**Add Campaign Metric:**
1. Update `Campaign`/`CampaignAnalytics` type
2. Update campaign components
3. Add to export + `MetricsVisibilityConfig` (if hideable)
4. Add calculation logic

**Add Platform:**
1. Create types, add tab, create filters
2. Update Modash integration + transformers
3. Update discriminated unions

## Critical Rules

- Never modify `database-generated.ts` (regenerate only)
- Always Supabase Cloud
- Validate: `npm run lint && npm run build`
- Check design system before new components
- Read migration history
- Respect type hierarchy
- No `any` without justification
- Most components need `'use client'`
- Mock data in dev, real APIs in prod
