'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import MultiSelect from '@/components/ui/MultiSelect';
import {
  UsersIcon,
  GlobeAltIcon,
  HeartIcon,
  InformationCircleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import CollapsibleFilterCard from './CollapsibleFilterCard';
import { AdvancedSearchFilters } from '@/types';
import { getLocations, getInterests, getLanguages } from '@/lib/modash';

interface AudienceFiltersCardProps {
  isOpen: boolean;
  onToggle: (id: string) => void;
  filters: AdvancedSearchFilters;
  onFiltersChange: (filters: AdvancedSearchFilters) => void;
  selectedPlatform?: 'instagram' | 'youtube' | 'tiktok';
}

export default function AudienceFiltersCard({
  isOpen,
  onToggle,
  filters,
  onFiltersChange,
  selectedPlatform,
}: AudienceFiltersCardProps) {
  // États pour les composants avancés
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true);
  const [locationSuggestions, setLocationSuggestions] = useState<
    Array<{ id: number; name: string; title: string }>
  >([]);
  const [interestSuggestions, setInterestSuggestions] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [languageSuggestions, setLanguageSuggestions] = useState<
    Array<{ code: string; name: string }>
  >([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [isLoadingInterests, setIsLoadingInterests] = useState(false);
  const [isLoadingLanguages, setIsLoadingLanguages] = useState(false);
  type AgeKey =
    | 'age13_17'
    | 'age18_24'
    | 'age25_34'
    | 'age35_44'
    | 'age45_54'
    | 'age55plus';
  const ageRanges: Array<{ key: AgeKey; label: string }> = [
    { key: 'age13_17', label: '👶 13-17 ans' },
    { key: 'age18_24', label: '🧑 18-24 ans' },
    { key: 'age25_34', label: '🧑‍💼 25-34 ans' },
    { key: 'age35_44', label: '👨‍💼 35-44 ans' },
    { key: 'age45_54', label: '👨‍💼 45-54 ans' },
    { key: 'age55plus', label: '👨‍🦳 55+ ans' },
  ];
  const updateAudienceFilter = (
    key: keyof NonNullable<AdvancedSearchFilters['audience']>,
    value: unknown
  ) => {
    onFiltersChange({
      ...filters,
      audience: {
        ...filters.audience,
        [key]: value || undefined,
      },
    });
  };

  const updateAudienceGenderFilter = (
    key: 'malePercentage' | 'femalePercentage',
    value: unknown
  ) => {
    onFiltersChange({
      ...filters,
      audience: {
        ...filters.audience,
        audienceGender: {
          ...filters.audience?.audienceGender,
          [key]: value || undefined,
        },
      },
    });
  };

  const updateAudienceAgeFilter = (
    key:
      | 'age13_17'
      | 'age18_24'
      | 'age25_34'
      | 'age35_44'
      | 'age45_54'
      | 'age55plus',
    value: unknown
  ) => {
    onFiltersChange({
      ...filters,
      audience: {
        ...filters.audience,
        audienceAgeRange: {
          ...filters.audience?.audienceAgeRange,
          [key]: value || undefined,
        },
      },
    });
  };

  const updateAudienceLocationFilter = (
    key: 'topCountries' | 'excludeCountries',
    value: unknown
  ) => {
    onFiltersChange({
      ...filters,
      audience: {
        ...filters.audience,
        audienceLocation: {
          ...filters.audience?.audienceLocation,
          [key]: value || undefined,
        },
      },
    });
  };

  const updateLocationsFilter = (
    key: 'countries' | 'cities',
    value: string[]
  ) => {
    onFiltersChange({
      ...filters,
      audience: {
        ...filters.audience,
        locations: {
          ...filters.audience?.locations,
          [key]: value.length > 0 ? value : undefined,
        },
      },
    });
  };

  // Calculer les filtres actifs
  const audienceFilters = filters.audience || {};
  const activeFilterCount = Object.keys(audienceFilters).filter((key) => {
    const value = audienceFilters[key as keyof typeof audienceFilters];
    if (
      key === 'audienceGender' ||
      key === 'audienceAgeRange' ||
      key === 'audienceLocation'
    ) {
      return Object.keys(value || {}).length > 0;
    }
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(
        (v) => v !== undefined && v !== null && v !== ''
      );
    }
    return value !== undefined && value !== null && value !== '';
  }).length;

  const hasActiveFilters = activeFilterCount > 0;

  // utilitaire non utilisé retiré (formatNumber)

  return (
    <CollapsibleFilterCard
      id="audience-filters"
      title="Audience"
      description="Filtres sur les caractéristiques de l'audience"
      icon={<UsersIcon className="w-5 h-5" />}
      isOpen={isOpen}
      onToggle={onToggle}
      hasActiveFilters={hasActiveFilters}
      filterCount={activeFilterCount}
    >
      <div className="space-y-6">
        {/* Taille de l'audience */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            Taille de l&apos;audience
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de followers
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min (ex: 100000)"
                  value={filters.audience?.followersRange?.min || ''}
                  onChange={(e) =>
                    updateAudienceFilter('followersRange', {
                      ...filters.audience?.followersRange,
                      min: parseInt(e.target.value) || undefined,
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Max (ex: 1000000)"
                  value={filters.audience?.followersRange?.max || ''}
                  onChange={(e) =>
                    updateAudienceFilter('followersRange', {
                      ...filters.audience?.followersRange,
                      max: parseInt(e.target.value) || undefined,
                    })
                  }
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                💡 Raccourcis: 10K = 10,000 | 1M = 1,000,000
              </div>
            </div>

            {/* Suggestions de tailles */}
            <div>
              <p className="text-xs text-gray-600 mb-2">Tailles suggérées :</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: '10K-100K', min: 10000, max: 100000 },
                  { label: '100K-500K', min: 100000, max: 500000 },
                  { label: '500K-1M', min: 500000, max: 1000000 },
                  { label: '1M-5M', min: 1000000, max: 5000000 },
                  { label: '5M+', min: 5000000, max: undefined },
                ].map((range) => (
                  <button
                    key={range.label}
                    onClick={() =>
                      updateAudienceFilter('followersRange', {
                        min: range.min,
                        max: range.max,
                      })
                    }
                    className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-purple-100 hover:text-purple-800 transition-colors"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Engagement */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Engagement</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taux d&apos;engagement (%)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Min"
                  value={filters.audience?.engagementRange?.min || ''}
                  onChange={(e) =>
                    updateAudienceFilter('engagementRange', {
                      ...filters.audience?.engagementRange,
                      min: parseFloat(e.target.value) || undefined,
                    })
                  }
                />
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Max"
                  value={filters.audience?.engagementRange?.max || ''}
                  onChange={(e) =>
                    updateAudienceFilter('engagementRange', {
                      ...filters.audience?.engagementRange,
                      max: parseFloat(e.target.value) || undefined,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Moyenne de likes par post
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.audience?.avgLikesRange?.min || ''}
                  onChange={(e) =>
                    updateAudienceFilter('avgLikesRange', {
                      ...filters.audience?.avgLikesRange,
                      min: parseInt(e.target.value) || undefined,
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.audience?.avgLikesRange?.max || ''}
                  onChange={(e) =>
                    updateAudienceFilter('avgLikesRange', {
                      ...filters.audience?.avgLikesRange,
                      max: parseInt(e.target.value) || undefined,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Moyenne de commentaires
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.audience?.avgCommentsRange?.min || ''}
                  onChange={(e) =>
                    updateAudienceFilter('avgCommentsRange', {
                      ...filters.audience?.avgCommentsRange,
                      min: parseInt(e.target.value) || undefined,
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.audience?.avgCommentsRange?.max || ''}
                  onChange={(e) =>
                    updateAudienceFilter('avgCommentsRange', {
                      ...filters.audience?.avgCommentsRange,
                      max: parseInt(e.target.value) || undefined,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Moyenne de vues (vidéos)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.audience?.avgViewsRange?.min || ''}
                  onChange={(e) =>
                    updateAudienceFilter('avgViewsRange', {
                      ...filters.audience?.avgViewsRange,
                      min: parseInt(e.target.value) || undefined,
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.audience?.avgViewsRange?.max || ''}
                  onChange={(e) =>
                    updateAudienceFilter('avgViewsRange', {
                      ...filters.audience?.avgViewsRange,
                      max: parseInt(e.target.value) || undefined,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Localisation simple */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            Localisation de l&apos;audience
          </h4>
          <div className="space-y-4">
            <MultiSelect
              label="Pays"
              placeholder="Sélectionner des pays..."
              values={[
                { value: 'FR', label: '🇫🇷 France' },
                { value: 'US', label: '🇺🇸 États-Unis' },
                { value: 'GB', label: '🇬🇧 Royaume-Uni' },
                { value: 'DE', label: '🇩🇪 Allemagne' },
                { value: 'ES', label: '🇪🇸 Espagne' },
                { value: 'IT', label: '🇮🇹 Italie' },
                { value: 'CA', label: '🇨🇦 Canada' },
                { value: 'AU', label: '🇦🇺 Australie' },
                { value: 'BR', label: '🇧🇷 Brésil' },
                { value: 'MX', label: '🇲🇽 Mexique' },
                { value: 'JP', label: '🇯🇵 Japon' },
                { value: 'KR', label: '🇰🇷 Corée du Sud' },
                { value: 'IN', label: '🇮🇳 Inde' },
                { value: 'CN', label: '🇨🇳 Chine' },
                { value: 'RU', label: '🇷🇺 Russie' },
              ]}
              selected={filters.audience?.locations?.countries || []}
              onChange={(selected) =>
                updateLocationsFilter('countries', selected)
              }
              searchable={true}
            />

            <MultiSelect
              label="Villes"
              placeholder="Sélectionner des villes..."
              values={[
                { value: 'paris', label: '🏙️ Paris' },
                { value: 'london', label: '🏙️ Londres' },
                { value: 'newyork', label: '🏙️ New York' },
                { value: 'losangeles', label: '🏙️ Los Angeles' },
                { value: 'madrid', label: '🏙️ Madrid' },
                { value: 'berlin', label: '🏙️ Berlin' },
                { value: 'rome', label: '🏙️ Rome' },
                { value: 'toronto', label: '🏙️ Toronto' },
                { value: 'sydney', label: '🏙️ Sydney' },
                { value: 'tokyo', label: '🏙️ Tokyo' },
                { value: 'seoul', label: '🏙️ Séoul' },
                { value: 'mumbai', label: '🏙️ Mumbai' },
                { value: 'shanghai', label: '🏙️ Shanghai' },
                { value: 'moscow', label: '🏙️ Moscou' },
              ]}
              selected={filters.audience?.locations?.cities || []}
              onChange={(selected) => updateLocationsFilter('cities', selected)}
              searchable={true}
            />
          </div>
        </div>

        {/* Démographie de l'audience */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            Démographie de l&apos;audience
          </h4>

          {/* Répartition par genre */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Répartition par genre (%)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  👨 Pourcentage d&apos;hommes
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={
                      filters.audience?.audienceGender?.malePercentage?.min ||
                      ''
                    }
                    onChange={(e) =>
                      updateAudienceGenderFilter('malePercentage', {
                        ...filters.audience?.audienceGender?.malePercentage,
                        min: parseInt(e.target.value) || undefined,
                      })
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={
                      filters.audience?.audienceGender?.malePercentage?.max ||
                      ''
                    }
                    onChange={(e) =>
                      updateAudienceGenderFilter('malePercentage', {
                        ...filters.audience?.audienceGender?.malePercentage,
                        max: parseInt(e.target.value) || undefined,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  👩 Pourcentage de femmes
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={
                      filters.audience?.audienceGender?.femalePercentage?.min ||
                      ''
                    }
                    onChange={(e) =>
                      updateAudienceGenderFilter('femalePercentage', {
                        ...filters.audience?.audienceGender?.femalePercentage,
                        min: parseInt(e.target.value) || undefined,
                      })
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={
                      filters.audience?.audienceGender?.femalePercentage?.max ||
                      ''
                    }
                    onChange={(e) =>
                      updateAudienceGenderFilter('femalePercentage', {
                        ...filters.audience?.audienceGender?.femalePercentage,
                        max: parseInt(e.target.value) || undefined,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Répartition par âge */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Répartition par tranche d&apos;âge (%)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {ageRanges.map((ageRange) => (
                <div key={ageRange.key}>
                  <label className="block text-xs text-gray-600 mb-1">
                    {ageRange.label}
                  </label>
                  <div className="grid grid-cols-2 gap-1">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={
                        (
                          filters.audience?.audienceAgeRange as
                            | Record<string, { min?: number; max?: number }>
                            | undefined
                        )?.[ageRange.key]?.min || ''
                      }
                      onChange={(e) =>
                        updateAudienceAgeFilter(ageRange.key as AgeKey, {
                          ...((
                            filters.audience?.audienceAgeRange as
                              | Record<string, { min?: number; max?: number }>
                              | undefined
                          )?.[ageRange.key] || {}),
                          min: parseInt(e.target.value) || undefined,
                        })
                      }
                      className="text-xs"
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={
                        (
                          filters.audience?.audienceAgeRange as
                            | Record<string, { min?: number; max?: number }>
                            | undefined
                        )?.[ageRange.key]?.max || ''
                      }
                      onChange={(e) =>
                        updateAudienceAgeFilter(ageRange.key as AgeKey, {
                          ...((
                            filters.audience?.audienceAgeRange as
                              | Record<string, { min?: number; max?: number }>
                              | undefined
                          )?.[ageRange.key] || {}),
                          max: parseInt(e.target.value) || undefined,
                        })
                      }
                      className="text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filtres avancés avec système de weights Modash */}
        <div>
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <GlobeAltIcon className="w-4 h-4" />
            <span>Filtres avancés Modash</span>
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform ${
                showAdvancedFilters ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>

          {showAdvancedFilters && (
            <div className="mt-4 space-y-6 p-4 bg-gray-50 rounded-lg">
              {/* Localisation avec weights */}
              <div>
                <h5 className="font-medium text-gray-800 mb-3 flex items-center space-x-2">
                  <GlobeAltIcon className="w-4 h-4 text-blue-500" />
                  <span>
                    Localisation de l&apos;audience (système de poids)
                  </span>
                </h5>

                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <InformationCircleIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-blue-700">
                        <p className="font-medium mb-1">
                          Système de poids Modash :
                        </p>
                        <p>
                          Définissez l&apos;importance de chaque critère (0.1 =
                          10%, 0.5 = 50%, etc.)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rechercher des pays
                    </label>
                    <div className="relative">
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Tapez pour rechercher des pays..."
                        className="pl-9"
                        onChange={async (e) => {
                          const query = e.target.value;
                          if (query.length > 1 && selectedPlatform) {
                            setIsLoadingLocations(true);
                            try {
                              const result = await getLocations(
                                selectedPlatform,
                                query,
                                10
                              );
                              setLocationSuggestions(result.locations);
                            } catch (error) {
                              console.error('Error fetching locations:', error);
                            } finally {
                              setIsLoadingLocations(false);
                            }
                          } else {
                            setLocationSuggestions([]);
                          }
                        }}
                      />
                    </div>

                    {isLoadingLocations && (
                      <div className="mt-2 text-sm text-gray-500 flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                        <span>Recherche en cours...</span>
                      </div>
                    )}

                    {locationSuggestions.length > 0 && (
                      <div className="mt-2 space-y-2">
                        <p className="text-xs text-gray-600">
                          Cliquez pour ajouter avec un poids :
                        </p>
                        <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                          {locationSuggestions.map((location) => (
                            <div
                              key={location.id}
                              className="flex items-center space-x-2 p-2 bg-white rounded border"
                            >
                              <span className="text-sm flex-1">
                                {location.title}
                              </span>
                              <Select
                                options={[
                                  { value: '0.1', label: '10%' },
                                  { value: '0.2', label: '20%' },
                                  { value: '0.3', label: '30%' },
                                  { value: '0.5', label: '50%' },
                                  { value: '0.7', label: '70%' },
                                  { value: '1.0', label: '100%' },
                                ]}
                                onChange={(e) => {
                                  const weight = parseFloat(e.target.value);
                                  // Ajouter la location avec son poids
                                  const currentLocations =
                                    filters.audience?.audienceLocation
                                      ?.topCountries || [];
                                  const newLocation = `${location.title}:${weight}`;
                                  updateAudienceLocationFilter('topCountries', [
                                    ...currentLocations,
                                    newLocation,
                                  ]);
                                }}
                                className="w-20"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Affichage des pays sélectionnés avec poids */}
                  {filters.audience?.audienceLocation?.topCountries &&
                    filters.audience.audienceLocation.topCountries.length >
                      0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Pays sélectionnés :
                        </p>
                        <div className="space-y-2">
                          {filters.audience.audienceLocation.topCountries.map(
                            (country, index) => {
                              const [name, weight] = country.split(':');
                              return (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-2 bg-white rounded border"
                                >
                                  <span className="text-sm">{name}</span>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-500">
                                      Poids: {weight || '1.0'}
                                    </span>
                                    <button
                                      onClick={() => {
                                        const newCountries =
                                          filters.audience?.audienceLocation?.topCountries?.filter(
                                            (_, i) => i !== index
                                          );
                                        updateAudienceLocationFilter(
                                          'topCountries',
                                          newCountries?.length
                                            ? newCountries
                                            : undefined
                                        );
                                      }}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      ×
                                    </button>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </div>

              {/* Intérêts (Instagram uniquement) */}
              {selectedPlatform === 'instagram' && (
                <div>
                  <h5 className="font-medium text-gray-800 mb-3 flex items-center space-x-2">
                    <HeartIcon className="w-4 h-4 text-pink-500" />
                    <span>Intérêts de l&apos;audience</span>
                  </h5>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rechercher des intérêts
                      </label>
                      <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="Tapez pour rechercher des intérêts..."
                          className="pl-9"
                          onChange={async (e) => {
                            const query = e.target.value;
                            if (query.length > 1) {
                              setIsLoadingInterests(true);
                              try {
                                const result = await getInterests(query, 10);
                                setInterestSuggestions(result.interests);
                              } catch (error) {
                                console.error(
                                  'Error fetching interests:',
                                  error
                                );
                              } finally {
                                setIsLoadingInterests(false);
                              }
                            } else {
                              setInterestSuggestions([]);
                            }
                          }}
                        />
                      </div>

                      {isLoadingInterests && (
                        <div className="mt-2 text-sm text-gray-500 flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                          <span>Recherche en cours...</span>
                        </div>
                      )}

                      {interestSuggestions.length > 0 && (
                        <div className="mt-2 space-y-2">
                          <p className="text-xs text-gray-600">
                            Cliquez pour ajouter avec un poids :
                          </p>
                          <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                            {interestSuggestions.map((interest) => (
                              <div
                                key={interest.id}
                                className="flex items-center space-x-2 p-2 bg-white rounded border"
                              >
                                <span className="text-sm flex-1">
                                  {interest.name}
                                </span>
                                <Select
                                  options={[
                                    { value: '0.1', label: '10%' },
                                    { value: '0.2', label: '20%' },
                                    { value: '0.3', label: '30%' },
                                    { value: '0.5', label: '50%' },
                                    { value: '0.7', label: '70%' },
                                    { value: '1.0', label: '100%' },
                                  ]}
                                  onChange={(e) => {
                                    const weight = parseFloat(e.target.value);
                                    // Ajouter l'intérêt avec son poids (logique à implémenter)
                                    console.log(
                                      `Adding interest ${interest.name} with weight ${weight}`
                                    );
                                  }}
                                  className="w-20"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Langues avec weights */}
              <div>
                <h5 className="font-medium text-gray-800 mb-3">
                  Langues de l&apos;audience
                </h5>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rechercher des langues
                    </label>
                    <div className="relative">
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Tapez pour rechercher des langues..."
                        className="pl-9"
                        onChange={async (e) => {
                          const query = e.target.value;
                          if (query.length > 1 && selectedPlatform) {
                            setIsLoadingLanguages(true);
                            try {
                              const result = await getLanguages(
                                selectedPlatform,
                                query,
                                10
                              );
                              setLanguageSuggestions(result.languages);
                            } catch (error) {
                              console.error('Error fetching languages:', error);
                            } finally {
                              setIsLoadingLanguages(false);
                            }
                          } else {
                            setLanguageSuggestions([]);
                          }
                        }}
                      />
                    </div>

                    {isLoadingLanguages && (
                      <div className="mt-2 text-sm text-gray-500 flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                        <span>Recherche en cours...</span>
                      </div>
                    )}

                    {languageSuggestions.length > 0 && (
                      <div className="mt-2 space-y-2">
                        <p className="text-xs text-gray-600">
                          Cliquez pour ajouter avec un poids :
                        </p>
                        <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                          {languageSuggestions.map((language) => (
                            <div
                              key={language.code}
                              className="flex items-center space-x-2 p-2 bg-white rounded border"
                            >
                              <span className="text-sm flex-1">
                                {language.name} ({language.code})
                              </span>
                              <Select
                                options={[
                                  { value: '0.1', label: '10%' },
                                  { value: '0.2', label: '20%' },
                                  { value: '0.3', label: '30%' },
                                  { value: '0.5', label: '50%' },
                                  { value: '0.7', label: '70%' },
                                  { value: '1.0', label: '100%' },
                                ]}
                                onChange={(e) => {
                                  const weight = parseFloat(e.target.value);
                                  // Ajouter la langue avec son poids (logique à implémenter)
                                  console.log(
                                    `Adding language ${language.name} with weight ${weight}`
                                  );
                                }}
                                className="w-20"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Aide contextuelle */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <InformationCircleIcon className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-purple-700">
                    <p className="font-medium mb-1">
                      Système de poids Modash :
                    </p>
                    <ul className="space-y-1">
                      <li>
                        • Les poids déterminent l&apos;importance de chaque
                        critère
                      </li>
                      <li>
                        • 0.1 = 10% d&apos;importance, 1.0 = 100%
                        d&apos;importance
                      </li>
                      <li>
                        • Combinez plusieurs critères pour des recherches
                        précises
                      </li>
                      <li>
                        • Les intérêts ne sont disponibles que sur Instagram
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </CollapsibleFilterCard>
  );
}
