'use client';

import PlanComparison from '@/components/pricing/PlanComparison';

export default function PricingPage() {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Plans d'abonnement
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choisissez le plan qui correspond le mieux à vos besoins. 
            Des tarifs simples et transparents pour vos campagnes d&apos;influence marketing.
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <PlanComparison />
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
                Comment fonctionnent les plans fixes ?
              </h3>
              <p className="text-gray-600">
                Nos plans fixes incluent un nombre défini de recherches et de rapports d'audience
                par mois. Pas de surprise, pas de calculs complexes - vous savez exactement ce que vous payez.
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
                Que se passe-t-il si j'atteins mes limites ?
              </h3>
              <p className="text-gray-600">
                Vous pouvez upgrader vers un plan supérieur à tout moment.
                Nous vous préviendrons avant d&apos;atteindre vos limites pour que vous puissiez
                ajuster votre plan si nécessaire.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
