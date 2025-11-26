'use client';

import {
  ArrowLeftIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  TrophyIcon,
  EyeIcon,
  UsersIcon,
  VideoCameraIcon,
  BanknotesIcon,
  CurrencyEuroIcon,
  CursorArrowRaysIcon,
  ShoppingCartIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { CampaignTracker } from '@/types';
import ContentGrid, { ContentItem } from './ContentGrid';

interface CreatorDetailViewProps {
  creator: CampaignTracker['creators'][0];
  contents: ContentItem[];
  onBack: () => void;
  onContentClick?: (content: ContentItem) => void;
  primaryColor?: string;
  secondaryColor?: string;
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

export default function CreatorDetailView({
  creator,
  contents,
  onBack,
  onContentClick,
  primaryColor = '#667eea',
  secondaryColor = '#764ba2',
}: CreatorDetailViewProps) {
  // Calculer les métriques du créateur
  const totalLikes = contents.reduce((sum, c) => sum + c.likes, 0);
  const totalComments = contents.reduce((sum, c) => sum + c.comments, 0);
  const totalViews = contents.reduce((sum, c) => sum + (c.views || 0), 0);
  const avgER =
    contents.length > 0
      ? ((totalLikes + totalComments) / contents.length / 1000) * 100
      : 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Bouton Retour */}
      <button
        onClick={onBack}
        className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-purple-600 hover:border-purple-300 transition-all duration-200 group"
      >
        <ArrowLeftIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        <span className="font-medium">Retour à la vue globale</span>
      </button>

      {/* En-tête créateur */}
      <div
        className="rounded-2xl p-8 text-white shadow-xl animate-fadeInUp"
        style={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        }}
      >
        <div className="flex items-center space-x-6 mb-4">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            {creator.influencerName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">
              @{creator.influencerUsername}
            </h2>
            <p className="text-white/90 text-lg">
              {contents.length} contenu{contents.length > 1 ? 's' : ''} publié
              {contents.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Notoriété & engagement */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm animate-fadeInUp">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Notoriété &amp; engagement
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <HeartIcon className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {formatNumber(totalLikes + totalComments)}
              </span>
            </div>
            <p className="text-sm text-gray-600">Total engagements</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrophyIcon className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {avgER.toFixed(2)}%
              </span>
            </div>
            <p className="text-sm text-gray-600">ER moyen %</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <EyeIcon className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {formatNumber(totalViews * 10)}
              </span>
            </div>
            <p className="text-sm text-gray-600">Impressions estimées</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <UsersIcon className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {formatNumber(Math.floor(totalViews * 8.5))}
              </span>
            </div>
            <p className="text-sm text-gray-600">Portée estimée</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <HeartIcon className="w-5 h-5 text-red-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {formatNumber(totalLikes)}
              </span>
            </div>
            <p className="text-sm text-gray-600">Total likes</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <ChatBubbleLeftIcon className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {formatNumber(totalComments)}
              </span>
            </div>
            <p className="text-sm text-gray-600">Total commentaires</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <EyeIcon className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {formatNumber(totalViews)}
              </span>
            </div>
            <p className="text-sm text-gray-600">Vues</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <VideoCameraIcon className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900">-</span>
            </div>
            <p className="text-sm text-gray-600">ER vidéo moyen</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <BanknotesIcon className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency((totalLikes + totalComments) * 0.05)}
              </span>
            </div>
            <p className="text-sm text-gray-600">EMV</p>
          </div>
        </div>
      </div>

      {/* Stats Performance */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm animate-fadeInUp">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Performance</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <CurrencyEuroIcon className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(creator.costPerCreator)}
              </span>
            </div>
            <p className="text-sm text-gray-600">Coût créateur</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrophyIcon className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(
                  (creator.costPerCreator / (totalViews * 10)) * 1000
                )}
              </span>
            </div>
            <p className="text-sm text-gray-600">CPM</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <BanknotesIcon className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {creator.salesRevenue && creator.costPerCreator > 0
                  ? (creator.salesRevenue / creator.costPerCreator).toFixed(2) +
                    'x'
                  : '-'}
              </span>
            </div>
            <p className="text-sm text-gray-600">ROAS</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <CursorArrowRaysIcon className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {creator.salesRevenue && creator.costPerCreator > 0
                  ? (
                      ((creator.salesRevenue - creator.costPerCreator) /
                        creator.costPerCreator) *
                      100
                    ).toFixed(0) + '%'
                  : '-'}
              </span>
            </div>
            <p className="text-sm text-gray-600">ROI</p>
          </div>
        </div>
      </div>

      {/* Section Résultats & Conversions */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm animate-fadeInUp">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <ChartBarIcon className="w-5 h-5" />
          <span>Résultats &amp; Conversions</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <CursorArrowRaysIcon className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {creator.clicks !== undefined
                  ? formatNumber(creator.clicks)
                  : '-'}
              </span>
            </div>
            <p className="text-sm text-gray-600">Clics</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <ShoppingCartIcon className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {creator.salesCount !== undefined ? creator.salesCount : '-'}
              </span>
            </div>
            <p className="text-sm text-gray-600">Ventes</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <BanknotesIcon className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-2xl font-bold text-green-600">
                {creator.salesRevenue !== undefined
                  ? formatCurrency(creator.salesRevenue)
                  : '-'}
              </span>
            </div>
            <p className="text-sm text-gray-600">Revenus générés</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrophyIcon className="w-5 h-5 text-purple-500 mr-2" />
              <span className="text-2xl font-bold text-purple-600">
                {creator.clicks && creator.salesCount
                  ? ((creator.salesCount / creator.clicks) * 100).toFixed(1) +
                    '%'
                  : '-'}
              </span>
            </div>
            <p className="text-sm text-gray-600">Taux de conversion</p>
          </div>
        </div>

        {/* Message si aucune donnée */}
        {!creator.clicks && !creator.salesCount && !creator.salesRevenue && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl text-center">
            <p className="text-sm text-gray-500">
              Aucune donnée de résultat renseignée pour ce créateur.
              <br />
              <span className="text-xs">
                Ces champs sont optionnels mais permettent de calculer le ROI.
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Contenus du créateur */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-sm animate-fadeInUp">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Contenus publiés
        </h2>
        <ContentGrid contents={contents} onContentClick={onContentClick} />
      </div>
    </div>
  );
}
