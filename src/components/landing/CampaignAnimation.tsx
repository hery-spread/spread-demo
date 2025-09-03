'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CurrencyEuroIcon,
  EyeIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

export default function CampaignAnimation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [campaignMetrics, setCampaignMetrics] = useState({
    reach: 0,
    engagement: 0,
    budget: 0,
    roi: 0,
    posts: 0,
    influencers: 0,
  });
  const [isAnimating, setIsAnimating] = useState(true);

  // Données de démonstration pour la campagne
  const campaignData = useMemo(
    () => ({
      name: 'Campagne Beauté Automne',
      status: 'En cours',
      targetMetrics: {
        reach: 250000,
        engagement: 15000,
        budget: 8500,
        roi: 347,
        posts: 24,
        influencers: 8,
      },
      influencers: [
        {
          name: 'Marie B.',
          avatar: 'MB',
          platform: 'Instagram',
          status: 'published',
          reach: 85000,
        },
        {
          name: 'Sophie L.',
          avatar: 'SL',
          platform: 'TikTok',
          status: 'scheduled',
          reach: 62000,
        },
        {
          name: 'Emma F.',
          avatar: 'EF',
          platform: 'YouTube',
          status: 'draft',
          reach: 103000,
        },
      ],
    }),
    []
  );

  // Animation en boucle
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 5) {
          // Reset après le cycle complet
          setCampaignMetrics({
            reach: 0,
            engagement: 0,
            budget: 0,
            roi: 0,
            posts: 0,
            influencers: 0,
          });
          return 0;
        }
        return prev + 1;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [isAnimating]);

  // Animation des métriques
  useEffect(() => {
    if (currentStep === 0) return;

    const animateMetrics = () => {
      const duration = 1500;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStepCount = 0;

      const timer = setInterval(() => {
        currentStepCount++;
        const progress = currentStepCount / steps;

        setCampaignMetrics({
          reach: Math.floor(campaignData.targetMetrics.reach * progress),
          engagement: Math.floor(
            campaignData.targetMetrics.engagement * progress
          ),
          budget: Math.floor(campaignData.targetMetrics.budget * progress),
          roi: Math.floor(campaignData.targetMetrics.roi * progress),
          posts: Math.floor(campaignData.targetMetrics.posts * progress),
          influencers: Math.floor(
            campaignData.targetMetrics.influencers * progress
          ),
        });

        if (currentStepCount >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    };

    const timeout = setTimeout(animateMetrics, 300);
    return () => clearTimeout(timeout);
  }, [currentStep, campaignData.targetMetrics]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return '✓';
      case 'scheduled':
        return '⏰';
      case 'draft':
        return '📝';
      default:
        return '⏳';
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsAnimating(false)}
      onMouseLeave={() => setIsAnimating(true)}
    >
      {/* Interface de gestion de campagne */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-500/20 p-6 border border-gray-200/50">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
            <ChartBarIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Gestion de Campagne</h4>
            <p className="text-xs text-gray-500">Suivi en temps réel</p>
          </div>
        </div>

        {/* Nom de la campagne et statut */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h5 className="font-medium text-gray-900">{campaignData.name}</h5>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
              🟢 {campaignData.status}
            </span>
          </div>
        </div>

        {/* Métriques principales */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-3">
            <div className="flex items-center space-x-2 mb-1">
              <EyeIcon className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-medium text-purple-900">
                Portée
              </span>
            </div>
            <div
              className={`text-lg font-bold text-purple-700 transition-all duration-300 ${currentStep >= 1 ? 'animate-countUp' : ''}`}
            >
              {formatNumber(campaignMetrics.reach)}
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-3">
            <div className="flex items-center space-x-2 mb-1">
              <HeartIcon className="w-4 h-4 text-pink-600" />
              <span className="text-xs font-medium text-pink-900">
                Engagement
              </span>
            </div>
            <div
              className={`text-lg font-bold text-pink-700 transition-all duration-300 ${currentStep >= 2 ? 'animate-countUp' : ''}`}
            >
              {formatNumber(campaignMetrics.engagement)}
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3">
            <div className="flex items-center space-x-2 mb-1">
              <CurrencyEuroIcon className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-green-900">Budget</span>
            </div>
            <div
              className={`text-lg font-bold text-green-700 transition-all duration-300 ${currentStep >= 3 ? 'animate-countUp' : ''}`}
            >
              {campaignMetrics.budget}€
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-3">
            <div className="flex items-center space-x-2 mb-1">
              <ArrowTrendingUpIcon className="w-4 h-4 text-orange-600" />
              <span className="text-xs font-medium text-orange-900">ROI</span>
            </div>
            <div
              className={`text-lg font-bold text-orange-700 transition-all duration-300 ${currentStep >= 4 ? 'animate-countUp' : ''}`}
            >
              +{campaignMetrics.roi}%
            </div>
          </div>
        </div>

        {/* Liste des influenceurs */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Influenceurs ({campaignMetrics.influencers})
            </span>
            <span className="text-xs text-gray-500">
              {campaignMetrics.posts} posts
            </span>
          </div>

          {campaignData.influencers.map((influencer, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl bg-gray-50 border border-gray-200 transition-all duration-500 ${
                currentStep >= index + 2
                  ? 'animate-slideIn opacity-100'
                  : 'opacity-60'
              }`}
              style={{
                animationDelay: `${index * 0.2}s`,
                animationFillMode: 'both',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {influencer.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      {influencer.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {influencer.platform} • {formatNumber(influencer.reach)}{' '}
                      followers
                    </div>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(influencer.status)}`}
                >
                  {getStatusIcon(influencer.status)} {influencer.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Résumé de performance */}
        {currentStep >= 5 && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 animate-fadeIn">
            <div className="flex items-center space-x-2 mb-2">
              <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-900">
                Performance Excellente
              </span>
            </div>
            <div className="text-xs text-green-700">
              ROI de +347% • Engagement 23% au-dessus de la moyenne
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-6">
          <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white text-center py-3 rounded-xl font-semibold text-sm hover:from-orange-700 hover:to-red-700 transition-colors duration-300">
            📊 Voir le Dashboard Complet
          </button>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
        <ChartBarIcon className="w-6 h-6 text-white" />
      </div>

      {/* Performance Badge */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-emerald-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
        📈 +347% ROI
      </div>

      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes countUp {
          from {
            transform: scale(0.8);
            opacity: 0.5;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }

        .animate-countUp {
          animation: countUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
