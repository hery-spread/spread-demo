'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import MultiSelect from '@/components/ui/MultiSelect';
import {
  UserIcon,
  MagnifyingGlassIcon,
  InformationCircleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import CollapsibleFilterCard from './CollapsibleFilterCard';
import { AdvancedSearchFilters } from '@/types';

interface CreatorIdentityFiltersCardProps {
  isOpen: boolean;
  onToggle: (id: string) => void;
  filters: AdvancedSearchFilters;
  onFiltersChange: (filters: AdvancedSearchFilters) => void;
  selectedPlatform?: 'instagram' | 'youtube' | 'tiktok';
}

export default function CreatorIdentityFiltersCard({
  isOpen,
  onToggle,
  filters,
  onFiltersChange,
  selectedPlatform,
}: CreatorIdentityFiltersCardProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
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
      id="creator-identity-filters"
      title="Créateur (identité & thématique)"
      description="Filtres sur l'identité et la thématique du créateur"
      icon={<UserIcon className="w-5 h-5" />}
      isOpen={isOpen}
      onToggle={onToggle}
      hasActiveFilters={hasActiveFilters}
      filterCount={activeFilterCount}
    >
      <div className="space-y-6">
        {/* 1. THÉMATIQUE PRIORITAIRE (en premier) */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
            <MagnifyingGlassIcon className="w-4 h-4 text-purple-500" />
            <span>Thématique & contenu (prioritaire)</span>
          </h4>

          <div className="space-y-4">
            {/* Recherche dans la bio (base du filtrage) */}
            <Input
              label="🔍 Recherche dans la bio"
              placeholder="Ex: entrepreneur, coach, fitness, beauté..."
              value={bioSearchInput}
              onChange={(e) => setBioSearchInput(e.target.value)}
              onBlur={() => {
                updateCreatorFilter(
                  'bioSearch',
                  bioSearchInput.trim() || undefined
                );
              }}
            />

            {/* Mots-clés dans le contenu (AVANT géographie) */}
            <Input
              label="🏷️ Mots-clés dans le contenu"
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

            {/* Catégories de contenu */}
            <MultiSelect
              label="📂 Catégories de contenu"
              placeholder="Sélectionner des catégories..."
              values={[
                { value: 'lifestyle', label: '🌟 Lifestyle' },
                { value: 'beauty', label: '💄 Beauté' },
                { value: 'fashion', label: '👗 Mode' },
                { value: 'fitness', label: '💪 Fitness' },
                { value: 'food', label: '🍕 Food' },
                { value: 'travel', label: '✈️ Voyage' },
                { value: 'tech', label: '📱 Tech' },
                { value: 'gaming', label: '🎮 Gaming' },
                { value: 'music', label: '🎵 Musique' },
                { value: 'art', label: '🎨 Art' },
                { value: 'education', label: '📚 Éducation' },
                { value: 'business', label: '💼 Business' },
              ]}
              selected={filters.creator?.categories || []}
              onChange={(selected) =>
                updateCreatorFilter(
                  'categories',
                  selected.length > 0 ? selected : undefined
                )
              }
              searchable={true}
            />
          </div>
        </div>

        {/* 2. SIMILARITÉ */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">🔗 Similarité</h4>
          <div className="space-y-3">
            <Input
              label="Similarité de contenu"
              placeholder="Ex: #cars #audi @topgear"
              value={filters.creator?.relevance?.join(', ') || ''}
              onChange={(e) => {
                const relevance = e.target.value
                  .split(',')
                  .map((r) => r.trim())
                  .filter((r) => r.length > 0);
                updateCreatorFilter(
                  'relevance',
                  relevance.length > 0 ? relevance : undefined
                );
              }}
            />

            <Input
              label="Audience similaire à"
              placeholder="Ex: @topgear @nike"
              value={filters.creator?.audienceRelevance?.join(', ') || ''}
              onChange={(e) => {
                const audienceRelevance = e.target.value
                  .split(',')
                  .map((a) => a.trim().replace('@', ''))
                  .filter((a) => a.length > 0);
                updateCreatorFilter(
                  'audienceRelevance',
                  audienceRelevance.length > 0 ? audienceRelevance : undefined
                );
              }}
            />
          </div>
        </div>

        {/* 3. HASHTAGS/MENTIONS */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            #️⃣ Hashtags & Mentions
          </h4>
          <div className="space-y-3">
            <Input
              label="Hashtags utilisés"
              placeholder="Ex: fitness, motivation, lifestyle (sans #)"
              value={
                filters.creator?.textTags
                  ?.filter((tag) => tag.type === 'hashtag')
                  .map((tag) => tag.value)
                  .join(', ') || ''
              }
              onChange={(e) => {
                const hashtags = e.target.value
                  .split(',')
                  .map((h) => h.trim())
                  .filter((h) => h.length > 0)
                  .map((h) => ({ type: 'hashtag' as const, value: h }));

                const mentions =
                  filters.creator?.textTags?.filter(
                    (tag) => tag.type === 'mention'
                  ) || [];
                const allTags = [...hashtags, ...mentions];

                updateCreatorFilter(
                  'textTags',
                  allTags.length > 0 ? allTags : undefined
                );
              }}
            />

            <Input
              label="Mentions utilisées"
              placeholder="Ex: topgear, nike (sans @)"
              value={
                filters.creator?.textTags
                  ?.filter((tag) => tag.type === 'mention')
                  .map((tag) => tag.value)
                  .join(', ') || ''
              }
              onChange={(e) => {
                const mentions = e.target.value
                  .split(',')
                  .map((m) => m.trim())
                  .filter((m) => m.length > 0)
                  .map((m) => ({ type: 'mention' as const, value: m }));

                const hashtags =
                  filters.creator?.textTags?.filter(
                    (tag) => tag.type === 'hashtag'
                  ) || [];
                const allTags = [...hashtags, ...mentions];

                updateCreatorFilter(
                  'textTags',
                  allTags.length > 0 ? allTags : undefined
                );
              }}
            />
          </div>
        </div>

        {/* 4. TYPES/FLAGS */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">🏷️ Types & statuts</h4>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.creator?.verified || false}
                  onChange={(e) =>
                    updateCreatorFilter(
                      'verified',
                      e.target.checked || undefined
                    )
                  }
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-3 text-sm text-gray-700">
                  ✅ Comptes vérifiés
                </span>
              </label>

              {selectedPlatform === 'youtube' && (
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
              )}

              {selectedPlatform === 'instagram' && (
                <>
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
                      📺 Possède une chaîne YouTube
                    </span>
                  </label>

                  <Select
                    label="Type de compte Instagram"
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
                </>
              )}
            </div>
          </div>
        </div>

        {/* 5. MARQUES & INTÉRÊTS CRÉATEUR */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            🏢 Marques & intérêts
          </h4>
          <div className="space-y-3">
            <Input
              label="Marques mentionnées"
              placeholder="Ex: Nike, Adidas, Apple..."
              value={filters.creator?.brands?.join(', ') || ''}
              onChange={(e) => {
                const brands = e.target.value
                  .split(',')
                  .map((b) => b.trim())
                  .filter((b) => b.length > 0);
                updateCreatorFilter(
                  'brands',
                  brands.length > 0 ? brands : undefined
                );
              }}
            />

            <Input
              label="Intérêts du créateur"
              placeholder="Ex: sport, mode, tech..."
              value={filters.creator?.interests?.join(', ') || ''}
              onChange={(e) => {
                const interests = e.target.value
                  .split(',')
                  .map((i) => i.trim())
                  .filter((i) => i.length > 0);
                updateCreatorFilter(
                  'interests',
                  interests.length > 0 ? interests : undefined
                );
              }}
            />
          </div>
        </div>

        {/* 6. LANGUE DU CRÉATEUR */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">🗣️ Langue</h4>
          <Select
            label="Langue principale du créateur"
            value={filters.creator?.language || ''}
            onChange={(e) => updateCreatorFilter('language', e.target.value)}
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
            ]}
          />
        </div>

        {/* 7. ACTIVITÉ RÉCENTE */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">📅 Activité</h4>
          <Input
            label="Dernière publication (jours max)"
            type="number"
            placeholder="Ex: 30"
            value={filters.creator?.lastPosted || ''}
            onChange={(e) =>
              updateCreatorFilter(
                'lastPosted',
                parseInt(e.target.value) || undefined
              )
            }
          />
        </div>

        {/* 8. CARACTÉRISTIQUES DÉMOGRAPHIQUES */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            👤 Caractéristiques
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Genre affiché"
              value={filters.creator?.gender || ''}
              onChange={(e) => updateCreatorFilter('gender', e.target.value)}
              options={[
                { value: '', label: 'Tous' },
                { value: 'MALE', label: 'Homme' },
                { value: 'FEMALE', label: 'Femme' },
                { value: 'KNOWN', label: 'Connu' },
                { value: 'UNKNOWN', label: 'Non spécifié' },
              ]}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tranche d&apos;âge
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Select
                  value={filters.creator?.ageRange?.min?.toString() || ''}
                  onChange={(e) =>
                    updateCreatorFilter('ageRange', {
                      ...filters.creator?.ageRange,
                      min: parseInt(e.target.value) || undefined,
                    })
                  }
                  options={[
                    { value: '', label: 'Min' },
                    { value: '18', label: '18' },
                    { value: '25', label: '25' },
                    { value: '35', label: '35' },
                    { value: '45', label: '45' },
                    { value: '65', label: '65' },
                  ]}
                />
                <Select
                  value={filters.creator?.ageRange?.max?.toString() || ''}
                  onChange={(e) =>
                    updateCreatorFilter('ageRange', {
                      ...filters.creator?.ageRange,
                      max: parseInt(e.target.value) || undefined,
                    })
                  }
                  options={[
                    { value: '', label: 'Max' },
                    { value: '25', label: '25' },
                    { value: '35', label: '35' },
                    { value: '45', label: '45' },
                    { value: '65', label: '65' },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 9. GÉOGRAPHIE DU CRÉATEUR (après les mots-clés) */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            🌍 Localisation du créateur
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Pays"
              value={filters.creator?.location?.country || ''}
              onChange={(e) => updateLocationFilter('country', e.target.value)}
              options={[
                { value: '', label: 'Tous les pays' },
                { value: 'FR', label: '🇫🇷 France' },
                { value: 'US', label: '🇺🇸 États-Unis' },
                { value: 'GB', label: '🇬🇧 Royaume-Uni' },
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

        {/* Filtres avancés */}
        <div>
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <span>Filtres avancés</span>
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform ${
                showAdvancedFilters ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>

          {showAdvancedFilters && (
            <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.creator?.hasEmail || false}
                    onChange={(e) =>
                      updateCreatorFilter(
                        'hasEmail',
                        e.target.checked || undefined
                      )
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

              {/* Aide contextuelle */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <InformationCircleIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-blue-700">
                    <p className="font-medium mb-1">
                      Ordre de filtrage recommandé :
                    </p>
                    <ul className="space-y-1">
                      <li>1. Thématique (bio, mots-clés) - BASE du filtrage</li>
                      <li>2. Similarité et hashtags - AFFINEMENT</li>
                      <li>3. Caractéristiques démographiques - PRÉCISION</li>
                      <li>4. Géographie - LOCALISATION finale</li>
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
