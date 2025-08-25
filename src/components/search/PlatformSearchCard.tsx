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
      <div className="space-y-3">
        {/* Recherche directe d'utilisateur */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-1.5 text-sm">
            <AtSymbolIcon className="w-3.5 h-3.5 text-gray-500" />
            <span>Recherche directe</span>
          </h4>

          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <Input
              type="text"
              placeholder="@zidane, @cristiano..."
              value={userSearchInput}
              onChange={(e) => {
                handleUserSearchChange(e.target.value);
              }}
              className="pl-8 text-sm h-9"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  applyUserSearch();
                }
              }}
            />
            {userSearchInput && (
              <button
                onClick={clearUserSearch}
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Suggestions de recherche */}
          {showSuggestions && (
            <div className="mt-1.5 bg-white border border-gray-200 rounded-lg shadow-lg absolute z-10 w-full">
              {isLoadingSuggestions ? (
                <div className="px-2.5 py-1.5 text-xs text-gray-500 flex items-center space-x-1.5">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-purple-600"></div>
                  <span>Recherche...</span>
                </div>
              ) : searchSuggestions.length > 0 ? (
                searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => selectSuggestion(suggestion)}
                    className="w-full text-left px-2.5 py-1.5 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-1.5">
                      <AtSymbolIcon className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-700">
                        {suggestion}
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-2.5 py-1.5 text-xs text-gray-500">
                  Aucun utilisateur trouvé
                </div>
              )}
            </div>
          )}

          {userSearchInput && !filters.userSearch && (
            <Button onClick={applyUserSearch} size="sm" className="mt-1.5 text-xs h-7">
              Appliquer
            </Button>
          )}

          {filters.userSearch && (
            <div className="mt-1.5 flex items-center space-x-1.5 text-xs">
              <span className="text-gray-600">Actif:</span>
              <span className="inline-flex items-center px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {filters.userSearch}
                <button
                  onClick={clearUserSearch}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <XMarkIcon className="w-2.5 h-2.5" />
                </button>
              </span>
            </div>
          )}
        </div>

        {/* Sélection des plateformes */}
        <div>
          <div className="mb-1.5">
            <h4 className="font-medium text-gray-900 flex items-center space-x-1.5 text-sm">
              <DevicePhoneMobileIconSolid className="w-3.5 h-3.5 text-gray-500" />
              <span>Plateforme</span>
              <span className="inline-flex items-center px-1.5 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                REQUIS
              </span>
            </h4>
          </div>

          {!currentPlatform && (
            <div className="mb-2 p-2 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start space-x-1.5">
                <InformationCircleIcon className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-amber-800">
                  <p className="font-medium">Sélection requise</p>
                  <p className="text-xs mt-0.5">
                    Choisissez une plateforme pour configurer les filtres.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            {(['instagram', 'youtube', 'tiktok'] as const).map((platform) => {
              const isSelected = currentPlatform === platform;
              return (
                <button
                  key={platform}
                  onClick={() => togglePlatform(platform)}
                  className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border text-xs transition-all ${
                    isSelected
                      ? 'border-purple-400 bg-purple-50 text-purple-800'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex-shrink-0 scale-75">{PlatformIcons[platform]}</div>
                  <span className="capitalize">{PlatformLabels[platform]}</span>
                </button>
              );
            })}
          </div>

          {currentPlatform && (
            <div className="mt-1.5 text-xs text-gray-600">
              <span className="mr-1.5">Actif:</span>
              <span className="inline-flex items-center px-1.5 py-0.5 bg-purple-100 text-purple-800 rounded-full">
                {PlatformLabels[currentPlatform]}
                <button
                  onClick={() => togglePlatform(currentPlatform)}
                  className="ml-1 text-purple-600 hover:text-purple-800"
                >
                  <XMarkIcon className="w-2.5 h-2.5" />
                </button>
              </span>
            </div>
          )}
        </div>
      </div>
    </CollapsibleFilterCard>
  );
}
