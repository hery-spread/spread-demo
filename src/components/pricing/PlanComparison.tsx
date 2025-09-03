'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  CheckIcon,
  StarIcon,
  MagnifyingGlassIcon,
  DocumentChartBarIcon,
} from '@heroicons/react/24/outline';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number | string;
    yearly: number | string;
  };
  features: string[];
  limits: {
    searches: number | 'unlimited';
    reports: number | 'unlimited';
    users: number;
    contacts: number | 'unlimited';
    campaigns: number | 'unlimited';
  };
  popular?: boolean;
  cta: string;
  access: string;
}

const plans: Plan[] = [
  {
    id: 'brand',
    name: 'Brand',
    description: '',
    price: { monthly: 89, yearly: 854 },
    limits: {
      searches: 10000,
      reports: 40,
      users: 1,
      contacts: 40,
      campaigns: 10,
    },
    features: [
      "Jusqu'à 10 000 résultats de recherche/mois",
      "40 rapports d'audience/mois",
      "40 contacts d'influenceurs débloqués/mois",
      '10 rapports de campagne/mois',
      'Export CSV',
      'Support email',
    ],
    cta: 'Essai Gratuit 14 Jours',
    access: '',
  },
  {
    id: 'agency',
    name: 'Agency',
    description: '',
    price: { monthly: 219, yearly: 2124 },
    limits: {
      searches: 'unlimited',
      reports: 200,
      users: 1,
      contacts: 200,
      campaigns: 'unlimited',
    },
    features: [
      'Recherches illimitées',
      "200 rapports d'audience/mois",
      "200 contacts d'influenceurs débloqués/mois",
      'Rapports de campagne illimités',
      'CRM intégré',
      'Intégration email (Gmail, Outlook)',
    ],
    popular: true,
    cta: 'Essai Gratuit 14 Jours',
    access: '',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: '',
    price: { monthly: 'Devis sur demande', yearly: 'Devis sur demande' },
    limits: {
      searches: 'unlimited',
      reports: 'unlimited',
      users: 5,
      contacts: 'unlimited',
      campaigns: 'unlimited',
    },
    features: [
      'Recherches illimitées',
      "Rapports d'audience illimités",
      "Contacts d'influenceurs illimités",
      'Rapports de campagne illimités',
      'API access',
      'Support dédié 5/7 de 9h à 18h',
    ],
    cta: 'Contactez-nous',
    access: '',
  },
];

export default function PlanComparison() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  const getPrice = (plan: Plan) => {
    if (typeof plan.price.monthly === 'string') {
      return plan.price.monthly;
    }
    const price =
      billing === 'yearly'
        ? (plan.price.yearly as number) / 12
        : plan.price.monthly;
    return Math.round(price);
  };

  const getYearlySavings = (plan: Plan) => {
    if (typeof plan.price.monthly === 'string') {
      return { savings: 0, percentage: 0 };
    }
    const monthlyCost = (plan.price.monthly as number) * 12;
    const yearlyCost = plan.price.yearly as number;
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
                    <MagnifyingGlassIcon className="w-4 h-4 mr-1" />
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
          Besoin d&apos;une solution sur mesure ?
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
