'use client';

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { UserIcon } from '@heroicons/react/24/outline';
import CollapsibleFilterCard from './CollapsibleFilterCard';
import { AdvancedSearchFilters } from '@/types';

interface CreatorFiltersCardProps {
  isOpen: boolean;
  onToggle: (id: string) => void;
  filters: AdvancedSearchFilters;
  onFiltersChange: (filters: AdvancedSearchFilters) => void;
}

export default function CreatorFiltersCard({
  isOpen,
  onToggle,
  filters,
  onFiltersChange,
}: CreatorFiltersCardProps) {
  const updateCreatorFilter = (
    key: keyof NonNullable<AdvancedSearchFilters['creator']>,
    value: unknown
  ) => {
    onFiltersChange({
      ...filters,
      creator: {
        ...filters.creator,
        [key]: value || undefined,
      },
    });
  };

  const updateLocationFilter = (
    key: 'country' | 'city' | 'continent',
    value: unknown
  ) => {
    onFiltersChange({
      ...filters,
      creator: {
        ...filters.creator,
        location: {
          ...filters.creator?.location,
          [key]: value || undefined,
        },
      },
    });
  };

  // Calculer les filtres actifs
  const creatorFilters = filters.creator || {};
  const activeFilterCount = Object.keys(creatorFilters).filter((key) => {
    const value = creatorFilters[key as keyof typeof creatorFilters];
    if (key === 'location') return Object.keys(value || {}).length > 0;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'string') return value.trim().length > 0;
    return value !== undefined && value !== null;
  }).length;

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <CollapsibleFilterCard
      id="creator-filters"
      title="Créateur de contenu"
      description="Filtres sur les caractéristiques du créateur"
      icon={<UserIcon className="w-5 h-5" />}
      isOpen={isOpen}
      onToggle={onToggle}
      hasActiveFilters={hasActiveFilters}
      filterCount={activeFilterCount}
    >
      <div className="space-y-6">
        {/* Genre et âge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Genre affiché"
            value={filters.creator?.gender || ''}
            onChange={(e) => updateCreatorFilter('gender', e.target.value)}
            options={[
              { value: '', label: 'Tous' },
              { value: 'male', label: 'Homme' },
              { value: 'female', label: 'Femme' },
              { value: 'non-binary', label: 'Non-binaire' },
              { value: 'not-specified', label: 'Non spécifié' },
            ]}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tranche d&apos;âge
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.creator?.ageRange?.min || ''}
                onChange={(e) =>
                  updateCreatorFilter('ageRange', {
                    ...filters.creator?.ageRange,
                    min: parseInt(e.target.value) || undefined,
                  })
                }
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters.creator?.ageRange?.max || ''}
                onChange={(e) =>
                  updateCreatorFilter('ageRange', {
                    ...filters.creator?.ageRange,
                    max: parseInt(e.target.value) || undefined,
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Localisation */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Localisation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Pays"
              value={filters.creator?.location?.country || ''}
              onChange={(e) => updateLocationFilter('country', e.target.value)}
              options={[
                { value: '', label: 'Tous les pays' },
                { value: 'FR', label: '🇫🇷 France' },
                { value: 'US', label: '🇺🇸 États-Unis' },
                { value: 'UK', label: '🇬🇧 Royaume-Uni' },
                { value: 'DE', label: '🇩🇪 Allemagne' },
                { value: 'ES', label: '🇪🇸 Espagne' },
                { value: 'IT', label: '🇮🇹 Italie' },
                { value: 'CA', label: '🇨🇦 Canada' },
                { value: 'JP', label: '🇯🇵 Japon' },
                { value: 'KR', label: '🇰🇷 Corée du Sud' },
                { value: 'BR', label: '🇧🇷 Brésil' },
              ]}
            />

            <Select
              label="Continent"
              value={filters.creator?.location?.continent || ''}
              onChange={(e) =>
                updateLocationFilter('continent', e.target.value)
              }
              options={[
                { value: '', label: 'Tous les continents' },
                { value: 'europe', label: '🇪🇺 Europe' },
                { value: 'america', label: '🌎 Amérique' },
                { value: 'asia', label: '🌏 Asie' },
                { value: 'africa', label: '🌍 Afrique' },
                { value: 'oceania', label: '🇦🇺 Océanie' },
              ]}
            />
          </div>

          <div className="mt-3">
            <Input
              label="Ville"
              placeholder="Ex: Paris, New York, Tokyo..."
              value={filters.creator?.location?.city || ''}
              onChange={(e) => updateLocationFilter('city', e.target.value)}
            />
          </div>
        </div>

        {/* Catégories de contenu */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Catégories de contenu
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { value: 'lifestyle', label: '🌟 Lifestyle', color: 'purple' },
              { value: 'beauty', label: '💄 Beauté', color: 'pink' },
              { value: 'fashion', label: '👗 Mode', color: 'indigo' },
              { value: 'fitness', label: '💪 Fitness', color: 'green' },
              { value: 'food', label: '🍕 Food', color: 'orange' },
              { value: 'travel', label: '✈️ Voyage', color: 'blue' },
              { value: 'tech', label: '📱 Tech', color: 'gray' },
              { value: 'gaming', label: '🎮 Gaming', color: 'red' },
              { value: 'music', label: '🎵 Musique', color: 'yellow' },
              { value: 'art', label: '🎨 Art', color: 'cyan' },
              { value: 'education', label: '📚 Éducation', color: 'emerald' },
              { value: 'business', label: '💼 Business', color: 'slate' },
            ].map((category) => {
              const isSelected =
                filters.creator?.categories?.includes(category.value) || false;

              return (
                <button
                  key={category.value}
                  onClick={() => {
                    const currentCategories = filters.creator?.categories || [];
                    const newCategories = isSelected
                      ? currentCategories.filter((c) => c !== category.value)
                      : [...currentCategories, category.value];

                    updateCreatorFilter(
                      'categories',
                      newCategories.length > 0 ? newCategories : undefined
                    );
                  }}
                  className={`text-sm p-2 rounded-lg border-2 transition-all ${
                    isSelected
                      ? `border-${category.color}-300 bg-${category.color}-50 text-${category.color}-800`
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Langues */}
        <div>
          <Input
            label="Langues parlées"
            placeholder="Ex: Français, Anglais, Espagnol... (séparées par des virgules)"
            value={filters.creator?.languages?.join(', ') || ''}
            onChange={(e) => {
              const languages = e.target.value
                .split(',')
                .map((lang) => lang.trim())
                .filter((lang) => lang.length > 0);

              updateCreatorFilter(
                'languages',
                languages.length > 0 ? languages : undefined
              );
            }}
          />
        </div>

        {/* Options avancées */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Options</h4>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.creator?.verified || false}
                onChange={(e) =>
                  updateCreatorFilter('verified', e.target.checked || undefined)
                }
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-3 text-sm text-gray-700">
                ✅ Comptes vérifiés uniquement
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.creator?.hasEmail || false}
                onChange={(e) =>
                  updateCreatorFilter('hasEmail', e.target.checked || undefined)
                }
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-3 text-sm text-gray-700">
                📧 Email de contact disponible
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.creator?.hasPhoneNumber || false}
                onChange={(e) =>
                  updateCreatorFilter(
                    'hasPhoneNumber',
                    e.target.checked || undefined
                  )
                }
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-3 text-sm text-gray-700">
                📱 Numéro de téléphone disponible
              </span>
            </label>
          </div>
        </div>
      </div>
    </CollapsibleFilterCard>
  );
}
