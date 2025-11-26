'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BusinessDNA, Influencer } from '@/types';
import { Button } from '@/components/ui/Button';
import SearchResultsTable from '@/components/search/SearchResultsTable';
import {
  SparklesIcon,
  ArrowPathIcon,
  AdjustmentsHorizontalIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';

interface BusinessDNAResultsProps {
  dna: BusinessDNA;
  results: Influencer[];
  isLoading: boolean;
  onRefresh: () => void;
}

export default function BusinessDNAResults({
  dna,
  results,
  isLoading,
  onRefresh,
}: BusinessDNAResultsProps) {
  const router = useRouter();
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([]);

  const handleViewProfile = (influencer: Influencer) => {
    router.push(`/profile/${influencer.id}`);
  };

  const handleAddToList = (influencer: Influencer) => {
    // TODO: Implémenter l'ajout à une liste
    alert(`Ajouter ${influencer.name} à une liste`);
  };

  const handleSelectInfluencer = (influencerId: string) => {
    setSelectedInfluencers((prev) =>
      prev.includes(influencerId)
        ? prev.filter((id) => id !== influencerId)
        : [...prev, influencerId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header avec infos du DNA */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            {dna.logoUrl && (
              <img
                src={dna.logoUrl}
                alt={dna.name}
                className="w-14 h-14 rounded-xl"
              />
            )}
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-gray-900">{dna.name}</h2>
                <CheckBadgeIcon className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-sm text-gray-500">{dna.websiteUrl}</p>
              <div className="flex items-center space-x-2 mt-2">
                {dna.categories.map((category) => (
                  <span
                    key={category}
                    className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              <ArrowPathIcon
                className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
              />
              <span>Actualiser</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <AdjustmentsHorizontalIcon className="w-4 h-4" />
              <span>Filtres</span>
            </Button>
          </div>
        </div>

        {/* Mots-clés utilisés */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <SparklesIcon className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-700">
              Recherche basée sur les mots-clés
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {dna.keywords.slice(0, 8).map((keyword) => (
              <span
                key={keyword}
                className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
              >
                {keyword}
              </span>
            ))}
            {dna.keywords.length > 8 && (
              <span className="px-2.5 py-1 text-gray-400 text-xs">
                +{dna.keywords.length - 8} autres
              </span>
            )}
          </div>
        </div>

        {/* Stats des résultats */}
        <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {results.length}
            </div>
            <div className="text-xs text-gray-500">Créateurs trouvés</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {results.filter((r) => r.platform === 'instagram').length}
            </div>
            <div className="text-xs text-gray-500">Instagram</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">
              {results.filter((r) => r.platform === 'youtube').length}
            </div>
            <div className="text-xs text-gray-500">YouTube</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {results.filter((r) => r.platform === 'tiktok').length}
            </div>
            <div className="text-xs text-gray-500">TikTok</div>
          </div>
        </div>
      </div>

      {/* Actions sur la sélection */}
      {selectedInfluencers.length > 0 && (
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200 flex items-center justify-between">
          <span className="text-sm font-medium text-purple-900">
            {selectedInfluencers.length} créateur
            {selectedInfluencers.length > 1 ? 's' : ''} sélectionné
            {selectedInfluencers.length > 1 ? 's' : ''}
          </span>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              Ajouter à une liste
            </Button>
            <Button size="sm">Exporter</Button>
          </div>
        </div>
      )}

      {/* Table des résultats */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Recherche de créateurs en cours...</p>
            <p className="text-sm text-gray-400 mt-1">
              Analyse basée sur l&apos;ADN business de {dna.name}
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun créateur trouvé
            </h3>
            <p className="text-gray-500 text-sm">
              Essayez de modifier les critères de recherche ou les mots-clés du
              Business DNA
            </p>
          </div>
        ) : (
          <SearchResultsTable
            results={results}
            loading={false}
            selectedInfluencers={selectedInfluencers}
            onViewProfile={handleViewProfile}
            onAddToList={handleAddToList}
            onSelectInfluencer={handleSelectInfluencer}
          />
        )}
      </div>
    </div>
  );
}
