'use client';

import { useState, useMemo } from 'react';
import { CampaignCreatorScore } from '@/types';
import { estimateProfitabilityCost } from '@/lib/mockData';
import {
  CalculatorIcon,
  UserGroupIcon,
  EyeIcon,
  FireIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

interface CostEstimatorProps {
  topPerformers: CampaignCreatorScore[];
}

export default function CostEstimator({ topPerformers }: CostEstimatorProps) {
  const [targetBudget, setTargetBudget] = useState(5000);

  const estimates = useMemo(() => {
    return estimateProfitabilityCost(topPerformers, targetBudget);
  }, [topPerformers, targetBudget]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  if (topPerformers.length === 0) {
    return null;
  }

  const budgetOptions = [1000, 2500, 5000, 10000, 25000, 50000];

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200/30">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
          <CalculatorIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Estimateur de rentabilité
          </h2>
          <p className="text-sm text-gray-500">
            Basé sur les performances de vos top créateurs
          </p>
        </div>
      </div>

      {/* Sélection du budget */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Budget cible
        </label>
        <div className="flex flex-wrap gap-2">
          {budgetOptions.map((amount) => (
            <button
              key={amount}
              onClick={() => setTargetBudget(amount)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                targetBudget === amount
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white/70 text-gray-700 hover:bg-white hover:shadow-sm border border-emerald-200'
              }`}
            >
              {formatCurrency(amount)}
            </button>
          ))}
        </div>

        {/* Slider pour budget personnalisé */}
        <div className="mt-4">
          <input
            type="range"
            min="500"
            max="100000"
            step="500"
            value={targetBudget}
            onChange={(e) => setTargetBudget(Number(e.target.value))}
            className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>500€</span>
            <span className="font-medium text-emerald-700">
              {formatCurrency(targetBudget)}
            </span>
            <span>100 000€</span>
          </div>
        </div>
      </div>

      {/* Estimations */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/70 rounded-xl p-4 text-center border border-emerald-200/30">
          <div className="flex items-center justify-center space-x-1 text-emerald-700 mb-1">
            <UserGroupIcon className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {estimates.estimatedCreators}
          </div>
          <div className="text-xs text-gray-500">Créateurs estimés</div>
        </div>

        <div className="bg-white/70 rounded-xl p-4 text-center border border-emerald-200/30">
          <div className="flex items-center justify-center space-x-1 text-blue-600 mb-1">
            <EyeIcon className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {formatNumber(estimates.estimatedImpressions)}
          </div>
          <div className="text-xs text-gray-500">Impressions estimées</div>
        </div>

        <div className="bg-white/70 rounded-xl p-4 text-center border border-emerald-200/30">
          <div className="flex items-center justify-center space-x-1 text-purple-600 mb-1">
            <FireIcon className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {formatNumber(estimates.estimatedEngagements)}
          </div>
          <div className="text-xs text-gray-500">Engagements estimés</div>
        </div>

        <div className="bg-white/70 rounded-xl p-4 text-center border border-emerald-200/30">
          <div className="flex items-center justify-center space-x-1 text-green-600 mb-1">
            <ChartBarIcon className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            {estimates.estimatedROI.toFixed(0)}%
          </div>
          <div className="text-xs text-gray-500">ROI estimé</div>
        </div>
      </div>

      {/* Indicateur de rentabilité */}
      <div className="bg-white/70 rounded-xl p-4 border border-emerald-200/30">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">
            Seuil de rentabilité
          </span>
          <span className="text-sm text-gray-500">
            Budget minimum pour ROI positif :{' '}
            {formatCurrency(estimates.breakEvenBudget)}
          </span>
        </div>

        {/* Barre de progression */}
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              estimates.estimatedROI >= 100
                ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                : estimates.estimatedROI >= 50
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                  : 'bg-gradient-to-r from-red-400 to-red-500'
            }`}
            style={{
              width: `${Math.min(100, (estimates.estimatedROI / 200) * 100)}%`,
            }}
          />
        </div>

        <div className="flex items-center justify-between mt-2 text-xs">
          <span className="text-red-500">0% ROI</span>
          <span
            className={`font-medium ${
              estimates.estimatedROI >= 100
                ? 'text-green-600'
                : 'text-orange-500'
            }`}
          >
            {estimates.estimatedROI >= 100 ? (
              <>✓ Rentable</>
            ) : (
              <>⚠ Sous le seuil</>
            )}
          </span>
          <span className="text-green-500">200% ROI</span>
        </div>
      </div>

      {/* Message contextuel */}
      <div className="mt-4 p-3 bg-white/50 rounded-lg">
        <p className="text-xs text-gray-600">
          <strong>💡 Note :</strong> Ces estimations sont basées sur les
          performances moyennes de vos {topPerformers.length} meilleurs
          créateurs. Les résultats réels peuvent varier selon le choix des
          créateurs et la qualité du brief.
        </p>
      </div>
    </div>
  );
}
