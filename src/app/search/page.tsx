'use client';

import { useState, useEffect } from 'react';
import {
  searchInfluencers,
  SearchFilters as ISearchFilters,
} from '@/lib/mockData';
import { Influencer } from '@/types';
import SearchFilters from '@/components/search/SearchFilters';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Recherche d&apos;Influenceurs
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
                  ? 'Recherche en cours...'
                  : `${results.length} influenceur${
                      results.length > 1 ? 's' : ''
                    } trouvé${results.length > 1 ? 's' : ''}`}
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
                        (e.target as HTMLImageElement).src =
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
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
                        {influencer.verified && ' ✓'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {influencer.followers.toLocaleString()} followers •{' '}
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
                Essayez d&apos;ajuster vos filtres pour élargir votre recherche.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
