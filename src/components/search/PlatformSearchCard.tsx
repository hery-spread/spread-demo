'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  DevicePhoneMobileIcon,
  MagnifyingGlassIcon,
  AtSymbolIcon,
  XMarkIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { DevicePhoneMobileIcon as DevicePhoneMobileIconSolid } from '@heroicons/react/24/solid';
import CollapsibleFilterCard from './CollapsibleFilterCard';
import { AdvancedSearchFilters } from '@/types';
import { getUsers } from '@/lib/modash';

interface PlatformSearchCardProps {
  isOpen: boolean;
  onToggle: (id: string) => void;
  filters: AdvancedSearchFilters;
  onFiltersChange: (filters: AdvancedSearchFilters) => void;
  calculationMethod?: 'median' | 'average';
  onCalculationMethodChange?: (method: 'median' | 'average') => void;
}

// Icônes des plateformes
const PlatformIcons = {
  instagram: (
    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-xs">IG</span>
    </div>
  ),
  youtube: (
    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-xs">YT</span>
    </div>
  ),
  tiktok: (
    <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-xs">TT</span>
    </div>
  ),
};

const PlatformLabels = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
};



export default function PlatformSearchCard({
  isOpen,
  onToggle,
  filters,
  onFiltersChange,
  calculationMethod: _calculationMethod = 'median',
  onCalculationMethodChange: _onCalculationMethodChange,
}: PlatformSearchCardProps) {
  const [userSearchInput, setUserSearchInput] = useState(
    filters.userSearch || ''
  );
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);


  // Gestion plateforme (sélection exclusive)
  const currentPlatform =
    (filters.platforms && filters.platforms[0]) || undefined;
  const togglePlatform = (platform: 'instagram' | 'youtube' | 'tiktok') => {
    const newPlatform = currentPlatform === platform ? undefined : platform;
    onFiltersChange({
      ...filters,
      platforms: newPlatform ? [newPlatform] : undefined,
    });
  };

  // Gestion de la recherche utilisateur avec API Modash
  const handleUserSearchChange = async (value: string) => {
    setUserSearchInput(value);

    if (value.length > 1 && currentPlatform) {
      setIsLoadingSuggestions(true);
      try {
        const result = await getUsers(currentPlatform, value, 5);
        const suggestions = result.users.map((user) => `@${user.username}`);
        setSearchSuggestions(suggestions);
        setShowSuggestions(suggestions.length > 0);
      } catch (error) {
        console.error('Error fetching user suggestions:', error);
        // Fallback sur des suggestions mockées
        const mockSuggestions = [
          '@cristiano',
          '@selenagomez',
          '@kyliejenner',
          '@therock',
          '@mrbeast',
          '@pewdiepie',
        ]
          .filter((suggestion) =>
            suggestion.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, 5);

        setSearchSuggestions(mockSuggestions);
        setShowSuggestions(mockSuggestions.length > 0);
      } finally {
        setIsLoadingSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
      setSearchSuggestions([]);
    }
  };

  const applyUserSearch = () => {
    onFiltersChange({
      ...filters,
      userSearch: userSearchInput.trim() || undefined,
    });
    setShowSuggestions(false);
  };

  const clearUserSearch = () => {
    setUserSearchInput('');
    onFiltersChange({
      ...filters,
      userSearch: undefined,
    });
  };

  const selectSuggestion = (suggestion: string) => {
    setUserSearchInput(suggestion);
    setShowSuggestions(false);
    onFiltersChange({
      ...filters,
      userSearch: suggestion,
    });
  };

  // Calculer les filtres actifs
  const hasActiveFilters = !!currentPlatform || !!filters.userSearch;
  const filterCount = (currentPlatform ? 1 : 0) + (filters.userSearch ? 1 : 0);

  return (
    <CollapsibleFilterCard
      id="platform-search"
      title="Plateforme & Recherche"
      description=""
      icon={<DevicePhoneMobileIcon className="w-5 h-5" />}
      isOpen={isOpen}
      onToggle={onToggle}
      hasActiveFilters={hasActiveFilters}
      filterCount={filterCount}
    >
      <div className="space-y-4">
        {/* Recherche directe d'utilisateur */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
            <AtSymbolIcon className="w-4 h-4 text-gray-500" />
            <span>Recherche directe</span>
          </h4>

          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Nom d'utilisateur ou @handle (ex: @zidane)"
              value={userSearchInput}
              onChange={(e) => {
                handleUserSearchChange(e.target.value);
              }}
              className="pl-9"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  applyUserSearch();
                }
              }}
            />
            {userSearchInput && (
              <button
                onClick={clearUserSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Suggestions de recherche */}
          {showSuggestions && (
            <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg absolute z-10 w-full">
              {isLoadingSuggestions ? (
                <div className="px-3 py-2 text-sm text-gray-500 flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                  <span>Recherche en cours...</span>
                </div>
              ) : searchSuggestions.length > 0 ? (
                searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => selectSuggestion(suggestion)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-2">
                      <AtSymbolIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">
                        {suggestion}
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500">
                  Aucun utilisateur trouvé
                </div>
              )}
            </div>
          )}

          {userSearchInput && !filters.userSearch && (
            <Button onClick={applyUserSearch} size="sm" className="mt-2">
              Appliquer la recherche
            </Button>
          )}

          {filters.userSearch && (
            <div className="mt-2 flex items-center space-x-2 text-sm">
              <span className="text-gray-600">Recherche active:</span>
              <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {filters.userSearch}
                <button
                  onClick={clearUserSearch}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            </div>
          )}
        </div>

        {/* Sélection des plateformes */}
        <div>
          <div className="mb-2">
            <h4 className="font-medium text-gray-900 flex items-center space-x-2">
              <DevicePhoneMobileIconSolid className="w-4 h-4 text-gray-500" />
              <span>Plateforme</span>
              <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                OBLIGATOIRE
              </span>
            </h4>
          </div>

          {!currentPlatform && (
            <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <InformationCircleIcon className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium">Sélection requise</p>
                  <p className="text-xs mt-1">
                    Vous devez sélectionner une plateforme avant de configurer
                    les autres filtres pour obtenir des résultats pertinents.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            {(['instagram', 'youtube', 'tiktok'] as const).map((platform) => {
              const isSelected = currentPlatform === platform;
              return (
                <button
                  key={platform}
                  onClick={() => togglePlatform(platform)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg border text-sm transition-all ${
                    isSelected
                      ? 'border-purple-400 bg-purple-50 text-purple-800'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex-shrink-0">{PlatformIcons[platform]}</div>
                  <span className="capitalize">{PlatformLabels[platform]}</span>
                </button>
              );
            })}
          </div>

          {currentPlatform && (
            <div className="mt-2 text-xs text-gray-600">
              <span className="mr-2">Sélection :</span>
              <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                {PlatformLabels[currentPlatform]}
                <button
                  onClick={() => togglePlatform(currentPlatform)}
                  className="ml-1 text-purple-600 hover:text-purple-800"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            </div>
          )}
        </div>


      </div>
    </CollapsibleFilterCard>
  );
}
