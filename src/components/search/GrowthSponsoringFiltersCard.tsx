'use client';

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import {
  ArrowTrendingUpIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import CollapsibleFilterCard from './CollapsibleFilterCard';
import { AdvancedSearchFilters } from '@/types';

interface GrowthSponsoringFiltersCardProps {
  isOpen: boolean;
  onToggle: (id: string) => void;
  filters: AdvancedSearchFilters;
  onFiltersChange: (filters: AdvancedSearchFilters) => void;
  selectedPlatform?: 'instagram' | 'youtube' | 'tiktok';
}

export default function GrowthSponsoringFiltersCard({
  isOpen,
  onToggle,
  filters,
  onFiltersChange,
  selectedPlatform,
}: GrowthSponsoringFiltersCardProps) {
  const updateGrowthFilter = (
    key: keyof NonNullable<AdvancedSearchFilters['growth']>,
    value: unknown
  ) => {
    onFiltersChange({
      ...filters,
      growth: {
        ...filters.growth,
        [key]: value || undefined,
      },
    });
  };

  // Calculer les filtres actifs
  const growthFilters = filters.growth || {};
  const growthActiveCount = Object.keys(growthFilters).filter((key) => {
    const value = growthFilters[key as keyof typeof growthFilters];
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(
        (v) =>
          v !== undefined && v !== null && (typeof v !== 'string' || v !== '')
      );
    }
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return value !== undefined && value !== null;
  }).length;

  const activeFilterCount = growthActiveCount;
  const hasActiveFilters = activeFilterCount > 0;

  return (
    <CollapsibleFilterCard
      id="growth-sponsoring-filters"
      title="Croissance & Sponsoring"
      description="Filtres sur la croissance et l'activité sponsorisée"
      icon={<ArrowTrendingUpIcon className="w-5 h-5" />}
      isOpen={isOpen}
      onToggle={onToggle}
      hasActiveFilters={hasActiveFilters}
      filterCount={activeFilterCount}
    >
      <div className="space-y-6">
        {/* 1. CROISSANCE */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
            <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
            <span>Croissance</span>
          </h4>

          <div className="space-y-4">
            {/* Croissance des followers */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Croissance des followers
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Période d'analyse
                  </label>
                  <Select
                    value={filters.growth?.followersGrowthPeriod || ''}
                    onChange={(e) =>
                      updateGrowthFilter(
                        'followersGrowthPeriod',
                        e.target.value
                      )
                    }
                    options={[
                      { value: '', label: 'Toutes périodes' },
                      { value: '1month', label: '📅 1 mois' },
                      { value: '3months', label: '📊 3 mois' },
                      { value: '6months', label: '📈 6 mois' },
                      { value: '1year', label: '📆 1 an' },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Taux de croissance (%)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Min"
                      value={filters.growth?.followersGrowthRate?.min || ''}
                      onChange={(e) =>
                        updateGrowthFilter('followersGrowthRate', {
                          ...filters.growth?.followersGrowthRate,
                          min: parseFloat(e.target.value) || undefined,
                        })
                      }
                    />
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Max"
                      value={filters.growth?.followersGrowthRate?.max || ''}
                      onChange={(e) =>
                        updateGrowthFilter('followersGrowthRate', {
                          ...filters.growth?.followersGrowthRate,
                          max: parseFloat(e.target.value) || undefined,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tendance générale */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tendance générale
              </label>
              <Select
                value={filters.growth?.growthTrend || ''}
                onChange={(e) =>
                  updateGrowthFilter('growthTrend', e.target.value)
                }
                options={[
                  { value: '', label: 'Toutes tendances' },
                  { value: 'declining', label: '📉 En déclin' },
                  { value: 'stable', label: '➡️ Stable' },
                  { value: 'growing', label: '📈 En croissance' },
                  { value: 'fast-growing', label: '🚀 Croissance rapide' },
                  { value: 'viral', label: '💥 Viral' },
                ]}
              />
            </div>

            {/* Croissance des vues (YouTube/TikTok) */}
            {(selectedPlatform === 'youtube' ||
              selectedPlatform === 'tiktok') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Croissance des vues
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Période d'analyse
                    </label>
                    <Select
                      value={filters.growth?.viewsGrowthPeriod || ''}
                      onChange={(e) =>
                        updateGrowthFilter('viewsGrowthPeriod', e.target.value)
                      }
                      options={[
                        { value: '', label: 'Toutes périodes' },
                        { value: '1month', label: '📅 1 mois' },
                        { value: '3months', label: '📊 3 mois' },
                        { value: '6months', label: '📈 6 mois' },
                      ]}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Taux de croissance (%)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Min"
                        value={filters.growth?.viewsGrowthRate?.min || ''}
                        onChange={(e) =>
                          updateGrowthFilter('viewsGrowthRate', {
                            ...filters.growth?.viewsGrowthRate,
                            min: parseFloat(e.target.value) || undefined,
                          })
                        }
                      />
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Max"
                        value={filters.growth?.viewsGrowthRate?.max || ''}
                        onChange={(e) =>
                          updateGrowthFilter('viewsGrowthRate', {
                            ...filters.growth?.viewsGrowthRate,
                            max: parseFloat(e.target.value) || undefined,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Croissance des likes (TikTok) */}
            {selectedPlatform === 'tiktok' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Croissance des likes
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Période d'analyse
                    </label>
                    <Select
                      value={filters.growth?.likesGrowthPeriod || ''}
                      onChange={(e) =>
                        updateGrowthFilter('likesGrowthPeriod', e.target.value)
                      }
                      options={[
                        { value: '', label: 'Toutes périodes' },
                        { value: '1month', label: '📅 1 mois' },
                        { value: '3months', label: '📊 3 mois' },
                        { value: '6months', label: '📈 6 mois' },
                      ]}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Taux de croissance (%)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Min"
                        value={filters.growth?.likesGrowthRate?.min || ''}
                        onChange={(e) =>
                          updateGrowthFilter('likesGrowthRate', {
                            ...filters.growth?.likesGrowthRate,
                            min: parseFloat(e.target.value) || undefined,
                          })
                        }
                      />
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Max"
                        value={filters.growth?.likesGrowthRate?.max || ''}
                        onChange={(e) =>
                          updateGrowthFilter('likesGrowthRate', {
                            ...filters.growth?.likesGrowthRate,
                            max: parseFloat(e.target.value) || undefined,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Âge du compte */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Âge du compte
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Âge minimum (mois)
                  </label>
                  <Input
                    type="number"
                    placeholder="Ex: 12"
                    value={filters.growth?.minAccountAge || ''}
                    onChange={(e) =>
                      updateGrowthFilter(
                        'minAccountAge',
                        parseInt(e.target.value) || undefined
                      )
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Âge maximum (mois)
                  </label>
                  <Input
                    type="number"
                    placeholder="Ex: 60"
                    value={filters.growth?.maxAccountAge || ''}
                    onChange={(e) =>
                      updateGrowthFilter(
                        'maxAccountAge',
                        parseInt(e.target.value) || undefined
                      )
                    }
                  />
                </div>
              </div>
            </div>

            {/* Suggestions de croissance */}
            <div>
              <p className="text-xs text-gray-600 mb-2">
                Tendances suggérées :
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Stable (0-5%)', trend: 'stable' },
                  { label: 'Croissance (5-20%)', trend: 'growing' },
                  { label: 'Rapide (20%+)', trend: 'fast-growing' },
                  { label: 'Viral', trend: 'viral' },
                ].map((option) => (
                  <button
                    key={option.trend}
                    onClick={() =>
                      updateGrowthFilter('growthTrend', option.trend)
                    }
                    className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Aide contextuelle */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <InformationCircleIcon className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-amber-700">
              <p className="font-medium mb-1">
                Conseils pour la croissance et le sponsoring :
              </p>
              <ul className="space-y-1">
                <li>
                  • La croissance rapide peut indiquer un contenu viral récent
                </li>
                <li>
                  • Les comptes avec du contenu sponsorisé sont plus ouverts aux
                  collaborations
                </li>
                <li>
                  • Vérifiez la cohérence entre la niche et les secteurs de
                  collaboration
                </li>
                <li>
                  • Les comptes jeunes peuvent avoir des tarifs plus flexibles
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </CollapsibleFilterCard>
  );
}
