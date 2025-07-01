'use client';

import { useState } from 'react';
import { SearchFilters as ISearchFilters } from '@/lib/mockData';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SearchFiltersProps {
  filters: ISearchFilters;
  onFiltersChange: (filters: ISearchFilters) => void;
  onSearch: () => void;
  loading?: boolean;
}

export default function SearchFilters({
  filters,
  onFiltersChange,
  onSearch,
  loading = false,
}: SearchFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = (
    key: keyof ISearchFilters,
    value: string | number | boolean | undefined
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <FunnelIcon className="w-5 h-5 mr-2" />
          Filtres de recherche
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="w-4 h-4 mr-1" />
            Effacer tout
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Filtres de base */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Plateforme"
            value={filters.platform || ''}
            onChange={(e) =>
              updateFilter('platform', e.target.value || undefined)
            }
            options={[
              { value: '', label: 'Toutes les plateformes' },
              { value: 'instagram', label: 'Instagram' },
              { value: 'youtube', label: 'YouTube' },
              { value: 'tiktok', label: 'TikTok' },
            ]}
          />

          <Select
            label="Pays"
            value={filters.country || ''}
            onChange={(e) =>
              updateFilter('country', e.target.value || undefined)
            }
            options={[
              { value: '', label: 'Tous les pays' },
              { value: 'FR', label: 'France' },
              { value: 'US', label: 'États-Unis' },
              { value: 'UK', label: 'Royaume-Uni' },
              { value: 'DE', label: 'Allemagne' },
              { value: 'ES', label: 'Espagne' },
              { value: 'IT', label: 'Italie' },
              { value: 'CA', label: 'Canada' },
            ]}
          />

          <div className="flex items-center space-x-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.verified || false}
                onChange={(e) =>
                  updateFilter('verified', e.target.checked || undefined)
                }
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Comptes vérifiés uniquement
              </span>
            </label>
          </div>
        </div>

        {/* Bouton pour afficher les filtres avancés */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          {showAdvanced ? 'Masquer' : 'Afficher'} les filtres avancés
        </button>

        {/* Filtres avancés */}
        {showAdvanced && (
          <div className="pt-4 border-t border-gray-100 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de followers
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minFollowers || ''}
                    onChange={(e) =>
                      updateFilter(
                        'minFollowers',
                        parseInt(e.target.value) || undefined
                      )
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxFollowers || ''}
                    onChange={(e) =>
                      updateFilter(
                        'maxFollowers',
                        parseInt(e.target.value) || undefined
                      )
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Taux d&apos;engagement (%)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Min"
                    value={filters.minEngagement || ''}
                    onChange={(e) =>
                      updateFilter(
                        'minEngagement',
                        parseFloat(e.target.value) || undefined
                      )
                    }
                  />
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Max"
                    value={filters.maxEngagement || ''}
                    onChange={(e) =>
                      updateFilter(
                        'maxEngagement',
                        parseFloat(e.target.value) || undefined
                      )
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.hasEmail || false}
                  onChange={(e) =>
                    updateFilter('hasEmail', e.target.checked || undefined)
                  }
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Email de contact disponible
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Bouton de recherche */}
        <div className="pt-4 border-t border-gray-100">
          <Button
            onClick={onSearch}
            disabled={loading}
            className="w-full md:w-auto"
          >
            {loading ? 'Recherche en cours...' : 'Rechercher des influenceurs'}
          </Button>
        </div>
      </div>
    </div>
  );
}
