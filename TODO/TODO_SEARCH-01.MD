# PLAN D'ACTION PRESCRIPTIF : SEARCH-01

**User Story :** En tant qu'utilisateur, je veux une interface de recherche avec des filtres (plateforme, followers, engagement, pays) pour trouver des influenceurs spécifiques.

**Objectif :** Créer la page de recherche avec formulaire de filtres avancés.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer le composant SearchFilters

Créer `src/components/search/SearchFilters.tsx` :

```tsx
"use client";

import { useState } from "react";
import { SearchFilters as ISearchFilters } from "@/lib/mockData";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";

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

  const updateFilter = (key: keyof ISearchFilters, value: any) => {
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
            value={filters.platform || ""}
            onChange={(e) =>
              updateFilter("platform", e.target.value || undefined)
            }
            options={[
              { value: "", label: "Toutes les plateformes" },
              { value: "instagram", label: "Instagram" },
              { value: "youtube", label: "YouTube" },
              { value: "tiktok", label: "TikTok" },
            ]}
          />

          <Select
            label="Pays"
            value={filters.country || ""}
            onChange={(e) =>
              updateFilter("country", e.target.value || undefined)
            }
            options={[
              { value: "", label: "Tous les pays" },
              { value: "FR", label: "France" },
              { value: "US", label: "États-Unis" },
              { value: "UK", label: "Royaume-Uni" },
              { value: "DE", label: "Allemagne" },
              { value: "ES", label: "Espagne" },
              { value: "IT", label: "Italie" },
              { value: "CA", label: "Canada" },
            ]}
          />

          <div className="flex items-center space-x-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.verified || false}
                onChange={(e) =>
                  updateFilter("verified", e.target.checked || undefined)
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
          {showAdvanced ? "Masquer" : "Afficher"} les filtres avancés
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
                    value={filters.minFollowers || ""}
                    onChange={(e) =>
                      updateFilter(
                        "minFollowers",
                        parseInt(e.target.value) || undefined
                      )
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxFollowers || ""}
                    onChange={(e) =>
                      updateFilter(
                        "maxFollowers",
                        parseInt(e.target.value) || undefined
                      )
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Taux d'engagement (%)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Min"
                    value={filters.minEngagement || ""}
                    onChange={(e) =>
                      updateFilter(
                        "minEngagement",
                        parseFloat(e.target.value) || undefined
                      )
                    }
                  />
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Max"
                    value={filters.maxEngagement || ""}
                    onChange={(e) =>
                      updateFilter(
                        "maxEngagement",
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
                    updateFilter("hasEmail", e.target.checked || undefined)
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
            {loading ? "Recherche en cours..." : "Rechercher des influenceurs"}
          </Button>
        </div>
      </div>
    </div>
  );
}
```

### Étape 2 : Créer la page de recherche

Créer `src/app/search/page.tsx` :

```tsx
"use client";

import { useState, useEffect } from "react";
import {
  searchInfluencers,
  SearchFilters as ISearchFilters,
} from "@/lib/mockData";
import { Influencer } from "@/types";
import SearchFilters from "@/components/search/SearchFilters";

export default function SearchPage() {
  const [filters, setFilters] = useState<ISearchFilters>({});
  const [results, setResults] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setHasSearched(true);

    // Simuler un délai d'API
    setTimeout(() => {
      const searchResults = searchInfluencers(filters);
      setResults(searchResults);
      setLoading(false);
    }, 800);
  };

  // Recherche initiale au chargement de la page
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Recherche d'Influenceurs
        </h1>
        <p className="text-gray-600">
          Utilisez les filtres ci-dessous pour trouver les influenceurs qui
          correspondent à vos critères.
        </p>
      </div>

      <SearchFilters
        filters={filters}
        onFiltersChange={setFilters}
        onSearch={handleSearch}
        loading={loading}
      />

      {/* Résultats */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Résultats de recherche
            </h3>
            {hasSearched && (
              <span className="text-sm text-gray-500">
                {loading
                  ? "Recherche en cours..."
                  : `${results.length} influenceur${
                      results.length > 1 ? "s" : ""
                    } trouvé${results.length > 1 ? "s" : ""}`}
              </span>
            )}
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="w-20 h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              {results.slice(0, 10).map((influencer) => (
                <div
                  key={influencer.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={influencer.avatar}
                      alt={influencer.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        (
                          e.target as HTMLImageElement
                        ).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          influencer.name
                        )}&background=6366f1&color=fff`;
                      }}
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {influencer.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        @{influencer.username} • {influencer.platform}
                        {influencer.verified && " ✓"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {influencer.followers.toLocaleString()} followers •{" "}
                        {influencer.engagementRate}% engagement
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                      Voir le profil
                    </button>
                    <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700">
                      Ajouter à une liste
                    </button>
                  </div>
                </div>
              ))}
              {results.length > 10 && (
                <div className="text-center pt-4">
                  <button className="text-purple-600 hover:text-purple-700 font-medium">
                    Voir plus de résultats ({results.length - 10} restants)
                  </button>
                </div>
              )}
            </div>
          ) : hasSearched ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                Aucun influenceur trouvé avec ces critères.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Essayez d'ajuster vos filtres pour élargir votre recherche.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
```

### Étape 3 : Vérifier l'installation

```bash
npm run lint
npm run build
```

---

## Checklist de Validation

- [ ] Étape 1 : Composant SearchFilters créé avec filtres avancés
- [ ] Étape 2 : Page de recherche créée avec résultats
- [ ] Étape 3 : Lint et build passent sans erreur
