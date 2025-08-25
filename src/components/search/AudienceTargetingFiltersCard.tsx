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
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import CollapsibleFilterCard from './CollapsibleFilterCard';
import { AdvancedSearchFilters } from '@/types';
import { getInterests } from '@/lib/modash';

interface AudienceTargetingFiltersCardProps {
  isOpen: boolean;
  onToggle: (id: string) => void;
  filters: AdvancedSearchFilters;
  onFiltersChange: (filters: AdvancedSearchFilters) => void;
  selectedPlatform?: 'instagram' | 'youtube' | 'tiktok';
}

export default function AudienceTargetingFiltersCard({
  isOpen,
  onToggle,
  filters,
  onFiltersChange,
  selectedPlatform,
}: AudienceTargetingFiltersCardProps) {
  const [interestSuggestions, setInterestSuggestions] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [isLoadingInterests, setIsLoadingInterests] = useState(false);

  type AgeKey =
    | 'age13_17'
    | 'age18_24'
    | 'age25_34'
    | 'age35_44'
    | 'age45_54'
    | 'age55plus';

  const ageRanges: Array<{ key: AgeKey; label: string; modashId: string }> = [
    { key: 'age13_17', label: '👶 13-17 ans', modashId: '13-17' },
    { key: 'age18_24', label: '🧑 18-24 ans', modashId: '18-24' },
    { key: 'age25_34', label: '🧑‍💼 25-34 ans', modashId: '25-34' },
    { key: 'age35_44', label: '👨‍💼 35-44 ans', modashId: '35-44' },
    { key: 'age45_54', label: '👨‍💼 45-54 ans', modashId: '45-64' },
    { key: 'age55plus', label: '👨‍🦳 55+ ans', modashId: '65-' },
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

  const updateAudienceAgeFilter = (key: AgeKey, weight: number) => {
    const currentAges = filters.audience?.audienceAgeModash || [];
    const existingIndex = currentAges.findIndex(
      (age) => age.id === ageRanges.find((r) => r.key === key)?.modashId
    );

    let newAges;
    if (existingIndex >= 0) {
      // Update existing
      newAges = [...currentAges];
      newAges[existingIndex] = {
        id: ageRanges.find((r) => r.key === key)!.modashId,
        weight,
      };
    } else {
      // Add new
      newAges = [
        ...currentAges,
        { id: ageRanges.find((r) => r.key === key)!.modashId, weight },
      ];
    }

    updateAudienceFilter(
      'audienceAgeModash',
      newAges.length > 0 ? newAges : undefined
    );
  };

  const removeAudienceAgeFilter = (key: AgeKey) => {
    const currentAges = filters.audience?.audienceAgeModash || [];
    const modashId = ageRanges.find((r) => r.key === key)?.modashId;
    const newAges = currentAges.filter((age) => age.id !== modashId);
    updateAudienceFilter(
      'audienceAgeModash',
      newAges.length > 0 ? newAges : undefined
    );
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
      key === 'audienceLocation' ||
      key === 'locations'
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

  return (
    <CollapsibleFilterCard
      id="audience-targeting-filters"
      title="Audience (qui ils touchent)"
      description="Filtres sur les caractéristiques de l'audience"
      icon={<UsersIcon className="w-5 h-5" />}
      isOpen={isOpen}
      onToggle={onToggle}
      hasActiveFilters={hasActiveFilters}
      filterCount={activeFilterCount}
    >
      <div className="space-y-6">
        {/* 1. GÉOGRAPHIE DE L'AUDIENCE */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
            <GlobeAltIcon className="w-4 h-4 text-blue-500" />
            <span>Géographie de l'audience</span>
          </h4>

          <div className="space-y-4">
            {/* Sélection de pays avec pourcentages */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pays de l'audience avec pourcentages
              </label>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                <div className="flex items-start space-x-2">
                  <InformationCircleIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-blue-700">
                    <p className="font-medium mb-1">Exemple d'utilisation :</p>
                    <p>
                      "60% de l'audience se situe en France" - Sélectionnez
                      France et indiquez 60%
                    </p>
                  </div>
                </div>
              </div>

              <MultiSelect
                label="Sélectionner des pays"
                placeholder="Choisir les pays de l'audience..."
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

              {/* Pourcentages pour les pays sélectionnés */}
              {filters.audience?.locations?.countries &&
                filters.audience.locations.countries.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      Pourcentages d'audience par pays :
                    </p>
                    {filters.audience.locations.countries.map((countryCode) => {
                      const countryLabel =
                        [
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
                        ].find((c) => c.value === countryCode)?.label ||
                        countryCode;

                      return (
                        <div
                          key={countryCode}
                          className="flex items-center space-x-3 p-2 bg-white rounded border"
                        >
                          <span className="text-sm flex-1">{countryLabel}</span>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              placeholder="% min"
                              className="w-20 text-xs"
                              value={
                                filters.audience?.audienceLocationModash?.find(
                                  (loc) => loc.name === countryCode
                                )?.weight
                                  ? (
                                      filters.audience.audienceLocationModash.find(
                                        (loc) => loc.name === countryCode
                                      )!.weight * 100
                                    ).toString()
                                  : ''
                              }
                              onChange={(e) => {
                                const percentage = parseInt(e.target.value);
                                if (percentage >= 0 && percentage <= 100) {
                                  const currentLocations =
                                    filters.audience?.audienceLocationModash ||
                                    [];
                                  const existingIndex =
                                    currentLocations.findIndex(
                                      (loc) => loc.name === countryCode
                                    );
                                  let newLocations;

                                  if (existingIndex >= 0) {
                                    newLocations = [...currentLocations];
                                    newLocations[existingIndex] = {
                                      id: existingIndex + 1,
                                      name: countryCode,
                                      weight: percentage / 100,
                                    };
                                  } else {
                                    newLocations = [
                                      ...currentLocations,
                                      {
                                        id: currentLocations.length + 1,
                                        name: countryCode,
                                        weight: percentage / 100,
                                      },
                                    ];
                                  }

                                  updateAudienceFilter(
                                    'audienceLocationModash',
                                    newLocations
                                  );
                                }
                              }}
                            />
                            <span className="text-xs text-gray-500">%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
            </div>

            <MultiSelect
              label="Villes de l'audience"
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

        {/* 2. LANGUE DE L'AUDIENCE */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            🗣️ Langue de l'audience
          </h4>
          <Select
            label="Langue principale de l'audience"
            value={filters.audience?.audienceLanguage || ''}
            onChange={(e) =>
              updateAudienceFilter('audienceLanguage', e.target.value)
            }
            options={[
              { value: '', label: 'Toutes les langues' },
              { value: 'fr', label: '🇫🇷 Français' },
              { value: 'en', label: '🇺🇸 Anglais' },
              { value: 'es', label: '🇪🇸 Espagnol' },
              { value: 'de', label: '🇩🇪 Allemand' },
              { value: 'it', label: '🇮🇹 Italien' },
              { value: 'pt', label: '🇵🇹 Portugais' },
              { value: 'ja', label: '🇯🇵 Japonais' },
              { value: 'ko', label: '🇰🇷 Coréen' },
              { value: 'ar', label: '🇸🇦 Arabe' },
              { value: 'hi', label: '🇮🇳 Hindi' },
              { value: 'zh', label: '🇨🇳 Chinois' },
              { value: 'ru', label: '🇷🇺 Russe' },
            ]}
          />
        </div>

        {/* 3. GENRE DE L'AUDIENCE */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            👥 Genre de l'audience
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                👨 Pourcentage d&apos;hommes (%)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  min="0"
                  max="100"
                  value={
                    filters.audience?.audienceGender?.malePercentage?.min || ''
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
                  min="0"
                  max="100"
                  value={
                    filters.audience?.audienceGender?.malePercentage?.max || ''
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                👩 Pourcentage de femmes (%)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  min="0"
                  max="100"
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
                  min="0"
                  max="100"
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

        {/* 4. ÂGE DE L'AUDIENCE (avec système de poids Modash) */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            🎂 Âge de l'audience
          </h4>

          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Sélectionnez les tranches d'âge avec leur importance (poids) :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ageRanges.map((ageRange) => {
                const existingFilter =
                  filters.audience?.audienceAgeModash?.find(
                    (age) => age.id === ageRange.modashId
                  );
                const isSelected = !!existingFilter;
                const currentWeight = existingFilter?.weight || 0.3;

                return (
                  <div
                    key={ageRange.key}
                    className={`p-3 border-2 rounded-lg transition-all ${
                      isSelected
                        ? 'border-purple-300 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            if (e.target.checked) {
                              updateAudienceAgeFilter(ageRange.key, 0.3);
                            } else {
                              removeAudienceAgeFilter(ageRange.key);
                            }
                          }}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700">
                          {ageRange.label}
                        </span>
                      </label>
                    </div>

                    {isSelected && (
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Poids (importance) :
                        </label>
                        <Select
                          value={currentWeight.toString()}
                          onChange={(e) => {
                            const weight = parseFloat(e.target.value);
                            updateAudienceAgeFilter(ageRange.key, weight);
                          }}
                          options={[
                            { value: '0.1', label: '10% - Faible' },
                            { value: '0.2', label: '20% - Modéré' },
                            { value: '0.3', label: '30% - Standard' },
                            { value: '0.5', label: '50% - Important' },
                            { value: '0.7', label: '70% - Très important' },
                            { value: '1.0', label: '100% - Critique' },
                          ]}
                          className="text-xs"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5. INTÉRÊTS DE L'AUDIENCE (Instagram uniquement) */}
        {selectedPlatform === 'instagram' && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
              <HeartIcon className="w-4 h-4 text-pink-500" />
              <span>Intérêts de l'audience</span>
            </h4>

            <div className="space-y-4">
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <InformationCircleIcon className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-pink-700">
                    <p className="font-medium mb-1">
                      Intérêts de l'audience (Instagram uniquement) :
                    </p>
                    <p>
                      Filtrez par les centres d'intérêt de l'audience du
                      créateur. Utilisez les poids pour définir l'importance de
                      chaque intérêt.
                    </p>
                  </div>
                </div>
              </div>

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
                          console.error('Error fetching interests:', error);
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
                              const currentInterests =
                                filters.audience?.audienceInterests || [];
                              const newInterest = {
                                id: interest.id,
                                name: interest.name,
                                weight,
                              };
                              updateAudienceFilter('audienceInterests', [
                                ...currentInterests,
                                newInterest,
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

              {/* Affichage des intérêts sélectionnés */}
              {filters.audience?.audienceInterests &&
                filters.audience.audienceInterests.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Intérêts sélectionnés :
                    </p>
                    <div className="space-y-2">
                      {filters.audience.audienceInterests.map(
                        (interest, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-white rounded border"
                          >
                            <span className="text-sm">{interest.name}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">
                                Poids: {(interest.weight * 100).toFixed(0)}%
                              </span>
                              <button
                                onClick={() => {
                                  const newInterests =
                                    filters.audience?.audienceInterests?.filter(
                                      (_, i) => i !== index
                                    );
                                  updateAudienceFilter(
                                    'audienceInterests',
                                    newInterests?.length
                                      ? newInterests
                                      : undefined
                                  );
                                }}
                                className="text-red-500 hover:text-red-700"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </CollapsibleFilterCard>
  );
}
