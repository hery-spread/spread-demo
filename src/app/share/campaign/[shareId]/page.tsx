'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import {
  ShareIcon,
  UserGroupIcon,
  HeartIcon,
  EyeIcon,
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
  Cog6ToothIcon,
  ArrowDownTrayIcon,
  ShoppingCartIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { PlayCircleIcon as PlayCircleIconSolid } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/Button';
import {
  CampaignTracker,
  SharedCampaign,
  MetricsVisibilityConfig,
  DEFAULT_METRICS_VISIBILITY,
} from '@/types';
import CampaignCustomizationModal from '@/components/campaigns/CampaignCustomizationModal';
import CreatorDetailView from '@/components/campaigns/CreatorDetailView';
import ContentDetailView from '@/components/campaigns/ContentDetailView';
import ContentGrid, { ContentItem } from '@/components/campaigns/ContentGrid';

// Type pour la vue active
type ViewType = 'global' | 'creator' | 'content';

interface CampaignCustomizationSettings {
  primaryColor: string;
  secondaryColor: string;
  agencyName: string;
}

// Générer des contenus mock pour la démo
function generateMockContents(campaign: CampaignTracker): ContentItem[] {
  const contents: ContentItem[] = [];

  campaign.creators.forEach((creator) => {
    for (let i = 0; i < creator.deliveredPosts; i++) {
      contents.push({
        id: `content_${creator.influencerId}_${i}`,
        creatorName: creator.influencerName,
        creatorUsername: creator.influencerUsername,
        creatorAvatar: creator.influencerAvatar || '',
        contentType: i % 3 === 0 ? 'reel' : i % 3 === 1 ? 'post' : 'story',
        thumbnail: `https://picsum.photos/400/400?random=${creator.influencerId}${i}`,
        publishedAt: new Date(
          Date.now() - i * 24 * 60 * 60 * 1000
        ).toISOString(),
        likes: Math.floor(Math.random() * 5000) + 500,
        comments: Math.floor(Math.random() * 200) + 10,
        views: Math.floor(Math.random() * 50000) + 5000,
        url: `https://www.instagram.com/p/example${i}`,
      });
    }
  });

  return contents;
}

// Simuler la récupération des données de campagne partagée
function getSharedCampaign(
  shareId: string
): { campaign: CampaignTracker; shareData: SharedCampaign } | null {
  if (!shareId || shareId.length < 8) {
    return null;
  }

  return {
    campaign: {
      id: 'camp_demo',
      name: 'Campagne de test',
      description:
        'Une campagne de démonstration pour montrer les nouvelles fonctionnalités',
      trackingConfig: {
        links: [
          {
            url: 'https://example.com/product',
            label: 'Page produit principale',
            budget: 2500,
          },
          {
            url: 'https://example.com/promo',
            label: 'Page de promotion',
          },
        ],
        mentions: ['@spread', '@agence'],
        keywords: ['nouveau produit', 'innovation'],
        platforms: ['instagram', 'youtube', 'tiktok'],
        autoImport: true,
        flagMissingDisclosure: true,
        eventMode: false,
      },
      startDate: '2025-11-21T00:00:00Z',
      endDate: '2025-12-21T23:59:59Z',
      creators: [
        {
          influencerId: 'inf_1',
          influencerName: 'Louis Dhanis',
          influencerUsername: 'louis_dhanis',
          influencerAvatar: '',
          platform: 'instagram',
          expectedPosts: 3,
          deliveredPosts: 1,
          costPerCreator: 1500,
          status: 'active',
          contractedAt: '2025-11-15T10:00:00Z',
          // Résultats/ROI
          clicks: 245,
          salesCount: 8,
          salesRevenue: 1920,
        },
        {
          influencerId: 'inf_2',
          influencerName: 'Sarah Lifestyle',
          influencerUsername: 'sarah_lifestyle',
          influencerAvatar: '',
          platform: 'instagram',
          expectedPosts: 4,
          deliveredPosts: 3,
          costPerCreator: 2000,
          status: 'active',
          contractedAt: '2025-11-15T10:00:00Z',
          // Résultats/ROI
          clicks: 512,
          salesCount: 15,
          salesRevenue: 3750,
        },
        {
          influencerId: 'inf_3',
          influencerName: 'Marc Fitness',
          influencerUsername: 'marc_fitness',
          influencerAvatar: '',
          platform: 'instagram',
          expectedPosts: 3,
          deliveredPosts: 2,
          costPerCreator: 1800,
          status: 'active',
          contractedAt: '2025-11-15T10:00:00Z',
          // Pas de résultats renseignés pour ce créateur
        },
        {
          influencerId: 'inf_4',
          influencerName: 'Julie Travel',
          influencerUsername: 'julie_travel',
          influencerAvatar: '',
          platform: 'instagram',
          expectedPosts: 3,
          deliveredPosts: 2,
          costPerCreator: 1700,
          status: 'completed',
          contractedAt: '2025-11-15T10:00:00Z',
          // Résultats/ROI
          clicks: 189,
          salesCount: 5,
          salesRevenue: 1250,
        },
      ],
      analytics: {
        content: {
          totalPosts: 3,
          totalStories: 0,
          totalReels: 5,
          totalVideos: 0,
          creatorsPosted: 4,
          totalCreators: 4,
        },
        engagement: {
          totalEngagements: 7900,
          averageER: 10.15,
          totalLikes: 7800,
          totalComments: 87,
          totalShares: 0,
          totalSaves: 13,
        },
        reach: {
          totalImpressions: 79000,
          totalReach: 67000,
          averageVideoER: 0,
          totalViews: 0,
        },
        performance: {
          totalLinks: 2,
          totalClicks: 145,
          ctr: 0.18,
          totalConversions: 12,
          conversionRate: 8.3,
        },
        financials: {
          totalCreatorCost: 0,
          totalEMV: 418,
          averageCPM: 8.0,
          averageCPC: 0,
          roas: 0,
          costPerEngagement: 0,
        },
        byPlatform: {
          instagram: {
            posts: 8,
            engagements: 7900,
            impressions: 79000,
            cost: 0,
            emv: 418,
          },
        },
        topCreators: [],
        timeline: [],
      },
      status: 'active',
      createdBy: 'user_demo',
      createdAt: '2025-11-15T09:00:00Z',
      updatedAt: '2025-11-21T16:30:00Z',
      totalBudget: 10000,
      spentBudget: 7000,
    },
    shareData: {
      id: shareId,
      campaignId: 'camp_demo',
      shareType: 'public',
      createdAt: '2025-11-21T16:30:00Z',
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
  const [activeView, setActiveView] = useState<ViewType>('global');
  const [selectedCreator, setSelectedCreator] = useState<
    CampaignTracker['creators'][0] | null
  >(null);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(
    null
  );
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [customization, setCustomization] =
    useState<CampaignCustomizationSettings>({
      primaryColor: '#667eea',
      secondaryColor: '#764ba2',
      agencyName: "Nom de l'Agence",
    });

  useEffect(() => {
    // Charger les paramètres de personnalisation depuis localStorage
    const saved = localStorage.getItem('campaignReportSettings');
    if (saved) {
      try {
        setCustomization(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading customization settings:', e);
      }
    }
  }, []);

  useEffect(() => {
    const loadSharedCampaign = () => {
      try {
        const data = getSharedCampaign(shareId);
        if (!data) {
          notFound();
          return;
        }
        setCampaignData(data);
        setContents(generateMockContents(data.campaign));
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

  const handleCustomizationApply = (
    settings: CampaignCustomizationSettings
  ) => {
    setCustomization(settings);
    localStorage.setItem('campaignReportSettings', JSON.stringify(settings));
  };

  const handleCreatorClick = (creator: CampaignTracker['creators'][0]) => {
    setSelectedCreator(creator);
    setActiveView('creator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContentClick = (content: ContentItem) => {
    setSelectedContent(content);
    setActiveView('content');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToGlobal = () => {
    setActiveView('global');
    setSelectedCreator(null);
    setSelectedContent(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromContent = () => {
    if (selectedCreator) {
      setActiveView('creator');
    } else {
      setActiveView('global');
    }
    setSelectedContent(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportPDF = () => {
    // Masquer temporairement les boutons flottants et éléments non imprimables
    const floatingElements = document.querySelectorAll('.no-print');
    floatingElements.forEach((el) => {
      (el as HTMLElement).style.display = 'none';
    });

    // Déclencher l'impression (qui permet de sauvegarder en PDF)
    window.print();

    // Restaurer les éléments après un délai
    setTimeout(() => {
      floatingElements.forEach((el) => {
        (el as HTMLElement).style.display = '';
      });
    }, 1000);
  };

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

  // Configuration de visibilité des métriques (avec valeurs par défaut si non définie)
  const visibility: MetricsVisibilityConfig =
    shareData.metricsVisibility || DEFAULT_METRICS_VISIBILITY;

  // Filtrer les contenus par créateur si en vue créateur
  const filteredContents = selectedCreator
    ? contents.filter(
        (c) => c.creatorUsername === selectedCreator.influencerUsername
      )
    : contents;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header avec branding agence */}
      <div className="bg-white shadow-sm border-b border-gray-200 animate-fadeInDown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Logo de l'agence centré et plus grand */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${customization.primaryColor} 0%, ${customization.secondaryColor} 100%)`,
              }}
            >
              <ShareIcon className="w-11 h-11 text-white" />
            </div>

            {/* Nom de l'agence */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {customization.agencyName}
              </h1>
            </div>

            {/* Boutons et stats en bas */}
            <div className="flex items-center space-x-4 pt-2">
              <Button
                onClick={handleExportPDF}
                variant="outline"
                className="flex items-center space-x-2 no-print"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                <span>Exporter en PDF</span>
              </Button>
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  {shareData.viewCount} vues • Partagé le{' '}
                  {new Date(shareData.createdAt).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'global' && (
          <div className="space-y-8">
            {/* En-tête de campagne */}
            <div
              className="rounded-2xl p-8 shadow-lg border border-gray-200/50 text-white animate-fadeInUp"
              style={{
                background: `linear-gradient(135deg, ${customization.primaryColor} 0%, ${customization.secondaryColor} 100%)`,
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <PlayCircleIconSolid className="w-6 h-6" />
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                      Active
                    </span>
                  </div>

                  <h2 className="text-4xl font-bold mb-3">{campaign.name}</h2>

                  {campaign.description && (
                    <p className="text-xl text-white/90 mb-6">
                      {campaign.description}
                    </p>
                  )}

                  <div className="flex items-center space-x-8 text-white/95">
                    <div className="flex items-center space-x-2">
                      <CalendarDaysIcon className="w-5 h-5" />
                      <span>
                        Créée le{' '}
                        {new Date(campaign.startDate).toLocaleDateString(
                          'fr-FR'
                        )}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <UserGroupIcon className="w-5 h-5" />
                      <span className="font-semibold">
                        {campaign.creators.length}
                      </span>{' '}
                      créateurs
                    </div>
                    <div className="flex items-center space-x-2">
                      <PhotoIcon className="w-5 h-5" />
                      <span className="font-semibold">
                        {contents.length}
                      </span>{' '}
                      contenus
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Créateurs - Cartes cliquables */}
            {visibility.sections.creators && (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm animate-fadeInUp">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <UserGroupIcon className="w-5 h-5" />
                  <span>Créateurs</span>
                </h2>

                <div className="space-y-4">
                  {campaign.creators.map((creator) => {
                    const creatorContents = contents.filter(
                      (c) => c.creatorUsername === creator.influencerUsername
                    );
                    const totalLikes = creatorContents.reduce(
                      (sum, c) => sum + c.likes,
                      0
                    );
                    const totalComments = creatorContents.reduce(
                      (sum, c) => sum + c.comments,
                      0
                    );
                    const er =
                      creatorContents.length > 0
                        ? ((totalLikes + totalComments) /
                            creatorContents.length /
                            1000) *
                          100
                        : 0;

                    // Calcul du ROI si données disponibles
                    const creatorRoi =
                      creator.salesRevenue && creator.costPerCreator > 0
                        ? ((creator.salesRevenue - creator.costPerCreator) /
                            creator.costPerCreator) *
                          100
                        : null;

                    return (
                      <div
                        key={creator.influencerId}
                        onClick={() => handleCreatorClick(creator)}
                        className="bg-white border-2 border-gray-200 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:border-purple-500 hover:translate-x-2 hover:shadow-lg group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <div
                              className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-md"
                              style={{
                                background: `linear-gradient(135deg, ${customization.primaryColor} 0%, ${customization.secondaryColor} 100%)`,
                              }}
                            >
                              {creator.influencerName.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <div className="text-lg font-bold text-gray-900">
                                @{creator.influencerUsername}
                              </div>
                              <div className="text-sm text-gray-600">
                                {creatorContents.length} contenu
                                {creatorContents.length > 1 ? 's' : ''} •{' '}
                                {formatNumber(totalLikes)} likes •{' '}
                                {er.toFixed(2)}% ER
                              </div>
                              {/* Affichage des résultats si disponibles */}
                              {(creator.clicks ||
                                creator.salesCount ||
                                creator.salesRevenue) && (
                                <div className="flex items-center space-x-3 mt-2 text-xs">
                                  {creator.clicks !== undefined && (
                                    <span className="flex items-center text-blue-600">
                                      <CursorArrowRaysIcon className="w-3 h-3 mr-1" />
                                      {formatNumber(creator.clicks)} clics
                                    </span>
                                  )}
                                  {creator.salesCount !== undefined && (
                                    <span className="flex items-center text-green-600">
                                      <ShoppingCartIcon className="w-3 h-3 mr-1" />
                                      {creator.salesCount} ventes
                                    </span>
                                  )}
                                  {creator.salesRevenue !== undefined && (
                                    <span className="flex items-center text-green-700 font-semibold">
                                      <BanknotesIcon className="w-3 h-3 mr-1" />
                                      {formatCurrency(creator.salesRevenue)}
                                    </span>
                                  )}
                                  {creatorRoi !== null && (
                                    <span
                                      className={`font-semibold ${creatorRoi > 0 ? 'text-green-600' : 'text-red-600'}`}
                                    >
                                      ROI: {creatorRoi.toFixed(0)}%
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <svg
                            className="w-6 h-6 text-gray-300 transition-all duration-300 group-hover:text-purple-500 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Section Résultats & ROI Global */}
            {(() => {
              // Calculer les totaux globaux
              const totalClicks = campaign.creators.reduce(
                (sum, c) => sum + (c.clicks || 0),
                0
              );
              const totalSales = campaign.creators.reduce(
                (sum, c) => sum + (c.salesCount || 0),
                0
              );
              const totalRevenue = campaign.creators.reduce(
                (sum, c) => sum + (c.salesRevenue || 0),
                0
              );
              const totalCreatorCost = campaign.creators.reduce(
                (sum, c) => sum + c.costPerCreator,
                0
              );

              // Calculer le ROI global
              const globalRoi =
                totalRevenue > 0 && totalCreatorCost > 0
                  ? ((totalRevenue - totalCreatorCost) / totalCreatorCost) * 100
                  : null;

              // Calculer le taux de conversion global
              const globalConversionRate =
                totalClicks > 0 && totalSales > 0
                  ? (totalSales / totalClicks) * 100
                  : null;

              // Afficher la section seulement si des données existent
              const hasResults =
                totalClicks > 0 || totalSales > 0 || totalRevenue > 0;

              if (!hasResults) return null;

              return (
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm animate-fadeInUp">
                  <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
                    <ChartBarIcon className="w-5 h-5" />
                    <span>Résultats &amp; ROI</span>
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {totalClicks > 0 && (
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <CursorArrowRaysIcon className="w-5 h-5 text-blue-500 mr-2" />
                          <span className="text-2xl font-bold text-gray-900">
                            {formatNumber(totalClicks)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Total clics</p>
                      </div>
                    )}

                    {totalSales > 0 && (
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <ShoppingCartIcon className="w-5 h-5 text-green-500 mr-2" />
                          <span className="text-2xl font-bold text-gray-900">
                            {totalSales}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Total ventes</p>
                      </div>
                    )}

                    {totalRevenue > 0 && (
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <BanknotesIcon className="w-5 h-5 text-green-500 mr-2" />
                          <span className="text-2xl font-bold text-green-600">
                            {formatCurrency(totalRevenue)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Revenus générés</p>
                      </div>
                    )}

                    {globalConversionRate !== null && (
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <TrophyIcon className="w-5 h-5 text-purple-500 mr-2" />
                          <span className="text-2xl font-bold text-purple-600">
                            {globalConversionRate.toFixed(1)}%
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Taux de conversion
                        </p>
                      </div>
                    )}

                    {globalRoi !== null && (
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <CursorArrowRaysIcon className="w-5 h-5 text-orange-500 mr-2" />
                          <span
                            className={`text-2xl font-bold ${globalRoi > 0 ? 'text-green-600' : 'text-red-600'}`}
                          >
                            {globalRoi.toFixed(0)}%
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">ROI Global</p>
                      </div>
                    )}
                  </div>

                  {/* Barre de progression ROI */}
                  {globalRoi !== null && (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Performance ROI
                        </span>
                        <span
                          className={`text-sm font-bold ${globalRoi > 0 ? 'text-green-600' : 'text-red-600'}`}
                        >
                          {globalRoi > 0 ? '+' : ''}
                          {globalRoi.toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-500 ${
                            globalRoi > 100
                              ? 'bg-green-500'
                              : globalRoi > 0
                                ? 'bg-green-400'
                                : 'bg-red-400'
                          }`}
                          style={{
                            width: `${Math.min(Math.abs(globalRoi), 200) / 2}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>
                          Investissement: {formatCurrency(totalCreatorCost)}
                        </span>
                        <span>Revenus: {formatCurrency(totalRevenue)}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Section Content */}
            {visibility.sections.content && (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm animate-fadeInUp">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Content
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {visibility.metrics.creatorsPosted && (
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <UsersIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <div>
                          <span className="text-2xl font-bold text-gray-900">
                            {campaign.analytics.content.creatorsPosted}
                          </span>
                          <span className="text-gray-500 ml-1">
                            / {campaign.analytics.content.totalCreators}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">Creators posted</p>
                    </div>
                  )}

                  {visibility.metrics.totalPosts && (
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <PhotoIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-2xl font-bold text-gray-900">
                          {campaign.analytics.content.totalPosts}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Total posts</p>
                    </div>
                  )}

                  {visibility.metrics.totalReels && (
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <VideoCameraIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-2xl font-bold text-gray-900">
                          {campaign.analytics.content.totalReels}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Total Reels</p>
                    </div>
                  )}

                  {visibility.metrics.totalStories && (
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <FireIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-2xl font-bold text-gray-900">
                          {campaign.analytics.content.totalStories}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Total Stories</p>
                    </div>
                  )}

                  {visibility.metrics.totalContent && (
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <HeartIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-2xl font-bold text-gray-900">
                          {contents.length}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Total content</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Section Awareness & engagement */}
            {visibility.sections.engagement && (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm animate-fadeInUp">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Notoriété &amp; engagement
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
                  {visibility.metrics.totalEngagements && (
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
                  )}

                  {visibility.metrics.averageER && (
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <TrophyIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-2xl font-bold text-gray-900">
                          {campaign.analytics.engagement.averageER}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">ER moyen %</p>
                    </div>
                  )}

                  {visibility.metrics.totalImpressions && (
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <EyeIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-2xl font-bold text-gray-900">
                          {formatNumber(
                            campaign.analytics.reach.totalImpressions
                          )}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Impressions estimées
                      </p>
                    </div>
                  )}

                  {visibility.metrics.totalReach && (
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <UsersIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-2xl font-bold text-gray-900">
                          {formatNumber(campaign.analytics.reach.totalReach)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Portée estimée</p>
                    </div>
                  )}

                  {visibility.metrics.totalLikes && (
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <HeartIcon className="w-5 h-5 text-red-400 mr-2" />
                        <span className="text-2xl font-bold text-gray-900">
                          {formatNumber(
                            campaign.analytics.engagement.totalLikes
                          )}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Total likes</p>
                    </div>
                  )}

                  {visibility.metrics.totalComments && (
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <ChatBubbleLeftIcon className="w-5 h-5 text-blue-400 mr-2" />
                        <span className="text-2xl font-bold text-gray-900">
                          {formatNumber(
                            campaign.analytics.engagement.totalComments
                          )}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Total commentaires
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {visibility.metrics.totalViews && (
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <EyeIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-2xl font-bold text-gray-900">
                          {formatNumber(campaign.analytics.reach.totalViews)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Vues</p>
                    </div>
                  )}

                  {visibility.metrics.averageVideoER && (
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <VideoCameraIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-2xl font-bold text-gray-900">
                          -
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">ER vidéo moyen</p>
                    </div>
                  )}

                  {visibility.metrics.totalEMV && (
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <BanknotesIcon className="w-5 h-5 text-green-400 mr-2" />
                        <span className="text-2xl font-bold text-gray-900">
                          {formatCurrency(
                            campaign.analytics.financials.totalEMV
                          )}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">EMV</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Section Performance */}
            {visibility.sections.performance && (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm animate-fadeInUp">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Performance
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {visibility.metrics.totalCreatorCost && (
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <CurrencyEuroIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-2xl font-bold text-gray-900">
                          {formatCurrency(
                            campaign.analytics.financials.totalCreatorCost
                          )}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Coût total créateurs
                      </p>
                    </div>
                  )}

                  {visibility.metrics.averageCPM && (
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <TrophyIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-2xl font-bold text-gray-900">
                          {formatCurrency(
                            campaign.analytics.financials.averageCPM
                          )}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">CPM</p>
                    </div>
                  )}

                  {visibility.metrics.roas && (
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <BanknotesIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-2xl font-bold text-gray-900">
                          -
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">ROAS</p>
                    </div>
                  )}

                  {visibility.metrics.roi && (
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <CursorArrowRaysIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-2xl font-bold text-gray-900">
                          -
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">ROI</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contenus Publiés */}
            {visibility.sections.publishedContents && (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm animate-fadeInUp">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <PhotoIcon className="w-5 h-5" />
                  <span>Contenus Publiés</span>
                </h2>
                <ContentGrid
                  contents={contents}
                  onContentClick={handleContentClick}
                />
              </div>
            )}
          </div>
        )}

        {/* Vue Détail Créateur */}
        {activeView === 'creator' && selectedCreator && (
          <CreatorDetailView
            creator={selectedCreator}
            contents={filteredContents}
            onBack={handleBackToGlobal}
            onContentClick={handleContentClick}
            primaryColor={customization.primaryColor}
            secondaryColor={customization.secondaryColor}
          />
        )}

        {/* Vue Détail Contenu */}
        {activeView === 'content' && selectedContent && (
          <ContentDetailView
            content={selectedContent}
            onBack={handleBackFromContent}
            primaryColor={customization.primaryColor}
            secondaryColor={customization.secondaryColor}
          />
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${customization.primaryColor} 0%, ${customization.secondaryColor} 100%)`,
              }}
            >
              <span className="text-sm font-bold">S</span>
            </div>
            <span className="text-gray-400">Powered by Spread</span>
          </div>
          <p className="text-gray-400 text-center text-sm">
            Rapport de campagne généré le{' '}
            {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>

      {/* Bouton de paramétrage flottant */}
      <button
        onClick={() => setShowCustomizationModal(true)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 z-50 no-print"
        style={{
          background: `linear-gradient(135deg, ${customization.primaryColor} 0%, ${customization.secondaryColor} 100%)`,
        }}
      >
        <Cog6ToothIcon className="w-6 h-6 text-white" />
      </button>

      {/* Modal de personnalisation */}
      <CampaignCustomizationModal
        isOpen={showCustomizationModal}
        onClose={() => setShowCustomizationModal(false)}
        onApply={handleCustomizationApply}
        initialSettings={customization}
      />
    </div>
  );
}
