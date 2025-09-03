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
      href: '/',
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
      href: '/reports',
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Séquences Mailing Automatisées',
      description:
        "Automatisez vos campagnes d'emailing et suivez vos conversations avec les influenceurs en temps réel.",
      benefits: [
        "Séquences d'emails personnalisées",
        'Suivi automatique des réponses',
        "Templates d'emails optimisés",
        'Gestion des listes de contacts',
      ],
      color: 'green',
      href: '/messaging',
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
      href: '/campaigns',
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

  const handleFeatureClick = (href: string) => {
    if (href !== window.location.pathname) {
      window.location.href = href;
    }
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
                onClick={() => handleFeatureClick(feature.href)}
                className="group relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300 cursor-pointer"
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

                {/* Click indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-gray-400 text-sm font-medium">
                    → Découvrir
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
