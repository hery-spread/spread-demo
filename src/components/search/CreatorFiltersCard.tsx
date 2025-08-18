'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import {
  UserIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  InformationCircleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import CollapsibleFilterCard from './CollapsibleFilterCard';
import { AdvancedSearchFilters } from '@/types';

interface CreatorFiltersCardProps {
  isOpen: boolean;
  onToggle: (id: string) => void;
  filters: AdvancedSearchFilters;
  onFiltersChange: (filters: AdvancedSearchFilters) => void;
  selectedPlatform?: 'instagram' | 'youtube' | 'tiktok';
}

export default function CreatorFiltersCard({
  isOpen,
  onToggle,
  filters,
  onFiltersChange,
  selectedPlatform,
}: CreatorFiltersCardProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true);
  const [keywordInput, setKeywordInput] = useState('');
  const [bioSearchInput, setBioSearchInput] = useState('');
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
  const advancedFilters = filters.advanced || {};
  const contentFilters = filters.content || {};

  const creatorActiveCount = Object.keys(creatorFilters).filter((key) => {
    const value = creatorFilters[key as keyof typeof creatorFilters];
    if (key === 'location') return Object.keys(value || {}).length > 0;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'string') return value.trim().length > 0;
    return value !== undefined && value !== null;
  }).length;

  const advancedActiveCount = Object.keys(advancedFilters).filter((key) => {
    const value = advancedFilters[key as keyof typeof advancedFilters];
    if (key === 'fakefollowersScore') {
      return (
        typeof value === 'object' &&
        value !== null &&
        'max' in value &&
        value.max !== undefined
      );
    }
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'string') return value.trim().length > 0;
    return value !== undefined && value !== null;
  }).length;

  const contentActiveCount = contentFilters.recentActivityDays ? 1 : 0;

  const activeFilterCount =
    creatorActiveCount + advancedActiveCount + contentActiveCount;
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

        {/* Recherche par mots-clés et bio */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-500" />
            <span>Recherche textuelle</span>
          </h4>

          <div className="space-y-3">
            <Input
              label="Mots-clés dans le contenu"
              placeholder="Ex: fitness, motivation, lifestyle..."
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onBlur={() => {
                if (keywordInput.trim()) {
                  const keywords = keywordInput
                    .split(',')
                    .map((k) => k.trim())
                    .filter((k) => k);
                  updateCreatorFilter(
                    'keywords',
                    keywords.length > 0 ? keywords : undefined
                  );
                }
              }}
            />

            <Input
              label="Recherche dans la bio"
              placeholder="Ex: entrepreneur, coach, influencer..."
              value={bioSearchInput}
              onChange={(e) => setBioSearchInput(e.target.value)}
              onBlur={() => {
                updateCreatorFilter(
                  'bioSearch',
                  bioSearchInput.trim() || undefined
                );
              }}
            />
          </div>
        </div>

        {/* Filtres avancés */}
        <div>
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChartBarIcon className="w-4 h-4" />
            <span>Filtres avancés</span>
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform ${
                showAdvancedFilters ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>

          {showAdvancedFilters && (
            <div className="mt-4 space-y-6 p-4 bg-gray-50 rounded-lg">
              {/* Métriques de croissance */}
              <div>
                <h5 className="font-medium text-gray-800 mb-3 flex items-center space-x-2">
                  <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
                  <span>Croissance et activité</span>
                </h5>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Tendance de croissance"
                    value={filters.advanced?.growthTrend || ''}
                    onChange={(e) => {
                      onFiltersChange({
                        ...filters,
                        advanced: {
                          ...filters.advanced,
                          growthTrend:
                            (e.target.value as
                              | 'declining'
                              | 'stable'
                              | 'growing'
                              | 'fast-growing') || undefined,
                        },
                      });
                    }}
                    options={[
                      { value: '', label: 'Toutes les tendances' },
                      { value: 'declining', label: '📉 En déclin' },
                      { value: 'stable', label: '➡️ Stable' },
                      { value: 'growing', label: '📈 En croissance' },
                      { value: 'fast-growing', label: '🚀 Croissance rapide' },
                    ]}
                  />

                  <Input
                    label="Âge minimum du compte (mois)"
                    type="number"
                    placeholder="Ex: 12"
                    value={filters.advanced?.minAccountAge || ''}
                    onChange={(e) => {
                      onFiltersChange({
                        ...filters,
                        advanced: {
                          ...filters.advanced,
                          minAccountAge: parseInt(e.target.value) || undefined,
                        },
                      });
                    }}
                  />
                </div>

                <div className="mt-3">
                  <Input
                    label="Dernière activité (jours max)"
                    type="number"
                    placeholder="Ex: 30"
                    value={filters.content?.recentActivityDays || ''}
                    onChange={(e) => {
                      onFiltersChange({
                        ...filters,
                        content: {
                          ...filters.content,
                          recentActivityDays:
                            parseInt(e.target.value) || undefined,
                        },
                      });
                    }}
                  />
                </div>
              </div>

              {/* Métriques de performance */}
              <div>
                <h5 className="font-medium text-gray-800 mb-3 flex items-center space-x-2">
                  <ChartBarIcon className="w-4 h-4 text-blue-500" />
                  <span>Performance et qualité</span>
                </h5>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Score de faux followers (max)
                    </label>
                    <div className="flex items-center space-x-3">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Ex: 20"
                        value={filters.advanced?.fakefollowersScore?.max || ''}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          onFiltersChange({
                            ...filters,
                            advanced: {
                              ...filters.advanced,
                              fakefollowersScore: value
                                ? { max: value }
                                : undefined,
                            },
                          });
                        }}
                      />
                      <span className="text-sm text-gray-500">%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Plus le score est bas, plus l&apos;audience est
                      authentique
                    </p>
                  </div>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.advanced?.brandSafety || false}
                      onChange={(e) => {
                        onFiltersChange({
                          ...filters,
                          advanced: {
                            ...filters.advanced,
                            brandSafety: e.target.checked || undefined,
                          },
                        });
                      }}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      🛡️ Contenu brand-safe uniquement
                    </span>
                  </label>
                </div>
              </div>

              {/* Filtres d'exclusion */}
              <div>
                <h5 className="font-medium text-gray-800 mb-3">Exclusions</h5>

                <div className="space-y-3">
                  <Input
                    label="Mots-clés à exclure"
                    placeholder="Ex: spam, fake, bot... (séparés par des virgules)"
                    value={filters.advanced?.excludeKeywords?.join(', ') || ''}
                    onChange={(e) => {
                      const keywords = e.target.value
                        .split(',')
                        .map((k) => k.trim())
                        .filter((k) => k.length > 0);

                      onFiltersChange({
                        ...filters,
                        advanced: {
                          ...filters.advanced,
                          excludeKeywords:
                            keywords.length > 0 ? keywords : undefined,
                        },
                      });
                    }}
                  />

                  <Input
                    label="Utilisateurs à exclure"
                    placeholder="Ex: @user1, @user2... (séparés par des virgules)"
                    value={filters.advanced?.excludeUsernames?.join(', ') || ''}
                    onChange={(e) => {
                      const usernames = e.target.value
                        .split(',')
                        .map((u) => u.trim().replace('@', ''))
                        .filter((u) => u.length > 0);

                      onFiltersChange({
                        ...filters,
                        advanced: {
                          ...filters.advanced,
                          excludeUsernames:
                            usernames.length > 0 ? usernames : undefined,
                        },
                      });
                    }}
                  />
                </div>
              </div>

              {/* Champs spécifiques par plateforme */}
              {selectedPlatform && (
                <div>
                  <h5 className="font-medium text-gray-800 mb-3">
                    Filtres spécifiques à{' '}
                    {selectedPlatform === 'instagram'
                      ? 'Instagram'
                      : selectedPlatform === 'youtube'
                        ? 'YouTube'
                        : 'TikTok'}
                  </h5>

                  {selectedPlatform === 'instagram' && (
                    <div className="space-y-3">
                      <Select
                        label="Type de compte"
                        value={filters.creator?.accountType || ''}
                        onChange={(e) =>
                          updateCreatorFilter('accountType', e.target.value)
                        }
                        options={[
                          { value: '', label: 'Tous les types' },
                          { value: 'personal', label: '👤 Personnel' },
                          { value: 'business', label: '🏢 Business' },
                          { value: 'creator', label: '⭐ Créateur' },
                        ]}
                      />

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.creator?.hasYouTube || false}
                          onChange={(e) =>
                            updateCreatorFilter(
                              'hasYouTube',
                              e.target.checked || undefined
                            )
                          }
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          📺 Possède aussi une chaîne YouTube
                        </span>
                      </label>
                    </div>
                  )}

                  {selectedPlatform === 'youtube' && (
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.creator?.isOfficialArtist || false}
                          onChange={(e) =>
                            updateCreatorFilter(
                              'isOfficialArtist',
                              e.target.checked || undefined
                            )
                          }
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          🎵 Artiste officiel YouTube
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              )}

              {/* Aide contextuelle */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <InformationCircleIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-blue-700">
                    <p className="font-medium mb-1">
                      Conseils d&apos;utilisation :
                    </p>
                    <ul className="space-y-1">
                      <li>
                        • Combinez plusieurs filtres pour affiner vos résultats
                      </li>
                      <li>
                        • Les filtres de croissance utilisent les données des 6
                        derniers mois
                      </li>
                      <li>
                        • Le score de faux followers est calculé par Modash
                      </li>
                      <li>
                        • Les exclusions s&apos;appliquent au contenu et aux
                        profils
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
