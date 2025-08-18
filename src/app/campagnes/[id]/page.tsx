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
  EyeIcon,
  HeartIcon,
  CurrencyEuroIcon,
  VideoCameraIcon,
  PhotoIcon,
  FireIcon,
  CursorArrowRaysIcon,
  BanknotesIcon,
  TrophyIcon,
  UsersIcon,
  PlusIcon,
  CheckIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import {
  PlayCircleIcon as PlayCircleIconSolid,
  PauseCircleIcon as PauseCircleIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
} from '@heroicons/react/24/solid';
import { CampaignTracker } from '@/types';
import { getCampaignById } from '@/lib/mockData';
import ShareCampaignModal from '@/components/campaigns/ShareCampaignModal';

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
  const [activeTab, setActiveTab] = useState('overview');
  const [showShareModal, setShowShareModal] = useState(false);

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
          <div className="flex-1">
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

          {/* Actions */}
          <div className="flex items-center space-x-3 ml-6">
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={() => setShowShareModal(true)}
            >
              <ShareIcon className="w-4 h-4" />
              <span>Share campaign</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <PlusIcon className="w-4 h-4" />
              <span>Add creators</span>
            </Button>
            <Button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">
              <CheckIcon className="w-4 h-4" />
              <span>Finish campaign</span>
            </Button>
          </div>
        </div>

        {/* Onglets */}
        <div className="border-t border-gray-200 mt-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Campaign overview' },
              {
                id: 'creators',
                label: `Creators (${campaign.creators.length})`,
              },
              { id: 'content', label: 'Published content (0)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Contenu selon l'onglet actif */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Section Content */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Content</h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <UsersIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {campaign.analytics.content.creatorsPosted}
                  </span>
                  <span className="text-gray-500 ml-1">
                    out of {campaign.analytics.content.totalCreators}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Creators posted</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <CalendarDaysIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">0</span>
                </div>
                <p className="text-sm text-gray-600">Content today</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <PhotoIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {campaign.analytics.content.totalPosts}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Total posts</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <FireIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {campaign.analytics.content.totalStories}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Total Stories</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <VideoCameraIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {campaign.analytics.content.totalReels}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Total Reels</p>
              </div>
            </div>
          </div>

          {/* Section Awareness & engagement */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Awareness &amp; engagement
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <HeartIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {formatNumber(
                      campaign.analytics.engagement.totalEngagements
                    )}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Total engagements</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrophyIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {campaign.analytics.engagement.averageER}%
                  </span>
                </div>
                <p className="text-sm text-gray-600">Avg. ER%</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <EyeIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {formatNumber(campaign.analytics.reach.totalImpressions)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Est. impressions</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <UsersIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {formatNumber(campaign.analytics.reach.totalReach)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Est. reach</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <HeartIcon className="w-5 h-5 text-red-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {formatNumber(campaign.analytics.engagement.totalLikes)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Total likes</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <ChatBubbleLeftIcon className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {formatNumber(campaign.analytics.engagement.totalComments)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Total comments</p>
              </div>
            </div>

            {/* Section Views */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <EyeIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {formatNumber(campaign.analytics.reach.totalViews)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Views</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <VideoCameraIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">-</span>
                </div>
                <p className="text-sm text-gray-600">Avg. video ER</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <BanknotesIcon className="w-5 h-5 text-green-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(campaign.analytics.financials.totalEMV)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">EMV</p>
              </div>
            </div>
          </div>

          {/* Section Performance */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Performance</h2>
              <Button
                variant="outline"
                size="sm"
                className="text-purple-600 border-purple-200"
              >
                + View clicks report
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <LinkIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {campaign.analytics.performance.totalLinks}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Total links</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <CursorArrowRaysIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {campaign.analytics.performance.totalClicks}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Total clicks</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <CurrencyEuroIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(
                      campaign.analytics.financials.totalCreatorCost
                    )}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Total creator cost</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrophyIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {campaign.analytics.financials.roas
                      ? `${campaign.analytics.financials.roas}x`
                      : '-'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">ROAS</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <BanknotesIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(campaign.analytics.financials.averageCPM)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">CPM</p>
              </div>
            </div>
          </div>

          {/* Section Campaign setup - Liens trackés */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <span>Campaign setup</span>
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
                      <p className="text-sm text-gray-500 break-all">
                        {link.url}
                      </p>
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
        </div>
      )}

      {/* Onglet Creators */}
      {activeTab === 'creators' && (
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <UserGroupIcon className="w-5 h-5" />
            <span>Creators ({campaign.creators.length})</span>
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
      )}

      {/* Onglet Published Content */}
      {activeTab === 'content' && (
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No published content yet
            </h3>
            <p className="text-gray-600">
              Published content from creators will appear here once the campaign
              is running.
            </p>
          </div>
        </div>
      )}

      {/* Modal de partage */}
      {campaign && (
        <ShareCampaignModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          campaign={campaign}
        />
      )}
    </div>
  );
}
