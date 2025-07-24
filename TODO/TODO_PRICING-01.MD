# PLAN D'ACTION PRESCRIPTIF : PRICING-01

**User Story :** En tant qu'utilisateur, je veux voir une page de pricing avec un calculateur interactif me permettant de choisir entre le nombre de rapports d'influenceurs ou le nombre de recherches par mois pour connaître le prix adapté à mes besoins.

**Objectif :** Créer une page de pricing inspirée de Lemlist avec calculateur dynamique et choix flexible entre différents usages.

---

## Plan d'Action Prescriptif

### Étape 1 : Créer la page pricing principale

Créer `src/app/pricing/page.tsx` :

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  CalculatorIcon,
  CheckIcon,
  StarIcon,
  CreditCardIcon,
  UserGroupIcon,
  SearchIcon,
  DocumentChartBarIcon,
} from '@heroicons/react/24/outline';
import PricingCalculator from '@/components/pricing/PricingCalculator';
import PlanComparison from '@/components/pricing/PlanComparison';

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'plans'>(
    'calculator'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tarifs adaptés à votre usage
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculez le plan parfait pour vos campagnes d'influence marketing.
            Payez seulement pour ce que vous utilisez.
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
                critères. Les rapports débloquent les données d'audience
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
                votre plan. Nous vous préviendrons avant d'atteindre vos
                limites.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Étape 2 : Créer le composant PricingCalculator

Créer `src/components/pricing/PricingCalculator.tsx` :

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import {
  UserGroupIcon,
  SearchIcon,
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
                  <SearchIcon className="w-6 h-6 mx-auto mb-2 text-purple-600" />
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
                    Analyser l'audience
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
                  <div className="text-xs text-gray-500">-17% d'économie</div>
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
```

### Étape 3 : Créer le composant PlanComparison pour le pricing

Créer `src/components/pricing/PlanComparison.tsx` :

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  CheckIcon,
  StarIcon,
  CreditCardIcon,
  UserGroupIcon,
  SearchIcon,
  DocumentChartBarIcon,
} from '@heroicons/react/24/outline';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  limits: {
    searches: number | 'unlimited';
    reports: number;
    users: number;
  };
  popular?: boolean;
  cta: string;
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Parfait pour débuter',
    price: { monthly: 49, yearly: 490 },
    limits: {
      searches: 100,
      reports: 20,
      users: 1,
    },
    features: [
      '100 recherches par mois',
      "20 rapports d'audience",
      '1 utilisateur',
      'Export CSV basique',
      'Support email',
    ],
    cta: 'Commencer gratuitement',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Pour les équipes qui grandissent',
    price: { monthly: 149, yearly: 1490 },
    limits: {
      searches: 'unlimited',
      reports: 100,
      users: 5,
    },
    features: [
      'Recherches illimitées',
      "100 rapports d'audience",
      '5 utilisateurs',
      'Export CSV avancé',
      'CRM intégré',
      'Support prioritaire',
      'API access',
    ],
    popular: true,
    cta: 'Essai gratuit 14 jours',
  },
  {
    id: 'elite',
    name: 'Elite',
    description: 'Pour les agences et grandes équipes',
    price: { monthly: 299, yearly: 2990 },
    limits: {
      searches: 'unlimited',
      reports: 500,
      users: 20,
    },
    features: [
      'Recherches illimitées',
      "500 rapports d'audience",
      '20 utilisateurs',
      'Export CSV illimité',
      'CRM avancé avec pipelines',
      'Support téléphonique',
      'API access complet',
      'Manager dédié',
      'Formation personnalisée',
      'SLA garantie',
    ],
    cta: 'Contactez les ventes',
  },
];

export default function PlanComparison() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  const getPrice = (plan: Plan) => {
    const price =
      billing === 'yearly' ? plan.price.yearly / 12 : plan.price.monthly;
    return Math.round(price);
  };

  const getYearlySavings = (plan: Plan) => {
    const monthlyCost = plan.price.monthly * 12;
    const yearlyCost = plan.price.yearly;
    const savings = monthlyCost - yearlyCost;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return { savings, percentage };
  };

  return (
    <div className="space-y-8">
      {/* Toggle facturation */}
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
              billing === 'monthly'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setBilling('yearly')}
            className={`px-6 py-2 text-sm font-medium rounded-md transition-colors relative ${
              billing === 'yearly'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Annuel
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              -17%
            </span>
          </button>
        </div>
      </div>

      {/* Grille des plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const price = getPrice(plan);
          const savings = getYearlySavings(plan);

          return (
            <div
              key={plan.id}
              className={`relative rounded-xl border-2 bg-white p-8 shadow-sm ${
                plan.popular
                  ? 'border-purple-500 shadow-lg scale-105'
                  : 'border-gray-200'
              }`}
            >
              {/* Badge populaire */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white px-4 py-1 text-sm font-semibold rounded-full flex items-center">
                    <StarIcon className="w-3 h-3 mr-1" />
                    Plus populaire
                  </span>
                </div>
              )}

              {/* Header du plan */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {price}€
                  </span>
                  <span className="text-gray-600 ml-1">
                    {billing === 'yearly' ? '/mois' : '/mois'}
                  </span>

                  {billing === 'yearly' && (
                    <div className="text-sm text-green-600 font-medium mt-1">
                      Économie de {savings.savings}€/an
                    </div>
                  )}
                </div>

                {/* Métriques clés */}
                <div className="flex justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <SearchIcon className="w-4 h-4 mr-1" />
                    {typeof plan.limits.searches === 'number'
                      ? plan.limits.searches
                      : '∞'}{' '}
                    recherches
                  </div>
                  <div className="flex items-center">
                    <DocumentChartBarIcon className="w-4 h-4 mr-1" />
                    {plan.limits.reports} rapports
                  </div>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={`w-full py-3 ${
                  plan.popular
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                {plan.cta}
              </Button>

              {/* Note */}
              <p className="text-xs text-gray-500 text-center mt-3">
                {plan.id === 'starter'
                  ? 'Aucune carte de crédit requise'
                  : plan.id === 'elite'
                    ? 'Démo personnalisée incluse'
                    : 'Annulation à tout moment'}
              </p>
            </div>
          );
        })}
      </div>

      {/* Section entreprise */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-2">
          Besoin d'une solution sur mesure ?
        </h3>
        <p className="text-gray-300 mb-6">
          Pour les grandes entreprises avec des besoins spécifiques, nous créons
          des plans personnalisés.
        </p>
        <Button
          variant="outline"
          className="bg-white text-gray-900 hover:bg-gray-100"
        >
          Contactez notre équipe enterprise
        </Button>
      </div>
    </div>
  );
}
```

### Étape 4 : Ajouter la route dans la navigation

Modifier `src/components/layout/Sidebar.tsx` pour ajouter le lien vers le pricing :

```tsx
// Ajouter dans les liens de navigation
{
  name: "Pricing",
  href: "/pricing",
  icon: CreditCardIcon,
  current: pathname === "/pricing",
},
```

### Étape 5 : Créer les styles pour le slider

Ajouter dans `src/app/globals.css` :

```css
/* Styles pour les sliders du pricing calculator */
.slider {
  -webkit-appearance: none;
  background: #e5e7eb;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #7c3aed;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #7c3aed;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider:focus {
  outline: none;
}

.slider:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.3);
}
```

---

## Résumé des modifications

✅ **Page pricing principale** : Navigation entre calculateur et plans fixes
✅ **Calculateur interactif** : Sliders pour searches/reports/users avec prix dynamique
✅ **Comparaison de plans** : Grille inspirée de Lemlist avec toggle mensuel/annuel  
✅ **Pricing adaptatif** : Choix entre usage recherches ou rapports
✅ **CTA optimisés** : Différents selon le type de plan
✅ **Design moderne** : Interface Lemlist-like avec gradients et badges

Cette page de pricing permet aux prospects de calculer précisément leurs besoins et voir le prix adapté, maximisant les conversions en phase MVP.
