'use client';

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import CollapsibleFilterCard from './CollapsibleFilterCard';
import { AdvancedSearchFilters } from '@/types';

interface ContentFiltersCardProps {
  isOpen: boolean;
  onToggle: (id: string) => void;
  filters: AdvancedSearchFilters;
  onFiltersChange: (filters: AdvancedSearchFilters) => void;
}

export default function ContentFiltersCard({
  isOpen,
  onToggle,
  filters,
  onFiltersChange,
}: ContentFiltersCardProps) {
  const updateContentFilter = (
    key: keyof NonNullable<AdvancedSearchFilters['content']>,
    value: unknown
  ) => {
    onFiltersChange({
      ...filters,
      content: {
        ...filters.content,
        [key]: value || undefined,
      },
    });
  };

  // Calculer les filtres actifs
  const contentFilters = filters.content || {};
  const activeFilterCount = Object.keys(contentFilters).filter((key) => {
    const value = contentFilters[key as keyof typeof contentFilters];
    if (Array.isArray(value)) return value.length > 0;
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
      id="content-filters"
      title="Contenu"
      description="Filtres sur les caractéristiques du contenu publié"
      icon={<DocumentTextIcon className="w-5 h-5" />}
      isOpen={isOpen}
      onToggle={onToggle}
      hasActiveFilters={hasActiveFilters}
      filterCount={activeFilterCount}
    >
      <div className="space-y-6">
        {/* Activité et fréquence */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            Activité de publication
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Fréquence de publication"
              value={filters.content?.postFrequency || ''}
              onChange={(e) =>
                updateContentFilter('postFrequency', e.target.value)
              }
              options={[
                { value: '', label: 'Toutes fréquences' },
                { value: 'very-low', label: '🐌 Très faible (< 1/semaine)' },
                { value: 'low', label: '📅 Faible (1-3/semaine)' },
                { value: 'medium', label: '📊 Moyenne (4-7/semaine)' },
                { value: 'high', label: '⚡ Élevée (1-2/jour)' },
                { value: 'very-high', label: '🚀 Très élevée (3+/jour)' },
              ]}
            />

            <div>
              <Input
                label="Dernière activité (jours)"
                type="number"
                placeholder="Ex: 7 (actif dans les 7 derniers jours)"
                value={filters.content?.recentActivityDays || ''}
                onChange={(e) =>
                  updateContentFilter(
                    'recentActivityDays',
                    parseInt(e.target.value) || undefined
                  )
                }
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre total de posts
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.content?.totalPostsRange?.min || ''}
                onChange={(e) =>
                  updateContentFilter('totalPostsRange', {
                    ...filters.content?.totalPostsRange,
                    min: parseInt(e.target.value) || undefined,
                  })
                }
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters.content?.totalPostsRange?.max || ''}
                onChange={(e) =>
                  updateContentFilter('totalPostsRange', {
                    ...filters.content?.totalPostsRange,
                    max: parseInt(e.target.value) || undefined,
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Types de contenu */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Types de contenu</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { value: 'photo', label: '📸 Photos', color: 'blue' },
              { value: 'video', label: '🎥 Vidéos', color: 'red' },
              { value: 'story', label: '📱 Stories', color: 'purple' },
              { value: 'reel', label: '🎬 Reels', color: 'pink' },
              { value: 'live', label: '🔴 Live', color: 'green' },
              { value: 'short', label: '⚡ Shorts', color: 'orange' },
            ].map((contentType) => {
              const isSelected =
                (
                  filters.content?.contentTypes as
                    | Array<
                        'photo' | 'video' | 'story' | 'reel' | 'live' | 'short'
                      >
                    | undefined
                )?.includes(
                  contentType.value as
                    | 'photo'
                    | 'video'
                    | 'story'
                    | 'reel'
                    | 'live'
                    | 'short'
                ) || false;

              return (
                <button
                  key={contentType.value}
                  onClick={() => {
                    const currentTypes = filters.content?.contentTypes || [];
                    const newTypes = isSelected
                      ? currentTypes.filter(
                          (t) =>
                            t !==
                            (contentType.value as
                              | 'photo'
                              | 'video'
                              | 'story'
                              | 'reel'
                              | 'live'
                              | 'short')
                        )
                      : [
                          ...currentTypes,
                          contentType.value as
                            | 'photo'
                            | 'video'
                            | 'story'
                            | 'reel'
                            | 'live'
                            | 'short',
                        ];

                    updateContentFilter(
                      'contentTypes',
                      newTypes.length > 0 ? newTypes : undefined
                    );
                  }}
                  className={`text-sm p-3 rounded-xl border-2 transition-all ${
                    isSelected
                      ? `border-${contentType.color}-300 bg-${contentType.color}-50 text-${contentType.color}-800`
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {contentType.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Spécifiques aux vidéos */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            Spécifique aux vidéos
          </h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durée moyenne des vidéos (secondes)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min (ex: 30)"
                value={filters.content?.avgVideoLength?.min || ''}
                onChange={(e) =>
                  updateContentFilter('avgVideoLength', {
                    ...filters.content?.avgVideoLength,
                    min: parseInt(e.target.value) || undefined,
                  })
                }
              />
              <Input
                type="number"
                placeholder="Max (ex: 300)"
                value={filters.content?.avgVideoLength?.max || ''}
                onChange={(e) =>
                  updateContentFilter('avgVideoLength', {
                    ...filters.content?.avgVideoLength,
                    max: parseInt(e.target.value) || undefined,
                  })
                }
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              💡 Durées typiques: 15s (TikTok), 60s (Reels), 300s+ (YouTube)
            </div>
          </div>
        </div>

        {/* Habitudes de publication */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            Habitudes de publication
          </h4>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Jours de publication préférés
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { value: 'monday', label: 'Lun', short: 'L' },
                { value: 'tuesday', label: 'Mar', short: 'M' },
                { value: 'wednesday', label: 'Mer', short: 'M' },
                { value: 'thursday', label: 'Jeu', short: 'J' },
                { value: 'friday', label: 'Ven', short: 'V' },
                { value: 'saturday', label: 'Sam', short: 'S' },
                { value: 'sunday', label: 'Dim', short: 'D' },
              ].map((day) => {
                const isSelected =
                  (
                    filters.content?.postingDays as
                      | Array<
                          | 'monday'
                          | 'tuesday'
                          | 'wednesday'
                          | 'thursday'
                          | 'friday'
                          | 'saturday'
                          | 'sunday'
                        >
                      | undefined
                  )?.includes(
                    day.value as
                      | 'monday'
                      | 'tuesday'
                      | 'wednesday'
                      | 'thursday'
                      | 'friday'
                      | 'saturday'
                      | 'sunday'
                  ) || false;

                return (
                  <button
                    key={day.value}
                    onClick={() => {
                      const currentDays = filters.content?.postingDays || [];
                      const newDays = isSelected
                        ? currentDays.filter(
                            (d) =>
                              d !==
                              (day.value as
                                | 'monday'
                                | 'tuesday'
                                | 'wednesday'
                                | 'thursday'
                                | 'friday'
                                | 'saturday'
                                | 'sunday')
                          )
                        : [
                            ...currentDays,
                            day.value as
                              | 'monday'
                              | 'tuesday'
                              | 'wednesday'
                              | 'thursday'
                              | 'friday'
                              | 'saturday'
                              | 'sunday',
                          ];

                      updateContentFilter(
                        'postingDays',
                        newDays.length > 0 ? newDays : undefined
                      );
                    }}
                    className={`text-sm p-2 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-purple-300 bg-purple-50 text-purple-800'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium">{day.short}</div>
                    <div className="text-xs">{day.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                label="Heure de début"
                type="time"
                value={filters.content?.postingTimes?.from || ''}
                onChange={(e) =>
                  updateContentFilter('postingTimes', {
                    ...filters.content?.postingTimes,
                    from: e.target.value || undefined,
                  })
                }
              />
            </div>
            <div>
              <Input
                label="Heure de fin"
                type="time"
                value={filters.content?.postingTimes?.to || ''}
                onChange={(e) =>
                  updateContentFilter('postingTimes', {
                    ...filters.content?.postingTimes,
                    to: e.target.value || undefined,
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Stratégie contenu */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            Stratégie de contenu
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Utilisation des hashtags"
              value={filters.content?.hashtagUsage || ''}
              onChange={(e) =>
                updateContentFilter('hashtagUsage', e.target.value)
              }
              options={[
                { value: '', label: 'Toute utilisation' },
                { value: 'low', label: '🔸 Faible (0-5 par post)' },
                { value: 'medium', label: '🔹 Moyenne (6-15 par post)' },
                { value: 'high', label: '🔸 Élevée (15+ par post)' },
              ]}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taux de collaboration (%)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.content?.collaborationRate?.min || ''}
                  onChange={(e) =>
                    updateContentFilter('collaborationRate', {
                      ...filters.content?.collaborationRate,
                      min: parseInt(e.target.value) || undefined,
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.content?.collaborationRate?.max || ''}
                  onChange={(e) =>
                    updateContentFilter('collaborationRate', {
                      ...filters.content?.collaborationRate,
                      max: parseInt(e.target.value) || undefined,
                    })
                  }
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Pourcentage de posts sponsorisés/collaboratifs
              </div>
            </div>
          </div>
        </div>
      </div>
    </CollapsibleFilterCard>
  );
}
