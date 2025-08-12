'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  MegaphoneIcon,
  PlusIcon,
  EyeIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import {
  CheckCircleIcon,
  PlayCircleIcon,
  PauseCircleIcon,
  StopCircleIcon,
} from '@heroicons/react/24/solid';

// Types pour les campagnes
interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  type: 'email' | 'social' | 'influencer';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  influencers: number;
}

// Données mock pour les campagnes
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Lancement Produit Été 2025',
    status: 'active',
    type: 'influencer',
    startDate: '2025-01-15',
    endDate: '2025-02-15',
    budget: 15000,
    spent: 8500,
    impressions: 245000,
    clicks: 12500,
    conversions: 850,
    influencers: 12
  },
  {
    id: '2',
    name: 'Campagne Awareness Q1',
    status: 'paused',
    type: 'social',
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    budget: 25000,
    spent: 12000,
    impressions: 180000,
    clicks: 9200,
    conversions: 650,
    influencers: 8
  },
  {
    id: '3',
    name: 'Newsletter Hebdo',
    status: 'active',
    type: 'email',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    budget: 5000,
    spent: 1200,
    impressions: 45000,
    clicks: 3500,
    conversions: 280,
    influencers: 0
  }
];

const getStatusIcon = (status: Campaign['status']) => {
  switch (status) {
    case 'active':
      return <PlayCircleIcon className="w-5 h-5 text-green-500" />;
    case 'paused':
      return <PauseCircleIcon className="w-5 h-5 text-orange-500" />;
    case 'completed':
      return <CheckCircleIcon className="w-5 h-5 text-blue-500" />;
    default:
      return <StopCircleIcon className="w-5 h-5 text-gray-400" />;
  }
};

const getStatusText = (status: Campaign['status']) => {
  switch (status) {
    case 'active':
      return 'Actif';
    case 'paused':
      return 'En pause';
    case 'completed':
      return 'Terminé';
    case 'draft':
      return 'Brouillon';
    default:
      return 'Inconnu';
  }
};

const getTypeText = (type: Campaign['type']) => {
  switch (type) {
    case 'influencer':
      return 'Influenceurs';
    case 'social':
      return 'Réseaux Sociaux';
    case 'email':
      return 'Email';
    default:
      return 'Autre';
  }
};

export default function CampagnesPage() {
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'paused' | 'completed'>('all');

  const filteredCampaigns = campaigns.filter(campaign => 
    selectedFilter === 'all' || campaign.status === selectedFilter
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header avec statistiques globales */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-lg shadow-purple-500/5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <MegaphoneIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Campagnes
              </h1>
              <p className="text-gray-600 mt-1">Gérez et analysez vos campagnes marketing</p>
            </div>
          </div>
          <Button variant="default" className="flex items-center space-x-2">
            <PlusIcon className="w-5 h-5" />
            <span>Nouvelle Campagne</span>
          </Button>
        </div>

        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/80 rounded-2xl p-6 border border-blue-200/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-medium uppercase tracking-wide">Campagnes Actives</p>
                <p className="text-3xl font-bold text-blue-800">
                  {campaigns.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <PlayCircleIcon className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50/80 to-green-100/80 rounded-2xl p-6 border border-green-200/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm font-medium uppercase tracking-wide">Budget Total</p>
                <p className="text-3xl font-bold text-green-800">
                  {formatCurrency(campaigns.reduce((sum, c) => sum + c.budget, 0))}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <ChartBarIcon className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50/80 to-purple-100/80 rounded-2xl p-6 border border-purple-200/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 text-sm font-medium uppercase tracking-wide">Impressions</p>
                <p className="text-3xl font-bold text-purple-800">
                  {formatNumber(campaigns.reduce((sum, c) => sum + c.impressions, 0))}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <EyeIcon className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50/80 to-orange-100/80 rounded-2xl p-6 border border-orange-200/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-700 text-sm font-medium uppercase tracking-wide">Conversions</p>
                <p className="text-3xl font-bold text-orange-800">
                  {formatNumber(campaigns.reduce((sum, c) => sum + c.conversions, 0))}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <CheckCircleIcon className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 font-medium">Filtrer par statut :</span>
        {['all', 'active', 'paused', 'completed'].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter as typeof selectedFilter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedFilter === filter
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter === 'all' ? 'Toutes' : getStatusText(filter as Campaign['status'])}
          </button>
        ))}
      </div>

      {/* Liste des campagnes */}
      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-lg shadow-gray-500/5 hover:shadow-xl hover:shadow-gray-500/10 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{campaign.name}</h3>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(campaign.status)}
                    <span className="text-sm font-medium text-gray-600">
                      {getStatusText(campaign.status)}
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                    {getTypeText(campaign.type)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                  <div className="flex items-center space-x-2">
                    <CalendarDaysIcon className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Période</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(campaign.startDate).toLocaleDateString('fr-FR')} - {new Date(campaign.endDate).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(campaign.budget)}</p>
                    <p className="text-xs text-gray-500">Dépensé: {formatCurrency(campaign.spent)}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Impressions</p>
                    <p className="text-sm font-medium text-gray-900">{formatNumber(campaign.impressions)}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Clics</p>
                    <p className="text-sm font-medium text-gray-900">{formatNumber(campaign.clicks)}</p>
                    <p className="text-xs text-gray-500">
                      CTR: {((campaign.clicks / campaign.impressions) * 100).toFixed(2)}%
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Conversions</p>
                    <p className="text-sm font-medium text-gray-900">{formatNumber(campaign.conversions)}</p>
                    <p className="text-xs text-gray-500">
                      Taux: {((campaign.conversions / campaign.clicks) * 100).toFixed(2)}%
                    </p>
                  </div>

                  {campaign.influencers > 0 && (
                    <div className="flex items-center space-x-2">
                      <UserGroupIcon className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Influenceurs</p>
                        <p className="text-sm font-medium text-gray-900">{campaign.influencers}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-2 ml-6">
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <EyeIcon className="w-4 h-4" />
                  <span>Voir</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <ChartBarIcon className="w-4 h-4" />
                  <span>Analytics</span>
                </Button>
              </div>
            </div>

            {/* Barre de progression du budget */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-500">Progression du budget</span>
                <span className="text-xs font-medium text-gray-700">
                  {((campaign.spent / campaign.budget) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-purple-700 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
