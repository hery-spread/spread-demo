'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import {
  ShareIcon,
  UserGroupIcon,
  HeartIcon,
  EyeIcon,
  LinkIcon,
  CalendarDaysIcon,
  CurrencyEuroIcon,
  VideoCameraIcon,
  PhotoIcon,
  FireIcon,
  TrophyIcon,
  BanknotesIcon,
  CursorArrowRaysIcon,
  UsersIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';
import { PlayCircleIcon as PlayCircleIconSolid } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/Button';
import { CampaignTracker, SharedCampaign } from '@/types';

// Simuler la récupération des données de campagne partagée
function getSharedCampaign(
  shareId: string
): { campaign: CampaignTracker; shareData: SharedCampaign } | null {
  // Dans un vrai projet, ça ferait un appel API avec le shareId
  // Pour le mock, on simule la validation du shareId
  if (!shareId || shareId.length < 8) {
    return null;
  }

  // Pour le mock, on retourne les données de camp_1
  return {
    campaign: {
      id: 'camp_1',
      name: 'Samsung Galaxy S25 Launch',
      description:
        'Campagne de lancement du nouveau Galaxy S25 avec focus sur la photographie',

      trackingConfig: {
        links: [
          {
            url: 'https://samsung.com/s25-launch',
            label: 'Page officielle S25',
            budget: 5000,
          },
          {
            url: 'https://store.samsung.com/galaxy-s25',
            label: 'Boutique S25',
          },
          { url: 'https://samsung.fr/promo-s25', budget: 2500 },
        ],
        mentions: ['@samsung', '@samsungfrance'],
        keywords: ['Galaxy S25', 'Samsung', 'nouveau smartphone'],
        platforms: ['instagram', 'youtube', 'tiktok'],
        autoImport: true,
        flagMissingDisclosure: true,
        eventMode: false,
      },

      startDate: '2025-01-20T00:00:00Z',
      endDate: '2025-02-20T23:59:59Z',

      creators: [
        {
          influencerId: 'inf_1',
          influencerName: 'Marie Lifestyle',
          influencerUsername: 'marie_lifestyle',
          influencerAvatar: '/avatars/marie.jpg',
          platform: 'instagram',
          expectedPosts: 3,
          deliveredPosts: 2,
          costPerCreator: 2500,
          status: 'active',
          contractedAt: '2025-01-15T10:00:00Z',
        },
        {
          influencerId: 'inf_2',
          influencerName: 'Thomas Tech',
          influencerUsername: 'thomas_tech',
          influencerAvatar: '/avatars/thomas.jpg',
          platform: 'youtube',
          expectedPosts: 2,
          deliveredPosts: 2,
          costPerCreator: 4500,
          status: 'completed',
          contractedAt: '2025-01-15T10:00:00Z',
        },
      ],

      analytics: {
        content: {
          totalPosts: 5,
          totalStories: 8,
          totalReels: 3,
          totalVideos: 2,
          creatorsPosted: 2,
          totalCreators: 3,
        },

        engagement: {
          totalEngagements: 45200,
          averageER: 6.8,
          totalLikes: 32500,
          totalComments: 8900,
          totalShares: 2800,
          totalSaves: 1100,
        },

        reach: {
          totalImpressions: 850000,
          totalReach: 620000,
          averageVideoER: 7.4,
          totalViews: 145000,
        },

        performance: {
          totalLinks: 8,
          totalClicks: 3240,
          ctr: 3.8,
          totalConversions: 156,
          conversionRate: 4.8,
        },

        financials: {
          totalCreatorCost: 10200,
          totalEMV: 85400,
          averageCPM: 12.0,
          averageCPC: 3.15,
          roas: 8.37,
          costPerEngagement: 0.23,
        },

        byPlatform: {
          instagram: {
            posts: 3,
            engagements: 28900,
            impressions: 520000,
            cost: 2500,
            emv: 52000,
          },
          youtube: {
            posts: 2,
            engagements: 16300,
            impressions: 330000,
            cost: 7700,
            emv: 33400,
          },
        },

        topCreators: [],
        timeline: [],
      },

      status: 'active',
      createdBy: 'user_1',
      createdAt: '2025-01-15T09:00:00Z',
      updatedAt: '2025-01-25T16:30:00Z',
      totalBudget: 15000,
      spentBudget: 10200,
    },
    shareData: {
      id: shareId,
      campaignId: 'camp_1',
      shareType: 'public',
      createdAt: '2025-01-25T16:30:00Z',
      viewCount: Math.floor(Math.random() * 150) + 20,
      includeFinancials: true,
      includeBudgets: false,
      trackingEnabled: true,
    },
  };
}

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

export default function SharedCampaignPage() {
  const params = useParams();
  const shareId = params.shareId as string;

  const [campaignData, setCampaignData] = useState<{
    campaign: CampaignTracker;
    shareData: SharedCampaign;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSharedCampaign = () => {
      try {
        const data = getSharedCampaign(shareId);
        if (!data) {
          notFound();
          return;
        }
        setCampaignData(data);
      } catch (error) {
        console.error(
          'Erreur lors du chargement de la campagne partagée:',
          error
        );
        notFound();
      } finally {
        setLoading(false);
      }
    };

    loadSharedCampaign();
  }, [shareId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!campaignData) {
    return notFound();
  }

  const { campaign, shareData } = campaignData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header avec branding Spread */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                <ShareIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Campaign Report
                </h1>
                <p className="text-sm text-gray-500">Powered by Spread</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">
                {shareData.viewCount} vues • Partagé le{' '}
                {new Date(shareData.createdAt).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* En-tête de campagne */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200/50">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <PlayCircleIconSolid className="w-6 h-6 text-green-500" />
                  <span className="px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    Active
                  </span>
                </div>

                <h2 className="text-4xl font-bold text-gray-900 mb-3">
                  {campaign.name}
                </h2>

                {campaign.description && (
                  <p className="text-xl text-gray-600 mb-6">
                    {campaign.description}
                  </p>
                )}

                <div className="flex items-center space-x-8 text-gray-500">
                  <div className="flex items-center space-x-2">
                    <CalendarDaysIcon className="w-5 h-5" />
                    <span>
                      {new Date(campaign.startDate).toLocaleDateString('fr-FR')}
                      {campaign.endDate && (
                        <>
                          {' '}
                          -{' '}
                          {new Date(campaign.endDate).toLocaleDateString(
                            'fr-FR'
                          )}
                        </>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <UserGroupIcon className="w-5 h-5" />
                    <span>{campaign.creators.length} créateurs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Content */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Content</h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <UsersIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      {campaign.analytics.content.creatorsPosted}
                    </span>
                    <span className="text-gray-500 ml-1">
                      out of {campaign.analytics.content.totalCreators}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Creators posted</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <FireIcon className="w-5 h-5 text-gray-400 mr-2" />
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
                  <HeartIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {formatNumber(campaign.analytics.engagement.totalLikes)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Total likes</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <ChatBubbleLeftIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {formatNumber(campaign.analytics.engagement.totalComments)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Total comments</p>
              </div>
            </div>

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
                  <span className="text-2xl font-bold text-gray-900">
                    {campaign.analytics.reach.averageVideoER ? `${campaign.analytics.reach.averageVideoER}%` : '-'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Avg. video ER</p>
              </div>

              {shareData.includeFinancials && (
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <CurrencyEuroIcon className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-2xl font-bold text-gray-900">
                      {formatCurrency(campaign.analytics.financials.totalEMV)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">EMV</p>
                </div>
              )}
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

              {shareData.includeFinancials && (
                <>
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
                </>
              )}
            </div>
          </div>

          {/* Campaign setup */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Campaign setup</h3>
            
            <div className="space-y-4">
              {campaign.trackingConfig.links.map((link, index) => (
                <div key={index} className="flex items-start justify-between p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start space-x-3">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-purple-900 mb-1">
                          {link.label || new URL(link.url).hostname}
                        </h3>
                        <p className="text-sm text-gray-500 break-all">
                          {link.url}
                        </p>
                        {shareData.includeBudgets && link.budget && (
                          <p className="text-sm font-medium text-purple-700 mt-2">
                            Budget: {formatCurrency(link.budget)}
                          </p>
                        )}
                      </div>
                      <LinkIcon className="w-4 h-4 text-gray-400 ml-2 mt-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-center text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">
              Want to create campaigns like this?
            </h3>
            <p className="text-purple-100 text-lg mb-6 max-w-2xl mx-auto">
              Spread helps you find the perfect creators, track campaign
              performance, and measure ROI with advanced analytics.
            </p>
            <Button
              className="bg-white text-purple-600 hover:bg-gray-50 text-lg px-8 py-3 font-semibold"
              onClick={() => window.open('https://spread.com', '_blank')}
            >
              Try Spread for Free
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            This campaign report was created with{' '}
            <a
              href="https://spread.com"
              className="text-purple-400 hover:text-purple-300 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Spread
            </a>{' '}
            — The all-in-one influencer marketing platform
          </p>
        </div>
      </div>
    </div>
  );
}
