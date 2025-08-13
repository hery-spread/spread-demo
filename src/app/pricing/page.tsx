'use client';

import { useState } from 'react';
import { CalculatorIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import PricingCalculator from '@/components/pricing/PricingCalculator';
import PlanComparison from '@/components/pricing/PlanComparison';

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'plans'>('plans');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tarifs adaptés à votre usage
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculez le plan parfait pour vos campagnes d&apos;influence
            marketing. Payez seulement pour ce que vous utilisez.
          </p>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'calculator'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CalculatorIcon className="w-4 h-4 mr-2" />
              Calculateur de prix
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className={`flex items-center px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'plans'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CreditCardIcon className="w-4 h-4 mr-2" />
              Plans fixes
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {activeTab === 'calculator' ? (
          <PricingCalculator />
        ) : (
          <PlanComparison />
        )}
      </div>

      {/* FAQ Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Questions fréquentes
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Quelle est la différence entre recherches et rapports ?
              </h3>
              <p className="text-gray-600">
                Les recherches permettent de trouver des influenceurs selon vos
                critères. Les rapports débloquent les données d&apos;audience
                détaillées (démographie, intérêts, etc.).
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Puis-je changer de plan à tout moment ?
              </h3>
              <p className="text-gray-600">
                Oui, vous pouvez upgrader ou downgrader votre plan à tout
                moment. Les changements sont effectifs immédiatement avec
                proratisation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Que se passe-t-il si je dépasse mes limites ?
              </h3>
              <p className="text-gray-600">
                Vous pouvez acheter des crédits supplémentaires ou upgrader
                votre plan. Nous vous préviendrons avant d&apos;atteindre vos
                limites.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
