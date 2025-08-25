'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SparklesIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SparklesIcon as SparklesIconSolid } from '@heroicons/react/24/solid';
import CollapsibleFilterCard from './CollapsibleFilterCard';
import { AISearchInput, AdvancedSearchFilters } from '@/types';

interface AISearchCardProps {
  isOpen: boolean;
  onToggle: (id: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onFiltersChange: (filters: AdvancedSearchFilters) => void;
  isProcessing?: boolean;
}

// Simulation de l'IA pour parser la recherche textuelle
const simulateAIParsing = async (query: string): Promise<AISearchInput> => {
  // Simulation d'un délai d'API
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

  // Suggestions d'amélioration
  const suggestions: string[] = [];
  if (!parsedFilters.platforms) {
    suggestions.push('Précisez une plateforme (Instagram, YouTube, TikTok)');
  }
  if (!parsedFilters.audience?.followersRange) {
    suggestions.push('Ajoutez une fourchette de followers');
  }
  if (!parsedFilters.creator?.categories) {
    suggestions.push('Spécifiez une catégorie de contenu');
  }

  return {
    query,
    confidence,
    parsedFilters,
    suggestions: suggestions.length > 0 ? suggestions : undefined,
  };
};

export default function AISearchCard({
  isOpen,
  onToggle,
  searchQuery,
  onSearchQueryChange,
  onFiltersChange,
}: AISearchCardProps) {
  const [aiResult, setAiResult] = useState<AISearchInput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [_animatingFilters, setAnimatingFilters] = useState<string[]>([]);
  const [pulseIndex, setPulseIndex] = useState(0);

  // Animation des points de chargement
  useEffect(() => {
    if (isAnalyzing) {
      const pulseTimer = setInterval(() => {
        setPulseIndex((prev) => (prev + 1) % 3);
      }, 500);
      return () => clearInterval(pulseTimer);
    }
  }, [isAnalyzing]);

  const handleAIAnalysis = async () => {
    if (!searchQuery.trim()) return;

    setIsAnalyzing(true);
    setAnimatingFilters([]);
    try {
      const result = await simulateAIParsing(searchQuery);

      // Animation progressive des filtres détectés
      if (result.parsedFilters) {
        const filterKeys = Object.keys(result.parsedFilters);
        filterKeys.forEach((key, index) => {
          setTimeout(() => {
            setAnimatingFilters((prev) => [...prev, key]);
          }, index * 300);
        });
      }

      setAiResult(result);

      // Appliquer automatiquement les filtres détectés avec un délai
      if (result.parsedFilters) {
        const filterKeys = Object.keys(result.parsedFilters);
        setTimeout(
          () => {
            onFiltersChange(result.parsedFilters || {});
          },
          filterKeys.length * 300 + 500
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'analyse IA:", error);
    } finally {
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 2000);
    }
  };

  const hasActiveFilters = !!searchQuery.trim();

  return (
    <CollapsibleFilterCard
      id="ai-search"
      title="Recherche Intelligente"
      description="Décrivez ce que vous cherchez, l'IA se charge du reste"
      icon={<SparklesIcon className="w-5 h-5" />}
      isOpen={isOpen}
      onToggle={onToggle}
      hasActiveFilters={hasActiveFilters}
      filterCount={hasActiveFilters ? 1 : 0}
    >
      <div className="space-y-4">
        {/* Champ de recherche principal */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Ex: influenceuses beauté françaises avec +100k followers sur Instagram"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="pl-10 pr-28 py-3 text-sm"
          />
          <Button
            onClick={handleAIAnalysis}
            disabled={!searchQuery.trim() || isAnalyzing}
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 z-10"
          >
            {isAnalyzing ? (
              <>
                <SparklesIconSolid className="w-4 h-4 animate-spin" />
                <span className="text-xs">Analyse</span>
                <div className="flex space-x-1 ml-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`w-1 h-1 bg-white rounded-full transition-all duration-300 ${
                        pulseIndex === i
                          ? 'scale-125 opacity-100'
                          : 'scale-75 opacity-40'
                      }`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <SparklesIcon className="w-4 h-4" />
                <span className="text-xs">Analyser</span>
              </>
            )}
          </Button>
        </div>

        {/* Exemples de recherche */}
        {!aiResult && (
          <div>
            <p className="text-xs text-gray-500 mb-2">
              💡 Exemples de recherches :
            </p>
            <div className="space-y-1">
              {[
                'Gaming YouTubers avec plus de 500k abonnés',
                'Influenceuses mode françaises vérifiées',
                'Tech reviewers avec bon engagement sur YouTube',
                'Fitness influencers femmes 18-35 ans',
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => onSearchQueryChange(example)}
                  className="block w-full text-left text-xs text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-2 rounded-lg transition-colors"
                >
                  {`"${example}"`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Résultats de l'analyse IA */}
        {aiResult && (
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200/30">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <SparklesIconSolid className="w-5 h-5 text-purple-600" />
              </div>

              <div className="flex-1 space-y-3">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
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
                  <p className="text-sm text-gray-700">
                    ✅ J&apos;ai automatiquement configuré{' '}
                    {Object.keys(aiResult.parsedFilters || {}).length} section
                    {Object.keys(aiResult.parsedFilters || {}).length > 1
                      ? 's'
                      : ''}{' '}
                    de filtres
                  </p>
                </div>

                {/* Filtres détectés */}
                {aiResult.parsedFilters &&
                  Object.keys(aiResult.parsedFilters).length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-2">
                        🎯 Filtres appliqués :
                      </p>
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
                            🏷️{' '}
                            {aiResult.parsedFilters.creator.categories.join(
                              ', '
                            )}
                          </span>
                        )}
                        {aiResult.parsedFilters.audience?.followersRange && (
                          <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                            👥{' '}
                            {Math.round(
                              aiResult.parsedFilters.audience.followersRange
                                .min / 1000
                            )}
                            k -{' '}
                            {Math.round(
                              aiResult.parsedFilters.audience.followersRange
                                .max / 1000
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
                    </div>
                  )}

                {/* Suggestions d'amélioration */}
                {aiResult.suggestions && aiResult.suggestions.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-2">
                      💡 Pour affiner votre recherche :
                    </p>
                    <ul className="space-y-1">
                      {aiResult.suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="text-xs text-gray-600 flex items-start space-x-1"
                        >
                          <span>•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={() => setAiResult(null)}
                  className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                >
                  Nouvelle analyse
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </CollapsibleFilterCard>
  );
}
