'use client';

import { CampaignCreatorScore } from '@/types';
import {
  TrophyIcon,
  CurrencyEuroIcon,
  ChartBarIcon,
  FireIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

interface TopPerformersPanelProps {
  topPerformers: CampaignCreatorScore[];
  isLoading?: boolean;
}

export default function TopPerformersPanel({
  topPerformers,
  isLoading = false,
}: TopPerformersPanelProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 2,
    }).format(num);
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200/30">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-amber-200 rounded w-1/3" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-amber-100 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (topPerformers.length === 0) {
    return (
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200/30 text-center">
        <TrophyIcon className="w-12 h-12 text-amber-400 mx-auto mb-3" />
        <h3 className="font-semibold text-gray-900 mb-1">
          Aucun top performer
        </h3>
        <p className="text-sm text-gray-500">
          Sélectionnez une campagne pour voir les créateurs les plus performants
        </p>
      </div>
    );
  }

  // Prendre les 5 meilleurs
  const displayedPerformers = topPerformers.slice(0, 5);

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200/30">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
          <TrophyIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Top Performers</h2>
          <p className="text-sm text-gray-500">
            Créateurs avec le meilleur ROI de la campagne
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {displayedPerformers.map((performer, index) => (
          <div
            key={performer.creatorId}
            className="bg-white/70 rounded-xl p-4 border border-amber-200/30"
          >
            <div className="flex items-start space-x-3">
              {/* Rang et avatar */}
              <div className="relative">
                <img
                  src={performer.creatorAvatar}
                  alt={performer.creatorName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div
                  className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0
                      ? 'bg-amber-400 text-amber-900'
                      : index === 1
                        ? 'bg-gray-300 text-gray-700'
                        : index === 2
                          ? 'bg-orange-300 text-orange-800'
                          : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
              </div>

              {/* Infos */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-gray-900 truncate">
                    {performer.creatorName}
                  </h4>
                  {index === 0 && (
                    <StarIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  @{performer.creatorUsername}
                </p>

                {/* Métriques */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="flex items-center space-x-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                    <ChartBarIcon className="w-3 h-3" />
                    <span>ROI {performer.roi.toFixed(0)}%</span>
                  </div>
                  <div className="flex items-center space-x-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                    <CurrencyEuroIcon className="w-3 h-3" />
                    <span>
                      {formatCurrency(performer.costPerEngagement)}/eng
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                    <FireIcon className="w-3 h-3" />
                    <span>{performer.engagementRate.toFixed(2)}% ER</span>
                  </div>
                </div>

                {/* Attributs de performance */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {performer.performanceAttributes.slice(0, 3).map((attr) => (
                    <span
                      key={attr}
                      className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded"
                    >
                      {attr}
                    </span>
                  ))}
                </div>
              </div>

              {/* Score composite */}
              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-bold text-amber-600">
                  {performer.compositeScore}
                </div>
                <div className="text-xs text-gray-500">Score</div>
              </div>
            </div>

            {/* Détails supplémentaires */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-amber-200/30">
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">
                  {formatNumber(performer.totalEngagements)}
                </div>
                <div className="text-xs text-gray-500">Engagements</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">
                  {formatNumber(performer.totalImpressions)}
                </div>
                <div className="text-xs text-gray-500">Impressions</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">
                  {formatCurrency(performer.totalCost)}
                </div>
                <div className="text-xs text-gray-500">Coût</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message explicatif */}
      <div className="mt-4 p-3 bg-white/50 rounded-lg text-xs text-gray-600">
        <strong>Comment ça marche :</strong> L&apos;algorithme analyse les
        caractéristiques communes de vos top performers (ROI, engagement,
        audience) pour trouver des créateurs similaires susceptibles de générer
        les mêmes résultats.
      </div>
    </div>
  );
}
