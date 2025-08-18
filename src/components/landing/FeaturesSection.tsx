'use client';

import { useI18n } from '@/lib/i18n/context';
import {
  MagnifyingGlassIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export default function FeaturesSection() {
  const { t } = useI18n();
  const features = [
    {
      icon: MagnifyingGlassIcon,
      title: t('features.aiSearch.title'),
      description: t('features.aiSearch.description'),
      benefits: [
        t('features.aiSearch.benefits.0'),
        t('features.aiSearch.benefits.1'),
        t('features.aiSearch.benefits.2'),
        t('features.aiSearch.benefits.3'),
      ],
      color: 'purple',
    },
    {
      icon: ChartBarIcon,
      title: t('features.reports.title'),
      description: t('features.reports.description'),
      benefits: [
        t('features.reports.benefits.0'),
        t('features.reports.benefits.1'),
        t('features.reports.benefits.2'),
        t('features.reports.benefits.3'),
      ],
      color: 'indigo',
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: t('features.crm.title'),
      description: t('features.crm.description'),
      benefits: [
        t('features.crm.benefits.0'),
        t('features.crm.benefits.1'),
        t('features.crm.benefits.2'),
        t('features.crm.benefits.3'),
      ],
      color: 'green',
    },
    {
      icon: SparklesIcon,
      title: t('features.analytics.title'),
      description: t('features.analytics.description'),
      benefits: [
        t('features.analytics.benefits.0'),
        t('features.analytics.benefits.1'),
        t('features.analytics.benefits.2'),
        t('features.analytics.benefits.3'),
      ],
      color: 'blue',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      purple: {
        bg: 'from-purple-500 to-purple-600',
        text: 'text-purple-600',
        lightBg: 'bg-purple-50',
        border: 'border-purple-200',
      },
      indigo: {
        bg: 'from-indigo-500 to-indigo-600',
        text: 'text-indigo-600',
        lightBg: 'bg-indigo-50',
        border: 'border-indigo-200',
      },
      green: {
        bg: 'from-green-500 to-green-600',
        text: 'text-green-600',
        lightBg: 'bg-green-50',
        border: 'border-green-200',
      },
      blue: {
        bg: 'from-blue-500 to-blue-600',
        text: 'text-blue-600',
        lightBg: 'bg-blue-50',
        border: 'border-blue-200',
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
            Fonctionnalités Avancées
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Tout ce dont vous avez besoin pour
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {' '}
              réussir{' '}
            </span>
            vos campagnes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une suite complète d&apos;outils conçus pour les professionnels du
            marketing d&apos;influence moderne
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className={`inline-flex w-16 h-16 items-center justify-center rounded-2xl bg-gradient-to-br ${colors.bg} mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits List */}
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li
                      key={benefitIndex}
                      className="flex items-center text-gray-700"
                    >
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${colors.bg} mr-3 flex-shrink-0`}
                      ></div>
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Real Features Showcase */}
        <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-3xl p-8 lg:p-12 border border-gray-200">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Fonctionnalités Avancées
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Des outils puissants conçus spécialement pour maximiser le ROI
                de vos campagnes d&apos;influence marketing.
              </p>

              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MagnifyingGlassIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Recherche IA Multi-Plateformes
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">
                      Instagram • YouTube • TikTok
                    </p>
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Base de données 250M+ profils
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ChartBarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Rapports d&apos;Audience Ultra-Précis
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">
                      Démographie • Centres d&apos;intérêt • Fake followers
                    </p>
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Précision 98.5% validée
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      CRM & Communication Intégrée
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">
                      Pipeline • Emails • Suivi automatisé
                    </p>
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      +250% taux de réponse moyen
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Real Features Mockup */}
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold text-gray-900">
                    Tableau de Bord
                  </h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-500">Live</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div>
                      <div className="font-medium text-gray-900">
                        Recherches ce mois
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        247 / 500
                      </div>
                    </div>
                    <div className="text-3xl">📈</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                    <div>
                      <div className="font-medium text-gray-900">
                        Rapports débloqués
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        89 / 100
                      </div>
                    </div>
                    <div className="text-3xl">📊</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                    <div>
                      <div className="font-medium text-gray-900">
                        Campagnes actives
                      </div>
                      <div className="text-2xl font-bold text-purple-600">
                        12
                      </div>
                    </div>
                    <div className="text-3xl">🚀</div>
                  </div>
                </div>
              </div>

              {/* Floating Performance Indicator */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-full shadow-lg">
                <SparklesIcon className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
