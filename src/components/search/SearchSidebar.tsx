'use client';

import {
  XMarkIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui';
import { AdvancedSearchFilters, SearchUIState } from '@/types';
import TextSearchSection from './TextSearchSection';
import PlatformSearchCard from './PlatformSearchCard';
import CreatorIdentityFiltersCard from './CreatorIdentityFiltersCard';
import AudienceTargetingFiltersCard from './AudienceTargetingFiltersCard';
import PerformanceFiltersCard from './PerformanceFiltersCard';
import GrowthSponsoringFiltersCard from './GrowthSponsoringFiltersCard';

interface SearchSidebarProps {
  searchState: SearchUIState;
  onSearchStateChange: (state: Partial<SearchUIState>) => void;
  onSearch: () => void;
  isSearching?: boolean;
  calculationMethod?: 'median' | 'average';
  onCalculationMethodChange?: (method: 'median' | 'average') => void;
}

export default function SearchSidebar({
  searchState,
  onSearchStateChange,
  onSearch,
  isSearching = false,
  calculationMethod = 'median',
  onCalculationMethodChange,
}: SearchSidebarProps) {
  const updateFilters = (newFilters: AdvancedSearchFilters) => {
    onSearchStateChange({
      activeFilters: newFilters,
    });
  };

  const updateCardState = (cardId: string) => {
    const newCardStates = {
      ...searchState.cardStates,
      [cardId]: !searchState.cardStates[cardId],
    };

    onSearchStateChange({
      cardStates: newCardStates,
    });
  };

  const clearAllFilters = () => {
    onSearchStateChange({
      searchQuery: '',
      activeFilters: {},
      cardStates: {
        'platform-search': true,
        'creator-identity-filters': true,
        'audience-targeting-filters': true,
        'performance-filters': true,
        'growth-sponsoring-filters': true,
      },
    });
  };

  // Calculer le nombre total de filtres actifs
  const getTotalActiveFilters = () => {
    let count = 0;

    // Compter la recherche textuelle
    if (searchState.searchQuery.trim()) count++;

    // Compter les filtres des différentes sections
    const filters = searchState.activeFilters;

    if (filters.platforms?.length) count++;
    if (filters.userSearch?.trim()) count++;

    if (filters.creator) {
      const creatorKeys = Object.keys(filters.creator).filter((key) => {
        const value = filters.creator![key as keyof typeof filters.creator];
        if (key === 'location') return Object.keys(value || {}).length > 0;
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === 'string') return value.trim().length > 0;
        return value !== undefined && value !== null;
      });
      count += creatorKeys.length;
    }

    if (filters.audience) {
      const audienceKeys = Object.keys(filters.audience).filter((key) => {
        const value = filters.audience![key as keyof typeof filters.audience];
        if (
          typeof value === 'object' &&
          value !== null &&
          !Array.isArray(value)
        ) {
          return Object.keys(value).length > 0;
        }
        if (Array.isArray(value)) return value.length > 0;
        return value !== undefined && value !== null && value !== '';
      });
      count += audienceKeys.length;
    }

    if (filters.content) {
      const contentKeys = Object.keys(filters.content).filter((key) => {
        const value = filters.content![key as keyof typeof filters.content];
        if (
          typeof value === 'object' &&
          value !== null &&
          !Array.isArray(value)
        ) {
          return Object.keys(value).length > 0;
        }
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === 'string') return value.trim().length > 0;
        return value !== undefined && value !== null;
      });
      count += contentKeys.length;
    }

    // Compter les filtres de performance
    if (filters.performance) {
      const performanceKeys = Object.keys(filters.performance).filter((key) => {
        const value =
          filters.performance![key as keyof typeof filters.performance];
        if (
          typeof value === 'object' &&
          value !== null &&
          !Array.isArray(value)
        ) {
          return Object.keys(value).length > 0;
        }
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === 'string') return value.trim().length > 0;
        return value !== undefined && value !== null;
      });
      count += performanceKeys.length;
    }

    // Compter les filtres de croissance
    if (filters.growth) {
      const growthKeys = Object.keys(filters.growth).filter((key) => {
        const value = filters.growth![key as keyof typeof filters.growth];
        if (
          typeof value === 'object' &&
          value !== null &&
          !Array.isArray(value)
        ) {
          return Object.keys(value).length > 0;
        }
        if (typeof value === 'string') return value.trim().length > 0;
        return value !== undefined && value !== null;
      });
      count += growthKeys.length;
    }

    return count;
  };

  const totalActiveFilters = getTotalActiveFilters();
  const hasAnyFilters = totalActiveFilters > 0;

  return (
    <div className="h-full flex flex-col bg-gray-50/30 border-r border-gray-200 relative overflow-hidden">
      {/* Header avec compteur de filtres */}
      <div className="flex-shrink-0 p-4 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">Recherche avancée</h2>
          {hasAnyFilters && (
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-2 py-0.5 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                {totalActiveFilters}
              </span>
              <button
                onClick={clearAllFilters}
                className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                <XMarkIcon className="w-3.5 h-3.5" />
                <span>Effacer</span>
              </button>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-xs">
          {hasAnyFilters
            ? `${totalActiveFilters} filtre${totalActiveFilters > 1 ? 's' : ''} appliqué${totalActiveFilters > 1 ? 's' : ''}. Lancez la recherche.`
            : 'Utilisez les filtres pour affiner votre recherche.'}
        </p>
      </div>

      {/* Zone de filtres scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pr-3">
        {/* Section Recherche Textuelle */}
        <TextSearchSection
          searchQuery={searchState.searchQuery}
          onSearchQueryChange={(query) =>
            onSearchStateChange({ searchQuery: query })
          }
          onFiltersChange={updateFilters}
        />

        {/* Card Plateforme (sans calculationMethod) */}
        <PlatformSearchCard
          isOpen={searchState.cardStates['platform-search'] ?? true}
          onToggle={updateCardState}
          filters={searchState.activeFilters}
          onFiltersChange={updateFilters}
          calculationMethod={calculationMethod}
          onCalculationMethodChange={onCalculationMethodChange}
        />

        {/* 1. Créateur (identité & thématique) - PRIORITAIRE */}
        <CreatorIdentityFiltersCard
          isOpen={searchState.cardStates['creator-identity-filters'] ?? true}
          onToggle={updateCardState}
          filters={searchState.activeFilters}
          onFiltersChange={updateFilters}
          selectedPlatform={searchState.activeFilters.platforms?.[0]}
        />

        {/* 2. Audience (qui ils touchent) */}
        <AudienceTargetingFiltersCard
          isOpen={searchState.cardStates['audience-targeting-filters'] ?? true}
          onToggle={updateCardState}
          filters={searchState.activeFilters}
          onFiltersChange={updateFilters}
          selectedPlatform={searchState.activeFilters.platforms?.[0]}
        />

        {/* 3. Performance (taille & performance) */}
        <PerformanceFiltersCard
          isOpen={searchState.cardStates['performance-filters'] ?? true}
          onToggle={updateCardState}
          filters={searchState.activeFilters}
          onFiltersChange={updateFilters}
          selectedPlatform={searchState.activeFilters.platforms?.[0]}
        />

        {/* 4. Croissance & Sponsoring */}
        <GrowthSponsoringFiltersCard
          isOpen={searchState.cardStates['growth-sponsoring-filters'] ?? true}
          onToggle={updateCardState}
          filters={searchState.activeFilters}
          onFiltersChange={updateFilters}
          selectedPlatform={searchState.activeFilters.platforms?.[0]}
        />
      </div>

      {/* Bouton de recherche sticky en bas de la sidebar */}
      <div className="flex-shrink-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 shadow-lg">
        <Button
          onClick={onSearch}
          disabled={isSearching}
          className="w-full flex items-center justify-center space-x-2 py-3 text-sm font-semibold"
          size="lg"
        >
          {isSearching ? (
            <>
              <ArrowPathIcon className="w-4 h-4 animate-spin" />
              <span>Recherche en cours...</span>
            </>
          ) : (
            <>
              <MagnifyingGlassIcon className="w-4 h-4" />
              <span>
                {totalActiveFilters > 0
                  ? `Rechercher (${totalActiveFilters} filtre${totalActiveFilters > 1 ? 's' : ''})`
                  : 'Rechercher'}
              </span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
