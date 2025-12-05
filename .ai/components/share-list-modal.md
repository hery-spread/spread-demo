# Share List Modal

## Icons Used
- `XMarkIcon` - from `@heroicons/react/24/outline`
- `ShareIcon` - from `@heroicons/react/24/outline`
- `CheckIcon` - from `@heroicons/react/24/outline`
- `ClipboardIcon` - from `@heroicons/react/24/outline`
- `EyeIcon` - from `@heroicons/react/24/outline`
- `LockClosedIcon` - from `@heroicons/react/24/outline`
- `HandThumbUpIcon` - from `@heroicons/react/24/outline`
- `ChatBubbleLeftIcon` - from `@heroicons/react/24/outline`
- `ChartBarIcon` - from `@heroicons/react/24/outline`

## Functions Used
- `generateShareLink()` - Generates unique share link with ID
- `copyToClipboard()` - Copies share link to clipboard
- `resetModal()` - Resets all modal state
- `handleClose()` - Resets and closes modal
- `window.open()` - Opens link in new tab

## State Management
```typescript
const [shareSettings, setShareSettings] = useState({
  allowVotes: true,
  allowComments: false,
  shareType: 'public' as 'public' | 'private',
  password: '',
});
const [shareLink, setShareLink] = useState('');
const [copied, setCopied] = useState(false);
const [isGenerating, setIsGenerating] = useState(false);
```

## Component Structure

### Phase 1: Configuration View (Before Link Generation)

```tsx
{!shareLink ? (
  <div className="space-y-6">
    {/* Preview Info */}
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-start space-x-3">
        <EyeIcon className="w-5 h-5 text-purple-600 mt-1" />
        <div>
          <h3 className="font-medium text-gray-900 mb-1">
            Aperçu de la liste de casting
          </h3>
          <p className="text-sm text-gray-600">
            Les destinataires pourront voir les {list.influencers.length} créateurs
          </p>
        </div>
      </div>
    </div>

    {/* Interaction Options */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Options d&apos;interaction
      </h3>

      {/* Allow Votes Checkbox */}
      <label className="flex items-start space-x-3">
        <input
          type="checkbox"
          checked={shareSettings.allowVotes}
          onChange={(e) => setShareSettings(prev => ({
            ...prev,
            allowVotes: e.target.checked
          }))}
          className="w-4 h-4 text-purple-600 border-gray-300 rounded"
        />
        <div>
          <div className="flex items-center space-x-2">
            <HandThumbUpIcon className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">Activer les votes</span>
          </div>
          <p className="text-xs text-gray-500">
            Permet aux visiteurs de voter pour ou contre chaque créateur
          </p>
        </div>
      </label>

      {/* Allow Comments Checkbox */}
      <label className="flex items-start space-x-3">
        <input
          type="checkbox"
          checked={shareSettings.allowComments}
          onChange={(e) => setShareSettings(prev => ({
            ...prev,
            allowComments: e.target.checked
          }))}
          className="w-4 h-4 text-purple-600 border-gray-300 rounded"
        />
        <div>
          <div className="flex items-center space-x-2">
            <ChatBubbleLeftIcon className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">Activer les commentaires</span>
          </div>
          <p className="text-xs text-gray-500">
            Permet aux visiteurs de laisser des commentaires
          </p>
        </div>
      </label>
    </div>

    {/* Access Control */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Contrôle d&apos;accès
      </h3>

      {/* Public Link Option */}
      <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
        <input
          type="radio"
          name="shareType"
          value="public"
          checked={shareSettings.shareType === 'public'}
          onChange={(e) => setShareSettings(prev => ({
            ...prev,
            shareType: e.target.value as 'public' | 'private'
          }))}
          className="w-4 h-4 text-purple-600"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <ShareIcon className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">Lien public</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Toute personne avec le lien peut voir la liste
          </p>
        </div>
      </label>

      {/* Password Protected Option */}
      <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
        <input
          type="radio"
          name="shareType"
          value="private"
          checked={shareSettings.shareType === 'private'}
          onChange={(e) => setShareSettings(prev => ({
            ...prev,
            shareType: e.target.value as 'public' | 'private'
          }))}
          className="w-4 h-4 text-purple-600"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <LockClosedIcon className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">Protégé par mot de passe</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Nécessite un mot de passe pour accéder
          </p>
        </div>
      </label>

      {/* Password Input (conditional) */}
      {shareSettings.shareType === 'private' && (
        <input
          type="password"
          placeholder="Entrez un mot de passe"
          value={shareSettings.password}
          onChange={(e) => setShareSettings(prev => ({
            ...prev,
            password: e.target.value
          }))}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
        />
      )}
    </div>

    {/* Actions */}
    <div className="flex items-center space-x-3 pt-4">
      <Button variant="outline" onClick={handleClose} className="flex-1">
        Annuler
      </Button>
      <Button
        onClick={generateShareLink}
        disabled={isGenerating || (shareSettings.shareType === 'private' && !shareSettings.password)}
        className="flex-1 flex items-center justify-center space-x-2"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            <span>Génération...</span>
          </>
        ) : (
          <>
            <ShareIcon className="w-4 h-4" />
            <span>Créer le lien</span>
          </>
        )}
      </Button>
    </div>
  </div>
) : (
  // Phase 2: Generated Link View
)}
```

### Phase 2: Generated Link View (After Link Generation)

```tsx
{shareLink && (
  <div className="space-y-6">
    {/* Success Message */}
    <div className="text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckIcon className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Lien de partage créé !
      </h3>
      <p className="text-gray-600">
        Votre liste de casting est prête à être partagée
      </p>
    </div>

    {/* Share Link Display */}
    <div className="bg-gray-50 rounded-xl p-4">
      <label className="text-sm font-medium text-gray-700 mb-2 block">
        Lien de partage de la liste
      </label>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={shareLink}
          readOnly
          className="flex-1 px-3 py-2 bg-white border rounded-lg text-sm font-mono"
        />
        <Button
          onClick={copyToClipboard}
          size="sm"
          className={copied ? 'bg-green-600 hover:bg-green-700' : ''}
        >
          {copied ? (
            <>
              <CheckIcon className="w-4 h-4 mr-1" />
              Copié
            </>
          ) : (
            <>
              <ClipboardIcon className="w-4 h-4 mr-1" />
              Copier
            </>
          )}
        </Button>
      </div>
    </div>

    {/* What's Included Info */}
    <div className="bg-blue-50 rounded-xl p-4">
      <div className="flex items-start space-x-3">
        <EyeIcon className="w-5 h-5 text-blue-600 mt-1" />
        <div>
          <h4 className="font-medium text-blue-900 mb-2">Ce qui est inclus :</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• {list.influencers.length} créateurs avec leurs profils</li>
            <li>• Statistiques de base (followers, engagement rate)</li>
            {shareSettings.allowVotes && <li>• Système de vote</li>}
            {shareSettings.allowComments && <li>• Possibilité de commenter</li>}
            <li>• Design personnalisé avec votre branding</li>
          </ul>
        </div>
      </div>
    </div>

    {/* Actions */}
    <div className="space-y-3">
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          onClick={() => window.open(shareLink, '_blank')}
          className="flex-1"
        >
          Prévisualiser
        </Button>
        <Button onClick={handleClose} className="flex-1">
          Terminé
        </Button>
      </div>

      {/* View Results Button (conditional) */}
      {shareSettings.allowVotes && (
        <Button
          variant="outline"
          onClick={() => window.open(`/lists/${list.id}/share-results`, '_blank')}
          className="w-full flex items-center justify-center space-x-2"
        >
          <ChartBarIcon className="w-4 h-4" />
          <span>Voir les résultats des votes</span>
        </Button>
      )}
    </div>
  </div>
)}
```

## Props Interface
```typescript
interface ShareListModalProps {
  isOpen: boolean;
  onClose: () => void;
  list: InfluencerList;
}
```

## Key Features
- Two-phase modal: Configuration → Generated Link
- Configurable interaction options (votes, comments)
- Access control (public/password-protected)
- Copy-to-clipboard functionality
- Link preview in new tab
- Vote results tracking link
- Auto-reset on close
