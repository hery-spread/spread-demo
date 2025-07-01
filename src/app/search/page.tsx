'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  searchInfluencers,
  SearchFilters as ISearchFilters,
} from '@/lib/mockData';
import { Influencer } from '@/types';
import SearchFilters from '@/components/search/SearchFilters';
import SearchResultsTable from '@/components/search/SearchResultsTable';
import PlatformTabs from '@/components/search/PlatformTabs';
import PlatformStats from '@/components/search/PlatformStats';
import { Button } from '@/components/ui/Button';

type Platform = 'all' | 'instagram' | 'youtube' | 'tiktok';

export default function SearchPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<ISearchFilters>({});
  const [results, setResults] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(false);
  const [activePlatform, setActivePlatform] = useState<Platform>('all');
  const [showAddToListModal, setShowAddToListModal] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] =
    useState<Influencer | null>(null);

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
          router.push(`/profile/${influencer.id}`);
        }}
        onAddToList={(influencer: Influencer) => {
          setSelectedInfluencer(influencer);
          setShowAddToListModal(true);
        }}
      />

      {/* Modal Ajouter à liste */}
      {showAddToListModal && selectedInfluencer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ajouter {selectedInfluencer.name} à une liste
            </h3>

            <div className="space-y-3 mb-6">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                📋 Liste Beauté & Mode
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                🎮 Liste Gaming
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                ✨ Liste VIP
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-purple-50 border-purple-200">
                ➕ Créer une nouvelle liste
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddToListModal(false);
                  setSelectedInfluencer(null);
                }}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                onClick={() => {
                  alert(`${selectedInfluencer.name} ajouté à la liste !`);
                  setShowAddToListModal(false);
                  setSelectedInfluencer(null);
                }}
                className="flex-1"
              >
                Ajouter
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
