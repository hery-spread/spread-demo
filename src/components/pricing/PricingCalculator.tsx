'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  MagnifyingGlassIcon,
  DocumentChartBarIcon,
  CheckCircleIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';

interface PricingData {
  basePrice: number;
  searchPrice: number;
  reportPrice: number;
  userPrice: number;
}

export default function PricingCalculator() {
  const [usage, setUsage] = useState<'searches' | 'reports'>('searches');
  const [searches, setSearches] = useState(25);
  const [reports, setReports] = useState(10);
  const [users, setUsers] = useState(1);
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  const pricing: PricingData = {
    basePrice: 29, // Prix de base
    searchPrice: 1.5, // Prix par recherche
    reportPrice: 3, // Prix par rapport
    userPrice: 15, // Prix par utilisateur supplémentaire
  };

  const calculatePrice = () => {
    let price = pricing.basePrice;

    if (usage === 'searches') {
      price += Math.max(0, searches - 10) * pricing.searchPrice; // 10 recherches incluses
    } else {
      price += Math.max(0, reports - 5) * pricing.reportPrice; // 5 rapports inclus
    }

    price += Math.max(0, users - 1) * pricing.userPrice; // 1 utilisateur inclus

    if (billing === 'yearly') {
      price *= 10; // 10 mois pour le prix de 12 (17% d'économie)
    }

    return price;
  };

  const monthlyPrice = calculatePrice();
  const yearlyDiscount =
    billing === 'yearly' ? Math.round((monthlyPrice * 2) / 12) : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-8">
        {/* Header du calculateur */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Calculateur de prix personnalisé
          </h2>
          <p className="text-gray-600">
            Configurez votre usage pour obtenir un prix sur mesure
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration */}
          <div className="space-y-6">
            {/* Type d'usage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Votre usage principal
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setUsage('searches')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    usage === 'searches'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <MagnifyingGlassIcon className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <div className="text-sm font-medium">Recherches</div>
                  <div className="text-xs text-gray-500">
                    Trouver des influenceurs
                  </div>
                </button>
                <button
                  onClick={() => setUsage('reports')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    usage === 'reports'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <DocumentChartBarIcon className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <div className="text-sm font-medium">Rapports</div>
                  <div className="text-xs text-gray-500">
                    Analyser l&apos;audience
                  </div>
                </button>
              </div>
            </div>

            {/* Sliders */}
            {usage === 'searches' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recherches par mois : {searches}
                </label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={searches}
                  onChange={(e) => setSearches(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5</span>
                  <span>25</span>
                  <span>50</span>
                  <span>100+</span>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rapports par mois : {reports}
                </label>
                <input
                  type="range"
                  min="2"
                  max="50"
                  value={reports}
                  onChange={(e) => setReports(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2</span>
                  <span>10</span>
                  <span>25</span>
                  <span>50+</span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Utilisateurs : {users}
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={users}
                onChange={(e) => setUsers(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>5</span>
                <span>10</span>
                <span>20+</span>
              </div>
            </div>

            {/* Facturation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Facturation
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setBilling('monthly')}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    billing === 'monthly'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-sm font-medium">Mensuel</div>
                  <div className="text-xs text-gray-500">
                    Facturé chaque mois
                  </div>
                </button>
                <button
                  onClick={() => setBilling('yearly')}
                  className={`p-3 rounded-lg border-2 transition-colors relative ${
                    billing === 'yearly'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-sm font-medium">Annuel</div>
                  <div className="text-xs text-gray-500">
                    -17% d&apos;économie
                  </div>
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    PROMO
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Résultat */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {monthlyPrice}€
                <span className="text-lg font-normal text-gray-600">
                  {billing === 'yearly'
                    ? '/mois (facturé annuellement)'
                    : '/mois'}
                </span>
              </div>
              {billing === 'yearly' && (
                <div className="text-sm text-green-600 font-medium">
                  Économie de {yearlyDiscount}€/mois
                </div>
              )}
            </div>

            {/* Ce qui est inclus */}
            <div className="space-y-3 mb-6">
              <h3 className="font-semibold text-gray-900">
                Inclus dans votre plan :
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm">
                    {usage === 'searches'
                      ? `${searches} recherches`
                      : `${reports} rapports`}{' '}
                    par mois
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm">
                    {users} utilisateur{users > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Export CSV illimité</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Support par email</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm">CRM intégré</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Button className="w-full bg-purple-600 hover:bg-purple-700 py-3">
              <CreditCardIcon className="w-4 h-4 mr-2" />
              Commencer maintenant
            </Button>

            <p className="text-xs text-gray-500 text-center mt-2">
              Essai gratuit 14 jours • Annulation à tout moment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
