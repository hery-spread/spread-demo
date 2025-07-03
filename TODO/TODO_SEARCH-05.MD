# PLAN D'ACTION PRESCRIPTIF : SEARCH-05

**User Story :** En tant qu'utilisateur, je veux pouvoir utiliser une recherche IA en langage naturel (ex: 'trouve des micro-influenceurs dans le tennis') qui remplit automatiquement le formulaire de recherche.

**Objectif :** Créer un système de recherche IA qui interprète les requêtes en langage naturel et remplit automatiquement les filtres de recherche.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer le composant AISearchBar

Créer `src/components/search/AISearchBar.tsx` :

```tsx
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import {
  MagnifyingGlassIcon,
  SparklesIcon,
  MicrophoneIcon,
  XMarkIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import { useAISearch } from '@/hooks/useAISearch';

interface AISearchBarProps {
  onSearchGenerated: (filters: any) => void;
}

export default function AISearchBar({ onSearchGenerated }: AISearchBarProps) {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { processNaturalLanguageQuery, getSuggestions } = useAISearch();

  const suggestions = [
    'Trouve des micro-influenceurs dans le tennis',
    'Cherche des influenceurs mode avec plus de 100K followers',
    'Influenceurs gaming français entre 18-25 ans',
    'Créateurs de contenu beauté avec bon engagement',
    'Influenceurs voyage basés à Paris',
    'Micro-influenceurs cuisine végétarienne',
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsProcessing(true);
    try {
      const filters = await processNaturalLanguageQuery(query);
      onSearchGenerated(filters);
    } catch (error) {
      console.error('Erreur lors du traitement de la recherche:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert(
        "La reconnaissance vocale n'est pas supportée par votre navigateur"
      );
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      {/* Barre de recherche principale */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <SparklesIcon className="h-5 w-5 text-purple-500" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Décrivez votre recherche en langage naturel..."
          className="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
        />

        <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-3">
          <button
            onClick={handleVoiceSearch}
            disabled={isListening}
            className={`p-1 rounded-full hover:bg-gray-100 ${
              isListening ? 'text-red-500 animate-pulse' : 'text-gray-400'
            }`}
            title="Recherche vocale"
          >
            <MicrophoneIcon className="h-4 w-4" />
          </button>

          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-400"
              title="Effacer"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Bouton de recherche */}
      <div className="mt-3 flex justify-center">
        <Button
          onClick={handleSearch}
          disabled={!query.trim() || isProcessing}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-2"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Traitement en cours...
            </>
          ) : (
            <>
              <SparklesIcon className="h-4 w-4 mr-2" />
              Rechercher avec l'IA
            </>
          )}
        </Button>
      </div>

      {/* Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <LightBulbIcon className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">
                Suggestions de recherche
              </span>
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-gray-700"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="p-3 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              💡 Astuce: Décrivez votre recherche comme si vous parliez à un
              assistant
            </p>
          </div>
        </div>
      )}

      {/* Indication de reconnaissance vocale */}
      {isListening && (
        <div className="absolute top-full mt-2 w-full bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-200"></div>
            </div>
            <span className="text-sm text-red-700">
              Parlez maintenant... (Appuyez sur Échap pour annuler)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
```

### Étape 2 : Créer le composant AISearchResult

Créer `src/components/search/AISearchResult.tsx` :

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  CheckCircleIcon,
  XMarkIcon,
  PencilIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface AISearchResultProps {
  isVisible: boolean;
  onClose: () => void;
  originalQuery: string;
  interpretedFilters: any;
  onSearch: (filters: any) => void;
  onEditFilters: (filters: any) => void;
}

export default function AISearchResult({
  isVisible,
  onClose,
  originalQuery,
  interpretedFilters,
  onSearch,
  onEditFilters,
}: AISearchResultProps) {
  const [filters, setFilters] = useState(interpretedFilters);

  if (!isVisible) return null;

  const formatFilterValue = (key: string, value: any) => {
    switch (key) {
      case 'followers':
        return `${value.min?.toLocaleString() || 0} - ${value.max?.toLocaleString() || '∞'}`;
      case 'engagement':
        return `${value.min || 0}% - ${value.max || 100}%`;
      case 'ageRange':
        return `${value.min || 13} - ${value.max || 65} ans`;
      case 'platforms':
        return value.join(', ');
      case 'countries':
        return value.join(', ');
      case 'categories':
        return value.join(', ');
      case 'languages':
        return value.join(', ');
      default:
        return typeof value === 'object' ? JSON.stringify(value) : value;
    }
  };

  const filterLabels: Record<string, string> = {
    followers: 'Followers',
    engagement: 'Engagement',
    ageRange: "Âge de l'audience",
    platforms: 'Plateformes',
    countries: 'Pays',
    categories: 'Catégories',
    languages: 'Langues',
    verified: 'Comptes vérifiés',
    gender: "Genre de l'audience",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Recherche IA interprétée
              </h2>
              <p className="text-sm text-gray-600">
                Vérifiez les filtres générés automatiquement
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Requête originale */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Votre recherche
          </h3>
          <p className="text-gray-900 italic">"{originalQuery}"</p>
        </div>

        {/* Filtres interprétés */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Filtres générés automatiquement
          </h3>

          <div className="space-y-3">
            {Object.entries(filters).map(([key, value]) => {
              if (!value || (Array.isArray(value) && value.length === 0))
                return null;

              return (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                    <div>
                      <span className="font-medium text-gray-900">
                        {filterLabels[key] || key}
                      </span>
                      <p className="text-sm text-gray-600">
                        {formatFilterValue(key, value)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      // Ouvrir l'éditeur pour ce filtre
                      onEditFilters(filters);
                    }}
                    className="text-gray-400 hover:text-purple-600"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Confiance de l'IA */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Confiance de l'IA
          </h4>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: '85%' }}
              ></div>
            </div>
            <span className="text-sm text-blue-700">85%</span>
          </div>
          <p className="text-xs text-blue-700 mt-1">
            L'IA est confiante dans l'interprétation de votre recherche
          </p>
        </div>

        {/* Exemples de résultats attendus */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Exemples de profils correspondants
          </h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
              <img
                src="/avatars/tennis1.jpg"
                alt="Exemple"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">@tennis_pro_marie</p>
                <p className="text-xs text-gray-500">45K followers • Tennis</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
              <img
                src="/avatars/tennis2.jpg"
                alt="Exemple"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">@coach_tennis_alex</p>
                <p className="text-xs text-gray-500">32K followers • Tennis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => onEditFilters(filters)}
            className="flex-1"
          >
            <PencilIcon className="w-4 h-4 mr-2" />
            Modifier les filtres
          </Button>
          <Button
            onClick={() => onSearch(filters)}
            className="flex-1 bg-purple-600 hover:bg-purple-700"
          >
            <MagnifyingGlassIcon className="w-4 h-4 mr-2" />
            Lancer la recherche
          </Button>
        </div>
      </div>
    </div>
  );
}
```

### Étape 3 : Créer le hook useAISearch

Créer `src/hooks/useAISearch.ts` :

```typescript
import { useState } from 'react';

export const useAISearch = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const processNaturalLanguageQuery = async (query: string) => {
    setIsProcessing(true);

    // Simuler un délai de traitement IA
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Logique de traitement du langage naturel (mockée)
    const filters = parseNaturalLanguageQuery(query);

    setIsProcessing(false);
    return filters;
  };

  const parseNaturalLanguageQuery = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const filters: any = {};

    // Détecter les plateformes
    if (lowerQuery.includes('instagram') || lowerQuery.includes('insta')) {
      filters.platforms = ['instagram'];
    } else if (lowerQuery.includes('youtube') || lowerQuery.includes('yt')) {
      filters.platforms = ['youtube'];
    } else if (
      lowerQuery.includes('tiktok') ||
      lowerQuery.includes('tik tok')
    ) {
      filters.platforms = ['tiktok'];
    }

    // Détecter les tailles d'audience
    if (
      lowerQuery.includes('micro-influenceur') ||
      lowerQuery.includes('micro influenceur')
    ) {
      filters.followers = { min: 1000, max: 100000 };
    } else if (
      lowerQuery.includes('macro-influenceur') ||
      lowerQuery.includes('macro influenceur')
    ) {
      filters.followers = { min: 100000, max: 1000000 };
    } else if (
      lowerQuery.includes('méga-influenceur') ||
      lowerQuery.includes('méga influenceur')
    ) {
      filters.followers = { min: 1000000, max: null };
    }

    // Détecter les nombres de followers
    const followersMatch = lowerQuery.match(/(\d+)k?\s*followers?/);
    if (followersMatch) {
      const number = parseInt(followersMatch[1]);
      const multiplier = followersMatch[0].includes('k') ? 1000 : 1;
      filters.followers = { min: number * multiplier, max: null };
    }

    // Détecter les catégories
    const categories = {
      mode: ['mode', 'fashion', 'style', 'vêtements'],
      beauté: ['beauté', 'beauty', 'cosmétiques', 'maquillage'],
      sport: ['sport', 'fitness', 'musculation', 'yoga'],
      cuisine: ['cuisine', 'food', 'recettes', 'gastronomie'],
      voyage: ['voyage', 'travel', 'voyages', 'tourisme'],
      gaming: ['gaming', 'jeux', 'game', 'esport'],
      tech: ['tech', 'technologie', 'gadgets', 'smartphone'],
      lifestyle: ['lifestyle', 'mode de vie', 'quotidien'],
      tennis: ['tennis'],
      football: ['football', 'foot', 'soccer'],
      basketball: ['basket', 'basketball'],
    };

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some((keyword) => lowerQuery.includes(keyword))) {
        filters.categories = filters.categories || [];
        filters.categories.push(category);
      }
    }

    // Détecter les pays
    const countries = {
      france: ['france', 'français', 'francais', 'fr'],
      usa: ['usa', 'états-unis', 'etats-unis', 'america', 'us'],
      canada: ['canada', 'canadien'],
      uk: ['royaume-uni', 'uk', 'angleterre', 'britannique'],
      germany: ['allemagne', 'allemand', 'germany'],
      spain: ['espagne', 'espagnol', 'spain'],
      italy: ['italie', 'italien', 'italy'],
    };

    for (const [country, keywords] of Object.entries(countries)) {
      if (keywords.some((keyword) => lowerQuery.includes(keyword))) {
        filters.countries = filters.countries || [];
        filters.countries.push(country);
      }
    }

    // Détecter les villes
    const cities = {
      paris: ['paris', 'parisien'],
      lyon: ['lyon', 'lyonnais'],
      marseille: ['marseille', 'marseillais'],
      toulouse: ['toulouse', 'toulousain'],
      nice: ['nice', 'niçois'],
      'new york': ['new york', 'ny', 'nyc'],
      'los angeles': ['los angeles', 'la', 'hollywood'],
      london: ['london', 'londres'],
    };

    for (const [city, keywords] of Object.entries(cities)) {
      if (keywords.some((keyword) => lowerQuery.includes(keyword))) {
        filters.cities = filters.cities || [];
        filters.cities.push(city);
      }
    }

    // Détecter l'âge
    const ageMatch = lowerQuery.match(/(\d+)[-\s]?(\d+)?\s*ans?/);
    if (ageMatch) {
      const minAge = parseInt(ageMatch[1]);
      const maxAge = ageMatch[2] ? parseInt(ageMatch[2]) : minAge + 10;
      filters.ageRange = { min: minAge, max: maxAge };
    }

    // Détecter le genre
    if (lowerQuery.includes('femme') || lowerQuery.includes('féminin')) {
      filters.gender = { female: { min: 60, max: 100 } };
    } else if (
      lowerQuery.includes('homme') ||
      lowerQuery.includes('masculin')
    ) {
      filters.gender = { male: { min: 60, max: 100 } };
    }

    // Détecter l'engagement
    if (
      lowerQuery.includes('bon engagement') ||
      lowerQuery.includes('fort engagement')
    ) {
      filters.engagement = { min: 3, max: 100 };
    } else if (
      lowerQuery.includes('très bon engagement') ||
      lowerQuery.includes('excellent engagement')
    ) {
      filters.engagement = { min: 5, max: 100 };
    }

    // Détecter la vérification
    if (lowerQuery.includes('vérifié') || lowerQuery.includes('certifié')) {
      filters.verified = true;
    }

    return filters;
  };

  const getSuggestions = () => {
    return [
      'Trouve des micro-influenceurs dans le tennis',
      'Cherche des influenceurs mode avec plus de 100K followers',
      'Influenceurs gaming français entre 18-25 ans',
      'Créateurs de contenu beauté avec bon engagement',
      'Influenceurs voyage basés à Paris',
      'Micro-influenceurs cuisine végétarienne',
      'Influenceurs fitness femmes avec audience féminine',
      'Créateurs tech français vérifiés',
      'Influenceurs lifestyle entre 50K et 200K followers',
      'Micro-influenceurs sport outdoor',
    ];
  };

  return {
    processNaturalLanguageQuery,
    getSuggestions,
    isProcessing,
  };
};
```

### Étape 4 : Intégrer dans la page de recherche

Modifier `src/app/search/page.tsx` pour intégrer la recherche IA :

```tsx
'use client';

import { useState } from 'react';
import AISearchBar from '@/components/search/AISearchBar';
import AISearchResult from '@/components/search/AISearchResult';
import SearchFilters from '@/components/search/SearchFilters';
import SearchResultsTable from '@/components/search/SearchResultsTable';
import { useSearch } from '@/hooks/useSearch';

export default function SearchPage() {
  const [showAIResult, setShowAIResult] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiFilters, setAiFilters] = useState({});
  const [searchMode, setSearchMode] = useState<'traditional' | 'ai'>('ai');

  const { filters, setFilters, results, search, isSearching } = useSearch();

  const handleAISearchGenerated = (generatedFilters: any) => {
    setAiFilters(generatedFilters);
    setShowAIResult(true);
  };

  const handleAISearch = (filters: any) => {
    setFilters(filters);
    search(filters);
    setShowAIResult(false);
  };

  const handleEditFilters = (filters: any) => {
    setFilters(filters);
    setShowAIResult(false);
    setSearchMode('traditional');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Recherche d'influenceurs
          </h1>
          <p className="text-gray-600">
            Trouvez les parfaits créateurs de contenu pour vos campagnes
          </p>
        </div>

        {/* Mode de recherche */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setSearchMode('ai')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                searchMode === 'ai'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              🤖 Recherche IA
            </button>
            <button
              onClick={() => setSearchMode('traditional')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                searchMode === 'traditional'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              🔍 Recherche avancée
            </button>
          </div>
        </div>

        {/* Barre de recherche IA */}
        {searchMode === 'ai' && (
          <div className="mb-8">
            <AISearchBar onSearchGenerated={handleAISearchGenerated} />
          </div>
        )}

        {/* Filtres traditionnels */}
        {searchMode === 'traditional' && (
          <div className="mb-8">
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              onSearch={search}
              isLoading={isSearching}
            />
          </div>
        )}

        {/* Résultats */}
        {results.length > 0 && (
          <SearchResultsTable results={results} isLoading={isSearching} />
        )}

        {/* Modal de résultat IA */}
        <AISearchResult
          isVisible={showAIResult}
          onClose={() => setShowAIResult(false)}
          originalQuery={aiQuery}
          interpretedFilters={aiFilters}
          onSearch={handleAISearch}
          onEditFilters={handleEditFilters}
        />
      </div>
    </div>
  );
}
```

### Étape 5 : Créer les données mockées pour l'IA

Ajouter à `src/lib/mockData.ts` :

```typescript
export const mockAISearchExamples = [
  {
    query: 'micro-influenceurs tennis',
    filters: {
      categories: ['tennis'],
      followers: { min: 1000, max: 100000 },
      platforms: ['instagram'],
    },
    confidence: 85,
  },
  {
    query: 'influenceurs mode femmes Paris',
    filters: {
      categories: ['mode'],
      gender: { female: { min: 60, max: 100 } },
      cities: ['paris'],
      countries: ['france'],
    },
    confidence: 92,
  },
  {
    query: 'créateurs gaming français vérifiés',
    filters: {
      categories: ['gaming'],
      countries: ['france'],
      verified: true,
    },
    confidence: 88,
  },
];

export const mockAISearchResults = {
  'micro-influenceurs tennis': [
    {
      id: 'tennis_1',
      name: 'Marie Tennis Pro',
      username: 'tennis_pro_marie',
      followers: 45000,
      engagement: 6.5,
      platform: 'instagram',
      category: 'tennis',
      country: 'france',
      avatar: '/avatars/tennis1.jpg',
    },
    {
      id: 'tennis_2',
      name: 'Alex Coach Tennis',
      username: 'coach_tennis_alex',
      followers: 32000,
      engagement: 7.2,
      platform: 'instagram',
      category: 'tennis',
      country: 'france',
      avatar: '/avatars/tennis2.jpg',
    },
  ],
};
```

---

## Résumé des modifications

✅ **Recherche IA avancée** : Interprétation du langage naturel
✅ **Recherche vocale** : Reconnaissance vocale intégrée
✅ **Interface intelligente** : Suggestions et auto-complétion
✅ **Validation des filtres** : Vérification avant recherche
✅ **Confiance IA** : Indicateur de fiabilité de l'interprétation
✅ **Exemples contextuels** : Aperçu des résultats attendus

Cette fonctionnalité révolutionne l'expérience utilisateur en permettant des recherches naturelles et intuitives.
