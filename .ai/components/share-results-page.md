# Share Results Page

## Icons Used

### From @heroicons/react/24/outline
- `ArrowLeftIcon` - Back navigation (w-5 h-5)
- `EyeIcon` - Info box icon (w-5 h-5)
- `UserGroupIcon` - Section header icon (w-5 h-5)
- `ChatBubbleLeftIcon` - Comments header icon (w-4 h-4)

### From @heroicons/react/24/solid
- `CheckCircleIconSolid` - "Go" vote status (w-7 h-7)
- `XCircleIconSolid` - "No Go" vote status (w-7 h-7)
- `ChatBubbleLeftIconSolid` - "Discuss" vote status (w-7 h-7)

## React Hooks Used
- `useState` - Managing list, stats, and loading state
- `useEffect` - Loading data on mount
- `useParams` - Getting list ID from URL params
- `notFound()` - Next.js 404 redirect function

## Next.js Components Used
- `Link` - Navigation component

## Functions Used
- `formatNumber(num: number)` - Formats numbers to K/M notation (1000 → "1.0K", 1000000 → "1.0M")
- `generateMockShareStats(list: InfluencerList)` - Generates mock voting statistics with random votes per influencer
- `getUserListById(listId: string)` - Fetches list data from mock data

## Page Structure

### 1. Header Section
```tsx
<div className="flex items-center justify-between">
  <div>
    {/* Back Link */}
    <Link href={`/lists/${listId}`}
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors mb-4">
      <ArrowLeftIcon className="w-5 h-5" />
      <span>Retour à la liste</span>
    </Link>

    {/* Page Title */}
    <h1 className="text-3xl font-bold text-gray-900 mb-2">
      Résultats des votes
    </h1>

    {/* List Name */}
    <p className="text-gray-600">{list.name}</p>
  </div>
</div>
```

### 2. Feedback Section
```tsx
<div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
  {/* Section Header */}
  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
    <UserGroupIcon className="w-5 h-5" />
    <span>Feedback par créateur</span>
  </h2>

  {/* Creator Cards Container */}
  <div className="space-y-4">
    {/* Creator cards mapped here */}
  </div>
</div>
```

### 3. Creator Card (Individual)
```tsx
<div className={`border-2 rounded-xl p-6 hover:shadow-md transition-all duration-300 ${statusClasses}`}>
  <div className="flex items-start gap-6">
    {/* Status Icon Circle (w-12 h-12, flex-shrink-0) */}
    <div className="w-12 h-12 rounded-full bg-{color}-500 flex items-center justify-center">
      <CheckCircleIconSolid | XCircleIconSolid | ChatBubbleLeftIconSolid className="w-7 h-7 text-white" />
      {/* OR for none status: <span className="text-gray-500 text-sm font-semibold">?</span> */}
    </div>

    {/* Creator Info Section (flex-1 min-w-0) */}
    <div className="flex-1 min-w-0">
      {/* Name & Status Badge Row */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-gray-900">
          {creator.contactName || 'Nom inconnu'}
        </h3>
        <div className="px-4 py-2 rounded-full font-semibold text-sm bg-{color}-100 text-{color}-700">
          Go | No Go | À discuter | Pas de réponse
        </div>
      </div>

      {/* Platform Badge */}
      <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold mb-3 capitalize">
        {creator.platform}
      </div>

      {/* Stats Grid (2 columns) */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-600">Abonnés</p>
          <p className="text-sm font-bold text-gray-900">{formatNumber(followers)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Engagement</p>
          <p className="text-sm font-bold text-gray-900">{engagementRate}%</p>
        </div>
      </div>
    </div>
  </div>

  {/* Comments Section (conditional) */}
  {creator.comments.length > 0 && (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2 flex items-center space-x-2">
          <ChatBubbleLeftIcon className="w-4 h-4" />
          <span>Commentaires :</span>
        </p>
        <div className="space-y-2">
          {creator.comments.map((comment, idx) => (
            <div key={idx} className="bg-white rounded p-3">
              <p className="text-sm text-gray-700">&quot;{comment}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}
</div>
```

### 4. Info Box (Bottom)
```tsx
<div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
  <div className="flex items-start space-x-3">
    <EyeIcon className="w-5 h-5 text-blue-600 mt-1" />
    <div>
      <h3 className="font-semibold text-blue-900 mb-1">
        Comment ça fonctionne ?
      </h3>
      <p className="text-sm text-blue-800">
        Les votes sont collectés en temps réel depuis le lien partagé.
        Cette page se met à jour automatiquement pour refléter les
        préférences des visiteurs.
      </p>
    </div>
  </div>
</div>
```

## Vote Status Logic

### Status Determination
```typescript
const maxVotes = Math.max(creator.goVotes, creator.noGoVotes, creator.discussVotes);
let status: 'go' | 'no-go' | 'discuss' | 'none' = 'none';
if (maxVotes > 0) {
  if (creator.goVotes === maxVotes) status = 'go';
  else if (creator.noGoVotes === maxVotes) status = 'no-go';
  else if (creator.discussVotes === maxVotes) status = 'discuss';
}
```

## Color Coding

### Card Styling by Status
| Status | Card Border | Card Background | Icon Circle | Badge BG | Badge Text | Status Label |
|--------|-------------|-----------------|-------------|----------|------------|--------------|
| Go | border-green-300 | bg-green-50 | bg-green-500 | bg-green-100 | text-green-700 | "Go" |
| No Go | border-red-300 | bg-red-50 | bg-red-500 | bg-red-100 | text-red-700 | "No Go" |
| Discuss | border-orange-300 | bg-orange-50 | bg-orange-500 | bg-orange-100 | text-orange-700 | "À discuter" |
| None | border-gray-200 | bg-white | bg-gray-200 | bg-gray-100 | text-gray-600 | "Pas de réponse" |

### Other Color Schemes
- **Back Link**: `text-gray-600` hover `text-purple-600`
- **Platform Badge**: `bg-purple-100 text-purple-700`
- **Comments Section**: `bg-blue-50 border-blue-200 text-blue-900`
- **Individual Comment**: `bg-white text-gray-700`
- **Info Box**: `bg-blue-50 border-blue-200 text-blue-900/800/600`

## Loading State
```tsx
<div className="space-y-6">
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
    <div className="h-64 bg-gray-200 rounded-lg"></div>
  </div>
</div>
```

## Data Flow
1. Extract `listId` from URL params via `useParams()`
2. Fetch list data via `getUserListById(listId)`
3. Generate mock statistics via `generateMockShareStats(foundList)`
4. Map creators with their vote data:
   ```typescript
   const creatorsWithVotes = list.influencers.map((inf) => {
     const votes = stats.votesByInfluencer.find(v => v.influencerId === inf.id);
     return { ...inf, goVotes, noGoVotes, discussVotes, comments, totalVotes };
   });
   ```
5. For each creator card, calculate majority vote status
6. Render creator cards with conditional status styling
7. Display comments if available

## Page Layout
```
└─ div.space-y-6 (main container)
   ├─ Header Section
   ├─ Feedback Section (white card)
   │  └─ Creator Cards (space-y-4)
   │     ├─ Creator Card 1 (conditional color)
   │     ├─ Creator Card 2 (conditional color)
   │     └─ ...
   └─ Info Box (blue)
```
