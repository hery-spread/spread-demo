'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
  ShareIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XMarkIcon,
  CalendarDaysIcon,
  TagIcon,
  Cog6ToothIcon,
  ArrowTopRightOnSquareIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import {
  CheckCircleIcon as CheckCircleIconSolid,
  XCircleIcon as XCircleIconSolid,
  ChatBubbleLeftIcon as ChatBubbleLeftIconSolid,
} from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/Button';
import { InfluencerList, SharedList } from '@/types';
import CampaignCustomizationModal from '@/components/campaigns/CampaignCustomizationModal';

interface CampaignCustomizationSettings {
  primaryColor: string;
  secondaryColor: string;
  agencyName: string;
}

interface VoteState {
  [influencerId: string]: 'go' | 'no-go' | 'discuss' | null;
}

interface CommentState {
  [influencerId: string]: string;
}

interface InfluencerWithProfile {
  id: string;
  contactName?: string;
  contactEmail?: string;
  followers?: number;
  engagementRate?: number;
  platform?: string;
  profileUrl?: string;
}

// Simuler la récupération des données de liste partagée
function getSharedList(
  shareId: string
): {
  list: InfluencerList & { influencers: InfluencerWithProfile[] };
  shareData: SharedList;
} | null {
  if (!shareId || shareId.length < 8) {
    return null;
  }

  const baseInfluencers = [
    {
      id: 'inf_1',
      contactName: 'Marie Dupont',
      contactEmail: 'marie@example.com',
      followers: 125000,
      engagementRate: 4.2,
      platform: 'instagram',
    },
    {
      id: 'inf_2',
      contactName: 'Sophie Martin',
      contactEmail: 'sophie@example.com',
      followers: 89000,
      engagementRate: 5.8,
      platform: 'instagram',
    },
    {
      id: 'inf_3',
      contactName: 'Laura Beauté',
      contactEmail: 'laura@example.com',
      followers: 245000,
      engagementRate: 3.9,
      platform: 'instagram',
    },
    {
      id: 'inf_4',
      contactName: 'Emma Lifestyle',
      contactEmail: 'emma@example.com',
      followers: 67000,
      engagementRate: 6.2,
      platform: 'youtube',
    },
  ];

  return {
    list: {
      id: 'list_demo',
      name: 'Casting Campagne Beauté 2025',
      description:
        'Sélection de créateurs beauté pour la campagne printemps/été',
      category: 'Beauté & Lifestyle',
      createdAt: '2025-11-15T10:00:00Z',
      influencers: baseInfluencers.map((inf) => ({
        ...inf,
        // Générer des URLs de profil mockées basées sur le nom
        profileUrl:
          inf.platform === 'instagram'
            ? `https://www.instagram.com/${inf.contactName?.toLowerCase().replace(/ /g, '_')}`
            : inf.platform === 'youtube'
              ? `https://www.youtube.com/@${inf.contactName?.toLowerCase().replace(/ /g, '')}`
              : `https://www.tiktok.com/@${inf.contactName?.toLowerCase().replace(/ /g, '_')}`,
      })),
    },
    shareData: {
      id: shareId,
      listId: 'list_demo',
      shareType: 'public',
      createdAt: '2025-11-21T16:30:00Z',
      viewCount: Math.floor(Math.random() * 50) + 10,
      allowVotes: true,
      allowComments: false,
      trackingEnabled: true,
    },
  };
}

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export default function SharedListPage() {
  const params = useParams();
  const shareId = params.shareId as string;

  const [listData, setListData] = useState<{
    list: InfluencerList & { influencers: InfluencerWithProfile[] };
    shareData: SharedList;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState<VoteState>({});
  const [comments, setComments] = useState<CommentState>({});
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [customization, setCustomization] =
    useState<CampaignCustomizationSettings>({
      primaryColor: '#667eea',
      secondaryColor: '#764ba2',
      agencyName: 'Votre Agence',
    });

  // Charger les paramètres de personnalisation
  useEffect(() => {
    const saved = localStorage.getItem('listShareSettings');
    if (saved) {
      try {
        setCustomization(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading customization settings:', e);
      }
    }
  }, []);

  // Charger les données de la liste
  useEffect(() => {
    const loadSharedList = () => {
      try {
        const data = getSharedList(shareId);
        if (!data) {
          notFound();
          return;
        }
        setListData(data);

        // Charger les votes depuis localStorage
        const savedVotes = localStorage.getItem(`votes_${shareId}`);
        if (savedVotes) {
          setVotes(JSON.parse(savedVotes));
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la liste partagée:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    loadSharedList();
  }, [shareId]);

  const handleCustomizationApply = (
    settings: CampaignCustomizationSettings
  ) => {
    setCustomization(settings);
    localStorage.setItem('listShareSettings', JSON.stringify(settings));
  };

  const handleVote = (influencerId: string, voteType: 'go' | 'no-go' | 'discuss') => {
    if (!listData?.shareData.allowVotes) return;

    setVotes((prev) => {
      const currentVote = prev[influencerId];
      const newVote = currentVote === voteType ? null : voteType;

      const updatedVotes = {
        ...prev,
        [influencerId]: newVote,
      };

      // Sauvegarder dans localStorage
      localStorage.setItem(`votes_${shareId}`, JSON.stringify(updatedVotes));

      return updatedVotes;
    });
  };

  const handleCommentChange = (influencerId: string, comment: string) => {
    setComments((prev) => {
      const updatedComments = {
        ...prev,
        [influencerId]: comment,
      };

      // Sauvegarder dans localStorage
      localStorage.setItem(`comments_${shareId}`, JSON.stringify(updatedComments));

      return updatedComments;
    });
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!listData) {
    return notFound();
  }

  const { list, shareData } = listData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header avec branding agence */}
      <div className="bg-white shadow-sm border-b border-gray-200 animate-fadeInDown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${customization.primaryColor} 0%, ${customization.secondaryColor} 100%)`,
                }}
              >
                <ShareIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {customization.agencyName}
                </h1>
                <p className="text-sm text-gray-500">
                  Liste de Casting Partagée
                </p>
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
          {/* En-tête de la liste */}
          <div
            className="rounded-2xl p-8 shadow-lg border border-gray-200/50 text-white animate-fadeInUp"
            style={{
              background: `linear-gradient(135deg, ${customization.primaryColor} 0%, ${customization.secondaryColor} 100%)`,
            }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-4xl font-bold mb-3">{list.name}</h2>

                {list.description && (
                  <p className="text-xl text-white/90 mb-6">
                    {list.description}
                  </p>
                )}

                <div className="flex items-center space-x-8 text-white/95">
                  <div className="flex items-center space-x-2">
                    <CalendarDaysIcon className="w-5 h-5" />
                    <span>
                      Créée le{' '}
                      {new Date(list.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <UserGroupIcon className="w-5 h-5" />
                    <span className="font-semibold">
                      {list.influencers.length}
                    </span>{' '}
                    créateurs
                  </div>
                  {list.category && (
                    <div className="flex items-center space-x-2">
                      <TagIcon className="w-5 h-5" />
                      <span>{list.category}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Instructions de vote */}
          {shareData.allowVotes && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 animate-fadeInUp">
              <div className="flex items-start space-x-3">
                <CheckCircleIcon className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">
                    Donnez votre avis
                  </h3>
                  <p className="text-sm text-blue-800">
                    Pour chaque créateur, indiquez votre avis : <strong>Go</strong> (validé), <strong>No Go</strong> (refusé) ou <strong>À discuter</strong>. Vous pouvez aussi laisser un commentaire.
                  </p>
                </div>
              </div>
            </div>
          )}


          {/* Liste des créateurs */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm animate-fadeInUp">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <UserGroupIcon className="w-5 h-5" />
              <span>Créateurs sélectionnés ({list.influencers.length})</span>
            </h2>

            <div className="space-y-4">
              {list.influencers.map((inf) => {
                const influencer = inf as InfluencerWithProfile;
                const userVote = votes[influencer.id];

                return (
                  <div
                    key={influencer.id}
                    className={`border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 ${
                      userVote === 'go'
                        ? 'border-green-300 bg-green-50'
                        : userVote === 'no-go'
                        ? 'border-red-300 bg-red-50'
                        : userVote === 'discuss'
                        ? 'border-orange-300 bg-orange-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-6">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                          {influencer.contactName ? (
                            <Image
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                influencer.contactName
                              )}&background=8b5cf6&color=fff&size=80`}
                              alt={influencer.contactName}
                              width={80}
                              height={80}
                              className="object-cover"
                            />
                          ) : (
                            <UserGroupIcon className="w-10 h-10 text-purple-400" />
                          )}
                        </div>
                        {/* Badge de vote actif */}
                        {userVote && (
                          <div
                            className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                              userVote === 'go' 
                                ? 'bg-green-500' 
                                : userVote === 'no-go'
                                ? 'bg-red-500'
                                : 'bg-orange-500'
                            }`}
                          >
                            {userVote === 'go' ? (
                              <CheckCircleIcon className="w-5 h-5 text-white" />
                            ) : userVote === 'no-go' ? (
                              <XMarkIcon className="w-5 h-5 text-white" />
                            ) : (
                              <ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-white" />
                            )}
                          </div>
                        )}
                      </div>

                      {/* Infos créateur */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-xl font-bold text-gray-900 hover:text-purple-600 cursor-pointer transition-colors"
                                onClick={() => window.open(`/profile/${influencer.id}`, '_blank')}>
                              {influencer.contactName || 'Nom inconnu'}
                            </h3>
                            {influencer.profileUrl && (
                              <Button
                                onClick={() =>
                                  window.open(influencer.profileUrl, '_blank')
                                }
                                variant="outline"
                                size="sm"
                                className="flex items-center space-x-1"
                              >
                                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                                <span className="hidden sm:inline">
                                  Réseau social
                                </span>
                              </Button>
                            )}
                          </div>
                        </div>

                        {influencer.platform && (
                          <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold mb-3 capitalize">
                            {influencer.platform}
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          {influencer.followers && (
                            <div>
                              <p className="text-sm text-gray-600">Abonnés</p>
                              <p className="text-lg font-bold text-gray-900">
                                {formatNumber(influencer.followers)}
                              </p>
                            </div>
                          )}
                          {influencer.engagementRate && (
                            <div>
                              <p className="text-sm text-gray-600">
                                Taux d&apos;engagement
                              </p>
                              <p className="text-lg font-bold text-gray-900">
                                {influencer.engagementRate}%
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Boutons de vote */}
                        {shareData.allowVotes && (
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-3">
                              <Button
                                onClick={() => handleVote(influencer.id, 'go')}
                                variant={userVote === 'go' ? 'default' : 'outline'}
                                className={`flex items-center justify-center space-x-2 ${
                                  userVote === 'go'
                                    ? 'bg-green-500 hover:bg-green-600 text-white border-green-500'
                                    : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                                }`}
                              >
                                {userVote === 'go' ? (
                                  <CheckCircleIconSolid className="w-5 h-5" />
                                ) : (
                                  <CheckCircleIcon className="w-5 h-5" />
                                )}
                                <span className="font-semibold">Go</span>
                              </Button>

                              <Button
                                onClick={() => handleVote(influencer.id, 'no-go')}
                                variant={userVote === 'no-go' ? 'default' : 'outline'}
                                className={`flex items-center justify-center space-x-2 ${
                                  userVote === 'no-go'
                                    ? 'bg-red-500 hover:bg-red-600 text-white border-red-500'
                                    : 'border-gray-300 hover:border-red-500 hover:bg-red-50'
                                }`}
                              >
                                {userVote === 'no-go' ? (
                                  <XCircleIconSolid className="w-5 h-5" />
                                ) : (
                                  <XMarkIcon className="w-5 h-5" />
                                )}
                                <span className="font-semibold">No Go</span>
                              </Button>

                              <Button
                                onClick={() => handleVote(influencer.id, 'discuss')}
                                variant={userVote === 'discuss' ? 'default' : 'outline'}
                                className={`flex items-center justify-center space-x-2 ${
                                  userVote === 'discuss'
                                    ? 'bg-orange-500 hover:bg-orange-600 text-white border-orange-500'
                                    : 'border-gray-300 hover:border-orange-500 hover:bg-orange-50'
                                }`}
                              >
                                {userVote === 'discuss' ? (
                                  <ChatBubbleLeftIconSolid className="w-5 h-5" />
                                ) : (
                                  <ChatBubbleLeftEllipsisIcon className="w-5 h-5" />
                                )}
                                <span className="font-semibold">À discuter</span>
                              </Button>
                            </div>

                            {/* Champ de commentaire */}
                            <div>
                              <textarea
                                value={comments[influencer.id] || ''}
                                onChange={(e) => handleCommentChange(influencer.id, e.target.value)}
                                placeholder="Laissez un commentaire (optionnel)..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
                                rows={2}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
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
            Liste de casting générée le {new Date().toLocaleDateString('fr-FR')}
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

