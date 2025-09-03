'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/context';
import {
  MagnifyingGlassIcon,
  InboxIcon,
  ChartBarIcon,
  DocumentChartBarIcon,
} from '@heroicons/react/24/outline';

interface UseCasesSectionProps {
  currentFeature?: 'search' | 'messaging' | 'campaign' | 'reports';
}

export default function UseCasesSection({ currentFeature = 'search' }: UseCasesSectionProps) {
  const { t: _t } = useI18n();

  const useCases = [
    {
      id: 'search',
      title: 'Recherche d\'Influenceurs',
      description: 'Trouvez les influenceurs parfaits avec notre IA avancée',
      icon: MagnifyingGlassIcon,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-50',
      textColor: 'text-purple-700',
      href: '/',
      features: [
        'Recherche IA en langage naturel',
        'Base de données 250M+ profils',
        'Filtres automatiques avancés',
        'Résultats en moins de 30s'
      ]
    },
    {
      id: 'messaging',
      title: 'Messagerie Intégrée',
      description: 'Gérez toutes vos conversations influenceurs en un lieu',
      icon: InboxIcon,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      textColor: 'text-blue-700',
      href: '/messaging',
      features: [
        'Conversations centralisées',
        'Templates personnalisables',
        'Suivi des réponses automatique',
        '87% de taux de réponse moyen'
      ]
    },
    {
      id: 'campaign',
      title: 'Gestion de Campagnes',
      description: 'Pilotez vos campagnes avec des métriques en temps réel',
      icon: ChartBarIcon,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      textColor: 'text-orange-700',
      href: '/campaigns',
      features: [
        'Dashboard temps réel',
        'Suivi ROI automatique',
        'Gestion multi-influenceurs',
        '+347% ROI moyen'
      ]
    },
    {
      id: 'reports',
      title: 'Rapports d\'Audience',
      description: 'Analyses ultra-détaillées pour prendre les bonnes décisions',
      icon: DocumentChartBarIcon,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50',
      textColor: 'text-emerald-700',
      href: '/reports',
      features: [
        'Démographie précise',
        'Géolocalisation détaillée',
        'Centres d\'intérêt analysés',
        '96% de précision des données'
      ]
    }
  ];

  const handleUseCaseClick = (href: string) => {
    if (href !== window.location.pathname) {
      window.location.href = href;
    }
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 text-sm font-medium mb-6">
            <ChartBarIcon className="w-4 h-4 mr-2" />
            Toutes nos fonctionnalités
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Une Plateforme
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {' '}
              Complète
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez toutes les fonctionnalités qui font de Spread la solution #1 pour l'influence marketing
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            const isActive = currentFeature === useCase.id;
            
            return (
              <div
                key={useCase.id}
                onClick={() => handleUseCaseClick(useCase.href)}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  isActive 
                    ? 'transform scale-105 shadow-2xl' 
                    : 'hover:transform hover:scale-105 hover:shadow-xl'
                }`}
              >
                <div className={`h-full p-8 rounded-3xl border-2 transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-br ${useCase.bgColor} border-current shadow-lg`
                    : 'bg-white/80 backdrop-blur-xl border-white/50 hover:border-gray-200'
                }`}>
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-br ${useCase.color} shadow-lg`
                      : 'bg-gray-100 group-hover:bg-gradient-to-br group-hover:' + useCase.color
                  }`}>
                    <Icon className={`w-8 h-8 transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-gray-600 group-hover:text-white'
                    }`} />
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                      isActive ? useCase.textColor : 'text-gray-900'
                    }`}>
                      {useCase.title}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                      isActive ? 'text-gray-700' : 'text-gray-600'
                    }`}>
                      {useCase.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2">
                    {useCase.features.map((feature, index) => (
                      <li key={index} className={`flex items-center text-sm transition-colors duration-300 ${
                        isActive ? 'text-gray-700' : 'text-gray-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-3 transition-colors duration-300 ${
                          isActive ? useCase.textColor.replace('text-', 'bg-') : 'bg-gray-400'
                        }`}></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute top-4 right-4">
                      <div className={`w-3 h-3 rounded-full animate-pulse ${useCase.textColor.replace('text-', 'bg-')}`}></div>
                    </div>
                  )}

                  {/* Hover CTA */}
                  <div className={`mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                    isActive ? 'opacity-100' : ''
                  }`}>
                    <div className={`text-sm font-medium transition-colors duration-300 ${
                      isActive ? useCase.textColor : 'text-gray-700'
                    }`}>
                      {isActive ? '✓ Fonctionnalité active' : '→ Découvrir cette fonctionnalité'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 p-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg">
            <div className="text-left">
              <div className="font-semibold text-gray-900 mb-1">
                Prêt à tester toutes ces fonctionnalités ?
              </div>
              <div className="text-sm text-gray-600">
                Essai gratuit 14 jours • Sans engagement • Sans CB
              </div>
            </div>
            <button 
              onClick={() => window.location.href = '/onboarding'}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🚀 Commencer l'Essai
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
