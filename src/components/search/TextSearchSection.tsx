'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { SparklesIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SparklesIcon as SparklesIconSolid } from '@heroicons/react/24/solid';
import { AISearchInput, AdvancedSearchFilters } from '@/types';

interface TextSearchSectionProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onFiltersChange: (filters: AdvancedSearchFilters) => void;
}

// Simulation de l'IA pour parser la recherche textuelle
const simulateAIParsing = async (query: string): Promise<AISearchInput> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const lowercaseQuery = query.toLowerCase();
  const parsedFilters: AdvancedSearchFilters = {};
  const confidence = 0.8;

  // Détection des plateformes
  const platforms: ('instagram' | 'youtube' | 'tiktok')[] = [];
  if (
    lowercaseQuery.includes('instagram') ||
    lowercaseQuery.includes('insta')
  ) {
    platforms.push('instagram');
  }
  if (lowercaseQuery.includes('youtube') || lowercaseQuery.includes('yt')) {
    platforms.push('youtube');
  }
  if (lowercaseQuery.includes('tiktok') || lowercaseQuery.includes('tik tok')) {
    platforms.push('tiktok');
  }
  if (platforms.length > 0) {
    parsedFilters.platforms = platforms;
  }

  // Détection du genre
  if (
    lowercaseQuery.includes('femme') ||
    lowercaseQuery.includes('fille') ||
    lowercaseQuery.includes('female')
  ) {
    parsedFilters.creator = { ...parsedFilters.creator, gender: 'FEMALE' };
  } else if (
    lowercaseQuery.includes('homme') ||
    lowercaseQuery.includes('garçon') ||
    lowercaseQuery.includes('male')
  ) {
    parsedFilters.creator = { ...parsedFilters.creator, gender: 'MALE' };
  }

  // Détection des followers
  const followersMatch = lowercaseQuery.match(
    /(\d+)k?\s*(?:followers?|abonnés?)/i
  );
  if (followersMatch) {
    const count =
      parseInt(followersMatch[1]) *
      (followersMatch[0].includes('k') ? 1000 : 1);
    parsedFilters.audience = {
      ...parsedFilters.audience,
      followersRange: { min: count * 0.8, max: count * 1.2 },
    };
  }

  // Détection des catégories
  const categories: string[] = [];
  if (lowercaseQuery.includes('gaming') || lowercaseQuery.includes('jeu')) {
    categories.push('gaming');
  }
  if (
    lowercaseQuery.includes('beauté') ||
    lowercaseQuery.includes('beauty') ||
    lowercaseQuery.includes('makeup')
  ) {
    categories.push('beauty');
  }
  if (
    lowercaseQuery.includes('tech') ||
    lowercaseQuery.includes('technologie')
  ) {
    categories.push('tech');
  }
  if (
    lowercaseQuery.includes('lifestyle') ||
    lowercaseQuery.includes('mode de vie')
  ) {
    categories.push('lifestyle');
  }
  if (lowercaseQuery.includes('fitness') || lowercaseQuery.includes('sport')) {
    categories.push('fitness');
  }
  if (categories.length > 0) {
    parsedFilters.creator = { ...parsedFilters.creator, categories };
  }

  // Détection de la localisation
  if (
    lowercaseQuery.includes('france') ||
    lowercaseQuery.includes('français')
  ) {
    parsedFilters.creator = {
      ...parsedFilters.creator,
      location: { country: 'FR' },
    };
  } else if (
    lowercaseQuery.includes('usa') ||
    lowercaseQuery.includes('américain')
  ) {
    parsedFilters.creator = {
      ...parsedFilters.creator,
      location: { country: 'US' },
    };
  }

  return {
    query,
    confidence,
    parsedFilters,
    suggestions: [],
  };
};

export default function TextSearchSection({
  searchQuery,
  onSearchQueryChange,
  onFiltersChange,
}: TextSearchSectionProps) {
  const [aiResult, setAiResult] = useState<AISearchInput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [storedQuery, setStoredQuery] = useState<string>('');

  const handleAIAnalysis = useCallback(
    async (queryToAnalyze?: string) => {
      const query = queryToAnalyze || searchQuery;
      if (!query.trim()) return;

      setIsAnalyzing(true);
      try {
        const result = await simulateAIParsing(query);
        setAiResult(result);

        // Appliquer automatiquement les filtres détectés
        if (result.parsedFilters) {
          onFiltersChange(result.parsedFilters);
        }

        // Supprimer la recherche du sessionStorage après utilisation
        if (queryToAnalyze) {
          sessionStorage.removeItem('aiSearchQuery');
        }
      } catch (error) {
        console.error("Erreur lors de l'analyse IA:", error);
      } finally {
        setIsAnalyzing(false);
      }
    },
    [searchQuery, onFiltersChange]
  );

  // Récupérer la recherche stockée au montage du composant
  React.useEffect(() => {
    const stored = sessionStorage.getItem('aiSearchQuery');
    if (stored && !searchQuery) {
      setStoredQuery(stored);
      onSearchQueryChange(stored);

      // Lancer automatiquement l'analyse IA si on a une recherche stockée
      setTimeout(() => {
        handleAIAnalysis(stored);
      }, 500);
    }
  }, [searchQuery, onSearchQueryChange, handleAIAnalysis]);

  const clearAiResult = () => {
    setAiResult(null);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <MagnifyingGlassIcon className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              Recherche intelligente
            </h3>
            <p className="text-sm text-gray-600">
              Décrivez ce que vous cherchez en langage naturel
            </p>
          </div>
        </div>

        {/* Indicateur de recherche préremplie */}
        {storedQuery && (
          <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs font-medium text-green-800">
              Recherche importée
            </span>
          </div>
        )}
      </div>

      {/* Textarea de recherche */}
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <textarea
            placeholder='Exemple : "Influenceuses beauté françaises avec plus de 100k followers sur Instagram qui font de la mode et du lifestyle"'
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
            rows={4}
          />
          <Button
            onClick={() => handleAIAnalysis()}
            disabled={!searchQuery.trim() || isAnalyzing}
            size="sm"
            className="mr-0 flex items-center space-x-1"
          >
            {isAnalyzing ? (
              <>
                <SparklesIconSolid className="w-4 h-4 animate-spin" />
                <span className="text-xs">Analyse...</span>
              </>
            ) : (
              <>
                <SparklesIcon className="w-4 h-4" />
                <span className="text-xs">Analyser</span>
              </>
            )}
          </Button>
        </div>

        {/* Exemples retirés à la demande du client */}

        {/* Résultats de l'analyse IA */}
        {aiResult && (
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200/30">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <SparklesIconSolid className="w-5 h-5 text-purple-600" />
                <h4 className="font-medium text-gray-900 text-sm">
                  Analyse IA
                </h4>
                <div className="flex items-center space-x-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      aiResult.confidence >= 0.8
                        ? 'bg-green-500'
                        : aiResult.confidence >= 0.6
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                    }`}
                  ></div>
                  <span className="text-xs text-gray-600">
                    Confiance: {Math.round(aiResult.confidence * 100)}%
                  </span>
                </div>
              </div>
              <button
                onClick={clearAiResult}
                className="text-xs text-gray-500 hover:text-gray-700 font-medium"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-gray-700 mb-3">
              ✅ J&apos;ai configuré{' '}
              {Object.keys(aiResult.parsedFilters || {}).length} section
              {Object.keys(aiResult.parsedFilters || {}).length > 1
                ? 's'
                : ''}{' '}
              de filtres automatiquement
            </p>

            {/* Filtres détectés */}
            {aiResult.parsedFilters &&
              Object.keys(aiResult.parsedFilters).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {aiResult.parsedFilters.platforms && (
                    <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      📱 {aiResult.parsedFilters.platforms.join(', ')}
                    </span>
                  )}
                  {aiResult.parsedFilters.creator?.gender && (
                    <span className="inline-flex items-center px-2 py-1 bg-pink-100 text-pink-800 text-xs font-medium rounded-full">
                      👤 {aiResult.parsedFilters.creator.gender}
                    </span>
                  )}
                  {aiResult.parsedFilters.creator?.categories && (
                    <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      🏷️ {aiResult.parsedFilters.creator.categories.join(', ')}
                    </span>
                  )}
                  {aiResult.parsedFilters.audience?.followersRange && (
                    <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                      👥{' '}
                      {Math.round(
                        aiResult.parsedFilters.audience.followersRange.min /
                          1000
                      )}
                      k -{' '}
                      {Math.round(
                        aiResult.parsedFilters.audience.followersRange.max /
                          1000
                      )}
                      k
                    </span>
                  )}
                  {aiResult.parsedFilters.creator?.location?.country && (
                    <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                      🌍 {aiResult.parsedFilters.creator.location.country}
                    </span>
                  )}
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}
