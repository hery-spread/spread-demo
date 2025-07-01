'use client';

import { useState, useEffect } from 'react';
import {
  searchInfluencers,
  SearchFilters as ISearchFilters,
} from '@/lib/mockData';
import { Influencer } from '@/types';
import SearchFilters from '@/components/search/SearchFilters';
import SearchResultsTable from '@/components/search/SearchResultsTable';
import PlatformTabs from '@/components/search/PlatformTabs';
import PlatformStats from '@/components/search/PlatformStats';

type Platform = 'all' | 'instagram' | 'youtube' | 'tiktok';

export default function SearchPage() {
  const [filters, setFilters] = useState<ISearchFilters>({});
  const [results, setResults] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(false);
  const [activePlatform, setActivePlatform] = useState<Platform>('all');

  const handleSearch = async () => {
    setLoading(true);

    const searchFilters = {
      ...filters,
      platform: activePlatform !== 'all' ? activePlatform : undefined,
    };

    // Simuler un délai d'API
    setTimeout(() => {
      const searchResults = searchInfluencers(searchFilters);
      setResults(searchResults);
      setLoading(false);
    }, 800);
  };

  // Fonction pour changer de plateforme
  const handlePlatformChange = (platform: Platform) => {
    setActivePlatform(platform);
    const newFilters = { ...filters };
    if (platform === 'all') {
      delete newFilters.platform;
    } else {
      newFilters.platform = platform;
    }
    setFilters(newFilters);
  };

  // Calculer les comptes par plateforme
  const getPlatformCounts = () => {
    const allResults = searchInfluencers(filters);
    return {
      all: allResults.length,
      instagram: allResults.filter((r) => r.platform === 'instagram').length,
      youtube: allResults.filter((r) => r.platform === 'youtube').length,
      tiktok: allResults.filter((r) => r.platform === 'tiktok').length,
    };
  };

  // Recherche initiale au chargement de la page
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Relancer la recherche quand la plateforme change
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePlatform]);

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

      <PlatformStats
        currentResults={results.length}
        activePlatform={activePlatform}
      />

      <PlatformTabs
        activePlatform={activePlatform}
        onPlatformChange={handlePlatformChange}
        counts={getPlatformCounts()}
      />

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
