'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  EyeIcon,
  UserGroupIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';
import { InfluencerList, ListShareStats } from '@/types';
import { getUserListById } from '@/lib/mockData';

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

// Simuler des statistiques de partage
function generateMockShareStats(list: InfluencerList): ListShareStats {
  return {
    totalViews: Math.floor(Math.random() * 50) + 15,
    totalVotes: Math.floor(Math.random() * 30) + 10,
    goVotes: Math.floor(Math.random() * 15) + 5,
    noGoVotes: Math.floor(Math.random() * 8) + 1,
    discussVotes: Math.floor(Math.random() * 10) + 2,
    votesByInfluencer: list.influencers.map((inf) => ({
      influencerId: inf.id,
      go: Math.floor(Math.random() * 10) + 1,
      noGo: Math.floor(Math.random() * 5),
      discuss: Math.floor(Math.random() * 6) + 1,
      comments: [
        "Très bon profil, j'adore son contenu !",
        'Engagement rate impressionnant',
      ].slice(0, Math.random() > 0.5 ? 1 : 0),
    })),
    comments: [],
  };
}

export default function ShareResultsPage() {
  const params = useParams();
  const listId = params.id as string;

  const [list, setList] = useState<InfluencerList | null>(null);
  const [stats, setStats] = useState<ListShareStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const foundList = await getUserListById(listId);
        if (!foundList) {
          notFound();
          return;
        }
        setList(foundList);
        setStats(generateMockShareStats(foundList));
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [listId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!list || !stats) {
    return notFound();
  }

  // Mapper les créateurs avec leurs votes
  const creatorsWithVotes = list.influencers.map((inf) => {
    const votes = stats.votesByInfluencer.find(
      (v) => v.influencerId === inf.id
    );
    return {
      ...inf,
      goVotes: votes?.go || 0,
      noGoVotes: votes?.noGo || 0,
      discussVotes: votes?.discuss || 0,
      comments: votes?.comments || [],
      totalVotes: (votes?.go || 0) + (votes?.noGo || 0) + (votes?.discuss || 0),
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href={`/lists/${listId}`}
            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Retour à la liste</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Résultats des votes
          </h1>
          <p className="text-gray-600">{list.name}</p>
        </div>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-center mb-2">
            <EyeIcon className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-3xl font-bold text-gray-900">
              {stats.totalViews}
            </span>
          </div>
          <p className="text-sm text-gray-600 text-center">Vues totales</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-center mb-2">
            <ChartBarIcon className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-3xl font-bold text-gray-900">
              {stats.totalVotes}
            </span>
          </div>
          <p className="text-sm text-gray-600 text-center">Votes totaux</p>
        </div>

        <div className="bg-green-50 rounded-2xl p-6 border border-green-200 shadow-sm">
          <div className="flex items-center justify-center mb-2">
            <HandThumbUpIcon className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-3xl font-bold text-green-700">
              {stats.goVotes}
            </span>
          </div>
          <p className="text-sm text-green-600 text-center font-medium">Go</p>
        </div>

        <div className="bg-red-50 rounded-2xl p-6 border border-red-200 shadow-sm">
          <div className="flex items-center justify-center mb-2">
            <HandThumbDownIcon className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-3xl font-bold text-red-700">
              {stats.noGoVotes}
            </span>
          </div>
          <p className="text-sm text-red-600 text-center font-medium">No Go</p>
        </div>

        <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200 shadow-sm">
          <div className="flex items-center justify-center mb-2">
            <ChartBarIcon className="w-5 h-5 text-orange-500 mr-2" />
            <span className="text-3xl font-bold text-orange-700">
              {stats.discussVotes}
            </span>
          </div>
          <p className="text-sm text-orange-600 text-center font-medium">
            À discuter
          </p>
        </div>
      </div>

      {/* Votes des créateurs */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <UserGroupIcon className="w-5 h-5" />
          <span>Votes par créateur</span>
        </h2>

        <div className="space-y-4">
          {creatorsWithVotes.map((creator) => {
            // Déterminer le statut majoritaire
            const maxVotes = Math.max(creator.goVotes, creator.noGoVotes, creator.discussVotes);
            let status: 'go' | 'no-go' | 'discuss' | 'none' = 'none';
            if (maxVotes > 0) {
              if (creator.goVotes === maxVotes) status = 'go';
              else if (creator.noGoVotes === maxVotes) status = 'no-go';
              else if (creator.discussVotes === maxVotes) status = 'discuss';
            }

            return (
              <div
                key={creator.id}
                className={`border-2 rounded-xl p-6 hover:shadow-md transition-all duration-300 ${
                  status === 'go'
                    ? 'border-green-300 bg-green-50'
                    : status === 'no-go'
                    ? 'border-red-300 bg-red-50'
                    : status === 'discuss'
                    ? 'border-orange-300 bg-orange-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start gap-6">
                  {/* Statut visuel */}
                  <div className="flex-shrink-0">
                    {status === 'go' && (
                      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                        <CheckCircleIconSolid className="w-7 h-7 text-white" />
                      </div>
                    )}
                    {status === 'no-go' && (
                      <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                        <XCircleIconSolid className="w-7 h-7 text-white" />
                      </div>
                    )}
                    {status === 'discuss' && (
                      <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                        <ChatBubbleLeftIconSolid className="w-7 h-7 text-white" />
                      </div>
                    )}
                    {status === 'none' && (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-sm font-semibold">?</span>
                      </div>
                    )}
                  </div>

                  {/* Infos créateur */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {creator.contactName || 'Nom inconnu'}
                      </h3>
                      <div className={`px-4 py-2 rounded-full font-semibold text-sm ${
                        status === 'go'
                          ? 'bg-green-100 text-green-700'
                          : status === 'no-go'
                          ? 'bg-red-100 text-red-700'
                          : status === 'discuss'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {status === 'go' && 'Go'}
                        {status === 'no-go' && 'No Go'}
                        {status === 'discuss' && 'À discuter'}
                        {status === 'none' && 'Pas de réponse'}
                      </div>
                    </div>

                    {creator.platform && (
                      <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold mb-3 capitalize">
                        {creator.platform}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {creator.followers && (
                        <div>
                          <p className="text-xs text-gray-600">Abonnés</p>
                          <p className="text-sm font-bold text-gray-900">
                            {formatNumber(creator.followers)}
                          </p>
                        </div>
                      )}
                      {creator.engagementRate && (
                        <div>
                          <p className="text-xs text-gray-600">Engagement</p>
                          <p className="text-sm font-bold text-gray-900">
                            {creator.engagementRate}%
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Commentaires */}
                {creator.comments && creator.comments.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm font-semibold text-blue-900 mb-2 flex items-center space-x-2">
                        <ChatBubbleLeftIcon className="w-4 h-4" />
                        <span>Commentaires :</span>
                      </p>
                      <div className="space-y-2">
                        {creator.comments.map((comment, idx) => (
                          <div key={idx} className="bg-white rounded p-3">
                            <p className="text-sm text-gray-700">
                              &quot;{comment}&quot;
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Info sur le partage */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <EyeIcon className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">
              Comment ça fonctionne ?
            </h3>
            <p className="text-sm text-blue-800">
              Les votes sont collectés en temps réel depuis le lien partagé.
              Cette page se met à jour automatiquement pour refléter les
              préférences des visiteurs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

