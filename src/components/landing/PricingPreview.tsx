'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  CheckIcon,
  SparklesIcon,
  RocketLaunchIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

export default function PricingPreview() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'brand',
      name: 'Brand',
      description: "l'offre pour commencer ✈️",
      price: { monthly: 89, yearly: 854 },
      popular: false,
      icon: RocketLaunchIcon,
      features: [
        'Accès à 1 utilisateur',
        'Création de listes illimitées',
        'Une multitude de filtres avancés',
        'Historique complet des données en illimité',
        'Accès à 10k créateurs sélectionnés parmi 250 millions de profils',
        "40 génération de rapports d'audience",
        '40 accès direct aux contacts des influenceurs',
        '10 rapports de campagne',
        'Configuration rapide et efficace',
      ],
      cta: 'Essai Gratuit 14 Jours',
      color: 'gray',
      access: 'Accès limité',
    },
    {
      id: 'agency',
      name: 'Agency',
      description: "l'offre qu'il vous faut ✅",
      price: { monthly: 219, yearly: 2124 },
      popular: true,
      icon: SparklesIcon,
      features: [
        'Accès à 1 utilisateur',
        'Création de listes en illimitées',
        'Une multitude de filtres avancés',
        'Historique complet des données en illimités',
        'Recherches illimitées parmi 250 millions de créateurs',
        "200 génération de rapports d'audience",
        'Accès à 200 contacts des influenceurs',
        'Rapports de campagne illimités',
        'Support client',
        'Configuration rapide et efficace',
      ],
      cta: 'Essai Gratuit 14 Jours',
      color: 'purple',
      access: 'Accès puissant',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Pour les plus costaud 💼',
      price: { monthly: 'Sur mesure', yearly: 'Sur mesure' },
      popular: false,
      icon: BuildingOfficeIcon,
      features: [
        'Accès à 5 utilisateurs',
        'Création de listes en illimitées',
        'Une multitude de filtres avancés',
        'Historique complet des données en illimités',
        'Recherches illimitées parmi 250 millions de créateurs',
        "Génération de rapports d'audience illimités",
        'Accès aux contacts des influenceurs en illimités',
        'Rapports de campagne illimités',
        'Support client premium',
        'Configuration rapide et efficace',
      ],
      cta: 'Contactez-nous',
      color: 'indigo',
      access: 'Accès illimité',
    },
  ];

  const savings = billing === 'yearly' ? 20 : 0;

  const handleGetStarted = (planId: string) => {
    if (planId === 'enterprise') {
      // Redirection vers contact/demo
      window.location.href = '/onboarding?demo=true&plan=enterprise';
    } else {
      // Redirection vers essai gratuit avec plan présélectionné
      window.location.href = `/onboarding?plan=${planId}`;
    }
  };

  const getColorClasses = (color: string, isPopular: boolean = false) => {
    if (isPopular) {
      return {
        border: 'border-purple-500 border-2',
        bg: 'bg-gradient-to-br from-purple-50 to-indigo-50',
        button:
          'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white',
        iconBg: 'from-purple-500 to-indigo-500',
      };
    }

    const colorMap = {
      gray: {
        border: 'border-gray-200',
        bg: 'bg-white',
        button: 'bg-gray-900 hover:bg-gray-800 text-white',
        iconBg: 'from-gray-500 to-gray-600',
      },
      purple: {
        border: 'border-purple-200',
        bg: 'bg-purple-50',
        button: 'bg-purple-600 hover:bg-purple-700 text-white',
        iconBg: 'from-purple-500 to-purple-600',
      },
      indigo: {
        border: 'border-indigo-200',
        bg: 'bg-indigo-50',
        button: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        iconBg: 'from-indigo-500 to-indigo-600',
      },
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 text-sm font-medium mb-6">
            <SparklesIcon className="w-4 h-4 mr-2" />
            Tarification Simple & Transparente
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Choisissez le plan
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {' '}
              parfait{' '}
            </span>
            pour votre équipe
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Commencez gratuitement, montez en puissance selon vos besoins
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-100 rounded-2xl p-1 mb-12">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                billing === 'monthly'
                  ? 'bg-white shadow-md text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 relative ${
                billing === 'yearly'
                  ? 'bg-white shadow-md text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Annuel
              {savings > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{savings}%
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const colors = getColorClasses(plan.color, plan.popular);
            const Icon = plan.icon;
            const price = plan.price[billing];

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 ${colors.bg} ${colors.border} ${
                  plan.popular
                    ? 'shadow-2xl shadow-purple-500/20 transform scale-105'
                    : 'shadow-lg hover:shadow-xl'
                } transition-all duration-300 hover:transform hover:scale-105`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      ⭐ Le plus populaire
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div
                    className={`inline-flex w-16 h-16 items-center justify-center rounded-2xl bg-gradient-to-br ${colors.iconBg} mb-4 shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-8">
                  {typeof price === 'string' ? (
                    <div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {price}
                      </div>
                      <div className="text-sm text-gray-600">
                        Plan Annuel/mensuel disponible
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-end justify-center">
                        <span className="text-5xl font-bold text-gray-900">
                          {billing === 'yearly' ? Math.round(price / 12) : price}€
                        </span>
                        <span className="text-gray-500 ml-1 mb-1">/mois</span>
                      </div>
                      {billing === 'yearly' && (
                        <div className="text-sm text-green-600 font-medium mt-1">
                          ou {price}€/An (-20%)
                        </div>
                      )}
                    </div>
                  )}
                  {plan.access && (
                    <div className="mt-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700">
                        {plan.access}
                      </span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  onClick={() => handleGetStarted(plan.id)}
                  className={`w-full py-4 text-lg font-semibold ${colors.button} shadow-lg transform transition-all duration-300 hover:scale-105`}
                >
                  {plan.cta}
                </Button>

                {/* Trial Note */}
                {plan.id !== 'enterprise' && (
                  <p className="text-center text-sm text-gray-500 mt-4">
                    ✨ Sans engagement • 🔐 Sans CB • 📞 Support inclus
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
