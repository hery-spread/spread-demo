# Share Campaign Page

## Icons Used

### From @heroicons/react/24/outline
- `ShareIcon` - Agency logo (w-11 h-11, w-8 h-8 footer)
- `UserGroupIcon` - Creators section header (w-5 h-5)
- `HeartIcon` - Engagement metrics (w-5 h-5, w-5 h-5 red)
- `EyeIcon` - Impressions/views (w-5 h-5)
- `CalendarDaysIcon` - Campaign dates (w-5 h-5)
- `CurrencyEuroIcon` - Cost metrics (w-5 h-5)
- `VideoCameraIcon` - Video/reels metrics (w-5 h-5)
- `PhotoIcon` - Posts/content count (w-5 h-5)
- `FireIcon` - Stories metric (w-5 h-5)
- `TrophyIcon` - ER/performance metrics (w-5 h-5)
- `BanknotesIcon` - Revenue/EMV (w-3 h-3, w-5 h-5)
- `CursorArrowRaysIcon` - Clicks/interactions (w-3 h-3, w-5 h-5)
- `UsersIcon` - Creators/reach metrics (w-5 h-5)
- `ChatBubbleLeftIcon` - Comments (w-5 h-5, w-4 h-4)
- `Cog6ToothIcon` - Customization button (w-6 h-6)
- `ArrowDownTrayIcon` - Export PDF (w-4 h-4)
- `ShoppingCartIcon` - Sales count (w-3 h-3, w-5 h-5)
- `ChartBarIcon` - Results section header (w-5 h-5)

### From @heroicons/react/24/solid
- `PlayCircleIconSolid` - Campaign status badge (w-6 h-6)

## React Hooks Used
- `useState` - Managing campaign data, loading, views, selections, customization
- `useEffect` - Loading campaign data and customization settings from localStorage
- `useParams` - Getting shareId from URL

## Next.js Components Used
- `notFound()` - 404 redirect for invalid shares

## Custom Components Used
- `Button` - Export PDF action
- `ContentGrid` - Display published content grid
- `CreatorDetailView` - Individual creator detailed view
- `ContentDetailView` - Individual content detailed view

## Types Used
- `CampaignTracker` - Main campaign data structure
- `SharedCampaign` - Share metadata and permissions
- `MetricsVisibilityConfig` - Controls which metrics are visible
- `DEFAULT_METRICS_VISIBILITY` - Default visibility configuration
- `ViewType` - 'global' | 'creator' | 'content'
- `ContentItem` - Content metadata for grid
- `CampaignCustomizationSettings` - Branding customization

## Functions Used
- `generateMockContents(campaign)` - Generates mock content items from creators
- `getSharedCampaign(shareId)` - Fetches campaign and share data
- `formatNumber(num)` - Formats numbers to K/M notation
- `formatCurrency(amount)` - Formats euros with Intl.NumberFormat

## Page Structure

### 1. Header Section (Branding)
```tsx
<div className="bg-white shadow-sm border-b border-gray-200 animate-fadeInDown">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Agency Logo Circle (w-20 h-20, gradient background) */}
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl"
           style={{ background: gradient }}>
        <ShareIcon className="w-11 h-11 text-white" />
      </div>

      {/* Agency Name */}
      <h1 className="text-2xl font-bold text-gray-900">
        {customization.agencyName}
      </h1>

      {/* Actions & Stats */}
      <div className="flex items-center space-x-4 pt-2">
        <Button onClick={handleExportPDF} variant="outline" className="no-print">
          <ArrowDownTrayIcon className="w-4 h-4" />
          <span>Exporter en PDF</span>
        </Button>
        <p className="text-sm text-gray-500">
          {shareData.viewCount} vues • Partagé le {date}
        </p>
      </div>
    </div>
  </div>
</div>
```

### 2. Campaign Hero Banner
```tsx
<div className="rounded-2xl p-8 shadow-lg border border-gray-200/50 text-white animate-fadeInUp"
     style={{ background: gradient }}>
  {/* Status Badge */}
  <div className="flex items-center space-x-3 mb-4">
    <PlayCircleIconSolid className="w-6 h-6" />
    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
      Active
    </span>
  </div>

  {/* Campaign Title & Description */}
  <h2 className="text-4xl font-bold mb-3">{campaign.name}</h2>
  <p className="text-xl text-white/90 mb-6">{campaign.description}</p>

  {/* Campaign Stats Row */}
  <div className="flex items-center space-x-8 text-white/95">
    <div className="flex items-center space-x-2">
      <CalendarDaysIcon className="w-5 h-5" />
      <span>Créée le {date}</span>
    </div>
    <div className="flex items-center space-x-2">
      <UserGroupIcon className="w-5 h-5" />
      <span className="font-semibold">{campaign.creators.length}</span> créateurs
    </div>
    <div className="flex items-center space-x-2">
      <PhotoIcon className="w-5 h-5" />
      <span className="font-semibold">{contents.length}</span> contenus
    </div>
  </div>
</div>
```

### 3. Creators Section (Clickable Cards)
```tsx
{visibility.sections.creators && (
  <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
      <UserGroupIcon className="w-5 h-5" />
      <span>Créateurs</span>
    </h2>

    <div className="space-y-4">
      {campaign.creators.map((creator) => (
        <div onClick={() => handleCreatorClick(creator)}
             className="bg-white border-2 border-gray-200 rounded-xl p-4 cursor-pointer
                        transition-all duration-300 hover:border-purple-500
                        hover:translate-x-2 hover:shadow-lg group">
          <div className="flex items-center justify-between">
            {/* Creator Avatar Circle (w-14 h-14, gradient) */}
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-14 h-14 rounded-full" style={{ background: gradient }}>
                {creator.influencerName.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                {/* Username & Stats */}
                <div className="text-lg font-bold text-gray-900">
                  @{creator.influencerUsername}
                </div>
                <div className="text-sm text-gray-600">
                  {creatorContents.length} contenu(s) • {formatNumber(totalLikes)} likes • {er.toFixed(2)}% ER
                </div>

                {/* ROI/Sales Data (conditional) */}
                {(creator.clicks || creator.salesCount || creator.salesRevenue) && (
                  <div className="flex items-center space-x-3 mt-2 text-xs">
                    <span className="flex items-center text-blue-600">
                      <CursorArrowRaysIcon className="w-3 h-3 mr-1" />
                      {formatNumber(creator.clicks)} clics
                    </span>
                    <span className="flex items-center text-green-600">
                      <ShoppingCartIcon className="w-3 h-3 mr-1" />
                      {creator.salesCount} ventes
                    </span>
                    <span className="flex items-center text-green-700 font-semibold">
                      <BanknotesIcon className="w-3 h-3 mr-1" />
                      {formatCurrency(creator.salesRevenue)}
                    </span>
                    <span className={creatorRoi > 0 ? 'text-green-600' : 'text-red-600'}>
                      ROI: {creatorRoi.toFixed(0)}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Chevron Arrow (animated on hover) */}
            <svg className="w-6 h-6 text-gray-300 transition-all group-hover:text-purple-500 group-hover:translate-x-1" />
          </div>
        </div>
      ))}
    </div>
  </div>
)}
```

### 4. Results & ROI Section (Conditional)
```tsx
{(() => {
  const totalClicks = /* sum of all creator clicks */;
  const totalSales = /* sum of all creator sales */;
  const totalRevenue = /* sum of all creator revenue */;
  const totalCreatorCost = /* sum of all creator costs */;
  const globalRoi = ((totalRevenue - totalCreatorCost) / totalCreatorCost) * 100;
  const globalConversionRate = (totalSales / totalClicks) * 100;
  const hasResults = totalClicks > 0 || totalSales > 0 || totalRevenue > 0;

  if (!hasResults) return null;

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <ChartBarIcon className="w-5 h-5" />
        <span>Résultats & ROI</span>
      </h2>

      {/* Metrics Grid (2-5 columns) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {/* Total Clicks */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <CursorArrowRaysIcon className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-2xl font-bold text-gray-900">
              {formatNumber(totalClicks)}
            </span>
          </div>
          <p className="text-sm text-gray-600">Total clics</p>
        </div>

        {/* Total Sales */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <ShoppingCartIcon className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-2xl font-bold text-gray-900">{totalSales}</span>
          </div>
          <p className="text-sm text-gray-600">Total ventes</p>
        </div>

        {/* Total Revenue */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <BanknotesIcon className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-2xl font-bold text-green-600">
              {formatCurrency(totalRevenue)}
            </span>
          </div>
          <p className="text-sm text-gray-600">Revenus générés</p>
        </div>

        {/* Conversion Rate */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <TrophyIcon className="w-5 h-5 text-purple-500 mr-2" />
            <span className="text-2xl font-bold text-purple-600">
              {globalConversionRate.toFixed(1)}%
            </span>
          </div>
          <p className="text-sm text-gray-600">Taux de conversion</p>
        </div>

        {/* Global ROI */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <CursorArrowRaysIcon className="w-5 h-5 text-orange-500 mr-2" />
            <span className={`text-2xl font-bold ${globalRoi > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {globalRoi.toFixed(0)}%
            </span>
          </div>
          <p className="text-sm text-gray-600">ROI Global</p>
        </div>
      </div>

      {/* ROI Progress Bar */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Performance ROI</span>
          <span className={globalRoi > 0 ? 'text-green-600' : 'text-red-600'}>
            {globalRoi > 0 ? '+' : ''}{globalRoi.toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className={`h-3 rounded-full transition-all duration-500 ${
            globalRoi > 100 ? 'bg-green-500' : globalRoi > 0 ? 'bg-green-400' : 'bg-red-400'
          }`}
          style={{ width: `${Math.min(Math.abs(globalRoi), 200) / 2}%` }} />
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>Investissement: {formatCurrency(totalCreatorCost)}</span>
          <span>Revenus: {formatCurrency(totalRevenue)}</span>
        </div>
      </div>
    </div>
  );
})()}
```

### 5. Content Section
```tsx
{visibility.sections.content && (
  <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
    <h2 className="text-lg font-bold text-gray-900 mb-6">Content</h2>

    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      {/* Creators Posted */}
      {visibility.metrics.creatorsPosted && (
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <UsersIcon className="w-5 h-5 text-gray-400 mr-2" />
            <div>
              <span className="text-2xl font-bold text-gray-900">
                {campaign.analytics.content.creatorsPosted}
              </span>
              <span className="text-gray-500 ml-1">
                / {campaign.analytics.content.totalCreators}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600">Creators posted</p>
        </div>
      )}

      {/* Total Posts, Reels, Stories, Content - Similar pattern */}
    </div>
  </div>
)}
```

### 6. Engagement Section
```tsx
{visibility.sections.engagement && (
  <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
    <h2 className="text-lg font-bold text-gray-900 mb-6">
      Notoriété & engagement
    </h2>

    {/* Main Metrics Grid (2-6 columns) */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
      {/* Total Engagements, Average ER, Impressions, Reach, Likes, Comments */}
      {/* Each follows the same pattern as Content section */}
    </div>

    {/* Secondary Metrics (1-3 columns) */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Views, Average Video ER, Total EMV */}
    </div>
  </div>
)}
```

### 7. Performance Section
```tsx
{visibility.sections.performance && (
  <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
    <h2 className="text-lg font-bold text-gray-900 mb-6">Performance</h2>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {/* Total Creator Cost, CPM, ROAS, ROI */}
      {/* Each metric conditionally rendered based on visibility config */}
    </div>
  </div>
)}
```

### 8. Published Contents Section
```tsx
{visibility.sections.publishedContents && (
  <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
      <PhotoIcon className="w-5 h-5" />
      <span>Contenus Publiés</span>
    </h2>
    <ContentGrid contents={contents} onContentClick={handleContentClick} />
  </div>
)}
```

### 9. Footer
```tsx
<div className="bg-gray-900 text-white py-8 mt-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-center space-x-3 mb-3">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
           style={{ background: gradient }}>
        <span className="text-sm font-bold">S</span>
      </div>
      <span className="text-gray-400">Powered by Spread</span>
    </div>
    <p className="text-gray-400 text-center text-sm">
      Rapport de campagne généré le {new Date().toLocaleDateString('fr-FR')}
    </p>
  </div>
</div>
```

### 10. Floating Customization Button
```tsx
<button onClick={() => setShowCustomizationModal(true)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full shadow-2xl
                   flex items-center justify-center transition-all duration-300
                   hover:scale-110 hover:rotate-90 z-50 no-print"
        style={{ background: gradient }}>
  <Cog6ToothIcon className="w-6 h-6 text-white" />
</button>
```

## View Types & Navigation

### Global View (Default)
- Campaign hero banner
- All sections (based on visibility config)
- Clickable creator cards
- Clickable content grid

### Creator Detail View
```tsx
{activeView === 'creator' && selectedCreator && (
  <CreatorDetailView
    creator={selectedCreator}
    contents={filteredContents}
    onBack={handleBackToGlobal}
    onContentClick={handleContentClick}
    primaryColor={customization.primaryColor}
    secondaryColor={customization.secondaryColor}
  />
)}
```

### Content Detail View
```tsx
{activeView === 'content' && selectedContent && (
  <ContentDetailView
    content={selectedContent}
    onBack={handleBackFromContent}
    primaryColor={customization.primaryColor}
    secondaryColor={customization.secondaryColor}
  />
)}
```

## Customization System

### Settings Storage
```typescript
interface CampaignCustomizationSettings {
  primaryColor: string;      // Default: '#667eea'
  secondaryColor: string;    // Default: '#764ba2'
  agencyName: string;        // Default: "Nom de l'Agence"
}

// Loaded from localStorage on mount
useEffect(() => {
  const saved = localStorage.getItem('campaignReportSettings');
  if (saved) {
    setCustomization(JSON.parse(saved));
  }
}, []);

// Saved on apply
const handleCustomizationApply = (settings) => {
  setCustomization(settings);
  localStorage.setItem('campaignReportSettings', JSON.stringify(settings));
};
```

### Gradient Usage
```tsx
// Applied to:
// - Agency logo circle
// - Campaign hero banner
// - Creator avatar circles
// - Floating customization button
// - Footer "S" logo

style={{
  background: `linear-gradient(135deg, ${customization.primaryColor} 0%, ${customization.secondaryColor} 100%)`
}}
```

## Metrics Visibility Control

### Sections
- `creators` - Creators section
- `content` - Content metrics section
- `engagement` - Notoriété & engagement section
- `performance` - Performance/financial section
- `publishedContents` - Content grid section

### Individual Metrics
```typescript
visibility.metrics.creatorsPosted
visibility.metrics.totalPosts
visibility.metrics.totalReels
visibility.metrics.totalStories
visibility.metrics.totalContent
visibility.metrics.totalEngagements
visibility.metrics.averageER
visibility.metrics.totalImpressions
visibility.metrics.totalReach
visibility.metrics.totalLikes
visibility.metrics.totalComments
visibility.metrics.totalViews
visibility.metrics.averageVideoER
visibility.metrics.totalEMV
visibility.metrics.totalCreatorCost
visibility.metrics.averageCPM
visibility.metrics.roas
visibility.metrics.roi
```

## Export to PDF

### Implementation
```typescript
const handleExportPDF = () => {
  // 1. Hide no-print elements
  const floatingElements = document.querySelectorAll('.no-print');
  floatingElements.forEach((el) => {
    (el as HTMLElement).style.display = 'none';
  });

  // 2. Trigger browser print dialog
  window.print();

  // 3. Restore elements after 1s
  setTimeout(() => {
    floatingElements.forEach((el) => {
      (el as HTMLElement).style.display = '';
    });
  }, 1000);
};
```

### Elements Excluded from Print
- Export PDF button (`.no-print`)
- Floating customization button (`.no-print`)

## Loading State
```tsx
{loading && (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100
                  flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
  </div>
)}
```

## Data Flow

1. Extract `shareId` from URL params via `useParams()`
2. Load customization settings from `localStorage`
3. Fetch campaign data via `getSharedCampaign(shareId)`
4. Generate mock contents via `generateMockContents(campaign)`
5. Calculate aggregated metrics:
   - Total clicks, sales, revenue per creator
   - Global ROI and conversion rate
   - Engagement rate per creator
6. Render sections based on `visibility` config
7. Handle navigation:
   - Creator click → Creator detail view
   - Content click → Content detail view
   - Back buttons → Global view

## Mock Data Structure

### Campaign Data
```typescript
{
  campaign: CampaignTracker {
    id, name, description, trackingConfig,
    startDate, endDate,
    creators: [{
      influencerId, influencerName, influencerUsername,
      platform, expectedPosts, deliveredPosts,
      costPerCreator, status, contractedAt,
      clicks?, salesCount?, salesRevenue?
    }],
    analytics: { content, engagement, reach, performance, financials },
    status, totalBudget, spentBudget
  },
  shareData: SharedCampaign {
    id, campaignId, shareType, createdAt, viewCount,
    includeFinancials, includeBudgets, trackingEnabled,
    metricsVisibility?: MetricsVisibilityConfig
  }
}
```

### Generated Contents
```typescript
generateMockContents(campaign) → ContentItem[] {
  id: 'content_{creatorId}_{index}',
  creatorName, creatorUsername, creatorAvatar,
  contentType: 'reel' | 'post' | 'story',
  thumbnail: 'https://picsum.photos/400/400?random=...',
  publishedAt: ISO date string,
  likes: random 500-5500,
  comments: random 10-210,
  views: random 5000-55000,
  url: 'https://www.instagram.com/p/example...'
}
```

## Color Coding

### Section Backgrounds
- All sections: `bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm`
- Campaign hero: Custom gradient background
- Footer: `bg-gray-900 text-white`

### Metric Colors
| Metric | Icon Color | Text Color |
|--------|-----------|-----------|
| Clicks | `text-blue-500` | `text-blue-600` |
| Sales | `text-green-500` | `text-green-600` |
| Revenue | `text-green-500` | `text-green-600/700` |
| Conversion | `text-purple-500` | `text-purple-600` |
| ROI (positive) | `text-orange-500` | `text-green-600` |
| ROI (negative) | - | `text-red-600` |
| Engagement | `text-gray-400` | `text-gray-900` |
| Reach/Views | `text-gray-400` | `text-gray-900` |
| EMV | `text-green-400` | `text-gray-900` |
| Cost | `text-gray-400` | `text-gray-900` |

### Interactive Elements
- Creator cards hover: `hover:border-purple-500 hover:translate-x-2 hover:shadow-lg`
- Chevron hover: `group-hover:text-purple-500 group-hover:translate-x-1`
- Customization button: `hover:scale-110 hover:rotate-90`

## Animations
- Header: `animate-fadeInDown`
- Hero banner: `animate-fadeInUp`
- All sections: `animate-fadeInUp`
- Loading spinner: `animate-spin`
- ROI progress bar: `transition-all duration-500`
- Transitions: `transition-all duration-300`

## Page Layout
```
└─ div.min-h-screen.bg-gradient-to-br
   ├─ Header (branding + actions)
   ├─ Main Content (max-w-7xl mx-auto)
   │  ├─ Global View (default)
   │  │  ├─ Campaign Hero Banner
   │  │  ├─ Creators Section (clickable cards)
   │  │  ├─ Results & ROI Section (conditional)
   │  │  ├─ Content Section
   │  │  ├─ Engagement Section
   │  │  ├─ Performance Section
   │  │  └─ Published Contents (grid)
   │  ├─ Creator Detail View (when creator selected)
   │  └─ Content Detail View (when content selected)
   ├─ Footer (powered by Spread)
   └─ Floating Customization Button (fixed bottom-right)
```

## ROI Calculation Logic

### Per Creator
```typescript
const creatorRoi = creator.salesRevenue && creator.costPerCreator > 0
  ? ((creator.salesRevenue - creator.costPerCreator) / creator.costPerCreator) * 100
  : null;
```

### Global
```typescript
const totalRevenue = campaign.creators.reduce((sum, c) => sum + (c.salesRevenue || 0), 0);
const totalCreatorCost = campaign.creators.reduce((sum, c) => sum + c.costPerCreator, 0);
const globalRoi = totalRevenue > 0 && totalCreatorCost > 0
  ? ((totalRevenue - totalCreatorCost) / totalCreatorCost) * 100
  : null;
```

## Engagement Rate Calculation

```typescript
// Per creator
const creatorContents = contents.filter(c => c.creatorUsername === creator.influencerUsername);
const totalLikes = creatorContents.reduce((sum, c) => sum + c.likes, 0);
const totalComments = creatorContents.reduce((sum, c) => sum + c.comments, 0);
const er = creatorContents.length > 0
  ? ((totalLikes + totalComments) / creatorContents.length / 1000) * 100
  : 0;
```

---

# ContentGrid Component

## Icons Used (from @heroicons/react/24/outline)
- `HeartIcon` - Likes (w-4 h-4)
- `ChatBubbleLeftIcon` - Comments (w-4 h-4)
- `EyeIcon` - Views (w-4 h-4)
- `VideoCameraIcon` - Video/Reel badge (w-4 h-4)
- `PhotoIcon` - Post/Story badge (w-4 h-4), empty state (w-12 h-12)

## Next.js Components
- `Image` from `next/image`

## Types
```typescript
export interface ContentItem {
  id: string;
  creatorName: string;
  creatorUsername: string;
  creatorAvatar: string;
  contentType: 'post' | 'story' | 'reel' | 'video';
  thumbnail: string;
  publishedAt: string;
  likes: number;
  comments: number;
  views?: number;
  url: string;
}

interface ContentGridProps {
  contents: ContentItem[];
  onContentClick?: (content: ContentItem) => void;
}
```

## Functions
- `formatNumber(num)` - Formats to K/M notation
- `getContentTypeIcon(type)` - Returns icon for content type
- `getContentTypeLabel(type)` - Returns French label for type

## Component Structure

### Empty State
```tsx
<div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
  <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
  <p className="text-gray-600 text-sm">
    Les contenus publiés s'afficheront ici au fur et à mesure
  </p>
</div>
```

### Grid & Content Card
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div onClick={() => onContentClick?.(content)}
       className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl
                  transition-all duration-300 cursor-pointer group animate-fadeInUp">

    {/* Thumbnail (aspect-square) */}
    <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
      <Image
        src={content.thumbnail}
        alt={`Contenu de ${content.creatorName}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />

      {/* Type Badge (top-right) */}
      <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-white
                      px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5">
        {getContentTypeIcon(content.contentType)}
        <span>{getContentTypeLabel(content.contentType)}</span>
      </div>
    </div>

    {/* Info Section */}
    <div className="p-4 space-y-3">
      {/* Creator */}
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
             style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          {content.creatorName.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            @{content.creatorUsername}
          </p>
        </div>
      </div>

      {/* Date */}
      <p className="text-xs text-gray-500">
        Publié le {new Date(content.publishedAt).toLocaleDateString('fr-FR')}
      </p>

      {/* Metrics (3 columns) */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-sm font-bold text-gray-900">
            <HeartIcon className="w-4 h-4 text-gray-400" />
            <span>{formatNumber(content.likes)}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Likes</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-sm font-bold text-gray-900">
            <ChatBubbleLeftIcon className="w-4 h-4 text-gray-400" />
            <span>{formatNumber(content.comments)}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Comm.</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-sm font-bold text-gray-900">
            <EyeIcon className="w-4 h-4 text-gray-400" />
            <span>{content.views ? formatNumber(content.views) : '-'}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Vues</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Content Type Icons
| Type | Icon | Label |
|------|------|-------|
| reel | `VideoCameraIcon` | "Reel" |
| video | `VideoCameraIcon` | "Vidéo" |
| story | `PhotoIcon` | "Story" |
| post | `PhotoIcon` | "Post" |

## Layout
```
└─ div.grid (1/2/3 cols)
   └─ div.bg-white.rounded-xl (card)
      ├─ div.aspect-square (thumbnail + badge)
      └─ div.p-4 (info)
         ├─ div (creator + avatar)
         ├─ p (date)
         └─ div.grid.grid-cols-3 (metrics)
```
