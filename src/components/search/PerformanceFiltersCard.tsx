'use client';

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import {
  ChartBarIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';
import CollapsibleFilterCard from './CollapsibleFilterCard';
import { AdvancedSearchFilters } from '@/types';

interface PerformanceFiltersCardProps {
  isOpen: boolean;
  onToggle: (id: string) => void;
  filters: AdvancedSearchFilters;
  onFiltersChange: (filters: AdvancedSearchFilters) => void;
  selectedPlatform?: 'instagram' | 'youtube' | 'tiktok';
}

export default function PerformanceFiltersCard({
  isOpen,
  onToggle,
  filters,
  onFiltersChange,
  selectedPlatform,
}: PerformanceFiltersCardProps) {
  const updatePerformanceFilter = (
    key: keyof NonNullable<AdvancedSearchFilters['performance']>,
    value: unknown
  ) => {
    onFiltersChange({
      ...filters,
      performance: {
        ...filters.performance,
        [key]: value || undefined,
      },
    });
  };

  // Calculer les filtres actifs
  const performanceFilters = filters.performance || {};
  const activeFilterCount = Object.keys(performanceFilters).filter((key) => {
    const value = performanceFilters[key as keyof typeof performanceFilters];
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(
        (v) => v !== undefined && v !== null && v !== ''
      );
    }
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return value !== undefined && value !== null;
  }).length;

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <CollapsibleFilterCard
      id="performance-filters"
      title="Taille & Performance"
      description="Filtres sur la taille de l'audience et les performances"
      icon={<ChartBarIcon className="w-5 h-5" />}
      isOpen={isOpen}
      onToggle={onToggle}
      hasActiveFilters={hasActiveFilters}
      filterCount={activeFilterCount}
    >
      <div className="space-y-6">
        {/* 1. TAILLE DE L'AUDIENCE */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
            <ChartBarIcon className="w-4 h-4 text-blue-500" />
            <span>Taille de l'audience</span>
          </h4>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de followers
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min (ex: 10000)"
                  value={filters.performance?.followersRange?.min || ''}
                  onChange={(e) =>
                    updatePerformanceFilter('followersRange', {
                      ...filters.performance?.followersRange,
                      min: parseInt(e.target.value) || undefined,
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Max (ex: 1000000)"
                  value={filters.performance?.followersRange?.max || ''}
                  onChange={(e) =>
                    updatePerformanceFilter('followersRange', {
                      ...filters.performance?.followersRange,
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
                  { label: 'Nano (1K-10K)', min: 1000, max: 10000 },
                  { label: 'Micro (10K-100K)', min: 10000, max: 100000 },
                  { label: 'Mid-tier (100K-500K)', min: 100000, max: 500000 },
                  { label: 'Macro (500K-1M)', min: 500000, max: 1000000 },
                  { label: 'Mega (1M+)', min: 1000000, max: undefined },
                ].map((range) => (
                  <button
                    key={range.label}
                    onClick={() =>
                      updatePerformanceFilter('followersRange', {
                        min: range.min,
                        max: range.max,
                      })
                    }
                    className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. PORTÉE/VUES */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
            <EyeIcon className="w-4 h-4 text-green-500" />
            <span>Portée & vues</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vues moyennes par vidéo
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.performance?.avgViewsRange?.min || ''}
                  onChange={(e) =>
                    updatePerformanceFilter('avgViewsRange', {
                      ...filters.performance?.avgViewsRange,
                      min: parseInt(e.target.value) || undefined,
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.performance?.avgViewsRange?.max || ''}
                  onChange={(e) =>
                    updatePerformanceFilter('avgViewsRange', {
                      ...filters.performance?.avgViewsRange,
                      max: parseInt(e.target.value) || undefined,
                    })
                  }
                />
              </div>
            </div>

            {selectedPlatform === 'instagram' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vues moyennes Reels
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.performance?.avgReelsViewsRange?.min || ''}
                    onChange={(e) =>
                      updatePerformanceFilter('avgReelsViewsRange', {
                        ...filters.performance?.avgReelsViewsRange,
                        min: parseInt(e.target.value) || undefined,
                      })
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.performance?.avgReelsViewsRange?.max || ''}
                    onChange={(e) =>
                      updatePerformanceFilter('avgReelsViewsRange', {
                        ...filters.performance?.avgReelsViewsRange,
                        max: parseInt(e.target.value) || undefined,
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. ENGAGEMENT */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
            <HeartIcon className="w-4 h-4 text-red-500" />
            <span>Engagement</span>
          </h4>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taux d&apos;engagement (%)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Min (ex: 1.5)"
                  value={filters.performance?.engagementRateRange?.min || ''}
                  onChange={(e) =>
                    updatePerformanceFilter('engagementRateRange', {
                      ...filters.performance?.engagementRateRange,
                      min: parseFloat(e.target.value) || undefined,
                    })
                  }
                />
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Max (ex: 10.0)"
                  value={filters.performance?.engagementRateRange?.max || ''}
                  onChange={(e) =>
                    updatePerformanceFilter('engagementRateRange', {
                      ...filters.performance?.engagementRateRange,
                      max: parseFloat(e.target.value) || undefined,
                    })
                  }
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                💡 Taux typiques: Nano (3-8%), Micro (1-5%), Macro (1-3%)
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                  <HeartIcon className="w-3 h-3" />
                  <span>Likes moyens par post</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.performance?.avgLikesRange?.min || ''}
                    onChange={(e) =>
                      updatePerformanceFilter('avgLikesRange', {
                        ...filters.performance?.avgLikesRange,
                        min: parseInt(e.target.value) || undefined,
                      })
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.performance?.avgLikesRange?.max || ''}
                    onChange={(e) =>
                      updatePerformanceFilter('avgLikesRange', {
                        ...filters.performance?.avgLikesRange,
                        max: parseInt(e.target.value) || undefined,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                  <ChatBubbleLeftIcon className="w-3 h-3" />
                  <span>Commentaires moyens</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.performance?.avgCommentsRange?.min || ''}
                    onChange={(e) =>
                      updatePerformanceFilter('avgCommentsRange', {
                        ...filters.performance?.avgCommentsRange,
                        min: parseInt(e.target.value) || undefined,
                      })
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.performance?.avgCommentsRange?.max || ''}
                    onChange={(e) =>
                      updatePerformanceFilter('avgCommentsRange', {
                        ...filters.performance?.avgCommentsRange,
                        max: parseInt(e.target.value) || undefined,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Métriques spécifiques par plateforme */}
            {selectedPlatform === 'tiktok' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                    <ShareIcon className="w-3 h-3" />
                    <span>Partages moyens</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.performance?.avgSharesRange?.min || ''}
                      onChange={(e) =>
                        updatePerformanceFilter('avgSharesRange', {
                          ...filters.performance?.avgSharesRange,
                          min: parseInt(e.target.value) || undefined,
                        })
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.performance?.avgSharesRange?.max || ''}
                      onChange={(e) =>
                        updatePerformanceFilter('avgSharesRange', {
                          ...filters.performance?.avgSharesRange,
                          max: parseInt(e.target.value) || undefined,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                    <BookmarkIcon className="w-3 h-3" />
                    <span>Sauvegardes moyennes</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.performance?.avgSavesRange?.min || ''}
                      onChange={(e) =>
                        updatePerformanceFilter('avgSavesRange', {
                          ...filters.performance?.avgSavesRange,
                          min: parseInt(e.target.value) || undefined,
                        })
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.performance?.avgSavesRange?.max || ''}
                      onChange={(e) =>
                        updatePerformanceFilter('avgSavesRange', {
                          ...filters.performance?.avgSavesRange,
                          max: parseInt(e.target.value) || undefined,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Suggestions de taux d'engagement */}
            <div>
              <p className="text-xs text-gray-600 mb-2">
                Taux d'engagement suggérés :
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Faible (0.5-1%)', min: 0.5, max: 1.0 },
                  { label: 'Moyen (1-3%)', min: 1.0, max: 3.0 },
                  { label: 'Bon (3-6%)', min: 3.0, max: 6.0 },
                  { label: 'Excellent (6%+)', min: 6.0, max: undefined },
                ].map((range) => (
                  <button
                    key={range.label}
                    onClick={() =>
                      updatePerformanceFilter('engagementRateRange', {
                        min: range.min,
                        max: range.max,
                      })
                    }
                    className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>



        {/* Métriques de performance par plateforme */}
        {selectedPlatform && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              📊 Métriques spécifiques à{' '}
              {selectedPlatform === 'instagram'
                ? 'Instagram'
                : selectedPlatform === 'youtube'
                  ? 'YouTube'
                  : 'TikTok'}
            </h4>

            {selectedPlatform === 'youtube' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durée moyenne des vidéos (minutes)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      step="0.5"
                      placeholder="Min (ex: 5)"
                      value={filters.performance?.avgVideoDuration?.min || ''}
                      onChange={(e) =>
                        updatePerformanceFilter('avgVideoDuration', {
                          ...filters.performance?.avgVideoDuration,
                          min: parseFloat(e.target.value) || undefined,
                        })
                      }
                    />
                    <Input
                      type="number"
                      step="0.5"
                      placeholder="Max (ex: 20)"
                      value={filters.performance?.avgVideoDuration?.max || ''}
                      onChange={(e) =>
                        updatePerformanceFilter('avgVideoDuration', {
                          ...filters.performance?.avgVideoDuration,
                          max: parseFloat(e.target.value) || undefined,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fréquence de publication
                  </label>
                  <Select
                    value={filters.performance?.uploadFrequency || ''}
                    onChange={(e) =>
                      updatePerformanceFilter('uploadFrequency', e.target.value)
                    }
                    options={[
                      { value: '', label: 'Toutes fréquences' },
                      { value: 'daily', label: '📅 Quotidienne' },
                      { value: 'weekly', label: '📊 Hebdomadaire' },
                      { value: 'biweekly', label: '📈 Bi-hebdomadaire' },
                      { value: 'monthly', label: '📆 Mensuelle' },
                      { value: 'irregular', label: '🔄 Irrégulière' },
                    ]}
                  />
                </div>
              </div>
            )}

            {selectedPlatform === 'instagram' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ratio Stories/Posts
                  </label>
                  <Select
                    value={filters.performance?.storiesPostRatio || ''}
                    onChange={(e) =>
                      updatePerformanceFilter(
                        'storiesPostRatio',
                        e.target.value
                      )
                    }
                    options={[
                      { value: '', label: 'Tous ratios' },
                      { value: 'low', label: '📱 Faible (< 2:1)' },
                      { value: 'medium', label: '📊 Moyen (2:1 - 5:1)' },
                      { value: 'high', label: '📈 Élevé (> 5:1)' },
                    ]}
                  />
                </div>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.performance?.hasReels || false}
                    onChange={(e) =>
                      updatePerformanceFilter(
                        'hasReels',
                        e.target.checked || undefined
                      )
                    }
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    🎬 Publie des Reels régulièrement
                  </span>
                </label>
              </div>
            )}

            {selectedPlatform === 'tiktok' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durée moyenne des vidéos (secondes)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min (ex: 15)"
                      value={filters.performance?.avgTikTokDuration?.min || ''}
                      onChange={(e) =>
                        updatePerformanceFilter('avgTikTokDuration', {
                          ...filters.performance?.avgTikTokDuration,
                          min: parseInt(e.target.value) || undefined,
                        })
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Max (ex: 60)"
                      value={filters.performance?.avgTikTokDuration?.max || ''}
                      onChange={(e) =>
                        updatePerformanceFilter('avgTikTokDuration', {
                          ...filters.performance?.avgTikTokDuration,
                          max: parseInt(e.target.value) || undefined,
                        })
                      }
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    💡 Durées populaires: 15s, 30s, 60s
                  </div>
                </div>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.performance?.usesTrends || false}
                    onChange={(e) =>
                      updatePerformanceFilter(
                        'usesTrends',
                        e.target.checked || undefined
                      )
                    }
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    🔥 Utilise les tendances TikTok
                  </span>
                </label>
              </div>
            )}
          </div>
        )}
      </div>
    </CollapsibleFilterCard>
  );
}
