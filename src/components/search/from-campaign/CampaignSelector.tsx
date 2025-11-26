'use client';

import { CampaignTracker } from '@/types';
import {
  MegaphoneIcon,
  UserGroupIcon,
  ChartBarIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import {
  PlayCircleIcon as PlayCircleIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
} from '@heroicons/react/24/solid';

interface CampaignSelectorProps {
  campaigns: CampaignTracker[];
  selectedCampaignId: string | null;
  onSelectCampaign: (campaignId: string) => void;
  isLoading?: boolean;
}

export default function CampaignSelector({
  campaigns,
  selectedCampaignId,
  onSelectCampaign,
  isLoading = false,
}: CampaignSelectorProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Filtrer les campagnes avec des créateurs (pour avoir des données à analyser)
  const eligibleCampaigns = campaigns.filter(
    (c) =>
      c.creators.length > 0 &&
      (c.status === 'active' || c.status === 'completed')
  );

  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
          <MegaphoneIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Sélectionner une campagne
          </h2>
          <p className="text-sm text-gray-500">
            Choisissez une campagne pour trouver des créateurs similaires aux
            top performers
          </p>
        </div>
      </div>

      {eligibleCampaigns.length === 0 ? (
        <div className="text-center py-8 px-4 bg-gray-50 rounded-xl">
          <div className="text-4xl mb-3">📊</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Aucune campagne éligible
          </h3>
          <p className="text-gray-500 text-sm">
            Vous avez besoin d&apos;au moins une campagne active ou terminée
            avec des créateurs pour utiliser cette fonctionnalité.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {eligibleCampaigns.map((campaign) => {
            const isSelected = campaign.id === selectedCampaignId;

            return (
              <button
                key={campaign.id}
                onClick={() => onSelectCampaign(campaign.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/50'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {campaign.name}
                      </h3>
                      {campaign.status === 'active' && (
                        <PlayCircleIconSolid className="w-4 h-4 text-green-500" />
                      )}
                      {campaign.status === 'completed' && (
                        <CheckCircleIconSolid className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    {campaign.description && (
                      <p className="text-sm text-gray-500 mb-2 line-clamp-1">
                        {campaign.description}
                      </p>
                    )}

                    {/* Métriques rapides */}
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <UserGroupIcon className="w-3.5 h-3.5" />
                        <span>
                          {campaign.creators.length} créateur
                          {campaign.creators.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <ChartBarIcon className="w-3.5 h-3.5" />
                        <span>
                          {formatNumber(
                            campaign.analytics.engagement.totalEngagements
                          )}{' '}
                          engagements
                        </span>
                      </div>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                        ROI{' '}
                        {campaign.analytics.financials.roas
                          ? `${Math.round(campaign.analytics.financials.roas * 100)}%`
                          : 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Indicateur de sélection */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-4 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <CheckCircleIcon className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>

                {/* Plateformes */}
                <div className="flex items-center space-x-2 mt-3">
                  {campaign.trackingConfig.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full capitalize"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
