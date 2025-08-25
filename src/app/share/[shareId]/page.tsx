'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
  UserGroupIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';
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
  // UTM tracking pour analytics
  const _utmParams = {
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
    <div className="min-h-screen bg-white">
      {/* Contenu principal - Layout épuré */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* En-tête du rapport */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Rapport d'audience détaillé
          </h1>
          <p className="text-gray-600">
            Analyse complète des données d'audience et de performance
          </p>
        </div>

        {/* Profil de l'influenceur - Version enrichie */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-8">
            <div className="relative">
              <Image
                src={report.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  report.name
                )}&background=6366f1&color=fff`}
                alt={report.name}
                width={96}
                height={96}
                className="w-24 h-24 rounded-2xl object-cover shadow-lg"
              />
              {report.verified && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              )}
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {report.name}
              </h2>
              <p className="text-xl text-gray-600 mb-3">@{report.username}</p>
              <p className="text-gray-700 mb-4 max-w-2xl">{report.bio}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {report.platform.charAt(0).toUpperCase() + report.platform.slice(1)}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {report.country}
                </span>
                {report.verified && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Vérifié
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Statistiques principales - Design moderne */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center">
                  <UserGroupIcon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-purple-700 mb-1">
                {report.followers.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-purple-600">Followers</div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border border-red-200">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center">
                  <HeartIcon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-red-700 mb-1">
                {report.engagementRate}%
              </div>
              <div className="text-sm font-medium text-red-600">Engagement</div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                  <ChatBubbleLeftIcon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-700 mb-1">
                {report.stats.avgLikes.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-blue-600">Likes moyens</div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">#</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-green-700 mb-1">
                {report.stats.totalPosts}
              </div>
              <div className="text-sm font-medium text-green-600">Posts</div>
            </div>
          </div>
        </div>

        {/* Analyse d'audience complète */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            📊 Analyse détaillée de l'audience
          </h2>

          {/* Métriques clés d'audience */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 text-center">
              <div className="text-2xl font-bold text-blue-700">
                {Math.round(report.audience.gender.female)}%
              </div>
              <div className="text-sm text-blue-600 font-medium">👩 Femmes</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200 text-center">
              <div className="text-2xl font-bold text-purple-700">
                {Math.round(report.audience.gender.male)}%
              </div>
              <div className="text-sm text-purple-600 font-medium">👨 Hommes</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200 text-center">
              <div className="text-2xl font-bold text-green-700">
                {Math.round((report.audience.credibility || 0.87) * 100)}%
              </div>
              <div className="text-sm text-green-600 font-medium">✅ Authenticité</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200 text-center">
              <div className="text-2xl font-bold text-orange-700">
                {Object.keys(report.audience.countries).length}
              </div>
              <div className="text-sm text-orange-600 font-medium">🌍 Pays</div>
            </div>
          </div>

          {/* Analyse démographique */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Répartition par âge */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                🎂 Répartition par âge
              </h3>
              <div className="space-y-3">
                {Object.entries(report.audience.age).map(([age, percentage]) => (
                  <div key={age} className="flex items-center">
                    <div className="w-20 text-sm text-gray-600 font-medium">
                      {age} ans
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 mx-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-sm font-bold text-right text-blue-600">
                      {percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Géolocalisation */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                🌍 Géolocalisation
              </h3>
              <div className="space-y-3">
                {Object.entries(report.audience.countries)
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .slice(0, 6)
                  .map(([country, percentage]) => (
                    <div key={country} className="flex items-center justify-between py-1">
                      <span className="text-sm text-gray-700 font-medium">
                        {country}
                      </span>
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                            style={{ width: `${Math.min(percentage as number, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-green-600 w-10 text-right">
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
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

        {/* Branding discret */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="text-sm font-medium text-gray-600">Powered by Spread</span>
            </div>
            <p className="text-xs text-gray-400">
              Rapport d'audience généré le {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
    </div>
  );
}
