'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import {
  ShareIcon,
  UserGroupIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { InfluencerDetails } from '@/types';

// Simuler la récupération des données de partage
function getSharedReport(shareId: string): InfluencerDetails | null {
  // Dans un vrai projet, ça ferait un appel API avec le shareId
  // Pour le mock, on simule la validation du shareId
  if (!shareId || shareId.length < 5) {
    return null;
  }

  // Pour le mock, on retourne des données statiques
  return {
    id: '1',
    name: 'Marie Lifestyle',
    username: 'marie_lifestyle',
    platform: 'instagram',
    avatar: '/avatars/marie.jpg',
    followers: 125000,
    engagement: 8500,
    engagementRate: 6.8,
    country: 'France',
    verified: true,
    email: 'marie@lifestyle.com',
    bio: 'Lifestyle & Fashion • Paris 🇫🇷',
    audienceUnlocked: true,
    stats: {
      avgLikes: 7500,
      avgComments: 850,
      avgViews: 45000,
      totalPosts: 1250,
    },
    audience: {
      gender: { male: 25, female: 75 },
      age: {
        '13-17': 8,
        '18-24': 35,
        '25-34': 28,
        '35-44': 20,
        '45-64': 9,
      },
      countries: {
        France: 65,
        Belgique: 12,
        Suisse: 8,
        Canada: 10,
        Autres: 5,
      },
      cities: {
        Paris: 35,
        Lyon: 15,
        Marseille: 12,
        Toulouse: 8,
        Autres: 30,
      },
      languages: {
        Français: 85,
        Anglais: 15,
      },
      ethnicities: {
        Européen: 75,
        Autres: 25,
      },
      interests: {
        topics: {
          Mode: 85,
          Beauté: 78,
          Lifestyle: 82,
          Voyage: 45,
          Food: 38,
        },
        brands: {
          Zara: 65,
          Sephora: 58,
          'H&M': 52,
          Uniqlo: 35,
          Nike: 28,
        },
      },
    },
  };
}

export default function SharePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [report, setReport] = useState<InfluencerDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const shareId = params.shareId as string;
  const utmParams = {
    utm_source: searchParams.get('utm_source'),
    utm_medium: searchParams.get('utm_medium'),
    utm_campaign: searchParams.get('utm_campaign'),
  };

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      // Simuler un délai d'API
      await new Promise((resolve) => setTimeout(resolve, 500));
      const reportData = getSharedReport(shareId);
      setReport(reportData);
      setLoading(false);
    };

    fetchReport();
  }, [shareId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du rapport...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec branding Spread */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <ShareIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Rapport partagé via Spread
                </h1>
                <p className="text-sm text-gray-600">
                  Analyse d&apos;audience détaillée
                </p>
              </div>
            </div>
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => {
                // Tracker le clic CTA header
                console.log('Header CTA clicked', utmParams);
                window.open(
                  '/search?utm_source=shared_report_header',
                  '_blank'
                );
              }}
            >
              Essayer Spread
            </Button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profil de l'influenceur */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={report.avatar}
              alt={report.name}
              className="w-20 h-20 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {report.name}
                </h2>
                {report.verified && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-lg text-gray-600 mb-2">@{report.username}</p>
              <p className="text-gray-700">{report.bio}</p>
            </div>
          </div>

          {/* Statistiques principales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <UserGroupIcon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {report.followers.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <HeartIcon className="w-5 h-5 text-red-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {report.engagementRate}%
              </div>
              <div className="text-sm text-gray-600">Engagement</div>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <ChatBubbleLeftIcon className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {report.stats.avgLikes.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Likes moyens</div>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {report.stats.totalPosts}
              </div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
          </div>
        </div>

        {/* Données d'audience */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Répartition par genre */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Répartition par genre
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Femmes</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-pink-500 h-2 rounded-full"
                      style={{ width: `${report.audience.gender.female}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">
                    {report.audience.gender.female}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Hommes</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${report.audience.gender.male}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">
                    {report.audience.gender.male}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Répartition par âge */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Répartition par âge
            </h3>
            <div className="space-y-2">
              {Object.entries(report.audience.age).map(
                ([ageGroup, percentage]) => (
                  <div
                    key={ageGroup}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-600">
                      {ageGroup} ans
                    </span>
                    <span className="text-sm font-medium">{percentage}%</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Géolocalisation */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Top pays
            </h3>
            <div className="space-y-2">
              {Object.entries(report.audience.countries).map(
                ([country, percentage]) => (
                  <div
                    key={country}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-600">{country}</span>
                    <span className="text-sm font-medium">{percentage}%</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Centres d'intérêt */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Centres d&apos;intérêt
            </h3>
            <div className="space-y-2">
              {Object.entries(report.audience.interests.topics).map(
                ([topic, percentage]) => (
                  <div
                    key={topic}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-600">{topic}</span>
                    <span className="text-sm font-medium">{percentage}%</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h3 className="text-2xl font-bold mb-2">
            Trouvez des influenceurs comme {report.name}
          </h3>
          <p className="text-purple-100 mb-6">
            Accédez à plus de 250 000 000 de profils d&apos;influenceurs avec
            des analyses détaillées
          </p>
          <Button
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3"
            onClick={() => {
              // Tracker le clic CTA
              console.log('CTA clicked', utmParams);
              window.open('/search?utm_source=shared_report', '_blank');
            }}
          >
            Essayer Spread gratuitement
          </Button>
          <p className="text-xs text-purple-200 mt-4">
            Rapport généré par Spread • La plateforme des influenceurs
          </p>
        </div>
      </div>
    </div>
  );
}
