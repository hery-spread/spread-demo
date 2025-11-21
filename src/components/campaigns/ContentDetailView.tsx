'use client';

import Image from 'next/image';
import {
  ArrowLeftIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  EyeIcon,
  TrophyIcon,
  UsersIcon,
  CurrencyEuroIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { ContentItem } from './ContentGrid';

interface ContentDetailViewProps {
  content: ContentItem;
  onBack: () => void;
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

export default function ContentDetailView({
  content,
  onBack,
  primaryColor = '#667eea',
  secondaryColor = '#764ba2',
}: ContentDetailViewProps) {
  // Calculer des métriques du contenu
  const estimatedImpressions = content.views || content.likes * 10;
  const estimatedReach = Math.floor(estimatedImpressions * 0.85);
  const engagementRate =
    ((content.likes + content.comments) / estimatedImpressions) * 100;
  const estimatedEMV = (content.likes + content.comments) * 0.05;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Bouton Retour */}
      <button
        onClick={onBack}
        className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-purple-600 hover:border-purple-300 transition-all duration-200 group"
      >
        <ArrowLeftIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        <span className="font-medium">Retour</span>
      </button>

      {/* Aperçu du contenu */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 animate-fadeInUp">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-6">
          <div className="flex items-center space-x-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
              }}
            >
              {content.creatorName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">
                @{content.creatorUsername}
              </div>
              <div className="text-sm text-gray-500">
                Publié le{' '}
                {new Date(content.publishedAt).toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>
          <Button
            onClick={() => window.open(content.url, '_blank')}
            className="flex items-center space-x-2"
            style={{
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
            }}
          >
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            <span>Voir sur Instagram</span>
          </Button>
        </div>

        <div className="w-full max-w-md mx-auto relative aspect-square">
          <Image
            src={content.thumbnail}
            alt="Aperçu du contenu"
            fill
            className="object-cover rounded-xl shadow-lg"
          />
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
                {formatNumber(content.likes + content.comments)}
              </span>
            </div>
            <p className="text-sm text-gray-600">Total engagements</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrophyIcon className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {engagementRate.toFixed(2)}%
              </span>
            </div>
            <p className="text-sm text-gray-600">Engagement Rate</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <EyeIcon className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {formatNumber(estimatedImpressions)}
              </span>
            </div>
            <p className="text-sm text-gray-600">Impressions estimées</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <UsersIcon className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {formatNumber(estimatedReach)}
              </span>
            </div>
            <p className="text-sm text-gray-600">Portée estimée</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <HeartIcon className="w-5 h-5 text-red-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {formatNumber(content.likes)}
              </span>
            </div>
            <p className="text-sm text-gray-600">Likes</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <ChatBubbleLeftIcon className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {formatNumber(content.comments)}
              </span>
            </div>
            <p className="text-sm text-gray-600">Commentaires</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <EyeIcon className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {content.views ? formatNumber(content.views) : '-'}
              </span>
            </div>
            <p className="text-sm text-gray-600">Vues</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <CurrencyEuroIcon className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(estimatedEMV)}
              </span>
            </div>
            <p className="text-sm text-gray-600">EMV</p>
          </div>
        </div>
      </div>
    </div>
  );
}

