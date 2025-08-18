'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import {
  ArrowLeftIcon,
  LinkIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  EyeIcon,
  HeartIcon,
  CurrencyEuroIcon,
} from '@heroicons/react/24/outline';
import {
  PlayCircleIcon as PlayCircleIconSolid,
  PauseCircleIcon as PauseCircleIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
} from '@heroicons/react/24/solid';
import { CampaignTracker } from '@/types';
import { getCampaignById } from '@/lib/mockData';

// Fonction pour obtenir l'icône du statut
const getStatusIcon = (status: CampaignTracker['status']) => {
  switch (status) {
    case 'active':
      return <PlayCircleIconSolid className="w-5 h-5 text-green-500" />;
    case 'paused':
      return <PauseCircleIconSolid className="w-5 h-5 text-orange-500" />;
    case 'completed':
      return <CheckCircleIconSolid className="w-5 h-5 text-blue-500" />;
    case 'cancelled':
      return <CheckCircleIconSolid className="w-5 h-5 text-red-500" />;
    default:
      return <CheckCircleIconSolid className="w-5 h-5 text-gray-400" />;
  }
};

// Fonction pour obtenir les couleurs du statut
const getStatusColors = (status: CampaignTracker['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'paused':
      return 'bg-orange-100 text-orange-800';
    case 'completed':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'draft':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

export default function CampaignDetailPage() {
  const params = useParams();
  const campaignId = params.id as string;

  const [campaign, setCampaign] = useState<CampaignTracker | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCampaignData = async () => {
      try {
        const campaignData = await getCampaignById(campaignId);
        setCampaign(campaignData);
      } catch (error) {
        console.error('Erreur lors du chargement de la campagne:', error);
      } finally {
        setLoading(false);
      }
    };

    if (campaignId) {
      loadCampaignData();
    }
  }, [campaignId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🚫</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Campagne introuvable
        </h3>
        <p className="text-gray-600 mb-6">
          La campagne demandée n&apos;existe pas ou a été supprimée.
        </p>
        <Link href="/campagnes">
          <Button className="flex items-center space-x-2">
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Retour aux campagnes</span>
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* En-tête avec navigation */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/campagnes"
            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Retour aux campagnes</span>
          </Link>

          <div className="flex items-center space-x-3">
            {getStatusIcon(campaign.status)}
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColors(campaign.status)}`}
            >
              {campaign.status.charAt(0).toUpperCase() +
                campaign.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {campaign.name}
            </h1>
            {campaign.description && (
              <p className="text-gray-600 text-lg mb-4">
                {campaign.description}
              </p>
            )}

            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CalendarDaysIcon className="w-4 h-4" />
                <span>
                  {new Date(campaign.startDate).toLocaleDateString('fr-FR')}
                  {campaign.endDate && (
                    <>
                      {' '}
                      - {new Date(campaign.endDate).toLocaleDateString('fr-FR')}
                    </>
                  )}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <UserGroupIcon className="w-4 h-4" />
                <span>{campaign.creators.length} créateurs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200/30">
          <div className="flex items-center justify-between mb-2">
            <EyeIcon className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-800">
              {formatNumber(campaign.analytics.reach.totalImpressions)}
            </span>
          </div>
          <p className="text-purple-700 font-medium">Impressions</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200/30">
          <div className="flex items-center justify-between mb-2">
            <HeartIcon className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-800">
              {formatNumber(campaign.analytics.engagement.totalEngagements)}
            </span>
          </div>
          <p className="text-blue-700 font-medium">Engagements</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200/30">
          <div className="flex items-center justify-between mb-2">
            <ChartBarIcon className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">
              {campaign.analytics.content.totalPosts}
            </span>
          </div>
          <p className="text-green-700 font-medium">Contenus</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200/30">
          <div className="flex items-center justify-between mb-2">
            <CurrencyEuroIcon className="w-8 h-8 text-orange-600" />
            <span className="text-2xl font-bold text-orange-800">
              {formatCurrency(campaign.spentBudget)}
            </span>
          </div>
          <p className="text-orange-700 font-medium">Budget dépensé</p>
        </div>
      </div>

      {/* Liens trackés */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <LinkIcon className="w-5 h-5" />
          <span>Liens trackés</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaign.trackingConfig.links.map((link, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {link.label || new URL(link.url).hostname}
                  </h3>
                  <p className="text-sm text-gray-500 break-all">{link.url}</p>
                </div>
                <LinkIcon className="w-4 h-4 text-gray-400 ml-2 mt-1" />
              </div>

              {link.budget && (
                <div className="flex items-center space-x-2 mt-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-purple-700">
                    Budget: {formatCurrency(link.budget)}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Créateurs participants */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <UserGroupIcon className="w-5 h-5" />
          <span>Créateurs participants</span>
        </h2>

        <div className="space-y-4">
          {campaign.creators.map((creator) => (
            <div
              key={creator.influencerId}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={creator.influencerAvatar}
                  alt={creator.influencerName}
                  className="w-12 h-12 rounded-full bg-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.influencerName)}&background=8b5cf6&color=fff`;
                  }}
                />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {creator.influencerName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    @{creator.influencerUsername}
                  </p>
                </div>
                <span className="capitalize px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {creator.platform}
                </span>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="font-medium text-gray-900">
                    {creator.deliveredPosts}/{creator.expectedPosts}
                  </div>
                  <div className="text-gray-500">Posts</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-gray-900">
                    {formatCurrency(creator.costPerCreator)}
                  </div>
                  <div className="text-gray-500">Coût</div>
                </div>
                <div
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    creator.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : creator.status === 'active'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {creator.status === 'completed'
                    ? 'Terminé'
                    : creator.status === 'active'
                      ? 'Actif'
                      : 'En attente'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
