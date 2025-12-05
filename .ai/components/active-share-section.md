# Active Share Section

## Icons Used
- `LinkIcon` - from `@heroicons/react/24/outline`
- `EyeIcon` - from `@heroicons/react/24/outline`
- `ClipboardIcon` - from `@heroicons/react/24/outline`
- `ArrowTopRightOnSquareIcon` - from `@heroicons/react/24/outline`
- `ChartBarIcon` - from `@heroicons/react/24/outline`

## Functions Used
- `copyShareLink()` - Copies share link to clipboard
- `router.push()` - Next.js navigation
- `window.open()` - Opens link in new tab

## Component

```tsx
{/* Section Partage Actif - Compact */}
{showShareInfo && activeShareLink && (
  <div className="bg-white border border-purple-200/60 rounded-lg p-3">
    <div className="flex items-center justify-between gap-3">
      {/* Info + Link */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div className="w-7 h-7 bg-purple-100 rounded-md flex items-center justify-center flex-shrink-0">
          <LinkIcon className="w-3.5 h-3.5 text-purple-600" />
        </div>
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="text-xs font-medium text-purple-600 whitespace-nowrap">
            Lien actif
          </span>
          <input
            type="text"
            value={activeShareLink}
            readOnly
            className="flex-1 min-w-0 px-2 py-1 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600 truncate"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <EyeIcon className="w-3.5 h-3.5" />
          {Math.floor(Math.random() * 50) + 15}
        </span>
        <button
          onClick={copyShareLink}
          className="h-7 w-7 p-0 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
          title="Copier le lien"
        >
          <ClipboardIcon className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={() => window.open(activeShareLink, '_blank')}
          className="h-7 w-7 p-0 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
          title="Ouvrir dans un nouvel onglet"
        >
          <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={() => router.push(`/lists/${list.id}/share-results`)}
          className="h-7 px-2 flex items-center rounded-md text-xs font-medium text-purple-600 hover:bg-purple-50 transition-colors"
        >
          <ChartBarIcon className="w-4 h-4 mr-1" />
          Résultats
        </button>
      </div>
    </div>
  </div>
)}
```
