'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SimilarCreatorResult } from '@/types';
import { Button } from '@/components/ui/Button';
import {
  SparklesIcon,
  ChartBarIcon,
  CurrencyEuroIcon,
  CheckBadgeIcon,
  ArrowPathIcon,
  EyeIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

interface SimilarCreatorsResultsProps {
  results: SimilarCreatorResult[];
  isLoading: boolean;
  loadedCount: number;
  totalAvailable: number;
  onLoadMore: () => void;
  isLoadingMore?: boolean;
}

export default function SimilarCreatorsResults({
  results,
  isLoading,
  loadedCount,
  totalAvailable,
  onLoadMore,
  isLoadingMore = false,
}: SimilarCreatorsResultsProps) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const getConfidenceColor = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getConfidenceLabel = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high':
        return 'Haute confiance';
      case 'medium':
        return 'Confiance moyenne';
      case 'low':
        return 'Confiance faible';
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleViewProfile = (id: string) => {
    router.push(`/profile/${id}`);
  };

  if (isLoading && results.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-12 border border-gray-200/50 shadow-sm text-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 font-medium">
          Recherche de créateurs similaires...
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Analyse des patterns de performance en cours
        </p>
      </div>
    );
  }

  if (!isLoading && results.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-12 border border-gray-200/50 shadow-sm text-center">
        <SparklesIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Sélectionnez une campagne
        </h3>
        <p className="text-gray-500 text-sm">
          Choisissez une campagne ci-dessus pour découvrir des créateurs
          similaires à vos top performers
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            Créateurs similaires trouvés
          </h3>
          <p className="text-sm text-gray-500">
            {totalAvailable} créateurs potentiels • {loadedCount} affichés
          </p>
        </div>

        {selectedIds.length > 0 && (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">
              {selectedIds.length} sélectionné
              {selectedIds.length > 1 ? 's' : ''}
            </span>
            <Button variant="outline" size="sm">
              Ajouter à une liste
            </Button>
          </div>
        )}
      </div>

      {/* Grille de résultats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((creator) => (
          <div
            key={creator.id}
            className={`bg-white/80 backdrop-blur-xl rounded-xl p-4 border-2 transition-all duration-200 ${
              selectedIds.includes(creator.id)
                ? 'border-blue-500 shadow-md'
                : 'border-gray-200/50 hover:border-blue-300 hover:shadow-md'
            }`}
          >
            {/* Header avec avatar et score */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {creator.verified && (
                    <CheckBadgeIcon className="w-4 h-4 text-blue-500 absolute -bottom-0.5 -right-0.5 bg-white rounded-full" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {creator.name}
                  </h4>
                  <p className="text-xs text-gray-500">@{creator.username}</p>
                </div>
              </div>

              {/* Score de similarité */}
              <div className="text-right">
                <div className="text-xl font-bold text-blue-600">
                  {creator.similarityScore}%
                </div>
                <div className="text-xs text-gray-500">Match</div>
              </div>
            </div>

            {/* Badge de confiance */}
            <div
              className={`px-2 py-1 text-xs font-medium rounded-full inline-flex items-center space-x-1 mb-3 border ${getConfidenceColor(
                creator.confidenceLevel
              )}`}
            >
              <SparklesIcon className="w-3 h-3" />
              <span>{getConfidenceLabel(creator.confidenceLevel)}</span>
            </div>

            {/* Métriques prédites */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-green-50 rounded-lg p-2 text-center">
                <div className="flex items-center justify-center space-x-1 text-green-700">
                  <ChartBarIcon className="w-3.5 h-3.5" />
                  <span className="font-semibold text-sm">
                    {creator.predictedROI.toFixed(0)}%
                  </span>
                </div>
                <div className="text-xs text-green-600">ROI prédit</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-2 text-center">
                <div className="flex items-center justify-center space-x-1 text-blue-700">
                  <CurrencyEuroIcon className="w-3.5 h-3.5" />
                  <span className="font-semibold text-sm">
                    {formatCurrency(creator.estimatedCost)}
                  </span>
                </div>
                <div className="text-xs text-blue-600">Coût estimé</div>
              </div>
            </div>

            {/* Stats actuelles */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <span>{formatNumber(creator.followers)} followers</span>
              <span>
                {creator.predictedEngagementRate.toFixed(2)}% ER prédit
              </span>
            </div>

            {/* Attributs matchés */}
            <div className="flex flex-wrap gap-1 mb-3">
              {creator.matchedAttributes.slice(0, 3).map((attr) => (
                <span
                  key={attr}
                  className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded"
                >
                  {attr}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 pt-3 border-t border-gray-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewProfile(creator.id)}
                className="flex-1 flex items-center justify-center space-x-1"
              >
                <EyeIcon className="w-4 h-4" />
                <span>Voir</span>
              </Button>
              <Button
                variant={
                  selectedIds.includes(creator.id) ? 'default' : 'outline'
                }
                size="sm"
                onClick={() => toggleSelect(creator.id)}
                className="flex-1 flex items-center justify-center space-x-1"
              >
                <PlusIcon className="w-4 h-4" />
                <span>
                  {selectedIds.includes(creator.id) ? 'Sélectionné' : 'Ajouter'}
                </span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton charger plus */}
      {loadedCount < totalAvailable && (
        <div className="text-center pt-4">
          <Button
            variant="outline"
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="flex items-center space-x-2 mx-auto"
          >
            {isLoadingMore ? (
              <>
                <ArrowPathIcon className="w-4 h-4 animate-spin" />
                <span>Chargement...</span>
              </>
            ) : (
              <>
                <ArrowPathIcon className="w-4 h-4" />
                <span>
                  Charger 10 de plus ({totalAvailable - loadedCount} restants)
                </span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
