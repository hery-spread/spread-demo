'use client';

import { Input } from '@/components/ui/Input';
import { UsersIcon } from '@heroicons/react/24/outline';
import CollapsibleFilterCard from './CollapsibleFilterCard';
import { AdvancedSearchFilters } from '@/types';

interface AudienceFiltersCardProps {
  isOpen: boolean;
  onToggle: (id: string) => void;
  filters: AdvancedSearchFilters;
  onFiltersChange: (filters: AdvancedSearchFilters) => void;
}

export default function AudienceFiltersCard({
  isOpen,
  onToggle,
  filters,
  onFiltersChange,
}: AudienceFiltersCardProps) {
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

        {/* Localisation de l'audience */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            Localisation de l&apos;audience
          </h4>
          <div className="space-y-3">
            <div>
              <Input
                label="Pays principaux"
                placeholder="Ex: France, États-Unis, Royaume-Uni... (séparés par des virgules)"
                value={
                  filters.audience?.audienceLocation?.topCountries?.join(
                    ', '
                  ) || ''
                }
                onChange={(e) => {
                  const countries = e.target.value
                    .split(',')
                    .map((country) => country.trim())
                    .filter((country) => country.length > 0);

                  updateAudienceLocationFilter(
                    'topCountries',
                    countries.length > 0 ? countries : undefined
                  );
                }}
              />
            </div>

            <div>
              <Input
                label="Pays à exclure"
                placeholder="Ex: Russie, Chine... (séparés par des virgules)"
                value={
                  filters.audience?.audienceLocation?.excludeCountries?.join(
                    ', '
                  ) || ''
                }
                onChange={(e) => {
                  const countries = e.target.value
                    .split(',')
                    .map((country) => country.trim())
                    .filter((country) => country.length > 0);

                  updateAudienceLocationFilter(
                    'excludeCountries',
                    countries.length > 0 ? countries : undefined
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </CollapsibleFilterCard>
  );
}
