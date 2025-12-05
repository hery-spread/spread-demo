# Shared List Page & Campaign Customization Modal

## Icons Used

### From @heroicons/react/24/outline
- `ShareIcon` - Agency logo in header (w-11 h-11)
- `UserGroupIcon` - Multiple uses: section headers (w-5 h-5), avatar fallback (w-10 h-10)
- `CheckCircleIcon` - Info box icon (w-5 h-5), "Go" vote button unselected (w-5 h-5), active vote badge (w-5 h-5)
- `XMarkIcon` - "No Go" vote button unselected (w-5 h-5), close modal button (w-5 h-5)
- `CalendarDaysIcon` - Creation date icon (w-5 h-5)
- `TagIcon` - Category icon (w-5 h-5)
- `Cog6ToothIcon` - Settings FAB (w-6 h-6), modal header icon (w-5 h-5)
- `ArrowTopRightOnSquareIcon` - External profile link (w-4 h-4)
- `ChatBubbleLeftEllipsisIcon` - "Discuss" vote button unselected (w-5 h-5), active vote badge (w-5 h-5)
- `SwatchIcon` - Color picker labels (w-4 h-4)
- `BuildingOfficeIcon` - Agency name label (w-4 h-4)

### From @heroicons/react/24/solid
- `CheckCircleIconSolid` - "Go" vote button selected (w-5 h-5)
- `XCircleIconSolid` - "No Go" vote button selected (w-5 h-5)
- `ChatBubbleLeftIconSolid` - "Discuss" vote button selected (w-5 h-5)

## React Hooks Used
- `useState` - Managing listData, loading, votes, comments, customization, modal visibility
- `useEffect` - Loading customization from localStorage, loading shared list data
- `useParams` - Getting shareId from URL
- `notFound()` - Next.js 404 redirect function

## Next.js Components Used
- `Image` - Avatar images from ui-avatars.com API

## Functions Used

### SharedListPage
- `getSharedList(shareId: string)` - Fetches shared list data with mock influencers
- `formatNumber(num: number)` - Formats numbers to K/M notation (1000 → "1.0K")
- `handleCustomizationApply(settings)` - Saves customization to localStorage
- `handleVote(influencerId, voteType)` - Toggles vote state and persists to localStorage
- `handleCommentChange(influencerId, comment)` - Updates comment state and persists to localStorage

### CampaignCustomizationModal
- `handleApply()` - Applies settings and closes modal
- `handleReset()` - Resets to default settings
- `updateColor(type, value)` - Updates primary/secondary color

## TypeScript Interfaces

### SharedListPage
```typescript
interface CampaignCustomizationSettings {
  primaryColor: string;
  secondaryColor: string;
  agencyName: string;
}

interface VoteState {
  [influencerId: string]: 'go' | 'no-go' | 'discuss' | null;
}

interface CommentState {
  [influencerId: string]: string;
}

interface InfluencerWithProfile {
  id: string;
  contactName?: string;
  contactEmail?: string;
  followers?: number;
  engagementRate?: number;
  platform?: string;
  profileUrl?: string;
}
```

## Page Structure

### 1. Header Section (Branded)
```tsx
<div className="bg-white shadow-sm border-b border-gray-200 animate-fadeInDown">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Agency Logo (w-20 h-20, gradient background) */}
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl"
           style={{ background: linear-gradient }}>
        <ShareIcon className="w-11 h-11 text-white" />
      </div>

      {/* Agency Name */}
      <h1 className="text-2xl font-bold text-gray-900">
        {customization.agencyName}
      </h1>

      {/* Stats */}
      <p className="text-sm text-gray-500">
        {shareData.viewCount} vues • Partagé le {date}
      </p>
    </div>
  </div>
</div>
```

### 2. List Header (Gradient Card)
```tsx
<div className="rounded-2xl p-8 shadow-lg border border-gray-200/50 text-white animate-fadeInUp"
     style={{ background: linear-gradient }}>
  <div className="flex items-start justify-between mb-6">
    <div className="flex-1">
      {/* List Title */}
      <h2 className="text-4xl font-bold mb-3">{list.name}</h2>

      {/* Description */}
      <p className="text-xl text-white/90 mb-6">{list.description}</p>

      {/* Metadata Row */}
      <div className="flex items-center space-x-8 text-white/95">
        <div className="flex items-center space-x-2">
          <CalendarDaysIcon className="w-5 h-5" />
          <span>Créée le {date}</span>
        </div>
        <div className="flex items-center space-x-2">
          <UserGroupIcon className="w-5 h-5" />
          <span className="font-semibold">{list.influencers.length}</span> créateurs
        </div>
        <div className="flex items-center space-x-2">
          <TagIcon className="w-5 h-5" />
          <span>{list.category}</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 3. Voting Instructions (Conditional)
```tsx
{shareData.allowVotes && (
  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 animate-fadeInUp">
    <div className="flex items-start space-x-3">
      <CheckCircleIcon className="w-5 h-5 text-blue-600 mt-1" />
      <div>
        <h3 className="font-semibold text-blue-900 mb-1">Donnez votre avis</h3>
        <p className="text-sm text-blue-800">
          Pour chaque créateur, indiquez votre avis : Go (validé), No Go (refusé)
          ou À discuter. Vous pouvez aussi laisser un commentaire.
        </p>
      </div>
    </div>
  </div>
)}
```

### 4. Creators List Section
```tsx
<div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm animate-fadeInUp">
  {/* Section Header */}
  <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
    <UserGroupIcon className="w-5 h-5" />
    <span>Créateurs sélectionnés ({list.influencers.length})</span>
  </h2>

  {/* Creator Cards Container */}
  <div className="space-y-4">
    {/* Creator cards mapped here */}
  </div>
</div>
```

### 5. Creator Card (Individual)
```tsx
<div className={`border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 ${voteStateClasses}`}>
  <div className="flex items-start gap-6">
    {/* Avatar with Vote Badge */}
    <div className="relative">
      {/* Avatar Circle (w-20 h-20) */}
      <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200">
        <Image src={ui-avatars-url} alt={name} width={80} height={80} />
      </div>

      {/* Active Vote Badge (conditional, w-8 h-8, positioned -bottom-2 -right-2) */}
      {userVote && (
        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full shadow-lg bg-{color}-500">
          <CheckCircleIcon | XMarkIcon | ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-white" />
        </div>
      )}
    </div>

    {/* Creator Info Section */}
    <div className="flex-1 min-w-0">
      {/* Name & External Link Row */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-3">
          <h3 className="text-xl font-bold text-gray-900 hover:text-purple-600 cursor-pointer">
            {influencer.contactName || 'Nom inconnu'}
          </h3>
          {influencer.profileUrl && (
            <Button variant="outline" size="sm">
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Réseau social</span>
            </Button>
          )}
        </div>
      </div>

      {/* Platform Badge */}
      <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold mb-3 capitalize">
        {influencer.platform}
      </div>

      {/* Stats Grid (2 columns) */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Abonnés</p>
          <p className="text-lg font-bold text-gray-900">{formatNumber(followers)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Taux d'engagement</p>
          <p className="text-lg font-bold text-gray-900">{engagementRate}%</p>
        </div>
      </div>

      {/* Vote Buttons (conditional, 3-column grid) */}
      {shareData.allowVotes && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            {/* Go Button */}
            <Button variant={userVote === 'go' ? 'default' : 'outline'}
                    className={conditional-green-classes}>
              <CheckCircleIconSolid | CheckCircleIcon className="w-5 h-5" />
              <span className="font-semibold">Go</span>
            </Button>

            {/* No Go Button */}
            <Button variant={userVote === 'no-go' ? 'default' : 'outline'}
                    className={conditional-red-classes}>
              <XCircleIconSolid | XMarkIcon className="w-5 h-5" />
              <span className="font-semibold">No Go</span>
            </Button>

            {/* Discuss Button */}
            <Button variant={userVote === 'discuss' ? 'default' : 'outline'}
                    className={conditional-orange-classes}>
              <ChatBubbleLeftIconSolid | ChatBubbleLeftEllipsisIcon className="w-5 h-5" />
              <span className="font-semibold">À discuter</span>
            </Button>
          </div>

          {/* Comment Textarea */}
          <textarea
            value={comments[influencer.id] || ''}
            onChange={(e) => handleCommentChange(influencer.id, e.target.value)}
            placeholder="Laissez un commentaire (optionnel)..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
            rows={2}
          />
        </div>
      )}
    </div>
  </div>
</div>
```

### 6. Footer
```tsx
<div className="bg-gray-900 text-white py-8 mt-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Spread Logo */}
    <div className="flex items-center justify-center space-x-3 mb-3">
      <div className="w-8 h-8 rounded-lg" style={{ background: linear-gradient }}>
        <span className="text-sm font-bold">S</span>
      </div>
      <span className="text-gray-400">Powered by Spread</span>
    </div>

    {/* Generated Date */}
    <p className="text-gray-400 text-center text-sm">
      Liste de casting générée le {date}
    </p>
  </div>
</div>
```

### 7. Floating Settings Button
```tsx
<button
  onClick={() => setShowCustomizationModal(true)}
  className="fixed bottom-8 right-8 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 z-50 no-print"
  style={{ background: linear-gradient }}
>
  <Cog6ToothIcon className="w-6 h-6 text-white" />
</button>
```

## CampaignCustomizationModal Structure

### Modal Container
```tsx
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 animate-fadeIn">
  <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl animate-slideInUp">
    {/* Modal content */}
  </div>
</div>
```

### Modal Header
```tsx
<div className="flex items-center justify-between mb-6">
  <div className="flex items-center space-x-3">
    {/* Icon Badge */}
    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
      <Cog6ToothIcon className="w-5 h-5 text-white" />
    </div>

    {/* Title & Subtitle */}
    <div>
      <h2 className="text-xl font-bold text-gray-900">
        🎨 Personnalisation du rapport
      </h2>
      <p className="text-sm text-gray-500">
        Personnalisez les couleurs et le branding
      </p>
    </div>
  </div>

  {/* Close Button */}
  <button onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
    <XMarkIcon className="w-5 h-5 text-gray-500" />
  </button>
</div>
```

### Modal Form Fields
```tsx
<div className="space-y-6">
  {/* Primary Color Field */}
  <div className="space-y-3">
    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-900">
      <SwatchIcon className="w-4 h-4" />
      <span>Couleur Principale</span>
    </label>
    <p className="text-xs text-gray-500">
      Utilisée pour les en-têtes, badges et boutons
    </p>
    <div className="flex items-center space-x-3">
      {/* Text Input */}
      <input type="text" value={settings.primaryColor}
             className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 font-mono text-sm"
             placeholder="#667eea" />
      {/* Color Picker */}
      <input type="color" value={settings.primaryColor}
             className="w-14 h-10 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-purple-500" />
    </div>
  </div>

  {/* Secondary Color Field - Same structure */}

  {/* Agency Name Field */}
  <div className="space-y-3">
    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-900">
      <BuildingOfficeIcon className="w-4 h-4" />
      <span>Nom de l'Agence</span>
    </label>
    <p className="text-xs text-gray-500">
      Le nom qui apparaît dans l'en-tête du rapport
    </p>
    <input type="text" value={settings.agencyName}
           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
           placeholder="Votre Agence" />
  </div>

  {/* Preview Section */}
  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
    <p className="text-sm font-medium text-gray-700">Aperçu</p>
    <div className="h-24 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg"
         style={{ background: linear-gradient }}>
      {settings.agencyName}
    </div>
  </div>
</div>
```

### Modal Actions
```tsx
<div className="flex items-center space-x-3 mt-6 pt-6 border-t border-gray-200">
  <Button variant="outline" onClick={handleReset} className="flex-1">
    Réinitialiser
  </Button>
  <Button onClick={handleApply} className="flex-1">
    Appliquer
  </Button>
</div>
```

## Color Coding

### Creator Card States
| Vote State | Card Border | Card Background |
|------------|-------------|-----------------|
| Go | border-green-300 | bg-green-50 |
| No Go | border-red-300 | bg-red-50 |
| Discuss | border-orange-300 | bg-orange-50 |
| None | border-gray-200 | bg-white |

### Vote Buttons
| Button | Selected BG | Selected Text | Hover BG (Unselected) |
|--------|-------------|---------------|----------------------|
| Go | bg-green-500 | text-white | hover:bg-green-50 |
| No Go | bg-red-500 | text-white | hover:bg-red-50 |
| Discuss | bg-orange-500 | text-white | hover:bg-orange-50 |

### Vote Badge (on Avatar)
| Vote | Badge BG |
|------|----------|
| Go | bg-green-500 |
| No Go | bg-red-500 |
| Discuss | bg-orange-500 |

### Other Elements
- **Platform Badge**: `bg-purple-100 text-purple-700`
- **Info Box**: `bg-blue-50 border-blue-200 text-blue-900/800`
- **Footer**: `bg-gray-900 text-white`
- **Modal Overlay**: `bg-black/50`

## Loading States

### Page Loading
```tsx
<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
</div>
```

## Data Flow

### Page Load
1. Extract `shareId` from URL params via `useParams()`
2. Load customization settings from `localStorage.getItem('listShareSettings')`
3. Fetch shared list data via `getSharedList(shareId)`
4. Load saved votes from `localStorage.getItem('votes_${shareId}')`
5. Render UI with loaded data

### Vote Handling
1. User clicks vote button (Go/No Go/Discuss)
2. `handleVote()` toggles vote (clicking same vote removes it)
3. Update votes state
4. Persist to `localStorage.setItem('votes_${shareId}', JSON.stringify(updatedVotes))`
5. UI re-renders with new vote state (card styling, badge, button state)

### Comment Handling
1. User types in comment textarea
2. `handleCommentChange()` updates comment state
3. Persist to `localStorage.setItem('comments_${shareId}', JSON.stringify(updatedComments))`

### Customization Flow
1. User clicks floating settings button
2. Modal opens with current settings
3. User modifies colors/agency name
4. Preview updates in real-time
5. User clicks "Appliquer"
6. Settings saved to `localStorage.setItem('listShareSettings', JSON.stringify(settings))`
7. Page re-renders with new branding

## Animations
- `animate-fadeInDown` - Header section
- `animate-fadeInUp` - List header, instructions, creators section
- `animate-fadeIn` - Modal overlay
- `animate-slideInUp` - Modal content
- `animate-spin` - Loading spinner

## Page Layout
```
└─ div.min-h-screen.bg-gradient-to-br (main container)
   ├─ Header Section (branded, white bg)
   ├─ Content (max-w-7xl, space-y-8)
   │  ├─ List Header (gradient card)
   │  ├─ Voting Instructions (blue info box, conditional)
   │  └─ Creators Section (white/translucent card)
   │     └─ Creator Cards (space-y-4)
   ├─ Footer (dark, gray-900)
   ├─ Floating Settings Button (fixed bottom-right)
   └─ CampaignCustomizationModal (conditional)
```

## Default Settings
```typescript
const DEFAULT_SETTINGS = {
  primaryColor: '#667eea',
  secondaryColor: '#764ba2',
  agencyName: 'Votre Agence',
};
```
