'use client';

import { useState, useEffect } from 'react';
import {
  searchInfluencers,
  SearchFilters as ISearchFilters,
} from '@/lib/mockData';
import { Influencer } from '@/types';
import SearchFilters from '@/components/search/SearchFilters';
import SearchResultsTable from '@/components/search/SearchResultsTable';

export default function SearchPage() {
  const [filters, setFilters] = useState<ISearchFilters>({});
  const [results, setResults] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);

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
      <SearchResultsTable
        results={results}
        loading={loading}
        onViewProfile={(influencer: Influencer) => {
          // TODO: Naviguer vers la page de profil
          console.log('Voir profil:', influencer.name);
        }}
        onAddToList={(influencer: Influencer) => {
          // TODO: Ouvrir modal pour ajouter à une liste
          console.log('Ajouter à liste:', influencer.name);
        }}
      />
    </div>
  );
}
