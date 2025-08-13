'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import {
  MegaphoneIcon,
  PlusIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  HashtagIcon,
  CalendarDaysIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import {
  PlayCircleIcon as PlayCircleIconSolid,
  PauseCircleIcon as PauseCircleIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
  DocumentTextIcon,
} from '@heroicons/react/24/solid';
import { CampaignTracker } from '@/types';
import { getAdvancedCampaigns, createCampaign } from '@/lib/mockData';
import CreateCampaignModal from '@/components/campaigns/CreateCampaignModal';

// Fonction pour obtenir l'icône du statut
const getStatusIcon = (status: CampaignTracker['status']) => {
  switch (status) {
    case 'active':
      return <PlayCircleIconSolid className="w-4 h-4 text-green-500" />;
    case 'paused':
      return <PauseCircleIconSolid className="w-4 h-4 text-orange-500" />;
    case 'completed':
      return <CheckCircleIconSolid className="w-4 h-4 text-blue-500" />;
    case 'cancelled':
      return <CheckCircleIconSolid className="w-4 h-4 text-red-500" />;
    default:
      return <DocumentTextIcon className="w-4 h-4 text-gray-400" />;
  }
};

// Fonction pour obtenir le texte du statut
const getStatusText = (status: CampaignTracker['status']) => {
  switch (status) {
    case 'active':
      return 'Actif';
    case 'paused':
      return 'En pause';
    case 'completed':
      return 'Terminé';
    case 'cancelled':
      return 'Annulé';
    case 'draft':
      return 'Brouillon';
    default:
      return 'Inconnu';
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

export default function SimpleCampaignsPage() {
  const [campaigns, setCampaigns] = useState<CampaignTracker[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Charger les campagnes
  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await getAdvancedCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error('Erreur lors du chargement des campagnes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  // Filtrer les campagnes
  const filteredCampaigns = campaigns.filter((campaign) => {
    if (!searchQuery.trim()) return true;
    return (
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Créer une nouvelle campagne
  const handleCreateCampaign = async (campaignData: {
    name: string;
    description: string;
    hashtags: string[];
    platforms: string[];
  }) => {
    try {
      const newCampaign = await createCampaign({
        name: campaignData.name,
        description: campaignData.description,
        trackingConfig: {
          hashtags: campaignData.hashtags,
          mentions: [],
          keywords: [],
          platforms: campaignData.platforms as (
            | 'instagram'
            | 'youtube'
            | 'tiktok'
          )[],
          autoImport: true,
          flagMissingHashtags: true,
          flagMissingDisclosure: true,
          eventMode: false,
        },
        creators: [],
        totalBudget: 0,
      });

      setCampaigns((prev) => [newCampaign, ...prev]);
    } catch (error) {
      console.error('Erreur lors de la création de la campagne:', error);
      alert('Erreur lors de la création de la campagne');
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

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

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header simple */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <MegaphoneIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Campagnes</h1>
              <p className="text-gray-600 mt-1">
                Gérez vos campagnes de tracking d&apos;influence
              </p>
            </div>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Nouvelle campagne</span>
          </Button>
        </div>

        {/* Statistiques simples */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm font-medium">
                  Campagnes actives
                </p>
                <p className="text-2xl font-bold text-green-800">
                  {campaigns.filter((c) => c.status === 'active').length}
                </p>
              </div>
              <PlayCircleIconSolid className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-medium">
                  Total campagnes
                </p>
                <p className="text-2xl font-bold text-blue-800">
                  {campaigns.length}
                </p>
              </div>
              <MegaphoneIcon className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 text-sm font-medium">
                  Total impressions
                </p>
                <p className="text-2xl font-bold text-purple-800">
                  {formatNumber(
                    campaigns.reduce(
                      (sum, c) => sum + c.analytics.reach.totalImpressions,
                      0
                    )
                  )}
                </p>
              </div>
              <EyeIcon className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Recherche */}
      {campaigns.length > 0 && (
        <div className="bg-white/80 backdrop-blur-xl rounded-xl p-4 border border-gray-200/50">
          <div className="relative max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher une campagne..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* Liste des campagnes */}
      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📢</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {campaigns.length === 0
              ? 'Aucune campagne créée'
              : 'Aucune campagne trouvée'}
          </h3>
          <p className="text-gray-600 mb-6">
            {campaigns.length === 0
              ? 'Créez votre première campagne pour commencer le tracking'
              : 'Essayez de modifier votre recherche'}
          </p>
          {campaigns.length === 0 && (
            <Button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Créer ma première campagne</span>
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white/80 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Header de la campagne */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Link
                      href={`/campagnes/${campaign.id}`}
                      className="text-xl font-bold text-gray-900 hover:text-purple-600 transition-colors"
                    >
                      {campaign.name}
                    </Link>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(campaign.status)}
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColors(campaign.status)}`}
                      >
                        {getStatusText(campaign.status)}
                      </span>
                    </div>
                  </div>

                  {campaign.description && (
                    <p className="text-gray-600 mb-3">{campaign.description}</p>
                  )}

                  {/* Hashtags */}
                  <div className="flex flex-wrap items-center gap-2">
                    {campaign.trackingConfig.hashtags
                      .slice(0, 4)
                      .map((hashtag) => (
                        <span
                          key={hashtag}
                          className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                        >
                          <HashtagIcon className="w-3 h-3" />
                          <span>{hashtag}</span>
                        </span>
                      ))}
                    {campaign.trackingConfig.hashtags.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        +{campaign.trackingConfig.hashtags.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link href={`/campagnes/${campaign.id}`}>
                    <Button size="sm" className="flex items-center space-x-1">
                      <ChartBarIcon className="w-4 h-4" />
                      <span>Voir</span>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Métriques simplifiées */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Contenus</div>
                  <div className="text-lg font-bold text-gray-900">
                    {campaign.analytics.content.totalPosts}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-500">Impressions</div>
                  <div className="text-lg font-bold text-purple-600">
                    {formatNumber(campaign.analytics.reach.totalImpressions)}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-500">Engagements</div>
                  <div className="text-lg font-bold text-blue-600">
                    {formatNumber(
                      campaign.analytics.engagement.totalEngagements
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-500">Créateurs</div>
                  <div className="text-lg font-bold text-gray-900">
                    {campaign.analytics.content.creatorsPosted}/
                    {campaign.analytics.content.totalCreators}
                  </div>
                </div>
              </div>

              {/* Période */}
              <div className="flex items-center justify-between text-sm text-gray-500 mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <CalendarDaysIcon className="w-4 h-4" />
                  <span>
                    {new Date(campaign.startDate).toLocaleDateString('fr-FR')}
                    {campaign.endDate && (
                      <>
                        {' '}
                        -{' '}
                        {new Date(campaign.endDate).toLocaleDateString('fr-FR')}
                      </>
                    )}
                  </span>
                </div>
                <div className="flex space-x-2">
                  {campaign.trackingConfig.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full capitalize"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de création */}
      <CreateCampaignModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateCampaign}
      />
    </div>
  );
}
